"use client";

import { createSeedData } from "@/data/sim-data";
import { useNotifStore } from "@/lib/notifStore";

const data = createSeedData().mahasiswa;

const KIND_CONFIG = {
  deadline: {
    icon: "🔥",
    bg: "bg-mhs-rose/15",
    color: "text-mhs-rose",
    label: "Deadline",
    labelCls: "bg-mhs-rose/15 text-mhs-rose",
  },
  progres: {
    icon: "📅",
    bg: "bg-mhs-amber/15",
    color: "text-mhs-amber",
    label: "Progres",
    labelCls: "bg-mhs-amber/15 text-mhs-amber",
  },
  review: {
    icon: "⚠️",
    bg: "bg-mhs-purple/15",
    color: "text-mhs-purple",
    label: "Review",
    labelCls: "bg-mhs-purple/15 text-mhs-purple",
  },
  info: {
    icon: "✅",
    bg: "bg-mhs-green/15",
    color: "text-mhs-green",
    label: "Info",
    labelCls: "bg-mhs-green/15 text-mhs-green",
  },
};

const CHANNEL_ICON = {
  "In-app + Email": "📧",
  "Telegram": "💬",
  "In-app": "🔔",
  "Email": "📩",
};

export default function NotifikasiPage() {
  const { readIds, markRead, togglePref, getPrefs } = useNotifStore("mahasiswa");
  const prefs = getPrefs(data.preferences);
  const unread = data.notifications.filter((_, i) => !readIds.includes(`mahasiswa-notif-${i}`)).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[22px] text-mhs-text">Notifikasi & Pengingat</div>
        </div>
        {unread > 0 && (
          <span className="text-[12px] bg-mhs-rose/10 text-mhs-rose font-semibold px-3 py-1 rounded-full border border-mhs-rose/20">
            {unread} belum dibaca
          </span>
        )}
      </div>

      {/* NOTIFICATION LIST */}
      <div className="bg-mhs-card border border-mhs-border rounded-[14px] max-w-2xl">
        {data.notifications.map((notif, i) => {
          const cfg = KIND_CONFIG[notif.kind as keyof typeof KIND_CONFIG] ?? KIND_CONFIG.info;
          const isRead = readIds.includes(`mahasiswa-notif-${i}`);
          const isLast = i === data.notifications.length - 1;
          return (
            <div
              key={i}
              className={`flex gap-3.5 p-4 items-start ${!isLast ? "border-b border-mhs-border" : ""} ${isRead ? "opacity-60" : ""} transition-opacity`}
            >
              <div className={`w-[38px] h-[38px] rounded-[10px] ${cfg.bg} ${cfg.color} flex items-center justify-center text-[18px] shrink-0`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <div className="text-[13.5px] font-semibold text-mhs-text flex-1">{notif.title}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${cfg.labelCls}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="text-[12px] text-mhs-muted mt-0.5 leading-relaxed">{notif.message}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-mhs-muted">
                    {CHANNEL_ICON[notif.channel as keyof typeof CHANNEL_ICON] ?? "📢"} {notif.channel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-mhs-muted/40" />
                  <span className="text-[11px] text-mhs-muted">{notif.time}</span>
                  {!isRead && (
                    <button
                      onClick={() => markRead(`mahasiswa-notif-${i}`)}
                      className="text-[11px] text-mhs-amber hover:underline ml-auto"
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>
              </div>
              {!isRead && <div className="w-2 h-2 rounded-full bg-mhs-rose shrink-0 mt-2 animate-pulse" />}
            </div>
          );
        })}
      </div>

      {/* PREFERENCES */}
      <div>
        <div className="text-[14px] font-semibold text-mhs-text mb-3">⚙️ Preferensi Notifikasi</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {prefs.map(pref => (
            <div
              key={pref.key}
              className="bg-mhs-card border border-mhs-border rounded-[14px] p-4 flex items-start gap-3"
            >
              <button
                onClick={() => togglePref("mahasiswa", pref.key)}
                className={`w-9 h-5 rounded-full relative flex items-center transition-colors shrink-0 mt-0.5 border ${
                  pref.enabled ? "bg-mhs-teal border-mhs-teal" : "bg-mhs-border border-mhs-border"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute transition-all ${pref.enabled ? "right-[3px]" : "left-[3px]"}`} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-mhs-text">{pref.label}</div>
                <div className="text-[11px] text-mhs-muted mt-0.5 leading-relaxed">{pref.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTEGRATIONS */}
      <div>
        <div className="text-[14px] font-semibold text-mhs-text mb-3">🔗 Status Integrasi</div>
        <div className="flex flex-col gap-2.5 max-w-2xl">
          {data.integrations.map((integ, i) => (
            <div key={i} className="bg-mhs-card border border-mhs-border rounded-[14px] p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mhs-green shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-mhs-text">{integ.name}</div>
                <div className="text-[11px] text-mhs-muted mt-0.5">{integ.note}</div>
              </div>
              <span className="text-[11px] text-mhs-muted shrink-0 text-right max-w-[160px]">{integ.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
