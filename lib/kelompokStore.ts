export type KelompokMember = { nim: string; nama: string; role: string; joinedAt: string };
export type Kelompok = {
  id: string;
  name: string;
  course: string;
  maxSize: number;
  createdBy: string;
  mode: "mahasiswa" | "dosen_manual" | "dosen_random";
  members: KelompokMember[];
  createdAt: string;
};

const KEY = "sim_kelompok";

const SEED: Kelompok[] = [
  {
    id: "grp-seed-1",
    name: "Kelompok Alfa",
    course: "Analisis SI",
    maxSize: 5,
    createdBy: "231011400712",
    mode: "mahasiswa",
    members: [
      { nim: "231011400712", nama: "EKI KURNIAWAN",     role: "Leader",  joinedAt: "2026-04-01" },
      { nim: "231011450403", nama: "ANDRA RAFI IRGI",   role: "Anggota", joinedAt: "2026-04-01" },
      { nim: "231011400651", nama: "BAGUS ICHA SAPUTRA", role: "Anggota", joinedAt: "2026-04-02" },
    ],
    createdAt: "2026-04-01",
  },
];

export function getKelompokList(): Kelompok[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Kelompok[]) : SEED;
  } catch {
    return SEED;
  }
}
