var mongoose = require('mongoose');
var personSchema = new mongoose.Schema({
  name:String,
  in:String,
  out:String
});
mongoose.connect('mongodb://localhost:27017/customers',{useNewUrlParser: true});
mongoose.connection.on("error", console.error.bind(console, "connection error: "));
var person = mongoose.model("customers", personSchema);

// var n = new person({name:'Dan',in:'12.00'});
// n.save(function(err,n){
//      if (err){
//       console.log('saving failed');
//      }
//       console.log('saved '+ n.name);
// });

// person.find({},function(errs,result){
//   result.forEach(function(user){
//     console.log(user.name);
//   })
// })
var commands = {
  findUser:function(){
    var names = [];
    person.find({},function(errs,result){
      console.log(result.toString())
      result.forEach(function(user){
        //console.log(user)
        names.push(user);
      })
    })
    return names;
  }
}
console.log(commands.findUser())
module.exports = person;