
<?php

$jsonData = array(
  'changed' => 0
);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");
echo json_encode($jsonData);

?>
