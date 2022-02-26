const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: [(type = mongoose.Schema.Types.ObjectId), (ref = "Student")],
});

const Model = mongoose.model("Course", schema);

module.exports = Model;
