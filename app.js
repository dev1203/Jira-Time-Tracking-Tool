var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());
let date = require('date-and-time');
var mysql = require('mysql');
var $ = jQuery = require('jquery');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '***********',
    database: 'todoapp'
});

app.get("/",function(req,res){
    let now = new Date();

    let sql='SELECT * from todos WHERE date = '+mysql.escape(date.format(now, 'MMM:DD:YYYY'));
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render(__dirname +"/views/index.ejs",{result:result});
    });
});
// Creating SQL Table
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    let createTodos = `create table if not exists todos(
                          id int primary key auto_increment,
                          ticket varchar(255),
                          time int(1) default 0,date varchar(255)
                      )`;

    connection.query(createTodos, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

});

app.post('/postdata', function(req,res){
    let now = new Date();
    let post={ticket:req.body.ticket,time:req.body.time,date:date.format(now,'MMM:DD:YYYY')};
    let sql="INSERT INTO todos SET ?";

    let query=connection.query(sql,post,(err,res) => {
        if (err) {
            console.log(err.message);
        }
        else{
            console.log("Added");
        }
    });
    res.redirect("/");
});


app.listen(3300,process.env.IP,function(){console.log("serving")});
