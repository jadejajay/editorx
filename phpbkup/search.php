<?php
// Simulate data (Replace this with your actual data source)
// Enable CORS for all domains (not recommended for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Set the Content-Type header to allow JSON responses (adjust as needed)
header("Content-Type: application/json");

$jsonData = file_get_contents('./products.json');

// Convert JSON string to a PHP associative array

$data = json_decode($jsonData, true);
if ($data === null) {
  // Handle the decoding error
  echo "Error decoding JSON";
}




// Get the search term and page number from the query parameters
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;

// Define the number of items per page
$itemsPerPage = 10;

// Filter the data based on the search term
// $filteredData = array_filter($data, function ($item) use ($searchTerm) {

//   return strpos(strtolower($item['subcategory']), strtolower($searchTerm)) !== false;
// });

/// 
$filteredData = array_filter($data, function ($item) use ($searchTerm) {
  $nameMatch = strpos(strtolower($item['name']), strtolower($searchTerm)) !== false;
  $categoryMatch = strpos(strtolower($item['category']), strtolower($searchTerm)) !== false;
  $subcategorymatch = strpos(strtolower($item['subCategory']), strtolower($searchTerm)) !== false;
  return $nameMatch || $categoryMatch || $subcategorymatch;
});


// Calculate the total number of items
$totalItems = count($filteredData);

// Calculate the total number of pages
$totalPages = ceil($totalItems / $itemsPerPage);

// Paginate the data based on the current page
$paginatedData = array_slice($filteredData, ($page - 1) * $itemsPerPage, $itemsPerPage);

// Prepare the response
$response = [
  'data' => $paginatedData,
  'totalItems' => $totalItems,
  'totalPages' => $totalPages,
  'currentPage' => $page,
];

// Convert the response to JSON and send it
header('Content-Type: application/json');
echo json_encode($response);