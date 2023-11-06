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
		$name = $data['name'];
		$company = $data['company'];
		$type = $data['type'];
		$phone = $data['phone'];
		$address = $data['address'];
		$email = $data['email'];
		$location = $data['location'];
		$contpdf = $data['contpdf'];
		$insta = $data['insta'];
		$facebook = $data['facebook'];
		$image = $data['image'];
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
			$sql = "UPDATE `sharva_user` SET  `email` = '$email', `name` = '$name', `company` = '$company', `type` = '$type',`location` = '$location', `phone` = $phone, `address` = '$address', `contpdf` = '$contpdf', `insta` = '$insta', `facebook` = '$facebook', `image` = '$image' WHERE fire_id = '$key1'";
			$res = mysqli_query($link, $sql);
			$affectedRows = mysqli_affected_rows($link);
			if ($res){

				if ($affectedRows > 0) {
					echo "updated";
					mysqli_close($link);
				} else {
					echo "375";//query fail
					mysqli_close($link);
				}
			} else {
				echo "3501";//query fail
				mysqli_close($link);
			}
		} else {
			$qry = "INSERT INTO `sharva_user` (`id`, `name`, `company`, `type`, `phone`, `address`, `email`, `location`, `contpdf`, `insta`, `facebook`, `image`, `fire_id`) VALUES (NULL, '$name', '$company', '$type', $phone, '$address', '$email', '$location', '$contpdf', '$insta', '$facebook', '$image', '$key1');";
			$res = mysqli_query($link, $qry);
			header('Content-Type: application/json');
			if ($res) {
				$affectedRows = mysqli_affected_rows($link);
				if ($affectedRows > 0) {
				  echo 'Data inserted successfully into the SQL database.';
				  mysqli_close($link);
				} else {
				  echo 'No rows were inserted.';
				  mysqli_close($link);
				}
			  } else {
				echo 'Error inserting data: ' . mysqli_error($link);
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

