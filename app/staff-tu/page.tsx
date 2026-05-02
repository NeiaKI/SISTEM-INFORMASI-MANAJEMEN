"use client";

import { createSeedData } from "@/data/sim-data";
import Link from "next/link";

const data = createSeedData().staff_tu;

const STAT_CARDS = [
  { icon: "📂", label: "Backlog Aktif", value: String(data.tasks.filter(t => t.status !== "selesai").length), sub: `${data.tasks.filter(t => t.status === "selesai").length} selesai`, color: "bg-stu-accent/10 text-stu-accent" },
  { icon: "🎓", label: "Kelas Dikelola", value: "12", sub: "Semester Genap 2025/2026", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400" },
  { icon: "🔄", label: "Reset Akun Pending", value: "24", sub: "menunggu diproses batch", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  { icon: "✅", label: "Data Valid", value: "98%", sub: "dari total record semester", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
];

const STATUS_COLORS: Record<string, string> = {
  "selesai":           "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "sedang dikerjakan": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "menunggu review":   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "belum mulai":       "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function StaffTUDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-stu-muted uppercase tracking-[0.1em] mb-0.5">Selamat Datang</div>
        <div className="font-serif text-[24px] text-stu-text">
          Dashboard <span className="text-stu-accent">Staff TU</span>
        </div>
        <div className="text-[13px] text-stu-muted mt-1">{data.dashboardLead}</div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card, i) => (
          <div key={i} className="bg-stu-surface border border-stu-border rounded-xl p-5 hover:-translate-y-[2px] transition-transform">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3.5 ${card.color}`}>
              {card.icon}
            </div>
            <div className="font-serif text-[32px] leading-none text-stu-text">{card.value}</div>
            <div className="text-[12px] text-stu-muted mt-1">{card.label}</div>
            <div className="text-[11px] mt-2 text-stu-accent font-medium">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Backlog */}
        <div className="bg-stu-surface border border-stu-border rounded-[14px] overflow-hidden">
          <div className="px-5 py-4 border-b border-stu-border flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-stu-text">📋 Backlog Terbaru</h3>
            <Link href="/staff-tu/tugas" className="text-[12px] text-stu-accent hover:underline">Lihat semua</Link>
          </div>
          <div className="divide-y divide-stu-border">
            {data.tasks.slice(0, 4).map(task => (
              <div key={task.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-stu-text truncate">{task.title}</div>
                  <div className="text-[11px] text-stu-muted mt-0.5">{task.course}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[task.status] ?? ""}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-stu-surface border border-stu-border rounded-[14px] overflow-hidden">
          <div className="px-5 py-4 border-b border-stu-border">
            <h3 className="text-[14px] font-semibold text-stu-text">⚡ Aksi Cepat</h3>
            <div className="text-[12px] text-stu-muted mt-0.5">{data.supportFocus}</div>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {data.quickActions.map((action, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-stu-card border border-stu-border rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-stu-accent/10 flex items-center justify-center text-stu-accent text-[15px]">
                  {i === 0 ? "🏫" : i === 1 ? "📋" : "🔔"}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-stu-text">{action.label}</div>
                  <div className="text-[11px] text-stu-muted">{action.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification preview */}
      <div className="bg-stu-surface border border-stu-border rounded-[14px] overflow-hidden">
        <div className="px-5 py-4 border-b border-stu-border flex items-center justify-between">
          <h3 className="text-[14px] font-semibold text-stu-text">🔔 Notifikasi Terbaru</h3>
          <Link href="/staff-tu/notifikasi" className="text-[12px] text-stu-accent hover:underline">Lihat semua</Link>
        </div>
        <div className="divide-y divide-stu-border">
          {data.notifications.slice(0, 3).map((notif, i) => (
            <div key={i} className="px-5 py-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stu-accent/10 flex items-center justify-center text-[14px] shrink-0">
                {notif.kind === "deadline" ? "🔥" : notif.kind === "info" ? "✅" : "📋"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-stu-text">{notif.title}</div>
                <div className="text-[11px] text-stu-muted mt-0.5">{notif.message}</div>
                <div className="text-[10px] text-stu-muted mt-1">{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
