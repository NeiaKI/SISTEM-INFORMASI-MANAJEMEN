# SIM Tugas Frontend

Frontend-only prototype untuk **Sistem Manajemen Tugas & Proyek Kuliah** yang ditulis ulang menggunakan **Next.js App Router** dan **Tailwind CSS**.

## Menjalankan

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:3000`.

## Cakupan

- Landing + login demo
- Preview lintas peran: mahasiswa, dosen, admin kampus, staff TU
- Modul: dashboard, tugas, proyek, kelompok, kalender, laporan, notifikasi, administrasi, pengaturan
- Data dan interaksi masih **frontend-only** dengan state lokal

## Struktur

- `app/` : entry Next.js App Router
- `components/` : komponen UI utama
- `data/` : seed data dan konfigurasi tampilan
- `prd-sim-tugas.md` : sumber requirement produk
