const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("DB ping OK");
    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("DB ping failed:", err.message);
    return { statusCode: 500, body: "Failed" };
  }
};
