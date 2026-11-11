// src/app/packages/page.tsx
// Halaman Penerimaan Paket

"use client";

import { useState, useEffect } from "react";

interface Package {
  id: number;
  name: string;
  package_type: string;
  address: string;
  phone: string;
  notes: string;
  status: string;
  created_at: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    package_type: "",
    address: "",
    phone: "",
    notes: "",
    status: "pending",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      if (res.ok) {
        setPackages(data.data || []);
      } else {
        alert(data.message || "Gagal mengambil data");
      }
    } catch (err) {
      alert("Gagal terkoneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Data tersimpan");
        setFormData({ name: "", package_type: "", address: "", phone: "", notes: "", status: "pending" });
        setPackages([data.data, ...packages]);
      } else {
        alert(data.message || "Gagal menyimpan data");
      }
    } catch (err) {
      alert("Gagal terkoneksi ke server");
    }
  };

  return (
    <div style={styles.container}>
      <Header title="Penerimaan Paket" />
      <div style={styles.content}>
        <div style={styles.formCard}>
          <h2>Tambah Penerimaan Paket</h2>
          {message && <div style={{ color: "green", marginBottom: "12px" }}>{message}</div>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Nama Penerima</label>
                <input name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Tipe Paket</label>
                <input name="package_type" value={formData.package_type} onChange={handleChange} style={styles.input} required />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Alamat Tujuan</label>
                <input name="address" value={formData.address} onChange={handleChange} style={styles.input} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Telepon</label>
                <input name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Catatan</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} style={styles.textarea} />
            </div>
            <button type="submit" style={styles.submitBtn}>Simpan</button>
          </form>
        </div>

        <div style={styles.listCard}>
          <h2>Data Penerimaan Paket</h2>
          {loading ? (
            <p>Memuat...</p>
          ) : packages.length === 0 ? (
            <p>Belum ada data</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tipe</th>
                  <th>Alamat</th>
                  <th>Telepon</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.package_type}</td>
                    <td>{p.address}</td>
                    <td>{p.phone}</td>
                    <td>{p.status}</td>
                    <td>{new Date(p.created_at).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <header style={{
      padding: "12px 20px",
      backgroundColor: "#1a237e",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <h1 style={{ margin: 0, fontSize: "18px" }}>{title}</h1>
      <button onClick={() => window.location.href = "/dashboard"} style={{
        background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "14px",
      }}>← Kembali</button>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "24px",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  field: {
    flex: 1,
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    height: "100px",
    outline: "none",
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#1a237e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableTh: {
    backgroundColor: "#1a237e",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },
  tableTd: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};
