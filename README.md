# Imanu — Landing Page

Hebrew-first landing page for Imanu wine experiences, with English toggle. Built with Next.js, Tailwind CSS, and designed for Vercel deployment.

## Quick start

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/he` (Hebrew).

- Hebrew: `/he`
- English: `/en`

## Changing colors

All brand colors live in **`src/config/theme.ts`**. Edit hex values there — they flow to CSS custom properties and Tailwind utilities site-wide.

```ts
export const theme = {
  section: {
    intro: "#d0b6a9",  // beige intro panel
    about: "#e59497",  // pink about section
    // ...
  },
};
```

v2 admin WYSIWYG will read/write this same file structure.

## Content & copy

- Hebrew: `src/content/he.ts`
- English: `src/content/en.ts`

## Images

Replace files in `public/images/` (same filenames) or update paths in section components.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-handle
```

WhatsApp is preset to `+972502213083`.

## Admin editing (WYSIWYG)

Click **Admin** in the page footer, enter the password, then click text or images to edit.

Edits on your computer are saved automatically. On the live Vercel site, connect a **Blob** store (Storage tab) so changes persist — otherwise login works but saves may not stick after redeploy.

Optional: set `ADMIN_PASSWORD` in Vercel env vars to use a different password than the built-in default.

## Deploy to Vercel (via GitHub)

1. Push the `website/` folder to a GitHub repo (root or monorepo subfolder).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set **Root Directory** to `website` if the repo root is the parent `Imanu` folder.
4. Add `NEXT_PUBLIC_INSTAGRAM_URL` in Vercel → Settings → Environment Variables.
5. Deploy. Connect your custom domain later in Vercel → Domains.

## Project structure

```
src/
├── app/[locale]/     # Hebrew & English routes
├── components/       # Header, sections, UI
├── config/           # theme.ts, site.ts (links, WhatsApp)
├── content/          # he.ts, en.ts (all copy)
└── lib/              # i18n helpers
```

## v2 roadmap (not implemented)

- Admin login + in-place WYSIWYG editing
- Full responsive polish across all sections
