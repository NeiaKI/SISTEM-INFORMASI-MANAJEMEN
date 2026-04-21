# PRD Sistem Manajemen Tugas & Proyek Kuliah (Revisi)

## 1. Ringkasan Produk

Sistem Manajemen Tugas & Proyek Kuliah (selanjutnya disebut "SIM Tugas") adalah aplikasi web yang membantu mahasiswa, dosen, admin kampus, dan staff TU mengelola seluruh tugas, proyek, dan aktivitas perkuliahan secara terstruktur, terpantau, dan tepat waktu.

Fokus utama sistem adalah pemantauan deadline, prioritas, dan progres pengerjaan, serta penyajian insight sederhana melalui dashboard dan laporan untuk mendukung pengambilan keputusan belajar dan pengelolaan kelas.

## 2. Tujuan dan Sasaran Produk

### 2.1 Tujuan Utama

- Membantu mahasiswa mengelola semua tugas dan proyek kuliah agar tidak terlambat, lebih terstruktur, dan terpantau progresnya.
- Menyediakan informasi yang jelas dan hampir real-time tentang prioritas tugas, status pengerjaan, dan beban kerja per minggu untuk mendukung pengambilan keputusan (tugas mana yang dikerjakan dulu).
- Menyediakan alat pelaporan sederhana bagi mahasiswa, dosen, admin, dan staff TU untuk melihat ringkasan performa, keterlambatan, dan progres per mata kuliah.

### 2.2 Sasaran Khusus

- Menurunkan jumlah tugas/proyek yang lewat deadline per mahasiswa per semester.
- Meningkatkan persentase tugas yang diselesaikan sebelum H-1 deadline.
- Meningkatkan keteraturan aktivitas (lebih sering update status dan progres tugas).
- Menyediakan laporan yang dapat dimanfaatkan dosen dan pihak administrasi untuk monitoring keterlibatan mahasiswa dalam tugas/proyek.

## 3. Pemangku Kepentingan dan Peran Pengguna

### 3.1 Mahasiswa

- Pengguna utama untuk input tugas, update status, mengelola jadwal kerja, dan melihat dashboard progres individual.
- Kebutuhan utama: tidak ketinggalan deadline, mengetahui prioritas, dan memantau progres tugas/proyek.

### 3.2 Dosen

- Pemberi tugas/proyek dan (opsional) reviewer progres.
- Kebutuhan utama: memasukkan/menyetujui daftar tugas per mata kuliah, memantau penyelesaian tugas oleh mahasiswa atau kelompok, dan mengakses laporan ringkasan per kelas/mata kuliah.

### 3.3 Admin Kampus

- Mengelola data dasar (daftar mahasiswa, mata kuliah, KRS), mengatur konfigurasi umum sistem, serta mengelola integrasi dengan SIAKAD, LMS kampus, dan email server.
- Kebutuhan utama: memastikan data konsisten, mengelola hak akses, dan menjaga kelancaran operasional sistem.

### 3.4 Staff TU

- Operator administrasi akademik yang membantu admin kampus dan program studi.
- Tugas utama:
  - Mengimpor data mahasiswa, mata kuliah, dan KRS dari SIAKAD.
  - Mengelola daftar kelas/mata kuliah setiap semester.
  - Membantu reset akun dan pembaruan data dasar jika diperlukan.

## 4. Ruang Lingkup Produk

### 4.1 Dalam Ruang Lingkup (In-Scope)

- Manajemen akun dan autentikasi dasar untuk mahasiswa, dosen, admin kampus, dan staff TU.
- Pengelolaan data mahasiswa, dosen, mata kuliah yang diambil, dan relasi pengambilan mata kuliah per semester.
- Manajemen tugas dan proyek (individu dan kelompok) beserta detail aktivitas/deliverable.
- Manajemen kelompok dan anggota kelompok (termasuk peran/jobdesk).
- Penjadwalan dan kalender deadline tugas/proyek serta jadwal kerja yang disarankan (versi minimal/opsional).
- Notifikasi dan reminder deadline melalui antarmuka aplikasi, email, dan Telegram.
- Laporan dan statistik sederhana (per mahasiswa, per mata kuliah, dan per kelas).
- Integrasi data dengan SIAKAD, LMS kampus, dan email server.

