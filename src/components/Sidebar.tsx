// src/components/Sidebar.tsx
// Sidebar navigasi fitur

"use client";

import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Beranda", icon: "📋", path: "/dashboard" },
  { name: "Penerimaan Paket", icon: "📦", path: "/packages" },
  { name: "Penitipan Kunci", icon: "🔑", path: "/keys" },
  { name: "Pendaftaran Tamu", icon: "🙋", path: "/guests" },
  { name: "Kendaraan Parkir", icon: "🚗", path: "/vehicles" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              style={
                pathname === item.path
                  ? styles.activeLink
                  : { ...styles.link, color: "#555" }
              }
            >
              <span style={styles.icon}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: "200px",
    backgroundColor: "#e8eaf6",
    padding: "20px 0",
    borderRight: "1px solid #ccc",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 20px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  activeLink: {
    backgroundColor: "#1a237e",
    color: "#fff",
  },
  icon: {
    fontSize: "20px",
  },
};
