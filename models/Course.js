const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: Array,
});

const Model = mongoose.model("Course", schema);

module.exports = Model;
