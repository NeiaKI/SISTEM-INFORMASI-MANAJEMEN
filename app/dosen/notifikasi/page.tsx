"use client";

import { createSeedData } from "@/data/sim-data";
import { useNotifStore } from "@/lib/notifStore";

const data = createSeedData().dosen;

const KIND_CONFIG = {
  review:  { icon: "⚠️", bg: "bg-rose/10",    color: "text-rose",   label: "Review",      labelCls: "bg-rose/10 text-rose" },
  progres: { icon: "📅", bg: "bg-gold/10",    color: "text-gold",   label: "Progres",     labelCls: "bg-gold/15 text-gold" },
  deadline:{ icon: "🔥", bg: "bg-rose/10",    color: "text-rose",   label: "Deadline",    labelCls: "bg-rose/10 text-rose" },
  info:    { icon: "✅", bg: "bg-forest/10",  color: "text-forest", label: "Info",        labelCls: "bg-forest/10 text-forest" },
};

const STATIC_NOTIFS = [
  { icon: "📥", bg: "bg-gold/10", color: "text-gold", label: "Pengumpulan", labelCls: "bg-gold/15 text-gold",
    title: "3 tugas baru dikumpulkan mahasiswa", message: "Laporan Praktikum Sorting · Pemrograman Lanjut", time: "Baru saja" },
  { icon: "⏰", bg: "bg-rose/10", color: "text-rose", label: "Deadline", labelCls: "bg-rose/10 text-rose",
    title: 'Deadline "ERD Perpustakaan" besok', message: "18 mahasiswa belum mengumpulkan · Basis Data", time: "2 jam lalu" },
  { icon: "✅", bg: "bg-forest/10", color: "text-forest", label: "Info", labelCls: "bg-forest/10 text-forest",
    title: "Nilai Quiz Algoritma berhasil disimpan", message: "34/36 mahasiswa dinilai · Pemrograman Lanjut", time: "Kemarin" },
];

export default function DosenNotifikasiPage() {
  const { readIds, markRead, togglePref, getPrefs } = useNotifStore("dosen");
  const prefs = getPrefs(data.preferences);

  const allNotifs = [
    ...STATIC_NOTIFS.map((n, i) => ({ ...n, key: `dosen-notif-${i}` })),
    ...data.notifications.map((n, i) => {
      const cfg = KIND_CONFIG[n.kind as keyof typeof KIND_CONFIG] ?? KIND_CONFIG.info;
      return { ...cfg, title: n.title, message: n.message, time: n.time, key: `dosen-notif-${STATIC_NOTIFS.length + i}` };
    }),
  ];

  const unread = allNotifs.filter(n => !readIds.includes(n.key)).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Notifikasi</div>
        </div>
        {unread > 0 && (
          <span className="text-[12px] bg-rose/10 text-rose font-semibold px-3 py-1 rounded-full border border-rose/20">
            {unread} belum dibaca
          </span>
        )}
      </div>

      <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] max-w-2xl">
        {allNotifs.map((notif, i) => {
          const isRead = readIds.includes(notif.key);
          const isLast = i === allNotifs.length - 1;
          return (
            <div
              key={notif.key}
              className={`flex gap-3.5 p-4 items-start ${!isLast ? "border-b border-border/60" : ""} ${isRead ? "opacity-60" : ""} transition-opacity`}
            >
              <div className={`w-[38px] h-[38px] rounded-[10px] ${notif.bg} ${notif.color} flex items-center justify-center text-[18px] shrink-0`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <div className="text-[13.5px] font-semibold text-ink flex-1">{notif.title}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${notif.labelCls}`}>{notif.label}</span>
                </div>
                <div className="text-[12px] text-muted mt-0.5 leading-relaxed">{notif.message}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] text-muted">{notif.time}</span>
                  {!isRead && (
                    <button onClick={() => markRead(notif.key)} className="text-[11px] text-forest hover:underline">
                      Tandai dibaca
                    </button>
                  )}
                </div>
              </div>
              {!isRead && <div className="w-2 h-2 rounded-full bg-rose shrink-0 mt-2 animate-pulse" />}
            </div>
          );
        })}
      </div>

      <div>
        <div className="text-[14px] font-semibold text-ink mb-3">⚙️ Preferensi Notifikasi</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {prefs.map(pref => (
            <div key={pref.key} className="bg-paper border-[1.5px] border-border rounded-[14px] p-4 flex items-start gap-3 shadow-[0_1px_4px_rgba(26,26,20,0.04)]">
              <button
                onClick={() => togglePref("dosen", pref.key)}
                className={`w-9 h-5 rounded-full relative flex items-center transition-colors shrink-0 mt-0.5 border ${
                  pref.enabled ? "bg-forest border-forest" : "bg-border border-border"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute transition-all ${pref.enabled ? "right-[3px]" : "left-[3px]"}`} />
              </button>
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
