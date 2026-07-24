import { auth } from "@/lib/auth";

const SYSTEM_SETTINGS = [
  { title: "Semester aktif", detail: "Kelola tahun ajar dan semester default aplikasi." },
  { title: "Integrasi sistem", detail: "Pantau koneksi SIAKAD, LMS, email, dan SSO kampus." },
  {
    title: "Keamanan akses",
    detail: "Role guard, middleware, dan preferensi sesi dikelola melalui backend.",
  },
];

export default async function AdminProfilPage() {
  const session = await auth();
  const displayName = session?.user?.name || session?.user?.username || "Admin Sistem";
  const email = session?.user?.email || "admin@unpam.ac.id";

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <div className="text-adm-muted mb-0.5 text-[11px] tracking-[0.1em] uppercase">Modul</div>
        <div className="text-adm-text font-serif text-[22px]">
          Profil <span className="text-adm-accent">Admin</span>
        </div>
      </div>

      <div className="bg-adm-surface border-adm-border rounded-[14px] border p-6">
        <div className="border-adm-border mb-6 flex items-center gap-5 border-b pb-6">
          <div className="bg-adm-accent/15 text-adm-accent flex h-16 w-16 items-center justify-center rounded-full text-[24px] font-bold">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-adm-text text-[18px] font-semibold">{displayName}</div>
            <div className="text-adm-muted text-[13px]">{email}</div>
            <div className="text-adm-muted mt-0.5 text-[12px]">Administrator Sistem</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Role", value: "Admin Campus" },
            { label: "Sesi", value: "Auth.js" },
            { label: "Email", value: email },
            { label: "Unit", value: "Pusat Sistem Informasi" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-adm-muted mb-0.5 text-[11px] tracking-[0.08em] uppercase">
                {item.label}
              </div>
              <div className="text-adm-text text-[14px] font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-adm-surface border-adm-border rounded-[14px] border p-5">
        <h3 className="text-adm-text mb-4 text-[14px] font-semibold">⚙️ Pengaturan Sistem</h3>
        <div className="flex flex-col gap-3">
          {SYSTEM_SETTINGS.map((setting) => (
            <div
              key={setting.title}
              className="border-adm-border flex items-start gap-3 border-b py-3 last:border-0"
            >
              <div className="bg-adm-accent mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              <div>
                <div className="text-adm-text text-[13px] font-semibold">{setting.title}</div>
                <div className="text-adm-muted mt-0.5 text-[12px]">{setting.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
