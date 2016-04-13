$(document).ready(function () {

  var myDB;

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {

    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
    var class_id_sess = window.sessionStorage.getItem("class_id_sess");// user session
    view_objective(class_id_sess);

  }

  function view_objective(class_id_sess){

    var list_view_objective = $("#list_view_objective");

    list_view_objective.append('<label class="item item-input item-stacked-label brown-color">List Of Objective</label>')

    myDB.transaction(function (transaction) {

      transaction.executeSql('SELECT * FROM objective WHERE class_id=?', [class_id_sess], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {

          var html = '<a href="#" class="viewDetailObjective item item-input item-stacked-label" id='+results.rows.item(i).id+'>'+results.rows.item(i).objective+'</a>';
          list_view_objective.append(html);

        }

      }, null);

    });

  }

  $(document.body).on('click', '.viewDetailObjective' ,function() {

    var objective_id = this.id;

    window.sessionStorage.setItem("objective_id", objective_id);
    window.location = 'view_objective_detail.html'

  });

});