const express    = require("express");
const { Pool }   = require("pg");
const cors       = require("cors");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const toProduct = (row) => ({
  id:         row.id,
  cat:        row.cat,
  title:      row.title,
  desc:       row.description,
  badge:      row.badge   || null,
  phone:      row.phone,
  wa:         row.wa_message,
  img:        row.image   || null,
  cityPrices: row.city_prices || {},
  sort_order: row.sort_order,
  section:    row.section || "Building Materials",
});

const uploadImage = async (base64) => {
  if (!base64) return null;
  if (base64.startsWith("http")) return base64;
  const result = await cloudinary.uploader.upload(base64, {
    folder: "ndarugo",
    transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
  });
  return result.secure_url;
};

app.get("/api/products", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products ORDER BY sort_order ASC, id ASC");
    res.json(rows.map(toProduct));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/products", async (req, res) => {
  const { cat, title, desc, badge, phone, wa, img, cityPrices, sort_order, section } = req.body;
  if (!cat || !title || !desc) return res.status(400).json({ error: "cat, title and desc are required" });
  try {
    const imageUrl = await uploadImage(img);
    const { rows } = await pool.query(
      `INSERT INTO products (cat, title, description, badge, phone, wa_message, image, city_prices, sort_order, section)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [cat, title, desc, badge||null, phone||"+254712345678", wa||null, imageUrl,
       JSON.stringify(cityPrices||{}), sort_order??0, section||"Building Materials"]
    );
    res.status(201).json(toProduct(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/products/reorder", async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
  try {
    await Promise.all(items.map(({ id, sort_order }) =>
      pool.query("UPDATE products SET sort_order=$1 WHERE id=$2", [sort_order, id])
    ));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { cat, title, desc, badge, phone, wa, img, cityPrices, sort_order, section } = req.body;
  try {
    const imageUrl = await uploadImage(img);
    const { rows } = await pool.query(
      `UPDATE products SET cat=$1, title=$2, description=$3, badge=$4, phone=$5, wa_message=$6,
       image=COALESCE($7,image), city_prices=$8, sort_order=$9, section=$10 WHERE id=$11 RETURNING *`,
      [cat, title, desc, badge||null, phone||"+254712345678", wa||null, imageUrl,
       JSON.stringify(cityPrices||{}), sort_order??0, section||"Building Materials", id]
    );
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(toProduct(rows[0]));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = app;
