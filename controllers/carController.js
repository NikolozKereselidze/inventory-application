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

async function showCreateCarForm(req, res) {
  res.render("form");
}

async function createCar(req, res) {
  const { brand, model, year, price, status, owner_id, body_type } = req.body;

  await db.createCar(brand, model, year, price, status, owner_id, body_type);
  res.redirect("/");
}

async function showUpdateCar(req, res) {
  const car = await db.getCarDetail(req.params.carId);
  res.render("form", { car });
}

async function updateCar(req, res) {
  const { brand, model, year, price, status, owner_id, body_type } = req.body;
  await db.updateCar(
    brand,
    model,
    year,
    price,
    status,
    owner_id,
    body_type,
    req.params.carId
  );
  res.redirect("/");
}

module.exports = {
  getAllCars,
  getCategories,
  getCarCategory,
  getCar,
  showCreateCarForm,
  createCar,
  showUpdateCar,
  updateCar,
};
