var mongoose = require("mongoose");

// Schema
var suggestionSchema = new mongoose.Schema({
  title: String,
  body: String,
  created: {type: Date, default: Date.now},
  //upvotes: Number
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
