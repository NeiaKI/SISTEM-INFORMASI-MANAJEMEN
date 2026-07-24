-- CreateTable
CREATE TABLE "tugas_operasional" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "prioritas" TEXT NOT NULL,
    "progres" INTEGER NOT NULL DEFAULT 0,
    "deadline" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tugas_operasional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrasi_sistem" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "catatan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrasi_sistem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tugas_operasional_role_status_idx" ON "tugas_operasional"("role", "status");

-- CreateIndex
CREATE INDEX "tugas_operasional_role_deadline_idx" ON "tugas_operasional"("role", "deadline");

-- CreateIndex
CREATE UNIQUE INDEX "integrasi_sistem_nama_key" ON "integrasi_sistem"("nama");
