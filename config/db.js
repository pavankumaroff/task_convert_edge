const mongoose = require("mongoose");

module.exports = async () => {
  const db = process.env.DB_URL;
  
  try {
    await mongoose.connect(db);
    console.log(`Connected to ${db}...`);
  } catch (error) {
    console.log(error);
  }
};
