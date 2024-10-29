const { Course } = require("../models/course");
const { Category } = require("../models/category");
const { SubCategory } = require("../models/subCategory");

async function createCourse(req, res) {
  const { name, categoryId, subCategoryId } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });
  if (!categoryId)
    return res.status(400).json({ message: "categoryId is required" });
  if (!subCategoryId)
    return res.status(400).json({ message: "subCategoryId is required" });

  try {
    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!category) return res.status(400).json("Invalid category");
    if (!subCategory) return res.status(400).json("Invalid sub category");

    const course = new Course({
      name,
      categories: category._id,
      subCategories: subCategory._id,
    });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const { name, categoryId, subCategoryId } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });
  if (!categoryId)
    return res.status(400).json({ message: "categoryId is required" });
  if (!subCategoryId)
    return res.status(400).json({ message: "subCategoryId is required" });

  try {
    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!category) return res.status(400).json("Invalid category");
    if (!subCategory) return res.status(400).json("Invalid sub category");

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          categories: category._id,
          subCategories: subCategory._id,
        },
      },
      { new: true }
    );

    if (!course) return res.status(404).json({ messaeg: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getCourses(req, res) {
  try {
    const courses = await Course.find()
      .populate("categories", "name")
      .populate("subCategories");

    res.json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports.createCourse = createCourse;
module.exports.updateCourse = updateCourse;
module.exports.getCourses = getCourses;
