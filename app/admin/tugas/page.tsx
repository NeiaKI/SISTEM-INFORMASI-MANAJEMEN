"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const data = createSeedData().admin;

const STATUS_CFG: Record<string, { bg: string; text: string; dot: string }> = {
  "selesai":           { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  "sedang dikerjakan": { bg: "bg-blue-100 dark:bg-blue-900/30",       text: "text-blue-700 dark:text-blue-400",       dot: "bg-blue-500" },
  "menunggu review":   { bg: "bg-amber-100 dark:bg-amber-900/30",     text: "text-amber-700 dark:text-amber-400",     dot: "bg-amber-500" },
  "belum mulai":       { bg: "bg-slate-100 dark:bg-slate-800",        text: "text-slate-600 dark:text-slate-400",     dot: "bg-slate-400" },
};

const PRIORITY_CFG: Record<string, string> = {
  "kritis": "text-rose-600 dark:text-rose-400",
  "tinggi": "text-amber-600 dark:text-amber-400",
  "sedang": "text-blue-600 dark:text-blue-400",
  "rendah": "text-slate-500",
};

export default function AdminTugasPage() {
  const [filter, setFilter] = useState("semua");
  const filters = ["semua", "belum mulai", "sedang dikerjakan", "menunggu review", "selesai"];
  const tasks = filter === "semua" ? data.tasks : data.tasks.filter(t => t.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-adm-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-adm-text">
          Backlog <span className="text-adm-accent">Operasional</span>
        </div>
        <div className="text-[13px] text-adm-muted mt-1">{tasks.length} item {filter !== "semua" ? `— ${filter}` : "aktif"}</div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all capitalize ${
              filter === f
                ? "bg-adm-accent text-white"
                : "bg-adm-surface border border-adm-border text-adm-muted hover:text-adm-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-adm-surface border border-adm-border rounded-[12px] p-12 text-center text-adm-muted">
          <div className="text-4xl mb-3">📭</div>
          <div className="font-semibold text-adm-text">Tidak ada tugas</div>
          <div className="text-[13px] mt-1">Tidak ada item dengan status &ldquo;{filter}&rdquo;.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map(task => {
            const cfg = STATUS_CFG[task.status] ?? STATUS_CFG["belum mulai"];
            const daysLeft = Math.ceil((new Date(task.deadline).getTime() - Date.now()) / 86400000);
            return (
              <div key={task.id} className="bg-adm-surface border border-adm-border rounded-[12px] p-5">
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <div className="text-[15px] font-semibold text-adm-text flex-1">{task.title}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-[12px] text-adm-muted">{task.course}</span>
                      <span className="text-[11px] text-adm-muted">•</span>
                      <span className={`text-[12px] font-medium capitalize ${PRIORITY_CFG[task.priority] ?? ""}`}>
                        {task.priority}
                      </span>
                      <span className="text-[11px] text-adm-muted">•</span>
                      <span className={`text-[12px] ${daysLeft < 0 ? "text-rose-500" : daysLeft <= 2 ? "text-amber-500" : "text-adm-muted"}`}>
                        {daysLeft < 0 ? `Terlambat ${Math.abs(daysLeft)} hari` : `${daysLeft} hari lagi`}
                      </span>
                    </div>
                    {task.note && (
                      <div className="text-[12px] text-adm-muted mt-2 bg-adm-card border border-adm-border rounded-lg px-3 py-2">
                        {task.note}
                      </div>
                    )}
                    {/* Progress bar */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-adm-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-adm-accent rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-adm-muted w-8 text-right">{task.progress}%</span>
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
