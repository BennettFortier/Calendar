<?php
session_start();
header("Content-Type: application/json");
$servername = 'localhost';
$serveruser = 'ben';
$serverpass = 'swimming';
$database = 'Calender';
$table = "events";

$user = $_SESSION["username"];
$eventYear = (string)$_POST['year'];
$eventMonth = (string)$_POST['month'];

$mysqli = new mysqli($servername, $serveruser, $serverpass, $database);

if($mysqli->connect_errno) {
  echo json_encode(array(
      "success" => false,
      "message" => ("Server could not connect to databse, try again.")
    ));  exit;
}

$stmt = $mysqli->prepare("SELECT eventName, eventDesc, eventDate FROM $table WHERE eventUser = ? ORDER BY eventDate ASC" );
$stmt->bind_param('s', $user);

if(!$stmt){
  echo json_encode(array(
      "success" => false,
      "message" => $user
    ));  exit;
}
$stmt->execute();
$result = $stmt->get_result();
$count = 0;
while( $row = $result->fetch_assoc()){
    $nameArray[$count] = $row["eventName"];
    $descArray[$count] = $row["eventDesc"];
    $dateArray[$count] = $row["eventDate"];
    $count++;
}
$stmt->close();
echo json_encode(array(
    "success" => true,
    "name" => $nameArray,
    "desc" => $descArray,
    "date" => $dateArray
  ));
exit;

 ?>
