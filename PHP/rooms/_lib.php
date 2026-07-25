<?php
// Helpers compartilhados pelos endpoints de sala: armazenamento em arquivo JSON com
// lock exclusivo (evita corrida entre o Mestre e os Jogadores mandando ações ao mesmo
// tempo), geração de código/token, hash de token e resolução de quem está autenticado.

function roomsDir() {
  $dir = __DIR__ . '/../../data/rooms';
  if (!is_dir($dir)) mkdir($dir, 0775, true);
  return $dir;
}

function roomFilePath($code) {
  return roomsDir() . '/' . $code . '.json';
}

function isValidRoomCode($code) {
  return is_string($code) && preg_match('/^[A-Z0-9]{4,10}$/', $code);
}

function generateRoomCode() {
  $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I, evita confusão ao digitar
  do {
    $code = '';
    for ($i = 0; $i < 6; $i++) $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
  } while (file_exists(roomFilePath($code)));
  return $code;
}

// Token de 192 bits: já é aleatório o suficiente, não precisa de bcrypt/password_hash
// (isso é pra proteger segredos escolhidos por humanos, não é o caso aqui) — um hash
// rápido já impede que quem só vê o arquivo da sala no disco reconstrua o token.
function generateToken() {
  return bin2hex(random_bytes(24));
}

function hashToken($token) {
  return hash('sha256', (string) $token);
}

function generateEntityId($prefix) {
  return $prefix . '_' . bin2hex(random_bytes(6));
}

function readJsonBody() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function requireMethod($method) {
  if ($_SERVER['REQUEST_METHOD'] !== $method) {
    jsonResponse(['error' => 'method_not_allowed'], 405);
  }
}

function jsonResponse($data, $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

// Leitura pura (sem intenção de escrever de volta) — lock compartilhado, várias leituras
// concorrentes podem coexistir, só bloqueiam durante uma escrita em andamento.
function readRoom($code) {
  $path = roomFilePath($code);
  if (!file_exists($path)) return null;
  $handle = fopen($path, 'r');
  if (!$handle) return null;
  flock($handle, LOCK_SH);
  $contents = stream_get_contents($handle);
  flock($handle, LOCK_UN);
  fclose($handle);
  $room = json_decode($contents, true);
  return is_array($room) ? $room : null;
}

// Leitura+modificação+escrita atômica: $fn recebe o estado atual da sala e deve
// devolver o novo estado completo pra persistir (ou null pra abortar sem gravar nada,
// ex: quando a validação de permissão falha depois de já ter o array em mãos). O valor
// devolvido por essa função é sempre exatamente o que ficou gravado no arquivo — os
// endpoints devem montar a resposta HTTP a partir dele, não inventar um canal paralelo.
function withRoomLock($code, callable $fn) {
  $path = roomFilePath($code);
  if (!file_exists($path)) return ['__error' => 'not_found'];

  $handle = fopen($path, 'r+');
  if (!$handle) return ['__error' => 'io_error'];
  if (!flock($handle, LOCK_EX)) {
    fclose($handle);
    return ['__error' => 'lock_error'];
  }

  $contents = stream_get_contents($handle);
  $room = json_decode($contents, true);
  if (!is_array($room)) {
    flock($handle, LOCK_UN);
    fclose($handle);
    return ['__error' => 'corrupt'];
  }

  $result = $fn($room);

  if (is_array($result)) {
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($result, JSON_UNESCAPED_UNICODE));
    fflush($handle);
  }

  flock($handle, LOCK_UN);
  fclose($handle);

  return $result; // null = abortado sem gravar (chamador decide o que responder)
}

function createRoomFile($code, $room) {
  file_put_contents(roomFilePath($code), json_encode($room, JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function getRequestHeaders() {
  if (function_exists('getallheaders')) {
    $headers = getallheaders();
    if ($headers !== false) return $headers;
  }
  $headers = [];
  foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
      $name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($key, 5)))));
      $headers[$name] = $value;
    }
  }
  return $headers;
}

