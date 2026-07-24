import { requireSession, requireRole } from "@/lib/auth-guard";
import {
  getOperationalTasks,
  getSystemIntegrations,
  serializeOperationalTask,
} from "@/lib/operational";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;
    const forbidden = requireRole(session, ["ADMIN"]);
    if (forbidden) return forbidden;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalUsers, recentUsersCount, operationalTasks, integrations, notifications] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        getOperationalTasks("ADMIN"),
        getSystemIntegrations(),
        prisma.notifikasi.findMany({
          where: { idUser: session.userId },
          orderBy: { waktuKirim: "desc" },
          take: 5,
        }),
      ]);

    const tasks = operationalTasks.map(serializeOperationalTask);
    const operations = [
      {
        title: "Manajemen user",
        detail: "Buat akun, nonaktifkan, reset password, dan jaga role tetap konsisten.",
        status: "Aktif",
      },
      {
        title: "Semester aktif",
        detail: "Pusat kontrol tahun ajar, semester, bahasa, dan zona waktu default.",
        status: "Aktif",
      },
      {
        title: "Monitoring integrasi",
        detail: "Pantau SIAKAD, LMS, email, dan SSO dari satu panel.",
        status: "Aktif",
      },
    ];

    return NextResponse.json({
      stats: {
        totalUsers,
        recentUsersCount,
        activeIntegrationsCount: integrations.filter((item) => item.status === "Stabil").length,
        totalIntegrationsCount: integrations.length,
        alertCount: notifications.length,
      },
      tasks,
      integrations: integrations.map(({ nama, status, catatan }) => ({
        name: nama,
        status,
        note: catatan,
      })),
      operations,
      notifications,
    });
  } catch (error) {
    console.error("Admin Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
