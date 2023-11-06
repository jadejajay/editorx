<?php
// Check if the form was submitted
// Function to read data from the JSON file
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specified HTTP methods
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json");
function readData()
{
  $jsonString = file_get_contents("../products.json");
  return json_decode($jsonString, true);
}

// Function to write data to the JSON file
function writeData($data)
{
  $jsonString = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("../products.json", $jsonString);
}
// Check if the form was submitted for creating a new product
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["create"])) {
  // Retrieve form data and store it in an array
  $product = [
    "id" => $_POST["id"],
    "images" => explode(",", $_POST["images"]),
    "catalogue" => $_POST["catalogue"],
    "image3d" => $_POST["image3d"],
    "name" => $_POST["name"],
    "price" => $_POST["price"],
    "description" => $_POST["description"],
    "category" => $_POST["category"],
    "subCategory" => $_POST["subCategory"],
    "sizes" => explode(",", $_POST["sizes"]),
    "material" => $_POST["material"],
    "finishing" => explode(",", $_POST["finishing"]),
    "type" => $_POST["type"],
    "quantity" => explode(",", $_POST["quantity"]),
    "featured" => isset($_POST["featured"]) && $_POST["featured"] === "true",
  ];

  // Read existing data from data.json
  $jsonData = readData();

  // Add the new product data to the existing data array
  $jsonData[] = $product;

  // Write the updated data back to the data.json file
  writeData($jsonData);
  $jsonData = readData();

  echo "Product added successfully!";
}
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["read"])) {
  // Read existing data from data.json
  $jsonData = readData();

  // Return the JSON data as a response
  header("Content-Type: application/json");
  echo json_encode($jsonData, JSON_PRETTY_PRINT);
}
// Check if the form was submitted for updating a product
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["update"])) {
  $productId = $_POST["id"]; // ID of the product to update

  // Read existing data from products.json
  $jsonData = readData();

  // Find the index of the product to update
  $productIndex = -1;
  foreach ($jsonData as $index => $product) {
    if ($product["id"] == $productId) {
      $productIndex = $index;
      break;
    }
  }

  if ($productIndex !== -1) {
    // Update the product with the new data, if provided
    if (isset($_POST["images"])) {
      $jsonData[$productIndex]["images"] = explode(",", $_POST["images"]);
    }
    if (isset($_POST["catalogue"])) {
      $jsonData[$productIndex]["catalogue"] = $_POST["catalogue"];
    }
    if (isset($_POST["image3d"])) {
      $jsonData[$productIndex]["image3d"] = $_POST["image3d"];
    }
    if (isset($_POST["name"])) {
      $jsonData[$productIndex]["name"] = $_POST["name"];
    }
    if (isset($_POST["price"])) {
      $jsonData[$productIndex]["price"] = $_POST["price"];
    }
    if (isset($_POST["description"])) {
      $jsonData[$productIndex]["description"] = $_POST["description"];
    }
    if (isset($_POST["category"])) {
      $jsonData[$productIndex]["category"] = $_POST["category"];
    }
    if (isset($_POST["subCategory"])) {
      $jsonData[$productIndex]["subCategory"] = $_POST["subCategory"];
    }
    if (isset($_POST["sizes"])) {
      $jsonData[$productIndex]["sizes"] = explode(",", $_POST["sizes"]);
    }
    if (isset($_POST["material"])) {
      $jsonData[$productIndex]["material"] = $_POST["material"];
    }
    if (isset($_POST["finishing"])) {
      $jsonData[$productIndex]["finishing"] = explode(",", $_POST["finishing"]);
    }
    if (isset($_POST["type"])) {
      $jsonData[$productIndex]["type"] = $_POST["type"];
    }
    if (isset($_POST["quantity"])) {
      $jsonData[$productIndex]["quantity"] = explode(",", $_POST["quantity"]);
    }
    if (isset($_POST["featured"])) {
      $jsonData[$productIndex]["featured"] = $_POST["featured"] === "true";
    }

    // Write the updated data back to the products.json file
    writeData($jsonData);

    echo "Product updated successfully!";
  } else {
    echo "Product not found!";
  }
}

// Check if the form was submitted for deleting a product
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["delete"])) {
  $productId = $_POST["id"]; // ID of the product to delete

  // Read existing data from data.json
  $jsonData = readData();

  // Find the index of the product to delete
  $productIndex = -1;
  foreach ($jsonData as $index => $product) {
    if ($product["id"] == $productId) {
      $productIndex = $index;
      break;
    }
  }

  if ($productIndex !== -1) {
    // Remove the product from the data array
    array_splice($jsonData, $productIndex, 1);

    // Write the updated data back to the data.json file
    writeData($jsonData);

    echo "Product deleted successfully!";
  } else {
    echo "Product not found!";
  }
}
