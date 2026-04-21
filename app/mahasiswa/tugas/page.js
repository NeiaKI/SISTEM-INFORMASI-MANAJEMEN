"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const allData = createSeedData().mahasiswa;

/* ── Helpers ─────────────────────────────────── */
const PRIORITY_BORDER = {
  kritis:  "border-l-[3px] border-l-mhs-rose",
  tinggi:  "border-l-[3px] border-l-mhs-rose",
  sedang:  "border-l-[3px] border-l-mhs-amber",
  rendah:  "border-l-[3px] border-l-mhs-green",
};
const PRIORITY_DOT = {
  kritis:  "bg-mhs-rose",
  tinggi:  "bg-mhs-rose",
  sedang:  "bg-mhs-amber",
  rendah:  "bg-mhs-green",
};
const PRIORITY_LABEL = {
  kritis:  { cls: "bg-mhs-rose/15 text-mhs-rose",   label: "Kritis"  },
  tinggi:  { cls: "bg-mhs-rose/10 text-mhs-rose",    label: "Tinggi"  },
  sedang:  { cls: "bg-mhs-amber/15 text-mhs-amber",  label: "Sedang"  },
  rendah:  { cls: "bg-mhs-green/15 text-mhs-green",  label: "Rendah"  },
};

const MK_COLORS = [
  "bg-[#e11d48]/10 text-[#e11d48]",
  "bg-[#0284c7]/10 text-[#0284c7]",
  "bg-[#7c3aed]/10 text-[#7c3aed]",
  "bg-[#d97706]/10 text-[#d97706]",
  "bg-[#15803d]/10 text-[#15803d]",
  "bg-[#0891b2]/10 text-[#0891b2]",
];
function mkColor(course) {
  const idx = [...course].reduce((a, c) => a + c.charCodeAt(0), 0) % MK_COLORS.length;
  return MK_COLORS[idx];
}

function deadlineInfo(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  if (diff < 0)  return { label: `${Math.abs(diff)}h telat`, cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff === 0) return { label: "Hari ini",               cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff <= 3) return { label: `H-${diff}`,               cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff <= 7) return { label: `H-${diff}`,               cls: "bg-mhs-amber/15 text-mhs-amber" };
  return              { label: `H-${diff}`,                 cls: "bg-mhs-teal/10 text-mhs-teal" };
}

/* ── Kanban column config ────────────────────── */
const COLUMNS = [
  {
    id: "belum mulai",
    label: "Belum Mulai",
    dot: "bg-mhs-muted",
    headBg: "bg-mhs-muted/8",
    headBorder: "border-mhs-muted/20",
    countCls: "bg-mhs-muted/15 text-mhs-muted",
    addBtn: false,
  },
  {
    id: "sedang dikerjakan",
    label: "Dikerjakan",
    dot: "bg-mhs-teal",
    headBg: "bg-mhs-teal/8",
    headBorder: "border-mhs-teal/20",
    countCls: "bg-mhs-teal/15 text-mhs-teal",
    addBtn: true,
  },
  {
    id: "menunggu review",
    label: "Review",
    dot: "bg-mhs-purple",
    headBg: "bg-mhs-purple/8",
    headBorder: "border-mhs-purple/20",
    countCls: "bg-mhs-purple/15 text-mhs-purple",
    addBtn: false,
  },
  {
    id: "selesai",
    label: "Selesai",
    dot: "bg-mhs-green",
    headBg: "bg-mhs-green/8",
    headBorder: "border-mhs-green/20",
    countCls: "bg-mhs-green/15 text-mhs-green",
    addBtn: false,
  },
];

/* ── Task Card ───────────────────────────────── */
function TaskCard({ task }) {
  const dl = deadlineInfo(task.deadline);
  const pLabel = PRIORITY_LABEL[task.priority] || { cls: "bg-mhs-muted/15 text-mhs-muted", label: task.priority };

  return (
    <div className={`bg-mhs-surface rounded-xl ${PRIORITY_BORDER[task.priority] || "border-l-[3px] border-l-mhs-border"} shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group p-4`}>

      {/* TOP ROW: Course + Deadline */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md truncate max-w-[140px] ${mkColor(task.course)}`}>
          {task.course}
        </span>
        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${dl.cls}`}>
          {dl.label}
        </span>
      </div>

      {/* TITLE */}
      <div className="text-[13.5px] font-semibold text-mhs-text leading-snug mb-1.5 group-hover:text-mhs-amber transition-colors">
        {task.title}
      </div>

      {/* NOTE */}
      {task.note && (
        <p className="text-[11px] text-mhs-muted leading-relaxed mb-3 line-clamp-2">
          {task.note}
        </p>
      )}

      {/* PROGRESS BAR */}
      {task.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-mhs-muted">Progress</span>
            <span className="font-mono text-[10px] text-mhs-amber">{task.progress}%</span>
          </div>
          <div className="h-[5px] bg-mhs-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mhs-amber to-mhs-amber-2 transition-all duration-700"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* BOTTOM: Type + Priority */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${task.type === "kelompok" ? "bg-mhs-purple/10 text-mhs-purple" : "bg-mhs-teal/10 text-mhs-teal"}`}>
          {task.type === "kelompok" ? "👥 Kelompok" : "👤 Individu"}
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ml-auto ${pLabel.cls}`}>
          {pLabel.label}
        </span>
      </div>

      {/* SUBMISSIONS indicator */}
      {task.submissions?.length > 0 && (
        <div className="mt-2.5 pt-2.5 border-t border-mhs-border/50 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-mhs-green" />
          <span className="text-[10px] text-mhs-muted">{task.submissions.length} file dikirim</span>
        </div>
      )}
    </div>
  );
}

