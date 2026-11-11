// src/app/page.tsx
// Halaman utama - redirect ke login

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HomePage() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("sid");

  // Jika sudah login, redirect ke dashboard
  if (authCookie) {
    redirect("/dashboard");
  }

  // Jika belum login, redirect ke login
  redirect("/login");
}
