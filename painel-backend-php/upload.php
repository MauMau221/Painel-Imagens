<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Não autenticado']);
    exit();
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nenhuma imagem enviada']);
    exit();
}

$uploadsDir = __DIR__ . '/uploads/';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$originalName = basename($_FILES['image']['name']);
$safeName = preg_replace('/[^a-zA-Z0-9.\-_]/', '_', $originalName);
$filename = time() . '-' . $safeName;
$targetPath = $uploadsDir . $filename;

if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
    $imagePath = '/uploads/' . $filename;
    echo json_encode(['success' => true, 'image' => $imagePath]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar imagem']);
} 