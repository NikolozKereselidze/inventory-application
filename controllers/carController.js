const db = require("../db/queries");

async function getAllCars(req, res) {
  const allCars = await db.getAllCarInfo();
  res.render("cars", { cars: allCars, page: "Home" });
}

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
}

async function getCarCategory(req, res) {
  const cars = await db.getCarsByCategory(req.params.category);
  res.render("cars", { cars, page: "Home" });
}

async function getCar(req, res) {
  const car = await db.getCarDetail(req.params.carId);
  res.render("cars", { cars: car, page: "car" });
}

async function showCreateCarForm(req, res) {
  const userLength = await db.getUserLength();
  res.render("form", { userLength });
}

async function createCar(req, res) {
  const {
    brand,
    model,
    year,
    price,
    status,
    owner_id,
    body_type,
    transmission_type,
    fuel_type,
  } = req.body;

  await db.createCar(
    brand,
    model,
    year,
    price,
    status,
    owner_id,
    body_type,
    transmission_type,
    fuel_type
  );
  res.redirect("/");
}

async function showUpdateCar(req, res) {
  const car = await db.getCarDetail(req.params.carId);
  res.render("carEditForm", { car });
}

async function updateCar(req, res) {
  const { brand, model, year, price, status, body_type } = req.body;
  await db.updateCar(
    brand,
    model,
    year,
    price,
    status,
    body_type,
    req.params.carId
  );
  res.redirect("/");
}

async function deleteCar(req, res) {
  const carId = req.params.carId;
  await db.deleteCar(carId);
  res.redirect("/");
}

// USER RELATED FUNCTIONS
async function createUser(req, res) {
  if (req.method === "GET") {
    res.render("createUser");
  } else if (req.method === "POST") {
    const { fullName, phone, role } = req.body;
    await db.createUser(fullName, phone, role);
    res.redirect("/");
  }
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
  deleteCar,
  createUser,
};
