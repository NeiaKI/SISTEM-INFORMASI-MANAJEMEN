export const AUTH_MODES = {
  nim: {
    label: "NIM + Password",
    credentialLabel: "NIM",
    credentialPlaceholder: "220411100072",
    secretLabel: "Password",
    secretPlaceholder: "Masukkan password",
  },
  email: {
    label: "Email Kampus",
    credentialLabel: "Email Kampus",
    credentialPlaceholder: "nama@kampus.ac.id",
    secretLabel: "Password",
    secretPlaceholder: "Masukkan password email kampus",
  },
  sso: {
    label: "SSO Kampus",
    credentialLabel: "Akun SSO",
    credentialPlaceholder: "nama.akun",
    secretLabel: "Password SSO",
    secretPlaceholder: "Masukkan password SSO",
  },
  google: {
    label: "Google Login",
    credentialLabel: "Google Workspace",
    credentialPlaceholder: "nama@kampus.ac.id",
    secretLabel: "Password",
    secretPlaceholder: "Masukkan password Google Workspace",
  },
};

export const SECTION_OPTIONS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "tugas", label: "Tugas" },
  { id: "proyek", label: "Proyek" },
  { id: "kelompok", label: "Kelompok" },
  { id: "kalender", label: "Kalender" },
  { id: "laporan", label: "Laporan" },
  { id: "notifikasi", label: "Notifikasi" },
  { id: "administrasi", label: "Administrasi" },
  { id: "pengaturan", label: "Pengaturan" },
];

export const ACCESS_ROWS = [
  {
    role: "Mahasiswa",
    access:
      "Melihat dan mengubah tugas, proyek, dan log progres yang terkait dengan dirinya atau kelompoknya.",
  },
  {
    role: "Dosen",
    access:
      "Mengelola tugas dan proyek pada mata kuliah yang diampu serta memantau ringkasan progres kelas.",
  },
  {
    role: "Admin Kampus",
    access:
      "Mengelola user, semester aktif, parameter sistem, dan monitoring integrasi eksternal.",
  },
  {
    role: "Staff TU",
    access:
      "Mengimpor data mahasiswa, mata kuliah, KRS, serta membantu reset akun dan pembaruan data dasar.",
  },
];

const sharedAuthSettings = [
  {
    title: "NIM + Password",
    detail: "Minimum viable login untuk mahasiswa dan akun lokal kampus.",
  },
  {
    title: "Email Kampus + Password",
    detail: "Untuk mahasiswa, dosen, admin kampus, dan staff TU.",
  },
  {
    title: "SSO Kampus",
    detail: "Opsi integrasi SSO/LDAP/SAML yang bisa diaktifkan admin.",
  },
  {
    title: "Google Login",
    detail: "Alternatif OAuth untuk kampus yang memakai Google Workspace Edu.",
  },
];

const sharedSystemSettings = [
  {
    title: "Reminder deadline",
    detail: "Default H-7, H-3, dan H-1, dapat diubah per pengguna atau global.",
  },
  {
    title: "Zona waktu",
    detail: "WIB (UTC+7) sebagai default semester aktif.",
  },
  {
    title: "Keamanan",
    detail: "Password di-hash, akses dibatasi role-based access control, dan HTTPS pada produksi.",
  },
  {
    title: "Backup",
    detail: "Cadangan database harian untuk menjaga keandalan operasional.",
  },
];

const sharedSemester = "Genap 2025/2026";

