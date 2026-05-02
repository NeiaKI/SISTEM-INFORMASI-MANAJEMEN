"use client";

import { createSeedData } from "@/data/sim-data";
import { useNotifStore } from "@/lib/notifStore";

const data = createSeedData().staff_tu;

const KIND_CFG: Record<string, { icon: string; bg: string; text: string; label: string }> = {
  deadline: { icon: "🔥", bg: "bg-rose-100 dark:bg-rose-900/30",    text: "text-rose-600 dark:text-rose-400",    label: "Deadline" },
  progres:  { icon: "📅", bg: "bg-amber-100 dark:bg-amber-900/30",  text: "text-amber-600 dark:text-amber-400",  label: "Progres" },
  info:     { icon: "✅", bg: "bg-stu-accent/10",                   text: "text-stu-accent",                     label: "Info" },
  review:   { icon: "⚠️", bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-600 dark:text-blue-400",    label: "Review" },
};

export default function StaffTUNotifikasiPage() {
  const { readIds, markRead, togglePref, getPrefs } = useNotifStore("staff_tu");
  const prefs = getPrefs(data.preferences);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-stu-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-stu-text">Notifikasi &amp; Antrean</div>
      </div>

      <div className="bg-stu-surface border border-stu-border rounded-[14px] max-w-2xl">
        {data.notifications.map((notif, i) => {
          const cfg = KIND_CFG[notif.kind] ?? KIND_CFG.info;
          const isRead = readIds.includes(`staff_tu-notif-${i}`);
          const isLast = i === data.notifications.length - 1;
          return (
            <div
              key={i}
              className={`flex gap-3.5 p-4 items-start ${!isLast ? "border-b border-stu-border" : ""} ${isRead ? "opacity-60" : ""}`}
            >
              <div className={`w-[38px] h-[38px] rounded-[10px] ${cfg.bg} ${cfg.text} flex items-center justify-center text-[18px] shrink-0`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <div className="text-[13.5px] font-semibold text-stu-text flex-1">{notif.title}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                </div>
                <div className="text-[12px] text-stu-muted mt-0.5 leading-relaxed">{notif.message}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-stu-muted">{notif.time}</span>
                  {!isRead && (
                    <button onClick={() => markRead(`staff_tu-notif-${i}`)} className="text-[11px] text-stu-accent hover:underline">
                      Tandai dibaca
                    </button>
                  )}
                </div>
              </div>
              {!isRead && <div className="w-2 h-2 rounded-full bg-stu-accent shrink-0 mt-2" />}
            </div>
          );
        })}
      </div>

      <div>
        <div className="text-[14px] font-semibold text-stu-text mb-3">⚙️ Preferensi Notifikasi</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {prefs.map(pref => (
            <div key={pref.key} className="bg-stu-surface border border-stu-border rounded-[14px] p-4 flex items-start gap-3">
              <button
                onClick={() => togglePref("staff_tu", pref.key)}
                className={`w-9 h-5 rounded-full relative flex items-center transition-colors shrink-0 mt-0.5 border ${
                  pref.enabled ? "bg-stu-accent border-stu-accent" : "bg-stu-border border-stu-border"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute transition-all ${pref.enabled ? "right-[3px]" : "left-[3px]"}`} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-stu-text">{pref.label}</div>
                <div className="text-[11px] text-stu-muted mt-0.5 leading-relaxed">{pref.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
