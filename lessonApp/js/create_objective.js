$(document).ready(function () {

  var myDB;

  document.addEventListener("deviceready", onDeviceReadys, false);

  function onDeviceReadys() {

    myDB = window.sqlitePlugin.openDatabase({name: "lesson_app.db"});
  }

  function createObjective(data){

    myDB.transaction(function (transaction) {
      transaction.executeSql('CREATE TABLE IF NOT EXISTS objective (id INTEGER PRIMARY KEY,week INTEGER(100), topic TEXT(255), objective TEXT(255), duration TEXT(255), activity TEXT(255),material TEXT(255), step TEXT(255), class_id INTEGER(255))', [],
        function (tx, result) {
          alert("Table created successfully");
        },
        function (error) {
          alert("Error occurred while creating the table.");
        });

      var executeQuery = "INSERT INTO objective (week,topic,objective,duration,activity,material,step,class_id) VALUES (?,?,?,?,?,?,?,?)";
      var class_id_sess = window.sessionStorage.getItem("class_id_sess");

      transaction.executeSql(executeQuery, [
        Number(data.week),
        data.topic,
        data.objective,
        data.duration,
        data.activity,
        data.material,
        data.step,
        class_id_sess
      ]
      , function (tx, result) {
        alert('Objective Created');
        //window.location = 'vie.html'
      },
      function (error) {
        alert(error.message, 'Error occurred');
      });


    });

  }


  $(document.body)

    .on('change', '[name="weeks"]', function (e) {

      var week = e.currentTarget.value;

      if (week) {
        $('.display_form_objective').css('display', 'block');
      } else {
        $('.display_form_objective').css('display', 'none');
      }

    })

      .on('click', '[xcreate="objective"]', function(){

        var data = {};

        var week = $('[name="weeks"]').val();
        var topic = $('#topic').val();
        var objective = $('#objective').val();
        var duration = $('#duration').val();
        var activity = $('#activity').val();
        var material = $('#material').val();
        var step = $('#step').val();

        data.week = week;
        data.topic = topic;
        data.objective = objective;
        data.duration = duration;
        data.activity = activity;
        data.material = material;
        data.step = step;

        createObjective(data)

      })

      .on('click', '[xview="objective"]', function(){

        window.location = 'view_objective.html'

      })

});