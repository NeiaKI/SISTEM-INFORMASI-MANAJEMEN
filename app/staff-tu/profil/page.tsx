import { createSeedData } from "@/data/sim-data";

const data = createSeedData().staff_tu;

export default function StaffTUProfilPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <div className="text-[11px] text-stu-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-stu-text">Profil <span className="text-stu-accent">Staff TU</span></div>
      </div>

      <div className="bg-stu-surface border border-stu-border rounded-[14px] p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-stu-border">
          <div className="w-16 h-16 rounded-full bg-stu-accent/15 flex items-center justify-center text-[24px] font-bold text-stu-accent">
            AY
          </div>
          <div>
            <div className="text-[18px] font-semibold text-stu-text">{data.userName}</div>
            <div className="text-[13px] text-stu-muted">{data.identity}</div>
            <div className="text-[12px] text-stu-muted mt-0.5">{data.roleLabel} · {data.semester}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Role", value: data.roleLabel },
            { label: "Semester Aktif", value: data.semester },
            { label: "Email", value: "ayu.kartika@unpam.ac.id" },
            { label: "Unit", value: "Tata Usaha Prodi SI" },
          ].map(item => (
            <div key={item.label}>
              <div className="text-[11px] text-stu-muted uppercase tracking-[0.08em] mb-0.5">{item.label}</div>
              <div className="text-[14px] text-stu-text font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stu-surface border border-stu-border rounded-[14px] p-5">
        <h3 className="text-[14px] font-semibold text-stu-text mb-4">⚙️ Pengaturan Sistem</h3>
        <div className="flex flex-col gap-3">
          {data.systemSettings.map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-stu-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-stu-accent mt-1.5 shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-stu-text">{s.title}</div>
                <div className="text-[12px] text-stu-muted mt-0.5">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
