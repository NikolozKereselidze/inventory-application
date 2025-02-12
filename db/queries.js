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
  body_type,
  transmission_type,
  fuel_type
) {
  try {
    await pool.query(
      `INSERT INTO cars (brand, model, year, price, status, owner_id, body_type, transmission_type, fuel_type) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        brand,
        model,
        year,
        price,
        status,
        owner_id,
        body_type,
        transmission_type,
        fuel_type,
      ]
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
  body_type,
  transmission_type,
  fuel_type,
  carId
) {
  try {
    await pool.query(
      `UPDATE cars  
        SET brand = $1, model = $2, year = $3, price = $4, status = $5,  body_type = $6, transmission_type = $7, fuel_type = $8
        WHERE id = $10`,
      [
        brand,
        model,
        year,
        price,
        status,
        body_type,
        transmission_type,
        fuel_type,
        carId,
      ]
    );
  } catch (error) {
    console.error("Database error while updating car:", error);
    throw error;
  }
}

async function deleteCar(carId) {
  await pool.query(
    `
        DELETE FROM cars
        WHERE id = $1
        `,
    [carId]
  );
}

// QUERIES TO CREATE USERS
async function createUser(fullName, phone, role) {
  await pool.query(
    `
    INSERT INTO USERS (name, phone, role)
    VALUES ($1, $2, $3)
    `,
    [fullName, phone, role]
  );
}

async function getUserLength() {
  const results = await pool.query(`
    SELECT COUNT(*) FROM users`);
  return results.rows[0].count;
}

module.exports = {
  getAllCarInfo,
  getAllCategories,
  getCarsByCategory,
  getCarDetail,
  createCar,
  updateCar,
  deleteCar,
  createUser,
  getUserLength,
};
