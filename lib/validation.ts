import { z } from "zod";

export const broadcastNotificationSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi").max(160, "Judul terlalu panjang"),
  message: z.string().trim().min(1, "Pesan wajib diisi").max(5000, "Pesan terlalu panjang"),
  target: z.union([
    z.literal("semua"),
    z.object({
      idMk: z.string().uuid("ID mata kuliah tidak valid"),
    }),
  ]),
});

export const notificationPreferenceSchema = z.object({
  preferences: z.record(z.string(), z.boolean()),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export function validationErrorResponse(error: z.ZodError) {
  return {
    error: "Input tidak valid",
    issues: error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    })),
  };
}
