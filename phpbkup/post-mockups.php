<?php
// Set the response headers to indicate JSON content
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");


//http://itekindia.com/IBAIS/mockups-post/bgdark.png
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve the username value from the request body
  $requestData = json_decode(file_get_contents('php://input'), true);
  $username = isset($requestData['username']) ? $requestData['username'] : '';
  $image = isset($requestData['image']) ? $requestData['image'] : '';
  $search = ['Guest User','http://itekindia.com/sharva/Avatarbig.png'];
  $replace = [$username,$image];
  // <Circle r={128} cx={128} cy={128} color="red" />
  // Prepare the response data
  // Read the JSON data from demo.json file
  $jsonData = file_get_contents('post.json');
  
  // Convert JSON string to a PHP associative array
  $dataArray = json_decode($jsonData, true);
  function recursiveReplace(&$data, $search, $replace) {
    foreach ($data as &$value) {
        if (is_array($value)) {
            recursiveReplace($value, $search, $replace);
        } elseif (is_string($value)) {
            $value = str_replace($search, $replace, $value);
        }
    }
}

recursiveReplace($dataArray, $search, $replace);

  // Modify the data as needed
  // $dataArray['name'] = 'Jane Doe';
  // $dataArray['age'] = 35;
  //festival     http://itekindia.com/sharva/festival/main0.jpg
  //userimage    http://itekindia.com/sharva/Avatarbig.png
  //username     Guest User
  
  // Convert the modified PHP associative array back to a JSON string
  $modifiedJsonData = json_encode($dataArray, JSON_PRETTY_PRINT);
  
  // Write the updated JSON string back to the file (optional, you can skip this step if you don't want to update the file)
  // file_put_contents('demo.json', $modifiedJsonData);
  
  // Send the modified JSON data as the response
  echo $modifiedJsonData;
  // echo json_encode($dataArray);
}
  ?>
  
