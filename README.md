# SIM Tugas — Sistem Informasi Manajemen Tugas & Proyek Kuliah

Aplikasi web manajemen tugas dan proyek perkuliahan untuk mahasiswa, dosen, admin, dan staff TU — dibangun dengan Next.js 15 App Router + React 19 + Tailwind CSS v4.

---

## Fitur Utama

### Mahasiswa
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan tugas aktif, deadline mendekat, dan progres semester |
| **Tugas** | Daftar tugas per mata kuliah dengan status, prioritas, dan filter deadline |
| **Proyek** | Manajemen proyek kelompok beserta detail aktivitas dan deliverable |
| **Kelompok** | Lihat anggota kelompok, peran, dan info ketua |
| **Participant** | Manajemen peserta kelompok |
| **Kalender** | Tampilan kalender deadline tugas dan milestone proyek |
| **Laporan** | Statistik progres personal per mata kuliah |
| **Log Aktivitas** | Riwayat aktivitas tugas dan proyek |
| **Notifikasi** | Reminder deadline dan update tugas |

### Dosen
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Overview kelas, tugas aktif, dan progres mahasiswa |
| **Mata Kuliah** | Daftar mata kuliah yang diampu; klik untuk lihat submission tracker per tugas |
| **Tugas** | Buat, edit, dan kelola tugas; status otomatis berdasarkan waktu terbit dan aksi Tutup/Buka Kembali |
| **Kelompok** | Buat kelompok manual atau acak otomatis; edit anggota dan ukuran kelompok |
| **Mahasiswa** | Data mahasiswa per mata kuliah dengan tabel nilai dan status keaktifan |
| **Rekap** | Laporan rekapitulasi nilai dan progres kelas |
| **Laporan** | Statistik dan insight per mata kuliah |
| **Log Aktivitas** | Riwayat aktivitas pengelolaan tugas |
| **Notifikasi** | Kirim reminder ke mahasiswa |

### Admin
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Overview seluruh aktivitas sistem |
| **Tugas** | Pantau dan kelola semua tugas di seluruh mata kuliah |
| **Laporan** | Laporan agregat seluruh program studi |
| **Notifikasi** | Kelola notifikasi sistem |

### Staff TU
| Modul | Deskripsi |
|---|---|
| **Dashboard** | Overview administrasi akademik |
| **Tugas** | Pantau tugas yang memerlukan tindakan administratif |
| **Laporan** | Laporan administratif dan rekap data |
| **Notifikasi** | Notifikasi urusan tata usaha |

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

> Saat ini aplikasi berjalan sebagai **frontend-only prototype** — semua data bersifat mock. Tidak ada database atau API nyata.

---

## Struktur Direktori

```
app/
├── auth/login/         # Halaman login (pilih role)
├── mahasiswa/          # Dashboard & modul mahasiswa
│   ├── tugas/
│   ├── proyek/
│   ├── kelompok/
│   ├── participant/
│   ├── kalender/
│   ├── laporan/
│   ├── log/
│   └── notifikasi/
├── dosen/              # Dashboard & modul dosen
│   ├── matakuliah/
│   ├── tugas/
│   ├── kelompok/
│   ├── mahasiswa/
│   ├── rekap/
│   ├── laporan/
│   ├── log/
│   └── notifikasi/
├── admin/              # Dashboard & modul admin
│   ├── tugas/
│   ├── laporan/
│   └── notifikasi/
└── staff-tu/           # Dashboard & modul staff TU
    ├── tugas/
    ├── laporan/
    └── notifikasi/

components/
├── ui/                 # shadcn/ui primitives
├── empty-state.tsx     # Komponen state kosong
├── task-detail-panel   # Modal detail tugas mahasiswa
└── theme-provider.tsx  # Dark/light mode provider

lib/
├── taskStore.ts        # Store state tugas
├── kelompokStore.ts    # Store state kelompok
├── notifStore.ts       # Store state notifikasi
├── activityLog.ts      # Helper log aktivitas
├── exportUtils.ts      # Utilitas ekspor/download
├── search-context.tsx  # Context pencarian global
└── students-data.ts    # Data mock mahasiswa

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

| Role | Tema | Akses |
|---|---|---|
| **Mahasiswa** | Amber/Teal | Tugas, proyek, dan aktivitas pribadi |
| **Dosen** | Forest/Gold | Manajemen kelas, tugas, dan penilaian |
| **Admin** | `adm-*` | Pantau seluruh sistem dan laporan agregat |
| **Staff TU** | `stu-*` | Administrasi akademik dan laporan TU |

Tidak ada autentikasi nyata; semua state bersifat lokal.

---

## Rencana Pengembangan

- [ ] Backend & database (Next.js API Routes + PostgreSQL/Prisma)
- [ ] Autentikasi nyata (NextAuth.js / JWT)
- [ ] Integrasi SIAKAD untuk impor data mahasiswa & mata kuliah
- [ ] Notifikasi email dan Telegram bot
- [ ] Integrasi LMS kampus
- [ ] Mobile-responsive layout yang dioptimalkan
