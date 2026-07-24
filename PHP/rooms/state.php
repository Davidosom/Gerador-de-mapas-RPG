<?php
require_once __DIR__ . '/_lib.php';
requireMethod('GET');

$code = strtoupper(trim($_GET['roomCode'] ?? ''));
if (!isValidRoomCode($code)) jsonResponse(['error' => 'invalid_room_code'], 400);

$headers = getRequestHeaders();
$authOut = null;

// Sempre passa pelo lock (mesmo pra quem só está lendo) pra poder atualizar o
// lastSeenAt do jogador que está perguntando — sinal barato de "quem está online"
// pro painel de Jogadores do Mestre.
$result = withRoomLock($code, function ($room) use ($headers, &$authOut) {
  $auth = resolveAuth($room, $headers);
  $authOut = $auth;
  if ($auth['role'] === 'player' && $auth['player']) {
    foreach ($room['players'] as &$p) {
      if ($p['id'] === $auth['player']['id']) {
        $p['lastSeenAt'] = gmdate('c');
        $authOut['player'] = $p;
      }
    }
    unset($p);
  }
  return $room;
});

if (!is_array($result) || isset($result['__error'])) {
  $err = is_array($result) ? ($result['__error'] ?? 'unknown') : 'unknown';
  jsonResponse(['error' => $err], $err === 'not_found' ? 404 : 500);
}

if (!$authOut || $authOut['role'] === null) {
  jsonResponse(['error' => 'unauthorized'], 401);
}

jsonResponse(publicRoomState($result, $authOut));
