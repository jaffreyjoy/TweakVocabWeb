<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

$chap = $_POST['chap'];
$user = $_POST['user'];
// $chap = 1;	
// echo $user;
// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if ($chap == 0) {
	for ($i=1; $i <= 9; $i++) { 
		$c = intval($i);
		$sql1 = "SELECT id FROM derived WHERE chapter='$c'";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "$num_rows";
		$test[$c] = $num_rows;
		// echo "<br>";
		$sql1 = "SELECT $user FROM progress WHERE id IN (SELECT id FROM derived WHERE chapter='$c') AND $user = 1";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "count: ";
		// echo "$num_rows";
		// while ($row = $result->fetch_assoc()) {
		//     echo $row['u1_s']." ";
		// }
		// echo "<br>";

		$progress[$c] = ($num_rows/$test[$c])*100;


	}
	// test has total no. of derived words in each chapter
	// echo "progress: ";
	// print_r($progress);  // progress of individual chapters in %
	// echo "<br>";
	// print_r($test); //Array ( [1] => 48 [2] => 46 [3] => 44 [4] => 63 [5] => 54 [6] => 56 [7] => 48 [8] => 38 [9] => 26 )

	echo json_encode($progress);

}
else // deck wise progress
{
	$sql1 = "SELECT DISTINCT deck FROM `derived` WHERE chapter = $chap";
	$result = $conn->query($sql1);
	$num_rows2 = mysqli_num_rows($result);
	// echo "num_rows ".$num_rows2."<br>";
	for ($i=1; $i <= $num_rows2 ; $i++) { 
		$d = intval($i);
		// echo "deck: ".$d." ";
		// echo "<br>";
		$sql1 = "SELECT id FROM `derived` WHERE chapter = $chap AND deck = $d";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "total in deck ".$num_rows;
		if ($num_rows>0) {
			$test[$d] = $num_rows;
		}
		

		$sql1 = "SELECT $user FROM progress WHERE id IN (SELECT id FROM derived WHERE chapter='$chap' AND deck=$d) AND $user = 1";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "mastered in deck: ".$num_rows."<br>";
		$mastered[$d] = $num_rows;

		$sql1 = "SELECT $user FROM progress WHERE id IN (SELECT id FROM derived WHERE chapter='$chap' AND deck=$d) AND $user = 2";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "learning in deck: ".$num_rows."<br>";
		$learning[$d] = $num_rows;


		$sql1 = "SELECT $user FROM progress WHERE id IN (SELECT id FROM derived WHERE chapter='$chap' AND deck=$d) AND $user = 3";
		$result = $conn->query($sql1);
		$num_rows = mysqli_num_rows($result);
		// echo "need review in deck: ".$num_rows."<br>";
		$need_review[$d] = $num_rows;

		$m[$d] = ($mastered[$d]/$test[$d])*100;
		$l[$d] = ($learning[$d]/$test[$d])*100;
		$n[$d] = ($need_review[$d]/$test[$d])*100;

	}

		$response = array();

		array_push($response,$n);
		array_push($response,$l);
		array_push($response,$m);

		echo json_encode($response);



}

$conn->close();

?>