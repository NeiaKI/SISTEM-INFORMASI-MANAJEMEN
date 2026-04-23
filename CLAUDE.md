# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- `app/` — Next.js App Router pages: `auth/login/`, `mahasiswa/` (student dashboard), `dosen/` (lecturer dashboard), root `page.tsx` (landing)
- `components/ui/` — shadcn/ui primitives (Button, Badge, Card, Dialog, Select, Tabs, Checkbox, Input)
- `data/sim-data.js` — All mock data and configuration constants (`AUTH_MODES`, `SECTION_OPTIONS`, `ACCESS_ROWS`, system settings)
- `lib/utils.js` — `cn()` helper (clsx + tailwind-merge)

### Role-based UI

The app has two user roles with distinct layouts and color palettes:
- **Mahasiswa** (students) — Amber/Teal accent theme
- **Dosen** (lecturers) — Forest/Gold on cream theme

Login at `/auth/login` selects the role and routes accordingly. All state is local (`useState`); no real authentication exists.

### Theming

Tailwind v4 uses CSS-first config in `app/globals.css` (`@theme inline { ... }`), no `tailwind.config.js`. `components/theme-provider.jsx` wraps `next-themes` for light/dark mode. `components.json` configures shadcn/ui (baseColor: slate, cssVariables enabled).

### Path alias

`@/*` maps to the project root (configured in `tsconfig.json`).

## Product context

This is a task/project management system for a university (SIM Tugas). Full requirements are in `prd-sim-tugas.md`. Planned future integrations: SIAKAD, campus LMS, email notifications, Telegram bot.
