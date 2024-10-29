const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  updateCourse,
} = require("../controllers/course");

router.post("/", createCourse);
router.put("/:id", updateCourse);
router.get("/", getCourses);

module.exports = router;
