<?php
include("../connection/config.php");
include("../include/auth.php");
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAPORAN SAKIT PAGI / KHAS></title>

    <!-- Bootstrap CSS v3.0.0 or higher -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">

    <!-- FormValidation CSS file -->
    <link rel="stylesheet" href="../css/formValidation.min.css">
    <link rel="stylesheet" href="../css/sweetalert.css">

    <!-- jQuery v1.9.1 or higher -->
    <script type="text/javascript" src="../js/jquery.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="../js/bootstrap.min.js"></script>

    <!-- FormValidation plugin and the class supports validating Bootstrap form -->
    <script src="../js/formValidation.min.js"></script>
    <script src="../js/validation.bootstrap.min.js"></script>
    <script src="../js/sweetalert.min.js"></script>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../js/generateMC.js"></script>
    <script src="../js/lodash.js"></script>
    <script src="../js/functions.js"></script>

  </head>
  <body>

  <?php

  if(isset($_SESSION['session_roles'])){

  ?>

  <ul class="nav nav-tabs" role="tablist">

    <li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        <?=$_SESSION['session_name']; ?> <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <li role="presentation">
          <a xaction="logout" aria-controls="generateMC">Logout</a>
        </li>
      </ul>
    </li>

      <?php
      if($_SESSION['session_roles'] == '03'){
      ?>
        <li role="presentation" class="active">
          <a href="#generateMC" aria-controls="generateMC" role="tab" data-toggle="tab">Generate MC</a>
        </li>
        <li role="presentation">
          <a href="#file_generated" aria-controls="file_generated" role="tab" data-toggle="tab">Senarai Laporan</a>
        </li>

      <?php } ?>

  </ul>

  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="generateMC">
    	
    	<?php

        if($_SESSION['session_roles'] == '03'){
          include("generateMC.html");
        }

      ?>

    </div>

    <div role="tabpanel" class="tab-pane" id="file_generated">

      <?php include("include/user_file.php"); ?>

    </div>

  </div>

    <br/>

  <?php }

  ?>

  </body>
</html>