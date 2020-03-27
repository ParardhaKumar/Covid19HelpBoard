var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var users = [{
          "address": "Some place in India",
          "contact": 9801033867,
          "requirement": "Medicines, Water, Rations",
        }
];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  res.render("landing");
});

app.get("/sos", function(req,res){
  res.render("sos", {users:users});
});

app.post("/sos", function(req, res){
  var address = req.body.address;
  var contact = req.body.contact;
  var requirement = req.body.requirement;

  var user = {address: address, contact: contact, requirement: requirement};

  users.push(user);
  //res.send("Hit the POST Route");
  res.redirect("sos");
});

app.get("/sos/new", function(req,res){
  res.render("new");
});

app.get("*", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  res.render("404");
});

app.listen(3000, function(){
  console.log("Welcome, Mr.Kumar. COVID-19 HELPBOARD Server Running Successfully!");
});
