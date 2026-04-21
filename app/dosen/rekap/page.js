"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const AVATAR_COLORS = [
  "from-forest to-teal",
  "from-[#c0392b] to-[#e74c3c]",
  "from-gold to-[#f39c12]",
  "from-teal to-[#2a9d8f]",
  "from-[#636e72] to-[#b2bec3]",
];

function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function initials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function DosenRekapPage() {
  const [grades, setGrades] = useState({});
  const [activeTask, setActiveTask] = useState(data.tasks[0]?.id ?? null);

  const task = data.tasks.find(t => t.id === activeTask) ?? data.tasks[0];
  const submitted = task?.submissions?.length ?? 0;
  const total = 36;
  const pct = Math.round((submitted / total) * 100);

  const mockRows = task ? [
    ...task.submissions.map((s, i) => ({
      id: s.id,
      name: s.submittedBy,
      nim: `202200${1234 + i}`,
      time: s.submittedAt,
      file: s.fileName,
      status: "sudah",
      avatarIdx: i % AVATAR_COLORS.length,
    })),
    {
      id: "pending-1",
      name: "Andi Syahputra",
      nim: "2022001240",
      time: null,
      file: null,
      status: "belum",
      avatarIdx: 4,
    },
  ] : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Rekap Pengumpulan Tugas</div>
        </div>
        <div className="flex gap-2">
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📊 Ekspor Excel
          </button>
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📧 Kirim Notifikasi
          </button>
        </div>
      </div>

      {/* TASK SELECTOR */}
      <div className="flex gap-2 flex-wrap">
        {data.tasks.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTask(t.id)}
            className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-all border-[1.5px] ${
              activeTask === t.id
                ? "bg-forest text-white border-forest"
                : "bg-paper text-muted border-border hover:border-forest hover:text-forest"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {task && (
        <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] overflow-hidden">
          {/* CARD HEADER */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-semibold text-ink text-[14px]">📥 {task.title} — {task.course}</div>
              <div className="text-[12px] text-muted mt-0.5">Deadline: {formatDate(task.deadline)} · {total} Mahasiswa</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-cream-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-forest to-teal rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="font-mono text-[12px] text-ink-2">{submitted}/{total}</span>
              </div>
              <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${pct >= 80 ? "bg-forest/10 text-forest" : "bg-gold/15 text-gold"}`}>
                {pct}% terkumpul
              </span>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {["Mahasiswa", "NIM", "Waktu Kumpul", "File", "Status", "Nilai"].map(h => (
                  <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-muted uppercase tracking-[0.06em] bg-cream border-b-[1.5px] border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockRows.map((row, idx) => (
                <tr key={row.id} className={`border-b border-border/50 last:border-0 hover:bg-forest/[0.03] transition-colors ${row.status === "belum" ? "bg-rose/[0.025]" : ""}`}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AVATAR_COLORS[row.avatarIdx]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                        {initials(row.name)}
                      </div>
                      <span className="font-medium text-ink">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 font-mono text-[12px] text-muted">{row.nim}</td>
                  <td className={`py-3 px-5 text-[12px] ${row.time ? "text-muted" : "text-rose font-semibold"}`}>
                    {row.time ?? "Belum Kumpul"}
                  </td>
                  <td className="py-3 px-5">
                    {row.file ? (
                      <span className="text-[12px] text-forest cursor-pointer hover:underline">📎 {row.file}</span>
                    ) : (
                      <span className="text-[12px] text-muted">—</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    {row.status === "sudah" ? (
                      <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal">Sudah Kumpul</span>
                    ) : (
                      <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-rose/10 text-rose">Belum Kumpul</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    {row.status === "sudah" ? (
                      <input
                        type="text"
                        value={grades[row.id] ?? ""}
                        onChange={e => setGrades(g => ({ ...g, [row.id]: e.target.value }))}
                        placeholder="—"
                        className="w-[52px] px-2 py-1 border-[1.5px] border-border rounded-md font-mono text-[13px] text-center bg-paper text-ink outline-none focus:border-forest transition-colors"
                      />
                    ) : (
                      <span className="text-[12px] text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER ACTIONS */}
          <div className="px-5 py-4 border-t border-border flex gap-2">
            <button className="bg-forest text-white hover:bg-forest-2 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(45,90,61,0.25)] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
              💾 Simpan Semua Nilai
            </button>
            <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
              📊 Ekspor Excel
            </button>
            <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
              📧 Kirim Notifikasi ke Mahasiswa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
