// src/app/api/vehicles/route.ts
// API: Pengecekan Kendaraan Parkir

import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { verifyIdToken } from "../../../lib/auth";

const TABLE = "vehicles";

function getHeaders(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  return auth.split(" ")[1];
}

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
    console.error("GET vehicles error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

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
    const { plate_number, vehicle_type, owner_name, parking_type, entry_time, exit_time, notes, status } = body;

    if (!plate_number || !vehicle_type || !owner_name) {
      return NextResponse.json(
        { success: false, message: "Nomor plat, tipe kendaraan, dan nama pemilik wajib diisi" },
        { status: 400 }
      );
    }

    const res = await query(
      `INSERT INTO ${TABLE} (plate_number, vehicle_type, owner_name, parking_type, entry_time, exit_time, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        plate_number,
        vehicle_type,
        owner_name,
        parking_type || "parkir umum",
        entry_time || "",
        exit_time || "",
        notes || "",
        status || "parked",
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Data tersimpan",
      data: res.rows[0],
    });
  } catch (error: any) {
    console.error("POST vehicles error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
