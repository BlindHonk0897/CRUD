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
const uri = "mongodb+srv://pn:p@ssw0rd@cluster0-gc5yc.mongodb.net/test?retryWrites=true";
var  client = null;


app.use(express.static(__dirname +'/public'));

app.get('/',function(req,res){ 
//   client.connect(err => {
//     var all;
//     const collection = client.db("CrudDB").collection("CrudCollection");
//     collection.find({},function(err,result){
//       all = result;
//       all.forEach(element => {
//           console.log(element.Name);
//         });
//     // });
//     // var registrar = {
//     //     'Entry_No':2,
//     //     'Name':'Sample2',
//     //     'In':'1:00'
//     // }
//     //  collection.insertOne(registrar);
//     res.render(__dirname + '/public/views/index.ejs',{'result':result.urlencoded});
//     client.close();
    
//   }); 
  
// });

client.db('CrudDB').collection('CrudCollection').find({}).toArray((err, docs) => {
  assert.equal(null, err)
  res.render(__dirname + '/public/views/index.ejs',{'result':docs});
})
});

app.post('/register',function(req,res){
   res.render(__dirname + '/public/views/register.ejs');
});

app.post('/add',function(req,res){
    res.render(__dirname + '/public/views/index.ejs');
});


MongoClient.connect(uri, { useNewUrlParser: true }, (err, res) => {
  assert.equal(null, err)
  client = res
  app.listen(port,()=>{console.log(`SERVER RUNNING AT PORT ${port}........`)});
})




//module.exports.db_conn = db_conn;
