<?php
require_once __DIR__ . '/_lib.php';
requireMethod('POST');

$body = readJsonBody();
$code = strtoupper(trim($body['roomCode'] ?? ''));
$type = $body['type'] ?? '';
$payload = is_array($body['payload'] ?? null) ? $body['payload'] : [];

if (!isValidRoomCode($code)) jsonResponse(['error' => 'invalid_room_code'], 400);

$headers = getRequestHeaders();
$errorOut = null;
$statusOut = 400;

$result = withRoomLock($code, function ($room) use ($headers, $type, $payload, &$errorOut, &$statusOut) {
  $auth = resolveAuth($room, $headers);
  if ($auth['role'] === null) { $errorOut = 'unauthorized'; $statusOut = 401; return null; }

  $isMestre = $auth['role'] === 'mestre';
  $player = $auth['player'];

  $findObjectIndex = function ($id) use (&$room) {
    foreach ($room['objects'] as $i => $o) {
      if (($o['id'] ?? null) === $id) return $i;
    }
    return -1;
  };

  switch ($type) {
    case 'setLayers':
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      if (!isset($payload['layers']) || !is_array($payload['layers'])) {
        $errorOut = 'invalid_payload'; $statusOut = 400; return null;
      }
      $room['layers'] = $payload['layers'];
      if (isset($payload['mapWidth'])) $room['mapWidth'] = (int) $payload['mapWidth'];
      if (isset($payload['mapHeight'])) $room['mapHeight'] = (int) $payload['mapHeight'];
      break;

    case 'addObject':
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      $obj = $payload['object'] ?? null;
      if (!is_array($obj) || empty($obj['id'])) { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }
      if ($findObjectIndex($obj['id']) !== -1) { $errorOut = 'duplicate_id'; $statusOut = 409; return null; }
      if (!array_key_exists('ownerId', $obj)) $obj['ownerId'] = null;
      $room['objects'][] = $obj;
      break;

    case 'removeObject': {
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      $id = $payload['id'] ?? null;
      $idx = $id ? $findObjectIndex($id) : -1;
      if ($idx === -1) { $errorOut = 'not_found'; $statusOut = 404; return null; }
      array_splice($room['objects'], $idx, 1);
      foreach ($room['players'] as &$p) {
        $p['ownedObjectIds'] = array_values(array_diff($p['ownedObjectIds'], [$id]));
      }
      unset($p);
      break;
    }

    case 'moveObject': {
      $id = $payload['id'] ?? null;
      $idx = $id ? $findObjectIndex($id) : -1;
      if ($idx === -1) { $errorOut = 'not_found'; $statusOut = 404; return null; }
      $owned = $player && in_array($id, $player['ownedObjectIds'] ?? [], true);
      // Objeto sem ficha (type !== 'frame') é livre pra qualquer Jogador mexer,
      // mesmo sem ownership — só ficha exige ser dono.
      $isFrame = ($room['objects'][$idx]['type'] ?? null) === 'frame';
      if (!$isMestre && !$owned && $isFrame) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      if (!isset($payload['x']) || !isset($payload['y'])) { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }
      $room['objects'][$idx]['x'] = (float) $payload['x'];
      $room['objects'][$idx]['y'] = (float) $payload['y'];
      break;
    }

    case 'moveObjects': {
      // Movimento em lote (arraste de múltiplos objetos selecionados de uma vez).
      // Best-effort por item: ids inválidos/sem permissão são ignorados em vez de
      // abortar o lote inteiro.
      $moves = is_array($payload['moves'] ?? null) ? $payload['moves'] : [];
      foreach ($moves as $mv) {
        if (!is_array($mv)) continue;
        $id = $mv['id'] ?? null;
        $idx = $id ? $findObjectIndex($id) : -1;
        if ($idx === -1) continue;
        $owned = $player && in_array($id, $player['ownedObjectIds'] ?? [], true);
        $isFrame = ($room['objects'][$idx]['type'] ?? null) === 'frame';
        if (!$isMestre && !$owned && $isFrame) continue;
        if (!isset($mv['x']) || !isset($mv['y'])) continue;
        $room['objects'][$idx]['x'] = (float) $mv['x'];
        $room['objects'][$idx]['y'] = (float) $mv['y'];
      }
      break;
    }

    case 'updateObject': {
      $id = $payload['id'] ?? null;
      $fields = is_array($payload['fields'] ?? null) ? $payload['fields'] : [];
      $idx = $id ? $findObjectIndex($id) : -1;
      if ($idx === -1) { $errorOut = 'not_found'; $statusOut = 404; return null; }

      if ($isMestre) {
        foreach ($fields as $k => $v) $room['objects'][$idx][$k] = $v;
        break;
      }

      $owned = $player && in_array($id, $player['ownedObjectIds'] ?? [], true);
      if (!$owned) { $errorOut = 'forbidden'; $statusOut = 403; return null; }

      // Um Jogador só pode mexer nesses campos, mesmo dono do objeto. Posição/tamanho/
      // minimizado são nível "dono" (o toggle de minimizar recalcula x/y/w/h pra manter
      // o token centralizado — mesmo nível de liberdade que já existe pra mover o
      // token). 'template', 'imagem', 'tileId' continuam exclusivos do Mestre.
      // 'attributes' só entra se o Mestre tiver liberado editOwnAttributes.
      $allowedKeys = ['minimized', 'x', 'y', 'w', 'h'];
      if (!empty($player['permissions']['editOwnAttributes'])) $allowedKeys[] = 'attributes';

      foreach ($fields as $k => $v) {
        if (!in_array($k, $allowedKeys, true)) { $errorOut = 'field_not_allowed'; $statusOut = 403; return null; }
      }
      foreach ($fields as $k => $v) $room['objects'][$idx][$k] = $v;
      break;
    }

    case 'toggleDoor': {
      $wallIndex = $payload['wallIndex'] ?? null;
      if (!is_numeric($wallIndex)) { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }
      $wallIndex = (int) $wallIndex;

      // Jogador só abre porta a até 1 bloco da própria ficha; Mestre não tem
      // restrição. Checagem autoritativa — o cliente já filtra isso, mas o servidor
      // nunca confia só nisso.
      if (!$isMestre) {
        $mapWidth = $room['mapWidth'] ?: 1;
        $doorGX = $wallIndex % $mapWidth;
        $doorGY = intdiv($wallIndex, $mapWidth);
        if (!playerNearGridCell($room, $player, $doorGX, $doorGY)) {
          $errorOut = 'too_far'; $statusOut = 403; return null;
        }
      }

      $pos = array_search($wallIndex, $room['openDoors'], true);
      if ($pos === false) $room['openDoors'][] = $wallIndex;
      else array_splice($room['openDoors'], $pos, 1);
      break;
    }

    case 'setDoors':
      // Usado depois de gerar cenário / redimensionar: substitui a lista inteira
      // (tipicamente esvaziando, já que os índices antigos perdem sentido).
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      $room['openDoors'] = is_array($payload['openDoors'] ?? null) ? array_values($payload['openDoors']) : [];
      break;

    case 'setPlayerOwnership': {
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      $playerId = $payload['playerId'] ?? null;
      $ownedObjectIds = is_array($payload['ownedObjectIds'] ?? null) ? array_values($payload['ownedObjectIds']) : [];
      $found = false;
      foreach ($room['players'] as &$p) {
        if ($p['id'] === $playerId) { $p['ownedObjectIds'] = $ownedObjectIds; $found = true; }
      }
      unset($p);
      if (!$found) { $errorOut = 'not_found'; $statusOut = 404; return null; }

      foreach ($room['objects'] as &$o) {
        if (empty($o['id'])) continue;
        if (in_array($o['id'], $ownedObjectIds, true)) $o['ownerId'] = $playerId;
        elseif (($o['ownerId'] ?? null) === $playerId) $o['ownerId'] = null;
      }
      unset($o);
      break;
    }

    case 'chatMessage': {
      // Sem checagem de papel: Mestre e Jogador podem ambos conversar/rolar dados.
      $msg = $payload['message'] ?? null;
      if (!is_array($msg) || empty($msg['text']) || !is_string($msg['text'])) {
        $errorOut = 'invalid_payload'; $statusOut = 400; return null;
      }
      $text = mb_substr(trim($msg['text']), 0, 500);
      if ($text === '') { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }

      // Autor sempre resolvido a partir da autenticação (nunca do texto mandado pelo
      // cliente) — evita um Jogador se passar por "Mestre" ou por outro Jogador.
      $author = $isMestre ? '🎲 Mestre' : mb_substr((string) ($player['displayName'] ?? 'Jogador'), 0, 60);
      $fromId = $isMestre ? 'GM' : $player['id'];

      // Destinatário opcional (sussurro): 'GM' ou o id de um Jogador presente na sala.
      // Ausente/inválido = mensagem pública, visível pra sala inteira.
      $to = $msg['to'] ?? null;
      if ($to !== null) {
        if (!is_string($to)) { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }
        $validTo = $to === 'GM' || in_array($to, array_column($room['players'], 'id'), true);
        if (!$validTo) { $errorOut = 'invalid_recipient'; $statusOut = 400; return null; }
        // Sussurro pro próprio remetente não faz sentido — trata como público.
        if ($to === $fromId) $to = null;
      }

      $entry = [
        // Prefere o id gerado no cliente (permite ao remetente identificar seu
        // próprio eco otimista e não duplicar a mensagem quando ela volta pelo poll).
        'id' => (is_string($msg['id'] ?? null) && $msg['id'] !== '') ? $msg['id'] : generateEntityId('msg'),
        'author' => $author,
        'fromId' => $fromId,
        'to' => $to,
        'text' => $text,
        'isRoll' => !empty($msg['isRoll']),
        'ts' => (int) round(microtime(true) * 1000)
      ];

      if (!isset($room['messages'])) $room['messages'] = [];
      $room['messages'][] = $entry;
      // Sala é um arquivo JSON inteiro reescrito sob lock a cada ação — um log sem
      // limite deixaria toda ação futura (inclusive edições de mapa) progressivamente
      // mais lenta.
      if (count($room['messages']) > 200) {
        $room['messages'] = array_slice($room['messages'], -200);
      }
      break;
    }

    case 'setPlayerPermission': {
      if (!$isMestre) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      $playerId = $payload['playerId'] ?? null;
      $permission = $payload['permission'] ?? null;
      $value = (bool) ($payload['value'] ?? false);
      $whitelist = ['editOwnAttributes']; // extensão futura: só precisa crescer essa lista
      if (!in_array($permission, $whitelist, true)) { $errorOut = 'invalid_permission'; $statusOut = 400; return null; }
      $found = false;
      foreach ($room['players'] as &$p) {
        if ($p['id'] === $playerId) { $p['permissions'][$permission] = $value; $found = true; }
      }
      unset($p);
      if (!$found) { $errorOut = 'not_found'; $statusOut = 404; return null; }
      break;
    }

    default:
      $errorOut = 'unknown_action';
      $statusOut = 400;
      return null;
  }

  $room['version'] = ($room['version'] ?? 0) + 1;
  return $room;
});

if ($result === null) {
  jsonResponse(['error' => $errorOut ?? 'unknown'], $statusOut ?: 400);
}
if (isset($result['__error'])) {
  $err = $result['__error'];
  jsonResponse(['error' => $err], $err === 'not_found' ? 404 : 500);
}

jsonResponse(['success' => true, 'version' => $result['version']]);
