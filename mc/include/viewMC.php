<?php

include("../connection/config.php");

if(isset($_POST['query'])){

  $query = $_POST['query'];

  $query = "SELECT * FROM kadet WHERE qrHashKey='$query'";

  $MCS = mysqli_fetch_assoc(mysqli_query($connection, $query));

  header('Content-Type: application/json');
  echo json_encode(
      array(
          'organization' => $MCS['organization'],
          'designation' => $MCS['designation'],
          'name' => $MCS['name'],
          'org_ref_no' => $MCS['org_ref_no'],
          'currentDate' => $MCS['currentDate'],
          'diagnosa' => $MCS['diagnosa'],
          'qrHashKey' => $MCS['qrHashKey']
      )
  );

}

?>