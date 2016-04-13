$(document).ready(function () {

  var $form  = $('form');

  $form.formValidation();

  $("#target").submit(function (e) {

    e.preventDefault();

    var $form = $(e.currentTarget);

    var formData = XIO.FormData($form);

    $.post("../include/createMC.php",formData,
      function(data, status){

        console.log(data);

      });
  });

})