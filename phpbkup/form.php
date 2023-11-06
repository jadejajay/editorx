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
		$key1 = $data['email'];
		$email = strtolower(trim($key1));
		$password = $data['password'];
		$name = $data['name'];
		$phone = $data['phone'];
		$city = $data['city'];
		$area = $data['area'];
		$state = $data['state'];
		
	if (($email==null |""|" " )&&($name==null | "" | " ")&&($password==null | "" | " ")&&($phone==null | "" | " ")&&($city==null | "" | " ")&&($area==null | "" | " ")&&($state==null | "" | " ")      ) {
		echo "100";
	} else {
		$sql = "SELECT email FROM user";
		$result = mysqli_query($link, $sql);
	
		// Check if the user-entered email exists in the database
		$emailExists = false;
		if ($result && mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				if ($row['email'] === $key1) {
					$emailExists = true;
					break;
				}
			}
		}
	
		if ($emailExists) {
			
			echo "200";//email found
		} else {
			$qry = "INSERT INTO `user` (`id`, `name`, `email`, `password`, `phone`, `area`, `city`, `state`) VALUES (NULL, '$name', '$email', '$password', $phone, '$area', '$city', '$state');";
			$res = mysqli_query($link, $qry);
			$qry = "SELECT * FROM `user` WHERE `email` = '$email';";
			$res =  mysqli_query($link, $qry);
			header('Content-Type: application/json');
			
			if ($res && mysqli_num_rows($res) > 0) {
					$data1 = mysqli_fetch_assoc(mysqli_query($link, $qry));
					$data1 = ["user" => $data1];
					echo json_encode($data1);
					mysqli_close($link);
			} else {
				echo "350";//query fail
				mysqli_close($link);
			}
		}
	}
	} else {
		// Unable to parse the data
		echo "500";
		mysqli_close($link);
	}
	mysqli_close($link);
}
?>