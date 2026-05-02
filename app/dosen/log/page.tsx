"use client";

import { useState, useEffect } from "react";
import { getActivityLog, KIND_LABELS, KIND_ICONS, type ActivityEntry } from "@/lib/activityLog";

function relTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} mnt lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return `${Math.floor(hrs / 24)} hari lalu`;
}

export default function DosenLogPage() {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    setEntries(getActivityLog());
  }, []);

  const kinds = ["semua", "status_changed", "submission_added", "comment_added", "grade_given"];
  const filtered = filter === "semua" ? entries : entries.filter(e => e.kind === filter);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-ink">
          Log <span className="text-forest">Aktivitas</span>
        </div>
        <div className="text-[13px] text-muted mt-1">Histori aktivitas mahasiswa pada semua tugas.</div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {kinds.map(k => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              filter === k
                ? "bg-forest text-white"
                : "bg-paper border border-border text-muted hover:text-ink"
            }`}
          >
            {k === "semua" ? "Semua" : (KIND_ICONS[k as keyof typeof KIND_ICONS] ?? "") + " " + (KIND_LABELS[k as keyof typeof KIND_LABELS] ?? k)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-paper border border-border rounded-[12px] p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <div className="font-semibold text-ink">Belum ada aktivitas</div>
          <div className="text-[13px] text-muted mt-1">
            Log akan muncul saat mahasiswa mengubah status, mengumpulkan tugas, atau menambah komentar.
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-0">
            {filtered.map((entry, i) => (
              <div key={entry.id} className={`flex gap-4 pl-10 relative ${i > 0 ? "pt-4" : ""}`}>
                <div className="absolute left-[10px] top-1 w-[18px] h-[18px] rounded-full bg-paper border-2 border-forest flex items-center justify-center text-[10px]">
                  {KIND_ICONS[entry.kind]}
                </div>
                <div className="flex-1 bg-paper border border-border rounded-[10px] p-4">
                  <div className="flex items-start gap-2 justify-between">
                    <div>
                      <span className="text-[12px] font-semibold text-forest">{KIND_LABELS[entry.kind]}</span>
                      <span className="text-[12px] text-muted ml-2">pada</span>
                      <span className="text-[12px] font-medium text-ink ml-1">{entry.taskTitle}</span>
                    </div>
                    <span className="text-[11px] text-muted shrink-0">{relTime(entry.ts)}</span>
                  </div>
                  <div className="text-[12px] text-muted mt-1">{entry.detail}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-cream text-muted px-2 py-0.5 rounded-full border border-border">{entry.taskCourse}</span>
                    <span className="text-[10px] text-muted">{entry.actor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
