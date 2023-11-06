<?php

// Generate random data
$randomData = array();

for ($i = 1; $i <= 15; $i++) {
    $model = '50' . (int)(($i - 1) / 5 + 19);
    $sizeOptions = ['Recommended', 'New', 'Best'];
    $randomSize = $sizeOptions[array_rand($sizeOptions)];
    $sizeOptions2 = ['Satin', 'Brass Antique', 'Cocacola Matt','Rainbow Matt', 'Chrome'];
    $randomSize2 = $sizeOptions2[array_rand($sizeOptions2)];
    $sizeOptions3 = ['299', '399', '499','599', '699'];
    $sizeOptions4 = ['249', '349', '449','549', '649'];
    $randomSize3 = $sizeOptions2[array_rand($sizeOptions2)];
    $data = array(
        'id' => '20' . $i,
        'model' => $model,
        'name' => 'Product ' . $i,
        'image' => 'http://itekindia.com/sharva/products/knobs/1 (' . $i . ').png',
        'catalogue' => 'http://itekindia.com/sharva/extra/Knob.pdf',
        'category' => 'Drawer Knobs',
        'subCategory' => $randomSize,
        'finishing' => $randomSize2,
        'sizes' => array('96 mm', '160 mm', '224 mm', '288 mm'),
        'box_packing' => array('15', '15', '10', '10')
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
