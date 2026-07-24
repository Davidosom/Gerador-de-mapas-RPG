<?php
require_once __DIR__ . '/_lib.php';
requireMethod('POST');

$body = readJsonBody();
$snapshot = $body['mapSnapshot'] ?? null;
if (
  !is_array($snapshot) ||
  !isset($snapshot['layers']) || !is_array($snapshot['layers']) ||
  !isset($snapshot['mapWidth']) || !isset($snapshot['mapHeight'])
) {
  jsonResponse(['error' => 'invalid_snapshot'], 400);
}

$objects = is_array($snapshot['objects'] ?? null) ? array_values($snapshot['objects']) : [];
// Defesa em profundidade: o cliente já deveria mandar todo objeto com id (ver
// generateObjectId/backfill em app.js), mas a sala não confia cegamente nisso.
foreach ($objects as &$obj) {
  if (empty($obj['id'])) {
    $obj['id'] = generateEntityId((($obj['type'] ?? '') === 'frame') ? 'frame' : 'obj');
  }
}
unset($obj);

$masterToken = generateToken();
$code = generateRoomCode();

$room = [
  'code' => $code,
  'version' => 1,
  'createdAt' => gmdate('c'),
  'masterTokenHash' => hashToken($masterToken),
  'mapWidth' => (int) $snapshot['mapWidth'],
  'mapHeight' => (int) $snapshot['mapHeight'],
  'tileSize' => (int) ($snapshot['tileSize'] ?? 32),
  'layers' => $snapshot['layers'],
  'layerVisibility' => is_array($snapshot['layerVisibility'] ?? null)
    ? $snapshot['layerVisibility']
    : ['ground' => true, 'walls' => true, 'objects' => true],
  'objects' => $objects,
  'openDoors' => [],
  'players' => []
];

createRoomFile($code, $room);

jsonResponse(['roomCode' => $code, 'masterToken' => $masterToken]);
