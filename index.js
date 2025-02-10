const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(___dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use("/");

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`)
);
