<?php
// Headers CORS corretos para requisições com credenciais
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$configPath = __DIR__ . '/config.json';
if (!file_exists($configPath)) {
    file_put_contents($configPath, '{}');
}
$config = json_decode(file_get_contents($configPath), true);
echo json_encode($config); 