### 4.2 Di Luar Ruang Lingkup (Out-of-Scope) Tahap Awal

- Integrasi penuh dan dua arah dengan LMS kampus (selain impor manual/sederhana).
- Fitur penilaian (grading) lengkap atau sinkronisasi nilai resmi ke sistem akademik kampus.
- Mobile app native (Android/iOS); tahap awal fokus pada web responsive.
- Fitur gamifikasi kompleks (badge, leaderboard).
- Notifikasi melalui WhatsApp dan SMS (dapat menjadi pengembangan lanjutan).

## 5. Asumsi dan Batasan

- Data mahasiswa dan mata kuliah dapat diinput manual atau diimpor (misal dari file Excel) oleh admin/staff TU dari SIAKAD.
- Sistem akan digunakan melalui browser modern pada desktop dan perangkat mobile (layout responsive).
- Notifikasi email dikirim menggunakan email server kampus atau layanan email pihak ketiga yang terintegrasi.
- Integrasi Telegram menggunakan bot resmi; pengguna perlu menghubungkan akun Telegram mereka ke akun SIM Tugas.

## 6. Rancangan IPO (Input–Process–Output)

### 6.1 Input

- **Data tugas**: nama tugas, mata kuliah, jenis (individu/kelompok), deskripsi singkat, tanggal diberikan, deadline, bobot nilai (opsional).
- **Data proyek**: nama proyek, mata kuliah, fase/progress (perencanaan, desain, implementasi, presentasi), daftar deliverable, deadline tiap fase.
- **Data kelompok**: anggota kelompok (nama, NIM, kontak), peran/jobdesk masing-masing.
- **Data aktivitas**: status harian (belum mulai, sedang dikerjakan, menunggu review, selesai), catatan progres, file/link lampiran (misalnya Google Drive).
- **Data waktu luang mahasiswa (opsional)**: slot waktu harian/mingguan untuk penjadwalan otomatis.

### 6.2 Process

- Pengelompokan tugas dan proyek berdasarkan:
  - Mata kuliah.
  - Deadline terdekat.
  - Prioritas (gabungan antara deadline dan bobot nilai/tingkat kepentingan).
- Perhitungan progres:
  - Progres individu: persentase tugas yang sudah selesai dari total tugas aktif.
  - Progres per proyek: rata-rata progres tiap deliverable/jobdesk.
- Penjadwalan otomatis (opsional):
  - Menyusun jadwal kerja harian/mingguan berdasarkan daftar tugas, deadline, dan waktu luang yang diinput mahasiswa.
- Pengingat otomatis:
  - Menghasilkan daftar tugas yang mendekati deadline (misalnya H-7, H-3, H-1) untuk status "belum mulai" atau "sedang dikerjakan".
- Penyusunan laporan:
  - Merangkum tugas/proyek yang sudah selesai, yang terlambat, dan yang masih terbuka per rentang waktu (mingguan/bulanan/per mata kuliah).

### 6.3 Output

- **Dashboard ringkasan**:
  - Jumlah tugas aktif, tugas mendesak (deadline dekat), tugas lewat deadline.
  - Progres proyek-proyek besar dalam bentuk persen/bar progress.
- **Daftar tugas harian/mingguan**:
  - List tugas yang harus dikerjakan hari/pekan ini, lengkap dengan status dan prioritas.
- **Ringkasan tugas/proyek per mata kuliah**:
  - Semua tugas/proyek dalam satu mata kuliah beserta statusnya.
- **Laporan aktivitas**:
  - Laporan mingguan/bulanan berisi jumlah tugas selesai, jumlah terlambat, jam kerja (opsional, jika diinput), dengan opsi ekspor PDF/Excel.
- **Notifikasi/reminder**:
  - Notifikasi deadline via tampilan aplikasi, email, dan Telegram.

## 7. Rancangan Data (Entitas & Atribut Utama)

### 7.1 Entitas Utama

