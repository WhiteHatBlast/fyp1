<?php

include("../connection/config.php");
include("../generator/qr.php");

if(isset($_POST['organization'])){

  $originalDate = $_POST['currentDate'];
  $ip_address = $_POST['ip_address'];
  $userId = $_SESSION['userId'];

  $quertSuccess = mysqli_query($connection, "INSERT INTO kadet(organization,designation,name,org_ref_no,currentDate,diagnosa,qrHashKey,IP,description,userID) VALUES ('".$_POST['organization']."','".$_POST['designation']."','".$_POST['name']."','".$_POST['org_ref_no']."','$originalDate','".$_POST['diagnosa']."','$generateKeyQrCode', '$ip_address','".$_POST['description']."', '".$userId."')");

  if($quertSuccess == true){

    include("../qrCode.php");

    header('Content-Type: application/json');
    echo json_encode(
        array(
            'url' => $urlFIle,
            'name' => $_POST['name'],
            'batalion' => $_POST['organization'],
            'designation' => $_POST['designation']
        )
    );

  }

}

?>