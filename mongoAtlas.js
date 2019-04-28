
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pn:p@ssw0rd@cluster0-gc5yc.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("pnrevamp").collection("tblUser");
  collection.find({},function(err,result){
      result.forEach(element => {
          console.log(element.Username);
      },function(){
          console.log('finish reading');
      });
  });
  var user = {
      'Username':'dan',
      'Password':'sample'
  }
//   collection.save(user);
  client.close();
});

// module.exports.allUser = function(){
//     var all = [];
//     client.connect(err => {
//         const collection = client.db("pnrevamp").collection("tblUser");
//         collection.find({},function(err,result){
//             result.forEach(element => {
//                 //console.log(element.Username);
//                 all.push(element);
//             },function(){
//                 console.log(all);
//             });
//         });
//         var user = {
//             'Username':'dan',
//             'Password':'sample'
//         }
//       //   collection.save(user);
//         client.close();
//       });

// }
module.export = client;
