"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { createSeedData, type SeedData } from "@/data/sim-data";
import { getAllTaskData, type TaskEntry } from "@/lib/taskStore";
import { getKelompokList, type Kelompok } from "@/lib/kelompokStore";
import { TaskDetailPanel, type MhsTask, formatDate } from "@/components/task-detail-panel";

const data = createSeedData().mahasiswa;
const groupTasks = data.tasks.filter(t => t.type === "kelompok");

type Project = SeedData["mahasiswa"]["projects"][0];

const STATUS_COLORS: Record<string, string> = {
  "selesai":           "bg-mhs-green/15 text-mhs-green",
  "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
  "menunggu review":   "bg-mhs-purple/15 text-mhs-purple",
  "belum mulai":       "bg-mhs-border text-mhs-muted",
};

const PHASES = ["Perencanaan", "Analisis", "Desain", "Implementasi", "Testing", "Deployment"];

function ProjectDetailModal({ project, idx, kelompokList, onClose }: { project: Project; idx: number; kelompokList: Kelompok[]; onClose: () => void }) {
  const fillClass = GRADIENT_FILLS[idx % GRADIENT_FILLS.length];
  const icon = PROJECT_ICONS[idx % PROJECT_ICONS.length];
  const pctColor = ["text-mhs-amber", "text-mhs-teal", "text-mhs-green", "text-mhs-purple"][idx % 4];

  const group = kelompokList.find(g => g.course === project.course || g.name === project.team);
  const owners = [...new Set(project.deliverables.map(d => d.owner))];
  const done  = project.deliverables.filter(d => d.status === "selesai").length;
  const total = project.deliverables.length;
  const daysLeft = Math.ceil((new Date(project.nextMilestone).getTime() - Date.now()) / 86400000);
  const milCls = daysLeft < 0 ? "text-mhs-rose" : daysLeft <= 7 ? "text-mhs-amber" : "text-mhs-teal";
  const currentPhaseIdx = PHASES.indexOf(project.phase);

  const statusCount = {
    selesai: project.deliverables.filter(d => d.status === "selesai").length,
    "sedang dikerjakan": project.deliverables.filter(d => d.status === "sedang dikerjakan").length,
    "menunggu review": project.deliverables.filter(d => d.status === "menunggu review").length,
    "belum mulai": project.deliverables.filter(d => d.status === "belum mulai").length,
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-mhs-surface border border-mhs-border rounded-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.4)] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

          {/* ── HEADER ── */}
          <div className="px-7 pt-6 pb-5 border-b border-mhs-border shrink-0">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-start gap-3.5">
                <span className="text-[36px] leading-none mt-0.5">{icon}</span>
                <div>
                  <div className="text-[20px] font-bold text-mhs-text leading-snug">{project.title}</div>
                  <div className="text-[12px] text-mhs-muted mt-1 flex items-center gap-1.5">
                    <span>{project.course}</span>
                    <span className="opacity-40">·</span>
                    <span>{project.team}</span>
                    <span className="opacity-40">·</span>
                    <span className={`font-mono font-semibold ${pctColor}`}>{project.phase}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-mhs-muted hover:text-mhs-text transition-colors shrink-0 mt-1">
                <X size={20} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-mhs-border rounded-full overflow-hidden mb-2">
              <div className={`h-full bg-gradient-to-r ${fillClass} rounded-full transition-all duration-700`} style={{ width: `${project.progress}%` }} />
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-mhs-muted">{project.progress}% selesai</span>
              <span className={`font-mono font-semibold ${milCls}`}>
                {daysLeft < 0 ? `${Math.abs(daysLeft)} hari terlambat` : daysLeft === 0 ? "Hari ini!" : `${daysLeft} hari lagi`}
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { label: "Deliverable", val: `${done}/${total}`, icon: "📋", sub: "selesai" },
                { label: "Milestone", val: formatDate(project.nextMilestone), icon: "📅", sub: daysLeft < 0 ? "terlewat" : "mendatang" },
                { label: "Anggota", val: String(group?.members.length ?? owners.length), icon: "👥", sub: "dalam tim" },
                { label: "Progress", val: `${project.progress}%`, icon: "⚡", sub: project.phase },
              ].map((s) => (
                <div key={s.label} className="bg-mhs-card border border-mhs-border rounded-xl px-3 py-3 text-center">
                  <div className="text-[18px] mb-1">{s.icon}</div>
                  <div className="text-[15px] font-bold text-mhs-text font-mono">{s.val}</div>
                  <div className="text-[10px] text-mhs-muted uppercase tracking-wide mt-0.5">{s.label}</div>
                  <div className="text-[9px] text-mhs-muted/60 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BODY (scrollable) ── */}
          <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-6">

            {/* Phase timeline */}
            <div>
              <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-3">Timeline Fase</div>
              <div className="flex items-center gap-0">
                {PHASES.map((ph, pi) => {
                  const done  = pi < currentPhaseIdx;
                  const active = pi === currentPhaseIdx;
                  return (
                    <div key={ph} className="flex items-center flex-1 min-w-0">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all
                          ${done   ? "bg-mhs-green border-mhs-green text-white" :
                            active ? `bg-gradient-to-br ${fillClass} border-transparent text-white shadow-[0_0_12px_rgba(251,191,36,0.4)]` :
                            "bg-mhs-card border-mhs-border text-mhs-muted"}`}
                        >
                          {done ? "✓" : pi + 1}
                        </div>
                        <div className={`text-[9px] mt-1 text-center leading-tight max-w-[52px] truncate
                          ${done ? "text-mhs-green" : active ? pctColor : "text-mhs-muted"}`}>
                          {ph}
                        </div>
                      </div>
                      {pi < PHASES.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-4 mx-0.5 rounded-full transition-all
                          ${done ? "bg-mhs-green" : "bg-mhs-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deliverable status summary */}
            <div className="grid grid-cols-4 gap-2">
              {([
                ["selesai",           "bg-mhs-green/15 text-mhs-green",    "Selesai"],
                ["sedang dikerjakan", "bg-mhs-teal/15 text-mhs-teal",      "Dikerjakan"],
                ["menunggu review",   "bg-mhs-purple/15 text-mhs-purple",  "Review"],
                ["belum mulai",       "bg-mhs-border text-mhs-muted",      "Belum Mulai"],
              ] as const).map(([key, cls, label]) => (
                <div key={key} className={`${cls} rounded-xl px-3 py-2.5 text-center`}>
                  <div className="text-[20px] font-bold">{statusCount[key]}</div>
                  <div className="text-[10px] uppercase tracking-wide mt-0.5 opacity-80">{label}</div>
                </div>
              ))}
            </div>

            {/* Two-column layout: deliverables + members */}
            <div className="grid grid-cols-2 gap-4">

              {/* Deliverables */}
              <div>
                <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-3">Deliverable</div>
                <div className="flex flex-col gap-2">
                  {project.deliverables.map((d, di) => {
                    const dl = Math.ceil((new Date(d.deadline).getTime() - Date.now()) / 86400000);
                    const dlCls = dl < 0 ? "text-mhs-rose" : dl <= 3 ? "text-mhs-amber" : "text-mhs-muted";
                    return (
                      <div key={di} className="bg-mhs-card border border-mhs-border rounded-xl px-3.5 py-3 flex items-start gap-2.5">
                        <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                          d.status === "selesai" ? "bg-mhs-green" :
                          d.status === "sedang dikerjakan" ? "bg-mhs-teal" :
                          d.status === "menunggu review" ? "bg-mhs-purple" : "bg-mhs-muted"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-mhs-text leading-snug">{d.title}</div>
                          <div className="flex items-center justify-between mt-1 gap-1">
                            <span className={`font-mono text-[10px] ${dlCls}`}>{formatDate(d.deadline)}</span>
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[d.status] ?? "bg-mhs-border text-mhs-muted"}`}>
                              {d.status}
                            </span>
                          </div>
                          <div className="text-[10px] text-mhs-muted mt-0.5">{d.owner}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Members */}
              <div>
                <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-3">Anggota Tim</div>
                {group ? (
                  <div className="flex flex-col gap-2">
                    {group.members.map((m, mi) => (
                      <div key={mi} className="bg-mhs-card border border-mhs-border rounded-xl px-3.5 py-3 flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[mi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                          {m.nama.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-mhs-text truncate">{m.nama}</div>
                          <div className="font-mono text-[10px] text-mhs-muted">{m.nim}</div>
                        </div>
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                          m.role === "Leader" ? "bg-mhs-amber/15 text-mhs-amber" : "bg-mhs-purple/10 text-mhs-purple"
                        }`}>
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {owners.map((owner, oi) => (
                      <div key={oi} className="bg-mhs-card border border-mhs-border rounded-xl px-3.5 py-3 flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[oi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                          {owner.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-mhs-text truncate">{owner}</div>
                        </div>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-mhs-purple/10 text-mhs-purple shrink-0">Anggota</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="px-7 py-4 border-t border-mhs-border shrink-0 flex items-center justify-between">
            <div className="text-[11px] text-mhs-muted">
              Dibuat untuk <span className="text-mhs-text font-medium">{project.course}</span>
            </div>
            <button
              onClick={onClose}
              className="bg-mhs-amber hover:bg-mhs-amber-2 text-mhs-on px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const PHASE_COLORS = {
  "selesai": "bg-mhs-green/15 text-mhs-green",
  "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
  "menunggu review": "bg-mhs-purple/15 text-mhs-purple",
  "belum mulai": "bg-mhs-border text-mhs-muted",
};

const GRADIENT_FILLS = [
  "from-mhs-amber to-mhs-amber-2",
  "from-mhs-teal to-[#67e8f9]",
  "from-mhs-green to-[#86efac]",
  "from-mhs-purple to-[#c4b5fd]",
];

const PROJECT_ICONS = ["📱", "📚", "🔒", "🤖", "🚀", "🎯"];
const MEMBER_GRADIENTS = [
  "from-mhs-amber to-mhs-purple",
  "from-mhs-rose to-mhs-purple",
  "from-mhs-teal to-mhs-green",
  "from-mhs-amber to-mhs-rose",
  "from-mhs-purple to-mhs-teal",
];


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
    const newProject: Project = {
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
    };
    onAdd(newProject);
    onClose();
  }

  if (kelompokList.length === 0) return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-mhs-surface border border-mhs-border rounded-[16px] p-8 text-center max-w-sm w-full">
          <div className="text-3xl mb-3">👥</div>
          <div className="text-[15px] font-semibold text-mhs-text mb-2">Belum ada kelompok</div>
          <p className="text-[13px] text-mhs-muted mb-4">Buat kelompok di tab Kelompok terlebih dahulu sebelum membuat proyek.</p>
          <button onClick={onClose} className="bg-mhs-amber text-mhs-on px-5 py-2 rounded-lg text-[13px] font-semibold">Tutup</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-mhs-surface border border-mhs-border rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-md">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-mhs-border">
            <div className="text-[15px] font-bold text-mhs-text">Proyek Baru</div>
            <button onClick={onClose} className="text-mhs-muted hover:text-mhs-text transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 flex flex-col gap-4">
            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Nama Proyek</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Contoh: Proyek Sistem Informasi..."
                className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text placeholder:text-mhs-muted outline-none focus:border-mhs-amber transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">
                Kelompok <span className="text-mhs-amber normal-case">(dari tab Kelompok)</span>
              </label>
              <select
                value={groupIdx}
                onChange={e => setGroupIdx(Number(e.target.value))}
                className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors"
              >
                {kelompokList.map((g, i) => (
                  <option key={g.id} value={i}>{g.name} — {g.course}</option>
                ))}
              </select>
              {group && (
                <div className="mt-2 bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5">
                  <div className="text-[10px] text-mhs-muted mb-1.5">Anggota ({group.members.length})</div>
                  <div className="flex flex-col gap-1">
                    {group.members.map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${MEMBER_GRADIENTS[i % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
                            {m.nama.slice(0, 2)}
                          </div>
                          <span className="text-[12px] text-mhs-text">{m.nama}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-mhs-muted">{m.nim}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-mhs-purple/10 text-mhs-purple">{m.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Fase Awal</label>
              <select
                value={phase}
                onChange={e => setPhase(e.target.value)}
                className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors"
              >
                {["Perencanaan", "Analisis", "Desain", "Implementasi", "Testing", "Deployment"].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-mhs-muted uppercase tracking-[0.08em] mb-1.5 block">Deadline / Milestone</label>
              <input
                type="date"
                value={milestone}
                onChange={e => setMilestone(e.target.value)}
                className="w-full bg-mhs-card border border-mhs-border rounded-xl px-3 py-2.5 text-[13px] text-mhs-text outline-none focus:border-mhs-amber transition-colors"
              />
            </div>
          </div>

          <div className="px-6 pb-5 flex gap-3">
            <button onClick={onClose} className="flex-1 border border-mhs-border text-mhs-muted hover:text-mhs-text py-2.5 rounded-xl text-[13px] font-medium transition-colors">
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !milestone}
              className="flex-1 bg-mhs-amber hover:bg-mhs-amber-2 disabled:opacity-40 disabled:cursor-not-allowed text-mhs-on py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
            >
              Buat Proyek
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

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

  // NIM lookup: from localStorage kelompok, keyed by member nama
  const nimByNama: Record<string, string> = {};
  kelompokList.forEach(g => g.members.forEach(m => { nimByNama[m.nama] = m.nim; }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
          <div className="font-serif text-[22px] text-mhs-text">Manajemen Proyek</div>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-mhs-amber text-mhs-on px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-mhs-amber-2 transition-colors"
        >
          + Proyek Baru
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {allProjects.map((project, idx) => {
          const fillClass = GRADIENT_FILLS[idx % GRADIENT_FILLS.length];
          const icon = PROJECT_ICONS[idx % PROJECT_ICONS.length];
          const pctColor = ["text-mhs-amber", "text-mhs-teal", "text-mhs-green", "text-mhs-purple"][idx % 4];

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject({ project, idx })}
              className="bg-mhs-card border border-mhs-border rounded-[14px] p-5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
            >
              {/* TOP */}
              <div className="flex items-start gap-2.5 mb-3.5">
                <div className="text-[24px]">{icon}</div>
                <div>
                  <div className="text-[15px] font-semibold text-mhs-text">{project.title}</div>
                  <div className="text-[11px] text-mhs-muted mt-0.5">{project.course} · {project.team}</div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="h-1.5 bg-mhs-border rounded-full overflow-hidden mb-1.5">
                <div className={`h-full bg-gradient-to-r ${fillClass} rounded-full`} style={{ width: `${project.progress}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-mhs-muted mb-2.5">
                <span>{project.progress}% selesai</span>
                <span className={`font-mono ${pctColor}`}>{project.phase}</span>
              </div>

              {/* DEADLINE */}
              <div className={`font-mono text-[11px] text-mhs-muted mb-2.5`}>
                Milestone: <span className="text-mhs-amber">{formatDate(project.nextMilestone)}</span>
              </div>

              {/* DELIVERABLES */}
              <div className="flex flex-wrap gap-1 mb-3.5">
                {project.deliverables.map((d, di) => (
                  <span
                    key={di}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${PHASE_COLORS[d.status as keyof typeof PHASE_COLORS] ?? "bg-mhs-border text-mhs-muted"}`}
                  >
                    {d.title}
                  </span>
                ))}
              </div>

              {/* MEMBERS */}
              <div className="flex">
                {(project.deliverables.map(d => d.owner).filter((v, i, a) => a.indexOf(v) === i)).slice(0, 4).map((owner, oi) => (
                  <div
                    key={oi}
                    className={`w-[26px] h-[26px] rounded-full border-2 border-mhs-card bg-gradient-to-br ${MEMBER_GRADIENTS[oi % MEMBER_GRADIENTS.length]} flex items-center justify-center text-[9px] font-bold text-white ${oi > 0 ? "-ml-1.5" : ""}`}
                  >
                    {owner.slice(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* DELIVERABLES DETAIL */}
      {allProjects.map((project, idx) => {
        const nimMap: Record<string, string> = { ...nimByNama };
        const daysLeft = Math.ceil((new Date(project.nextMilestone).getTime() - Date.now()) / 86400000);
        const dlCls = daysLeft < 0 ? "text-mhs-rose" : daysLeft <= 7 ? "text-mhs-amber" : "text-mhs-muted";

        return (
          <div key={project.id} className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-mhs-border">
              <h3 className="text-[14px] font-semibold text-mhs-text flex-1">{PROJECT_ICONS[idx % PROJECT_ICONS.length]} {project.title}</h3>
              <span className="text-[12px] text-mhs-muted mr-4">{project.course}</span>
              <span className={`font-mono text-[12px] font-semibold ${dlCls}`}>
                Deadline: {formatDate(project.nextMilestone)}
              </span>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Deliverable</th>
                  <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Owner</th>
                  <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">NIM</th>
                  <th className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">Status</th>
                </tr>
              </thead>
              <tbody>
                {project.deliverables.map((d, di) => (
                  <tr key={di} className="border-t border-mhs-border/50 hover:bg-mhs-hover transition-colors">
                    <td className="py-3 px-5 font-medium text-mhs-text">{d.title}</td>
                    <td className="py-3 px-5 text-mhs-muted">{d.owner}</td>
                    <td className="py-3 px-5 font-mono text-[12px] text-mhs-muted">{nimMap[d.owner] ?? "-"}</td>
                    <td className="py-3 px-5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${PHASE_COLORS[d.status as keyof typeof PHASE_COLORS] ?? "bg-mhs-border text-mhs-muted"}`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      {/* TUGAS KELOMPOK */}
      {groupTasks.length > 0 && (
        <>
          <div className="mt-2">
            <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Tugas</div>
            <div className="font-serif text-[20px] text-mhs-text">
              Tugas <span className="text-mhs-purple">Kelompok</span>
            </div>
          </div>

          <div className="bg-mhs-card border border-mhs-border rounded-[14px] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  {["Tugas", "Mata Kuliah", "Prioritas", "Status"].map(h => (
                    <th key={h} className="text-left py-2.5 px-5 text-[11px] font-semibold text-mhs-muted uppercase tracking-[0.06em] bg-mhs-surface/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupTasks.map(task => {
                  const statusCls: Record<string, string> = {
                    "selesai": "bg-mhs-green/15 text-mhs-green",
                    "sedang dikerjakan": "bg-mhs-teal/15 text-mhs-teal",
                    "menunggu review": "bg-mhs-purple/15 text-mhs-purple",
                    "belum mulai": "bg-mhs-border text-mhs-muted",
                  };
                  const priorityCls: Record<string, string> = {
                    kritis: "bg-mhs-rose/15 text-mhs-rose",
                    tinggi: "bg-mhs-rose/10 text-mhs-rose",
                    sedang: "bg-mhs-amber/15 text-mhs-amber",
                    rendah: "bg-mhs-green/10 text-mhs-green",
                  };
                  const entry = storeData[task.id];
                  const subCount = (task.submissions?.length || 0) + (entry?.submissions?.length || 0);
                  const cmtCount = (task.comments?.length || 0) + (entry?.comments?.length || 0);

                  return (
                    <tr
                      key={task.id}
                      onClick={() => setSelectedTask(task as MhsTask)}
                      className="border-t border-mhs-border/50 hover:bg-mhs-hover transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-5">
                        <div className="font-medium text-mhs-text">{task.title}</div>
                        {(subCount > 0 || cmtCount > 0) && (
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-mhs-muted">
                            {subCount > 0 && <span>📎 {subCount} file</span>}
                            {cmtCount > 0 && <span>💬 {cmtCount} komentar</span>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-5 text-mhs-muted">{task.course}</td>
                      <td className="py-3 px-5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${priorityCls[task.priority] ?? "bg-mhs-border text-mhs-muted"}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusCls[task.status] ?? "bg-mhs-border text-mhs-muted"}`}>
                          {task.status}
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
