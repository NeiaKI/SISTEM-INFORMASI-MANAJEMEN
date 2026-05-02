# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Aturan Commit

Jangan pernah menambahkan `Co-Authored-By` atau atribusi Claude di pesan commit manapun.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Start production server
```

No lint or test tooling is configured yet.

## Architecture

**Frontend-only prototype** — Next.js 15 App Router, TypeScript/TSX, Tailwind CSS v4, shadcn/ui (Radix UI), React 19, no backend or database.

### Key directories

- `app/` — Next.js App Router pages by role:
  - `auth/login/` — login page, selects role and redirects
  - `mahasiswa/` — student dashboard (tugas, kelompok, laporan, log, notifikasi, proyek, participant, profil)
  - `dosen/` — lecturer dashboard (tugas, rekap, kelompok, mahasiswa, matakuliah, laporan, log, notifikasi, profil)
  - `admin/` — admin dashboard (tugas, laporan, notifikasi, profil)
  - `staff-tu/` — staff TU dashboard (tugas, laporan, notifikasi, profil)
- `components/ui/` — shadcn/ui primitives (Button, Badge, Card, Dialog, Select, Tabs, Checkbox, Input, Skeleton, ConfirmDialog)
- `components/` — shared components (empty-state, task-detail-panel, theme-provider, reload-button)
- `data/sim-data.ts` — all mock data and configuration constants (`AUTH_MODES`, `SECTION_OPTIONS`, `ACCESS_ROWS`, system settings)
- `lib/` — stores and utilities:
  - `utils.ts` — `cn()` helper (clsx + tailwind-merge)
  - `taskStore.ts` — task state management
  - `kelompokStore.ts` — group state management
  - `notifStore.ts` — notification state management
  - `activityLog.ts` — activity log helpers
  - `exportUtils.ts` — export/download utilities
  - `students-data.ts` — student mock data
  - `search-context.tsx` — global search context

### Role-based UI

The app has four user roles with distinct layouts and color palettes:
- **Mahasiswa** (students) — Amber/Teal accent theme (`mhs-*` CSS vars)
- **Dosen** (lecturers) — Forest/Gold on cream theme (`dsn-*` CSS vars)
- **Admin** — institutional admin theme (`adm-*` CSS vars)
- **Staff TU** — staff TU theme (`stu-*` CSS vars)

Login at `/auth/login` selects the role and routes accordingly. All state is local (`useState`); no real authentication exists.

### Theming

Tailwind v4 uses CSS-first config in `app/globals.css` (`@theme inline { ... }`), no `tailwind.config.js`. `components/theme-provider.tsx` wraps `next-themes` for light/dark mode. `components.json` configures shadcn/ui (baseColor: slate, cssVariables enabled).

### Path alias

`@/*` maps to the project root (configured in `tsconfig.json`).

## Product context

This is a task/project management system for a university (SIM Tugas). Full requirements are in `prd-sim-tugas.md`. Planned future integrations: SIAKAD, campus LMS, email notifications, Telegram bot.
