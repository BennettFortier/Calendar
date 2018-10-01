<?php

header("Content-Type: application/json");
session_start();
$friend = (string)$_POST['friend'];
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

$table = "users";
$stmt = $mysqli->prepare("SELECT  userID FROM $table WHERE username = ?");
if(!$stmt){
  echo json_encode(array(
      "success" => false,
      "message" => ("Server malfunction, try again")
    ));  exit;
}
$stmt->bind_param('s', $friend);
$stmt->execute();
$result = $stmt->get_result();
$count = 0;
while( $row = $result->fetch_assoc()){
    $users[$count] = $row["userID"];
    $count++;
}
$stmt->close();
if($count!=1){
  echo json_encode(array(
      "success" => false,
      "message" => ("Make sure you entered your friends name in right")
    ));  exit;
}
$table = "events";

$stmt = $mysqli->prepare("INSERT INTO $table (eventName, eventUser, eventDesc, eventDate) VALUES (?,?,?,?)");
if(!$stmt){
  echo json_encode(array(
      "success" => false,
      "message" => ("Server malfunction, try again")
    ));  exit;
}
$stmt->bind_param('ssss', $eventName, $friend, $eventDescription, $dateFinal);
$stmt->execute();
$stmt->close();
echo json_encode(array(
  "success" => true,
  "message" => $dateFinal
));
exit;
?>
