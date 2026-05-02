const STORE_KEY = "sim_activity_log";

export type ActivityKind =
  | "status_changed"
  | "submission_added"
  | "comment_added"
  | "link_added"
  | "task_created"
  | "grade_given";

export interface ActivityEntry {
  id: string;
  taskId: string;
  taskTitle: string;
  taskCourse: string;
  kind: ActivityKind;
  actor: string;
  role: "mahasiswa" | "dosen" | "admin" | "staff_tu";
  detail: string;
  ts: number;
}

function load(): ActivityEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]") as ActivityEntry[]; }
  catch { return []; }
}

function save(entries: ActivityEntry[]): void {
  if (typeof window !== "undefined")
    localStorage.setItem(STORE_KEY, JSON.stringify(entries));
}

export function logActivity(entry: Omit<ActivityEntry, "id" | "ts">): void {
  const entries = load();
  entries.unshift({ ...entry, id: `log-${Date.now()}`, ts: Date.now() });
  save(entries.slice(0, 200));
}

export function getActivityLog(taskId?: string): ActivityEntry[] {
  const entries = load();
  return taskId ? entries.filter(e => e.taskId === taskId) : entries;
}

export function clearActivityLog(): void {
  save([]);
}

const KIND_LABELS: Record<ActivityKind, string> = {
  status_changed:  "Status diubah",
  submission_added: "Pengumpulan ditambah",
  comment_added:   "Komentar ditambah",
  link_added:      "Link dilampirkan",
  task_created:    "Tugas dibuat",
  grade_given:     "Nilai diberikan",
};

const KIND_ICONS: Record<ActivityKind, string> = {
  status_changed:  "🔄",
  submission_added: "📎",
  comment_added:   "💬",
  link_added:      "🔗",
  task_created:    "✏️",
  grade_given:     "⭐",
};

export { KIND_LABELS, KIND_ICONS };
