
// -------------------------------
// Firebase Initilization
var config = {
    apiKey: "AIzaSyAXVopqYljuSO7daP1nIN_glMoxhT-fPCE",
    authDomain: "jira-app-c98dc.firebaseapp.com",
    databaseURL: "https://jira-app-c98dc.firebaseio.com",
    projectId: "jira-app-c98dc",
    storageBucket: "",
    messagingSenderId: "1040391233034"
  };

  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user){
  firebase.user=user;
  if(user){
    console.log(user);
  }
  else{
    var a=document.URL.split("/");
    if(a[a.length-1]!="mainpage.html"){
      document.location.href="mainpage.html";
    }
  }
});


// ---------------------------------------------------------------------------------
var user_name="";

//Creating an new User 
  $("#submit").on('click',function(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    user_name=$("#Name").val().trim();
    localStorage.setItem("User Name", user_name);
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
      if(error!=null){
        console.log(error.message);
        return;
      }
    });
    $("#sign_up_page").fadeOut();
  });


  $("#new_register").on('click',function(){
    $("#sign_up_page").fadeIn();
  }); 
  $("#back").on('click',function(){
    $("#sign_up_page").fadeOut();
  });


//Sign in an existing user
  $("#submit_sign").on('click',function(){
    firebase.auth().signInWithEmailAndPassword($("#email_sign").val(),$("#Password_sign").val()).then(function(){
      document.location.href="today.html";
    }).catch(function(err){
      if(err!=null){
        console.log(err.message);
        return;
      }
    })
  user_name=localStorage.getItem("User Name");
  });

//User Sign out
$("#out").on("click",function(){
    firebase.auth().signOut();
    document.location.href="mainpage.html";
});

// ---------------------------------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '*******************',
    database: 'todoapp'
});
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    let createTodos = `create table if not exists jira_app(
                          id int primary key auto_increment,
                          ticket varchar(255),
                          type varchar(255),time_spend double,dev_time double,date varchar(255))`;

    connection.query(createTodos, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
});
// ---------------------------------------------------------------------------------

//This is to calculate time, get project, dev time etc.
$("#Summary_calculate").on('click',function(){
    $("#result_check").val(' ');
    var ticket_number=$("#ticket").val();
    var ticket_type=$("#ticket_type option:selected").text();
    var start=$("#start_time").val();
    var end=$("#end_time").val();
    var time_start=get24hTime(start);
    var time_end=get24hTime(end);
    var startTime=moment(time_start, "HH:mm");
    var endTime=moment(time_end, "HH:mm");
    var duration = moment.duration(endTime.diff(startTime));
    var minutes = parseInt(duration.asMinutes())
    var s="Ticket Number: "+ticket_number+" | "+"Time Spend:"+minutes+" | "
    +"Development Time: 0 "+" | "+"Project: "+ticket_type;
    $("#result_check").val(s); 
    let post={ticket:ticket_number,type:ticket_type,time_spend:minutes,dev_time:0,date:new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0]};
    let sql="INSERT INTO jira_app SET ?";
    let query=connection.query(sql,post,(err,res) => {
        if (err) {
            console.log(err.message);
        }
        else{
            console.log("Added");
        }
    });   
});

//Convert 12 hrs into 24 hrs
function get24hTime(str){
    str = String(str).toLowerCase().replace(/\s/g, '');
    var has_am = str.indexOf('am') >= 0;
    var has_pm = str.indexOf('pm') >= 0;
    // first strip off the am/pm, leave it either hour or hour:minute
    str = str.replace('am', '').replace('pm', '');
    // if hour, convert to hour:00
    if (str.indexOf(':') < 0) str = str + ':00';
    // now it's hour:minute
    // we add am/pm back if striped out before
    if (has_am) str += ' am';
    if (has_pm) str += ' pm';
    // now its either hour:minute, or hour:minute am/pm
    // put it in a date object, it will convert to 24 hours format for us
    var d = new Date("1/1/2011 " + str);
    // make hours and minutes double digits
    var doubleDigits = function(n){
        return (parseInt(n) < 10) ? "0" + n : String(n);
    };
    return doubleDigits(d.getHours()) + ':' + doubleDigits(d.getMinutes());
}

// ---------------------------------------------------------------------------------

//SideNav bar manuplutaion
$("#close").on('click',function(){
  $("#sidenav").css('width', '0');
  $("#result_page").css('width', '100%');


});

$("#open").on('click',function(){
  $("#sidenav").css('width', '25%');
  $("#result_page").css('width', '70%');
});

(function() {
  $("#result_page").css('width', '100%');
  if(localStorage.getItem("User Name")){
  $("#userName").append(" "+localStorage.getItem("User Name").toUpperCase());
  }
  var date=new Date(new Date().toString().split('GMT')[0]+'UTC').toISOString().split('T')[0];
  var sql="SELECT * FROM jira_app WHERE date='"+date+"'";
  connection.query(sql,function(err,results,fields){
  if(err){throw err;}
  var i=0;
  results.forEach(function(element){
  $("#table_content").append($('<tr></tr>').addClass('row_table').attr('id',i));
  $('#'+i).append($('<td></tr').text(element.ticket));
  $('#'+i).append($('<td></tr').text(element.type));
  $('#'+i).append($('<td></tr').text(element.time_spend));
  $('#'+i).append($('<td></tr').text(element.dev_time));
  i++;
 });
});
 
})();
