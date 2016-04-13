<?php

if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

$connection = mysqli_connect("localhost", "root", "", "mc");

if (!$connection) {
  echo "Error: Unable to connect to MySQL." . PHP_EOL;
  echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
  echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
  exit;
}