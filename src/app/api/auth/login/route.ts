// src/app/api/auth/login/route.ts
// Login admin - verifikasi Firebase ID token (server-side)

import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, idToken } = body;

    // Cek ID token (dikirim dari client-side setelah login Firebase Auth)
    // Server-side: hanya verifikasi token, bukan sign-in menggunakan Admin SDK
    const tokenToVerify = idToken || (await request.headers.get("authorization"));
    if (!tokenToVerify) {
      return NextResponse.json(
        { success: false, message: "Token tidak diberikan" },
        { status: 401 }
      );
    }

    const verified = await verifyIdToken(tokenToVerify);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }

    // Set cookie session
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        uid: verified.uid,
        email: verified.email || "",
        displayName: verified.name || "",
      },
    });

    const encoded = encodeURIComponent(tokenToVerify);
    const cookieValue = `sid=${encoded}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`;

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        ...response.headers,
        "set-cookie": cookieValue,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    let message = "Login gagal";
    return NextResponse.json(
      { success: false, message },
      { status: 401 }
    );
  }
}
