const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_5FikdsfbY7ox@ep-fancy-bar-aifwu1r1-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

async function check() {
  const { rows } = await pool.query(`
    SELECT id, title, 
    CASE WHEN image LIKE 'data:%' THEN 'base64 ❌' 
         WHEN image LIKE 'http%' THEN 'cloudinary ✅'
         ELSE 'no image' END as image_status
    FROM products
  `);
  rows.forEach(r => console.log(`ID ${r.id}: ${r.title} — ${r.image_status}`));
  await pool.end();
}

check();
