const express = require("express");
const path = require("path");
const app = express();
const carRoutes = require("./routes/carRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", carRoutes);

app.listen(process.env.PORT, () =>
  console.log(`✅ Server running at http://localhost:${process.env.PORT}`)
);
