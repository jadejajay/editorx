<?php
// Check if a file was uploaded
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
$current_time = date("H:i:s");
if (isset($_FILES['file'])) {
    $uploadDir = 'uploads/'; // Specify the upload directory
    $uploadedFile = $uploadDir . $current_time . basename($_FILES['file']['name']);
        // Try to move the uploaded file to the specified directory
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile)) {
            $imageUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/octoria/dashboard/' . $uploadedFile; // Construct the image URL
            echo $imageUrl;
        } else {
            echo 'Error uploading file.';
        }
} else {
    echo 'No file was uploaded.';
}
?>
