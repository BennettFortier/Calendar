<?php

header("Content-Type: application/json");
$username = $_POST['username'];
$password = $_POST['password'];

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

$stmt = $mysqli->prepare("SELECT password,username FROM $table WHERE username = ?" );
$stmt -> bind_param("s",$username);
if(!$stmt){
  echo json_encode(array(
      "success" => false,
      "message" => ("Server malfunction, try again")
    ));  exit;
}
$stmt->execute();
$stmt->bind_result($p,$u);

while($stmt->fetch()){
$temp = $p;
$tempUser = $u;
}
$stmt->close();

if($tempUser != NULL){
if(password_verify($password,$temp)){
  session_start();
$_SESSION['username'] = $username;
$_SESSION['token'] = substr(md5(rand()), 0, 10);

echo json_encode(array(
  "success" => true
));
exit;
}

else{
echo json_encode(array(
  "success" => false,
  "message" => "Incorrect Password:"
));
exit;
}
}
else{
echo json_encode(array(
  "success" => false,
  "message" => "Incorrect Username"
));
exit;
}
?>
