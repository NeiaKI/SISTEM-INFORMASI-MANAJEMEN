"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MahasiswaLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    router.push("/auth/login");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="min-h-screen flex bg-mhs-bg text-mhs-text font-sans selection:bg-mhs-amber/30">
      {/* SIDEBAR */}
      <aside className="w-[240px] flex-shrink-0 bg-mhs-surface border-r border-mhs-border flex flex-col fixed inset-y-0 left-0 z-20 py-7">
        <div className="px-6 pb-7 border-b border-mhs-border">
          <div className="font-serif text-[22px] text-mhs-amber leading-none">📚 AcadTrack</div>
          <div className="text-[10px] text-mhs-muted tracking-[0.12em] uppercase mt-1">SIM Tugas & Proyek Kuliah</div>
        </div>

        <nav className="flex-1 py-5 px-3 overflow-y-auto">
          <div className="text-[10px] text-mhs-muted tracking-[0.1em] uppercase px-3 mt-4 mb-1.5">Utama</div>
          <Link href="/mahasiswa" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">⊞</span> Dashboard
          </Link>
          <Link href="/mahasiswa/tugas" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/tugas" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/tugas" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">☑</span> Manajemen Tugas
            <span className="ml-auto bg-mhs-danger text-white text-[10px] font-semibold py-[1px] px-1.5 rounded-full">5</span>
          </Link>
          <Link href="/mahasiswa/proyek" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/proyek" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/proyek" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">🗂</span> Proyek
          </Link>
          <Link href="/mahasiswa/kelompok" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/kelompok" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/kelompok" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">👥</span> Kelompok
          </Link>

          <div className="text-[10px] text-mhs-muted tracking-[0.1em] uppercase px-3 mt-4 mb-1.5">Lainnya</div>
          <Link href="/mahasiswa/kalender" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/kalender" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/kalender" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📅</span> Kalender
          </Link>
          <Link href="/mahasiswa/laporan" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/laporan" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/laporan" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📊</span> Laporan & Statistik
          </Link>
          <Link href="/mahasiswa/notifikasi" className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative group",
            pathname === "/mahasiswa/notifikasi" ? "bg-mhs-amber/10 text-mhs-amber" : "text-mhs-muted hover:bg-mhs-card hover:text-mhs-text"
          )}>
            {pathname === "/mahasiswa/notifikasi" && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-mhs-amber rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">🔔</span> Notifikasi
            <span className="inline-block w-2 h-2 bg-mhs-rose rounded-full ml-auto animate-pulse"></span>
          </Link>
        </nav>

        <div className="relative border-t border-mhs-border mt-auto">
          {isProfileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-mhs-surface rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-mhs-border py-2 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setTheme(isDark ? "light" : "dark"); }}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-mhs-card transition-colors text-[14px] font-medium text-mhs-text"
              >
                <div className={cn("w-10 h-[22px] rounded-full relative flex items-center transition-colors border", isDark ? "bg-blue-500 border-blue-500" : "bg-zinc-300 border-zinc-300")}>
                  <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all", isDark ? "right-1" : "left-1")} />
                </div>
                {isDark ? "Mode Gelap" : "Mode Terang"}
              </button>
              
              <div className="h-px bg-mhs-border my-1" />
              
              <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-mhs-card transition-colors text-[14px] font-medium text-mhs-text uppercase tracking-wider">
                <User size={18} className="text-mhs-text" />
                DATA PRIBADI
              </button>
              
              <button onClick={handleLogout} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-mhs-rose/10 transition-colors text-[14px] font-medium text-red-500 uppercase tracking-wider">
                <LogOut size={18} className="text-red-500" />
                LOGOUT
              </button>
            </div>
          )}

          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="px-6 py-4 flex items-center gap-2.5 cursor-pointer hover:bg-mhs-card transition-colors"
          >
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-mhs-amber to-mhs-purple flex items-center justify-center text-[13px] font-bold text-white shrink-0">
              EK
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate text-mhs-text">Eki Kurniawan</div>
              <div className="text-[11px] text-mhs-muted">NIM 2022001234</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-[240px] flex-1 flex flex-col min-h-screen bg-mhs-bg">
        {/* TOPBAR */}
        <header className="sticky top-0 z-10 bg-mhs-bg/85 backdrop-blur-md border-b border-mhs-border px-8 py-3.5 flex items-center gap-3">
          <div className="font-serif text-xl flex-1 text-mhs-text">
            {pathname === "/mahasiswa" && <><span>Dashboard</span> <span className="text-mhs-amber">Semester Genap 2024/25</span></>}
            {pathname === "/mahasiswa/tugas" && <><span>Manajemen</span> <span className="text-mhs-amber">Tugas</span></>}
            {pathname === "/mahasiswa/proyek" && <><span>Manajemen</span> <span className="text-mhs-amber">Proyek</span></>}
            {pathname === "/mahasiswa/kelompok" && <><span>Data</span> <span className="text-mhs-amber">Kelompok</span></>}
            {pathname === "/mahasiswa/kalender" && <><span>Kalender</span> <span className="text-mhs-amber">Deadline</span></>}
            {pathname === "/mahasiswa/laporan" && <><span>Laporan &amp;</span> <span className="text-mhs-amber">Statistik</span></>}
            {pathname === "/mahasiswa/notifikasi" && <><span>Notifikasi &amp;</span> <span className="text-mhs-amber">Pengingat</span></>}
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mhs-muted text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Cari tugas, proyek…" 
              className="bg-mhs-card border border-mhs-border text-mhs-text pl-[34px] pr-3.5 py-1.5 rounded-lg text-[13px] w-[200px] outline-none focus:border-mhs-amber transition-colors"
            />
          </div>
          
          <button className="bg-mhs-card text-mhs-muted border border-mhs-border hover:text-mhs-text hover:border-mhs-muted px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📥 Impor RPS
          </button>
          <button className="bg-mhs-amber text-mhs-on hover:bg-mhs-amber-2 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(245,166,35,0.35)] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            + Tugas Baru
          </button>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}
