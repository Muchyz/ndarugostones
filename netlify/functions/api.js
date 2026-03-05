const express    = require("express");
const serverless = require("serverless-http");
const { Pool }   = require("pg");
const cors       = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const toProduct = (row) => ({
  id: row.id, cat: row.cat, title: row.title, desc: row.description,
  badge: row.badge || null, phone: row.phone, wa: row.wa_message,
  img: row.image || null,
  cityPrices: { nairobi: row.nairobi || "", thika: row.thika || "", mombasa: row.mombasa || "", meru: row.meru || "" },
  sort_order: row.sort_order,
});

app.get("/api/products", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products ORDER BY sort_order ASC, id ASC");
    res.json(rows.map(toProduct));
  } catch (err) { res.status(500).json({ error: "Failed to fetch products" }); }
});

app.post("/api/products", async (req, res) => {
  const { cat, title, desc, badge, phone, wa, img, cityPrices, sort_order } = req.body;
  if (!cat || !title || !desc) return res.status(400).json({ error: "cat, title and desc are required" });
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (cat, title, description, badge, phone, wa_message, image, nairobi, thika, mombasa, meru, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [cat, title, desc, badge||null, phone||"+254712345678", wa||null, img||null,
       cityPrices?.nairobi||null, cityPrices?.thika||null, cityPrices?.mombasa||null, cityPrices?.meru||null, sort_order??0]
    );
    res.status(201).json(toProduct(rows[0]));
  } catch (err) { res.status(500).json({ error: "Failed to create product" }); }
});

app.put("/api/products/reorder", async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
  try {
    await Promise.all(items.map(({ id, sort_order }) =>
      pool.query("UPDATE products SET sort_order=$1 WHERE id=$2", [sort_order, id])
    ));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed to reorder" }); }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { cat, title, desc, badge, phone, wa, img, cityPrices, sort_order } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE products SET cat=$1, title=$2, description=$3, badge=$4, phone=$5, wa_message=$6,
       image=COALESCE($7,image), nairobi=$8, thika=$9, mombasa=$10, meru=$11, sort_order=$12
       WHERE id=$13 RETURNING *`,
      [cat, title, desc, badge||null, phone||"+254712345678", wa||null, img||null,
       cityPrices?.nairobi||null, cityPrices?.thika||null, cityPrices?.mombasa||null, cityPrices?.meru||null, sort_order??0, id]
    );
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(toProduct(rows[0]));
  } catch (err) { res.status(500).json({ error: "Failed to update product" }); }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed to delete product" }); }
});

module.exports.handler = serverless(app);
