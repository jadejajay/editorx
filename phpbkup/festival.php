<?php

$data = array();

for ($i = 0; $i <= 6; $i++) {
    $model = 'http://itekindia.com/sharva/festival/main' . $i . '.jpg';
    $data[$i] = $model;
}
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests

$randomJPG = $data[array_rand($data)];
echo $randomJPG;

?>
