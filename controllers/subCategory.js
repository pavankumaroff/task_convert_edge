const { SubCategory } = require("../models/subCategory");

async function createSubCategory(req, res) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });

  try {
    const subCategory = new SubCategory({ name });
    await subCategory.save();

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateSubCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });

  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true }
    );

    if (!subCategory)
      return res.status(404).json({ messaeg: "Sub category not found" });

    res.json(subCategory);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getSubCategories(req, res) {
  try {
    const subCategories = await SubCategory.find();

    res.json(subCategories);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports.createSubCategory = createSubCategory;
module.exports.getSubCategories = getSubCategories;
module.exports.updateSubCategory = updateSubCategory;
