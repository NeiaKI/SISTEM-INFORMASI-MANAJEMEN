import { requireSession, requireRole } from "@/lib/auth-guard";
import {
  buildWeeklyActivity,
  getOperationalTasks,
  OPERATIONAL_KPIS,
  serializeOperationalTask,
} from "@/lib/operational";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;
    const forbidden = requireRole(session, ["STAFF_TU"]);
    if (forbidden) return forbidden;

    const [totalMahasiswa, totalDosen, totalKelas, operationalTasks] = await Promise.all([
      prisma.mahasiswa.count(),
      prisma.dosen.count(),
      prisma.mataKuliah.count(),
      getOperationalTasks("STAFF_TU"),
    ]);

    const tasks = operationalTasks.map(serializeOperationalTask);

    return NextResponse.json({
      stats: { totalMahasiswa, totalDosen, totalKelas },
      tasks,
      report: {
        weekly: buildWeeklyActivity(operationalTasks),
        kpis: OPERATIONAL_KPIS.STAFF_TU,
      },
    });
  } catch (error) {
    console.error("Staff TU Laporan Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
