<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit(json_encode(['error' => 'Método não permitido'])); }

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data || !isset($data['layers'])) { http_response_code(400); exit(json_encode(['error' => 'Dados inválidos'])); }

$mapName = preg_replace('/[^a-zA-Z0-9_\-]/', '', $data['name'] ?? 'mapa_sem_nome');
$dir = __DIR__ . '/../data';
if (!is_dir($dir)) mkdir($dir, 0755, true);

$filepath = $dir . '/' . $mapName . '.json';
if (file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
  echo json_encode(['success' => true, 'file' => $mapName]);
} else {
  http_response_code(500); echo json_encode(['error' => 'Falha ao salvar no disco']);
}
?>