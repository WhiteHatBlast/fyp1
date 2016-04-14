var XIO = undefined;

$(document).ready(function () {

  XIO = {};

  XIO.FormData = function ($form) {

    return _($form.serializeArray()).reduce(function (acc, field) {

      if (!/^__[a-z]./.test(field.name)) {
        acc[field.name] = field.value;
      }

      return acc;

    }, {});

  };

  $('[xaction="logout"]').click(function (e) {

    $.post("../include/logout.php", function (data, status) {

      if(data == 1){
        window.location = "../"
      }

    })

  });

});

$(document).ready(function () {
  $('form').on('success.form.fv', function (e) {
    e.preventDefault();
  });

  $(window).on('load', function () {
    var $iframe = $(window.parent.document).find('iframe[src="/download/tryit/bootstrap.html"]');
    if ($iframe.length) {
      //$('body').addClass('demo-frame-body').find('.demo-ad').hide();

      // Adjust the height of iframes containing the demo for specific frameworks
      var $container = $('#demoContainer');
      setTimeout(function () {
        $iframe.height($container.height()).css('visibility', 'visible').fadeIn('fast');
      }, 1000);

      // Set the internal data to get it later if I want
      $('body').data('iframe.fv', $iframe);

      $container
        .find('form')
        .on('status.field.fv', function (e, data) {
          $iframe.height($container.height());
        });
    }
  });
});