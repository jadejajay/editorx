<?php
$hostname = 'localhost';
$port = 8000;
$timeout = 5; // Timeout in seconds

// Attempt to open a socket connection
$socket = @fsockopen($hostname, $port, $errno, $errstr, $timeout);

// Check if the socket connection was successful
if ($socket) {
    echo "Socket is available";
    fclose($socket);
} else {
    echo "Socket is not available";
}
?>
