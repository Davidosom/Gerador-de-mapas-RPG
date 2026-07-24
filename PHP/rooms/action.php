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
      if (!$isMestre && !$owned) { $errorOut = 'forbidden'; $statusOut = 403; return null; }
      if (!isset($payload['x']) || !isset($payload['y'])) { $errorOut = 'invalid_payload'; $statusOut = 400; return null; }
      $room['objects'][$idx]['x'] = (float) $payload['x'];
      $room['objects'][$idx]['y'] = (float) $payload['y'];
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
      $pos = array_search($wallIndex, $room['openDoors'], true);
      if ($pos === false) $room['openDoors'][] = $wallIndex;
      else array_splice($room['openDoors'], $pos, 1);
      break;
    }

    case 'setDoors':
      // Usado depois de gerar dungeon / redimensionar: substitui a lista inteira
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
