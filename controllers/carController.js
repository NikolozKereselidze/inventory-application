const db = require("../db/queries");

async function getAllCars(req, res) {
  const allCars = await db.getAllCarInfo();
  res.render("cars", { cars: allCars });
}

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
}

async function getCarCategory(req, res) {
  const cars = await db.getCarsByCategory(req.params.category);
  res.render("cars", { cars });
}

async function getCar(req, res) {
  const car = await db.getCarDetail(req.params.carId);
  res.render("cars", { cars: car });
}

module.exports = {
  getAllCars,
  getCategories,
  getCarCategory,
  getCar,
};
