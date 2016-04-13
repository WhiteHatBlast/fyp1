$(document).ready(function () {

  var username_sess = window.sessionStorage.getItem("username_session");// user session

  if(username_sess){
    $('#username_sess_show').text(username_sess)
  }

  var myDB;
  var pictureSource;   // picture source
  var destinationType; // sets the format of returned value
//Open Database Connection
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

    loadImages();
  }

  function createTableUser(){

    myDB.transaction(function (transaction) {
      transaction.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT(255))', [],
          function (tx, result) {
            //alert("Table created successfully");
          },
          function (error) {
            alert("Error occurred while creating the table.");
          });

    });

  }

  function createTableImages() {
    myDB.transaction(function (transaction) {

      transaction.executeSql('CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, img_url TEXT(255), whichUser TEXT(255))', [],
          function (tx, result) {
            //alert("Table imaages created successfully");
          },
          function (error) {
            alert("Error occurred while creating the table.");
          });
    });
  }

  function createTableClassRoom() {
    myDB.transaction(function (transaction) {

      transaction.executeSql('CREATE TABLE IF NOT EXISTS class_room (id INTEGER PRIMARY KEY, course_code TEXT(255), class_name TEXT(255), whichUser TEXT(255))', [])

    });
  }

  function loadImages() {

    $("#showImages").html("");

    var whichUser = window.sessionStorage.getItem("username_session");

    myDB.transaction(function (transaction) {
      transaction.executeSql('SELECT * FROM images WHERE whichUser=?', [whichUser], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {

          var smallImageasa = document.getElementById('timeTable');

          // Unhide image elements
          //
          smallImageasa.style.display = 'block';
          //
          smallImageasa.src = results.rows.item(i).img_url;

        }
      }, null);
    });

  }

  function insertImages(dataURI) {

    var whichUser = window.sessionStorage.getItem("username_session");

    myDB.transaction(function (transaction) {
      var executeQuery = "INSERT INTO images (whichUser,img_url) VALUES (?,?)";
      transaction.executeSql(executeQuery, [whichUser, dataURI]
        , function (tx, result) {
          alert('timetable update');
        },
        function (error) {
          alert('Error occurred');
        });
    });

  }

  function createUserAccount(usernamesss) {

    myDB.transaction(function (transaction) {

      function createSuccess(usernameVal){
        var executeQuery = "INSERT INTO users (username) VALUES (?)";

        transaction.executeSql(executeQuery, [usernameVal]
            , function (tx, result) {
              alert('Account Created');
              window.location = 'login.html'
            },
            function (error) {
              alert(error.message, 'Error occurred');
            });
      }

      transaction.executeSql('SELECT * FROM users WHERE username=? LIMIT 1', [usernamesss], function (tx, results) {
          var len = results.rows.length, i;

        if(len==0){
          createSuccess(usernamesss)
        }

        if(len==1){
          alert('Account :'+usernamesss+ ' Existed')
        }

        }, null);

    });

  }


  function getlogin_success(tx, results){
    var len = results.rows.length;
    var username=document.getElementById("username_login").value;

    if(len==0){
      alert('this account : '+ username + " not exists")
    }

    if(len==1){
      window.sessionStorage.setItem("username_session", "Welcome! "+username+ " ..."); //Set item

      window.location = 'menu.html';
    }
  }

  function checkUser() {

    myDB.transaction(function (transaction) {

      var username=document.getElementById("username_login").value;

      var sql = "select username from users where username=? limit 1";
      transaction.executeSql(sql, [username], getlogin_success);

    });

  }

  // Called when a photo is successfully retrieved
  //
  function onPhotoDataSuccess(imageData) {

    insertImages("data:image/jpeg;base64," + imageData)
    loadImages();

  }

  function capturePhoto() {

    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
      quality: 50,
      destinationType: destinationType.DATA_URL
    });
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

  $("#snap_picture").click(function () {

    capturePhoto();

  });

  function add_reminder()
{

  alert('1');

    var date = $("#notify_date").val();
    var time = $("#notify_time").val();
    var title = $("#notify_title").val();
    var message = $("#notify_message").val();

    if(date == "" || time == "" || title == "" || message == "")
    {
      navigator.notification.alert("Please enter all details");
      return;
    }

    var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
    schedule_time = new Date(schedule_time);

    var id = info.data.length;

    cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        schedule(id, title, message, schedule_time);
      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              schedule(id, title, message, schedule_time);
            }
            else
            {
              navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
            }
        });
      }
    });
}

function schedule(id, title, message, schedule_time)
{
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time
    });

    var array = [id, title, message, schedule_time];
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info));

    navigator.notification.alert("Reminder added successfully")
}

  /* Register */

  $('[xaction="register"]').click(function (e){

    var username = $('#username').val();

    if(!username){
      alert('Please enter username');
    } else {

      createTableUser();
      createTableImages();

      createUserAccount(username);
    }

  });

  $('[xaction="login"]').click(function (){

    createTableImages();
    createTableClassRoom();

    var username=document.getElementById("username_login").value;

    if(!username){

      alert('Please enter username')

    } else {
      checkUser();
    }

  });

  $('[xaction="help"]').click(function (){

    window.location = 'help.html'

  });

  $('[xaction="drop_all_table"]').click(function (){

    createTableUser();
    createTableImages();
    createTableClassRoom();

  });

  $('[xaction="add_reminder"]').click(function (){

    add_reminder();

  });

});


