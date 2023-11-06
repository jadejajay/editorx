<?php

$link = mysqli_connect("localhost", "u243405109_nimmidemo", "Nimmi@123","u243405109_nimmidemo");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");

// Check if the connection was successful
if (mysqli_connect_errno()) {
    // Database connection failed
    echo "50";
} else {
    // Database connection successful
	$requestBody = file_get_contents('php://input');
	$data = json_decode($requestBody, true);
	
	if ($data !== null) {
		// Access the data
		$key1 = $data['fire_id'];
		
		$sql = "SELECT fire_id FROM sharva_user";
		$result = mysqli_query($link, $sql);
	
		// Check if the user-entered email exists in the database
		$idExists = false;
		if ($result && mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				if ($row['fire_id'] === $key1) {
					$idExists = true;
					break;
				}
			}
		}
	
		if ($idExists) {
			$sql = "SELECT * FROM `sharva_user` WHERE `fire_id` = '$key1'";
			$res = mysqli_query($link, $sql);

			if ($res && mysqli_num_rows($res) > 0) {
                $row = mysqli_fetch_assoc($res);
                echo json_encode($row);
				mysqli_close($link);
			} else {
				echo "350";//query fail
				mysqli_close($link);
			}
			
		} else {
			header('Content-Type: application/json');
			echo "375";//id does not exist
			mysqli_close($link);
		}
	} else {
		// Unable to parse the data
		echo "500";
		mysqli_close($link);
	}
	mysqli_close($link);
}
?>
