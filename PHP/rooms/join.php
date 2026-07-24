<?php
require_once __DIR__ . '/_lib.php';
requireMethod('POST');

$body = readJsonBody();
$code = strtoupper(trim($body['roomCode'] ?? ''));
if (!isValidRoomCode($code)) jsonResponse(['error' => 'invalid_room_code'], 400);

$reconnectId = $body['playerId'] ?? null;
$reconnectToken = $body['playerToken'] ?? null;

// Reconexão (F5 / voltou pra aba): não cria jogador novo, só valida a sessão salva.
if ($reconnectId && $reconnectToken) {
  $room = readRoom($code);
  if (!$room) jsonResponse(['error' => 'not_found'], 404);

  foreach ($room['players'] as $p) {
    if ($p['id'] === $reconnectId && hash_equals($p['tokenHash'], hashToken($reconnectToken))) {
      jsonResponse([
        'roomCode' => $code,
        'playerId' => $p['id'],
        'displayName' => $p['displayName'],
        'permissions' => $p['permissions']
      ]);
    }
  }
  jsonResponse(['error' => 'invalid_session'], 401);
}

// Entrada nova: precisa de nome de exibição
$displayName = trim((string) ($body['displayName'] ?? ''));
if ($displayName === '') jsonResponse(['error' => 'missing_display_name'], 400);
if (mb_strlen($displayName) > 40) $displayName = mb_substr($displayName, 0, 40);

$playerToken = generateToken();
$playerId = generateEntityId('player');

$result = withRoomLock($code, function ($room) use ($playerId, $playerToken, $displayName) {
  $room['players'][] = [
    'id' => $playerId,
    'tokenHash' => hashToken($playerToken),
    'displayName' => $displayName,
    'ownedObjectIds' => [],
    'permissions' => ['editOwnAttributes' => false],
    'joinedAt' => gmdate('c'),
    'lastSeenAt' => gmdate('c')
  ];
  return $room;
});

if (!is_array($result) || isset($result['__error'])) {
  $err = $result['__error'] ?? 'unknown';
  jsonResponse(['error' => $err], $err === 'not_found' ? 404 : 500);
}

jsonResponse([
  'roomCode' => $code,
  'playerId' => $playerId,
  'playerToken' => $playerToken,
  'displayName' => $displayName,
  'permissions' => ['editOwnAttributes' => false]
]);
