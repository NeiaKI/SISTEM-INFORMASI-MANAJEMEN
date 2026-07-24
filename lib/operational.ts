import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

export const OPERATIONAL_KPIS = {
  ADMIN: [
    { title: "Ketersediaan Layanan", detail: "Uptime sistem di atas 99.9% sepanjang semester." },
    { title: "Sinkronisasi SIAKAD", detail: "Data mahasiswa sinkron secara harian otomatis." },
    {
      title: "Respon Reset Password",
      detail: "Proses reset password diselesaikan dalam < 10 menit.",
    },
  ],
  STAFF_TU: [
    {
      title: "Konsistensi data",
      detail: "Minimalkan mismatch data mahasiswa, mata kuliah, dan enrollment.",
    },
    {
      title: "Availability jam operasional",
      detail: "Target ketersediaan minimal 99% pada 06.00-23.00 WIB.",
    },
    {
      title: "Lead time reset akun",
      detail: "Permintaan reset akun selesai kurang dari 1 hari kerja.",
    },
  ],
} as const;

export async function getOperationalTasks(role: Role) {
  return prisma.tugasOperasional.findMany({
    where: { role },
    orderBy: { deadline: "asc" },
  });
}

export async function getSystemIntegrations() {
  return prisma.integrasiSistem.findMany({
    orderBy: { nama: "asc" },
  });
}

export function serializeOperationalTask(
  task: Awaited<ReturnType<typeof getOperationalTasks>>[number]
) {
  return {
    id: task.id,
    title: task.judul,
    course: task.kategori,
    status: task.status,
    priority: task.prioritas,
    progress: task.progres,
    deadline: task.deadline.toISOString().slice(0, 10),
  };
}

export function buildWeeklyActivity(tasks: Awaited<ReturnType<typeof getOperationalTasks>>) {
  const now = new Date();
  const weeks = [0, 1, 2, 3].map((offset) => {
    const end = new Date(now);
    end.setDate(now.getDate() - offset * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const done = tasks.filter(
      (task) => task.status === "selesai" && task.updatedAt >= start && task.updatedAt <= end
    ).length;
    const late = tasks.filter((task) => task.deadline < end && task.status !== "selesai").length;
    return { label: `M${4 - offset}`, done, late };
  });

  return weeks.reverse();
}
