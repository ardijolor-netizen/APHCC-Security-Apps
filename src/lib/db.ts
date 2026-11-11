// src/lib/db.ts
// Koneksi ke Neon (PostgreSQL)
// Hanya gunakan di server-side (API route, bukan komponen client)

import { Pool } from "pg";

const databaseUrl =
  process.env.NEXT_PUBLIC_NEON_DATABASE_URL ||
  "postgres://user:password@host:5432/database"; // Placeholder — ganti sendiri!

export const pool = new Pool({
  connectionString: databaseUrl,
  max: 5, // maksimal 5 koneksi sekaligus
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // console.log("Executed query in %d ms: %s", duration, text);
  return res;
}
