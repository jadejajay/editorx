<?php
// Enable CORS for all domains (not recommended for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Set the Content-Type header to allow JSON responses (adjust as needed)
header("Content-Type: application/json");

$jsonData = file_get_contents('products.json');
$data = json_decode($jsonData, true);

$featuredItems = array();
foreach ($data as $value) {
  if ($value['featured']) {
    $featuredItems[] = $value;
  }
}

if (count($featuredItems) > 0) {
  header('Content-Type: application/json');
  echo json_encode($featuredItems);
} else {
  throw new Exception('No items found');
}
