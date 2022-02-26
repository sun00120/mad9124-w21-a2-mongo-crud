const mongoose = require("mongoose");
const Student = require("./Student.js");

const schema = new mongoose.Schema({
  code: { type: String, required: true, maxlength: 16 },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: false, maxlength: 2048 },
  url: { type: String, required: false, maxlength: 512 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Model = mongoose.model("Course", schema);

module.exports = Model;
