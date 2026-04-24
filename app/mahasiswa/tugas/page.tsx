"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Paperclip, X, Send, Upload, CheckCircle2 } from "lucide-react";
import { createSeedData, type SeedData } from "@/data/sim-data";
import { getTaskData, addSubmission, addComment, getAllTaskData, type TaskEntry } from "@/lib/taskStore";

type MhsTask = SeedData["mahasiswa"]["tasks"][0];

const allData = createSeedData().mahasiswa;

/* ── Helpers ─────────────────────────────────── */
const PRIORITY_BORDER = {
  kritis:  "border-l-[3px] border-l-mhs-rose",
  tinggi:  "border-l-[3px] border-l-mhs-rose",
  sedang:  "border-l-[3px] border-l-mhs-amber",
  rendah:  "border-l-[3px] border-l-mhs-green",
};
const PRIORITY_DOT = {
  kritis:  "bg-mhs-rose",
  tinggi:  "bg-mhs-rose",
  sedang:  "bg-mhs-amber",
  rendah:  "bg-mhs-green",
};
const PRIORITY_LABEL = {
  kritis:  { cls: "bg-mhs-rose/15 text-mhs-rose",   label: "Kritis"  },
  tinggi:  { cls: "bg-mhs-rose/10 text-mhs-rose",    label: "Tinggi"  },
  sedang:  { cls: "bg-mhs-amber/15 text-mhs-amber",  label: "Sedang"  },
  rendah:  { cls: "bg-mhs-green/15 text-mhs-green",  label: "Rendah"  },
};
const MK_COLORS = [
  "bg-[#e11d48]/10 text-[#e11d48]",
  "bg-[#0284c7]/10 text-[#0284c7]",
  "bg-[#7c3aed]/10 text-[#7c3aed]",
  "bg-[#d97706]/10 text-[#d97706]",
  "bg-[#15803d]/10 text-[#15803d]",
  "bg-[#0891b2]/10 text-[#0891b2]",
];
function mkColor(course: string) {
  const idx = [...course].reduce((a, c) => a + c.charCodeAt(0), 0) % MK_COLORS.length;
  return MK_COLORS[idx];
}
function deadlineInfo(dateStr: string, isSelesai = false) {
  if (isSelesai) return { label: "Selesai", cls: "bg-mhs-green/15 text-mhs-green" };
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (diff < 0)  return { label: `${Math.abs(diff)} hari telat`, cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff === 0) return { label: "Hari ini",                    cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff <= 3) return { label: `H-${diff}`,                    cls: "bg-mhs-rose/15 text-mhs-rose" };
  if (diff <= 7) return { label: `H-${diff}`,                    cls: "bg-mhs-amber/15 text-mhs-amber" };
  return              { label: `H-${diff}`,                      cls: "bg-mhs-teal/10 text-mhs-teal" };
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

/* ── Kanban column config ────────────────────── */
const COLUMNS = [
  { id: "belum mulai",       label: "Belum Mulai", dot: "bg-mhs-muted",   headBg: "bg-mhs-muted/8",   headBorder: "border-mhs-muted/20",   countCls: "bg-mhs-muted/15 text-mhs-muted"   },
  { id: "sedang dikerjakan", label: "Dikerjakan",  dot: "bg-mhs-teal",    headBg: "bg-mhs-teal/8",    headBorder: "border-mhs-teal/20",    countCls: "bg-mhs-teal/15 text-mhs-teal"     },
  { id: "menunggu review",   label: "Review",      dot: "bg-mhs-purple",  headBg: "bg-mhs-purple/8",  headBorder: "border-mhs-purple/20",  countCls: "bg-mhs-purple/15 text-mhs-purple" },
  { id: "selesai",           label: "Selesai",     dot: "bg-mhs-green",   headBg: "bg-mhs-green/8",   headBorder: "border-mhs-green/20",   countCls: "bg-mhs-green/15 text-mhs-green"   },
];

/* ── Task Card ───────────────────────────────── */
function TaskCard({ task, localData, onOpen }: { task: MhsTask; localData: TaskEntry | undefined; onOpen: (t: MhsTask) => void }) {
  const dl = deadlineInfo(task.deadline, task.status === "selesai");
  const pLabel = PRIORITY_LABEL[task.priority as keyof typeof PRIORITY_LABEL] ?? { cls: "bg-mhs-muted/15 text-mhs-muted", label: task.priority };
  const totalComments = (task.comments?.length || 0) + (localData?.comments?.length || 0);
  const totalSubs     = (task.submissions?.length || 0) + (localData?.submissions?.length || 0);

  return (
    <div
      onClick={() => onOpen(task)}
      className={`bg-mhs-surface rounded-xl ${PRIORITY_BORDER[task.priority as keyof typeof PRIORITY_BORDER] ?? "border-l-[3px] border-l-mhs-border"} shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group p-4`}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md truncate max-w-[140px] ${mkColor(task.course)}`}>
          {task.course}
        </span>
        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${dl.cls}`}>
          {dl.label}
        </span>
      </div>

      <div className="text-[13.5px] font-semibold text-mhs-text leading-snug mb-1.5 group-hover:text-mhs-amber transition-colors">
        {task.title}
      </div>

      {task.note && (
        <p className="text-[11px] text-mhs-muted leading-relaxed mb-3 line-clamp-2">
          {task.note}
        </p>
      )}

      {task.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-mhs-muted">Progress</span>
            <span className="font-mono text-[10px] text-mhs-amber">{task.progress}%</span>
          </div>
          <div className="h-[5px] bg-mhs-border rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-mhs-amber to-mhs-amber-2 transition-all duration-700" style={{ width: `${task.progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${task.type === "kelompok" ? "bg-mhs-purple/10 text-mhs-purple" : "bg-mhs-teal/10 text-mhs-teal"}`}>
          {task.type === "kelompok" ? "👥 Kelompok" : "👤 Individu"}
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${pLabel.cls}`}>
          {pLabel.label}
        </span>

        {/* Comment + Submission counts */}
        <div className="ml-auto flex items-center gap-2">
          {totalComments > 0 && (
            <div className="flex items-center gap-0.5 text-mhs-muted">
              <MessageSquare size={11} />
              <span className="text-[10px] font-medium">{totalComments}</span>
            </div>
          )}
          {totalSubs > 0 && (
            <div className="flex items-center gap-0.5 text-mhs-green">
              <Paperclip size={11} />
              <span className="text-[10px] font-medium">{totalSubs}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Task Detail Panel ───────────────────────── */
function TaskDetailPanel({ task, localData, onClose, onSubmitted, onCommented }: {
  task: MhsTask;
  localData: TaskEntry | undefined;
  onClose: () => void;
  onSubmitted: (taskId?: string) => void;
  onCommented: (taskId?: string) => void;
}) {
  const [tab, setTab] = useState("submit");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitNote, setSubmitNote] = useState("");
  const [submitDone, setSubmitDone] = useState(false);
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const dl = deadlineInfo(task.deadline, task.status === "selesai");
  const allSubs     = [...(task.submissions || []), ...(localData?.submissions || [])];
  const allComments = [...(task.comments || []),    ...(localData?.comments || [])];

  useEffect(() => {
    setSubmitDone(false);
    setSelectedFile(null);
    setSubmitNote("");
    setCommentText("");
    setTab("submit");
  }, [task.id]);

  useEffect(() => {
    if (tab === "comment") commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tab, allComments.length]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  }

  function handleSubmit() {
    if (!selectedFile) return;
    addSubmission(task.id, task.title, task.course, {
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
      submittedBy: "Eki Kurniawan",
      note: submitNote,
    });
    onSubmitted(task.id);
    setSubmitDone(true);
    setSelectedFile(null);
    setSubmitNote("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSendComment() {
    const text = commentText.trim();
    if (!text) return;
    addComment(task.id, task.title, task.course, {
      author: "Eki Kurniawan",
      role: "mahasiswa",
      text,
    });
    onCommented(task.id);
    setCommentText("");
  }

  const STATUS_CLS = {
    "selesai":           "bg-mhs-green/15 text-mhs-green",
    "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
    "menunggu review":   "bg-mhs-purple/15 text-mhs-purple",
    "belum mulai":       "bg-mhs-muted/15 text-mhs-muted",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-mhs-surface border-l border-mhs-border shadow-[−8px_0_32px_rgba(0,0,0,0.2)] z-50 flex flex-col animate-slideInRight overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-mhs-border shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-mhs-text leading-snug">{task.title}</div>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1 ${mkColor(task.course)}`}>
                {task.course}
              </span>
            </div>
            <button onClick={onClose} className="text-mhs-muted hover:text-mhs-text transition-colors shrink-0 mt-0.5">
              <X size={18} />
            </button>
          </div>

          {/* Status row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_CLS[task.status as keyof typeof STATUS_CLS] ?? "bg-mhs-muted/10 text-mhs-muted"}`}>
              {task.status}
            </span>
            <span className={`font-mono text-[10px] px-2 py-1 rounded-md ${dl.cls}`}>
              Deadline {formatDate(task.deadline)} · {dl.label}
            </span>
          </div>

          {task.note && (
            <p className="text-[11.5px] text-mhs-muted mt-2.5 leading-relaxed">{task.note}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 px-4 pt-3 pb-0 shrink-0">
          <button
            onClick={() => setTab("submit")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-[12.5px] font-medium transition-all border-b-2 ${
              tab === "submit"
                ? "text-mhs-amber border-mhs-amber bg-mhs-amber/5"
                : "text-mhs-muted border-transparent hover:text-mhs-text"
            }`}
          >
            <Upload size={13} /> Kumpulkan
            {allSubs.length > 0 && (
              <span className="bg-mhs-green/20 text-mhs-green text-[10px] font-bold px-1.5 py-0.5 rounded-full">{allSubs.length}</span>
            )}
          </button>
          <button
            onClick={() => setTab("comment")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-[12.5px] font-medium transition-all border-b-2 ${
              tab === "comment"
                ? "text-mhs-amber border-mhs-amber bg-mhs-amber/5"
                : "text-mhs-muted border-transparent hover:text-mhs-text"
            }`}
          >
            <MessageSquare size={13} /> Komentar
            {allComments.length > 0 && (
              <span className="bg-mhs-muted/20 text-mhs-muted text-[10px] font-bold px-1.5 py-0.5 rounded-full">{allComments.length}</span>
            )}
          </button>
        </div>
        <div className="h-px bg-mhs-border mx-4 shrink-0" />

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── SUBMIT TAB ── */}
          {tab === "submit" && (
            <div className="p-5 flex flex-col gap-4">

              {/* Existing submissions */}
              {allSubs.length > 0 && (
                <div>
                  <div className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-2">File Terkumpul</div>
                  <div className="flex flex-col gap-2">
                    {allSubs.map((s, i) => (
                      <div key={s.id || i} className="bg-mhs-bg border border-mhs-border rounded-xl p-3 flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-mhs-green/15 text-mhs-green flex items-center justify-center shrink-0 mt-0.5">
                          <Paperclip size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12.5px] font-medium text-mhs-text truncate">{s.fileName}</div>
                          <div className="text-[11px] text-mhs-muted mt-0.5">
                            {s.submittedBy} · {s.submittedAt}
                            {s.fileSize && <> · {s.fileSize}</>}
                          </div>
                          {s.note && <div className="text-[11px] text-mhs-muted mt-0.5 italic">"{s.note}"</div>}
                        </div>
                        <span className="shrink-0">
                          <CheckCircle2 size={14} className="text-mhs-green" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success flash */}
              {submitDone && (
                <div className="bg-mhs-green/10 border border-mhs-green/25 rounded-xl px-4 py-3 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-mhs-green shrink-0" />
                  <span className="text-[12.5px] text-mhs-green font-medium">Tugas berhasil dikumpulkan!</span>
                </div>
              )}

              {/* Upload form */}
              <div className="bg-mhs-bg border border-mhs-border rounded-xl p-4">
                <div className="text-[12px] font-semibold text-mhs-text mb-3">
                  {allSubs.length > 0 ? "Kumpulkan Revisi" : "Kumpulkan Tugas"}
                </div>

                {/* File picker */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all mb-3 ${
                    selectedFile
                      ? "border-mhs-green/40 bg-mhs-green/5"
                      : "border-mhs-border hover:border-mhs-amber/50 hover:bg-mhs-amber/3"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selectedFile ? "bg-mhs-green/15 text-mhs-green" : "bg-mhs-card text-mhs-muted"}`}>
                    {selectedFile ? <CheckCircle2 size={18} /> : <Upload size={18} />}
                  </div>
                  <div className="min-w-0">
                    {selectedFile ? (
                      <>
                        <div className="text-[12.5px] font-medium text-mhs-text truncate">{selectedFile.name}</div>
                        <div className="text-[11px] text-mhs-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </>
                    ) : (
                      <>
                        <div className="text-[12.5px] font-medium text-mhs-text">Pilih file</div>
                        <div className="text-[11px] text-mhs-muted">PDF, DOCX, ZIP, dll.</div>
                      </>
                    )}
                  </div>
                </label>

                {/* Note */}
                <textarea
                  value={submitNote}
                  onChange={e => setSubmitNote(e.target.value)}
                  placeholder="Catatan pengumpulan (opsional)…"
                  rows={2}
                  className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[12.5px] text-mhs-text placeholder:text-mhs-muted outline-none focus:border-mhs-amber transition-colors resize-none mb-3"
                />

                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  className="w-full bg-mhs-amber hover:bg-mhs-amber-2 disabled:opacity-40 disabled:cursor-not-allowed text-mhs-on font-semibold py-2.5 rounded-xl text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(217,119,6,0.35)] active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Upload size={14} />
                  Kumpulkan Tugas
                </button>
              </div>
            </div>
          )}

          {/* ── COMMENT TAB ── */}
          {tab === "comment" && (
            <div className="flex flex-col h-full">
              {/* Comment list */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {allComments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 text-mhs-muted/50">
                    <MessageSquare size={32} className="mb-2 opacity-40" />
                    <span className="text-[12px]">Belum ada komentar</span>
                  </div>
                )}
                {allComments.map((c, i) => {
                  const isMine = c.role === "mahasiswa";
                  return (
                    <div key={c.id || i} className={`flex gap-2.5 ${isMine ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${
                        c.role === "dosen" ? "bg-gradient-to-br from-forest to-teal" : "bg-gradient-to-br from-mhs-amber to-mhs-amber-2"
                      }`}>
                        {c.author.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div className={`max-w-[280px] ${isMine ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`flex items-center gap-1.5 mb-1 ${isMine ? "flex-row-reverse" : ""}`}>
                          <span className="text-[11px] font-semibold text-mhs-text">{c.author}</span>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${c.role === "dosen" ? "bg-forest/15 text-forest" : "bg-mhs-amber/15 text-mhs-amber"}`}>
                            {c.role === "dosen" ? "Dosen" : "Saya"}
                          </span>
                        </div>
                        <div className={`rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                          isMine
                            ? "bg-mhs-amber/15 text-mhs-text rounded-tr-sm"
                            : "bg-mhs-card text-mhs-text rounded-tl-sm border border-mhs-border"
                        }`}>
                          {c.text}
                        </div>
                        <span className="text-[10px] text-mhs-muted mt-1">{c.time}</span>
                      </div>
                    </div>
                  );
                })}
                <div ref={commentsEndRef} />
              </div>

              {/* Comment input */}
              <div className="px-4 py-3 border-t border-mhs-border bg-mhs-surface shrink-0">
                <div className="flex gap-2 items-end">
                  <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendComment(); } }}
                    placeholder="Tulis komentar…"
                    rows={1}
                    className="flex-1 bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[12.5px] text-mhs-text placeholder:text-mhs-muted outline-none focus:border-mhs-amber transition-colors resize-none"
                  />
                  <button
                    onClick={handleSendComment}
                    disabled={!commentText.trim()}
                    className="w-9 h-9 bg-mhs-amber hover:bg-mhs-amber-2 disabled:opacity-40 text-mhs-on rounded-xl flex items-center justify-center transition-all shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <div className="text-[10px] text-mhs-muted mt-1.5">Enter untuk kirim · Shift+Enter untuk baris baru</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Kanban Board ────────────────────────────── */
function KanbanBoard({ tasks, storeData, onOpen, filter }: { tasks: MhsTask[]; storeData: Record<string, TaskEntry>; onOpen: (t: MhsTask) => void; filter: string }) {
  const PRIORITY_ORDER: Record<string, number> = { kritis: 0, tinggi: 1, sedang: 2, rendah: 3 };
  const sortFn = (a: MhsTask, b: MhsTask) => {
    const da = new Date(a.deadline).getTime();
    const db = new Date(b.deadline).getTime();
    if (da !== db) return da - db;
    return (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
  };
  const active   = tasks.filter(t => t.status !== "selesai").sort(sortFn);
  const selesai  = tasks.filter(t => t.status === "selesai").sort(sortFn);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {active.map(task => (
          <TaskCard key={task.id} task={task} localData={storeData[task.id]} onOpen={onOpen} />
        ))}
      </div>

      {selesai.length > 0 && filter !== "selesai" && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-mhs-border" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-mhs-green/10 border border-mhs-green/20">
            <div className="w-1.5 h-1.5 rounded-full bg-mhs-green" />
            <span className="text-[11px] font-semibold text-mhs-green uppercase tracking-[0.08em]">
              Selesai · {selesai.length}
            </span>
          </div>
          <div className="flex-1 h-px bg-mhs-border" />
        </div>
      )}

      {selesai.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {selesai.map(task => (
            <TaskCard key={task.id} task={task} localData={storeData[task.id]} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── List View ───────────────────────────────── */
function ListView({ tasks, storeData, onOpen }: { tasks: MhsTask[]; storeData: Record<string, TaskEntry>; onOpen: (t: MhsTask) => void }) {
  return (
    <div className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="bg-mhs-surface/60">
            {["Tugas", "MK", "Deadline", "Progress", "Status", "Prioritas", ""].map(h => (
              <th key={h} className="text-left py-3 px-4 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] border-b border-mhs-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const dl = deadlineInfo(task.deadline, task.status === "selesai");
            const ld = storeData[task.id];
            const totalComments = (task.comments?.length || 0) + (ld?.comments?.length || 0);
            const totalSubs     = (task.submissions?.length || 0) + (ld?.submissions?.length || 0);
            return (
              <tr
                key={task.id}
                onClick={() => onOpen(task)}
                className="border-b border-mhs-border/40 last:border-0 hover:bg-mhs-hover transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-1 h-8 rounded-full shrink-0 ${PRIORITY_DOT[task.priority as keyof typeof PRIORITY_DOT] ?? "bg-mhs-border"}`} />
                    <div>
                      <div className="font-medium text-mhs-text group-hover:text-mhs-amber transition-colors">{task.title}</div>
                      <div className="text-[11px] text-mhs-muted mt-0.5 capitalize">{task.type}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${mkColor(task.course)}`}>{task.course}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${dl.cls}`}>{dl.label}</span>
                </td>
                <td className="py-3.5 px-4 w-36">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-mhs-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-mhs-amber to-mhs-amber-2 rounded-full" style={{ width: `${task.progress}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-mhs-muted w-7 text-right">{task.progress}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  {(() => {
                    const map = { "selesai": "bg-mhs-green/15 text-mhs-green", "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal", "menunggu review": "bg-mhs-purple/15 text-mhs-purple", "belum mulai": "bg-mhs-muted/15 text-mhs-muted" };
                    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${map[task.status as keyof typeof map] ?? "bg-mhs-muted/10 text-mhs-muted"}`}>{task.status}</span>;
                  })()}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md capitalize ${(PRIORITY_LABEL[task.priority as keyof typeof PRIORITY_LABEL])?.cls ?? "bg-mhs-muted/10 text-mhs-muted"}`}>{task.priority}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5 text-mhs-muted">
                    {totalComments > 0 && (
                      <div className="flex items-center gap-1"><MessageSquare size={12} /><span className="text-[10px]">{totalComments}</span></div>
                    )}
                    {totalSubs > 0 && (
                      <div className="flex items-center gap-1 text-mhs-green"><Paperclip size={12} /><span className="text-[10px]">{totalSubs}</span></div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Main Page ───────────────────────────────── */
export default function TugasPage() {
  const [view, setView]           = useState("kanban");
  const [filter, setFilter]       = useState("semua");
  const [search, setSearch]       = useState("");
  const [selectedTask, setSelectedTask] = useState<MhsTask | null>(null);
  const [storeData, setStoreData] = useState<Record<string, TaskEntry>>({});

  const tasks = allData.tasks;

  // Load from localStorage on mount
  useEffect(() => {
    setStoreData(getAllTaskData());
  }, []);

  function refreshStore() {
    setStoreData(getAllTaskData());
  }

  const filtered = tasks.filter(t => {
    const matchFilter =
      filter === "semua"   ? true :
      filter === "aktif"   ? t.status !== "selesai" :
      filter === "selesai" ? t.status === "selesai" :
      filter === "deadline" ? (() => { const d = Math.ceil((new Date(t.deadline).getTime() - Date.now()) / 86400000); return d >= 0 && d <= 7 && t.status !== "selesai"; })() : true;
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const stats = [
    { icon: "🗂",  value: tasks.length, label: "Total Tugas", sub: `${tasks.filter(t => t.type === "kelompok").length} kelompok, ${tasks.filter(t => t.type === "individu").length} individu`, accent: "text-mhs-amber", bg: "from-mhs-amber/10 to-transparent", dot: "bg-mhs-amber" },
    { icon: "⚡", value: tasks.filter(t => t.status === "sedang dikerjakan").length, label: "Dalam Proses", sub: "aktif dikerjakan", accent: "text-mhs-teal", bg: "from-mhs-teal/10 to-transparent", dot: "bg-mhs-teal" },
    { icon: "🔍", value: tasks.filter(t => t.status === "menunggu review").length, label: "Menunggu Review", sub: "butuh feedback dosen", accent: "text-mhs-purple", bg: "from-mhs-purple/10 to-transparent", dot: "bg-mhs-purple" },
    { icon: "✅", value: tasks.filter(t => t.status === "selesai").length, label: "Selesai", sub: `${Math.round((tasks.filter(t => t.status === "selesai").length / tasks.length) * 100)}% completion rate`, accent: "text-mhs-green", bg: "from-mhs-green/10 to-transparent", dot: "bg-mhs-green" },
  ];

  const filterTabs = [
    { id: "semua",   label: "Semua",   count: tasks.length },
    { id: "aktif",   label: "Aktif",   count: tasks.filter(t => t.status !== "selesai").length },
    { id: "selesai", label: "Selesai", count: tasks.filter(t => t.status === "selesai").length },
    { id: "deadline", label: "Mepet",  count: tasks.filter(t => { const d = Math.ceil((new Date(t.deadline).getTime() - Date.now()) / 86400000); return d >= 0 && d <= 7 && t.status !== "selesai"; }).length },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* DETAIL PANEL */}
      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          localData={storeData[selectedTask.id]}
          onClose={() => setSelectedTask(null)}
          onSubmitted={() => refreshStore()}
          onCommented={() => refreshStore()}
        />
      )}

      {/* PAGE HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[26px] text-mhs-text leading-tight">
            Manajemen <span className="text-mhs-amber">Tugas</span>
          </div>
          <div className="text-[12px] text-mhs-muted mt-1">Semester Genap 2025/2026 · {tasks.length} tugas total</div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.bg} bg-mhs-card border border-mhs-border rounded-2xl p-4 relative overflow-hidden hover:-translate-y-0.5 transition-transform`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[22px]">{s.icon}</span>
              <div className={`w-2 h-2 rounded-full ${s.dot} mt-1`} />
            </div>
            <div className={`font-serif text-[30px] leading-none ${s.accent} mb-1`}>{s.value}</div>
            <div className="text-[12px] font-semibold text-mhs-text">{s.label}</div>
            <div className="text-[11px] text-mhs-muted mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* FILTER + SEARCH + VIEW TOGGLE */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-0.5 bg-mhs-surface border border-mhs-border rounded-xl p-1">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.id ? "bg-mhs-card text-mhs-text shadow-sm" : "text-mhs-muted hover:text-mhs-text"
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${filter === tab.id ? "bg-mhs-amber/20 text-mhs-amber" : "bg-mhs-border/60 text-mhs-muted"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mhs-muted text-[13px]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari tugas…"
            className="w-full bg-mhs-card border border-mhs-border text-mhs-text pl-8 pr-3 py-2 rounded-xl text-[12px] outline-none focus:border-mhs-amber transition-colors placeholder:text-mhs-muted"
          />
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-mhs-surface border border-mhs-border rounded-xl p-1">
          <button onClick={() => setView("kanban")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${view === "kanban" ? "bg-mhs-card text-mhs-text shadow-sm" : "text-mhs-muted hover:text-mhs-text"}`}>
            <span>⊞</span> Kanban
          </button>
          <button onClick={() => setView("list")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${view === "list" ? "bg-mhs-card text-mhs-text shadow-sm" : "text-mhs-muted hover:text-mhs-text"}`}>
            <span>☰</span> List
          </button>
        </div>
      </div>

      {/* BOARD / LIST */}
      {view === "kanban" ? (
        <KanbanBoard tasks={filtered} storeData={storeData} onOpen={setSelectedTask} filter={filter} />
      ) : (
        <ListView tasks={filtered} storeData={storeData} onOpen={setSelectedTask} />
      )}
    </div>
  );
}
