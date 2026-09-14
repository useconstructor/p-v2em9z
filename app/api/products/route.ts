import { db } from '@/lib/db';

export async function GET() {
  await db.execute(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL,
    description TEXT,
    colorways INTEGER DEFAULT 1,
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  const { rows } = await db.execute('SELECT * FROM products ORDER BY created_at DESC');

  if (rows.length === 0) {
    const defaultProducts = [
      { name: 'Oversize Shirts', category: 'shirts', price: 54.99, description: 'Oversized fit with reinforced stitching', colorways: 4, image_url: '/images/product-1.png' },
      { name: 'Buzos', category: 'buzos', price: 79.99, description: 'Heavyweight hoodie with drawstring', colorways: 3, image_url: '/images/product-3.png' },
      { name: 'Cargo Pants', category: 'pants', price: 69.99, description: 'Multi pocket utility cut', colorways: 2, image_url: null },
      { name: 'Crew Socks', category: 'socks', price: 14.99, description: 'Premium cotton with La Calle branding', colorways: 5, image_url: null },
      { name: 'High Top Tennis', category: 'tennis', price: 129.99, description: 'Street ready silhouette', colorways: 2, image_url: null },
      { name: 'Graphic Tees', category: 't-shirts', price: 44.99, description: 'Bold graphics on premium cotton', colorways: 6, image_url: null },
    ];

    for (const p of defaultProducts) {
      await db.execute({
        sql: 'INSERT INTO products (name, category, price, description, colorways, image_url) VALUES (?,?,?,?,?,?)',
        args: [p.name, p.category, p.price, p.description, p.colorways, p.image_url],
      });
    }

    const { rows: newRows } = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
    return Response.json(newRows);
  }

  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.execute(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL,
    description TEXT,
    colorways INTEGER DEFAULT 1,
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute({
    sql: 'INSERT INTO products (name, category, price, description, colorways, image_url) VALUES (?,?,?,?,?,?)',
    args: [body.name, body.category, body.price ?? null, body.description ?? null, body.colorways ?? 1, body.image_url ?? null],
  });

  return Response.json({ ok: true });
}
