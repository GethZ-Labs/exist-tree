# Notes for AI coding assistants (Google AI Studio, Gemini, Cursor, Copilot, Claude…)

This is the **EXiST website**: a **Next.js 16 (App Router) + React 19 + TypeScript** project. It is not a Vite app — keep the Next.js structure and don't convert or restructure it.

## Run

- `npm install`
- `npm run dev` → http://localhost:3000. This runs `dev-server.mjs`: the normal Next.js dev server plus a fix that lets the site preview inside sandboxed iframes (like Google AI Studio's preview). Keep that file.
- `npm run build` then `npm start` → production server (listens on `$PORT`).
- After changes: `npm run lint` and `npm run typecheck`.

## Where things are

- `src/lib/site.ts` — all copy and contact details: email, WhatsApp, socials (LinkedIn link goes here), projects, careers roles, services.
- `src/components/site/` — homepage sections, nav, footer, page transitions, effects.
- `src/components/site/pages/` — Projects, About (incl. pricing section), Careers.
- `src/components/intro/` — the WebGL intro. `StoryOverlay.tsx` has its texts and `gl/` has the renderer, shaders and 3D models.
- `src/app/api/enquiry/route.ts` — contact-form backend (email via SMTP / Resend; browser fallback Web3Forms).
- Styles: `src/app/globals.css`, `src/app/site.css`, `src/components/intro/intro.css`.
- Images: `public/projects/`, `public/work/`, `public/brand/`.

## Brand rules — keep them

- Colours: lime `#DBFE01` on near-black (`#050604` / `#0b0c08`), paper `#f1f4e6`. No other palettes (no dark greens, no blues).
- Fonts: Jaro for display headings (uppercase; the logo is written `EXıST` with a dotless ı), Space Grotesk for body, JetBrains Mono for small labels.
- Liquid, glass and glow effects; short, punchy, client-facing copy; never repeat the same line in two places.
