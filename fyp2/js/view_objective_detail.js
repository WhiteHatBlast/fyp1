$(document).ready(function () {

  var myDB;

  document.addEventListener("deviceready", onDeviceReadys, false);

  function onDeviceReadys() {

    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
    var objective_id = window.sessionStorage.getItem("objective_id");// user session
    view_objective_detail(objective_id);

  }

  function view_objective_detail(objective_id) {

    myDB.transaction(function (transaction) {

      transaction.executeSql('SELECT * FROM objective WHERE id=?', [objective_id], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {

          $('#topic').val(results.rows.item(i).topic);
          $('#objective').val(results.rows.item(i).objective);
          $('#duration').val(results.rows.item(i).duration);
          $('#activity').val(results.rows.item(i).activity);
          $('#material').val(results.rows.item(i).material);
          $('#step').val(results.rows.item(i).step);

        }

        $('#loading').css('display', 'none');
        $('.objective_detail').css('display', 'block');

      }, null);

    });

  }

  function view_objective_delete(objective_id) {

    myDB.transaction(function(transaction) {
      var executeQuery = "DELETE FROM objective where id=?";
      transaction.executeSql(executeQuery, [objective_id],
          //On Success
          function(tx, result) {
            window.location = 'view_objective.html'
          },
          //On Error
          function(error){alert('Something went Wrong');});
    });

  }

  $(document.body)

      .on('click', '[xaction="edit"]', function (e) {

        var id = window.sessionStorage.getItem("objective_id");
        var edit = $('[xaction="edit"]');

        edit.text('Close Edit');
        edit.attr('xaction', 'close_edit');
        $("#topic").attr("readonly", false);
        $("#objective").attr("readonly", false);
        $("#duration").attr("readonly", false);
        $("#activity").attr("readonly", false);
        $("#material").attr("readonly", false);
        $("#step").attr("readonly", false);

      })

      .on('click', '[xaction="close_edit"]', function (e) {

        var close_edit = $('[xaction="close_edit"]');

        close_edit.text('Edit');
        close_edit.attr('xaction', 'edit');

        var id = window.sessionStorage.getItem("objective_id");
        $("#topic").attr("readonly", true);
        $("#objective").attr("readonly", true);
        $("#duration").attr("readonly", true);
        $("#activity").attr("readonly", true);
        $("#material").attr("readonly", true);
        $("#step").attr("readonly", true);

      })
      .on('click', '[xaction="delete"]', function (e) {

        var id = window.sessionStorage.getItem("objective_id");

        swal({
          title: "Are you sure?",
          text: "You will not be able to recover!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        }, function () {

          view_objective_delete(id);

        });

      })

});