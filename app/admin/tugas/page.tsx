"use client";

import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const filters = ["semua", "belum mulai", "sedang dikerjakan", "menunggu review", "selesai"];
const STATUS_CFG: Record<string, { bg: string; text: string; dot: string }> = {
  selesai: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "sedang dikerjakan": {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  "menunggu review": {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  "belum mulai": {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
  },
};

interface OperationalTask {
  id: string;
  title: string;
  course: string;
  status: string;
  priority: string;
  progress: number;
  deadline: string;
}

export default function AdminTugasPage() {
  const [filter, setFilter] = useState("semua");
  const { data, isLoading } = useSWR<{ tasks?: OperationalTask[] }>(
    "/api/admin/dashboard",
    fetcher
  );
  const allTasks = data?.tasks ?? [];
  const tasks = filter === "semua" ? allTasks : allTasks.filter((task) => task.status === filter);

  if (isLoading)
    return (
      <div className="text-adm-muted flex h-[400px] items-center justify-center">
        Memuat data...
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-adm-muted mb-0.5 text-[11px] tracking-[0.1em] uppercase">Modul</div>
        <div className="text-adm-text font-serif text-[22px]">
          Backlog <span className="text-adm-accent">Operasional</span>
        </div>
        <div className="text-adm-muted mt-1 text-[13px]">
          {tasks.length} item {filter !== "semua" ? `— ${filter}` : "aktif"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold capitalize transition-all ${filter === value ? "bg-adm-accent text-white" : "bg-adm-surface border-adm-border text-adm-muted hover:text-adm-text border"}`}
          >
            {value}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-adm-surface border-adm-border text-adm-muted rounded-[12px] border p-12 text-center">
          <div className="mb-3 text-4xl">📭</div>
          <div className="text-adm-text font-semibold">Tidak ada tugas</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => {
            const cfg = STATUS_CFG[task.status] ?? STATUS_CFG["belum mulai"];
            const daysLeft = Math.ceil((new Date(task.deadline).getTime() - Date.now()) / 86400000);
            return (
              <div
                key={task.id}
                className="bg-adm-surface border-adm-border rounded-[12px] border p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${cfg.dot}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start gap-2">
                      <div className="text-adm-text flex-1 text-[15px] font-semibold">
                        {task.title}
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <span className="text-adm-muted text-[12px]">{task.course}</span>
                      <span className="text-adm-muted text-[11px]">•</span>
                      <span className="text-adm-muted text-[12px] font-medium capitalize">
                        {task.priority}
                      </span>
                      <span className="text-adm-muted text-[11px]">•</span>
                      <span
                        className={`text-[12px] ${daysLeft < 0 ? "text-rose-500" : daysLeft <= 2 ? "text-amber-500" : "text-adm-muted"}`}
                      >
                        {daysLeft < 0
                          ? `Terlambat ${Math.abs(daysLeft)} hari`
                          : `${daysLeft} hari lagi`}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="bg-adm-border h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-adm-accent h-full rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-adm-muted w-8 text-right font-mono text-[11px]">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
