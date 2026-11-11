// src/app/login/page.tsx
// Halaman Login Admin - client component

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "../../firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await result.user.getIdToken();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, idToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        setLoading(false);
        return;
      }

      // Simpan token & user info di localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("auth_token", data.token || "");

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.code === "auth/invalid-credential"
        ? "Email atau password salah"
        : err.message || "Gagal terkoneksi ke server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <h1>APHCC Security</h1>
          <p>Security Pantauan Aston Palembang</p>
        </div>

        {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password admin"
              style={styles.input}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <p style={styles.hint}>
          * Ganti password melalui Firebase Console &gt; Authentication &gt; Users
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  logo: {
    textAlign: "center",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
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
  submitBtn: {
    padding: "12px",
    backgroundColor: "#1a237e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  hint: {
    marginTop: "16px",
    fontSize: "12px",
    color: "#999",
    textAlign: "center",
  },
};
