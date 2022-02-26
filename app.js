"use strict";

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mad9124", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => {
    console.error("Problem connecting to MongoDB ...", err.message);
    process.exit(1);
  });

const studentRouter = require("./routes/students.js");
const courseRouter = require("./routes/courses.js");

// create the express app
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/courses", courseRouter);

const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));
