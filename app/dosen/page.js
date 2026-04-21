export default function DosenDashboard() {
  return (
    <div className="flex flex-col gap-5.5">
      {/* ALERT BANNER */}
      <div className="bg-gold/10 border-[1.5px] border-gold/25 rounded-xl px-4.5 py-3 text-[13px] text-ink-2 flex items-center gap-2.5">
        <span className="text-lg">📬</span>
        <span className="flex-1">Terdapat <strong className="text-gold font-semibold">3 tugas</strong> yang baru dikumpulkan mahasiswa dan menunggu penilaian Anda.</span>
        <button className="bg-paper text-ink-2 border-[1.5px] border-border hover:text-forest hover:border-forest px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all shrink-0">
          Lihat Sekarang
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-paper border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(26,26,20,0.08)] transition-all">
          <div className="w-9.5 h-9.5 rounded-lg bg-forest/10 text-forest flex items-center justify-center text-lg mb-3.5">📋</div>
          <div className="font-serif text-[34px] leading-none text-ink">24</div>
          <div className="text-[12px] text-muted mt-1">Total Tugas Aktif</div>
          <div className="text-[11.5px] mt-2.5 text-forest font-medium">↑ 4 tugas baru bulan ini</div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-paper border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(26,26,20,0.08)] transition-all">
          <div className="w-9.5 h-9.5 rounded-lg bg-gold/10 text-gold flex items-center justify-center text-lg mb-3.5">📥</div>
          <div className="font-serif text-[34px] leading-none text-ink">187</div>
          <div className="text-[12px] text-muted mt-1">Pengumpulan Diterima</div>
          <div className="text-[11.5px] mt-2.5 text-forest font-medium">dari 240 total mahasiswa</div>
        </div>

        {/* Card 3 */}
        <div className="bg-paper border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(26,26,20,0.08)] transition-all">
          <div className="w-9.5 h-9.5 rounded-lg bg-rose/10 text-rose flex items-center justify-center text-lg mb-3.5">⏰</div>
          <div className="font-serif text-[34px] leading-none text-ink">12</div>
          <div className="text-[12px] text-muted mt-1">Belum Dikumpulkan</div>
          <div className="text-[11.5px] mt-2.5 text-rose font-medium">deadline ≤ 3 hari</div>
        </div>

        {/* Card 4 */}
        <div className="bg-paper border-[1.5px] border-border rounded-xl p-5 relative overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(26,26,20,0.08)] transition-all">
          <div className="w-9.5 h-9.5 rounded-lg bg-teal/10 text-teal flex items-center justify-center text-lg mb-3.5">🎓</div>
          <div className="font-serif text-[34px] leading-none text-ink">4</div>
          <div className="text-[12px] text-muted mt-1">Mata Kuliah Diampu</div>
          <div className="text-[11.5px] mt-2.5 text-forest font-medium">240 mahasiswa total</div>
        </div>
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-[1fr_320px] gap-5 mt-2">
        
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          
          {/* TUGAS BERJALAN TABLE */}
          <div className="bg-paper border-[1.5px] border-border rounded-[14px] p-5.5 shadow-[0_1px_6px_rgba(26,26,20,0.08)]">
            <div className="flex items-center mb-4">
              <h3 className="text-[14px] font-semibold text-ink flex-1">📋 Daftar Tugas Berjalan</h3>
              <a href="#" className="text-[12px] text-forest hover:underline cursor-pointer">Lihat semua tugas →</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b-[1.5px] border-border bg-cream">Nama Tugas</th>
                    <th className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b-[1.5px] border-border bg-cream">Mata Kuliah</th>
                    <th className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b-[1.5px] border-border bg-cream">Terkumpul</th>
                    <th className="text-left py-2.5 px-3.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b-[1.5px] border-border bg-cream">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-forest/5 group border-b border-border">
                    <td className="py-3 px-3.5 text-ink-2 font-medium">Laporan Praktikum Sorting</td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[11px] font-semibold py-1 px-2.5 rounded-full bg-rose/10 text-rose">Pemrog. Lanjut</span></td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] text-ink-2">45/48</span>
                        <div className="w-16 h-1.5 bg-cream-2 rounded-full overflow-hidden"><div className="h-full bg-forest w-[93%]" /></div>
                      </div>
                    </td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[10.5px] font-semibold py-1 px-2.5 rounded-full whitespace-nowrap bg-rose/10 text-rose">08 Apr (Besok)</span></td>
                  </tr>
                  <tr className="hover:bg-forest/5 group border-b border-border">
                    <td className="py-3 px-3.5 text-ink-2 font-medium">ERD Sistem Perpustakaan</td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[11px] font-semibold py-1 px-2.5 rounded-full bg-teal/10 text-teal">Basis Data</span></td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] text-ink-2">12/15</span>
                        <div className="w-16 h-1.5 bg-cream-2 rounded-full overflow-hidden"><div className="h-full bg-gold w-[80%]" /></div>
                      </div>
                    </td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[10.5px] font-semibold py-1 px-2.5 rounded-full whitespace-nowrap bg-gold/15 text-gold">09 Apr</span></td>
                  </tr>
                  <tr className="hover:bg-forest/5 group border-b border-border">
                    <td className="py-3 px-3.5 text-ink-2 font-medium">Resume Sistem Operasi Bab 4</td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[11px] font-semibold py-1 px-2.5 rounded-full bg-gold/15 text-gold">Sistem Operasi</span></td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] text-ink-2">20/60</span>
                        <div className="w-16 h-1.5 bg-cream-2 rounded-full overflow-hidden"><div className="h-full bg-teal w-[33%]" /></div>
                      </div>
                    </td>
                    <td className="py-3 px-3.5"><span className="inline-block text-[10.5px] font-semibold py-1 px-2.5 rounded-full whitespace-nowrap bg-teal/10 text-teal">11 Apr</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          
          {/* DEADLINE MENDATANG */}
          <div className="bg-paper border-[1.5px] border-border rounded-[14px] p-5.5 shadow-[0_1px_6px_rgba(26,26,20,0.08)]">
            <h3 className="text-[14px] font-semibold text-ink mb-4">⏰ Jadwal Terdekat</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-2.5 border-b border-border">
                <div className="w-10 text-center bg-rose/10 border border-rose/25 rounded-lg py-1 shrink-0">
                  <div className="font-serif text-[18px] leading-none text-rose">08</div>
                  <div className="text-[9px] text-muted uppercase tracking-wider">Apr</div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[13px] font-medium text-ink">Batas Pengumpulan: Sorting</div>
                  <div className="text-[11px] text-muted mt-0.5">Pemrograman Lanjut</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-2.5 border-b border-border">
                <div className="w-10 text-center bg-cream border border-border rounded-lg py-1 shrink-0">
                  <div className="font-serif text-[18px] leading-none text-ink">09</div>
                  <div className="text-[9px] text-muted uppercase tracking-wider">Apr</div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[13px] font-medium text-ink">Batas Pengumpulan: ERD</div>
                  <div className="text-[11px] text-muted mt-0.5">Basis Data (Kelas A, B)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 text-center bg-cream border border-border rounded-lg py-1 shrink-0">
                  <div className="font-serif text-[18px] leading-none text-ink">14</div>
                  <div className="text-[9px] text-muted uppercase tracking-wider">Apr</div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-[13px] font-medium text-ink">Presentasi Proyek Akhir</div>
                  <div className="text-[11px] text-muted mt-0.5">Sistem Operasi</div>
                </div>
              </div>
            </div>
          </div>

          {/* PERLU TINDAKAN (Tugas Baru Dikumpulkan) */}
          <div className="bg-paper border-[1.5px] border-border rounded-[14px] p-5.5 shadow-[0_1px_6px_rgba(26,26,20,0.08)]">
            <h3 className="text-[14px] font-semibold text-ink mb-4">🔔 Baru Dikumpulkan</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2.5 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest font-bold flex items-center justify-center text-[10px]">AA</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink truncate">Andi Ardiansyah</div>
                  <div className="text-[11px] text-muted">Laporan Sorting</div>
                </div>
                <div className="text-[10px] text-muted bg-cream px-1.5 py-0.5 rounded">10mnt lalu</div>
              </div>

              <div className="flex items-center gap-3 pb-2.5 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal font-bold flex items-center justify-center text-[10px]">SK</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink truncate">Siti Kartika</div>
                  <div className="text-[11px] text-muted">Resume SO</div>
                </div>
                <div className="text-[10px] text-muted bg-cream px-1.5 py-0.5 rounded">1 jam lalu</div>
              </div>
            </div>
            
            <button className="w-full mt-3 py-2 text-[12px] font-semibold text-forest border-[1.5px] border-forest/30 rounded-lg hover:bg-forest/5 transition-colors">
              Lihat Semua Pengumpulan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
