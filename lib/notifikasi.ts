import { prisma } from "@/lib/prisma";
import type { JenisNotifikasi } from "@prisma/client";

interface CreateNotifParams {
  idUser: string;
  judul: string;
  pesan: string;
  jenis: JenisNotifikasi;
}

interface BroadcastResult {
  count: number;
}

/** Create a single notification for one user */
export async function createNotifikasi(params: CreateNotifParams) {
  try {
    return await prisma.notifikasi.create({
      data: {
        idUser: params.idUser,
        judul: params.judul,
        pesan: params.pesan,
        jenis: params.jenis,
      },
    });
  } catch (error) {
    console.error("Gagal membuat notifikasi:", error);
    return null;
  }
}

export async function notifyAllMahasiswa(
  judul: string,
  pesan: string,
  jenis: JenisNotifikasi = "INFO"
): Promise<BroadcastResult> {
  const mahasiswa = await prisma.mahasiswa.findMany({
    select: { userId: true },
  });

  return createManyNotifications(
    mahasiswa.map((mhs) => mhs.userId),
    judul,
    pesan,
    jenis
  );
}

/**
 * Notify all mahasiswa enrolled in a course.
 * Looks up each mahasiswa's userId to create notifications
 * in a single createMany call for performance.
 */
export async function notifyEnrolledStudents(
  idMk: string,
  judul: string,
  pesan: string,
  jenis: JenisNotifikasi = "INFO"
): Promise<BroadcastResult> {
  const enrollments = await prisma.enrollment.findMany({
    where: { idMk },
    include: { mahasiswa: true },
  });

  return createManyNotifications(
    enrollments.map((enrollment) => enrollment.mahasiswa.userId),
    judul,
    pesan,
    jenis
  );
}

async function createManyNotifications(
  userIds: string[],
  judul: string,
  pesan: string,
  jenis: JenisNotifikasi
): Promise<BroadcastResult> {
  const uniqueUserIds = [...new Set(userIds)];
  if (uniqueUserIds.length === 0) return { count: 0 };

  const result = await prisma.notifikasi.createMany({
    data: uniqueUserIds.map((idUser) => ({ idUser, judul, pesan, jenis })),
  });

  return { count: result.count };
}
