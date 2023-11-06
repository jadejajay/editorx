<?php
// Read the JSON data from demo.json file
  $fileContent = file_get_contents('categories.json');

  // Parse the JSON content into a PHP array
  $data = json_decode($fileContent, true);
  
  // Prepare the JSON response
  $response = [
    'status' => 'success',
    'data' => $data,
  ];
  
  // Convert the response to JSON and send it
  header('Content-Type: application/json');
  echo json_encode($response);