function getHeaderCI($headers, $name) {
  foreach ($headers as $k => $v) {
    if (strcasecmp($k, $name) === 0) return $v;
  }
  return null;
}

// Resolve o papel de quem está fazendo a requisição a partir dos headers de
// autenticação. Retorna ['role' => 'mestre'|'player'|null, 'player' => array|null].
// O papel NUNCA é declarado pelo cliente — é sempre recomputado aqui a partir do token.
function resolveAuth($room, $headers) {
  $masterToken = getHeaderCI($headers, 'X-Room-Master-Token');
  if ($masterToken && hash_equals($room['masterTokenHash'], hashToken($masterToken))) {
    return ['role' => 'mestre', 'player' => null];
  }

  $playerId = getHeaderCI($headers, 'X-Room-Player-Id');
  $playerToken = getHeaderCI($headers, 'X-Room-Player-Token');
  if ($playerId && $playerToken) {
    foreach ($room['players'] as $p) {
      if ($p['id'] === $playerId && hash_equals($p['tokenHash'], hashToken($playerToken))) {
        return ['role' => 'player', 'player' => $p];
      }
    }
  }

  return ['role' => null, 'player' => null];
}

// Checagem autoritativa de distância (Chebyshev, mesma convenção do overlay de
// Alcance de Movimento no cliente) entre a(s) ficha(s) do Jogador e uma célula do
// grid (ex: uma Porta) — usada pra validar de novo no servidor o que o cliente já
// checou, já que o papel/ownership nunca é confiável vindo só do cliente.
function playerNearGridCell($room, $player, $gridX, $gridY) {
  $ownedIds = $player['ownedObjectIds'] ?? [];
  $tileSize = $room['tileSize'] ?: 32;
  foreach ($room['objects'] as $o) {
    if (empty($o['id']) || !in_array($o['id'], $ownedIds, true)) continue;
    $ogx = (int) floor((($o['x'] ?? 0) + ($o['w'] ?? 0) / 2) / $tileSize);
    $ogy = (int) floor((($o['y'] ?? 0) + ($o['h'] ?? 0) / 2) / $tileSize);
    if (max(abs($ogx - $gridX), abs($ogy - $gridY)) <= 1) return true;
  }
  return false;
}

// Sala exposta ao cliente nunca inclui hashes de token
function publicRoomState($room, $auth) {
  $players = array_map(function ($p) {
    return [
      'id' => $p['id'],
      'displayName' => $p['displayName'],
      'ownedObjectIds' => $p['ownedObjectIds'],
      'permissions' => $p['permissions'],
      'lastSeenAt' => $p['lastSeenAt'] ?? null
    ];
  }, $room['players']);

  $you = ['role' => $auth['role']];
  if ($auth['role'] === 'player' && $auth['player']) {
    $you['playerId'] = $auth['player']['id'];
    $you['ownedObjectIds'] = $auth['player']['ownedObjectIds'];
    $you['permissions'] = $auth['player']['permissions'];
  }

  return [
    'version' => $room['version'],
    'mapWidth' => $room['mapWidth'],
    'mapHeight' => $room['mapHeight'],
    'tileSize' => $room['tileSize'],
    'layers' => $room['layers'],
    'layerVisibility' => $room['layerVisibility'],
    'objects' => $room['objects'],
    'openDoors' => $room['openDoors'],
    'players' => $players,
    'messages' => visibleMessages($room['messages'] ?? [], $auth),
    'you' => $you
  ];
}

// Sussurros ('to' setado) só voltam pro remetente e pro destinatário — nem o Mestre
// vê o conteúdo de um sussurro entre dois Jogadores. Filtrado aqui (não no cliente)
// porque é a única forma real de "privado": o cliente nunca recebe o texto de uma
// mensagem que não é dele.
function visibleMessages($messages, $auth) {
  $myId = $auth['role'] === 'mestre' ? 'GM' : ($auth['player']['id'] ?? null);
  return array_values(array_filter($messages, function ($m) use ($myId) {
    $to = $m['to'] ?? null;
    if ($to === null) return true; // pública
    return $to === $myId || ($m['fromId'] ?? null) === $myId;
  }));
}