- **User**: `id_user`, `username`, `password_hash`, `role` (mahasiswa/dosen/admin/staff_tu), `last_login`.
- **Mahasiswa**: `id_mahasiswa`, `id_user`, `nama`, `NIM`, `email`, `no_hp`, `semester_aktif`.
- **Dosen**: `id_dosen`, `id_user`, `nama`, `email`, `no_hp` (opsional), `nidn` (opsional).
- **AdminKampus**: `id_admin`, `id_user`, `nama`, `email`.
- **StaffTU**: `id_staff`, `id_user`, `nama`, `email`, `unit`.
- **MataKuliah**: `id_mk`, `nama_mk`, `kode_mk` (opsional), `dosen_penanggung_jawab` (id_dosen), `semester`, `tahun_ajar`.
- **KRS/Enrollment**: `id_enrollment`, `id_mahasiswa`, `id_mk`, `semester`, `tahun_ajar`, `status` (aktif/drop).
- **Tugas**: `id_tugas`, `id_mk`, `judul_tugas`, `deskripsi`, `tanggal_diberikan`, `deadline`, `bobot_nilai` (opsional), `jenis` (individu/kelompok), `status_global` (aktif/selesai/ditutup), `tipe` (tugas rutin/proyek besar).
- **Proyek**: `id_proyek`, `id_mk`, `nama_proyek`, `deskripsi`, `tanggal_mulai`, `deadline_akhir`, `progres_proyek` (0–100).
- **Deliverable/TaskDetail**: `id_detail`, `id_tugas` atau `id_proyek`, `nama_aktivitas`, `penanggung_jawab` (id_mahasiswa atau id_kelompok), `status` (belum mulai/sedang dikerjakan/menunggu review/selesai), `deadline_khusus`, `persentase_bobot`.
- **Kelompok**: `id_kelompok`, `id_mk` atau `id_proyek`, `nama_kelompok`.
- **AnggotaKelompok**: `id_kelompok`, `id_mahasiswa`, `peran` (leader/notulis/presenter/dll.).
- **LogAktivitas**: `id_log`, `id_tugas` atau `id_proyek` atau `id_detail`, `id_mahasiswa`, `tanggal`, `catatan_progres`, `persen_progres`.
- **Lampiran**: `id_lampiran`, `id_tugas` atau `id_detail`, `id_mahasiswa`, `jenis` (file/link), `path_file` (untuk server lokal), `url` (untuk link eksternal), `keterangan`.
- **Notifikasi**: `id_notif`, `id_user`, `judul`, `pesan`, `jenis` (deadline, pengingat progres, info sistem), `waktu_kirim`, `status_baca`, `channel` (in-app/email/telegram).

### 7.2 Kebijakan Penyimpanan Lampiran

- **Default**: file yang diunggah disimpan di **server lokal** aplikasi (misalnya di storage server kampus).
- Sistem juga mengizinkan lampiran berupa **link saja** (Google Drive, GitHub, dsb.) tanpa mengunggah file.

## 8. Rancangan Modul/Menu Utama

### 8.1 Modul Autentikasi

- Mendukung beberapa metode autentikasi (dapat dikonfigurasi kampus):
  - Login **NIM + Password** (minimal viable untuk mahasiswa).
  - Login **Email Kampus + Password** untuk mahasiswa/dosen/admin/staff TU.
  - **SSO Kampus** (integrasi dengan sistem SSO/LDAP/SAML jika tersedia).[web:20]
  - **Google Login** (OAuth 2.0), terutama bila kampus menggunakan Google Workspace Edu.
- Fitur lupa password (reset via email kampus).
- Manajemen sesi dan logout.

### 8.2 Modul Data Dasar

- Pengelolaan profil mahasiswa, dosen, admin kampus, dan staff TU.
- Pengelolaan daftar mata kuliah dan relasinya dengan dosen.
- Pengelolaan daftar mata kuliah yang diambil mahasiswa semester ini:
  - Input manual oleh mahasiswa.
  - Atau impor oleh admin/staff TU dari SIAKAD (file Excel/API).

### 8.3 Modul Manajemen Tugas

