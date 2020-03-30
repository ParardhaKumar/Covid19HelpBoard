var mongoose = require("mongoose");

// Schema
var suggestionSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  created: {type: Date, default: Date.now},
  //upvotes: Number
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
