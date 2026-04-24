"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { STUDENTS, STATUS_MAP, AVG_CLS, BAR_CLS, getInitials, type Student } from "@/lib/students-data";

/* ── Per-course metadata ─────────────────────── */
type CourseCard = {
  name: string;
  icon: string;
  iconBg: string;
  accent: string;
  bar: string;
  students: Student[];
};

const COURSE_META: Record<string, { icon: string; iconBg: string; accent: string; bar: string }> = {
  "Analisis SI":                   { icon: "📊", iconBg: "bg-forest/10",  accent: "text-forest", bar: "from-forest to-teal"           },
  "Basis Data":                    { icon: "🗃️", iconBg: "bg-teal/10",    accent: "text-teal",   bar: "from-teal to-[#2a9d8f]"        },
  "PPL":                           { icon: "⚙️", iconBg: "bg-gold/10",    accent: "text-gold",   bar: "from-gold to-[#f39c12]"        },
  "Keamanan Sistem":               { icon: "🔐", iconBg: "bg-rose/10",    accent: "text-rose",   bar: "from-rose to-[#e74c3c]"        },
  "SI Enterprise":                 { icon: "🏢", iconBg: "bg-purple-500/10", accent: "text-purple-400", bar: "from-purple-500 to-purple-400" },
  "Interaksi Manusia & Komputer":  { icon: "🖥️", iconBg: "bg-[#0891b2]/10", accent: "text-[#0891b2]", bar: "from-[#0891b2] to-[#06b6d4]" },
};
const DEFAULT_META = { icon: "📚", iconBg: "bg-forest/10", accent: "text-forest", bar: "from-forest to-teal" };

/* build sorted unique course list */
const allCourseNames = [...new Set(STUDENTS.flatMap(s => s.courses))].sort();
const COURSE_CARDS: CourseCard[] = allCourseNames.map(name => ({
  name,
  ...(COURSE_META[name] ?? DEFAULT_META),
  students: STUDENTS.filter(s => s.courses.includes(name)).sort((a, b) => a.nama.localeCompare(b.nama)),
}));

