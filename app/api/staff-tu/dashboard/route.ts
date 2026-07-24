import { requireSession, requireRole } from "@/lib/auth-guard";
import { getOperationalTasks, serializeOperationalTask } from "@/lib/operational";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;
    const forbidden = requireRole(session, ["STAFF_TU"]);
    if (forbidden) return forbidden;

    const [totalMahasiswa, totalDosen, totalKelas, operationalTasks, notifications] =
      await Promise.all([
        prisma.mahasiswa.count(),
        prisma.dosen.count(),
        prisma.mataKuliah.count(),
        getOperationalTasks("STAFF_TU"),
        prisma.notifikasi.findMany({
          where: { idUser: session.userId },
          orderBy: { waktuKirim: "desc" },
          take: 5,
        }),
      ]);

    const tasks = operationalTasks.map(serializeOperationalTask);

    return NextResponse.json({
      stats: {
        totalMahasiswa,
        totalDosen,
        totalKelas,
        backlogAktif: tasks.filter((task) => task.status !== "selesai").length,
      },
      tasks,
      notifications,
    });
  } catch (error) {
    console.error("Staff TU Dashboard Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
