<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

$user = $_POST['user'];
$pass = $_POST['pass'];

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql1 = "SELECT * FROM users WHERE (username='$user' OR email_id='$user') AND password='$pass'";
$result = $conn->query($sql1);
$num_rows = mysqli_num_rows($result);
if ($num_rows > 0) {
	$sql1 = "ALTER TABLE progress ADD $user int DEFAULT 0";
	$result1 = $conn->query($sql1);
	// header('Location: chapters.html'); 
	while ($row = $result->fetch_assoc()) {
	  	echo json_encode($row);
	}
	// echo $result;

	
} 
else
{
	echo "fail";
}


$conn->close();

?>