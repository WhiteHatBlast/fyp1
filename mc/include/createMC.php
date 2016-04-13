<?php

include("../connection/config.php");
include("../generator/qr.php");

if(isset($_POST['organization'])){

  $originalDate = $_POST['currentDate'];

  mysqli_query($connection, "INSERT INTO kadet(organization,designation,name,org_ref_no,currentDate,diagnosa,qrHashKey) VALUES (".$_POST['organization'].",".$_POST['designation'].",".$_POST['name'].",".$_POST['org_ref_no'].",'$originalDate',".$_POST['diagnosa'].",'$generateKeyQrCode')");

}

?>