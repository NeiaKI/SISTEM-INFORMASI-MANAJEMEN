"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  Globe, 
  BookOpen, 
  GraduationCap, 
  Infinity as InfinityIcon, 
  ClipboardList, 
  TrendingUp, 
  Users, 
  UserCheck, 
  BookMarked,
  HelpCircle,
  Sun,
  Moon,
  ChevronDown,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Apa itu AcadTrack?",
    answer: "AcadTrack adalah platform manajemen pembelajaran terintegrasi untuk mahasiswa dan dosen Universitas Pamulang."
  },
  {
    question: "Bagaimana cara menggunakan jurnal harian?",
    answer: "Dosen dapat masuk ke menu jurnal harian pada dashboard dan mengisi aktivitas pembelajaran sesuai jadwal."
  },
  {
    question: "Apakah bisa mengerjakan tugas dan kuis online?",
    answer: "Ya, mahasiswa dapat mengerjakan tugas dan kuis secara online langsung melalui platform ini."
  },
  {
    question: "Bagaimana sistem penilaian di AcadTrack?",
    answer: "Penilaian dilakukan secara otomatis untuk kuis pilihan ganda dan manual oleh dosen untuk tugas esai atau proyek."
  },
  {
    question: "Apakah ada fitur review pembelajaran?",
    answer: "Ya, terdapat fitur review dan analitik untuk memantau perkembangan belajar mahasiswa dari waktu ke waktu."
  }
];

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] dark:bg-[#020817] text-[#1e293b] dark:text-[#f1f5f9] font-['Poppins',sans-serif] transition-colors duration-300">
      {/* Inject Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .font-clash { font-family: 'Clash Display', sans-serif; }
      `}} />

      {/* HEADER */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#f4f6f8]/90 dark:bg-[#020817]/90 backdrop-blur-md transition-colors duration-300 border-b border-transparent dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-[#2563eb] font-bold text-3xl font-clash italic mr-1">S</span>
            <div className="flex flex-col leading-none">
              <span className="text-[#0f172a] dark:text-white font-bold text-xl tracking-tight leading-none">Acad<span className="text-[#f59e0b]">Track</span></span>
              <span className="text-[8px] font-semibold text-[#64748b] dark:text-[#94a3b8]">Smart, Innovative, Future-ready</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[#475569] dark:text-[#cbd5e1] hover:text-[#0f172a] dark:hover:text-white text-sm font-semibold transition-colors">
            <HelpCircle size={18} />
            Bantuan
          </button>
          <Link href="/auth/login">
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md transition-colors">
              Masuk
            </button>
          </Link>
          <button 
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#475569] dark:text-[#cbd5e1] shadow-sm hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors"
          >
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-24 relative">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-transparent border border-[#cbd5e1] rounded-full py-1.5 px-4 mb-6">
              <Globe size={16} className="text-[#2563eb]" />
              <span className="text-xs font-semibold text-[#334155] dark:text-[#cbd5e1]">Platform E-Learning Resmi Universitas Pamulang</span>
            </div>
            
            <h1 className="text-5xl md:text-[56px] font-clash text-[#0f172a] dark:text-white leading-[1.1] mb-6">
              AcadTrack<br/>
              <span className="text-[#2563eb]">Platform<br/>Pembelajaran<br/>Digital.</span>
            </h1>
            
            <p className="text-[#475569] dark:text-[#94a3b8] text-[15px] leading-relaxed mb-8 max-w-md">
              Sistem manajemen pembelajaran terintegrasi untuk mahasiswa dan dosen dengan fitur jurnal harian, tugas online, kuis, dan penilaian real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5">
                Mulai Sekarang
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-[#e2e8f0]/50 dark:hover:bg-[#1e293b] text-[#1e3a8a] dark:text-[#60a5fa] font-semibold px-8 py-3.5 rounded-full transition-colors">
                <HelpCircle size={18} />
                Lihat Panduan
              </button>
            </div>
          </div>

          {/* Right: Images and Badges */}
          <div className="relative h-[500px] flex justify-center items-center">
            {/* Main Image */}
            <div className="relative w-[340px] h-[440px] rounded-3xl overflow-hidden shadow-2xl z-10">
              <div className="absolute inset-0 bg-[#cbd5e1]">
                <img 
                  src="/Unpam-Victor.jpeg" 
                  alt="School Building" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[10%] -left-[10%] z-20 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-xl flex items-center gap-4 border border-gray-100 dark:border-[#334155]">
                <div className="w-12 h-12 bg-blue-50 text-[#2563eb] rounded-xl flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] dark:text-white text-[15px]">Kelola Jurnal</div>
                  <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-medium">Kelola jurnal belajar harian</div>
                </div>
              </div>
            </div>

            <div className="absolute top-[25%] -right-[5%] z-20">
              <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <GraduationCap size={32} />
              </div>
            </div>

            <div className="absolute bottom-[15%] -right-[15%] z-20">
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl py-3 px-5 shadow-xl flex flex-col items-center justify-center border border-gray-100 dark:border-[#334155] text-center w-36">
                <div className="text-[#2563eb] mb-1">
                  <InfinityIcon size={32} strokeWidth={2.5} />
                </div>
                <div className="font-bold text-[#0f172a] dark:text-white text-[14px]">All In One</div>
                <div className="text-[9px] text-[#64748b] dark:text-[#94a3b8] font-medium leading-tight mt-1">Semua kebutuhan akademik terpusat</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image with Badges */}
          <div className="relative h-[550px] flex justify-center items-center order-2 lg:order-1">
            {/* Main Image */}
            <div className="relative w-[380px] h-[480px] rounded-[32px] overflow-hidden shadow-2xl z-10">
              <div className="absolute inset-0 bg-[#e2e8f0]">
                 <img 
                  src="/Unpam-Victor.jpeg" 
                  alt="Student learning" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[5%] -left-[5%] z-20">
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center text-center w-36 border border-gray-100 dark:border-[#334155]">
                <div className="w-12 h-12 bg-[#1e3a8a] text-white rounded-xl flex items-center justify-center mb-3">
                  <ClipboardList size={24} />
                </div>
                <div className="font-clash text-xl font-bold text-[#0f172a] dark:text-white">Quiz</div>
                <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-medium leading-tight mt-1">Kerjakan tugas dan Quiz</div>
              </div>
            </div>

            <div className="absolute top-[20%] right-[0%] z-20">
              <div className="w-20 h-20 bg-[#2563eb] rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7v1"/><path d="M4 12h1"/><path d="M19 12h1"/><path d="M12 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>
              </div>
            </div>

            <div className="absolute bottom-[10%] -right-[15%] z-20 w-[240px]">
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-4 border border-gray-100 dark:border-[#334155]">
                <div className="text-[#1e3a8a]">
                  <TrendingUp size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-clash text-lg font-bold text-[#0f172a] dark:text-white leading-tight">Review Belajar</div>
                  <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-medium">Nilai pembelajaran harian</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & Stats */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[44px] font-clash text-[#0f172a] dark:text-white leading-[1.1] mb-4">
              Ekosistem<br/>
              Pembelajaran<br/>
              Yang Kuat
            </h2>
            <p className="text-[#475569] dark:text-[#94a3b8] text-[15px] leading-relaxed mb-10 max-w-md">
              Platform terintegrasi yang mendukung seluruh proses pembelajaran dari perencanaan hingga evaluasi dalam satu sistem.
            </p>

            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#334155] flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-14 h-14 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
                  <Users size={28} />
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] dark:text-white text-xl">1,200+</div>
                  <div className="text-[13px] text-[#64748b] dark:text-[#94a3b8] font-medium">Mahasiswa Aktif</div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#334155] flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-14 h-14 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
                  <UserCheck size={28} />
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] dark:text-white text-xl">80+</div>
                  <div className="text-[13px] text-[#64748b] dark:text-[#94a3b8] font-medium">Dosen Pengguna</div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#334155] flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-14 h-14 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
                  <BookMarked size={28} />
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] dark:text-white text-xl">5,000+</div>
                  <div className="text-[13px] text-[#64748b] dark:text-[#94a3b8] font-medium">Jurnal Terkelola</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-[1000px] mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-clash text-[#0f172a] dark:text-white mb-12">Pertanyaan Umum</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
          {/* Left Column */}
          <div className="space-y-4">
            {faqs.slice(0, 3).map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-[15px] text-[#0f172a] dark:text-white">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-[#f1f5f9] dark:bg-[#020817] flex items-center justify-center text-[#64748b] dark:text-[#94a3b8] shrink-0">
                    <ChevronDown size={18} className={cn("transition-transform duration-200", openFaqIndex === idx ? "rotate-180" : "")} />
                  </div>
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300", 
                    openFaqIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-5 pt-0 text-[14px] text-[#64748b] dark:text-[#94a3b8] leading-relaxed border-t border-[#f1f5f9] dark:border-[#334155] mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqs.slice(3, 5).map((faq, idx) => {
              const actualIdx = idx + 3;
              return (
                <div 
                  key={actualIdx} 
                  className="bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button 
                    onClick={() => toggleFaq(actualIdx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-[15px] text-[#0f172a] dark:text-white">{faq.question}</span>
                    <div className="w-8 h-8 rounded-full bg-[#f1f5f9] dark:bg-[#020817] flex items-center justify-center text-[#64748b] dark:text-[#94a3b8] shrink-0">
                      <ChevronDown size={18} className={cn("transition-transform duration-200", openFaqIndex === actualIdx ? "rotate-180" : "")} />
                    </div>
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300", 
                      openFaqIndex === actualIdx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="p-5 pt-0 text-[14px] text-[#64748b] dark:text-[#94a3b8] leading-relaxed border-t border-[#f1f5f9] dark:border-[#334155] mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <a 
              href="mailto:info@unpam.ac.id" 
              className="w-full flex items-center justify-between p-5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-2xl transition-colors shadow-md"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />
                <span className="font-medium text-[14px]">Kirim email untuk pertanyaan lain</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#3b82f6] shrink-0">
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <div className="relative mt-20">
        <div className="absolute inset-x-0 bottom-0 top-[60%] md:top-1/2 bg-[#0f172a] z-0" />
        <section className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="bg-[#2563eb] rounded-[24px] p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="relative z-10 md:w-3/5">
              <div className="inline-flex items-center gap-2 bg-white rounded-full py-1.5 px-4 mb-6 text-[#1e293b]">
                <Globe size={16} className="text-[#2563eb]" />
                <span className="text-xs font-semibold">Platform Resmi Universitas Pamulang</span>
              </div>
              
              <h2 className="text-[32px] md:text-[40px] font-clash text-white leading-[1.2] mb-4">
                Akses Platform<br/>Pembelajaran<br/>
                <span className="text-[#facc15]">Digital Universitas Pamulang</span>
              </h2>

              <p className="text-white/90 text-[14px] leading-relaxed mb-6 max-w-md">
                Nikmati kemudahan proses belajar mengajar dengan sistem terintegrasi yang dikhususkan untuk keluarga besar Universitas Pamulang.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white text-[13px]">
                  <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  Akses materi pembelajaran kapan saja, di mana saja
                </li>
                <li className="flex items-center gap-3 text-white text-[13px]">
                  <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  Kelola jurnal harian dengan sistem terintegrasi
                </li>
                <li className="flex items-center gap-3 text-white text-[13px]">
                  <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  Pantau perkembangan nilai secara real-time
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <button className="bg-white hover:bg-gray-50 text-[#2563eb] font-semibold px-6 py-2.5 rounded-full text-sm transition-colors shadow-md">
                    Masuk ke Platform
                  </button>
                </Link>
                <button className="flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 transition-colors">
                  <HelpCircle size={16} />
                  Panduan Penggunaan
                </button>
              </div>
            </div>

            <div className="relative z-10 md:w-2/5 h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/Unpam-Victor.jpeg" 
                alt="School Campus" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="bg-[#0f172a]">
        <footer className="max-w-[1200px] mx-auto px-6 pt-20 pb-6 border-t border-[#1e293b]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {/* Column 1 */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <span className="text-[#3b82f6] font-bold text-3xl font-clash italic mr-1">S</span>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-bold text-xl tracking-tight leading-none">Acad<span className="text-[#facc15]">Track</span></span>
                  <span className="text-[8px] font-semibold text-[#94a3b8]">Smart, Innovative, Future-ready</span>
                </div>
              </div>
              <p className="text-[#94a3b8] text-[13px] leading-relaxed mb-6 pr-4">
                Platform E-Learning khusus Universitas Pamulang untuk manajemen pembelajaran digital yang terintegrasi.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0f172a] hover:opacity-80 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0f172a] hover:opacity-80 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0f172a] hover:opacity-80 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0f172a] hover:opacity-80 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white font-bold text-[14px] mb-6">Fitur</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Jurnal Harian</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Jurnal Dosen</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Jurnal PKL</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Tugas Online</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Kuis Interaktif</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white font-bold text-[14px] mb-6">Bantuan</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Panduan Pengguna</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">FAQ</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Video Tutorial</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Blog & Tips</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white font-bold text-[14px] mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Kebijakan Sekolah</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Kontak</a></li>
                <li><a href="#" className="text-[#94a3b8] hover:text-white text-[13px] transition-colors">Statistik</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-[#64748b] text-[12px]">Hak Cipta Dilindungi • AcadTrack Universitas Pamulang © 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
