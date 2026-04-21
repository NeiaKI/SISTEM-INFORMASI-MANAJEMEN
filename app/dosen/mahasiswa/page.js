import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const STUDENTS = [
  {
    name: "Eki Kurniawan",
    email: "eki@email.com",
    nim: "2022001234",
    courses: "Pemrog. Lanjut, Basis Data",
    done: 10,
    total: 12,
    avg: 87.5,
    status: "aktif",
    avatarGrad: "from-forest to-teal",
  },
  {
    name: "Rina Amalia",
    email: "rina@email.com",
    nim: "2022001235",
    courses: "Pemrog. Lanjut, RPL",
    done: 12,
    total: 12,
    avg: 92.3,
    status: "sangat_aktif",
    avatarGrad: "from-[#c0392b] to-[#e74c3c]",
  },
  {
    name: "Dani Nugraha",
    email: "dani@email.com",
    nim: "2022001236",
    courses: "Pemrog. Lanjut, Keamanan",
    done: 8,
    total: 12,
    avg: 74.0,
    status: "cukup_aktif",
    avatarGrad: "from-gold to-[#f39c12]",
  },
  {
    name: "Andi Syahputra",
    email: "andi@email.com",
    nim: "2022001240",
    courses: "Basis Data, RPL",
    done: 5,
    total: 12,
    avg: 58.2,
    status: "perlu_perhatian",
    avatarGrad: "from-[#636e72] to-[#b2bec3]",
  },
];

const STATUS_MAP = {
  aktif:          { cls: "bg-teal/10 text-teal",     label: "Aktif"           },
  sangat_aktif:   { cls: "bg-forest/10 text-forest", label: "Sangat Aktif"   },
  cukup_aktif:    { cls: "bg-gold/15 text-gold",     label: "Cukup Aktif"    },
  perlu_perhatian:{ cls: "bg-rose/10 text-rose",     label: "Perlu Perhatian"},
};

const AVG_CLS = {
  aktif:          "text-forest",
  sangat_aktif:   "text-forest",
  cukup_aktif:    "text-gold",
  perlu_perhatian:"text-rose",
};

const BAR_CLS = {
  aktif:          "from-forest to-teal",
  sangat_aktif:   "from-teal to-[#2a9d8f]",
  cukup_aktif:    "from-gold to-[#f39c12]",
  perlu_perhatian:"from-rose to-[#e74c3c]",
};

function initials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function DosenMahasiswaPage() {
  const totalStudents = STUDENTS.length;
  const avgAll = (STUDENTS.reduce((a, s) => a + s.avg, 0) / totalStudents).toFixed(1);
  const needAttention = STUDENTS.filter(s => s.status === "perlu_perhatian").length;
  const topStudent = [...STUDENTS].sort((a, b) => b.avg - a.avg)[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Data Mahasiswa</div>
        </div>
        <div className="flex gap-2">
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📊 Ekspor Excel
          </button>
        </div>
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Mahasiswa", val: totalStudents, icon: "🎓", accent: "text-forest", bg: "bg-forest/8" },
          { label: "Rata-rata Nilai", val: avgAll, icon: "⭐", accent: "text-gold", bg: "bg-gold/8" },
          { label: "Perlu Perhatian", val: needAttention, icon: "⚠️", accent: "text-rose", bg: "bg-rose/8" },
          { label: "Nilai Tertinggi", val: topStudent.avg, icon: "🏆", accent: "text-teal", bg: "bg-teal/8" },
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

      {/* TABLE */}
      <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] overflow-hidden">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr>
              {["Mahasiswa", "NIM", "Mata Kuliah", "Tugas Selesai", "Rata-rata Nilai", "Status Keaktifan"].map(h => (
                <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-muted uppercase tracking-[0.06em] bg-cream border-b-[1.5px] border-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, idx) => {
              const st = STATUS_MAP[s.status];
              const pct = Math.round((s.done / s.total) * 100);
              return (
                <tr key={s.nim} className="border-b border-border/50 last:border-0 hover:bg-forest/[0.03] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.avatarGrad} flex items-center justify-center text-[12px] font-bold text-white shrink-0`}>
                        {initials(s.name)}
                      </div>
                      <div>
                        <div className="font-medium text-ink">{s.name}</div>
                        <div className="text-[11px] text-muted">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-[12px] text-muted">{s.nim}</td>
                  <td className="py-3.5 px-5 text-[12px] text-muted">{s.courses}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-cream-2 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${BAR_CLS[s.status]} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-mono text-[12px] text-ink-2">{s.done}/{s.total}</span>
                    </div>
                  </td>
                  <td className={`py-3.5 px-5 font-mono text-[14px] font-semibold ${AVG_CLS[s.status]}`}>
                    {s.avg.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10.5px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
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
