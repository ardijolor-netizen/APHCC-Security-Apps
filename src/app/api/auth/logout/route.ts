// src/app/api/auth/logout/route.ts
// Logout

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (idToken) {
      await getAuth().revokeRefreshTokens(idToken);
    }

    // Hapus cookie session
    const response = NextResponse.json({
      success: true,
      message: "Logout berhasil",
    });

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        ...response.headers,
        "set-cookie": "sid=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
      },
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Logout gagal" },
      { status: 500 }
    );
  }
}
