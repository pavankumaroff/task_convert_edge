const { Category } = require("../models/category");

async function createCategory(req, res) {
  const { name, subCategoryIds } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });

  try {
    const category = new Category({ name, subCategory: subCategoryIds });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, subCategoryIds } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: { name, subCategory: subCategoryIds } },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ messaeg: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          subCategoryCount: {
            $size: "$subCategory",
          },
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports.createCategory = createCategory;
module.exports.getCategories = getCategories;
module.exports.updateCategory = updateCategory;
