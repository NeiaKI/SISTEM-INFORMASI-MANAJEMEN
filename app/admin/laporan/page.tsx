"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminLaporanPage() {
  const { data: apiData } = useSWR("/api/admin/laporan", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  if (!apiData) {
    return (
      <div className="text-adm-muted flex h-[400px] items-center justify-center">
        Memuat data laporan...
      </div>
    );
  }

  const { tasks = [], integrations = [], report } = apiData;

  const totalDone = tasks.filter((t: any) => t.status === "selesai").length;
  const totalActive = tasks.filter((t: any) => t.status !== "selesai").length;

  const handleExport = (format: "csv" | "xlsx" | "pdf") => {
    window.location.href = `/api/laporan/export?format=${format}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-adm-muted mb-0.5 text-[11px] tracking-[0.1em] uppercase">Modul</div>
          <div className="text-adm-text font-serif text-[22px]">
            Laporan &amp; <span className="text-adm-accent">KPI Sistem</span>
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={() => handleExport("csv")}
            className="bg-adm-surface text-adm-muted border-adm-border hover:text-adm-text hover:border-adm-muted rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📊 Ekspor CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            className="bg-adm-surface text-adm-muted border-adm-border hover:text-adm-text hover:border-adm-muted rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📊 Ekspor Excel
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="bg-adm-surface text-adm-muted border-adm-border hover:text-adm-text hover:border-adm-muted rounded-lg border px-4 py-2 text-[13px] font-semibold transition-all"
          >
            📄 Ekspor PDF
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="bg-adm-surface border-adm-border rounded-xl border p-5">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-lg text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            ✅
          </div>
          <div className="text-adm-text font-serif text-[30px] leading-none">{totalDone}</div>
          <div className="text-adm-muted mt-1 text-[12px]">Tugas Selesai</div>
        </div>
        <div className="bg-adm-surface border-adm-border rounded-xl border p-5">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-lg text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            ⏳
          </div>
          <div className="text-adm-text font-serif text-[30px] leading-none">{totalActive}</div>
          <div className="text-adm-muted mt-1 text-[12px]">Masih Berjalan</div>
        </div>
        <div className="bg-adm-surface border-adm-border rounded-xl border p-5">
          <div className="bg-adm-accent/10 text-adm-accent mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-lg">
            🔗
          </div>
          <div className="text-adm-text font-serif text-[30px] leading-none">
            {integrations.filter((i: any) => i.status === "Stabil").length}
          </div>
          <div className="text-adm-muted mt-1 text-[12px]">Integrasi Stabil</div>
        </div>
        <div className="bg-adm-surface border-adm-border rounded-xl border p-5">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-lg text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            📅
          </div>
          <div className="text-adm-text font-serif text-[30px] leading-none">
            {report.weekly.reduce((a: number, w: any) => a + w.done, 0)}
          </div>
          <div className="text-adm-muted mt-1 text-[12px]">Total Aktivitas Bulan Ini</div>
        </div>
      </div>

      {/* Bar chart weekly */}
      <div className="bg-adm-surface border-adm-border rounded-[14px] border p-5">
        <h3 className="text-adm-text mb-5 text-[14px] font-semibold">📊 Aktivitas per Minggu</h3>
        <div className="flex h-[100px] items-end gap-3">
          {report.weekly.map((w: any, i: number) => {
            const max = Math.max(...report.weekly.map((x: any) => x.done));
            const h = max > 0 ? (w.done / max) * 100 : 0;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-adm-accent font-mono text-[11px]">{w.done}</span>
                <div
                  className="bg-adm-accent/70 min-h-[4px] w-full rounded-t-md transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-adm-muted text-[10px]">{w.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI */}
      <div className="bg-adm-surface border-adm-border rounded-[14px] border p-5">
        <h3 className="text-adm-text mb-4 text-[14px] font-semibold">🎯 Target KPI Operasional</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {report.kpis.map((kpi: any, i: number) => (
            <div key={i} className="bg-adm-card border-adm-border rounded-xl border p-4">
              <div className="text-adm-text mb-1 text-[13px] font-semibold">{kpi.title}</div>
              <div className="text-adm-muted text-[12px] leading-relaxed">{kpi.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Task table */}
      <div className="bg-adm-surface border-adm-border overflow-hidden rounded-[14px] border">
        <div className="border-adm-border border-b px-5 py-4">
          <h3 className="text-adm-text text-[14px] font-semibold">
            📋 Ringkasan Tugas Operasional
          </h3>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-adm-card/50">
              {["Tugas", "Kategori", "Status", "Progres"].map((h) => (
                <th
                  key={h}
                  className="text-adm-muted px-5 py-2.5 text-left text-[11px] font-semibold tracking-[0.06em] uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr
                key={task.id}
                className="border-adm-border/50 hover:bg-adm-hover border-t transition-colors"
              >
                <td className="text-adm-text px-5 py-3 font-medium">{task.title}</td>
                <td className="text-adm-muted px-5 py-3">{task.course}</td>
                <td className="px-5 py-3">
                  <span className="text-adm-accent text-[11px] font-medium capitalize">
                    {task.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-adm-border h-1.5 flex-1 overflow-hidden rounded-full">
                      <div
                        className="bg-adm-accent h-full rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-adm-muted w-8 text-right font-mono text-[11px]">
                      {task.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
