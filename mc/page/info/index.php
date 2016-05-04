<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="../../js/jquery.min.js"></script>
  <script src="../../js/functions.js"></script>
  <script src="../../js/lodash.js"></script>
  <script src="../../js/sweetalert.min.js"></script>
  <link rel="stylesheet" type="text/css" href="../../css/sweetalert.css">

  <!-- Bootstrap CSS v3.0.0 or higher -->
  <link rel="stylesheet" href="../../css/bootstrap.min.css">

  <!-- Bootstrap JS -->
  <script src="../../js/bootstrap.min.js"></script>

  <title>Maklumat MC</title>
</head>
<body>

<script type="text/javascript">

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var query = getParameterByName('q');

  $.post("../../include/viewMC.php", {query: query},
      function (data) {

        $('[name="organization"]').val(data.organization);
        $('[name="designation"]').val(data.designation);
        $('[name="org_ref_no"]').val(data.org_ref_no);
        $('[name="name"]').val(data.name);
        $('[name="currentDate"]').val(data.currentDate);
        $('[name="diagnosa"]').val(data.diagnosa);

        $('.img_qrCode').attr("src", "../../file/" + data.qrHashKey + ".png")

      });


</script>

<br/>
<br/>

<div class="col-sm-12">

  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="generateMC">

      <div class="form-group col-sm-12" align="center">
        <img class="img_qrCode" src="" style="width: 100%; height: 100%;">
      </div>

      <div class="form-group col-sm-6 clear-left">

        <div class="col-sm-2">

          <label class="label-control">Batalion</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly
                 data-fv-notempty="true"
                 data-fv-notempty-message="Sila Masukkan Batalion"
                 class="input-sm form-control" name="organization" value="">

        </div>

      </div>

      <div class="form-group col-sm-6">

        <div class="col-sm-2">

          <label class="label-control">Tarikh</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly class="input-sm form-control" name="currentDate" readonly=""
                 value="<?php echo date('d-m-Y'); ?>">

        </div>

      </div>

      <div class="form-group col-sm-6">

        <div class="col-sm-2">

          <label class="label-control">No Tentera</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly class="input-sm form-control" name="org_ref_no" value="">

        </div>

      </div>

      <div class="form-group col-sm-6">

        <div class="col-sm-2">

          <label class="label-control">Pangkat</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly class="input-sm form-control" name="designation" value="">

        </div>

      </div>

      <div class="form-group col-sm-6">

        <div class="col-sm-2">

          <label class="label-control">Nama</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly class="input-sm form-control" name="name" value="">

        </div>

      </div>

      <div class="form-group col-sm-6">

        <div class="col-sm-2">

          <label class="label-control">Diagnosa</label>

        </div>

        <div class="col-sm-8">

          <input type="text" disabled readonly class="input-sm form-control" name="diagnosa" value="">

        </div>

      </div>

    </div>

  </div>

</div>

</body>
</html>