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
  const result = await pool.query(
    `SELECT cars.*, users.name AS owner_name 
    FROM cars 
    JOIN users ON users.id = cars.owner_id
    WHERE cars.id = $1`,
    [carId]
  );
  return result.rows;
}

async function createCar(
  brand,
  model,
  year,
  price,
  status,
  owner_id,
  body_type
) {
  try {
    await pool.query(
      `INSERT INTO cars (brand, model, year, price, status, owner_id, body_type) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [brand, model, year, price, status, owner_id, body_type]
    );
  } catch (error) {
    console.error("Database error while creating car:", error);
    throw error;
  }
}

async function updateCar(
  brand,
  model,
  year,
  price,
  status,
  owner_id,
  body_type,
  carId
) {
  try {
    await pool.query(
      `UPDATE cars  
      SET brand = $1, model = $2, year = $3, price = $4, status = $5, owner_id = $6, body_type = $7
      WHERE id = $8
`,
      [brand, model, year, price, status, owner_id, body_type, carId] // Fix: Properly pass array
    );
  } catch (error) {
    console.error("Database error while creating car:", error);
    throw error;
  }
}

module.exports = {
  getAllCarInfo,
  getAllCategories,
  getCarsByCategory,
  getCarDetail,
  createCar,
  updateCar,
};
