const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();

const category = require("./routes/category");
const subCategory = require("./routes/subCategory");
const course = require("./routes/course");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/category", category);
app.use("/api/subCategory", subCategory);
app.use("/api/course", course);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
