"use client";

import { useState } from "react";
import { createSeedData } from "@/data/sim-data";

const data = createSeedData().mahasiswa;

const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DOWS = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

function getDeadlineDays(year: number, month: number): Record<number, { diff: number; task: (typeof data.tasks)[0] }> {
  const days: Record<number, { diff: number; task: (typeof data.tasks)[0] }> = {};
  data.tasks.forEach(task => {
    const d = new Date(task.deadline);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      const diff = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (!days[day] || diff < days[day].diff) {
        days[day] = { diff, task };
      }
    }
  });
  return days;
}

function getDayClass(day: number, deadlines: ReturnType<typeof getDeadlineDays>, today: Date, year: number, month: number) {
  const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  if (isToday) return "bg-mhs-amber text-mhs-on font-bold";
  const dl = deadlines[day];
  if (!dl) return "text-mhs-muted hover:bg-mhs-border";
  if (dl.diff <= 3) return "text-mhs-text";
  if (dl.diff <= 7) return "text-mhs-text";
  return "text-mhs-text";
}

function getDotClass(diff: number) {
  if (diff <= 3) return "bg-mhs-rose";
  if (diff <= 7) return "bg-mhs-amber";
  return "bg-mhs-teal";
}

export default function KalenderPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const deadlines = getDeadlineDays(year, month);

  const monthDeadlines = data.tasks.filter(t => {
    const d = new Date(t.deadline);
    return d.getFullYear() === year && d.getMonth() === month;
  }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-[11px] text-mhs-muted uppercase tracking-[0.1em] mb-0.5">Modul</div>
        <div className="font-serif text-[22px] text-mhs-text">Kalender Deadline</div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-5">

        {/* BIG CALENDAR */}
        <div className="bg-mhs-card border border-mhs-border rounded-[14px] p-5">
          <div className="flex items-center mb-5">
            <h3 className="font-serif text-[20px] text-mhs-text flex-1">{MONTHS[month]} {year}</h3>
            <button onClick={prevMonth} className="text-mhs-muted hover:text-mhs-text px-2 py-1 rounded transition-colors text-[18px]">‹</button>
            <button onClick={nextMonth} className="text-mhs-muted hover:text-mhs-text px-2 py-1 rounded transition-colors text-[18px]">›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {DOWS.map(d => (
              <div key={d} className="text-[10px] text-mhs-muted py-1 font-semibold">{d}</div>
            ))}

            {/* Prev month days */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`prev-${i}`} className="text-[12px] py-2 text-mhs-muted/25 rounded-lg">
                {prevMonthDays - firstDay + 1 + i}
              </div>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dl = deadlines[day];
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

              return (
                <div key={day} className="relative">
                  <div
                    className={`text-[13px] py-2 rounded-lg cursor-pointer transition-colors font-medium
                      ${isToday
                        ? "bg-mhs-amber text-mhs-on font-bold"
                        : dl
                          ? "text-mhs-text hover:bg-mhs-hover"
                          : "text-mhs-muted hover:bg-mhs-border"
                      }`}
                  >
                    {day}
                  </div>
                  {dl && !isToday && (
                    <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${getDotClass(dl.diff)}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-4">
          {/* LEGEND */}
          <div className="bg-mhs-card border border-mhs-border rounded-[14px] p-5">
            <div className="flex items-center mb-3.5">
              <h3 className="text-[14px] font-semibold text-mhs-text">📌 Legenda</h3>
            </div>
            <div className="flex flex-col gap-2.5 text-[12px] text-mhs-muted">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-mhs-rose shrink-0" /><span>Deadline Mendesak (≤3 hari)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-mhs-amber shrink-0" /><span>Deadline Dekat (≤7 hari)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-mhs-teal shrink-0" /><span>Deadline Normal</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-mhs-amber border-2 border-mhs-on shrink-0" /><span>Hari Ini</span></div>
            </div>
          </div>

          {/* EVENT LIST */}
          <div className="bg-mhs-card border border-mhs-border rounded-[14px] p-5">
            <h3 className="text-[14px] font-semibold text-mhs-text mb-4">📋 Event Bulan Ini</h3>
            {monthDeadlines.length === 0 && (
              <div className="text-center py-8 text-mhs-muted text-[13px]">Tidak ada deadline bulan ini</div>
            )}
            <div className="space-y-2.5">
              {monthDeadlines.map(task => {
                const d = new Date(task.deadline);
                const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isUrgent = diff <= 3;
                return (
                  <div key={task.id} className="flex items-start gap-2.5 pb-2.5 border-b border-mhs-border/50 last:border-0 last:pb-0">
                    <div className={`w-10 text-center rounded-lg py-1 shrink-0 ${isUrgent ? "bg-mhs-rose/15 border border-mhs-rose/30" : "bg-mhs-border"}`}>
                      <div className={`font-serif text-[18px] leading-none ${isUrgent ? "text-mhs-rose" : "text-mhs-text"}`}>
                        {String(d.getDate()).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] text-mhs-muted uppercase tracking-wider">
                        {MONTHS[d.getMonth()].slice(0, 3)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="text-[13px] font-medium text-mhs-text truncate">{task.title}</div>
                      <div className="text-[11px] text-mhs-muted mt-0.5">{task.course}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
