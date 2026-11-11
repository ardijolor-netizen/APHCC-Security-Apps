// src/app/api/packages/route.ts
// API: Penerimaan Paket
// GET  -> ambil semua data
// POST -> simpan data baru

import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { verifyIdToken } from "../../../lib/auth";

const TABLE = "packages";

function getHeaders(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return null;
  }
  return auth.split(" ")[1]; // Bearer <token>
}

// GET: ambil semua
export async function GET(req: NextRequest) {
  try {
    const idToken = getHeaders(req);
    if (!idToken) {
      return NextResponse.json({ success: false, message: "Harus login" }, { status: 401 });
    }

    const decoded = await verifyIdToken(idToken);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Token tidak valid" }, { status: 401 });
    }

    const res = await query(`SELECT * FROM ${TABLE} ORDER BY id DESC`);
    return NextResponse.json({
      success: true,
      data: res.rows,
    });
  } catch (error: any) {
    console.error("GET packages error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// POST: simpan
export async function POST(req: NextRequest) {
  try {
    const idToken = getHeaders(req);
    if (!idToken) {
      return NextResponse.json({ success: false, message: "Harus login" }, { status: 401 });
    }

    const decoded = await verifyIdToken(idToken);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Token tidak valid" }, { status: 401 });
    }

    const body = await req.json();
    const { name, package_type, address, phone, notes, status } = body;

    if (!name || !package_type || !address || !phone) {
      return NextResponse.json(
        { success: false, message: "Nama, tipe paket, alamat, dan telepon wajib diisi" },
        { status: 400 }
      );
    }

    const res = await query(
      `INSERT INTO ${TABLE} (name, package_type, address, phone, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, package_type, address, phone, notes || "", status || "pending"]
    );

    return NextResponse.json({
      success: true,
      message: "Data tersimpan",
      data: res.rows[0],
    });
  } catch (error: any) {
    console.error("POST packages error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
