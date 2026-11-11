// src/app/dashboard/page.tsx
// Halaman Dashboard - beranda utama

import { cookies } from "next/headers";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { verifyIdToken } from "../../lib/auth";

// Cek auth dari cookie (sid)
async function getAuthUser() {
  const cookieStore = cookies();
  const sidCookie = cookieStore.get("sid");
  if (!sidCookie) return null;

  const token = decodeURIComponent(sidCookie.value.split("=")[1]);
  if (!token) return null;

  try {
    const decoded = await verifyIdToken(token);
    if (decoded) {
      return {
        uid: decoded.uid,
        email: decoded.email || "Admin",
        displayName: decoded.name || "Admin",
      };
    }
    return null;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getAuthUser();

  if (!user) {
    return (
      <div style={styles.dashboard}>
        <Header user={{ displayName: "Anda belum login" }} />
        <div style={styles.content}>
          <p style={{ color: "red", textAlign: "center" }}>
            Silakan login terlebih dahulu
          </p>
        </div>
      </div>
    );
  }

  // Statistik awal
  const stats = [
    { icon: "📦", label: "Penerimaan Paket", color: "#1a237e" },
    { icon: "🔑", label: "Kunci Dititipkan", color: "#e65100" },
    { icon: "🙋", label: "Tamu Masuk", color: "#2e7d32" },
    { icon: "🚗", label: "Kendaraan Parkir", color: "#0277bd" },
  ];

  return (
    <div style={styles.dashboard}>
      <Header user={user} />
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.header}>
            <h2>Dashboard</h2>
            <p>Selamat datang, {user.displayName || "Admin"}</p>
          </div>

          <div style={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} style={styles.statCard}>
                <div style={{ ...styles.statIcon, backgroundColor: s.color + "22" }}>
                  <span>{s.icon}</span>
                </div>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statCount}>0</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    padding: "24px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    marginBottom: "24px",
  },
  headerH2: {
    fontSize: "22px",
    margin: 0,
  },
  headerP: {
    color: "#666",
    margin: "4px 0 0 0",
    fontSize: "14px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  statIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "12px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },
  statCount: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
};
