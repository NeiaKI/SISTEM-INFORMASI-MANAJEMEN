import { auth } from "@/lib/auth";

const SETTINGS = [
  {
    title: "Validasi akademik",
    detail: "Tinjau data mata kuliah, enrollment, dan kebutuhan layanan mahasiswa.",
  },
  {
    title: "Import pengguna",
    detail: "Gunakan template CSV resmi agar struktur data tetap konsisten.",
  },
  {
    title: "Antrean operasional",
    detail: "Pantau pekerjaan administratif melalui data backend terpusat.",
  },
];

export default async function StaffTUProfilPage() {
  const session = await auth();
  const displayName = session?.user?.name || session?.user?.username || "Staff Tata Usaha";
  const email = session?.user?.email || "staff-tu@unpam.ac.id";

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <div className="text-stu-muted mb-0.5 text-[11px] tracking-[0.1em] uppercase">Modul</div>
        <div className="text-stu-text font-serif text-[22px]">
          Profil <span className="text-stu-accent">Staff TU</span>
        </div>
      </div>
      <div className="bg-stu-surface border-stu-border rounded-[14px] border p-6">
        <div className="border-stu-border mb-6 flex items-center gap-5 border-b pb-6">
          <div className="bg-stu-accent/15 text-stu-accent flex h-16 w-16 items-center justify-center rounded-full text-[24px] font-bold">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-stu-text text-[18px] font-semibold">{displayName}</div>
            <div className="text-stu-muted text-[13px]">{email}</div>
            <div className="text-stu-muted mt-0.5 text-[12px]">Staff Tata Usaha</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Role", value: "Staff TU" },
            { label: "Sesi", value: "Auth.js" },
            { label: "Email", value: email },
            { label: "Unit", value: "Tata Usaha Prodi SI" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-stu-muted mb-0.5 text-[11px] tracking-[0.08em] uppercase">
                {item.label}
              </div>
              <div className="text-stu-text text-[14px] font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-stu-surface border-stu-border rounded-[14px] border p-5">
        <h3 className="text-stu-text mb-4 text-[14px] font-semibold">⚙️ Pengaturan Sistem</h3>
        <div className="flex flex-col gap-3">
          {SETTINGS.map((setting) => (
            <div
              key={setting.title}
              className="border-stu-border flex items-start gap-3 border-b py-3 last:border-0"
            >
              <div className="bg-stu-accent mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              <div>
                <div className="text-stu-text text-[13px] font-semibold">{setting.title}</div>
                <div className="text-stu-muted mt-0.5 text-[12px]">{setting.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
