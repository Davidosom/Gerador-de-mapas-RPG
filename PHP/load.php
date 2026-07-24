<?php
header('Content-Type: application/json; charset=utf-8');
$mapName = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_GET['name'] ?? '');
$filepath = __DIR__ . '/../data/' . $mapName . '.json';

if (!file_exists($filepath)) { http_response_code(404); exit(json_encode(['error' => 'Mapa não encontrado'])); }

echo file_get_contents($filepath);
?>