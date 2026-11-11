-- ===========================================
-- APHCC Security Apps - Database Schema
-- Sertakan di Neon Dashboard > SQL Editor
-- ===========================================

-- Tabel Penerimaan Paket
CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  package_type TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'delivered')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Penitipan Kunci
CREATE TABLE IF NOT EXISTS keys (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  key_type TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'in' CHECK (status IN ('in', 'returned')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Pendaftaran Tamu
CREATE TABLE IF NOT EXISTS guests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  expected_by TEXT DEFAULT '',
  arrival_time TEXT DEFAULT '',
  departure_time TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Pengecekan Kendaraan Parkir
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  plate_number TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  parking_type TEXT DEFAULT 'parkir umum',
  entry_time TEXT DEFAULT '',
  exit_time TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'parked' CHECK (status IN ('parked', 'exited')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);

-- Seed: contoh data (opsional, hapus kalau tidak perlu)
-- INSERT INTO packages (name, package_type, address, phone, status) VALUES
--   ('Budi', 'Barang Dinding', 'Jl. Merdeka No. 12', '08123456789', 'received');

-- INSERT INTO guests (name, address, phone, expected_by, arrival_time, status) VALUES
--   ('Ibu Sari', 'Jl. Melati No. 45', '08234567890', 'Ayah Kurniawan', '09:00', 'registered');

-- INSERT INTO vehicles (plate_number, vehicle_type, owner_name, entry_time, status) VALUES
--   ('B 1234 XYZ', 'Mobil', 'PT Astra', '08:30', 'parked');

-- Tabel: Contoh user admin untuk Firebase Auth
-- Tidak disimpan di Neon, tetap di Firebase Console
