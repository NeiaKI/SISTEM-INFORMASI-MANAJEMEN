import { requireSession, requireRole } from "@/lib/auth-guard";
import { notifyEnrolledStudents, notifyAllMahasiswa } from "@/lib/notifikasi";
import { validationErrorResponse, broadcastNotificationSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const forbidden = requireRole(session, ["DOSEN", "ADMIN"]);
    if (forbidden) return forbidden;

    const parsed = broadcastNotificationSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(validationErrorResponse(parsed.error), { status: 400 });
    }

    const { title, message, target } = parsed.data;
    const result =
      target === "semua"
        ? await notifyAllMahasiswa(title, message, "BROADCAST")
        : await notifyEnrolledStudents(target.idMk, title, message, "BROADCAST");

    return NextResponse.json(
      {
        message: result.count > 0 ? "Broadcast terkirim" : "Tidak ada penerima broadcast",
        recipientCount: result.count,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/notifikasi/broadcast Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
