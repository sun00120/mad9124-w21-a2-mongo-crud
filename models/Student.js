const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  nickName: String,
  email: String,
});

const Model = mongoose.model("Student", schema);

module.exports = Model;
