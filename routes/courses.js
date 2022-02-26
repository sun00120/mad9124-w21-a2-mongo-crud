const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json({
    data: courses.map((course) =>
      formatResponseData("courses", course.toObject())
    ),
  });
});

module.exports = router;
