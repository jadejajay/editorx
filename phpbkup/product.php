<?php

// Enable CORS for all domains (not recommended for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Set the Content-Type header to allow JSON responses (adjust as needed)
header("Content-Type: application/json");

$jsonData = file_get_contents('products.json');
$data = json_decode($jsonData, true);

$id = isset($_GET['id']) ? $_GET['id'] : '';

$item = null;
foreach ($data as $value) {
  if ($value['id'] == $id) {
    $item = $value;
    break;
  }
}

if ($item) {
  header('Content-Type: application/json');
  echo json_encode($item);
} else {
  echo 'Item not found';
}
