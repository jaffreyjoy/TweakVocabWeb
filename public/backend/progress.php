<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

$chap = $_POST['chap'];

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql1 = "SELECT id FROM derived";
$result = $conn->query($sql1);
$num_rows = mysqli_num_rows($result);
while($row = mysqli_fetch_assoc($result))
    $test[] = $row;

if ($num_rows > 0) {
	echo json_encode($test);
}
else
{
	echo "None";
}









// $sql1 = "SELECT id FROM derived WHERE chapter='1' AND deck='1'";
// $result = $conn->query($sql1);
// $num_rows = mysqli_num_rows($result);
// while($row = mysqli_fetch_assoc($result))
//     $test[] = $row;

// $sql1 = "SELECT id FROM derived WHERE chapter='1' AND deck='1'";
// $result = $conn->query($sql1);
// $num_rows = mysqli_num_rows($result);
// while($row = mysqli_fetch_assoc($result))
//     $test[] = $row;

// if ($num_rows > 0) {
// 	echo json_encode($test);
// }
// else
// {
// 	echo "None";
// }


$conn->close();

?>