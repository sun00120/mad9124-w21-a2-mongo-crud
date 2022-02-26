"use strict";

// load dependencies
const express = require("express");
const studentRouter = require("./routes/student.js");
const courseRouter = require("./routes/course.js");

// create the express app
const app = express();

// configure express middleware
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/courses", courseRouter);

const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));
