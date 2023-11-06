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
{		$sql = "SELECT email FROM user";
		$result = mysqli_query($link, $sql);
	
		// Check if the user-entered email exists in the database
		if ($result && mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				if ($row['email'] === $key1) {
					$emailExists = true;
					break;
				}
			}
		}
	
		if ($emailExists) {
			$qry = "SELECT * FROM `user` WHERE `email` = '$key1';";
			$res = mysqli_query($link, $qry);
			header('Content-Type: application/json');
		
			if ($res && mysqli_num_rows($res) > 0) {
				$data1 = mysqli_fetch_assoc(mysqli_query($link, $qry));
					echo json_encode($data1);
					mysqli_close($link);
			} else {
				echo "350";
                mysqli_close($link);
			}
		} else {
			echo "400";
            mysqli_close($link);
		}
	}
	mysqli_close($link);
}
?>