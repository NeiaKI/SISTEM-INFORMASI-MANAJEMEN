"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DosenLayout({ children }) {
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
    <div className="min-h-screen flex bg-cream text-ink font-sans">
      {/* SIDEBAR */}
      <aside className="w-[248px] flex-shrink-0 bg-paper border-r border-border flex flex-col fixed inset-y-0 left-0 z-20 shadow-[2px_0_16px_rgba(26,26,20,0.08)]">
        <div className="px-6 py-6 border-b border-border">
          <div className="font-serif text-[20px] text-forest leading-none">📚 AcadTrack</div>
          <div className="text-[10px] text-muted tracking-[0.12em] uppercase mt-1">Portal Dosen</div>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="text-[10px] text-muted tracking-[0.1em] uppercase px-2.5 mt-3.5 mb-1.5">Utama</div>
          <Link href="/dosen" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">⊞</span> Dashboard
          </Link>
          <Link href="/dosen/tugas" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/tugas" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/tugas" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📋</span> Manajemen Tugas
          </Link>
          <Link href="/dosen/rekap" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/rekap" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/rekap" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📊</span> Rekap Pengumpulan
            <span className="ml-auto bg-gold/15 text-gold text-[10px] font-bold py-[1px] px-1.5 rounded-full">3</span>
          </Link>
          <Link href="/dosen/mahasiswa" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/mahasiswa" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/mahasiswa" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">🎓</span> Data Mahasiswa
          </Link>

          <div className="text-[10px] text-muted tracking-[0.1em] uppercase px-2.5 mt-3.5 mb-1.5">Akademik</div>
          <Link href="/dosen/matakuliah" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/matakuliah" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/matakuliah" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📚</span> Mata Kuliah Saya
          </Link>
          <Link href="/dosen/laporan" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/laporan" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/laporan" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">📈</span> Laporan & Ekspor
          </Link>
          <Link href="/dosen/notifikasi" className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all mb-0.5 relative",
            pathname === "/dosen/notifikasi" ? "bg-forest/10 text-forest font-semibold" : "text-muted hover:bg-cream hover:text-ink"
          )}>
            {pathname === "/dosen/notifikasi" && <div className="absolute left-0 top-1/5 h-[60%] w-[3px] bg-forest rounded-r-sm" />}
            <span className="text-[16px] w-5 text-center">🔔</span> Notifikasi
            <span className="ml-auto bg-rose text-white text-[10px] font-bold py-[1px] px-1.5 rounded-full">2</span>
          </Link>
        </nav>

        <div className="relative border-t border-border mt-auto">
          {isProfileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-paper rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-border py-2 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setTheme(isDark ? "light" : "dark"); }}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-cream transition-colors text-[14px] font-medium text-ink-2"
              >
                <div className={cn("w-10 h-[22px] rounded-full relative flex items-center transition-colors border", isDark ? "bg-blue-500 border-blue-500" : "bg-zinc-300 border-zinc-300")}>
                  <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all", isDark ? "right-1" : "left-1")} />
                </div>
                {isDark ? "Mode Gelap" : "Mode Terang"}
              </button>
              
              <div className="h-px bg-border my-1" />
              
              <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-cream transition-colors text-[14px] font-medium text-ink uppercase tracking-wider">
                <User size={18} className="text-ink" />
                DATA PRIBADI
              </button>
              
              <button onClick={handleLogout} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-rose/10 transition-colors text-[14px] font-medium text-red-500 uppercase tracking-wider">
                <LogOut size={18} className="text-red-500" />
                LOGOUT
              </button>
            </div>
          )}

          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="px-5 py-4 flex items-center gap-2.5 cursor-pointer hover:bg-cream transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest to-teal flex items-center justify-center text-[13px] font-bold text-white shrink-0">
              BS
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate text-ink">Dr. Budi Santoso</div>
              <div className="text-[11px] text-muted truncate">Dosen Tetap · NIP 19780501</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-[248px] flex-1 flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur-md border-b-[1.5px] border-border px-8 py-3.5 flex items-center gap-3">
          <div className="font-serif text-[18px] flex-1 text-ink">
            {pathname === "/dosen" && <><span>Dashboard</span> <span className="text-forest">Semester Genap 2024/25</span></>}
            {pathname === "/dosen/tugas" && <><span>Manajemen</span> <span className="text-forest">Tugas</span></>}
            {pathname === "/dosen/rekap" && <><span>Rekap</span> <span className="text-forest">Pengumpulan</span></>}
            {pathname === "/dosen/mahasiswa" && <><span>Data</span> <span className="text-forest">Mahasiswa</span></>}
            {pathname === "/dosen/matakuliah" && <><span>Mata Kuliah</span> <span className="text-forest">yang Diampu</span></>}
            {pathname === "/dosen/laporan" && <><span>Laporan &amp;</span> <span className="text-forest">Ekspor</span></>}
            {pathname === "/dosen/notifikasi" && <><span>Notifikasi</span> <span className="text-forest">Dosen</span></>}
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Cari mahasiswa, tugas…" 
              className="bg-paper border-[1.5px] border-border text-ink pl-[34px] pr-3.5 py-1.5 rounded-lg text-[13px] w-[200px] outline-none focus:border-forest transition-colors"
            />
          </div>
          
          <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            📥 Unduh Rekap
          </button>
          <button className="bg-forest text-white hover:bg-forest-2 hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(45,90,61,0.25)] px-4 py-2 rounded-lg text-[13px] font-semibold transition-all">
            + Buat Tugas
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
