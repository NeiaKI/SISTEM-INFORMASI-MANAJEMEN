"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Layers } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { createSeedData, type SeedData } from "@/data/sim-data";
import { getAllTaskData, type TaskEntry } from "@/lib/taskStore";
import { getKelompokList, type Kelompok } from "@/lib/kelompokStore";
import { TaskDetailPanel, type MhsTask, formatDate } from "@/components/task-detail-panel";

const data       = createSeedData().mahasiswa;
const groupTasks = data.tasks.filter(t => t.type === "kelompok");

type Project = SeedData["mahasiswa"]["projects"][0];

function effectiveStatus(task: MhsTask, localData?: TaskEntry): string {
  if (localData?.completed) return "selesai";
  return task.status;
}

/* ── Constants ───────────────────────────────── */
const STATUS_COLORS: Record<string, string> = {
  "selesai":           "bg-mhs-green/15 text-mhs-green",
  "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
  "menunggu review":   "bg-mhs-purple/15 text-mhs-purple",
  "belum mulai":       "bg-mhs-border text-mhs-muted",
};
const GRADIENT_FILLS = [
  "from-mhs-amber to-mhs-amber-2",
  "from-mhs-teal to-[#67e8f9]",
  "from-mhs-green to-[#86efac]",
  "from-mhs-purple to-[#c4b5fd]",
];
const PROJECT_ICONS    = ["📱", "📚", "🔒", "🤖", "🚀", "🎯"];
const MEMBER_GRADIENTS = [
  "from-mhs-amber to-mhs-purple",
  "from-mhs-rose to-mhs-purple",
  "from-mhs-teal to-mhs-green",
  "from-mhs-amber to-mhs-rose",
  "from-mhs-purple to-mhs-teal",
];
const PHASES = ["Perencanaan", "Analisis", "Desain", "Implementasi", "Testing", "Deployment"];
const PRIORITY_CLS: Record<string, string> = {
  kritis: "bg-mhs-rose/15 text-mhs-rose",
  tinggi: "bg-mhs-rose/10 text-mhs-rose",
  sedang: "bg-mhs-amber/15 text-mhs-amber",
  rendah: "bg-mhs-green/10 text-mhs-green",
};

