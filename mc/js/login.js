$(document).ready(function () {

  var $form = $('form');

  $form.trigger('reset')

  $('.message a').click(function () {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  var roles = undefined;

  $('[name="__roles"]').change(function (e) {

    roles = e.currentTarget.value;

  });

  $(".register-form").submit(function (e) {

    e.preventDefault();

    var $form = $(e.currentTarget);

    var formData = XIO.FormData($form);

    _.extend(formData, {
      roles: roles
    });

    $.post("include/register.php", formData,
      function (data, status) {

        if (data == 1) {
          swal({
            title: "",
            text: "Anda Berjaya Mendaftar Akaun ini",
            type: "success",
            confirmButtonText: "OK"
          }, function(isConfirm){
            if(isConfirm){

              $('form').animate({height: "toggle", opacity: "toggle"}, "slow");

            }
          });

        }

      });

  });

  $(".login-form").submit(function (e) {

    e.preventDefault();

    var $form = $(e.currentTarget);

    var formData = XIO.FormData($form);

    $.post("include/login.php", formData,
      function (data, status) {

        switch (data) {

          case '1':
            window.location = "page";
            break;
          case '0':
            alert('login failed');
            break;

          default:
            alert('something wrong');
            break;

        }

      });

  });

});