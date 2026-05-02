import { createSeedData } from "@/data/sim-data";

const data = createSeedData().admin;

export default function AdminProfilPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <div className="text-[11px] text-adm-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-adm-text">Profil <span className="text-adm-accent">Admin</span></div>
      </div>

      <div className="bg-adm-surface border border-adm-border rounded-[14px] p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-adm-border">
          <div className="w-16 h-16 rounded-full bg-adm-accent/15 flex items-center justify-center text-[24px] font-bold text-adm-accent">
            AK
          </div>
          <div>
            <div className="text-[18px] font-semibold text-adm-text">{data.userName}</div>
            <div className="text-[13px] text-adm-muted">{data.identity}</div>
            <div className="text-[12px] text-adm-muted mt-0.5">{data.roleLabel} · {data.semester}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Role", value: data.roleLabel },
            { label: "Semester Aktif", value: data.semester },
            { label: "Email", value: "admin@unpam.ac.id" },
            { label: "Unit", value: "Pusat Sistem Informasi" },
          ].map(item => (
            <div key={item.label}>
              <div className="text-[11px] text-adm-muted uppercase tracking-[0.08em] mb-0.5">{item.label}</div>
              <div className="text-[14px] text-adm-text font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-adm-surface border border-adm-border rounded-[14px] p-5">
        <h3 className="text-[14px] font-semibold text-adm-text mb-4">⚙️ Pengaturan Sistem</h3>
        <div className="flex flex-col gap-3">
          {data.systemSettings.map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-adm-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-adm-accent mt-1.5 shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-adm-text">{s.title}</div>
                <div className="text-[12px] text-adm-muted mt-0.5">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
