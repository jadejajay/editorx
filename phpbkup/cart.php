<?php

// Function to establish database connection
function getDbConnection()
{
    $host = 'localhost';
    $username = 'u243405109_nimmidemo';
    $password = 'Nimmi@123';
    $database = 'u243405109_nimmidemo';

    return mysqli_connect($host, $username, $password, $database);
}

// Function to handle database errors
function handleDbError($connection)
{
    if (!$connection) {
        die('Database connection failed: ' . mysqli_connect_error());
    }
}

// CREATE - Add a new product to the database
function createProduct($data)
{
    $connection = getDbConnection();
    handleDbError($connection);

    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $quantity = $data['quantity'];

    $sql = "INSERT INTO products (name, description, price, quantity)
            VALUES ('$name', '$description', '$price', '$quantity')";

    if (mysqli_query($connection, $sql)) {
        $productId = mysqli_insert_id($connection);
        return ['message' => 'Product created successfully', 'id' => $productId];
    } else {
        return ['error' => 'Error: ' . mysqli_error($connection)];
    }
}

// READ - Get all products from the database
function getAllProducts()
{
    $connection = getDbConnection();
    handleDbError($connection);

    $sql = "SELECT * FROM products";
    $result = mysqli_query($connection, $sql);

    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    return $products;
}

// UPDATE - Update a product in the database
function updateProduct($id, $data)
{
    $connection = getDbConnection();
    handleDbError($connection);

    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $quantity = $data['quantity'];

    $sql = "UPDATE products
            SET name = '$name', description = '$description', price = '$price', quantity = '$quantity'
            WHERE id = '$id'";

    if (mysqli_query($connection, $sql)) {
        return ['message' => 'Product updated successfully'];
    } else {
        return ['error' => 'Error: ' . mysqli_error($connection)];
    }
}

// DELETE - Delete a product from the database
function deleteProduct($id)
{
    $connection = getDbConnection();
    handleDbError($connection);

    $sql = "DELETE FROM products WHERE id = '$id'";

    if (mysqli_query($connection, $sql)) {
        return ['message' => 'Product deleted successfully'];
    } else {
        return ['error' => 'Error: ' . mysqli_error($connection)];
    }
}

// Handle incoming HTTP requests

// Determine the request method
$method = $_SERVER['REQUEST_METHOD'];

// Get the request data (for POST, PUT, PATCH requests)
$data = json_decode(file_get_contents('php://input'), true);

// Perform CRUD operation based on the request method
switch ($method) {
    case 'POST': // Create
        $response = createProduct($data);
        break;
    case 'GET': // Read
        $response = getAllProducts();
        break;
    case 'PUT': // Update
    case 'PATCH':
        $id = $_GET['id'];
        $response = updateProduct($id, $data);
        break;
    case 'DELETE': // Delete
        $id = $_GET['id'];
        $response = deleteProduct($id);
        break;
    default:
        $response = ['error' => 'Invalid request method'];
        http_response_code(405);
        break;
}

// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
