"use client";

import { useState } from "react";
import { Camera, Mail, Phone, MapPin, BookOpen, Calendar, Shield, Bell, Edit3, Save, X, CheckCircle, GraduationCap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROFILE = {
  name: "Dr. Budi Santoso, M.Kom.",
  nip: "19780501",
  email: "budi.santoso@univ.ac.id",
  phone: "082198765432",
  address: "Jl. Kebon Jeruk No. 5, Jakarta Barat",
  faculty: "Fakultas Ilmu Komputer",
  department: "Teknik Informatika",
  position: "Dosen Tetap",
  rank: "Lektor Kepala",
  education: "S3 Ilmu Komputer — ITB (2012)",
  courses: 4,
  students: 128,
  researchArea: "Keamanan Jaringan, Machine Learning",
};

const STATS = [
  { label: "Mata Kuliah Diampu", value: "4 MK", icon: "📚", color: "text-forest" },
  { label: "Total Mahasiswa", value: "128", icon: "🎓", color: "text-gold" },
  { label: "Tugas Aktif", value: "9", icon: "📋", color: "text-teal" },
  { label: "Avg. Progres", value: "78%", icon: "📈", color: "text-forest" },
];

const NOTIFICATIONS_PREFS = [
  { id: "submission", label: "Pengumpulan Tugas Baru", desc: "Notifikasi saat mahasiswa mengumpulkan tugas", enabled: true },
  { id: "late", label: "Pengumpulan Terlambat", desc: "Notifikasi pengumpulan setelah batas waktu", enabled: true },
  { id: "comment", label: "Komentar Mahasiswa", desc: "Balasan komentar dari mahasiswa", enabled: true },
  { id: "weekly", label: "Ringkasan Mingguan", desc: "Laporan rekap aktivitas tiap Senin pagi", enabled: true },
  { id: "system", label: "Pengumuman Sistem", desc: "Info pemeliharaan dan update platform", enabled: false },
];

import React from "react";

interface InfoRowProps {
  label: string;
  value?: string;
  icon?: React.ElementType;
  editable?: boolean;
  editValue?: string;
  onChange?: (v: string) => void;
}

function InfoRow({ label, value, icon: Icon, editable, editValue, onChange }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      {Icon && <Icon size={16} className="text-muted mt-0.5 shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">{label}</div>
        {editable ? (
          <input
            value={editValue}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-cream border border-forest/50 text-ink rounded-lg px-3 py-1.5 text-[13.5px] outline-none focus:border-forest transition-colors"
          />
        ) : (
          <div className="text-[13.5px] font-medium text-ink">{value}</div>
        )}
      </div>
    </div>
  );
}

export default function DosenProfilPage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ phone: PROFILE.phone, address: PROFILE.address, researchArea: PROFILE.researchArea });
  const [notifPrefs, setNotifPrefs] = useState(NOTIFICATIONS_PREFS);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSaved, setPassSaved] = useState(false);

  const handleChangePass = () => {
    setPassError("");
    if (!currentPass) { setPassError("Masukkan kata sandi saat ini."); return; }
    if (newPass.length < 8) { setPassError("Kata sandi baru minimal 8 karakter."); return; }
    if (newPass !== confirmPass) { setPassError("Konfirmasi kata sandi tidak cocok."); return; }
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 3000);
  };

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotif = (id: string) => {
    setNotifPrefs(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {saved && (
        <div className="flex items-center gap-2.5 bg-forest/10 border border-forest/25 text-forest px-4 py-3 rounded-xl text-[13.5px] font-medium animate-fadeIn">
          <CheckCircle size={16} />
          Perubahan berhasil disimpan.
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-paper rounded-2xl border border-border overflow-hidden shadow-[0_2px_12px_rgba(26,26,20,0.06)]">
        {/* Banner */}
        <div className="h-28 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(45,90,61,0.15) 0%, rgba(212,175,55,0.12) 50%, rgba(45,90,61,0.08) 100%)" }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 15% 50%, rgba(45,90,61,0.2) 0%, transparent 60%), radial-gradient(ellipse at 85% 30%, rgba(212,175,55,0.2) 0%, transparent 60%)" }} />
        </div>

        <div className="px-7 pb-6">
          <div className="flex items-end gap-5 -mt-10 mb-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forest to-teal flex items-center justify-center text-[28px] font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] ring-4 ring-paper">
                BS
              </div>
              <button className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={18} className="text-white" />
              </button>
            </div>
            <div className="mb-1 flex-1">
              <h1 className="text-[20px] font-bold text-ink">{PROFILE.name}</h1>
              <div className="text-[13px] text-muted">{PROFILE.position} · {PROFILE.rank} · NIP {PROFILE.nip}</div>
            </div>
            <div className="mb-1 flex gap-2">
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted hover:text-ink text-[13px] transition-colors">
                    <X size={14} /> Batal
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest text-white hover:bg-forest-2 text-[13px] font-semibold transition-colors">
                    <Save size={14} /> Simpan
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted hover:text-ink hover:border-forest/50 text-[13px] transition-colors">
                  <Edit3 size={14} /> Edit Profil
                </button>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {STATS.map(item => (
              <div key={item.label} className="bg-cream rounded-xl p-3 border border-border">
                <div className="text-[20px] mb-1">{item.icon}</div>
                <div className={cn("text-[15px] font-bold", item.color)}>{item.value}</div>
                <div className="text-[11px] text-muted mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Info Columns */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-[11px] text-muted uppercase tracking-wider font-semibold mb-2">Informasi Pribadi</h3>
              <InfoRow label="Nama Lengkap" value={PROFILE.name} />
              <InfoRow label="NIP" value={PROFILE.nip} />
              <InfoRow label="Email Institusi" value={PROFILE.email} icon={Mail} />
              <InfoRow label="Nomor HP" value={PROFILE.phone} icon={Phone} editable={editing} editValue={form.phone} onChange={v => setForm(f => ({...f, phone: v}))} />
              <InfoRow label="Alamat" value={PROFILE.address} icon={MapPin} editable={editing} editValue={form.address} onChange={v => setForm(f => ({...f, address: v}))} />
            </div>
            <div>
              <h3 className="text-[11px] text-muted uppercase tracking-wider font-semibold mb-2">Informasi Akademik</h3>
              <InfoRow label="Fakultas" value={PROFILE.faculty} icon={Building2} />
              <InfoRow label="Program Studi" value={PROFILE.department} icon={BookOpen} />
              <InfoRow label="Jabatan Fungsional" value={PROFILE.rank} icon={GraduationCap} />
              <InfoRow label="Pendidikan Terakhir" value={PROFILE.education} icon={Calendar} />
              <InfoRow label="Bidang Penelitian" value={PROFILE.researchArea} icon={undefined} editable={editing} editValue={form.researchArea} onChange={v => setForm(f => ({...f, researchArea: v}))} />
            </div>
          </div>
        </div>
      </div>

      {/* Security & Notifications */}
      <div className="grid grid-cols-2 gap-6">
        {/* Security */}
        <div className="bg-paper rounded-2xl border border-border p-6 shadow-[0_2px_12px_rgba(26,26,20,0.06)]">
          <div className="flex items-center gap-2 mb-5">
            <Shield size={16} className="text-forest" />
            <h2 className="text-[15px] font-semibold text-ink">Keamanan Akun</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-muted uppercase tracking-wider mb-1.5">Kata Sandi Saat Ini</label>
              <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} placeholder="••••••••"
                className="w-full bg-cream border border-border text-ink rounded-lg px-3 py-2 text-[13px] outline-none focus:border-forest transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] text-muted uppercase tracking-wider mb-1.5">Kata Sandi Baru</label>
              <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Min. 8 karakter"
                className="w-full bg-cream border border-border text-ink rounded-lg px-3 py-2 text-[13px] outline-none focus:border-forest transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] text-muted uppercase tracking-wider mb-1.5">Konfirmasi Kata Sandi</label>
              <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Ulangi kata sandi baru"
                className="w-full bg-cream border border-border text-ink rounded-lg px-3 py-2 text-[13px] outline-none focus:border-forest transition-colors" />
            </div>
            {passError && (
              <div className="text-[12px] text-rose bg-rose/10 border border-rose/25 rounded-lg px-3 py-2">{passError}</div>
            )}
            {passSaved && (
              <div className="flex items-center gap-1.5 text-[12px] text-forest bg-forest/10 border border-forest/25 rounded-lg px-3 py-2">
                <CheckCircle size={13} /> Kata sandi berhasil diperbarui.
              </div>
            )}
            <button onClick={handleChangePass} className="w-full mt-1 bg-forest text-white hover:bg-forest-2 py-2 rounded-lg text-[13px] font-semibold transition-colors">
              Ganti Kata Sandi
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-paper rounded-2xl border border-border p-6 shadow-[0_2px_12px_rgba(26,26,20,0.06)]">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={16} className="text-gold" />
            <h2 className="text-[15px] font-semibold text-ink">Preferensi Notifikasi</h2>
          </div>
          <div className="space-y-3">
            {notifPrefs.map(pref => (
              <div key={pref.id} className="flex items-start gap-3">
                <button
                  onClick={() => toggleNotif(pref.id)}
                  className={cn(
                    "w-10 h-[22px] rounded-full relative flex items-center transition-colors shrink-0 mt-0.5",
                    pref.enabled ? "bg-forest" : "bg-border"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all", pref.enabled ? "right-1" : "left-1")} />
                </button>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-ink">{pref.label}</div>
                  <div className="text-[11px] text-muted">{pref.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
