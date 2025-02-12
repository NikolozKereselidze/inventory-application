const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.getAllCars);

router.get("/categories", carController.getCategories);

router.get("/cars/new", carController.showCreateCarForm);
router.post("/cars/new", carController.createCar);

router.get("/cars/:category", carController.getCarCategory);

router.get("/car/:carId", carController.getCar);

router.get("/car/update/:carId", carController.showUpdateCar);
router.post("/car/update/:carId", carController.updateCar);

module.exports = router;
