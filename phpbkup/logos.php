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
		  $qry = "SELECT * FROM `logos`";
			$res = mysqli_query($link, $qry);
      $rows = array();
			header('Content-Type: application/json');
		
			if ($res && mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
          $rows[] = $row;
      }
        mysqli_free_result($res);
        echo json_encode($rows);
				mysqli_close($link);
			} else {
				echo "350";
        mysqli_close($link);
			}
}
?>