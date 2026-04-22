import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const GRADE_DIST = [
  { course: "Pemrog. Lanjut", pillCls: "bg-forest/10 text-forest", students: 36, avg: 84.2, high: 97, low: 52, pass: 34, passP: 94, fail: 2, failP: 6, avgCls: "text-forest", bar: "from-forest to-teal", barW: 84 },
  { course: "Basis Data",     pillCls: "bg-teal/10 text-teal",     students: 40, avg: 79.8, high: 95, low: 48, pass: 36, passP: 90, fail: 4, failP: 10, avgCls: "text-teal",   bar: "from-teal to-[#2a9d8f]", barW: 80 },
  { course: "RPL",            pillCls: "bg-gold/15 text-gold",     students: 38, avg: 81.5, high: 92, low: 55, pass: 36, passP: 95, fail: 2, failP: 5,  avgCls: "text-gold",   bar: "from-gold to-[#f39c12]",  barW: 82 },
  { course: "Keamanan Sistem",pillCls: "bg-rose/10 text-rose",     students: 42, avg: null, high: null, low: null, pass: null, passP: null, fail: null, failP: null, avgCls: "text-muted", bar: "from-rose to-[#e74c3c]", barW: 0 },
];

const WEEKLY = [
  { label: "Mg 1", count: 28 },
  { label: "Mg 2", count: 42 },
  { label: "Mg 3", count: 35 },
  { label: "Mg 4", count: 52 },
  { label: "Mg 5", count: 30 },
];
const maxWeekly = Math.max(...WEEKLY.map(w => w.count));

export default function DosenLaporanPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[24px] text-ink">Laporan & Ekspor</div>
        </div>
        <div className="flex gap-2">
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📊 Ekspor Excel
          </button>
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📄 Ekspor PDF
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Pengumpulan", val: 187, icon: "📬", accent: "text-forest", bg: "bg-forest/8" },
          { label: "Mahasiswa Terlambat", val: 8,   icon: "⚠️", accent: "text-rose",   bg: "bg-rose/8"   },
          { label: "Rata-rata Nilai",    val: "82.4", icon: "⭐", accent: "text-gold",   bg: "bg-gold/8"   },
          { label: "Tingkat Pengumpulan", val: "94%", icon: "✅", accent: "text-teal",  bg: "bg-teal/8"   },
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

      {/* CHARTS ROW */}
      <div className="grid grid-cols-2 gap-4">
        {/* BAR CHART */}
        <div className="bg-paper border-[1.5px] border-border rounded-[14px] p-5 shadow-[0_1px_6px_rgba(26,26,20,0.06)]">
          <h3 className="text-[14px] font-semibold text-ink mb-5">📊 Pengumpulan per Minggu</h3>
          <div className="flex items-end gap-3 h-[100px]">
            {WEEKLY.map((w, i) => {
              const h = maxWeekly > 0 ? (w.count / maxWeekly) * 100 : 0;
              const isMax = w.count === maxWeekly;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className={`font-mono text-[11px] ${isMax ? "text-forest font-semibold" : "text-muted"}`}>{w.count}</span>
                  <div
                    className={`w-full rounded-t-md min-h-[4px] transition-all ${isMax ? "bg-gradient-to-b from-forest to-teal" : "bg-forest/30"}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted">{w.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPLETION RATE BY COURSE */}
        <div className="bg-paper border-[1.5px] border-border rounded-[14px] p-5 shadow-[0_1px_6px_rgba(26,26,20,0.06)]">
          <h3 className="text-[14px] font-semibold text-ink mb-5">📈 Tingkat Kelulusan per MK</h3>
          <div className="flex flex-col gap-3.5">
            {GRADE_DIST.filter(g => g.pass !== null).map((g, i) => (
              <div key={i}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${g.pillCls}`}>{g.course}</span>
                  <span className="font-mono text-muted">{g.passP}%</span>
                </div>
                <div className="w-full h-1.5 bg-cream-2 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${g.bar} rounded-full`} style={{ width: `${g.passP}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GRADE TABLE */}
      <div className="bg-paper border-[1.5px] border-border rounded-[14px] shadow-[0_1px_6px_rgba(26,26,20,0.06)] overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-[14px] font-semibold text-ink">📊 Distribusi Nilai per Mata Kuliah</h3>
        </div>
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr>
              {["Mata Kuliah", "Mhs", "Rata-rata", "Tertinggi", "Terendah", "Lulus", "Tidak Lulus"].map(h => (
                <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-muted uppercase tracking-[0.06em] bg-cream border-b-[1.5px] border-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRADE_DIST.map((g, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-forest/[0.03] transition-colors">
                <td className="py-3 px-5">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${g.pillCls}`}>{g.course}</span>
                </td>
                <td className="py-3 px-5 text-ink">{g.students}</td>
                <td className={`py-3 px-5 font-mono font-semibold ${g.avgCls}`}>
                  {g.avg !== null ? g.avg.toFixed(1) : "—"}
                </td>
                <td className="py-3 px-5 font-mono text-[12px] text-muted">{g.high ?? "—"}</td>
                <td className="py-3 px-5 font-mono text-[12px] text-muted">{g.low ?? "—"}</td>
                <td className="py-3 px-5">
                  {g.pass !== null ? (
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-forest/10 text-forest">{g.pass} ({g.passP}%)</span>
                  ) : (
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-muted/10 text-muted">Belum Dinilai</span>
                  )}
                </td>
                <td className="py-3 px-5">
                  {g.fail !== null ? (
                    <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-rose/10 text-rose">{g.fail} ({g.failP}%)</span>
                  ) : (
                    <span className="text-muted text-[12px]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
