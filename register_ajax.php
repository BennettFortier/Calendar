<?php

  header("Content-Type: application/json");
  $username = $_POST['username'];
  $pw = $_POST['password'];
  $password= password_hash($pw, PASSWORD_DEFAULT);

  $servername = 'localhost';
  $serveruser = 'ben';
  $serverpass = 'swimming';
  $database = 'Calender';
  //sets up connection to database
  $mysqli = new mysqli($servername, $serveruser, $serverpass, $database);
  $table = "users";

  if($mysqli->connect_errno) {
    echo json_encode(array(
    		"success" => false,
    		"message" => ("Server could not connect to databse, try again.")
    	));
    	exit;  }
  $stmt = $mysqli->prepare("SELECT password,username FROM $table WHERE username = ?" );
  $stmt->bind_param('s', $username);
  if(!$stmt){
    echo json_encode(array(
    		"success" => false,
        "message" => ("Server malfunction, try again")
    	));
    	exit;  }
  $stmt->execute();
  $stmt->bind_result($p,$u);

  while($stmt->fetch()){
  $temp = htmlentities($p);
  $tempUser = htmlentities($u);
  }
  $stmt->close();
  if($tempUser != NULL){
    echo json_encode(array(
		"success" => false,
    "message" => ("Username already taken")
	));
	exit;
  }
  else{
      $stmt = $mysqli->prepare("insert into $table (username, password) values (?,?)");
      $stmt->bind_param('ss', $username,$password);
      $stmt->execute();
      $stmt->close();
  	echo json_encode(array(
  		"success" => true,
  	));
  	exit;
  }
 ?>
