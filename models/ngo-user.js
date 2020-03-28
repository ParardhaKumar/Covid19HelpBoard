var mongoose = require("mongoose");

// Schema
var ngoUserSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model("NGOUser", ngoUserSchema);
