$(document).ready(function () {

  function detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  if (!detectmob()) {

    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    var pc = new RTCPeerConnection({iceServers: []}), noop = function () {
    };
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
    pc.onicecandidate = function (ice) {  //listen for candidate events
      if (!ice || !ice.candidate || !ice.candidate.candidate)  return;
      var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      $('[name="ip_address"]').val(myIP);

      pc.onicecandidate = noop;
    };

  } else {

    var url = window.location.href;
    var arr = url.split("/");

    $('[name="ip_address"]').val(arr[2]);

  }

  var $form = $('form');

  $form.formValidation();

  $("form#target").submit(function (e) {

    e.preventDefault();

    var $form = $(e.currentTarget);

    if (!$form.data('formValidation').isValid()) {
      return;
    }

    var formData = XIO.FormData($form);

    swal({
      title: '',
      text: 'Adakah anda ingin generate laporan bagi pesakit ini ?',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "YA",
      closeOnConfirm: false,
      type: 'warning'
    }, function () {

      swal({ title: '', text: 'Laporan Berjaya Dikemaskini', type: 'success' }, function (isConfirm) {

        if(isConfirm){

          $.post("../include/createMC.php", formData,
            function (data) {

              if (data) {

                $('.nav-tabs').css('display', 'none');
                $('.generate_qrCode').css('display', 'none');
                $('#generate_qrCode').css('display', 'none');
                $('.view_qr_code').css('display', 'block');
                $('.image_qr').attr('src', data.url);
                $('.qr_person_name').text(data.name);
                $('.qr_person_batalion').text(data.batalion);
                $('.qr_person_designation').text(data.designation);

                function doPrint(delay) {
                  delay = delay || 5; //default to 5 seconds
                  setTimeout(function () {
                    window.print();
                  }, delay * 100);
                }

                doPrint(5);

              }

            });

        }


      });

    });


  });

})