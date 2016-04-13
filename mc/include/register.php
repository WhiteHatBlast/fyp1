<?php

if(
    isset($_POST['roles']) &&
    isset($_POST['register_password']) &&
    isset($_POST['register_icno'])
){

  require_once("../connection/config.php");

  $roles = $_POST['roles'];
  $register_name = $_POST['register_name'];
  $register_password = md5($_POST['register_password']);
  $register_icno = $_POST['register_icno'];

  $query = "INSERT INTO users(roles, name, password, icno) VALUES('$roles','$register_name','$register_password', '$register_icno')";

  mysqli_query($connection, $query);

  echo 1;

}