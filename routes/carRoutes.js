const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.getAllCars);

router.get("/categories", carController.getCategories);

router.get("/cars/:category", carController.getCarCategory);

router.get("/car/:carId", carController.getCar);

module.exports = router;
