const STORE_KEY = "sim_task_store";

export interface Submission {
  id: string;
  fileName: string;
  fileSize: string;
  note: string;
  submittedAt: string;
  submittedBy?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  role?: string;
}

export interface TaskEntry {
  taskTitle: string;
  taskCourse: string;
  submissions: Submission[];
  comments: Comment[];
  completed?: boolean;
}

export type TaskStore = Record<string, TaskEntry>;

function getStore(): TaskStore {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}") as TaskStore; }
  catch { return {}; }
}

function save(store: TaskStore): void {
  if (typeof window !== "undefined")
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function getTaskData(taskId: string): TaskEntry {
  const s = getStore();
  return s[taskId] ?? { taskTitle: "", taskCourse: "", submissions: [], comments: [] };
}

export function addSubmission(
  taskId: string,
  taskTitle: string,
  taskCourse: string,
  sub: Omit<Submission, "id" | "submittedAt">
): void {
  const s = getStore();
  if (!s[taskId]) s[taskId] = { taskTitle, taskCourse, submissions: [], comments: [] };
  s[taskId].submissions.unshift({
    ...sub,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
  });
  save(s);
}

export function addComment(
  taskId: string,
  taskTitle: string,
  taskCourse: string,
  comment: Omit<Comment, "id" | "time">
): void {
  const s = getStore();
  if (!s[taskId]) s[taskId] = { taskTitle, taskCourse, submissions: [], comments: [] };
  s[taskId].comments.push({
    ...comment,
    id: `cmt-${Date.now()}`,
    time: new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
  });
  save(s);
}

export function markCompleted(taskId: string): void {
  const s = getStore();
  if (s[taskId]) s[taskId].completed = true;
  save(s);
}

export function getAllTaskData(): TaskStore {
  return getStore();
}

const SEED_COMMENTS: Array<{ taskId: string; taskTitle: string; taskCourse: string; comment: Comment }> = [
  { taskId: "dsn-1", taskTitle: "Studi Kasus BPMN", taskCourse: "Analisis SI",
    comment: { id: "seed-c1", author: "Eki Kurniawan", role: "mahasiswa", text: "Pak, apakah diagram swimlane perlu disertakan juga?", time: "21 Apr 2026, 09.15" } },
  { taskId: "dsn-1", taskTitle: "Studi Kasus BPMN", taskCourse: "Analisis SI",
    comment: { id: "seed-c2", author: "Maya Sari", role: "mahasiswa", text: "Saya sudah upload, tapi file saya tidak muncul di list. Mohon dicek pak 🙏", time: "21 Apr 2026, 11.42" } },
  { taskId: "dsn-2", taskTitle: "Sprint Board UI Responsif", taskCourse: "Interaksi Manusia & Komputer",
    comment: { id: "seed-c3", author: "Andra Rafi Irgi", role: "mahasiswa", text: "Boleh pakai Figma atau harus Balsamiq pak?", time: "22 Apr 2026, 08.05" } },
  { taskId: "dsn-2", taskTitle: "Sprint Board UI Responsif", taskCourse: "Interaksi Manusia & Komputer",
    comment: { id: "seed-c4", author: "Fajar Nugraha", role: "mahasiswa", text: "sudah dikumpulkan pak, mohon feedback-nya 🙏", time: "22 Apr 2026, 14.30" } },
  { taskId: "dsn-3", taskTitle: "Kuis Keamanan Informasi", taskCourse: "Keamanan Sistem",
    comment: { id: "seed-c5", author: "Indra Permana", role: "mahasiswa", text: "sudah nih pakk", time: "23 Apr 2026, 10.27" } },
  { taskId: "dsn-4", taskTitle: "ERD & Normalisasi Database", taskCourse: "Basis Data",
    comment: { id: "seed-c6", author: "Wahyu Nugroho", role: "mahasiswa", text: "Pak deadline bisa diperpanjang? kelompok kami masih revisi normalisasi 3NF", time: "23 Apr 2026, 16.55" } },
];

export function seedDummyComments(): void {
  const s = getStore();
  let changed = false;
  for (const { taskId, taskTitle, taskCourse, comment } of SEED_COMMENTS) {
    if (!s[taskId]) {
      s[taskId] = { taskTitle, taskCourse, submissions: [], comments: [] };
    }
    if (!s[taskId].comments.find(c => c.id === comment.id)) {
      s[taskId].comments.push(comment);
      changed = true;
    }
  }
  if (changed) save(s);
}
