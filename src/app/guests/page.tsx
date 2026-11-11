// src/app/guests/page.tsx
// Halaman Pendaftaran Tamu

"use client";

import { useState, useEffect } from "react";

interface Guest {
  id: number;
  name: string;
  address: string;
  phone: string;
  expected_by: string;
  arrival_time: string;
  departure_time: string;
  notes: string;
  status: string;
  created_at: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    expected_by: "",
    arrival_time: "",
    departure_time: "",
    notes: "",
    status: "registered",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/guests");
      const data = await res.json();
      if (res.ok) {
        setGuests(data.data || []);
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
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Data tersimpan");
        setFormData({ name: "", address: "", phone: "", expected_by: "", arrival_time: "", departure_time: "", notes: "", status: "registered" });
        setGuests([data.data, ...guests]);
      } else {
        alert(data.message || "Gagal menyimpan data");
      }
    } catch (err) {
      alert("Gagal terkoneksi ke server");
    }
  };

  return (
    <div style={styles.container}>
      <Header title="Pendaftaran Tamu" />
      <div style={styles.content}>
        <div style={styles.formCard}>
          <h2>Tambah Pendaftaran Tamu</h2>
          {message && <div style={{ color: "green", marginBottom: "12px" }}>{message}</div>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Nama Tamu</label>
                <input name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Dikawati Oleh</label>
                <input name="expected_by" value={formData.expected_by} onChange={handleChange} style={styles.input} />
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
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Waktu Datang</label>
                <input name="arrival_time" value={formData.arrival_time} onChange={handleChange} style={styles.input} placeholder="HH:MM (WIB)" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Waktu Pulang</label>
                <input name="departure_time" value={formData.departure_time} onChange={handleChange} style={styles.input} placeholder="HH:MM (WIB)" />
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
          <h2>Data Pendaftaran Tamu</h2>
          {loading ? (
            <p>Memuat...</p>
          ) : guests.length === 0 ? (
            <p>Belum ada data</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Dikawati</th>
                  <th>Alamat</th>
                  <th>Telepon</th>
                  <th>Datang</th>
                  <th>Pulang</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g) => (
                  <tr key={g.id}>
                    <td>{g.name}</td>
                    <td>{g.expected_by}</td>
                    <td>{g.address}</td>
                    <td>{g.phone}</td>
                    <td>{g.arrival_time}</td>
                    <td>{g.departure_time}</td>
                    <td>{g.status}</td>
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
      backgroundColor: "#2e7d32",
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
    backgroundColor: "#2e7d32",
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
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },
  tableTd: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};
