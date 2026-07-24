import { describe, it, expect, vi } from "bun:test";
import { POST } from "./route";
import * as notifikasiLib from "@/lib/notifikasi";
import * as authGuardLib from "@/lib/auth-guard";
import { NextResponse } from "next/server";

describe("POST /api/notifikasi/broadcast", () => {
  it("rejects unauthorized roles", async () => {
    vi.spyOn(authGuardLib, "requireSession").mockResolvedValue({
      userId: "123",
      role: "MAHASISWA",
      email: "mhs@test.com",
    });
    vi.spyOn(authGuardLib, "requireRole").mockReturnValue(
      NextResponse.json({ error: "Forbidden" }, { status: 403 })
    );

    const req = new Request("http://localhost/api/notifikasi/broadcast", {
      method: "POST",
      body: JSON.stringify({ title: "Test", message: "Test msg", target: "semua" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("validates payload schema", async () => {
    vi.spyOn(authGuardLib, "requireSession").mockResolvedValue({
      userId: "456",
      role: "ADMIN",
      email: "adm@test.com",
    });
    vi.spyOn(authGuardLib, "requireRole").mockReturnValue(null);

    const req = new Request("http://localhost/api/notifikasi/broadcast", {
      method: "POST",
      body: JSON.stringify({ title: "", message: "Test msg", target: "invalid_target" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Input tidak valid");
  });

  it("calls notifyAllMahasiswa when target is 'semua'", async () => {
    vi.spyOn(authGuardLib, "requireSession").mockResolvedValue({
      userId: "456",
      role: "ADMIN",
      email: "adm@test.com",
    });
    vi.spyOn(authGuardLib, "requireRole").mockReturnValue(null);
    const mockNotify = vi
      .spyOn(notifikasiLib, "notifyAllMahasiswa")
      .mockResolvedValue({ count: 5 });

    const req = new Request("http://localhost/api/notifikasi/broadcast", {
      method: "POST",
      body: JSON.stringify({ title: "Test", message: "Test msg", target: "semua" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(mockNotify).toHaveBeenCalledWith("Test", "Test msg", "BROADCAST");
    const body = await res.json();
    expect(body.recipientCount).toBe(5);
  });
});
