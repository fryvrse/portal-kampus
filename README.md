# 🎓 Portal Kampus Fiktif (LMS & Academic Portal)

Aplikasi web Full-Stack modern yang menggabungkan fitur **Learning Management System (LMS)** dan **Portal Akademik** perguruan tinggi, lengkap dengan simulasi **Role-Based Access Control (RBAC)** untuk 3 peran: **Admin**, **Dosen**, dan **Mahasiswa**.

> **⚠️ PENTING - KEBIJAKAN DATA 100% SINTETIS:**  
> Seluruh identitas pengguna (nama, email, NIP, NIDN, NIM), institusi (*Universitas Nusantara Digital*), nilai, nomor telepon, dan data mata kuliah adalah **100% data fiktif / sintetis**. Tidak ada keterkaitan dengan entitas dunia nyata manapun.

---

## 🌟 Fitur Utama

### 1. 🔄 Role-Based Access Control (RBAC) & Quick Switch Demo
- **Demo Quick Switch Bar**: Pindah role instan dengan 1-klik antara **Admin**, **Dosen**, atau **Mahasiswa** tanpa perlu ketik kredensial login manual.
- **Account Switcher Dropdown**: Penguji dapat beralih antar individu civitas akademika demo.
- **Reset State Button**: Tombol reset untuk mengembalikan seluruh state ke konfigurasi awal seed data.

### 2. 🛡️ Peran ADMIN
- **Statistik Kampus Real-Time**: Ringkasan jumlah total mahasiswa terdaftar, dosen pengampu, dan mata kuliah aktif.
- **Manajemen Akun (CRUD User)**: Tambah pengguna baru, ubah peran (Admin / Dosen / Mahasiswa), ubah data prodi/identitas, dan hapus akun.
- **Pencarian & Filter Cepat**: Filter akun berdasarkan peran dan kata kunci pencarian.

### 3. 👨‍🏫 Peran DOSEN
- **Manajemen Kelas Pengampu**: Daftar mata kuliah yang diampu beserta jadwal, ruangan, dan total mahasiswa.
- **Evaluasi & Penilaian Tugas Mahasiswa**: 
  - Memeriksa unggahan berkas atau tautan repositori tugas mahasiswa.
  - Memberikan nilai angka (0 - 100).
  - Memberikan koreksi/umpan balik (*feedback*) konstruktif.
- **Pembuatan Penugasan Baru**: Terbitkan tugas baru dengan deadline dan kriteria nilai maksimal.

### 4. 👨‍🎓 Peran MAHASISWA
- **Dashboard Ringkasan Mahasiswa**: Indikator IPK, tugas yang perlu segera dikumpulkan, dan mata kuliah aktif.
- **Modul Pengumpulan Tugas**: Form pengumpulan tugas mandiri (simulasi upload berkas PDF/ZIP dan input link repositori git).
- **Kartu Hasil Studi (KHS) / Transkrip**: Tampilan visual nilai mata kuliah per semester, bobot mutu, SKS, perhitungan IPK, status kelulusan, serta tombol cetak.

### 5. 💬 Forum Diskusi Interaktif
- Thread diskusi per mata kuliah.
- Kolaborasi tanya jawab langsung antara Dosen dan Mahasiswa dengan tanda peran terverifikasi.
- Buat thread diskusi topik baru atau kirim tanggapan/komentar.

---

## 🛠️ Tech Stack

- **Frontend & Backend Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS, Modern Glassmorphism & Micro-animations
- **Icons**: Lucide React
- **Visual Feedback**: Canvas Confetti
- **State & Data Store**: In-Memory State dengan sinkronisasi `localStorage` (siap dijalankan langsung tanpa instalasi database luar seperti PostgreSQL/MySQL yang rumit).

---

## 📋 Data Seed Awal (Default Demo Accounts)

| Peran | Nama Fiktif | Email Fiktif | Identitas (NIM/NIDN/NIP) |
|---|---|---|---|
| **ADMIN** | Ir. Hendra Pratama, M.Kom | `admin@fiktif-univ.ac.id` | NIP. 198503142010121001 |
| **DOSEN** | Dr. Budi Santoso, S.T., M.T. | `dosen.budi@fiktif-univ.ac.id` | NIDN. 0415068201 |
| **DOSEN** | Siti Aminah, S.Kom., M.Cs. | `dosen.siti@fiktif-univ.ac.id` | NIDN. 0422088502 |
| **MAHASISWA** | Ahmad Faiz Al-Fathir | `faiz.ahmad@fiktif-univ.ac.id` | NIM. 220101901 |
| **MAHASISWA** | Nadia Rahmawati | `nadia.rahma@fiktif-univ.ac.id` | NIM. 220101902 |
| **MAHASISWA** | Dimas Aditya Nugraha | `dimas.aditya@fiktif-univ.ac.id` | NIM. 220101903 |
| **MAHASISWA** | Clara Aurelia Wijaya | `clara.aurelia@fiktif-univ.ac.id` | NIM. 220101904 |

---

## 🚀 Panduan Menjalankan Proyek

### 1. Masuk ke Direktori Proyek
```bash
cd portal-kampus
```

### 2. Instalasi Dependensi (Jika belum diinstal)
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```

Buka peramban (browser) di:  
👉 **[http://localhost:3000](http://localhost:3000)**

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```
