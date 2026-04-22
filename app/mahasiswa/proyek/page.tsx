import { createSeedData } from "@/data/sim-data";

const data = createSeedData().mahasiswa;

const PHASE_COLORS = {
  "selesai": "bg-mhs-green/15 text-mhs-green",
  "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
  "menunggu review": "bg-mhs-purple/15 text-mhs-purple",
  "belum mulai": "bg-mhs-border text-mhs-muted",
};

const GRADIENT_FILLS = [
  "from-mhs-amber to-mhs-amber-2",
  "from-mhs-teal to-[#67e8f9]",
  "from-mhs-green to-[#86efac]",
  "from-mhs-purple to-[#c4b5fd]",
];

const PROJECT_ICONS = ["📱", "📚", "🔒", "🤖", "🚀", "🎯"];
const MEMBER_GRADIENTS = [
  "from-mhs-amber to-mhs-purple",
  "from-mhs-rose to-mhs-purple",
  "from-mhs-teal to-mhs-green",
  "from-mhs-amber to-mhs-rose",
  "from-mhs-purple to-mhs-teal",
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function ProyekPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[22px] text-mhs-text">Manajemen Proyek</div>
        </div>
        <button className="bg-mhs-amber text-mhs-on px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-mhs-amber-2 transition-colors">
          + Proyek Baru
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.projects.map((project, idx) => {
          const fillClass = GRADIENT_FILLS[idx % GRADIENT_FILLS.length];
          const icon = PROJECT_ICONS[idx % PROJECT_ICONS.length];
          const pctColor = ["text-mhs-amber", "text-mhs-teal", "text-mhs-green", "text-mhs-purple"][idx % 4];

          return (
            <div
              key={project.id}
              className="bg-mhs-card border border-mhs-border rounded-[14px] p-5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
            >
              {/* TOP */}
              <div className="flex items-start gap-2.5 mb-3.5">
                <div className="text-[24px]">{icon}</div>
                <div>
                  <div className="text-[15px] font-semibold text-mhs-text">{project.title}</div>
                  <div className="text-[11px] text-mhs-muted mt-0.5">{project.course} · {project.team}</div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="h-1.5 bg-mhs-border rounded-full overflow-hidden mb-1.5">
                <div className={`h-full bg-gradient-to-r ${fillClass} rounded-full`} style={{ width: `${project.progress}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-mhs-muted mb-2.5">
                <span>{project.progress}% selesai</span>
                <span className={`font-mono ${pctColor}`}>{project.phase}</span>
              </div>

              {/* DEADLINE */}
              <div className={`font-mono text-[11px] text-mhs-muted mb-2.5`}>
                Milestone: <span className="text-mhs-amber">{formatDate(project.nextMilestone)}</span>
              </div>

              {/* DELIVERABLES */}
              <div className="flex flex-wrap gap-1 mb-3.5">
                {project.deliverables.map((d, di) => (
                  <span
                    key={di}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${PHASE_COLORS[d.status as keyof typeof PHASE_COLORS] ?? "bg-mhs-border text-mhs-muted"}`}
                  >
                    {d.title}
                  </span>
                ))}
              </div>

              {/* MEMBERS */}
              <div className="flex">
                {(project.deliverables.map(d => d.owner).filter((v, i, a) => a.indexOf(v) === i)).slice(0, 4).map((owner, oi) => (
                  <div
                    key={oi}
                    className={`w-[26px] h-[26px] rounded-full border-2 border-mhs-card bg-gradient-to-br ${MEMBER_GRADIENTS[oi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[9px] font-bold text-white ${oi > 0 ? "-ml-1.5" : ""}`}
                  >
                    {owner.slice(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* DELIVERABLES DETAIL */}
      {data.projects.map((project, idx) => (
        <div key={project.id} className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
          <div className="flex items-center px-5 py-4 border-b border-mhs-border">
            <h3 className="text-[14px] font-semibold text-mhs-text flex-1">{PROJECT_ICONS[idx % PROJECT_ICONS.length]} {project.title}</h3>
            <span className="text-[12px] text-mhs-muted">{project.course}</span>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Deliverable</th>
                <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Owner</th>
                <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Deadline</th>
                <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Status</th>
              </tr>
            </thead>
            <tbody>
              {project.deliverables.map((d, di) => (
                <tr key={di} className="border-t border-mhs-border/50 hover:bg-mhs-hover transition-colors">
                  <td className="py-3 px-5 font-medium text-mhs-text">{d.title}</td>
                  <td className="py-3 px-5 text-mhs-muted">{d.owner}</td>
                  <td className="py-3 px-5 font-mono text-[12px] text-mhs-muted">{formatDate(d.deadline)}</td>
                  <td className="py-3 px-5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${PHASE_COLORS[d.status as keyof typeof PHASE_COLORS] ?? "bg-mhs-border text-mhs-muted"}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
