"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const MK_COLORS = [
  "bg-forest/10 text-forest",
  "bg-teal/10 text-teal",
  "bg-gold/15 text-gold",
  "bg-rose/10 text-rose",
  "bg-[#7c3aed]/10 text-[#7c3aed]",
];
function mkColor(course) {
  const idx = [...course].reduce((a, c) => a + c.charCodeAt(0), 0) % MK_COLORS.length;
  return MK_COLORS[idx];
}

const STATUS_MAP = {
  "selesai":           { cls: "bg-forest/10 text-forest",    label: "Selesai"    },
  "sedang dikerjakan": { cls: "bg-teal/10 text-teal",        label: "Berjalan"   },
  "menunggu review":   { cls: "bg-gold/15 text-gold",        label: "Menunggu"   },
  "belum mulai":       { cls: "bg-muted/10 text-muted",      label: "Baru Dibuka"},
};

const PRIORITY_MAP = {
  kritis:  "bg-rose/10 text-rose",
  tinggi:  "bg-rose/10 text-rose",
  sedang:  "bg-gold/15 text-gold",
  rendah:  "bg-forest/10 text-forest",
};

const PROGRESS_BAR = [
  "bg-gradient-to-r from-forest to-forest-2",
  "bg-gradient-to-r from-teal to-[#2a9d8f]",
  "bg-gradient-to-r from-gold to-gold-2",
  "bg-gradient-to-r from-rose to-[#e74c3c]",
];

function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function deadlineCls(d) {
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  if (diff < 0)  return "text-rose font-semibold";
  if (diff <= 3) return "text-rose font-semibold";
  if (diff <= 7) return "text-gold font-semibold";
  return "text-muted";
}

export default function DosenTugasPage() {
  const [filter, setFilter] = useState("semua");

  const filtered = data.tasks.filter(t => {
    if (filter === "aktif")   return t.status !== "selesai";
    if (filter === "selesai") return t.status === "selesai";
    if (filter === "review")  return t.status === "menunggu review";
    return true;
  });

  const tabs = [
    { id: "semua",   label: `Semua (${data.tasks.length})` },
    { id: "aktif",   label: `Aktif (${data.tasks.filter(t => t.status !== "selesai").length})` },
    { id: "review",  label: `Menunggu Review (${data.tasks.filter(t => t.status === "menunggu review").length})` },
    { id: "selesai", label: `Selesai (${data.tasks.filter(t => t.status === "selesai").length})` },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Manajemen Tugas</div>
        </div>
        <div className="flex gap-2 items-center">
          <select className="bg-paper border-[1.5px] border-border text-ink-2 px-3 py-2 rounded-lg text-[13px] outline-none focus:border-forest transition-colors">
            <option>Semua Mata Kuliah</option>
            {[...new Set(data.tasks.map(t => t.course))].map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="bg-forest text-white hover:bg-forest-2 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(45,90,61,0.25)] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5">
            <span>+</span> Buat Tugas Baru
          </button>
        </div>
      </div>

      {/* STAT MINI ROW */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Tugas", val: data.tasks.length, icon: "📋", accent: "text-forest", bg: "bg-forest/8" },
          { label: "Aktif",       val: data.tasks.filter(t => t.status !== "selesai").length, icon: "⚡", accent: "text-teal",   bg: "bg-teal/8"   },
          { label: "Butuh Review",val: data.tasks.filter(t => t.status === "menunggu review").length, icon: "🔍", accent: "text-gold",   bg: "bg-gold/8"   },
          { label: "Selesai",     val: data.tasks.filter(t => t.status === "selesai").length, icon: "✅", accent: "text-rose",   bg: "bg-rose/8"   },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-border/60 rounded-xl px-4 py-3 flex items-center gap-3`}>
            <span className="text-[22px]">{s.icon}</span>
            <div>
              <div className={`font-serif text-[24px] leading-none ${s.accent}`}>{s.val}</div>
              <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TAB FILTER */}
      <div className="flex gap-0.5 bg-cream border border-border rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`text-[12.5px] font-medium px-4 py-1.5 rounded-lg transition-all ${
              filter === tab.id ? "bg-paper text-forest shadow-sm font-semibold" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] overflow-hidden">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr>
              {["Judul Tugas","Mata Kuliah","Jenis","Deadline","Pengumpulan","Status","Aksi"].map(h => (
                <th key={h} className="text-left py-2.5 px-4 text-[11px] font-semibold text-muted uppercase tracking-[0.06em] bg-cream border-b-[1.5px] border-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((task, idx) => {
              const st = STATUS_MAP[task.status] || { cls: "bg-muted/10 text-muted", label: task.status };
              const submitted = task.submissions?.length ?? 0;
              const total = 36 + (idx * 4 % 10);
              const pct = Math.round((submitted / total) * 100);
              const barCls = PROGRESS_BAR[idx % PROGRESS_BAR.length];
              return (
                <tr key={task.id} className={`border-b border-border/50 last:border-0 hover:bg-forest/[0.03] transition-colors ${task.status === "selesai" ? "opacity-60" : ""}`}>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-ink">{task.title}</div>
                    <div className="text-[11px] text-muted mt-0.5">Dibuat {formatDate(task.deadline)}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${mkColor(task.course)}`}>{task.course}</span>
                  </td>
                  <td className="py-3.5 px-4 text-muted text-[12px] capitalize">{task.type}</td>
                  <td className={`py-3.5 px-4 font-mono text-[12px] ${deadlineCls(task.deadline)}`}>
                    {formatDate(task.deadline)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-cream-2 rounded-full overflow-hidden">
                        <div className={`h-full ${barCls} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-mono text-[12px] text-ink-2 whitespace-nowrap">{submitted}/{total}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1.5">
                      <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:border-forest hover:text-forest px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all">
                        Edit
                      </button>
                      <button className="bg-paper text-rose border-[1.5px] border-rose/25 hover:bg-rose/5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
