$(document).ready(function () {

  var myDB;

  document.addEventListener("deviceready", onDeviceReadys, false);

  function onDeviceReadys() {

    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
  }

  /* start classroom */

  function add_class(class_name, course_code) {

    var whichUser = window.sessionStorage.getItem("username_session");

    myDB.transaction(function (transaction) {

      transaction.executeSql('SELECT * FROM class_room WHERE class_name=? AND course_code=?  AND whichUser=? LIMIT 1', [class_name, course_code, whichUser], function (tx, results) {
        var len = results.rows.length, i;

        if (len == 0) {

          var executeQuery = "INSERT INTO class_room (class_name,course_code,whichUser) VALUES (?,?,?)";

          tx.executeSql(executeQuery, [class_name, course_code, whichUser]
              , function (tx, result) {
                alert('Class: ' + class_name + ' Created');
                window.location = 'view_classroom.html'
              },
              function (error) {
                alert(error.message, 'Error occurred');
              });

        }

        if (len == 1) {
          alert('Classroom : ' + class_name + ' Existed')
        }

      }, null);

    });

  }

  $('[xaction="add_class"]').click(function () {

    var class_name = $('#class_name');
    var course_code = $('#course_code');

    add_class(class_name.val(), course_code.val());

  });

  $('[xaction="view_class"]').click(function () {

    window.location = "view_classroom.html"

  });



  /* end classroom */

});