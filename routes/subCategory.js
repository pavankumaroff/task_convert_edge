const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
} = require("../controllers/subCategory");

router.post("/", createSubCategory);
router.put("/:id", updateSubCategory);
router.get("/", getSubCategories);

module.exports = router;
