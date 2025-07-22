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

if (isset($_SESSION['user'])) {
    echo json_encode(['authenticated' => true, 'user' => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
} 