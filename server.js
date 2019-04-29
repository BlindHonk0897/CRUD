var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser =  require('body-parser');
//var database = require('./database');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

const port = process.env.PORT || 2020;

// database.find({},function(errs,result){
//      result.forEach(function(user){
//       console.log(user.name);
//      })
//    })

//var client = require('./mongoAtlas');

var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://pn:p@ssw0rd>@cluster0-gc5yc.mongodb.net/test?retryWrites=true";
//for local session, mongodb://localhost:27017/
const uri = "mongodb://localhost:27017/";
let  client = null;


app.use(express.static(__dirname +'/public'));

app.get('/',function(req,res){ 
   client.db('CrudDB').collection('CrudCollection').find({}).toArray((err, docs) => {
    assert.equal(null, err)
    res.render(__dirname + '/public/views/index.ejs',{'result':docs});
  })
});

app.post('/register',function(req,res){
   res.render(__dirname + '/public/views/register.ejs');
});

app.post('/add',function(req,res){
  console.log(req.body.Name);
  var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    if(hour > 12){
      hour = hour - 12;
    }
    if(min < 10){
      min = "0" + min;
    }
  var toReg = {
    'Name':req.body.Name,
    'In':today.getHours()-12 +":"+today.getMinutes()
  }
  client.db('CrudDB').collection('CrudCollection').insertOne(toReg);
  res.render(__dirname + '/public/views/success.ejs',{'Name':req.body.Name});
});

app.post('/',(req,res)=>{
   //console.log(req.body.Name);
   var Name = req.body.Name; 
   client.db('CrudDB').collection('CrudCollection').findOne({['Name']:Name},(err,result)=>{
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    if(hour > 12){
      hour = hour - 12;
    }
    if(min < 10){
      min = "0"+min;
    }
    var id = result._id;
    if(id !== null){
    client.db('CrudDB').collection('CrudCollection').updateOne({'_id':id},{$set:{'Out':hour +":"+min}})
    client.db('CrudDB').collection('CrudCollection').find({}).toArray((err, docs) => {
      assert.equal(null, err)
      res.render(__dirname + '/public/views/index.ejs',{'result':docs});
    })
    }
   });
});

app.post('/edit',(req,res)=>{
  var Name = req.body.Name; 
  client.db('CrudDB').collection('CrudCollection').findOne({['Name']:Name},(err,result)=>{
    //console.log(result);
    res.render(__dirname + '/public/views/edit.ejs',{'Result':result.Name,'In':result.In,'Out':result.Out});
  });
 
});


app.post('/delete',(req,res)=>{
 // console.log(req.body.count);
   var Name = req.body.Name; 
   client.db('CrudDB').collection('CrudCollection').deleteOne({['Name']:Name},(err,result)=>{
   });
   res.render(__dirname + '/public/views/delete.ejs',{'Name':Name});
 });

 app.post('/saveEdit',(req,res)=>{
   //console.log(req.body.Name);
   var hidName = req.body.hidName;
   var Name = req.body.Name;
   client.db('CrudDB').collection('CrudCollection').findOne({['Name']:hidName},(err,result)=>{
    var id = result._id;
    client.db('CrudDB').collection('CrudCollection').updateOne({'_id':id},{$set:{'Name':Name}});
    client.db('CrudDB').collection('CrudCollection').find({}).toArray((err, docs) => {
      assert.equal(null, err)
      //res.render(__dirname + '/public/views/index.ejs',{'result':docs});
      res.redirect('/');
    })
   });
  });

MongoClient.connect(uri, { useNewUrlParser: true }, (err, res) => {
  assert.equal(null, err);
  client = res;
   app.listen(port,()=>{console.log(`SERVER RUNNING AT PORT ${port}........`)});
});
