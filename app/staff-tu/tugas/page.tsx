"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const data = createSeedData().staff_tu;

const STATUS_CFG: Record<string, { bg: string; text: string; dot: string }> = {
  "selesai":           { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  "sedang dikerjakan": { bg: "bg-blue-100 dark:bg-blue-900/30",       text: "text-blue-700 dark:text-blue-400",       dot: "bg-blue-500" },
  "menunggu review":   { bg: "bg-amber-100 dark:bg-amber-900/30",     text: "text-amber-700 dark:text-amber-400",     dot: "bg-amber-500" },
  "belum mulai":       { bg: "bg-slate-100 dark:bg-slate-800",        text: "text-slate-600 dark:text-slate-400",     dot: "bg-slate-400" },
};

export default function StaffTUTugasPage() {
  const [filter, setFilter] = useState("semua");
  const filters = ["semua", "belum mulai", "sedang dikerjakan", "menunggu review", "selesai"];
  const tasks = filter === "semua" ? data.tasks : data.tasks.filter(t => t.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-stu-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-stu-text">
          Backlog <span className="text-stu-accent">Operator</span>
        </div>
        <div className="text-[13px] text-stu-muted mt-1">{tasks.length} item {filter !== "semua" ? `— ${filter}` : ""}</div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all capitalize ${
              filter === f
                ? "bg-stu-accent text-white"
                : "bg-stu-surface border border-stu-border text-stu-muted hover:text-stu-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-stu-surface border border-stu-border rounded-[12px] p-12 text-center text-stu-muted">
          <div className="text-4xl mb-3">📭</div>
          <div className="font-semibold text-stu-text">Tidak ada backlog</div>
          <div className="text-[13px] mt-1">Tidak ada item dengan status &ldquo;{filter}&rdquo;.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map(task => {
            const cfg = STATUS_CFG[task.status] ?? STATUS_CFG["belum mulai"];
            const daysLeft = Math.ceil((new Date(task.deadline).getTime() - Date.now()) / 86400000);
            return (
              <div key={task.id} className="bg-stu-surface border border-stu-border rounded-[12px] p-5">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <div className="text-[15px] font-semibold text-stu-text flex-1">{task.title}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-[12px] text-stu-muted">{task.course}</span>
                      <span className="text-[11px] text-stu-muted">•</span>
                      <span className={`text-[12px] ${daysLeft < 0 ? "text-rose-500" : daysLeft <= 2 ? "text-amber-500" : "text-stu-muted"}`}>
                        {daysLeft < 0 ? `Terlambat ${Math.abs(daysLeft)} hari` : `${daysLeft} hari lagi`}
                      </span>
                    </div>
                    {task.note && (
                      <div className="text-[12px] text-stu-muted mt-2 bg-stu-card border border-stu-border rounded-lg px-3 py-2">
                        {task.note}
                      </div>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-stu-border rounded-full overflow-hidden">
                        <div className="h-full bg-stu-accent rounded-full" style={{ width: `${task.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-mono text-stu-muted w-8 text-right">{task.progress}%</span>
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
