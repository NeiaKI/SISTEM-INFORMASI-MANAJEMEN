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

export function getAllTaskData(): TaskStore {
  return getStore();
}
