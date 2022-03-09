const express = require("express");
const Course = require("../models/Course");
const sanitizeBody = require("../middleware/sanitizeBody");

const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json({
    data: courses.map((course) =>
      formatResponseData("courses", course.toObject())
    ),
  });
});

router.post("/", sanitizeBody, async (req, res) => {
  let attributes = req.body.data.attributes;
  delete attributes._id;

  try {
    let newCourse = new Course(attributes);
    await newCourse.save();
    res
      .status(201)
      .json({ data: formatResponseData("courses", newCourse.toObject()) });
  } catch (error) {
    res.status(500).send({
      errors: [
        {
          status: "500",
          title: "Server error",
          description: "Problem saving document to the database.",
        },
      ],
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("students");
    if (!course) {
      throw new Error("Resource not found");
    }
    res.json({ data: formatResponseData("courses", course.toObject()) });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.patch("/:id", sanitizeBody, async (req, res) => {
  try {
    const { _id, ...attributes } = req.body.data.attributes;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { id: req.params.id, ...attributes },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!course) {
      throw new Error("Resource not found!");
    }
    res.json({ data: formatResponseData("courses", course.toObject()) });
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.put("/:id", sanitizeBody, async (req, res) => {
  try {
    const { _id, ...otherAttributes } = req.body.data.attributes;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { _id: req.params.id, ...otherAttributes },
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );
    if (!course) throw new Error("Resource not found");
    res.json({ data: formatResponseData("courses", course.toObject()) });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) throw new Error("Resource not found");
    res.json({ data: formatResponseData("courses", course.toObject()) });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

function formatResponseData(type, resource) {
  const { _id, ...attributes } = resource;
  return { type, id: _id, attributes };
}

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: "404",
        title: "Resource does not exist",
        description: `We could not find a course with id: ${req.params.id}`,
      },
    ],
  });
}

module.exports = router;
