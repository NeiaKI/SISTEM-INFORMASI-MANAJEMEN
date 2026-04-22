import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const KIND_CONFIG = {
  review: {
    icon: "⚠️",
    bg: "bg-rose/10",
    color: "text-rose",
    label: "Review",
    labelCls: "bg-rose/10 text-rose",
  },
  progres: {
    icon: "📅",
    bg: "bg-gold/10",
    color: "text-gold",
    label: "Progres",
    labelCls: "bg-gold/15 text-gold",
  },
  deadline: {
    icon: "🔥",
    bg: "bg-rose/10",
    color: "text-rose",
    label: "Deadline",
    labelCls: "bg-rose/10 text-rose",
  },
  info: {
    icon: "✅",
    bg: "bg-forest/10",
    color: "text-forest",
    label: "Info",
    labelCls: "bg-forest/10 text-forest",
  },
};

const STATIC_NOTIFS = [
  {
    icon: "📥",
    bg: "bg-gold/10",
    color: "text-gold",
    label: "Pengumpulan",
    labelCls: "bg-gold/15 text-gold",
    title: "3 tugas baru dikumpulkan mahasiswa",
    message: "Laporan Praktikum Sorting · Pemrograman Lanjut",
    time: "Baru saja",
    read: false,
  },
  {
    icon: "⏰",
    bg: "bg-rose/10",
    color: "text-rose",
    label: "Deadline",
    labelCls: "bg-rose/10 text-rose",
    title: 'Deadline "ERD Perpustakaan" besok',
    message: "18 mahasiswa belum mengumpulkan · Basis Data",
    time: "2 jam lalu",
    read: false,
  },
  {
    icon: "✅",
    bg: "bg-forest/10",
    color: "text-forest",
    label: "Info",
    labelCls: "bg-forest/10 text-forest",
    title: "Nilai Quiz Algoritma berhasil disimpan",
    message: "34/36 mahasiswa dinilai · Pemrograman Lanjut",
    time: "Kemarin",
    read: true,
  },
];

export default function DosenNotifikasiPage() {
  const allNotifs = [
    ...STATIC_NOTIFS,
    ...data.notifications.map(n => {
      const cfg = KIND_CONFIG[n.kind as keyof typeof KIND_CONFIG] ?? KIND_CONFIG.info;
      return {
        icon: cfg.icon,
        bg: cfg.bg,
        color: cfg.color,
        label: cfg.label,
        labelCls: cfg.labelCls,
        title: n.title,
        message: n.message,
        time: n.time,
        read: false,
      };
    }),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[24px] text-ink">Notifikasi</div>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] max-w-2xl">
        {allNotifs.map((notif, i) => {
          const isLast = i === allNotifs.length - 1;
          return (
            <div
              key={i}
              className={`flex gap-3.5 p-4 items-start ${!isLast ? "border-b border-border/60" : ""} ${notif.read ? "opacity-60" : ""}`}
            >
              <div className={`w-[38px] h-[38px] rounded-[10px] ${notif.bg} ${notif.color} flex items-center justify-center text-[18px] shrink-0`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <div className="text-[13.5px] font-semibold text-ink flex-1">{notif.title}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${notif.labelCls}`}>
                    {notif.label}
                  </span>
                </div>
                <div className="text-[12px] text-muted mt-0.5 leading-relaxed">{notif.message}</div>
                <div className="text-[11px] text-muted mt-1.5">{notif.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PREFERENCES */}
      <div>
        <div className="text-[14px] font-semibold text-ink mb-3">⚙️ Preferensi Notifikasi</div>
        <div className="grid grid-cols-2 gap-3 max-w-2xl">
          {data.preferences.map(pref => (
            <div
              key={pref.key}
              className="bg-paper border-[1.5px] border-border rounded-[14px] p-4 flex items-start gap-3 shadow-[0_1px_4px_rgba(26,26,20,0.04)]"
            >
              <div className={`w-9 h-5 rounded-full relative flex items-center transition-colors shrink-0 mt-0.5 border ${pref.enabled ? "bg-forest border-forest" : "bg-border border-border"}`}>
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute transition-all ${pref.enabled ? "right-[3px]" : "left-[3px]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-ink">{pref.label}</div>
                <div className="text-[11px] text-muted mt-0.5 leading-relaxed">{pref.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
