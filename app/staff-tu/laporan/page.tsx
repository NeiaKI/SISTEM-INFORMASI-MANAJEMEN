"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StaffTULaporanPage() {
  const { data: apiData } = useSWR("/api/staff-tu/laporan", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  if (!apiData) {
    return (
      <div className="text-stu-muted flex h-[400px] items-center justify-center">
        Memuat data laporan...
      </div>
    );
  }

  const { stats, tasks = [], report } = apiData;

  const handleExport = (format: "csv" | "xlsx" | "pdf") => {
    window.location.href = `/api/laporan/export?format=${format}`;
  };

  const totalDone = tasks.filter((t: any) => t.status === "selesai").length;
  const totalActive = tasks.filter((t: any) => t.status !== "selesai").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-stu-muted mb-0.5 text-[11px] tracking-[0.1em] uppercase">Modul</div>
          <div className="text-stu-text font-serif text-[22px]">
            Laporan <span className="text-stu-accent">Layanan TU</span>
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={() => handleExport("csv")}
            className="bg-stu-surface text-stu-muted border-stu-border hover:text-stu-text rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📊 Ekspor CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            className="bg-stu-surface text-stu-muted border-stu-border hover:text-stu-text rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📊 Ekspor Excel
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="bg-stu-surface text-stu-muted border-stu-border hover:text-stu-text rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📄 Ekspor PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: "✅",
            label: "Selesai",
            value: totalDone,
            color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
          },
          {
            icon: "⏳",
            label: "Berjalan",
            value: totalActive,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
          },
          {
            icon: "🎓",
            label: "Kelas Diproses",
            value: stats.totalKelas || 0,
            color: "bg-stu-accent/10 text-stu-accent",
          },
          {
            icon: "🔄",
            label: "Mahasiswa Aktif",
            value: stats.totalMahasiswa || 0,
            color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
          },
        ].map((card, i) => (
          <div key={i} className="bg-stu-surface border-stu-border rounded-xl border p-5">
            <div
              className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-lg ${card.color}`}
            >
              {card.icon}
            </div>
            <div className="text-stu-text font-serif text-[30px] leading-none">{card.value}</div>
            <div className="text-stu-muted mt-1 text-[12px]">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-stu-surface border-stu-border rounded-[14px] border p-5">
        <h3 className="text-stu-text mb-5 text-[14px] font-semibold">📊 Aktivitas per Minggu</h3>
        <div className="flex h-[100px] items-end gap-3">
          {report.weekly.map((w: any, i: number) => {
            const max = Math.max(...report.weekly.map((x: any) => x.done));
            const h = max > 0 ? (w.done / max) * 100 : 0;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-stu-accent font-mono text-[11px]">{w.done}</span>
                <div
                  className="bg-stu-accent/70 min-h-[4px] w-full rounded-t-md"
                  style={{ height: `${h}%` }}
                />
                <span className="text-stu-muted text-[10px]">{w.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-stu-surface border-stu-border rounded-[14px] border p-5">
        <h3 className="text-stu-text mb-4 text-[14px] font-semibold">🎯 Target KPI Layanan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {report.kpis.map((kpi: any, i: number) => (
            <div key={i} className="bg-stu-card border-stu-border rounded-xl border p-4">
              <div className="text-stu-text mb-1 text-[13px] font-semibold">{kpi.title}</div>
              <div className="text-stu-muted text-[12px] leading-relaxed">{kpi.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
