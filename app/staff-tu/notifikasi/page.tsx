"use client";

import useSWR from "swr";
import type { Notifikasi } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PREFERENCE_DEFAULTS = [
  { key: "email_import", label: "Ringkasan Import", detail: "Kirim ringkasan setelah proses import pengguna selesai.", enabled: true },
  { key: "inapp_backlog", label: "Pengingat Backlog", detail: "Ingatkan saat backlog operasional membutuhkan tindakan.", enabled: true },
  { key: "email_sistem", label: "Info Sistem", detail: "Kirim info maintenance dan pembaruan sistem.", enabled: false },
];
const KIND_CFG: Record<string, { icon: string; bg: string; text: string; label: string }> = {
  DEADLINE: { icon: "🔥", bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400", label: "Deadline" },
  PROGRES: { icon: "📅", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", label: "Progres" },
  INFO: { icon: "✅", bg: "bg-stu-accent/10", text: "text-stu-accent", label: "Info" },
  BROADCAST: { icon: "📢", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", label: "Broadcast" },
  SISTEM: { icon: "⚙️", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", label: "Sistem" },
};

export default function StaffTUNotifikasiPage() {
  const { data: notificationData, mutate: mutateNotifications } = useSWR<{ notifikasi?: Notifikasi[] }>("/api/notifikasi", fetcher);
  const { data: preferenceData, mutate: mutatePreferences } = useSWR<{ preferences?: Record<string, boolean> }>("/api/users/preferences", fetcher);
  const notifications = notificationData?.notifikasi ?? [];
  const preferences = preferenceData?.preferences ?? {};

  async function markRead(id: string) {
    await fetch(`/api/notifikasi/${id}`, { method: "PATCH" });
    mutateNotifications();
  }

  async function togglePreference(key: string) {
    const next = { ...preferences, [key]: !(preferences[key] ?? PREFERENCE_DEFAULTS.find((item) => item.key === key)?.enabled) };
    mutatePreferences({ preferences: next }, false);
    const response = await fetch("/api/users/preferences", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
    if (!response.ok) mutatePreferences();
  }

  return (
    <div className="flex flex-col gap-6">
      <div><div className="text-[11px] text-stu-muted uppercase tracking-[0.1em] mb-0.5">Modul</div><div className="font-serif text-[22px] text-stu-text">Notifikasi &amp; Antrean</div></div>
      <div className="bg-stu-surface border border-stu-border rounded-[14px] max-w-2xl">
        {notifications.length === 0 ? <div className="p-6 text-center text-[13px] text-stu-muted">Belum ada notifikasi.</div> : notifications.map((notification, index) => {
          const config = KIND_CFG[notification.jenis] ?? KIND_CFG.INFO;
          return <div key={notification.id} className={`flex gap-3.5 p-4 items-start ${index < notifications.length - 1 ? "border-b border-stu-border" : ""} ${notification.statusBaca ? "opacity-60" : ""}`}>
            <div className={`w-[38px] h-[38px] rounded-[10px] ${config.bg} ${config.text} flex items-center justify-center text-[18px] shrink-0`}>{config.icon}</div>
            <div className="flex-1 min-w-0"><div className="flex items-start gap-2 mb-0.5"><div className="text-[13.5px] font-semibold text-stu-text flex-1">{notification.judul}</div><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${config.bg} ${config.text}`}>{config.label}</span></div><div className="text-[12px] text-stu-muted mt-0.5 leading-relaxed">{notification.pesan}</div><div className="flex items-center gap-3 mt-2"><span className="text-[11px] text-stu-muted">{new Date(notification.waktuKirim).toLocaleString("id-ID")}</span>{!notification.statusBaca && <button onClick={() => markRead(notification.id)} className="text-[11px] text-stu-accent hover:underline">Tandai dibaca</button>}</div></div>
            {!notification.statusBaca && <div className="w-2 h-2 rounded-full bg-stu-accent shrink-0 mt-2" />}
          </div>;
        })}
      </div>
      <div><div className="text-[14px] font-semibold text-stu-text mb-3">⚙️ Preferensi Notifikasi</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">{PREFERENCE_DEFAULTS.map((preference) => { const enabled = preferences[preference.key] ?? preference.enabled; return <div key={preference.key} className="bg-stu-surface border border-stu-border rounded-[14px] p-4 flex items-start gap-3"><button onClick={() => togglePreference(preference.key)} className={`w-9 h-5 rounded-full relative flex items-center transition-colors shrink-0 mt-0.5 border ${enabled ? "bg-stu-accent border-stu-accent" : "bg-stu-border border-stu-border"}`}><div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm absolute transition-all ${enabled ? "right-[3px]" : "left-[3px]"}`} /></button><div className="flex-1 min-w-0"><div className="text-[13px] font-medium text-stu-text">{preference.label}</div><div className="text-[11px] text-stu-muted mt-0.5 leading-relaxed">{preference.detail}</div></div></div>; })}</div></div>
    </div>
  );
}
