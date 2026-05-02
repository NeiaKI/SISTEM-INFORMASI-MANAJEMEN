"use client";

import { useState, useEffect } from "react";
import { getActivityLog, clearActivityLog, KIND_LABELS, KIND_ICONS, type ActivityEntry } from "@/lib/activityLog";

function relTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} mnt lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return `${Math.floor(hrs / 24)} hari lalu`;
}

export default function LogAktivitasPage() {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    setEntries(getActivityLog());
  }, []);

  const kinds = ["semua", "status_changed", "submission_added", "comment_added", "link_added"];
  const filtered = filter === "semua" ? entries : entries.filter(e => e.kind === filter);

  const handleClear = () => {
    clearActivityLog();
    setEntries([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[22px] text-mhs-text">
            Log <span className="text-mhs-amber">Aktivitas</span>
          </div>
          <div className="text-[13px] text-mhs-muted mt-1">
            Histori semua perubahan status, pengumpulan, dan komentar.
          </div>
        </div>
        {entries.length > 0 && (
          <button
            onClick={handleClear}
            className="text-[12px] text-mhs-rose border border-mhs-rose/30 px-3 py-1.5 rounded-lg hover:bg-mhs-rose/10 transition-colors"
          >
            Hapus semua log
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {kinds.map(k => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              filter === k
                ? "bg-mhs-amber text-white"
                : "bg-mhs-card border border-mhs-border text-mhs-muted hover:text-mhs-text"
            }`}
          >
            {k === "semua" ? "Semua" : (KIND_ICONS[k as keyof typeof KIND_ICONS] ?? "") + " " + (KIND_LABELS[k as keyof typeof KIND_LABELS] ?? k)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-mhs-card border border-mhs-border rounded-[12px] p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <div className="font-semibold text-mhs-text">Belum ada aktivitas</div>
          <div className="text-[13px] text-mhs-muted mt-1">
            Log akan muncul saat kamu mengubah status tugas, mengumpulkan file, atau menambah komentar.
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-mhs-border" />
          <div className="flex flex-col gap-0">
            {filtered.map((entry, i) => (
              <div key={entry.id} className={`flex gap-4 pl-10 relative ${i > 0 ? "pt-4" : ""}`}>
                <div className="absolute left-[10px] top-1 w-[18px] h-[18px] rounded-full bg-mhs-card border-2 border-mhs-amber flex items-center justify-center text-[10px]">
                  {KIND_ICONS[entry.kind]}
                </div>
                <div className="flex-1 bg-mhs-card border border-mhs-border rounded-[10px] p-4">
                  <div className="flex items-start gap-2 justify-between">
                    <div>
                      <span className="text-[12px] font-semibold text-mhs-amber">{KIND_LABELS[entry.kind]}</span>
                      <span className="text-[12px] text-mhs-muted ml-2">pada</span>
                      <span className="text-[12px] font-medium text-mhs-text ml-1">{entry.taskTitle}</span>
                    </div>
                    <span className="text-[11px] text-mhs-muted shrink-0">{relTime(entry.ts)}</span>
                  </div>
                  <div className="text-[12px] text-mhs-muted mt-1">{entry.detail}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-mhs-surface text-mhs-muted px-2 py-0.5 rounded-full border border-mhs-border">{entry.taskCourse}</span>
                    <span className="text-[10px] text-mhs-muted">{entry.actor}</span>
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
