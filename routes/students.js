const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json({
    data: students.map((student) =>
      formatResponseData("students", student.toObject())
    ),
  });
});

module.exports = router;
