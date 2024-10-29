const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getCategories,
} = require("../controllers/category");

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.get("/", getCategories);

module.exports = router;
