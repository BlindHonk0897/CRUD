//requiring express module
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//to manipulate all the data nga ipasa sa url
var urlencodedparser = bodyParser.urlencoded({extended:false});

var mongoose = require('mongoose');

app.set("view engine", "ejs");

//include images
app.use(express.static("assets"));

app.get("/", function(req, res){
	res.render("mongo");
});

app.get("/register", function(req, res){
	res.render("register");
});


app.post("/submitForm", urlencodedparser, function(req, res){
	var input = new person ({name: "", in: ""});
	console.log(req.body);
	input.save(function (err, data){
		if (err) throw err;
	});
});
//mongoose na ni cya
var personSchema = new mongoose.Schema({
		name: String,
		in: String,
		out:String
});

var person = mongoose.model("crudCollection", personSchema);

//connect to online mongodb nga database
mongoose.connect("mongodb+srv://pbautista:AGentt911@test-sbq4v.mongodb.net/test?retryWrites=true/firstcrud", {userNewUrlParser: true});

//if connection error occur
mongoose.connection.on("error", console.error.bind(console, "Connection error: "));

app.listen(3000);
console.log("listening to port 3000");