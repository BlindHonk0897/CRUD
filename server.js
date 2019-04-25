var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var database = require('./database');
app.set("view engine", "ejs");

const port = process.env.PORT || 2020;

// database.find({},function(errs,result){
//      result.forEach(function(user){
//       console.log(user.name);
//      })
//    })

app.use(express.static(__dirname +'/public'));

 app.get('/',function(req,res){ 
   res.render(__dirname + '/public/views/mongo.ejs');
});


app.listen(port,()=>{console.log(`SERVER RUNNING AT PORT ${port}........`)});


//module.exports.db_conn = db_conn;