/* ── Kanban Board ────────────────────────────── */
function KanbanBoard({ tasks }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id);
        return (
          <div key={col.id} className="flex flex-col min-w-[260px] w-[260px] shrink-0">
            {/* Column Header */}
            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3 border ${col.headBg} ${col.headBorder}`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${col.dot}`} />
              <span className="text-[13px] font-semibold text-mhs-text flex-1">{col.label}</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.countCls}`}>
                {colTasks.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {colTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {colTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-mhs-muted/50 border-2 border-dashed border-mhs-border rounded-xl">
                  <div className="text-2xl mb-1.5">📭</div>
                  <span className="text-[12px]">Tidak ada tugas</span>
                </div>
              )}
            </div>

            {/* Add card button */}
            {col.addBtn && (
              <button className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-medium text-mhs-muted hover:text-mhs-text hover:bg-mhs-card border border-dashed border-mhs-border transition-all">
                <span className="text-[16px]">+</span> Tambah Tugas
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── List View ───────────────────────────────── */
function ListView({ tasks }) {
  return (
    <div className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="bg-mhs-surface/60">
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">Tugas</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">MK</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">Deadline</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">Progress</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">Status</th>
            <th className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">Prioritas</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const dl = deadlineInfo(task.deadline);
            return (
              <tr key={task.id} className="border-b border-mhs-border/40 last:border-0 hover:bg-mhs-hover transition-colors group cursor-pointer">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-1 h-8 rounded-full shrink-0 ${PRIORITY_DOT[task.priority] || "bg-mhs-border"}`} />
                    <div>
                      <div className="font-medium text-mhs-text group-hover:text-mhs-amber transition-colors">{task.title}</div>
                      <div className="text-[11px] text-mhs-muted mt-0.5 capitalize">{task.type}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${mkColor(task.course)}`}>{task.course}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${dl.cls}`}>{dl.label}</span>
                </td>
                <td className="py-3.5 px-4 w-36">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-mhs-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-mhs-amber to-mhs-amber-2 rounded-full" style={{ width: `${task.progress}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-mhs-muted w-7 text-right">{task.progress}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  {(() => {
                    const map = {
                      "selesai":           "bg-mhs-green/15 text-mhs-green",
                      "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
                      "menunggu review":   "bg-mhs-purple/15 text-mhs-purple",
                      "belum mulai":       "bg-mhs-muted/15 text-mhs-muted",
                    };
                    return (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${map[task.status] || "bg-mhs-muted/10 text-mhs-muted"}`}>
                        {task.status}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md capitalize ${(PRIORITY_LABEL[task.priority] || {}).cls || "bg-mhs-muted/10 text-mhs-muted"}`}>
                    {task.priority}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Main Page ───────────────────────────────── */
export default function TugasPage() {
  const [view, setView] = useState("kanban");
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const tasks = allData.tasks;

  const filtered = tasks.filter(t => {
    const matchFilter =
      filter === "semua"    ? true :
      filter === "aktif"    ? t.status !== "selesai" :
      filter === "selesai"  ? t.status === "selesai" :
      filter === "kritis"   ? (t.priority === "kritis" || t.priority === "tinggi") : true;
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = [
    {
      icon: "🗂",
      value: tasks.length,
      label: "Total Tugas",
      sub: `${tasks.filter(t => t.type === "kelompok").length} kelompok, ${tasks.filter(t => t.type === "individu").length} individu`,
      accent: "text-mhs-amber",
      bg: "from-mhs-amber/10 to-transparent",
      dot: "bg-mhs-amber",
    },
    {
      icon: "⚡",
      value: tasks.filter(t => t.status === "sedang dikerjakan").length,
      label: "Dalam Proses",
      sub: "aktif dikerjakan",
      accent: "text-mhs-teal",
      bg: "from-mhs-teal/10 to-transparent",
      dot: "bg-mhs-teal",
    },
    {
      icon: "🔍",
      value: tasks.filter(t => t.status === "menunggu review").length,
      label: "Menunggu Review",
      sub: "butuh feedback dosen",
      accent: "text-mhs-purple",
      bg: "from-mhs-purple/10 to-transparent",
      dot: "bg-mhs-purple",
    },
    {
      icon: "✅",
      value: tasks.filter(t => t.status === "selesai").length,
      label: "Selesai",
      sub: `${Math.round((tasks.filter(t => t.status === "selesai").length / tasks.length) * 100)}% completion rate`,
      accent: "text-mhs-green",
      bg: "from-mhs-green/10 to-transparent",
      dot: "bg-mhs-green",
    },
  ];

  const filterTabs = [
    { id: "semua",   label: "Semua",   count: tasks.length },
    { id: "aktif",   label: "Aktif",   count: tasks.filter(t => t.status !== "selesai").length },
    { id: "selesai", label: "Selesai", count: tasks.filter(t => t.status === "selesai").length },
    { id: "kritis",  label: "Kritis",  count: tasks.filter(t => t.priority === "kritis" || t.priority === "tinggi").length },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* PAGE HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[26px] text-mhs-text leading-tight">
            Manajemen <span className="text-mhs-amber">Tugas</span>
          </div>
          <div className="text-[12px] text-mhs-muted mt-1">Semester Genap 2025/2026 · {tasks.length} tugas total</div>
        </div>
        <button className="flex items-center gap-2 bg-mhs-amber hover:bg-mhs-amber-2 text-mhs-on px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(217,119,6,0.35)] active:translate-y-0">
          <span className="text-[16px] leading-none">+</span> Tugas Baru
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.bg} bg-mhs-card border border-mhs-border rounded-2xl p-4 relative overflow-hidden hover:-translate-y-0.5 transition-transform`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[22px]">{s.icon}</span>
              <div className={`w-2 h-2 rounded-full ${s.dot} mt-1`} />
            </div>
            <div className={`font-serif text-[30px] leading-none ${s.accent} mb-1`}>{s.value}</div>
            <div className="text-[12px] font-semibold text-mhs-text">{s.label}</div>
            <div className="text-[11px] text-mhs-muted mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* FILTER + SEARCH + VIEW TOGGLE */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Filter tabs */}
        <div className="flex gap-0.5 bg-mhs-surface border border-mhs-border rounded-xl p-1">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.id
                  ? "bg-mhs-card text-mhs-text shadow-sm"
                  : "text-mhs-muted hover:text-mhs-text"
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${filter === tab.id ? "bg-mhs-amber/20 text-mhs-amber" : "bg-mhs-border/60 text-mhs-muted"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mhs-muted text-[13px]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari tugas…"
            className="w-full bg-mhs-card border border-mhs-border text-mhs-text pl-8 pr-3 py-2 rounded-xl text-[12px] outline-none focus:border-mhs-amber transition-colors placeholder:text-mhs-muted"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 bg-mhs-surface border border-mhs-border rounded-xl p-1">
          <button
            onClick={() => setView("kanban")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${view === "kanban" ? "bg-mhs-card text-mhs-text shadow-sm" : "text-mhs-muted hover:text-mhs-text"}`}
          >
            <span>⊞</span> Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${view === "list" ? "bg-mhs-card text-mhs-text shadow-sm" : "text-mhs-muted hover:text-mhs-text"}`}
          >
            <span>☰</span> List
          </button>
        </div>
      </div>

      {/* PROGRESS OVERVIEW BAR */}
      <div className="bg-mhs-card border border-mhs-border rounded-2xl px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-semibold text-mhs-text">Progress Keseluruhan</span>
          <span className="font-mono text-[12px] text-mhs-amber">
            {Math.round(tasks.reduce((a, t) => a + t.progress, 0) / tasks.length)}% rata-rata
          </span>
        </div>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          {(() => {
            const done    = tasks.filter(t => t.status === "selesai").length;
            const review  = tasks.filter(t => t.status === "menunggu review").length;
            const doing   = tasks.filter(t => t.status === "sedang dikerjakan").length;
            const todo    = tasks.filter(t => t.status === "belum mulai").length;
            const total   = tasks.length;
            return (
              <>
                <div className="bg-mhs-green transition-all"   style={{ width: `${(done / total) * 100}%` }}   title="Selesai" />
                <div className="bg-mhs-purple transition-all"  style={{ width: `${(review / total) * 100}%` }} title="Review" />
                <div className="bg-mhs-teal transition-all"    style={{ width: `${(doing / total) * 100}%` }}  title="Dikerjakan" />
                <div className="bg-mhs-border transition-all"  style={{ width: `${(todo / total) * 100}%` }}   title="Belum Mulai" />
              </>
            );
          })()}
        </div>
        <div className="flex gap-4 mt-2.5">
          {[
            { label: "Selesai",       dot: "bg-mhs-green",  count: tasks.filter(t => t.status === "selesai").length },
            { label: "Review",        dot: "bg-mhs-purple", count: tasks.filter(t => t.status === "menunggu review").length },
            { label: "Dikerjakan",    dot: "bg-mhs-teal",   count: tasks.filter(t => t.status === "sedang dikerjakan").length },
            { label: "Belum Mulai",   dot: "bg-mhs-border", count: tasks.filter(t => t.status === "belum mulai").length },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.dot}`} />
              <span className="text-[11px] text-mhs-muted">{item.label} <span className="text-mhs-text font-medium">({item.count})</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* BOARD / LIST */}
      {view === "kanban" ? (
        <KanbanBoard tasks={filtered} />
      ) : (
        <ListView tasks={filtered} />
      )}
    </div>
  );
}
