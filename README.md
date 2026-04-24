# SIM Tugas — Sistem Informasi Manajemen Tugas & Proyek Kuliah

Aplikasi web manajemen tugas dan proyek perkuliahan untuk mahasiswa dan dosen, dibangun dengan Next.js 15 App Router + React 19 + Tailwind CSS v4.

---

## Fitur Utama

### Mahasiswa
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan tugas aktif, deadline mendekat, dan progres semester |
| **Tugas** | Daftar tugas per mata kuliah dengan status, prioritas, dan filter deadline |
| **Proyek** | Manajemen proyek kelompok beserta detail aktivitas dan deliverable |
| **Kelompok** | Lihat anggota kelompok, peran, dan info ketua |
| **Kalender** | Tampilan kalender deadline tugas dan milestone proyek |
| **Laporan** | Statistik progres personal per mata kuliah |
| **Notifikasi** | Reminder deadline dan update tugas |

### Dosen
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Overview kelas, tugas aktif, dan progres mahasiswa |
| **Mata Kuliah** | Daftar mata kuliah yang diampu; klik untuk lihat submission tracker per tugas dan status tiap mahasiswa |
| **Tugas** | Buat, edit, dan kelola tugas; status otomatis (Baru Dibuka / Berjalan / Selesai) berdasarkan waktu terbit dan aksi Tutup/Buka Kembali |
| **Kelompok** | Buat kelompok manual atau acak otomatis; edit anggota dan ukuran kelompok |
| **Mahasiswa** | Data mahasiswa per mata kuliah dengan tabel nilai dan status keaktifan |
| **Rekap** | Laporan rekapitulasi nilai dan progres kelas |
| **Laporan** | Statistik dan insight per mata kuliah |
| **Notifikasi** | Kirim reminder ke mahasiswa |

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 (CSS-first config di `app/globals.css`) |
| Komponen | shadcn/ui (Radix UI primitives) |
| Language | TypeScript |
| State | `useState` / `localStorage` (no backend) |
| Icons | Lucide React |

> Saat ini aplikasi berjalan sebagai **frontend-only prototype** — semua data bersifat mock dan disimpan di `localStorage`. Tidak ada database atau API nyata.

---

## Struktur Direktori

```
app/
├── auth/login/         # Halaman login (pilih role mahasiswa/dosen)
├── mahasiswa/          # Dashboard & modul mahasiswa
│   ├── tugas/
│   ├── proyek/
│   ├── kelompok/
│   ├── kalender/
│   ├── laporan/
│   └── notifikasi/
└── dosen/              # Dashboard & modul dosen
    ├── matakuliah/
    ├── tugas/
    ├── kelompok/
    ├── mahasiswa/
    ├── rekap/
    ├── laporan/
    └── notifikasi/

components/
├── ui/                 # shadcn/ui primitives
└── task-detail-panel   # Modal detail tugas mahasiswa

lib/
├── search-context.tsx  # Context pencarian global (topbar)
├── students-data.ts    # Data mock mahasiswa
└── kelompokStore.ts    # Store kelompok

data/
└── sim-data.ts         # Semua mock data dan konstanta
```

---

## Menjalankan Proyek

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start
```

---

## Role & Akses

Login di `/auth/login` — pilih role untuk masuk ke dashboard yang sesuai:

- **Mahasiswa** — tema amber/teal, akses ke modul tugas dan proyek pribadi
- **Dosen** — tema forest/gold on cream, akses ke manajemen kelas dan penilaian

Tidak ada autentikasi nyata; semua state bersifat lokal.

---

## Rencana Pengembangan

- [ ] Backend & database (Next.js API Routes + PostgreSQL/Prisma)
- [ ] Autentikasi nyata (NextAuth.js / JWT)
- [ ] Integrasi SIAKAD untuk impor data mahasiswa & mata kuliah
- [ ] Notifikasi email dan Telegram bot
- [ ] Integrasi LMS kampus
- [ ] Mobile-responsive layout yang dioptimalkan
