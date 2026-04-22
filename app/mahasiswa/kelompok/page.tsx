import { createSeedData } from "@/data/sim-data";

const data = createSeedData().mahasiswa;

const MEMBER_GRADIENTS = [
  "from-mhs-amber to-mhs-purple",
  "from-mhs-rose to-mhs-purple",
  "from-mhs-teal to-mhs-green",
  "from-mhs-amber to-mhs-rose",
  "from-mhs-purple to-mhs-teal",
];

const GROUP_ICONS = ["📱", "🔬", "📚", "🤖", "🚀"];

export default function KelompokPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-mhs-text">Data Kelompok</div>
      </div>

      {data.groups.map((group, gi) => (
        <div key={gi} className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
          {/* HEADER */}
          <div className="px-5 py-4 border-b border-mhs-border flex items-center gap-2.5">
            <span className="text-[20px]">{GROUP_ICONS[gi % GROUP_ICONS.length]}</span>
            <div>
              <div className="text-[14px] font-semibold text-mhs-text">{group.name}</div>
              <div className="text-[11px] text-mhs-muted mt-0.5">{group.course} · {group.mode}</div>
            </div>
          </div>

          {/* MEMBER TABLE */}
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Nama</th>
                <th className="text-left py-2 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Peran</th>
              </tr>
            </thead>
            <tbody>
              {group.members.map((member, mi) => (
                <tr key={mi} className="border-t border-mhs-border/50 hover:bg-mhs-hover transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[mi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}
                      >
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-mhs-text font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-mhs-purple/15 text-mhs-purple">
                      {member.role}
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