- Input tugas baru:
  - Oleh dosen (tugas resmi mata kuliah, otomatis muncul di semua mahasiswa yang terdaftar di mata kuliah tersebut).
  - Oleh mahasiswa (tugas personal/catatan belajar sendiri).
- Field minimal: judul, mata kuliah, jenis, deskripsi singkat, tanggal diberikan, deadline, bobot nilai (opsional).
- Edit/hapus tugas (dengan pembatasan hak akses).
- Ubah status tugas (belum mulai, sedang dikerjakan, menunggu review, selesai).
- Tambah catatan progres dan log aktivitas.
- Unggah lampiran (file ke server lokal) atau tambahkan link eksternal.
- Penandaan prioritas otomatis (berdasarkan kombinasi kedekatan deadline dan bobot tugas).

### 8.4 Modul Manajemen Proyek

- Pembuatan proyek baru oleh dosen atau mahasiswa (misalnya untuk tugas besar satu mata kuliah).
- Pembagian proyek menjadi fase/deliverable.
- Penetapan kelompok dan anggota.
- Penetapan jobdesk/aktivitas detail kepada anggota tertentu.
- Pemantauan progres per fase/deliverable dan progres proyek agregat.

### 8.5 Modul Kelompok

- Pendataan kelompok per mata kuliah/proyek.
- **Mode pembentukan kelompok yang didukung:**
  - **Manual Input oleh Mahasiswa** – mahasiswa membuat kelompok dan memilih anggota dari daftar mahasiswa di mata kuliah.
  - **Dosen Tentukan** – dosen menyusun kelompok langsung dari daftar mahasiswa.
- Mode auto-random dan undangan via link publik tidak termasuk lingkup awal.

### 8.6 Modul Jadwal & Kalender

- Tampilan kalender bulanan/mingguan yang menampilkan:
  - Semua deadline tugas dan milestone proyek.
  - Jadwal presentasi (jika diinput).
- Penjadwalan kerja yang disarankan (opsional):
  - Sistem menyarankan slot waktu kerja berdasarkan waktu luang yang diinput mahasiswa dan daftar tugas prioritas.

### 8.7 Modul Laporan & Statistik

- Laporan tugas/proyek selesai vs belum selesai per mahasiswa.
- Daftar tugas/proyek yang terlambat.
- Ringkasan per mata kuliah:
  - Jumlah tugas/proyek.
  - Persentase selesai/on-time.
- Visualisasi sederhana (bar/pie chart) untuk:
  - Distribusi status tugas.
  - Progres proyek.
- Ekspor laporan ke PDF/Excel.

### 8.8 Modul Notifikasi & Reminder

- Konfigurasi preferensi notifikasi per pengguna (email on/off, Telegram on/off, H-7/H-3/H-1, dsb.).
- Saluran notifikasi yang **diimplementasikan pada fase awal**:
  - Notifikasi **in-app** (badge, banner, atau card di dashboard).
  - **Email**.
  - **Telegram** (via bot).
- Notifikasi WhatsApp, SMS, dan push notification app native dinyatakan sebagai pengembangan lanjutan.

### 8.9 Modul Administrasi Sistem

- Manajemen user (buat, nonaktifkan, reset password).
- Manajemen tahun ajar dan semester aktif.
- Manajemen parameter global (batas default H-7/H-3/H-1, zona waktu, bahasa).
- Monitoring integrasi dengan SIAKAD, LMS, dan email server.

## 9. Kebutuhan Fungsional (Ringkasan per Modul)

Contoh penomoran kebutuhan (FR = Functional Requirement):

