var mongoose = require("mongoose");

// Schema
var userSchema = new mongoose.Schema({
  pincode: Number,
  name: String,
  address: String,
  contact: Number,
  requirement: String,
  medicine: String,
  ration: String,
  ambulance: String
});

module.exports = mongoose.model("User", userSchema);


// User.create({
//   "address": "Granate Hill",
//   "contact": +1404232323,
//   "requirement": "Oxygen Cylinders",
// }, function(err, user){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("New User Created");
//     console.log(user);
//   }
// })
