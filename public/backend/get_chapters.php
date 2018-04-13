<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$get_no_chapters = "SELECT COUNT(DISTINCT chapter) AS noOfChapters FROM origin";
$result = $conn->query($get_no_chapters);
$num_rows = mysqli_num_rows($result);
$no_chapters= mysqli_fetch_assoc($result);
if ($num_rows > 0) {
	echo json_encode($no_chapters);
}
else
{
	echo "no_data";
}


$conn->close();

?>