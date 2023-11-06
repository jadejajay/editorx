<?php
// Set the response headers to indicate JSON content
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve the username value from the request body
  $requestData = json_decode(file_get_contents('php://input'), true);
  $username = isset($requestData['username']) ? $requestData['username'] : '';
  $userimage = isset($requestData['userimage']) ? $requestData['userimage'] : '';
  $backgroundImage = isset($requestData['backgroundImage']) ? $requestData['backgroundImage'] : '';

  $width = $width * 0.9;
  $height = $height * 0.6;
  $fileData = file_get_contents('mockups-post/post.svg');
  $replacement = str_replace('USERagentIMAGE',$userimage , $fileData);
  $replacement = str_replace('USERagentNAME',$username , $replacement);
  $replacement = str_replace('NetworkImageURI',$backgroundImage , $replacement);
  // Convert the response data array to JSON format

  // Output the JSON response
  echo $replacement;
}
?>
