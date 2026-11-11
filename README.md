# APHCC Security Apps

Aplikasi web untuk keamanan & penerimaan pengunjung **Security Aston Palembang**.

## Fitur
- 🔐 Login admin (Firebase Auth + email/password)
- 📦 Penerimaan Paket
- 🔑 Penitipan Kunci
- 🙋 Pendaftaran Tamu
- 🚗 Pengecekan Kendaraan Parkir
- 💾 Data tersimpan di Neon (PostgreSQL)

## Teknologi
| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js (React) |
| Auth | Firebase (Email/Password) |
| Database | Neon (PostgreSQL) |
| Deploy | Vercel |
| Code Host | GitHub |

## Cara Pakai (Untuk Pemula)

### 1. Buat Akun (10 menit)
- **GitHub**: https://github.com
- **Vercel**: https://vercel.com (login pakai GitHub)
- **Firebase**: https://console.firebase.google.com
- **Neon**: https://neon.tech (login pakai GitHub)

### 2. Siapkan Firebase (3 langkah)
1. Buka Firebase Console → **Create Project**
   - Nama: `aston-palembang-security`
2. Setelah created, klik project → **Settings** (roda gigi di pojok kanan atas)
3. Di bagian **Your apps**, klik **</>** (Web)
   - Nickname: `app-web`
   - Klik **Register app**
   - Salin **Firebase config** (API key, authDomain, projectId, dll)

### 3. Siapkan Neon (3 langkah)
1. Buka Neon → **New Project**
   - Name: `aston-db`
2. Setelah created, klik project → **Connection String**
3. Salin **Connection String** (format: `postgres://...`)

### 4. Siapkan .env.local
1. Di folder project, buat file `.env.local`
2. Isi dengan isian berikut:

```env
# Firebase (dari Firebase Console > Settings > Your apps > Config)
NEXT_PUBLIC_FIREBASE_API_KEY=api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=app-id

# Neon Database (dari Neon > Connection String)
NEXT_PUBLIC_NEON_DATABASE_URL=postgres://...
```

### 5. Install & Jalankan Lokal
```bash
# Masuk ke folder project
cd APHCC-Security-Apps

# Install dependencies
npm install

# Jalankan di local (port 3000)
npm run dev
```

Buka: http://localhost:3000

### 6. Buat Akun Admin di Firebase
1. Buka Firebase Console → **Authentication** → **Users**
2. Klik **Add user**
3. Isi: Email (contoh: admin@aston.com) + Password
4. Klik **Add user**
5. (Opsional) Isi Display Name: `Security Admin`

### 7. Deploy ke Vercel (3 langkah)
1. Buat repository GitHub di https://github.com/new
   - Repository name: `APHCC-Security-Apps`
   - Klik **Create repository**
2. Upload kode ke GitHub (atau push dari lokal)
3. Buka Vercel → **New Project**
   - Import GitHub repository
   - Settings environment variables (ambil dari .env.local)
4. Klik **Deploy**

### 8. Cek website
Setelah deployed, Vercel akan kasih URL. Biasanya:
`https://aston-palembang-security.vercel.app`

## Cara Ngecek Data
- Buka website, login dengan email admin
- Data langsung tersimpan di Neon Database
- Cek di Neon Dashboard → **Data** tab

## Cara Reset Database
1. Buka Neon Dashboard
2. Pilih project `aston-db`
3. Klik **Data** → tabel kiri
4. Klik **...** → **Truncate** (hanya untuk testing!)

## Catatan Keamanan
- Jangan pernah share `.env.local` atau Firebase config
- Jangan pernah commit file `.env`
- Backup database hati-hati
- Ubah password admin secara berkala

## Struktur Folder
```
APHCC-Security-Apps/
├── src/
│   ├── app/
│   │   ├── api/          # API routes (login, data)
│   │   ├── dashboard/    # Dashboard utama
│   │   ├── login/        # Halaman login
│   │   ├── packages/     # Penerimaan paket
│   │   ├── keys/         # Penitipan kunci
│   │   ├── guests/       # Pendaftaran tamu
│   │   ├── vehicles/     # Kendaraan parkir
│   │   └── layout.tsx    # Root layout
│   ├── components/       # UI components
│   ├── lib/              # Firebase + DB helpers
│   └── firebase/         # Firebase config
├── db/
│   └── schema.sql        # SQL schema (jika mau import manual)
├── .env.example          # Contoh environment variables
└── .gitignore            # File yang di-ignore git
```

## Troubleshooting
**Gagal login?**
- Pastikan akun admin sudah dibuat di Firebase Auth
- Pastikan password cocok (case-sensitive)
- Cek Firebase project ID di .env.local

**Gagal connect ke DB?**
- Cek Neon connection string
- Pastikan database sudah aktif
- Pastikan `NEXT_PUBLIC_NEON_DATABASE_URL` di .env.local

**Deploy gagal?**
- Cek .env.local di Vercel (variabel harus sama)
- Cek console Vercel untuk error
- Pastikan package.json benar

## Contact
For support, please contact the project owner.
