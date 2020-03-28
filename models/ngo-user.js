var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// Schema
var ngoUserSchema = new mongoose.Schema({
  username: String,
  password: String
});

ngoUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("NGOUser", ngoUserSchema);
