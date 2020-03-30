var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var session = require("express-session");
var NGOUser = require("./models/ngo-user");
var User = require("./models/user");
var Suggestion = require("./models/suggestion")

var db_url = process.env.DATABASEURL || "mongodb://localhost/covid19_helpboard";
console.log(db_url);
mongoose.connect(db_url);

// var users = [{
//           "address": "Some place in India",
//           "contact": 9801033867,
//           "requirement": "Medicines, Water, Rations",
//         }
// ];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

// Passport Configuration
app.use(require("express-session")({
  secret: "Made by Parardha & Prajneya",
  resave: false,
  saveUninitialized: false
}));
//app.use(session({ secret: 'Made by Parardha & Prajneya' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(NGOUser.authenticate()));
passport.serializeUser(NGOUser.serializeUser());
passport.deserializeUser(NGOUser.deserializeUser());

//Use the below template to delete any test users
// User.remove({contact:0}, function(err, users){
//   if(err){
//     console.log(err);
//   }
// });

app.get("/", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  request("https://api.rootnet.in/covid19-in/stats/latest", function(error, response, body){
    if(!error && response.statusCode == 200){
      var parsedData = JSON.parse(body);
      var total = parsedData["data"]["summary"]["total"];
      var discharged = parsedData["data"]["summary"]["discharged"];
      var deaths = parsedData["data"]["summary"]["deaths"];
      res.render("landing", {total: total, discharged: discharged, deaths: deaths});
    }
  })
});

app.get("/sos", isLoggedIn, function(req,res){
  User.find({}, function(err, users){
    if(err){
      console.log(err);
    }
    else{
      res.render("sos", {users:users});
    }
  })
});

app.post("/sos", function(req, res){

  console.log(req.body);

  var pincode = req.body.pincode;
  var name = req.body.name;
  var address = req.body.address;
  var contact = req.body.contact;
  var requirement = req.body.requirement;
  var medicine = req.body.medicine ? "Yes" : "No";
  var ration = req.body.ration ? "Yes" : "No";
  var ambulance = req.body.ambulance ? "Yes" : "No";
  var newUser = {pincode: pincode,
                 name: name,
                 address: address,
                 contact: contact,
                 requirement: requirement,
                 medicine: medicine,
                 ration: ration,
                 ambulance: ambulance};

   User.create(newUser, function(err, user){
     if(err){
       console.log(err);
     }
     else{
       console.log("New User Created");
       console.log(user);
     }
   });
   res.redirect("sos");
});

app.get("/sos/new", function(req,res){
  res.render("new");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/corona", function(req, res){
  res.render("corona");
});

app.get("/vulnerability", function(req, res){
  res.render("vulnerability");
});

app.post("/register", function(req, res){
  var newNGOUser = new NGOUser({username: req.body.username});
  NGOUser.register(newNGOUser, req.body.password, function(err, ngoUser){
    if(err){
      console.log(err);
      res.redirect("register");
    }
    passport.authenticate("local")(req, res, function(){
        res.redirect("sos");
      });
  });
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local", {successRedirect: "/sos",
                                                   failureRedirect: "/login"
                                                  }),function(req, res){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.get("/idea", function(req, res){
  Suggestion.find({}, function(err, suggestion){
    if(err){
      console.log(err);
    }
    else{
      console.log(suggestion);
      res.render("suggestion", {suggestion: suggestion});
    }
  });
});

app.post("/idea", function(req, res){
  var author = req.body.author;
  var title = req.body.title;
  var content = req.body.content;
  var date = new Date();
  // var created = data.month() + " " + date.getDate() + ", " + date.getYear()

  var newIdea = {
      author: author,
      title: title,
      content: content,
      created: date
  };

  Suggestion.create(newIdea, function(err, suggestion){
        if(err){
          console.log(err);
          res.render("404");
        }
        else{
          console.log("New Idea Created!");
        }
    });
  res.redirect("/idea");
});

app.put("/sos/:id", isLoggedIn, function(req, res){
  console.log(req.user._id);
  User.findByIdAndUpdate(req.params.id, {assignedTo: req.user.username}, function(err, user_in_need_of_help){
    if(err){
      console.log(err);
      res.redirect("/sos");
    }
    else{
      console.log(user_in_need_of_help.name + " is being assigned to");
      console.log(req.user.username);
      //user.assignedTo = req.NGOUser;
      NGOUser.findByIdAndUpdate(req.user._id, {$addToSet: {casesAssigned: [user_in_need_of_help]}}, function(err, ngouser){
        if(err){
          console.log(err);
          res.redirect("/sos");
        }
        else{
          console.log(ngouser.username + " has been assigned " + user_in_need_of_help + "'s Case'");
          res.redirect("/sos");
        }
      });
      //req.user.casesAssigned.push(user_in_need_of_help);
    }
  });
  //res.send("Edit User Assigned To ROUTE");
});

app.delete("/sos/:id", isLoggedIn, function(req, res){
    var id = req.params.id
    User.findById(id, function(err, user){
      if(user.assignedTo !== req.user.username){
        res.send("This Case is NOT Assigned to you. Delete Request Rejected");
      }
      else{
        User.findByIdAndRemove(req.params.id, function(err){
          if(err){
            console.log(err);
            res.redirect("/sos");
          }
          else{
            res.redirect("/sos");
          }
        });
      }
    });
});

app.get("*", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  res.render("404");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Welcome, Mr.Kumar. COVID-19 HELPBOARD Server Running Successfully!");
});
