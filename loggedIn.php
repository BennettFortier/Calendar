<?php

header("Content-Type: application/json");
session_start();
if($_SESSION["username"]== ""){
  echo json_encode(array(
    "success" => true
  ));
}
else{
  echo json_encode(array(
    "success" => false
  ));
}



 ?>
