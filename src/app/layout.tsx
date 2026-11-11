// src/app/layout.tsx
// Root layout

import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "APHCC Security Apps - Security Pantauan Aston Palembang",
  description: "Aplikasi keamanan & penerimaan pengunjung untuk Aston Palembang",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔒</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