/* ── Project Detail Modal ────────────────────── */
function ProjectDetailModal({ project, idx, kelompokList, onClose }: {
  project: Project; idx: number; kelompokList: Kelompok[]; onClose: () => void;
}) {
  const fillClass = GRADIENT_FILLS[idx % GRADIENT_FILLS.length];
  const icon      = PROJECT_ICONS[idx % PROJECT_ICONS.length];
  const pctColor  = ["text-mhs-amber","text-mhs-teal","text-mhs-green","text-mhs-purple"][idx % 4];

  const group    = kelompokList.find(g => g.course === project.course || g.name === project.team);
  const owners   = [...new Set(project.deliverables.map(d => d.owner))];
  const done     = project.deliverables.filter(d => d.status === "selesai").length;
  const total    = project.deliverables.length;
  const daysLeft = Math.ceil((new Date(project.nextMilestone).getTime() - Date.now()) / 86400000);
  const milCls   = daysLeft < 0 ? "text-mhs-rose" : daysLeft <= 7 ? "text-mhs-amber" : "text-mhs-teal";
  const curPhase = PHASES.indexOf(project.phase);

  const statusCount = {
    selesai:             project.deliverables.filter(d => d.status === "selesai").length,
    "sedang dikerjakan": project.deliverables.filter(d => d.status === "sedang dikerjakan").length,
    "menunggu review":   project.deliverables.filter(d => d.status === "menunggu review").length,
    "belum mulai":       project.deliverables.filter(d => d.status === "belum mulai").length,
  };

  const members = group
    ? group.members.map((m, mi) => ({ nama: m.nama, nim: m.nim, role: m.role, mi }))
    : owners.map((o, oi) => ({ nama: o, nim: "-", role: "Anggota", mi: oi }));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6 pt-20 pb-6">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[4px]" onClick={onClose} />
      <div className="relative bg-mhs-surface border border-mhs-border rounded-[18px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] w-full max-w-[900px] max-h-[82vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-mhs-border shrink-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-[32px] leading-none mt-0.5 shrink-0">{icon}</span>
              <div>
                <div className="text-[19px] font-bold text-mhs-text leading-snug">{project.title}</div>
                <div className="text-[12px] text-mhs-muted mt-1 flex items-center gap-1.5">
                  <span>{project.course}</span>
                  <span className="opacity-40">·</span>
                  <span>{project.team}</span>
                  <span className="opacity-40">·</span>
                  <span className={`font-semibold ${pctColor}`}>{project.phase}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-mhs-muted hover:text-mhs-text p-1.5 hover:bg-mhs-card rounded-lg transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>

          <div className="h-2 bg-mhs-border rounded-full overflow-hidden mb-1.5">
            <div className={`h-full bg-gradient-to-r ${fillClass} rounded-full transition-all duration-700`} style={{ width: `${project.progress}%` }} />
          </div>
          <div className="flex justify-between text-[11.5px] mb-4">
            <span className="text-mhs-muted">{project.progress}% selesai</span>
            <span className={`font-mono font-semibold ${milCls}`}>
              {daysLeft < 0 ? `${Math.abs(daysLeft)} hari terlambat` : daysLeft === 0 ? "Hari ini!" : `${daysLeft} hari lagi`}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {[
              { label: "Deliverable", val: `${done}/${total}`,               icon: "📋" },
              { label: "Milestone",   val: formatDate(project.nextMilestone), icon: "📅" },
              { label: "Anggota",     val: String(members.length),            icon: "👥" },
              { label: "Fase",        val: project.phase,                     icon: "⚡" },
            ].map(s => (
              <div key={s.label} className="bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-center">
                <div className="text-[16px] mb-0.5">{s.icon}</div>
                <div className="text-[13px] font-bold text-mhs-text leading-tight">{s.val}</div>
                <div className="text-[9.5px] text-mhs-muted uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Phase timeline */}
          <div>
            <div className="text-[10px] text-mhs-muted uppercase tracking-[0.1em] mb-3">Timeline Fase</div>
            <div className="flex items-center">
              {PHASES.map((ph, pi) => {
                const isDone   = pi < curPhase;
                const isActive = pi === curPhase;
                return (
                  <div key={ph} className="flex items-center flex-1 min-w-0">
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all
                        ${isDone   ? "bg-mhs-green border-mhs-green text-white" :
                          isActive ? `bg-gradient-to-br ${fillClass} border-transparent text-white shadow-[0_0_12px_rgba(251,191,36,0.4)]` :
                          "bg-mhs-card border-mhs-border text-mhs-muted"}`}
                      >
                        {isDone ? "✓" : pi + 1}
                      </div>
                      <div className={`text-[9px] mt-1 text-center leading-tight max-w-[52px] truncate ${isDone ? "text-mhs-green" : isActive ? pctColor : "text-mhs-muted"}`}>
                        {ph}
                      </div>
                    </div>
                    {pi < PHASES.length - 1 && (
                      <div className={`h-0.5 flex-1 -mt-4 mx-0.5 rounded-full ${isDone ? "bg-mhs-green" : "bg-mhs-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverable status summary */}
          <div className="grid grid-cols-4 gap-2">
            {([
              ["selesai",           "bg-mhs-green/15 text-mhs-green",   "Selesai"],
              ["sedang dikerjakan", "bg-mhs-teal/15 text-mhs-teal",     "Dikerjakan"],
              ["menunggu review",   "bg-mhs-purple/15 text-mhs-purple", "Review"],
              ["belum mulai",       "bg-mhs-border text-mhs-muted",     "Belum Mulai"],
            ] as const).map(([key, cls, label]) => (
              <div key={key} className={`${cls} rounded-xl px-3 py-2.5 text-center`}>
                <div className="text-[20px] font-bold">{statusCount[key]}</div>
                <div className="text-[9.5px] uppercase tracking-wide mt-0.5 opacity-80">{label}</div>
              </div>
            ))}
          </div>

          {/* Two columns: deliverables + members */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-mhs-muted uppercase tracking-[0.1em] mb-2.5">Deliverable</div>
              <div className="flex flex-col gap-2">
                {project.deliverables.map((d, di) => {
                  const dl    = Math.ceil((new Date(d.deadline).getTime() - Date.now()) / 86400000);
                  const dlCls = dl < 0 ? "text-mhs-rose" : dl <= 3 ? "text-mhs-amber" : "text-mhs-muted";
                  return (
                    <div key={di} className="bg-mhs-card border border-mhs-border rounded-xl px-3.5 py-2.5 flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                        d.status === "selesai" ? "bg-mhs-green" :
                        d.status === "sedang dikerjakan" ? "bg-mhs-teal" :
                        d.status === "menunggu review" ? "bg-mhs-purple" : "bg-mhs-muted/40"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-mhs-text leading-snug">{d.title}</div>
                        <div className="flex items-center justify-between mt-1 gap-1">
                          <span className={`font-mono text-[10px] ${dlCls}`}>{formatDate(d.deadline)}</span>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[d.status] ?? "bg-mhs-border text-mhs-muted"}`}>{d.status}</span>
                        </div>
                        <div className="text-[10px] text-mhs-muted mt-0.5">{d.owner}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-mhs-muted uppercase tracking-[0.1em] mb-2.5">Anggota Tim</div>
              <div className="flex flex-col gap-2">
                {members.map(({ nama, nim, role, mi }) => (
                  <div key={mi} className="bg-mhs-card border border-mhs-border rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[mi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                      {nama.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium text-mhs-text truncate">{nama}</div>
                      <div className="font-mono text-[10px] text-mhs-muted">{nim}</div>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${role === "Leader" ? "bg-mhs-amber/15 text-mhs-amber" : "bg-mhs-purple/10 text-mhs-purple"}`}>
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-mhs-border shrink-0 flex items-center justify-between">
          <div className="text-[11px] text-mhs-muted">Mata Kuliah: <span className="text-mhs-text font-medium">{project.course}</span></div>
          <button onClick={onClose} className="bg-mhs-amber hover:bg-mhs-amber-2 text-mhs-on px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
}

/* ── New Project Modal ───────────────────────── */
function NewProjectModal({ kelompokList, onClose, onAdd }: {
  kelompokList: Kelompok[];
  onClose: () => void;
  onAdd: (p: Project) => void;
}) {
  const [title, setTitle]         = useState("");
  const [groupIdx, setGroupIdx]   = useState(0);
  const [phase, setPhase]         = useState("Perencanaan");
  const [milestone, setMilestone] = useState("");

  const group = kelompokList[groupIdx];

  function handleSubmit() {
    if (!title.trim() || !milestone || !group) return;
    onAdd({
      id: `mp-${Date.now()}`,
      title: title.trim(),
      course: group.course,
      team: group.name,
      phase,
      progress: 0,
      nextMilestone: milestone,
      deliverables: group.members.map(m => ({
        title: `Deliverable — ${m.nama}`,
        owner: m.nama,
        status: "belum mulai",
        deadline: milestone,
      })),
    });
    onClose();
  }

  if (kelompokList.length === 0) return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6 pt-20 pb-6">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[4px]" onClick={onClose} />
      <div className="relative bg-mhs-surface border border-mhs-border rounded-[16px] p-8 text-center max-w-sm w-full">
        <div className="text-3xl mb-3">👥</div>
        <div className="text-[15px] font-semibold text-mhs-text mb-2">Belum ada kelompok</div>
        <p className="text-[13px] text-mhs-muted mb-4">Buat kelompok di tab Kelompok terlebih dahulu.</p>
        <button onClick={onClose} className="bg-mhs-amber text-mhs-on px-5 py-2 rounded-lg text-[13px] font-semibold">Tutup</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6 pt-20 pb-6">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[4px]" onClick={onClose} />
      <div className="relative bg-mhs-surface border border-mhs-border rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-mhs-border">
          <div className="text-[15px] font-bold text-mhs-text">Proyek Baru</div>
          <button onClick={onClose} className="text-mhs-muted hover:text-mhs-text transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Nama Proyek</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Contoh: Proyek Sistem Informasi..." className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text placeholder:text-mhs-muted outline-none focus:border-mhs-amber transition-colors" />
          </div>
          <div>
            <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">
              Kelompok <span className="text-mhs-amber normal-case">(dari tab Kelompok)</span>
            </label>
            <select value={groupIdx} onChange={e => setGroupIdx(Number(e.target.value))} className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors">
              {kelompokList.map((g, i) => <option key={g.id} value={i}>{g.name} — {g.course}</option>)}
            </select>
            {group && (
              <div className="mt-2 bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5">
                <div className="text-[10px] text-mhs-muted mb-1.5">Anggota ({group.members.length})</div>
                <div className="flex flex-col gap-1.5">
                  {group.members.map((m, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[i % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
                          {m.nama.slice(0, 2)}
                        </div>
                        <span className="text-[12px] text-mhs-text">{m.nama}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-mhs-purple/10 text-mhs-purple">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Fase Awal</label>
              <select value={phase} onChange={e => setPhase(e.target.value)} className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors">
                {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Deadline / Milestone</label>
              <input type="date" value={milestone} onChange={e => setMilestone(e.target.value)} className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors" />
            </div>
          </div>
        </div>
        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-mhs-border text-mhs-muted hover:text-mhs-text py-2.5 rounded-xl text-[13px] font-medium transition-colors">Batal</button>
          <button onClick={handleSubmit} disabled={!title.trim() || !milestone} className="flex-1 bg-mhs-amber hover:bg-mhs-amber-2 disabled:opacity-40 disabled:cursor-not-allowed text-mhs-on py-2.5 rounded-xl text-[13px] font-semibold transition-colors">Buat Proyek</button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────── */
export default function ProyekPage() {
  const topbarQ = useSearch();
  const [selectedTask, setSelectedTask]       = useState<MhsTask | null>(null);
  const [selectedProject, setSelectedProject] = useState<{ project: Project; idx: number } | null>(null);
  const [storeData, setStoreData]             = useState<Record<string, TaskEntry>>({});
  const [showNewModal, setShowNewModal]       = useState(false);
  const [extraProjects, setExtraProjects]     = useState<Project[]>([]);
  const [kelompokList, setKelompokList]       = useState<Kelompok[]>([]);

  useEffect(() => {
    setStoreData(getAllTaskData());
    setKelompokList(getKelompokList());
  }, []);

  function refreshStore() { setStoreData(getAllTaskData()); }

  const allProjects = [...data.projects, ...extraProjects].filter(p => {
    if (!topbarQ) return true;
    const q = topbarQ.toLowerCase();
    return (p.title ?? "").toLowerCase().includes(q) || p.course.toLowerCase().includes(q) || (p.team ?? "").toLowerCase().includes(q);
  });

  const totalActive  = allProjects.filter(p => p.progress < 100).length;
  const totalDone    = allProjects.filter(p => p.progress === 100).length;
  const activeGroup  = groupTasks.filter(t => effectiveStatus(t as MhsTask, storeData[t.id]) !== "selesai").length;

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[26px] text-mhs-text leading-tight">
            Manajemen <span className="text-mhs-amber">Proyek</span>
          </div>
        </div>
        <button onClick={() => setShowNewModal(true)} className="bg-mhs-amber text-mhs-on px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-mhs-amber-2 transition-colors flex items-center gap-1.5">
          <span className="text-[16px] leading-none">+</span> Proyek Baru
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: <Layers size={18} />,       label: "Total Proyek",   val: allProjects.length, cls: "text-mhs-amber",  bg: "bg-mhs-amber/8"  },
          { icon: <Clock size={18} />,        label: "Aktif",          val: totalActive,         cls: "text-mhs-teal",   bg: "bg-mhs-teal/8"   },
          { icon: <CheckCircle2 size={18} />, label: "Selesai",        val: totalDone,           cls: "text-mhs-green",  bg: "bg-mhs-green/8"  },
          { icon: <AlertCircle size={18} />,  label: "Tugas Kelompok", val: activeGroup,         cls: "text-mhs-purple", bg: "bg-mhs-purple/8" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-mhs-border/60 rounded-xl px-4 py-3 flex items-center gap-3`}>
            <span className={s.cls}>{s.icon}</span>
            <div>
              <div className={`font-serif text-[22px] leading-none ${s.cls}`}>{s.val}</div>
              <div className="text-[11px] text-mhs-muted mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Project cards */}
      {allProjects.length === 0 ? (
        <div className="bg-mhs-card border border-mhs-border rounded-[14px] p-12 flex flex-col items-center text-center text-mhs-muted">
          <Layers size={32} className="mb-3 opacity-40" />
          <div className="text-[14px] font-medium text-mhs-text mb-1">Belum ada proyek</div>
          <div className="text-[13px]">Klik &quot;+ Proyek Baru&quot; untuk memulai.</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {allProjects.map((project, idx) => {
            const fillClass = GRADIENT_FILLS[idx % GRADIENT_FILLS.length];
            const icon      = PROJECT_ICONS[idx % PROJECT_ICONS.length];
            const pctColor  = ["text-mhs-amber","text-mhs-teal","text-mhs-green","text-mhs-purple"][idx % 4];
            const done      = project.deliverables.filter(d => d.status === "selesai").length;
            const total     = project.deliverables.length;
            const daysLeft  = Math.ceil((new Date(project.nextMilestone).getTime() - Date.now()) / 86400000);
            const dlCls     = daysLeft < 0 ? "text-mhs-rose" : daysLeft <= 7 ? "text-mhs-amber" : "text-mhs-teal";
            const owners    = [...new Set(project.deliverables.map(d => d.owner))];

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject({ project, idx })}
                className="bg-mhs-card border border-mhs-border rounded-[14px] p-5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer flex flex-col gap-3.5"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-[26px] leading-none shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-mhs-text leading-snug">{project.title}</div>
                    <div className="text-[11px] text-mhs-muted mt-0.5 truncate">{project.course} · {project.team}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-mhs-muted">Progress</span>
                    <span className={`font-mono font-semibold ${pctColor}`}>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-mhs-border rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${fillClass} rounded-full`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-mhs-surface border border-mhs-border/60 rounded-lg py-1.5 px-1">
                    <div className="text-[13px] font-bold text-mhs-text">{done}/{total}</div>
                    <div className="text-[9px] text-mhs-muted">Deliverable</div>
                  </div>
                  <div className="bg-mhs-surface border border-mhs-border/60 rounded-lg py-1.5 px-1">
                    <div className={`text-[12px] font-bold font-mono ${dlCls}`}>
                      {daysLeft < 0 ? `+${Math.abs(daysLeft)}d` : `H-${daysLeft}`}
                    </div>
                    <div className="text-[9px] text-mhs-muted">Milestone</div>
                  </div>
                  <div className="bg-mhs-surface border border-mhs-border/60 rounded-lg py-1.5 px-1">
                    <div className={`text-[12px] font-bold ${pctColor}`}>{project.phase.slice(0, 6)}</div>
                    <div className="text-[9px] text-mhs-muted">Fase</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex">
                    {owners.slice(0, 4).map((owner, oi) => (
                      <div key={oi} className={`w-6 h-6 rounded-full border-2 border-mhs-card bg-gradient-to-br ${MEMBER_GRADIENTS[oi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[8px] font-bold text-white ${oi > 0 ? "-ml-1.5" : ""}`}>
                        {owner.slice(0, 2).toUpperCase()}
                      </div>
                    ))}
                    {owners.length > 4 && (
                      <div className="w-6 h-6 rounded-full border-2 border-mhs-card bg-mhs-border flex items-center justify-center text-[8px] text-mhs-muted -ml-1.5">
                        +{owners.length - 4}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-mhs-muted/60">Klik detail →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tugas Kelompok */}
      {groupTasks.length > 0 && (
        <>
          <div>
            <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Tugas</div>
            <div className="font-serif text-[20px] text-mhs-text">
              Tugas <span className="text-mhs-purple">Kelompok</span>
            </div>
          </div>

          <div className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr>
                  {["Tugas", "Mata Kuliah", "Deadline", "Prioritas", "Status"].map(h => (
                    <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50 border-b border-mhs-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupTasks.map(task => {
                  const entry    = storeData[task.id];
                  const status   = effectiveStatus(task as MhsTask, entry);
                  const subCount = (task.submissions?.length || 0) + (entry?.submissions?.length || 0);
                  const cmtCount = (task.comments?.length || 0) + (entry?.comments?.length || 0);
                  const dl       = Math.ceil((new Date(task.deadline).getTime() - Date.now()) / 86400000);
                  const dlCls    = dl < 0 ? "text-mhs-rose font-semibold" : dl <= 3 ? "text-mhs-amber font-semibold" : "text-mhs-muted";

                  return (
                    <tr
                      key={task.id}
                      onClick={() => setSelectedTask(task as MhsTask)}
                      className={`border-b border-mhs-border/40 last:border-0 hover:bg-mhs-hover transition-colors cursor-pointer ${status === "selesai" ? "opacity-60" : ""}`}
                    >
                      <td className="py-3 px-5">
                        <div className="font-medium text-mhs-text">{task.title}</div>
                        {(subCount > 0 || cmtCount > 0) && (
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-mhs-muted">
                            {subCount > 0 && <span>📎 {subCount} file</span>}
                            {cmtCount > 0 && <span>💬 {cmtCount}</span>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-5 text-mhs-muted text-[12px]">{task.course}</td>
                      <td className={`py-3 px-5 font-mono text-[11px] ${dlCls}`}>
                        {dl < 0 ? `${Math.abs(dl)} hari telat` : dl === 0 ? "Hari ini" : `H-${dl}`}
                      </td>
                      <td className="py-3 px-5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${PRIORITY_CLS[task.priority] ?? "bg-mhs-border text-mhs-muted"}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[status] ?? "bg-mhs-border text-mhs-muted"}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          localData={storeData[selectedTask.id]}
          onClose={() => setSelectedTask(null)}
          onSubmitted={() => refreshStore()}
          onCommented={() => refreshStore()}
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject.project}
          idx={selectedProject.idx}
          kelompokList={kelompokList}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {showNewModal && (
        <NewProjectModal
          kelompokList={kelompokList}
          onClose={() => setShowNewModal(false)}
          onAdd={p => setExtraProjects(prev => [...prev, p])}
        />
      )}
    </div>
  );
}
