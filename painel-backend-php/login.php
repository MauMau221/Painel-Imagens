<?php
session_start();

// Headers CORS corretos para requisições com credenciais
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$users = include 'users.php';

if (isset($data['username'], $data['password'])) {
    $username = $data['username'];
    $password = $data['password'];
    if (isset($users[$username]) && $users[$username] === $password) {
        $_SESSION['user'] = $username;
        echo json_encode(['success' => true]);
        exit();
    }
}
http_response_code(401);
echo json_encode(['success' => false, 'message' => 'Credenciais inválidas']); 