import { requireSession, requireRole } from "@/lib/auth-guard";
import {
  buildWeeklyActivity,
  getOperationalTasks,
  getSystemIntegrations,
  OPERATIONAL_KPIS,
  serializeOperationalTask,
} from "@/lib/operational";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;
    const forbidden = requireRole(session, ["ADMIN"]);
    if (forbidden) return forbidden;

    const [tasks, integrations] = await Promise.all([
      getOperationalTasks("ADMIN"),
      getSystemIntegrations(),
    ]);

    return NextResponse.json({
      tasks: tasks.map(serializeOperationalTask),
      integrations: integrations.map(({ nama, status, catatan }) => ({
        name: nama,
        status,
        note: catatan,
      })),
      report: {
        weekly: buildWeeklyActivity(tasks),
        kpis: OPERATIONAL_KPIS.ADMIN,
      },
    });
  } catch (error) {
    console.error("Admin Laporan API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
