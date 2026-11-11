// src/app/vehicles/page.tsx
// Halaman Pengecekan Kendaraan Parkir

"use client";

import { useState, useEffect } from "react";

interface Vehicle {
  id: number;
  plate_number: string;
  vehicle_type: string;
  owner_name: string;
  parking_type: string;
  entry_time: string;
  exit_time: string;
  notes: string;
  status: string;
  created_at: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    plate_number: "",
    vehicle_type: "",
    owner_name: "",
    parking_type: "parkir umum",
    entry_time: "",
    exit_time: "",
    notes: "",
    status: "parked",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      if (res.ok) {
        setVehicles(data.data || []);
      } else {
        alert(data.message || "Gagal mengambil data");
      }
    } catch (err) {
      alert("Gagal terkoneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Data tersimpan");
        setFormData({
          plate_number: "",
          vehicle_type: "",
          owner_name: "",
          parking_type: "parkir umum",
          entry_time: "",
          exit_time: "",
          notes: "",
          status: "parked",
        });
        setVehicles([data.data, ...vehicles]);
      } else {
        alert(data.message || "Gagal menyimpan data");
      }
    } catch (err) {
      alert("Gagal terkoneksi ke server");
    }
  };

  return (
    <div style={styles.container}>
      <Header title="Pengecekan Kendaraan Parkir" />
      <div style={styles.content}>
        <div style={styles.formCard}>
          <h2>Tambah Pengecekan Kendaraan</h2>
          {message && <div style={{ color: "green", marginBottom: "12px" }}>{message}</div>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Nomor Plat</label>
                <input name="plate_number" value={formData.plate_number} onChange={handleChange} style={styles.input} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Tipe Kendaraan</label>
                <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} style={styles.input} required>
                  <option value="">Pilih tipe</option>
                  <option value="Mobil">Mobil</option>
                  <option value="Motor">Motor</option>
                  <option value="Truk">Truk</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Nama Pemilik / Layanan</label>
                <input name="owner_name" value={formData.owner_name} onChange={handleChange} style={styles.input} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Jenis Parkir</label>
                <select name="parking_type" value={formData.parking_type} onChange={handleChange} style={styles.input}>
                  <option value="Parkir Umum">Parkir Umum</option>
                  <option value="Parkir Internal">Parkir Internal</option>
                  <option value="Parkir Eksternal">Parkir Eksternal</option>
                </select>
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Waktu Masuk</label>
                <input name="entry_time" value={formData.entry_time} onChange={handleChange} style={styles.input} placeholder="HH:MM (WIB)" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Waktu Keluar</label>
                <input name="exit_time" value={formData.exit_time} onChange={handleChange} style={styles.input} placeholder="HH:MM (WIB)" />
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
          <h2>Data Kendaraan Parkir</h2>
          {loading ? (
            <p>Memuat...</p>
          ) : vehicles.length === 0 ? (
            <p>Belum ada data</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Nomor Plat</th>
                  <th>Tipe</th>
                  <th>Pemilik</th>
                  <th>Jenis Parkir</th>
                  <th>Masuk</th>
                  <th>Keluar</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>{v.plate_number}</td>
                    <td>{v.vehicle_type}</td>
                    <td>{v.owner_name}</td>
                    <td>{v.parking_type}</td>
                    <td>{v.entry_time}</td>
                    <td>{v.exit_time}</td>
                    <td>{v.status}</td>
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
      backgroundColor: "#0277bd",
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
    backgroundColor: "#0277bd",
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
    backgroundColor: "#0277bd",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },
  tableTd: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};