/* ── Modal ───────────────────────────────────── */
function CourseStudentModal({ card, onClose }: { card: CourseCard; onClose: () => void }) {
  const avgGrade   = (card.students.reduce((a, s) => a + s.avg, 0) / card.students.length).toFixed(1);
  const totalDone  = card.students.reduce((a, s) => a + s.done, 0);
  const totalTasks = card.students.reduce((a, s) => a + s.total, 0);
  const needAttn   = card.students.filter(s => s.status === "perlu_perhatian").length;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6 pt-20 pb-6">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[4px]" onClick={onClose} />

      <div className="relative bg-paper border border-border rounded-[18px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] w-full max-w-[1100px] max-h-[82vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center text-[22px] shrink-0`}>
                {card.icon}
              </div>
              <div>
                <div className="text-[17px] font-bold text-ink">{card.name}</div>
                <div className="text-[12px] text-muted mt-0.5">{card.students.length} mahasiswa terdaftar</div>
              </div>
            </div>
            <button onClick={onClose} className="text-muted hover:text-ink p-1.5 hover:bg-cream rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Mahasiswa",       val: card.students.length, accent: card.accent },
              { label: "Rata-rata Nilai", val: avgGrade,             accent: card.accent },
              { label: "Tugas Selesai",   val: `${totalDone}/${totalTasks}`, accent: "text-teal" },
              { label: "Perlu Perhatian", val: needAttn,             accent: "text-rose"  },
            ].map((s, i) => (
              <div key={i} className="bg-cream rounded-xl px-3 py-2.5 text-center">
                <div className={`font-serif text-[20px] leading-none ${s.accent}`}>{s.val}</div>
                <div className="text-[10px] text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead className="sticky top-0 z-10 bg-cream/90 backdrop-blur-sm">
              <tr>
                {["Mahasiswa", "NIM", "Angkatan", "Mata Kuliah", "Tugas Selesai", "Rata-rata Nilai", "Status"].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 text-[10.5px] font-semibold text-muted uppercase tracking-[0.06em] border-b border-border/60 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {card.students.map(s => {
                const st  = STATUS_MAP[s.status];
                const pct = Math.round((s.done / s.total) * 100);
                return (
                  <tr key={s.nim} className="border-b border-border/50 last:border-0 hover:bg-forest/[0.03] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.avatarGrad} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                          {getInitials(s.nama)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-ink whitespace-nowrap">{s.nama}</div>
                          <div className="text-[11px] text-muted truncate max-w-[180px]">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[12px] text-muted whitespace-nowrap">{s.nim}</td>
                    <td className="py-3.5 px-4 text-[12px] text-muted whitespace-nowrap">{s.angkatan}</td>
                    <td className="py-3.5 px-4 text-[12px] text-muted max-w-[160px]">
                      <span className="line-clamp-2 leading-snug">{s.coursesLabel}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-cream-2 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${BAR_CLS[s.status]} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-mono text-[12px] text-ink-2">{s.done}/{s.total}</span>
                      </div>
                    </td>
                    <td className={`py-3.5 px-4 font-mono text-[14px] font-semibold whitespace-nowrap ${AVG_CLS[s.status]}`}>
                      {s.avg.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${st.cls}`}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────── */
export default function DosenMahasiswaPage() {
  const topbarQ              = useSearch();
  const [selected, setSelected] = useState<CourseCard | null>(null);

  const totalStudents = STUDENTS.length;
  const avgAll        = (STUDENTS.reduce((a, s) => a + s.avg, 0) / totalStudents).toFixed(1);
  const needAttention = STUDENTS.filter(s => s.status === "perlu_perhatian").length;
  const topStudent    = [...STUDENTS].sort((a, b) => b.avg - a.avg)[0];

  const filteredCards = topbarQ
    ? COURSE_CARDS.filter(c => c.name.toLowerCase().includes(topbarQ.toLowerCase()))
    : COURSE_CARDS;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Data Mahasiswa</div>
        </div>
        <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
          📊 Ekspor Excel
        </button>
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Mahasiswa",   val: totalStudents,  icon: "🎓", accent: "text-forest", bg: "bg-forest/8" },
          { label: "Rata-rata Nilai",   val: avgAll,         icon: "⭐", accent: "text-gold",   bg: "bg-gold/8"   },
          { label: "Perlu Perhatian",   val: needAttention,  icon: "⚠️", accent: "text-rose",   bg: "bg-rose/8"   },
          { label: "Nilai Tertinggi",   val: topStudent.avg, icon: "🏆", accent: "text-teal",   bg: "bg-teal/8"   },
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

      {/* COURSE CARDS */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCards.map((card, idx) => {
          const avgGrade  = (card.students.reduce((a, s) => a + s.avg, 0) / card.students.length).toFixed(1);
          const avgDone   = Math.round(card.students.reduce((a, s) => a + (s.done / s.total) * 100, 0) / card.students.length);
          const needAttn  = card.students.filter(s => s.status === "perlu_perhatian").length;

          return (
            <div
              key={idx}
              onClick={() => setSelected(card)}
              className="bg-paper border-[1.5px] border-border rounded-[14px] p-5 shadow-[0_1px_6px_rgba(26,26,20,0.06)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(26,26,20,0.12)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex gap-3 items-start mb-4">
                <div className={`w-[42px] h-[42px] rounded-xl ${card.iconBg} flex items-center justify-center text-[22px] shrink-0`}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-ink text-[15px] leading-snug">{card.name}</div>
                  <div className="text-[11px] text-muted mt-0.5">{card.students.length} mahasiswa</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                {[
                  { label: "Mahasiswa",     val: card.students.length },
                  { label: "Rata-rata",     val: avgGrade             },
                  { label: "Perlu Atensi",  val: needAttn             },
                ].map((stat, i) => (
                  <div key={i} className="bg-cream rounded-lg py-2 px-1">
                    <div className={`font-serif text-[18px] leading-none ${i === 2 && needAttn > 0 ? "text-rose" : card.accent}`}>
                      {stat.val}
                    </div>
                    <div className="text-[10px] text-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-muted mb-1.5">Klik untuk lihat daftar mahasiswa</div>
              <div className="w-full h-1.5 bg-cream-2 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${card.bar} rounded-full`} style={{ width: `${avgDone}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="bg-paper border border-border rounded-[14px] p-12 text-center text-muted">
          Tidak ada mata kuliah cocok dengan &quot;{topbarQ}&quot;.
        </div>
      )}

      {selected && (
        <CourseStudentModal card={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