const roleData = {
  mahasiswa: {
    roleLabel: "Mahasiswa",
    userName: "Nadia Rahma",
    identity: "Sistem Informasi 2022",
    semester: sharedSemester,
    workspaceTitle: "Dashboard mahasiswa untuk tugas kuliah aktif",
    workspaceSubtitle:
      "Fokus ke deadline, prioritas, progres proyek, notifikasi, dan evaluasi mingguan personal.",
    dashboardLead:
      "Pantau beban kerja semester dan kerjakan item paling penting sebelum melewati H-1.",
    dashboardNote:
      "Skor prioritas menggabungkan deadline, bobot tugas, dan status progres supaya urutan kerja lebih jelas.",
    taskHeading: "Daftar tugas personal dan mata kuliah",
    projectHeading: "Proyek besar, fase, dan deliverable",
    groupHeading: "Kelompok aktif dan pembagian jobdesk",
    calendarHeading: "Kalender deadline tugas dan milestone proyek",
    reportHeading: "Laporan mingguan dan statistik progres",
    notifHeading: "Reminder deadline lintas channel",
    adminHeading: "Koneksi akun, lampiran, dan integrasi personal",
    supportTitle: "Aksi cepat mahasiswa",
    supportFocus:
      "Menjaga tugas rutin tetap on-time dan proyek kelompok terus bergerak.",
    quickActions: [
      {
        label: "Lihat Kalender",
        section: "kalender",
        message: "Kalender deadline semester dibuka.",
      },
      {
        label: "Tambah Tugas",
        section: "tugas",
        message: "Pindah ke modul tugas untuk menambah item baru.",
      },
      {
        label: "Cek Reminder",
        section: "notifikasi",
        message: "Preferensi reminder dan notifikasi dibuka.",
      },
    ],
    tasks: [
      {
        id: "mhs-1",
        title: "Prototype ERD SIM",
        course: "Basis Data",
        type: "individu",
        status: "sedang dikerjakan",
        deadline: "2026-04-28",
        priority: "kritis",
        progress: 72,
        note: "Normalisasi sudah selesai, tinggal review relasi dan naming.",
        submissions: [],
        comments: [
          {
            id: "c-mhs1-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "ERD sudah sampai tahap 3NF, tinggal cek naming convention.",
            time: "14 April 2026, 20.15 WIB",
          },
        ],
      },
      {
        id: "mhs-2",
        title: "Presentasi BPMN proses akademik",
        course: "Analisis SI",
        type: "kelompok",
        status: "belum mulai",
        deadline: "2026-05-02",
        priority: "tinggi",
        progress: 18,
        note: "Slide deck belum dibagi ke anggota kelompok.",
        submissions: [],
        comments: [],
      },
      {
        id: "mhs-3",
        title: "Ringkasan jurnal notifikasi Telegram",
        course: "PPL",
        type: "individu",
        status: "menunggu review",
        deadline: "2026-04-24",
        priority: "tinggi",
        progress: 85,
        note: "Draft sudah dikirim, menunggu masukan dosen.",
        submissions: [
          {
            id: "s-mhs3-1",
            fileName: "ringkasan-jurnal-telegram.pdf",
            fileSize: "2.4 MB",
            submittedBy: "Nadia Rahma",
            submittedAt: "14 April 2026, 18.30 WIB",
            note: "Draft pertama ringkasan jurnal, mohon feedback.",
          },
        ],
        comments: [
          {
            id: "c-mhs3-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "Draft sudah saya submit, mohon review-nya Pak.",
            time: "14 April 2026, 18.32 WIB",
          },
          {
            id: "c-mhs3-2",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Sedang saya review, akan saya beri feedback besok pagi.",
            time: "14 April 2026, 21.05 WIB",
          },
        ],
      },
      {
        id: "mhs-4",
        title: "Sprint board UI responsif",
        course: "Interaksi Manusia & Komputer",
        type: "individu",
        status: "selesai",
        deadline: "2026-04-12",
        priority: "sedang",
        progress: 100,
        note: "Sudah presentasi dan masuk laporan sprint.",
        submissions: [
          {
            id: "s-mhs4-1",
            fileName: "sprint-board-final.zip",
            fileSize: "5.1 MB",
            submittedBy: "Nadia Rahma",
            submittedAt: "11 April 2026, 22.10 WIB",
            note: "File project lengkap beserta dokumentasi.",
          },
        ],
        comments: [
          {
            id: "c-mhs4-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "Sprint board sudah selesai, termasuk responsive design.",
            time: "11 April 2026, 22.12 WIB",
          },
          {
            id: "c-mhs4-2",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Bagus, UI-nya clean dan sudah responsif. Nilai A.",
            time: "12 April 2026, 10.00 WIB",
          },
        ],
      },
      {
        id: "mhs-5",
        title: "Laporan weekly progress kelompok",
        course: "Analisis SI",
        type: "kelompok",
        status: "sedang dikerjakan",
        deadline: "2026-04-26",
        priority: "sedang",
        progress: 44,
        note: "Butuh pembaruan jobdesk dan catatan meeting.",
        submissions: [],
        comments: [
          {
            id: "c-mhs5-1",
            author: "Dimas",
            role: "mahasiswa",
            text: "Saya sudah update bagian UI wireframe di dokumen.",
            time: "14 April 2026, 15.20 WIB",
          },
        ],
      },
      {
        id: "mhs-6",
        title: "Kuis keamanan informasi",
        course: "Keamanan Sistem",
        type: "individu",
        status: "belum mulai",
        deadline: "2026-04-14",
        priority: "kritis",
        progress: 0,
        note: "Sudah lewat deadline, perlu follow up ke dosen.",
        submissions: [],
        comments: [],
      },
    ],
    projects: [
      {
        id: "mp-1",
        title: "Proyek Besar Analisis SI",
        course: "Analisis SI",
        phase: "Implementasi",
        progress: 68,
        nextMilestone: "2026-04-19",
        team: "Kelompok Alfa",
        deliverables: [
          {
            title: "Use case final",
            owner: "Nadia",
            status: "selesai",
            deadline: "2026-04-15",
          },
          {
            title: "Wireframe low-fi",
            owner: "Dimas",
            status: "sedang dikerjakan",
            deadline: "2026-04-18",
          },
          {
            title: "Dokumen requirement",
            owner: "Salsa",
            status: "menunggu review",
            deadline: "2026-04-19",
          },
        ],
      },
      {
        id: "mp-2",
        title: "Mini Riset UX Reminder",
        course: "Interaksi Manusia & Komputer",
        phase: "Testing",
        progress: 52,
        nextMilestone: "2026-04-22",
        team: "Individu",
        deliverables: [
          {
            title: "Interview guide",
            owner: "Nadia",
            status: "selesai",
            deadline: "2026-04-13",
          },
          {
            title: "Usability test note",
            owner: "Nadia",
            status: "sedang dikerjakan",
            deadline: "2026-04-22",
          },
        ],
      },
    ],
    groups: [
      {
        name: "Kelompok Alfa",
        course: "Analisis SI",
        mode: "Mahasiswa membuat kelompok",
        members: [
          { name: "Nadia", role: "Leader" },
          { name: "Dimas", role: "UI" },
          { name: "Salsa", role: "Analyst" },
          { name: "Rafi", role: "Presenter" },
        ],
      },
      {
        name: "UX Squad",
        course: "Interaksi Manusia & Komputer",
        mode: "Dosen tentukan",
        members: [
          { name: "Nadia", role: "Researcher" },
          { name: "Nina", role: "Observer" },
          { name: "Faris", role: "Moderator" },
        ],
      },
    ],
    notifications: [
      {
        title: "Deadline H-1",
        message: "Prototype ERD SIM jatuh tempo besok dan progres sudah 72%.",
        channel: "In-app + Email",
        time: "15 April 2026, 08.00 WIB",
        kind: "deadline",
      },
      {
        title: "Reminder kelompok",
        message:
          "Laporan weekly progress kelompok belum diperbarui sejak dua hari terakhir.",
        channel: "Telegram",
        time: "15 April 2026, 07.30 WIB",
        kind: "progres",
      },
      {
        title: "Review dosen",
        message: "Ringkasan jurnal notifikasi Telegram masuk status menunggu review.",
        channel: "In-app",
        time: "14 April 2026, 19.10 WIB",
        kind: "review",
      },
    ],
    preferences: [
      {
        key: "inApp",
        label: "In-app notification",
        detail: "Badge dan card muncul langsung di dashboard.",
        enabled: true,
      },
      {
        key: "email",
        label: "Email reminder",
        detail: "Ringkasan deadline dikirim ke email kampus.",
        enabled: true,
      },
      {
        key: "telegram",
        label: "Telegram bot",
        detail: "Pengingat cepat saat tugas masuk H-3 dan H-1.",
        enabled: true,
      },
      {
        key: "h7",
        label: "Trigger H-7",
        detail: "Untuk tugas besar atau proyek multi-fase.",
        enabled: true,
      },
      {
        key: "h3",
        label: "Trigger H-3",
        detail: "Reminder prioritas tinggi sebelum pekan padat.",
        enabled: true,
      },
      {
        key: "h1",
        label: "Trigger H-1",
        detail: "Notifikasi wajib untuk tugas belum selesai.",
        enabled: true,
      },
    ],
    operations: [
      {
        title: "Hubungkan Telegram",
        detail: "Bot sudah tersambung, tinggal atur kanal pengingat personal.",
        status: "Siap dipakai",
      },
      {
        title: "Upload lampiran",
        detail: "Bisa pilih file ke server lokal atau link Google Drive/GitHub.",
        status: "Aktif",
      },
      {
        title: "Impor dari LMS",
        detail: "Masih tahap manual via CSV export dari LMS kampus.",
        status: "Parsial",
      },
    ],
    integrations: [
      {
        name: "SIAKAD",
        status: "Sinkron terakhir 14 April 2026, 21.00 WIB",
        note: "KRS semester aktif sudah cocok dengan daftar mata kuliah.",
      },
      {
        name: "Email Server",
        status: "Aktif",
        note: "Reset password dan reminder deadline berjalan normal.",
      },
      {
        name: "Telegram Bot",
        status: "Terhubung",
        note: "Siap kirim notifikasi H-7, H-3, dan H-1.",
      },
    ],
    report: {
      weekly: [
        { label: "M1", done: 3, late: 1 },
        { label: "M2", done: 4, late: 1 },
        { label: "M3", done: 5, late: 0 },
        { label: "M4", done: 3, late: 1 },
      ],
      kpis: [
        {
          title: "Update status berkala",
          detail: "Target minimal 3 pembaruan progres per minggu per proyek aktif.",
        },
        {
          title: "Selesai sebelum H-1",
          detail: "Naikkan porsi tugas yang selesai sebelum H-1 deadline.",
        },
        {
          title: "Tugas terlambat",
          detail: "Turunkan jumlah tugas personal yang lewat deadline tiap bulan.",
        },
      ],
      exports: ["PDF laporan mingguan", "Excel rekap mata kuliah"],
    },
    authSettings: sharedAuthSettings,
    systemSettings: sharedSystemSettings,
  },
  dosen: {
    roleLabel: "Dosen",
    userName: "Dr. Raka Pratama",
    identity: "Koordinator Mata Kuliah Analisis SI",
    semester: sharedSemester,
    workspaceTitle: "Kontrol tugas dan progres kelas",
    workspaceSubtitle:
      "Memantau distribusi tugas resmi, progres proyek kelompok, dan kesiapan kelas untuk review.",
    dashboardLead:
      "Lihat kelas yang tertinggal, tugas yang perlu review, dan proyek yang butuh intervensi cepat.",
    dashboardNote:
      "Ringkasan ini menonjolkan submission rate, milestone proyek, dan reminder ke mahasiswa.",
    taskHeading: "Tugas resmi mata kuliah dan status review",
    projectHeading: "Monitoring proyek kelas dan deliverable kelompok",
    groupHeading: "Pembentukan kelompok per mata kuliah",
    calendarHeading: "Kalender penugasan, review, dan presentasi",
    reportHeading: "Ringkasan performa kelas dan kepatuhan deadline",
    notifHeading: "Notifikasi untuk distribusi dan review kelas",
    adminHeading: "Operasional mata kuliah dan sinkronisasi tugas",
    supportTitle: "Aksi cepat dosen",
    supportFocus:
      "Menjaga distribusi tugas jelas dan progres kelompok tetap bisa dimonitor.",
    quickActions: [
      {
        label: "Buat Tugas Baru",
        section: "tugas",
        message: "Modul tugas dibuka untuk menambah penugasan resmi kelas.",
      },
      {
        label: "Review Proyek",
        section: "proyek",
        message: "Ringkasan proyek kelas dibuka.",
      },
      {
        label: "Buka Laporan",
        section: "laporan",
        message: "Laporan performa kelas dibuka.",
      },
    ],
    tasks: [
      {
        id: "dsn-1",
        title: "Studi Kasus BPMN",
        course: "Analisis SI",
        type: "kelompok",
        status: "sedang dikerjakan",
        deadline: "2026-04-18",
        priority: "kritis",
        progress: 61,
        note: "19 dari 24 kelompok sudah mengirim draft awal.",
        submissions: [
          {
            id: "s-dsn1-1",
            fileName: "bpmn-kelompok-alfa.pdf",
            fileSize: "3.2 MB",
            submittedBy: "Nadia Rahma (Kelompok Alfa)",
            submittedAt: "14 April 2026, 16.45 WIB",
            note: "Draft BPMN proses registrasi akademik.",
          },
          {
            id: "s-dsn1-2",
            fileName: "bpmn-kelompok-beta.pdf",
            fileSize: "2.8 MB",
            submittedBy: "Rina Aulia (Kelompok Beta)",
            submittedAt: "14 April 2026, 19.20 WIB",
            note: "BPMN proses KRS online, sudah include swimlane.",
          },
          {
            id: "s-dsn1-3",
            fileName: "bpmn-kelompok-gamma.docx",
            fileSize: "1.5 MB",
            submittedBy: "Faris Rizky (Kelompok Gamma)",
            submittedAt: "15 April 2026, 08.00 WIB",
            note: "Revisi kedua setelah feedback Pak Raka.",
          },
        ],
        comments: [
          {
            id: "c-dsn1-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "Pak, draft BPMN sudah kami submit. Mohon feedback untuk bagian swimlane.",
            time: "14 April 2026, 16.48 WIB",
          },
          {
            id: "c-dsn1-2",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Swimlane-nya sudah lebih baik. Perbaiki notasi gateway di decision point kedua.",
            time: "14 April 2026, 20.30 WIB",
          },
          {
            id: "c-dsn1-3",
            author: "Faris Rizky",
            role: "mahasiswa",
            text: "Pak, kami sudah revisi sesuai catatan, silakan dicek kembali.",
            time: "15 April 2026, 08.02 WIB",
          },
        ],
      },
      {
        id: "dsn-2",
        title: "Kuis kontrol akses",
        course: "Keamanan Sistem",
        type: "individu",
        status: "menunggu review",
        deadline: "2026-04-16",
        priority: "tinggi",
        progress: 78,
        note: "Jawaban terkumpul, butuh validasi hasil dan feedback.",
        submissions: [
          {
            id: "s-dsn2-1",
            fileName: "jawaban-kuis-nadia.pdf",
            fileSize: "0.8 MB",
            submittedBy: "Nadia Rahma",
            submittedAt: "14 April 2026, 14.00 WIB",
            note: "Jawaban kuis kontrol akses.",
          },
          {
            id: "s-dsn2-2",
            fileName: "jawaban-kuis-dimas.pdf",
            fileSize: "0.7 MB",
            submittedBy: "Dimas Arya",
            submittedAt: "14 April 2026, 14.30 WIB",
            note: "Kuis kontrol akses, nomor 3 ada catatan tambahan.",
          },
        ],
        comments: [
          {
            id: "c-dsn2-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "Pak, untuk soal nomor 5 apakah harus pakai contoh kasus nyata?",
            time: "14 April 2026, 13.50 WIB",
          },
          {
            id: "c-dsn2-2",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Iya, gunakan contoh implementasi RBAC di perusahaan.",
            time: "14 April 2026, 14.10 WIB",
          },
        ],
      },
      {
        id: "dsn-3",
        title: "Proposal integrasi SSO",
        course: "SI Enterprise",
        type: "kelompok",
        status: "belum mulai",
        deadline: "2026-04-21",
        priority: "tinggi",
        progress: 8,
        note: "Belum semua mahasiswa memahami scope deliverable.",
        submissions: [],
        comments: [
          {
            id: "c-dsn3-1",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Pastikan proposal mencakup analysis kebutuhan dan arsitektur teknis SSO.",
            time: "13 April 2026, 09.00 WIB",
          },
        ],
      },
      {
        id: "dsn-4",
        title: "Resume artikel notifikasi",
        course: "PPL",
        type: "individu",
        status: "selesai",
        deadline: "2026-04-12",
        priority: "sedang",
        progress: 100,
        note: "Submission lengkap dan sudah diumumkan hasil review.",
        submissions: [
          {
            id: "s-dsn4-1",
            fileName: "resume-notifikasi-nadia.pdf",
            fileSize: "1.2 MB",
            submittedBy: "Nadia Rahma",
            submittedAt: "11 April 2026, 20.00 WIB",
            note: "Resume lengkap dengan referensi tambahan.",
          },
        ],
        comments: [
          {
            id: "c-dsn4-1",
            author: "Nadia Rahma",
            role: "mahasiswa",
            text: "Sudah submit resume artikel, terima kasih Pak.",
            time: "11 April 2026, 20.02 WIB",
          },
          {
            id: "c-dsn4-2",
            author: "Dr. Raka Pratama",
            role: "dosen",
            text: "Bagus, analisisnya mendalam. Nilai sudah diinput.",
            time: "12 April 2026, 09.00 WIB",
          },
        ],
      },
      {
        id: "dsn-5",
        title: "Template log progres kelompok",
        course: "Analisis SI",
        type: "kelompok",
        status: "sedang dikerjakan",
        deadline: "2026-04-20",
        priority: "sedang",
        progress: 40,
        note: "Masih ada kelompok yang belum update jobdesk per anggota.",
        submissions: [
          {
            id: "s-dsn5-1",
            fileName: "log-progres-alfa-m3.xlsx",
            fileSize: "0.5 MB",
            submittedBy: "Salsa (Kelompok Alfa)",
            submittedAt: "14 April 2026, 17.30 WIB",
            note: "Log progres minggu ke-3, sudah include catatan meeting.",
          },
        ],
        comments: [
          {
            id: "c-dsn5-1",
            author: "Salsa",
            role: "mahasiswa",
            text: "Pak, log minggu 3 sudah kami upload. Jobdesk sudah diupdate.",
            time: "14 April 2026, 17.32 WIB",
          },
        ],
      },
    ],
    projects: [
      {
        id: "dp-1",
        title: "Proyek layanan akademik digital",
        course: "Analisis SI",
        phase: "Monitoring implementasi",
        progress: 57,
        nextMilestone: "2026-04-19",
        team: "24 kelompok",
        deliverables: [
          {
            title: "Draft BPMN",
            owner: "Seluruh kelompok",
            status: "sedang dikerjakan",
            deadline: "2026-04-18",
          },
          {
            title: "Review wireframe",
            owner: "Dosen",
            status: "menunggu review",
            deadline: "2026-04-19",
          },
        ],
      },
      {
        id: "dp-2",
        title: "Audit keamanan mini project",
        course: "Keamanan Sistem",
        phase: "Assessment",
        progress: 74,
        nextMilestone: "2026-04-23",
        team: "18 mahasiswa",
        deliverables: [
          {
            title: "Checklist risiko",
            owner: "Mahasiswa",
            status: "selesai",
            deadline: "2026-04-15",
          },
          {
            title: "Feedback dosen",
            owner: "Dosen",
            status: "sedang dikerjakan",
            deadline: "2026-04-23",
          },
        ],
      },
    ],
    groups: [
      {
        name: "Kelas Analisis SI - Kelompok 01-24",
        course: "Analisis SI",
        mode: "Dosen tentukan",
        members: [
          { name: "24 kelompok", role: "Distribusi kelas" },
          { name: "Leader aktif", role: "24 orang" },
          { name: "Belum update jobdesk", role: "5 kelompok" },
        ],
      },
      {
        name: "Kelas SI Enterprise",
        course: "SI Enterprise",
        mode: "Mahasiswa membuat kelompok",
        members: [
          { name: "17 kelompok", role: "Proposal berjalan" },
          { name: "Draft belum masuk", role: "6 kelompok" },
        ],
      },
    ],
    notifications: [
      {
        title: "Reminder review",
        message: "Kuis kontrol akses butuh validasi sebelum hasil diumumkan.",
        channel: "In-app + Email",
        time: "15 April 2026, 06.45 WIB",
        kind: "review",
      },
      {
        title: "Kelompok tertinggal",
        message: "Lima kelompok Analisis SI belum update log progres minggu ini.",
        channel: "Telegram",
        time: "14 April 2026, 20.10 WIB",
        kind: "progres",
      },
      {
        title: "Milestone mendekat",
        message: "Draft BPMN proyek layanan akademik digital masuk H-3.",
        channel: "In-app",
        time: "15 April 2026, 07.10 WIB",
        kind: "deadline",
      },
    ],
    preferences: [
      {
        key: "inApp",
        label: "Dashboard alert",
        detail: "Badge tugas yang perlu review dan kelompok yang tertinggal.",
        enabled: true,
      },
      {
        key: "email",
        label: "Email digest kelas",
        detail: "Ringkasan submission dan reminder deadline setiap pagi.",
        enabled: true,
      },
      {
        key: "telegram",
        label: "Telegram operasi kelas",
        detail: "Alert cepat untuk tugas yang belum disentuh kelompok.",
        enabled: false,
      },
      {
        key: "h7",
        label: "Reminder H-7",
        detail: "Untuk proyek besar dan presentasi kelas.",
        enabled: true,
      },
      {
        key: "h3",
        label: "Reminder H-3",
        detail: "Untuk seluruh tugas resmi kelas aktif.",
        enabled: true,
      },
      {
        key: "h1",
        label: "Reminder H-1",
        detail: "Untuk item yang masih berstatus belum mulai atau sedang dikerjakan.",
        enabled: true,
      },
    ],
    operations: [
      {
        title: "Distribusi tugas kelas",
        detail: "Penugasan resmi otomatis muncul pada mahasiswa sesuai enrollment.",
        status: "Aktif",
      },
      {
        title: "Pantau progres kelompok",
        detail: "Log aktivitas dan persen progres tersedia per deliverable.",
        status: "Aktif",
      },
      {
        title: "Impor daftar tugas LMS",
        detail: "Tahap awal masih berbasis ekspor CSV atau input manual.",
        status: "Parsial",
      },
    ],
    integrations: [
      {
        name: "Enrollment SIAKAD",
        status: "Sinkron aktif",
        note: "Daftar mahasiswa per kelas semester berjalan sudah tersinkron.",
      },
      {
        name: "Email Server",
        status: "Aktif",
        note: "Reminder kelas dan reset akun dosen berjalan normal.",
      },
      {
        name: "LMS Kampus",
        status: "Manual import",
        note: "Belum dua arah, hanya impor sederhana dari file export.",
      },
    ],
    report: {
      weekly: [
        { label: "M1", done: 12, late: 3 },
        { label: "M2", done: 16, late: 2 },
        { label: "M3", done: 18, late: 1 },
        { label: "M4", done: 14, late: 4 },
      ],
      kpis: [
        {
          title: "Submission tepat waktu",
          detail: "Targetkan kenaikan porsi mahasiswa yang submit sebelum H-1.",
        },
        {
          title: "Kelompok update progres",
          detail: "Minimal sekali pembaruan log progres tiap 3 hari untuk proyek aktif.",
        },
        {
          title: "Review turnaround",
          detail: "Feedback dosen selesai maksimal 2 hari setelah deadline.",
        },
      ],
      exports: ["PDF ringkasan kelas", "Excel progres kelompok"],
    },
    authSettings: sharedAuthSettings,
    systemSettings: sharedSystemSettings,
  },
  admin: {
    roleLabel: "Admin Kampus",
    userName: "Mira Kurnia",
    identity: "Unit Sistem Akademik",
    semester: sharedSemester,
    workspaceTitle: "Operasional sistem dan integrasi kampus",
    workspaceSubtitle:
      "Menjaga data dasar, hak akses, semester aktif, dan sinkronisasi eksternal tetap konsisten.",
    dashboardLead:
      "Pantau backlog operasional, sinkronisasi data, dan parameter global tanpa menyentuh progres mahasiswa secara langsung.",
    dashboardNote:
      "Prioritas admin berpusat pada konsistensi data, akses, dan keandalan integrasi SIAKAD, LMS, email, dan SSO.",
    taskHeading: "Aktivitas administrasi semester dan tiket operasional",
    projectHeading: "Proyek integrasi sistem dan rollout operasional",
    groupHeading: "Tim pengelola sistem dan koordinator unit",
    calendarHeading: "Kalender sinkronisasi, maintenance, dan batch import",
    reportHeading: "Laporan operasional sistem dan KPI layanan",
    notifHeading: "Alert sistem, integrasi, dan antrian akun",
    adminHeading: "Kontrol data dasar, user, dan konfigurasi global",
    supportTitle: "Aksi cepat admin",
    supportFocus:
      "Menjaga semua data kelas dan akun siap dipakai sebelum semester berjalan padat.",
    quickActions: [
      {
        label: "Cek Integrasi",
        section: "administrasi",
        message: "Panel integrasi sistem dibuka.",
      },
      {
        label: "Buka Notifikasi",
        section: "notifikasi",
        message: "Daftar alert sistem dibuka.",
      },
      {
        label: "Lihat KPI",
        section: "laporan",
        message: "KPI operasional semester dibuka.",
      },
    ],
    tasks: [
      {
        id: "adm-1",
        title: "Impor KRS semester genap",
        course: "Akademik",
        type: "operasional",
        status: "sedang dikerjakan",
        deadline: "2026-04-17",
        priority: "kritis",
        progress: 66,
        note: "1.284 enrollment menunggu verifikasi akhir dengan prodi.",
        submissions: [],
        comments: [],
      },
      {
        id: "adm-2",
        title: "Reset akun batch fakultas ekonomi",
        course: "User Management",
        type: "operasional",
        status: "menunggu review",
        deadline: "2026-04-16",
        priority: "tinggi",
        progress: 82,
        note: "Daftar user nonaktif sedang diverifikasi sebelum dieksekusi.",
        submissions: [],
        comments: [],
      },
      {
        id: "adm-3",
        title: "Konfigurasi trigger reminder global",
        course: "Sistem",
        type: "operasional",
        status: "belum mulai",
        deadline: "2026-04-21",
        priority: "sedang",
        progress: 6,
        note: "Default H-7/H-3/H-1 perlu sinkron dengan kebijakan baru.",
        submissions: [],
        comments: [],
      },
      {
        id: "adm-4",
        title: "Sinkron user dosen baru",
        course: "User Management",
        type: "operasional",
        status: "selesai",
        deadline: "2026-04-13",
        priority: "sedang",
        progress: 100,
        note: "16 akun dosen baru sudah aktif dan punya role sesuai unit.",
        submissions: [],
        comments: [],
      },
      {
        id: "adm-5",
        title: "Audit koneksi email server",
        course: "Integrasi",
        type: "operasional",
        status: "sedang dikerjakan",
        deadline: "2026-04-18",
        priority: "tinggi",
        progress: 48,
        note: "Sedang cek retry delivery untuk reminder massal.",
        submissions: [],
        comments: [],
      },
    ],
    projects: [
      {
        id: "ap-1",
        title: "Rollout integrasi SIAKAD read-only",
        course: "Integrasi",
        phase: "Stabilisasi",
        progress: 74,
        nextMilestone: "2026-04-18",
        team: "Tim Akademik + IT",
        deliverables: [
          {
            title: "Mapping KRS",
            owner: "Admin Akademik",
            status: "selesai",
            deadline: "2026-04-15",
          },
          {
            title: "Verifikasi relasi MK",
            owner: "Prodi",
            status: "sedang dikerjakan",
            deadline: "2026-04-18",
          },
        ],
      },
      {
        id: "ap-2",
        title: "Penguatan notifikasi email kampus",
        course: "Sistem",
        phase: "Testing",
        progress: 59,
        nextMilestone: "2026-04-22",
        team: "Tim Infrastruktur",
        deliverables: [
          {
            title: "SMTP failover",
            owner: "Infra",
            status: "sedang dikerjakan",
            deadline: "2026-04-20",
          },
          {
            title: "Load test",
            owner: "Infra",
            status: "belum mulai",
            deadline: "2026-04-22",
          },
        ],
      },
    ],
    groups: [
      {
        name: "Tim Akademik Semester Genap",
        course: "Operasional",
        mode: "Koordinasi admin kampus",
        members: [
          { name: "Admin Akademik", role: "Data KRS" },
          { name: "IT Support", role: "Integrasi" },
          { name: "Prodi", role: "Validasi kelas" },
        ],
      },
      {
        name: "Tim Notifikasi",
        course: "Sistem",
        mode: "Koordinasi unit",
        members: [
          { name: "Infra", role: "Email server" },
          { name: "Developer", role: "Bot Telegram" },
        ],
      },
    ],
    notifications: [
      {
        title: "Batch import tertunda",
        message: "Impor KRS semester genap masih menunggu verifikasi final prodi.",
        channel: "In-app + Email",
        time: "15 April 2026, 08.20 WIB",
        kind: "sistem",
      },
      {
        title: "Alert email server",
        message: "Ada retry tinggi pada reminder massal semalam.",
        channel: "Email",
        time: "15 April 2026, 07.00 WIB",
        kind: "integrasi",
      },
      {
        title: "Akun dosen baru selesai",
        message: "Sinkron user dosen baru berhasil tanpa konflik role.",
        channel: "In-app",
        time: "14 April 2026, 16.40 WIB",
        kind: "info",
      },
    ],
    preferences: [
      {
        key: "inApp",
        label: "Operational alert",
        detail: "Notifikasi dashboard untuk batch import, konflik data, dan insiden.",
        enabled: true,
      },
      {
        key: "email",
        label: "Email incident",
        detail: "Ringkasan error penting dan laporan availability harian.",
        enabled: true,
      },
      {
        key: "telegram",
        label: "Telegram ops",
        detail: "Alert cepat untuk kegagalan integrasi kritis.",
        enabled: true,
      },
      {
        key: "h7",
        label: "Window H-7",
        detail: "Digunakan untuk mengingatkan batch import dan closing data.",
        enabled: false,
      },
      {
        key: "h3",
        label: "Window H-3",
        detail: "Aktif untuk maintenance yang mendekat dan retry backlog.",
        enabled: true,
      },
      {
        key: "h1",
        label: "Window H-1",
        detail: "Aktif untuk insiden yang perlu eskalasi cepat.",
        enabled: true,
      },
    ],
    operations: [
      {
        title: "Manajemen user",
        detail: "Buat akun, nonaktifkan, reset password, dan jaga role tetap konsisten.",
        status: "Aktif",
      },
      {
        title: "Semester aktif",
        detail: "Pusat kontrol tahun ajar, semester, bahasa, dan zona waktu default.",
        status: "Aktif",
      },
      {
        title: "Monitoring integrasi",
        detail: "Pantau SIAKAD, LMS, email, dan SSO dari satu panel.",
        status: "Aktif",
      },
    ],
    integrations: [
      {
        name: "SIAKAD",
        status: "Stabil",
        note: "Mode read-only aktif untuk impor data dasar dan KRS.",
      },
      {
        name: "LMS Kampus",
        status: "Parsial",
        note: "Masih impor manual daftar tugas dari file export CSV.",
      },
      {
        name: "Email Server",
        status: "Perlu observasi",
        note: "Retry delivery naik saat beban tinggi malam hari.",
      },
      {
        name: "SSO Kampus",
        status: "Rencana aktivasi",
        note: "Masih tahap konfigurasi metadata dan role mapping.",
      },
    ],
    report: {
      weekly: [
        { label: "M1", done: 7, late: 1 },
        { label: "M2", done: 9, late: 2 },
        { label: "M3", done: 11, late: 1 },
        { label: "M4", done: 8, late: 2 },
      ],
      kpis: [
        {
          title: "Konsistensi data",
          detail: "Minimalkan mismatch data mahasiswa, mata kuliah, dan enrollment.",
        },
        {
          title: "Availability jam operasional",
          detail: "Target ketersediaan minimal 99% pada 06.00-23.00 WIB.",
        },
        {
          title: "Lead time reset akun",
          detail: "Permintaan reset akun selesai kurang dari 1 hari kerja.",
        },
      ],
      exports: ["PDF operasional mingguan", "Excel backlog integrasi"],
    },
    authSettings: sharedAuthSettings,
    systemSettings: sharedSystemSettings,
  },
  staff_tu: {
    roleLabel: "Staff TU",
    userName: "Ayu Kartika",
    identity: "Operator Akademik Prodi SI",
    semester: sharedSemester,
    workspaceTitle: "Operator data kelas dan layanan akademik",
    workspaceSubtitle:
      "Membantu impor data, pembaruan kelas, reset akun, dan validasi relasi mahasiswa dengan mata kuliah.",
    dashboardLead:
      "Fokus pada data semester berjalan, antrean reset akun, dan daftar kelas yang belum valid.",
    dashboardNote:
      "Backlog diurutkan berdasarkan batas operasional dan dampaknya ke kesiapan kelas.",
    taskHeading: "Aktivitas operator untuk semester berjalan",
    projectHeading: "Pembaruan data kelas dan template administrasi",
    groupHeading: "Koordinasi operator dan unit prodi",
    calendarHeading: "Kalender batch import, validasi kelas, dan presentasi",
    reportHeading: "Laporan layanan operator dan kualitas data",
    notifHeading: "Notifikasi antrean dan progres administrasi",
    adminHeading: "Impor data, reset akun, dan pembaruan daftar kelas",
    supportTitle: "Aksi cepat staff TU",
    supportFocus:
      "Menjaga kelas aktif lengkap sebelum dosen dan mahasiswa mulai bekerja di sistem.",
    quickActions: [
      {
        label: "Cek Kelas",
        section: "administrasi",
        message: "Panel operasional data kelas dibuka.",
      },
      {
        label: "Lihat Tugas",
        section: "tugas",
        message: "Daftar backlog operator dibuka.",
      },
      {
        label: "Buka Notifikasi",
        section: "notifikasi",
        message: "Alert antrean admin dibuka.",
      },
    ],
    tasks: [
      {
        id: "stu-1",
        title: "Impor mahasiswa pindahan",
        course: "Akademik",
        type: "operasional",
        status: "sedang dikerjakan",
        deadline: "2026-04-16",
        priority: "kritis",
        progress: 58,
        note: "Masih menunggu 12 nomor induk dari biro akademik.",
        submissions: [],
        comments: [],
      },
      {
        id: "stu-2",
        title: "Verifikasi kelas SI-4A",
        course: "Prodi SI",
        type: "operasional",
        status: "menunggu review",
        deadline: "2026-04-17",
        priority: "tinggi",
        progress: 77,
        note: "Cek ulang benturan dosen pengampu dan kapasitas kelas.",
        submissions: [],
        comments: [],
      },
      {
        id: "stu-3",
        title: "Reset akun praktikum",
        course: "Layanan user",
        type: "operasional",
        status: "belum mulai",
        deadline: "2026-04-18",
        priority: "tinggi",
        progress: 10,
        note: "Permintaan dari 24 mahasiswa belum diproses batch.",
        submissions: [],
        comments: [],
      },
      {
        id: "stu-4",
        title: "Susun daftar presentasi kelas",
        course: "Akademik",
        type: "operasional",
        status: "sedang dikerjakan",
        deadline: "2026-04-22",
        priority: "sedang",
        progress: 36,
        note: "Menunggu konfirmasi ruang dan jam presentasi dari dosen.",
        submissions: [],
        comments: [],
      },
      {
        id: "stu-5",
        title: "Cek duplikasi KRS",
        course: "Akademik",
        type: "operasional",
        status: "selesai",
        deadline: "2026-04-13",
        priority: "sedang",
        progress: 100,
        note: "Kasus duplikasi sudah ditutup dan log audit lengkap.",
        submissions: [],
        comments: [],
      },
    ],
    projects: [
      {
        id: "sp-1",
        title: "Pembaruan data kelas semester genap",
        course: "Akademik",
        phase: "Validasi",
        progress: 63,
        nextMilestone: "2026-04-18",
        team: "Operator Prodi",
        deliverables: [
          {
            title: "Rekap kelas aktif",
            owner: "Staff TU",
            status: "sedang dikerjakan",
            deadline: "2026-04-17",
          },
          {
            title: "Validasi dosen pengampu",
            owner: "Kaprodi",
            status: "menunggu review",
            deadline: "2026-04-18",
          },
        ],
      },
      {
        id: "sp-2",
        title: "Migrasi template impor CSV",
        course: "Sistem",
        phase: "Penyesuaian format",
        progress: 46,
        nextMilestone: "2026-04-24",
        team: "Operator + IT",
        deliverables: [
          {
            title: "Template mahasiswa",
            owner: "Staff TU",
            status: "selesai",
            deadline: "2026-04-15",
          },
          {
            title: "Template KRS",
            owner: "IT Support",
            status: "sedang dikerjakan",
            deadline: "2026-04-24",
          },
        ],
      },
    ],
    groups: [
      {
        name: "Operator Prodi SI",
        course: "Administrasi",
        mode: "Koordinasi staff TU",
        members: [
          { name: "Ayu", role: "Data kelas" },
          { name: "Rina", role: "Akun" },
          { name: "Budi", role: "KRS" },
        ],
      },
      {
        name: "Koordinasi Fakultas",
        course: "Akademik",
        mode: "Lintas unit",
        members: [
          { name: "Staff TU", role: "Operasional" },
          { name: "Biro Akademik", role: "Validasi NIM" },
        ],
      },
    ],
    notifications: [
      {
        title: "Verifikasi kelas",
        message: "Kelas SI-4A belum final karena dosen pengampu bentrok jam.",
        channel: "In-app",
        time: "15 April 2026, 08.05 WIB",
        kind: "kelas",
      },
      {
        title: "Reset akun menumpuk",
        message: "Batch reset akun praktikum mencapai 24 permintaan.",
        channel: "Email + Telegram",
        time: "15 April 2026, 07.50 WIB",
        kind: "akun",
      },
      {
        title: "Template CSV baru",
        message: "Migrasi template impor CSV butuh review format sebelum dipakai.",
        channel: "In-app",
        time: "14 April 2026, 15.30 WIB",
        kind: "sistem",
      },
    ],
    preferences: [
      {
        key: "inApp",
        label: "Dashboard queue",
        detail: "Antrean layanan operator tampil langsung saat login.",
        enabled: true,
      },
      {
        key: "email",
        label: "Email ringkasan layanan",
        detail: "Kirim laporan tugas administrasi tiap sore.",
        enabled: true,
      },
      {
        key: "telegram",
        label: "Telegram koordinasi",
        detail: "Alert cepat untuk akun dan data kelas yang mendesak.",
        enabled: false,
      },
      {
        key: "h7",
        label: "Trigger H-7",
        detail: "Dipakai untuk aktivitas validasi data besar sebelum deadline.",
        enabled: true,
      },
      {
        key: "h3",
        label: "Trigger H-3",
        detail: "Dipakai untuk antrean reset akun dan kelas belum final.",
        enabled: true,
      },
      {
        key: "h1",
        label: "Trigger H-1",
        detail: "Dipakai saat operasional sangat dekat dengan batas layanan.",
        enabled: true,
      },
    ],
    operations: [
      {
        title: "Impor data mahasiswa",
        detail: "Masuk dari SIAKAD atau file Excel sesuai format kampus.",
        status: "Aktif",
      },
      {
        title: "Pembaruan daftar kelas",
        detail: "Memastikan kelas semester aktif dan pengampu terhubung benar.",
        status: "Aktif",
      },
      {
        title: "Reset akun",
        detail: "Membantu reset akun mahasiswa dan dosen saat ada kendala akses.",
        status: "Aktif",
      },
    ],
    integrations: [
      {
        name: "SIAKAD",
        status: "Aktif",
        note: "Dipakai untuk impor mahasiswa, mata kuliah, dan KRS.",
      },
      {
        name: "Excel Import",
        status: "Aktif",
        note: "Template CSV/XLSX tetap jadi fallback operasional tercepat.",
      },
      {
        name: "Email Server",
        status: "Aktif",
        note: "Dipakai untuk reset akun dan notifikasi administratif.",
      },
    ],
    report: {
      weekly: [
        { label: "M1", done: 10, late: 2 },
        { label: "M2", done: 12, late: 1 },
        { label: "M3", done: 9, late: 2 },
        { label: "M4", done: 13, late: 1 },
      ],
      kpis: [
        {
          title: "Waktu layanan akun",
          detail: "Reset akun selesai maksimal di hari kerja yang sama.",
        },
        {
          title: "Kelas valid",
          detail: "Semua kelas aktif sudah memiliki pengampu dan daftar mahasiswa lengkap.",
        },
        {
          title: "Akurasi impor",
          detail: "Minimalkan duplikasi atau mismatch data setelah batch import.",
        },
      ],
      exports: ["PDF rekap layanan TU", "Excel validasi kelas"],
    },
    authSettings: sharedAuthSettings,
    systemSettings: sharedSystemSettings,
  },
};

export type SeedData = typeof roleData;

export function createSeedData(): SeedData {
  return JSON.parse(JSON.stringify(roleData)) as SeedData;
}
