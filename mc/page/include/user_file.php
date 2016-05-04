<?php

$query = "SELECT * FROM kadet WHERE userID='".$_SESSION['userId']."'";

$result = mysqli_query($connection, $query);

?>

<style>

  .hover_blue:hover{
    background: #EEEEEE;
  }

</style>

<div align="center" id="generate_qrCode">

  <br/>

  <b>Senarai Laporan</b>
  <br/>
  <br/>

</div>

<table class="table table-bordered clearfix">
  <thead class="thead-inverse">
  <tr style="background: #EEEEEE">
    <th style="width: 30px">Bil</th>
    <th>Date</th>
    <th>Reason</th>
    <th>Batalion</th>
  </tr>
  </thead>
  <tbody>
  <?php

  $index = 1;

  while($rows = mysqli_fetch_array($result)){

    echo '
      <tr class="hover_blue" style="cursor: pointer;" xviewQRCODE='.$rows['qrHashKey'].'>
        <td>'.$index++.'</td>
        <td>'.$rows['currentDate'].'</td>
        <td>'.$rows['description'].'</td>
        <td>'.$rows['organization'].'</td>
      </tr>
     ';

  }

  ?>
  </tbody>
</table>

<script>

  $('[xviewQRCODE]').click(function (e, tpl) {

    var value = $(e.currentTarget).attr('xviewQRCODE');

    window.location = 'info/?q='+value

  })

</script>