- **FR-01**: Sistem menyediakan halaman login untuk user dengan peran mahasiswa, dosen, admin kampus, dan staff TU.
- **FR-02**: Sistem mengizinkan autentikasi menggunakan NIM+password dan email kampus+password.
- **FR-03**: Sistem mendukung integrasi SSO kampus dan Google Login (opsional, dapat diaktifkan oleh admin).
- **FR-04**: Sistem mengizinkan dosen membuat tugas/proyek yang terkait dengan satu mata kuliah.
- **FR-05**: Sistem mengizinkan mahasiswa menambahkan tugas personal minimal dengan judul, mata kuliah, dan deadline.
- **FR-06**: Sistem menghitung dan menampilkan prioritas tugas berdasarkan kombinasi kedekatan deadline dan bobot nilai (jika ada).
- **FR-07**: Sistem menyediakan dashboard ringkasan jumlah tugas aktif, mendesak, dan lewat deadline untuk setiap mahasiswa.
- **FR-08**: Sistem menyediakan tampilan kalender yang memperlihatkan seluruh deadline tugas/proyek.
- **FR-09**: Sistem mengirimkan notifikasi otomatis ke mahasiswa ketika suatu tugas memasuki periode H-7, H-3, dan H-1 dari deadline (konfigurabel) melalui in-app, email, dan Telegram.
- **FR-10**: Sistem mengizinkan dosen melihat ringkasan progres tugas/proyek per mata kuliah.
- **FR-11**: Sistem mengizinkan ekspor laporan aktivitas tugas/proyek per mahasiswa dan per mata kuliah ke format PDF/Excel.
- **FR-12**: Sistem menyimpan histori log aktivitas progres tugas/proyek per mahasiswa.
- **FR-13**: Sistem mengizinkan admin kampus dan staff TU mengimpor data mahasiswa, mata kuliah, dan KRS dari SIAKAD.

Tim dapat merinci FR ini lebih lanjut menjadi user story atau spesifikasi teknis (misalnya per endpoint API atau per layar UI).

## 10. Kebutuhan Non-Fungsional

### 10.1 Usability

- Antarmuka sederhana dan mudah dipahami oleh mahasiswa, dosen, admin kampus, dan staff TU.
- Navigasi jelas dengan menu utama: Dashboard, Tugas, Proyek, Kelompok, Kalender, Laporan, Pengaturan.
- Responsif untuk tampilan laptop dan smartphone.

### 10.2 Kinerja

- Halaman dashboard utama dimuat dalam waktu kurang dari 3 detik pada koneksi internet kampus yang umum.
- Sistem mampu menangani setidaknya beberapa ratus pengguna aktif bersamaan untuk skala kelas/fakultas.

### 10.3 Keamanan

- Password disimpan dalam bentuk hash yang aman.
- Akses data dibatasi berdasarkan peran (role-based access control):
  - Mahasiswa hanya dapat melihat dan mengubah tugas/proyek yang berkaitan dengan dirinya atau kelompoknya.
  - Dosen hanya dapat mengakses data tugas/proyek pada mata kuliah yang dia ampu.
  - Admin dan staff TU memiliki akses sesuai fungsi administrasi, namun tidak dapat mengubah data progres mahasiswa secara langsung.
- Komunikasi menggunakan HTTPS pada lingkungan produksi.

### 10.4 Keandalan dan Ketersediaan

- Target ketersediaan minimal 99% selama jam operasional utama (misalnya 06.00–23.00 WIB).
- Mekanisme backup database berkala (harian) untuk mencegah kehilangan data.

### 10.5 Kompatibilitas dan Integrasi

- Dapat diintegrasikan dengan SSO kampus, SIAKAD, dan LMS kampus melalui API atau protokol standar (SAML/OAuth, REST API), sesuai praktik LMS modern.[web:20]
- Dukungan ekspor data ke format umum (CSV, XLSX, PDF) untuk analisis lanjutan atau integrasi manual.

### 10.6 Integrasi Sistem Eksternal

- **SIAKAD**: integrasi read-only untuk mengimpor data mahasiswa, mata kuliah, dan KRS setiap semester.
- **LMS Kampus** (misalnya Moodle/Google Classroom):
  - Tahap awal: impor manual daftar tugas (misalnya dari export CSV LMS) dan penandaan tugas yang berasal dari LMS.
  - Tahap lanjut: rencana sinkronisasi dua arah tugas dan status penyelesaian.
- **Email Server**: digunakan untuk notifikasi dan reset password.

## 11. Alur Penggunaan Utama (Use Case)

### 11.1 Use Case: Mahasiswa Mengelola Tugas Harian

