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

          function detectmob() {
            if( navigator.userAgent.match(/Android/i)
              || navigator.userAgent.match(/webOS/i)
              || navigator.userAgent.match(/iPhone/i)
              || navigator.userAgent.match(/iPad/i)
              || navigator.userAgent.match(/iPod/i)
              || navigator.userAgent.match(/BlackBerry/i)
              || navigator.userAgent.match(/Windows Phone/i)
            ){
              return true;
            }
            else {
              return false;
            }
          }

            if(detectmob()){

              var url = window.location.href+"/page";
              window.location = url;

            } else {

              window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
              var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
              pc.createDataChannel("");    //create a bogus data channel
              pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
              pc.onicecandidate = function(ice){  //listen for candidate events
                if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                var url = "http://"+myIP+"/mc/page";
                window.location = url;

                pc.onicecandidate = noop;
              };

            }

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