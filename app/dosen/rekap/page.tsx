"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Paperclip, ChevronDown, ChevronUp } from "lucide-react";
import { createSeedData } from "@/data/sim-data";
import { getAllTaskData, type TaskEntry } from "@/lib/taskStore";

const data = createSeedData().dosen;

const AVATAR_COLORS = [
  "from-forest to-teal",
  "from-[#c0392b] to-[#e74c3c]",
  "from-gold to-[#f39c12]",
  "from-teal to-[#2a9d8f]",
  "from-[#636e72] to-[#b2bec3]",
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function DosenRekapPage() {
  const [grades, setGrades]       = useState<Record<string, string>>({});
  const [activeTask, setActiveTask] = useState<string | null>(data.tasks[0]?.id ?? null);
  const [studentStore, setStudentStore] = useState<Record<string, unknown>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setStudentStore(getAllTaskData());
  }, []);

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
      note: s.note,
    })),
    {
      id: "pending-1",
      name: "Andi Syahputra",
      nim: "2022001240",
      time: null,
      file: null,
      status: "belum",
      avatarIdx: 4,
      note: null,
    },
  ] : [];

  // Aggregate all student submissions from localStorage, across all tasks
  const allNewSubmissions = Object.entries(studentStore).flatMap(([taskId, entry]) => {
    const e = entry as TaskEntry;
    return (e.submissions || []).map(s => ({ ...s, taskId, taskTitle: e.taskTitle, taskCourse: e.taskCourse }));
  });
  const allNewComments = Object.entries(studentStore).flatMap(([taskId, entry]) => {
    const e = entry as TaskEntry;
    return (e.comments || []).map(c => ({ ...c, taskId, taskTitle: e.taskTitle, taskCourse: e.taskCourse }));
  });

  const hasNewActivity = allNewSubmissions.length > 0 || allNewComments.length > 0;

  function toggleComments(key: string) {
    setExpandedComments(prev => ({ ...prev, [key]: !prev[key] }));
  }

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

      {/* ── KIRIMAN BARU DARI MAHASISWA ─────────────────── */}
      {hasNewActivity && (
        <div className="bg-paper border-[1.5px] border-forest/30 rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border bg-forest/[0.04] flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <h3 className="text-[13.5px] font-semibold text-ink flex-1">Kiriman Baru dari Mahasiswa</h3>
            <span className="text-[11px] text-muted">
              {allNewSubmissions.length} file · {allNewComments.length} komentar
            </span>
          </div>

          {/* NEW SUBMISSIONS */}
          {allNewSubmissions.length > 0 && (
            <div className="px-5 py-4 border-b border-border/60">
              <div className="text-[11px] text-muted uppercase tracking-[0.08em] mb-3 flex items-center gap-1.5">
                <Paperclip size={11} /> File Dikumpulkan
              </div>
              <div className="flex flex-col gap-2">
                {allNewSubmissions.map((s, i) => (
                  <div key={s.id || i} className="flex items-start gap-3 bg-cream/60 rounded-xl px-4 py-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                      {initials(s.submittedBy || "EK")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-medium text-ink">{s.submittedBy}</span>
                        <span className="text-[11px] text-forest font-semibold">📎 {s.fileName}</span>
                        {s.fileSize && <span className="text-[11px] text-muted">{s.fileSize}</span>}
                      </div>
                      <div className="text-[11px] text-muted mt-0.5">
                        {s.taskTitle && <><span className="text-ink-2 font-medium">{s.taskTitle}</span> · </>}
                        {s.taskCourse && <span className="text-teal">{s.taskCourse}</span>}
                        {s.submittedAt && <> · {s.submittedAt}</>}
                      </div>
                      {s.note && (
                        <div className="text-[11px] text-muted mt-1 italic">"{s.note}"</div>
                      )}
                    </div>
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal shrink-0">
                      Sudah Kumpul
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW COMMENTS */}
          {allNewComments.length > 0 && (
            <div className="px-5 py-4">
              <div className="text-[11px] text-muted uppercase tracking-[0.08em] mb-3 flex items-center gap-1.5">
                <MessageSquare size={11} /> Komentar Mahasiswa
              </div>
              <div className="flex flex-col gap-2">
                {allNewComments.map((c, i) => (
                  <div key={c.id || i} className="flex gap-3 bg-cream/60 rounded-xl px-4 py-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                      {initials(c.author || "EK")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[13px] font-medium text-ink">{c.author}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-gold/15 text-gold">Mahasiswa</span>
                        {c.taskTitle && (
                          <span className="text-[11px] text-muted">
                            → <span className="text-ink-2 font-medium">{c.taskTitle}</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[12.5px] text-ink-2 leading-relaxed">{c.text}</div>
                      <div className="text-[10.5px] text-muted mt-1">{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
                {["Mahasiswa", "NIM", "Waktu Kumpul", "File", "Status", "Nilai", "Komentar"].map(h => (
                  <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-muted uppercase tracking-[0.06em] bg-cream border-b-[1.5px] border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockRows.map((row, idx) => {
                // Find new comments from this student (by name match) for this task
                const taskEntry = studentStore[task.id] as TaskEntry | undefined;
                const newComments = (taskEntry?.comments || []).filter(c =>
                  c.author?.toLowerCase().includes(row.name.split(" ")[0].toLowerCase())
                );
                const commentKey = `${task.id}-${row.id}`;
                const isExpanded = expandedComments[commentKey];
                const seedComments = (task.comments || []).filter(c =>
                  c.author?.toLowerCase().includes(row.name.split(" ")[0].toLowerCase())
                );
                const allRowComments = [...seedComments, ...newComments];

                return (
                  <>
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
                      <td className="py-3 px-5">
                        {allRowComments.length > 0 ? (
                          <button
                            onClick={() => toggleComments(commentKey)}
                            className="flex items-center gap-1.5 text-[11px] font-medium text-forest hover:text-forest-2 transition-colors"
                          >
                            <MessageSquare size={13} />
                            <span>{allRowComments.length}</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        ) : (
                          <span className="text-[12px] text-muted">—</span>
                        )}
                      </td>
                    </tr>

                    {/* Expanded comments row */}
                    {isExpanded && allRowComments.length > 0 && (
                      <tr key={`${row.id}-cmts`} className="bg-cream/50">
                        <td colSpan={7} className="px-5 py-3 border-b border-border/40">
                          <div className="flex flex-col gap-2 pl-10">
                            {allRowComments.map((c, ci) => (
                              <div key={c.id || ci} className="flex gap-2.5 items-start">
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${c.role === "dosen" ? "bg-gradient-to-br from-forest to-teal" : "bg-gradient-to-br from-gold to-[#f39c12]"}`}>
                                  {initials(c.author)}
                                </div>
                                <div className="flex-1 bg-paper border border-border/60 rounded-lg px-3 py-2">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[11.5px] font-semibold text-ink">{c.author}</span>
                                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${c.role === "dosen" ? "bg-forest/10 text-forest" : "bg-gold/15 text-gold"}`}>
                                      {c.role === "dosen" ? "Dosen" : "Mahasiswa"}
                                    </span>
                                    <span className="text-[10px] text-muted ml-auto">{c.time}</span>
                                  </div>
                                  <div className="text-[12px] text-ink-2 leading-relaxed">{c.text}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
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