1. Mahasiswa login ke sistem dan memilih semester aktif.
2. Mahasiswa mengimpor atau menambahkan daftar tugas dari tiap mata kuliah (judul, deadline, bobot, jenis individu/kelompok).
3. Sistem menghitung prioritas dan menampilkan daftar tugas pada dashboard, diurutkan berdasarkan deadline dan prioritas.
4. Mahasiswa memilih satu tugas penting, mengubah status menjadi "sedang dikerjakan", dan menambahkan catatan progres.
5. Ketika mendekati deadline, sistem mengirimkan notifikasi dan menandai tugas sebagai "mendesak" pada dashboard, email, dan Telegram.
6. Setelah tugas selesai, mahasiswa mengubah status menjadi "selesai" sehingga laporan mingguan memperlihatkan peningkatan jumlah tugas selesai dan penurunan tugas tertunda.

### 11.2 Use Case: Dosen Membuat dan Memantau Tugas Kelas

1. Dosen login dan memilih mata kuliah yang dia ampu pada semester berjalan.
2. Dosen membuat tugas baru dengan judul, deskripsi, tipe (individu/kelompok), bobot nilai, dan deadline.
3. Sistem menambahkan tugas tersebut ke daftar tugas semua mahasiswa yang terdaftar di mata kuliah tersebut.
4. Dosen dapat melihat ringkasan status tugas (berapa mahasiswa/kelompok sudah menyelesaikan, berapa yang belum mulai, dsb.).
5. Dosen dapat meninjau progres kelompok khusus (misal pada proyek besar) melalui log aktivitas dan persentase progres.

### 11.3 Use Case: Staff TU Mengelola Data Kelas

1. Staff TU login sebagai operator administrasi.
2. Staff TU mengimpor data mahasiswa, mata kuliah, dan KRS dari SIAKAD untuk semester berjalan.
3. Sistem memperbarui daftar kelas dan relasi mahasiswa–mata kuliah.
4. Dosen dan mahasiswa langsung melihat data yang sudah lengkap tanpa harus input ulang.

### 11.4 Use Case: Laporan dan Evaluasi Mingguan

1. Mahasiswa membuka modul Laporan untuk melihat ringkasan tugas dan proyek yang selesai, terlambat, dan masih aktif dalam periode mingguan.
2. Sistem menampilkan grafik sederhana (misal bar chart jumlah tugas selesai vs terlambat per minggu).
3. Dosen dapat membuka laporan per mata kuliah untuk melihat ringkasan penyelesaian tugas/proyek oleh mahasiswa.
4. Laporan dapat diekspor ke PDF/Excel untuk dilampirkan pada evaluasi kelas atau tugas mata kuliah.

## 12. Indikator Keberhasilan (KPI)

- Penurunan rata-rata jumlah tugas yang terlambat per mahasiswa per semester.
- Peningkatan persentase tugas yang memiliki status diperbarui secara berkala sebelum deadline.
- Peningkatan jumlah pengguna aktif mingguan (mahasiswa dan dosen) yang mengakses sistem.
- Feedback positif dari mahasiswa, dosen, admin kampus, dan staff TU terkait kemudahan mengelola tugas dan memantau progres.

## 13. Risiko dan Mitigasi Awal

- **Risiko adopsi rendah**: Mahasiswa enggan mengisi data tugas secara konsisten.
  - Mitigasi: buat antarmuka input yang sangat sederhana, sediakan template, dan maksimalkan impor data dari SIAKAD/LMS.
- **Risiko duplikasi fungsi dengan LMS kampus**:
  - Mitigasi: posisikan SIM Tugas sebagai alat fokus pada manajemen tugas/proyek dan progres personal, bukan pengganti LMS utama; desain integrasi yang melengkapi LMS.
- **Risiko beban pengembangan**:
  - Mitigasi: prioritisasi modul inti (autentikasi, tugas, dashboard, notifikasi email & Telegram) pada fase pertama, modul lanjutan seperti penjadwalan otomatis dan integrasi penuh dengan LMS dapat menyusul.

Dokumen PRD ini dapat digunakan sebagai dasar untuk menyusun backlog pengembangan (user story), desain UI/UX, serta perancangan basis data dan API untuk SIM Manajemen Tugas & Proyek Kuliah.