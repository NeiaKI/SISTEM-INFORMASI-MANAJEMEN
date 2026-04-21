import { createSeedData } from "@/data/sim-data";

const data = createSeedData().dosen;

const COURSES = [
  {
    icon: "💻",
    name: "Pemrograman Lanjut",
    code: "IF3204",
    semester: "Semester 4",
    sks: "3 SKS",
    students: 36,
    tasks: 6,
    progress: 78,
    accent: "text-forest",
    iconBg: "bg-forest/10",
    bar: "from-forest to-teal",
  },
  {
    icon: "🗃️",
    name: "Basis Data",
    code: "IF3106",
    semester: "Semester 4",
    sks: "3 SKS",
    students: 40,
    tasks: 5,
    progress: 55,
    accent: "text-teal",
    iconBg: "bg-teal/10",
    bar: "from-teal to-[#2a9d8f]",
  },
  {
    icon: "⚙️",
    name: "Rekayasa Perangkat Lunak",
    code: "IF3308",
    semester: "Semester 5",
    sks: "3 SKS",
    students: 38,
    tasks: 4,
    progress: 37,
    accent: "text-gold",
    iconBg: "bg-gold/10",
    bar: "from-gold to-[#f39c12]",
  },
  {
    icon: "🔐",
    name: "Keamanan Sistem Informasi",
    code: "IF3410",
    semester: "Semester 6",
    sks: "2 SKS",
    students: 42,
    tasks: 3,
    progress: 19,
    accent: "text-rose",
    iconBg: "bg-rose/10",
    bar: "from-rose to-[#e74c3c]",
  },
];

export default function DosenMatakuliahPage() {
  const totalStudents = COURSES.reduce((a, c) => a + c.students, 0);
  const totalTasks = COURSES.reduce((a, c) => a + c.tasks, 0);
  const avgProgress = Math.round(COURSES.reduce((a, c) => a + c.progress, 0) / COURSES.length);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[24px] text-ink">Mata Kuliah yang Diampu</div>
      </div>

      {/* SUMMARY ROW */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Mata Kuliah", val: COURSES.length, icon: "📚", accent: "text-forest", bg: "bg-forest/8" },
          { label: "Total Mahasiswa", val: totalStudents, icon: "🎓", accent: "text-teal", bg: "bg-teal/8" },
          { label: "Rata-rata Progres", val: `${avgProgress}%`, icon: "📈", accent: "text-gold", bg: "bg-gold/8" },
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

      {/* COURSE GRID */}
      <div className="grid grid-cols-2 gap-4">
        {COURSES.map((c, idx) => (
          <div key={idx} className="bg-paper border-[1.5px] border-border rounded-[14px] p-5 shadow-[0_1px_6px_rgba(26,26,20,0.06)] hover:-translate-y-0.5 transition-transform">
            <div className="flex gap-3.5 items-start mb-4">
              <div className={`w-[46px] h-[46px] rounded-xl ${c.iconBg} flex items-center justify-center text-[24px] shrink-0`}>
                {c.icon}
              </div>
              <div>
                <div className="font-semibold text-ink text-[15px]">{c.name}</div>
                <div className="text-[12px] text-muted mt-0.5">{c.code} · {c.semester} · {c.sks}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
              {[
                { label: "Mahasiswa", val: c.students },
                { label: "Tugas", val: c.tasks },
                { label: "Progres", val: `${c.progress}%` },
              ].map((stat, i) => (
                <div key={i} className="bg-cream rounded-lg py-2.5 px-2">
                  <div className={`font-serif text-[20px] leading-none ${c.accent}`}>{stat.val}</div>
                  <div className="text-[11px] text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="w-full h-1.5 bg-cream-2 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${c.bar} rounded-full transition-all`}
                style={{ width: `${c.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
