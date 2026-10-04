# EXiST — website

The website of **EXiST (Excellence IT Solutions)**: a real-time WebGL cinematic intro with a live, synthesised soundtrack, followed by a multi-page studio site with a working contact-form backend.

Built with Next.js 16, React 19 and TypeScript. One Node server runs both the pages and the backend (`/api/enquiry`).

---

## Run it on your computer

Requires **Node.js 20.9 or newer** (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload (also works inside cloud-editor previews such as Google AI Studio) |
| `npm run build` | Production build |
| `npm start` | Runs the production build (uses `PORT`, default 3000) |
| `npm run lint` / `npm run typecheck` | Code checks |

Intro shortcuts: `/?intro=0` skips the intro, `/?intro=1` forces it (it otherwise plays once per browser tab). The footer has **Replay the intro**. In development, `?introDebug=world:0.36` freezes any intro moment (`pour:2.5`, `garden:4`, `world:0..1`, `flood:3`).

---

## Edit the content

Almost everything you'll want to change lives in **`src/lib/site.ts`**:

- `CONTACT` — email, WhatsApp number, location and the social links.
  **LinkedIn:** replace `https://www.linkedin.com/` and the handle `"Coming soon"` with your company page when it's ready.
- `PROJECTS` — the project folders (title, summary, deliverables, live link and images). Images live in `public/projects/` and `public/work/`.
- `SERVICES`, `PROCESS`, `PROMISES`, `ROLES` (careers).

Page texts: `src/components/site/` (homepage sections) and `src/components/site/pages/` (Projects, About, Careers). The About page's pricing section is in `pages/AboutPage.tsx` (`PRICE_POINTS`). Intro texts: `src/components/intro/StoryOverlay.tsx`.

---

## Contact form email

The **Send enquiry** button posts to the site's backend (`src/app/api/enquiry/route.ts`), which checks the message, blocks spam (hidden honeypot field and a rate limit) and emails it to **existofficial7@gmail.com**. Replying to that email answers the customer directly.

Set **one** of these options as environment variables (locally in `.env.local`, on Render under *Environment*). `.env.example` lists them all.

1. **Web3Forms — easiest, free, works on Render's free plan.**
   Go to https://web3forms.com, enter `existofficial7@gmail.com`, and copy the access key from the email you get.
   Set `NEXT_PUBLIC_WEB3FORMS_KEY` to that key, then redeploy. The key is designed to be public.
2. **Gmail SMTP.** Turn on 2-Step Verification for the Gmail account and create an App Password at https://myaccount.google.com/apppasswords.
   Set `SMTP_USER` to the Gmail address and `SMTP_PASS` to the 16-letter app password.
   Some free hosting plans block outgoing SMTP. If mail doesn't arrive, use option 1.
3. **Resend.** Sign up at https://resend.com with the inbox that should receive enquiries, then set `RESEND_API_KEY`.

With nothing configured, the form never fails silently. It keeps the visitor's message and offers one-tap **WhatsApp** and **email** buttons instead. The *Send on WhatsApp* button always works.

---

## Put it on GitHub

**Easiest: GitHub Desktop** (https://desktop.github.com).

1. Unzip the project folder.
2. In GitHub Desktop, choose *File → Add local repository* and pick the folder. When it asks, choose *create a repository*.
3. Make the first commit, then click **Publish repository**.

**Or in the browser:** create an empty repository on github.com, click *uploading an existing file*, and drag in everything inside the project folder (about 80 files, under GitHub's 100-file limit). Don't drag `node_modules` or `.next` if you've run the project locally.

**Or with the command line:**

```bash
git init
git add .
git commit -m "EXiST website"
git branch -M main
git remote add origin https://github.com/<your-account>/exist-website.git
git push -u origin main
```

`node_modules`, `.next` and your `.env.local` secrets are already excluded by `.gitignore`.

---

## Edit it in Google AI Studio

**Option 1 — Import from GitHub (most reliable).**

1. Put the project on GitHub first (see above).
2. In Google AI Studio, open **Build**.
3. Click the **+** (Add files) button in the prompt box, choose **Import from GitHub**, pick the repository, then click **Import repository**.
4. AI Studio installs the packages and starts the site with `npm run dev` on port 3000, the same as on your computer.

**Option 2 — upload `exist-website-ai-studio.zip`.** In that zip the files sit at the top level, as AI Studio expects.

1. In **Build**, start any new app, then stop the agent.
2. Open the **Code** panel and delete all the files it generated.
3. Click **+ → Upload**, choose the zip, and check that `package.json` is at the top level of the file list.
4. Ask the agent: *"Don't generate a new app. Run npm install, then npm run dev on port 3000. Keep this Next.js project as it is."*

Things to know:
- **Don't attach the zip as a chat message.** Attached files are only read as reference material, so the site doesn't start.
- **Why the dev server is custom.** AI Studio shows the site inside a sandboxed preview frame. The normal Next.js dev server blocks its own scripts and styles there, which is why the preview stayed blank. `npm run dev` runs `dev-server.mjs`, the same dev server with that block fixed. `npm run dev:next` is the plain version.
- **If the preview doesn't start,** ask AI Studio: *"Run npm install, then npm run dev on port 3000. Keep the Next.js project structure."*
- **`AGENTS.md`** tells AI assistants how the project is organised and which brand rules to keep.

---

## Host it free on Netlify (recommended)

Netlify's free plan allows business websites. It runs the whole site, including the `/api/enquiry` contact backend, never sleeps, and gives you HTTPS. `netlify.toml` already holds every setting.

**Option A — straight from this folder (no GitHub needed).** Open a terminal in the project folder and run:

```bash
npx netlify-cli login
```

```bash
npx netlify-cli deploy --build --prod
```

The first command opens your browser so you can sign up or log in. The second builds the site and uploads it. The first time, choose **Create & configure a new project** and pick a name such as `exist-website`. Your site goes live at `https://<name>.netlify.app`. Run the second command again whenever you want to publish changes.

**Option B — through GitHub (redeploys by itself on every change).**

1. Put the project on GitHub (see above).
2. Go to https://app.netlify.com, click **Add new project**, then **Import an existing project**, then **GitHub**, and pick the repository.
3. Netlify reads `netlify.toml`. Click **Deploy**; the first build takes about 3 minutes.

**Afterwards:**
- **Contact form email.** Go to *Project configuration → Environment variables* and add `NEXT_PUBLIC_WEB3FORMS_KEY` (see "Contact form email"). Then redeploy: *Deploys → Trigger deploy*.
- **Site name and domain.** Rename the site under *Project configuration → Change project name*. Add your own domain under *Domain management*.
- **Free plan limits.** The free plan gives 300 credits a month. Each production deploy uses 15, and visitor traffic uses the rest. Group your changes into fewer deploys.

Vercel's free plan is for non-commercial use only, so for the business site use Netlify (or Render, below).

---

## Deploy on Render (free)

Render only deploys from a Git repository, so put the project on GitHub first (see "Put it on GitHub"). `package.json` must be at the top level of the repository.

**Option A — Blueprint (uses `render.yaml`).**

1. Go to https://dashboard.render.com and choose **New → Blueprint**.
2. Connect GitHub and pick the repository.
3. Render reads `render.yaml`: a free Node web service in Singapore, built with `npm ci && npm run build` and started with `npm start`. Click **Deploy Blueprint**.

**Option B — manual Web Service.**

1. Choose **New → Web Service** and pick the repository.
2. Use these settings:
   - Runtime: **Node**
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
   - Instance type: **Free**
3. Under *Environment*, add `NODE_VERSION = 22`.

After the first deploy (about 5 minutes), the site is live at `https://<service-name>.onrender.com`. Every push to GitHub redeploys it automatically.

**Contact form email:** open the service's *Environment* tab and add `NEXT_PUBLIC_WEB3FORMS_KEY` (see "Contact form email"). Then click **Save, rebuild, and deploy**.

Good to know:
- Free Render services **sleep after ~15 minutes without visitors**. The next visit then takes about a minute to wake up. A paid instance stays awake.
- `NEXT_PUBLIC_…` variables are baked in at build time. After changing one, click *Manual Deploy → Deploy latest commit*.
- To use your own domain, add it under *Settings → Custom Domains* and set `NEXT_PUBLIC_SITE_URL` to it so link previews use the right address.

---

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Intro (once per tab), then hero → manifesto → services (liquid glass deck) → process → project folders → who we are → contact form |
| `/projects` | Every project as a folder. Click to open it: the posters and site captures fly out into a gallery with a lightbox. Close with ✕, Esc, *Back to all projects* or a click outside |
| `/about` | Story chapters, **honest pricing** (premium work, prices that fit), the liquid loop, promises, services |
| `/careers` | Editor, Mobile App Developer and SEO Specialist, shown blurred ("not hiring right now"). CVs go to WhatsApp or email |
| `/api/enquiry` | Contact-form backend (POST only) |

---

## Sound

All sounds are synthesised live with the Web Audio API (`src/lib/sound.ts`), so there are no audio files. Sound starts on the visitor's first click, tap or key press. The equaliser button in the intro header and the nav turns it off, and the choice is remembered.

- **Intro sounds** (`src/components/intro/introSound.ts`): drone, glass ring while drawing the circle, chime, charge, shatter, liquid pour, garden, HUD blips, scroll-reactive scanner, story hits and a resolving chord into the site.
- **Site sounds:** page transitions, folders opening and closing, lightbox and service tabs.

---

## The intro

Everything is drawn live on one WebGL2 canvas in the brand's lime/ink identity.

1. **Gate.** Draw a circle, or tap "Or tap to enter".
2. **Pour.** The glass tube charges, bursts and pours into a black pool.
3. **Gardens.** A lit blueprint of water gardens rises.
4. **Story (scroll or mouse wheel).** The rock is scanned into a hologram, surrounded by a soft forest, a lotus lake and elephants, with the lion statue at the gate.
   - *"Who can make my brand stand out?"* — *We can.*
   - *"We build. You grow."* with call-outs for Systems, Design, Development and Growth.
   - EXiST → EXCELLENCE IT SOLUTIONS.
   - *"We turn fading brands into next-gen icons."*
5. **Flood.** Lime liquid floods into the website.

Code: `src/components/intro/`. `Intro.tsx` is the phase machine, `StoryOverlay.tsx` holds the texts, `timeline.ts` the timings, and `gl/` the renderer, shaders, rock and environment models.

---

## Project structure

```
src/app/                      routes, layout, global styles, /api/enquiry
src/components/intro/         the cinematic intro (+ gl/ renderer, models, shaders)
src/components/site/          site sections, nav, footer, transitions, effects
src/components/site/pages/    Projects, About, Careers
src/lib/site.ts               copy, contact details, projects, roles
src/lib/enquiry.ts            sends the contact form
src/lib/sound.ts              sound engine
public/                       brand, project and poster images
render.yaml, .env.example     hosting + settings
```
