const pool = require("./pool");

async function getAllCarInfo() {
  const result = await pool.query(`SELECT cars.*, users.name AS owner_name 
    FROM cars 
    JOIN users ON users.id = cars.owner_id`);
  return result.rows;
}

async function getAllCategories() {
  const result = await pool.query("SELECT DISTINCT body_type FROM cars");
  return result.rows;
}

async function getCarsByCategory(bodyType) {
  const result = await pool.query("SELECT * FROM cars WHERE body_type = $1", [
    bodyType,
  ]);
  return result.rows;
}

async function getCarDetail(carId) {
  const result = await pool.query("SELECT * FROM cars WHERE id = $1", [carId]);
  console.log(result);
  return result.rows;
}

module.exports = {
  getAllCarInfo,
  getAllCategories,
  getCarsByCategory,
  getCarDetail,
};
