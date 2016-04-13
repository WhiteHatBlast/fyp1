<?php

if(
    isset($_POST['login_icno']) &&
    isset($_POST['login_password'])
){

  require_once("../connection/config.php");

  $login_icno = $_POST['login_icno'];
  $login_password = md5($_POST['login_password']);

  $query = "SELECT * FROM users WHERE icno='$login_icno' AND password='$login_password'";

  $checkCount = mysqli_num_rows(mysqli_query($connection, $query));

  if($checkCount > 0){
    $run_user = mysqli_fetch_assoc(mysqli_query($connection, $query));
    $_SESSION['userId'] = $run_user['id'];
    $_SESSION['session_roles'] = $run_user['roles'];
    $_SESSION['session_name'] = $run_user['name'];
    echo 1;

  }

}