// src/components/Header.tsx
// Header bagian atas (username + logout)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ user }: { user: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Panggil API logout (hapus cookie session)
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <h1 style={styles.title}>APHCC Security</h1>
        <p style={styles.subtitle}>Security Pantauan Aston Palembang</p>
      </div>
      <div style={styles.headerRight}>
        <span style={styles.userName}>Hi, {user?.displayName || user?.email?.split("@")[0]}</span>
        <button
          onClick={handleLogout}
          disabled={loading}
          style={styles.logoutBtn}
        >
          {loading ? "..." : "Logout"}
        </button>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1a237e",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#bbdefb",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userName: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#c62828",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
