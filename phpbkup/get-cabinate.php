<?php

// Generate random data
$randomData = array();

for ($i = 1; $i <= 60; $i++) {
    $model = '500' . (int)(($i - 1) / 5 + 1);
    $sizeOptions = ['Recommended', 'New', 'Best'];
    $randomSize = $sizeOptions[array_rand($sizeOptions)];
    $sizeOptions2 = ['Satin', 'Brass Antique', 'Cocacola Matt','Rainbow Matt', 'Chrome'];
    $randomSize2 = $sizeOptions2[array_rand($sizeOptions2)];
    $data = array(
        'id' => $i,
        'model' => $model,
        'name' => 'Product ' . $i,
        'image' => 'http://itekindia.com/sharva/products/cabinet/1 (' . $i . ').png',
        'catalogue' => 'http://itekindia.com/sharva/extra/cabinet.pdf',
        'category' => 'Cabinet Handle',
        'subCategory' => $randomSize,
        'finishing' => $randomSize2,
        'sizes' => array('96 mm', '160 mm', '224 mm', '288 mm'),
        'box_packing' => array('15', '15', '10', '10'),
        'star' => '3.8',
        'ratingCount' => rand(10, 1000),
        'price' => rand(1000, 2000),
        'oldPrice' => rand(2000, 3000),
        'title' => 'This is title of this product which can be very long',
        'description' => 'This is description of this product which can be very long as you want up to 5000 character blob ',
        'offer' => 'This is offer of this product which can be 50 character blob ',
        'tags' => array('tag1', 'tag2', 'tag3'),
        'highlights' => array('highlight1', 'highlight2', 'highlight3'),
    );

    $randomData[] = $data;
}

// Convert data to JSON
$jsonData = json_encode($randomData);

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests

// Send JSON response
echo $jsonData;
?>

