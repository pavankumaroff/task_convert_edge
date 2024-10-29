const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
