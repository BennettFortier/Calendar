<?php

header("Content-Type: application/json");
session_start();
$user = $_SESSION["username"];
$eventName = (string)$_POST['name'];
$eventDescription = (string)$_POST['description'];
$eventYear = (string)$_POST['year'];
$eventMonth = (string)$_POST['month'];
$eventDay = (string)$_POST['day'];
$eventTime = (string)$_POST['time'];
$date = $eventYear."-".$eventMonth."-".$eventDay;
$time = $eventTime.":00";
$dateFinal = date($date." ".$time);



$servername = 'localhost';
$serveruser = 'ben';
$serverpass = 'swimming';
$database = 'Calender';

$mysqli = new mysqli($servername, $serveruser, $serverpass, $database);

if($mysqli->connect_errno) {
  echo json_encode(array(
      "success" => false,
      "message" => ("Server could not connect to databse, try again.")
    ));  exit;
}

$table = "events";
$stmt = $mysqli->prepare("DELETE FROM $table WHERE eventName = ? AND eventUser = ? AND eventDesc = ? AND eventDate = ?");
if(!$stmt){
  echo json_encode(array(
      "success" => false,
      "message" => ("Server malfunction, try again")
    ));  exit;
}
$stmt->bind_param('ssss', $eventName, $user, $eventDescription, $dateFinal);
$stmt->execute();
$stmt->close();
echo json_encode(array(
  "success" => true,
  "message" => $dateFinal
));
exit;
?>
