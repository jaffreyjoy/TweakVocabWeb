<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$eid = $_POST['eid'];
$uname = $_POST['uname'];
$pass = $_POST['pass'];

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql1 = "INSERT INTO users (first_name,last_name,email_id,username,password) VALUES ('$fname','$lname','$eid','$uname','$pass')";
$result = $conn->query($sql1);
if ($result) {
	echo "success";
}



$conn->close();

?>