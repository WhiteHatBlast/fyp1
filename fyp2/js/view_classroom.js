$(document).ready(function () {

  var myDB;

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {

    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
    var username_sess = window.sessionStorage.getItem("username_session");// user session
    view_class(username_sess);

  }

  function view_class(whichUser){

    var list_view = $("#list_view_class");

    list_view.append('<label class="item item-input item-stacked-label brown-color">List Of Class</label>')

    myDB.transaction(function (transaction) {

      transaction.executeSql('SELECT * FROM class_room WHERE whichUser=?', [whichUser], function (tx, results) {
        var len = results.rows.length, i;

        for (i = 0; i < len; i++) {

          var html = '<a href="#" class="viewDetail item item-input item-stacked-label" id='+results.rows.item(i).id+'">'+results.rows.item(i).class_name+'</a>';
          list_view.append(html);

        }

      }, null);

    });

  }

  $(document.body).on('click', '.viewDetail' ,function(){
    var id=this.id;
    view_data_class(id);
  });

  function view_data_class(id){

    window.sessionStorage.setItem("class_id_sess", id);
    window.location = 'create_objective.html';

  }
});