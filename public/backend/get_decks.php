<?php

$DB_HOST = 'localhost';
$DB_NAME = 'se';
$DB_USER = 'root';
$DB_PASS = '';

// $chapter = 1;
$chapter = $_POST['chapter'];

// Create connection
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$get_deck_data = "SELECT deck,origin_word FROM origin WHERE chapter='$chapter'";
$result = $conn->query($get_deck_data);
$num_rows = mysqli_num_rows($result);
while($row = mysqli_fetch_assoc($result))
	$deck_data[] = $row;

$get_no_decks = "SELECT COUNT(DISTINCT deck) as noOfDecks FROM origin WHERE chapter='$chapter'";
$result = $conn->query($get_no_decks);
$no_decks = mysqli_fetch_assoc($result);
// echo $no_decks["noOfDecks"];

$deck_data_f = array("no_of_decks"=>$no_decks["noOfDecks"]);

$deck_origin_data = array();
for ($i=1; $i <= $no_decks["noOfDecks"] ; $i++) {
	$data = array();
	for ($j=0; $j<$num_rows ; $j++) {
		if($deck_data[$j]["deck"] == $i){
			// echo $deck_data[$j]["deck"].'<br>';
			$data[] = $deck_data[$j];
		}
	}
	$deck_origin_data[] = $data;
}


$deck_data_f = array("noOfDecks"=>$no_decks["noOfDecks"],"data"=>$deck_origin_data);

// array_push($deck_data_f,$deck_data);


if ($num_rows > 0) {
	// echo var_dump($deck_data_f);
	echo json_encode($deck_data_f);
}
else
{
	echo "no_data";
}


$conn->close();

?>