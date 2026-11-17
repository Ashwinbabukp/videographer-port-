# Ashwin K P – Videographer & Reels Editor Portfolio (Next.js)

A high-performance portfolio website built with **Next.js (App Router)** and **React 19**, featuring cinematic gradients, reactive ambient glow lighting, clean typography, and responsive layouts.

---

## 🚀 Quick Start (Local Development)

To run the site locally in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Export

To create an optimized production build:

```bash
npm run build
```

This generates a static, ready-to-deploy output inside the **`out/`** directory.

---

## 🌐 How to Host This Website (Free Options)

### Option 1: Vercel (Recommended — Easiest & Best for Next.js)

1. Push this project to your GitHub, GitLab, or Bitbucket account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Next.js portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New..."** → **"Project"**.
4. Import your repository and click **Deploy**.
5. Your portfolio is instantly live on a global CDN with free SSL and custom domain support!

*Alternatively, deploy directly from your terminal using Vercel CLI:*
```bash
npx vercel
```

---

### Option 2: Netlify (Drag-and-Drop — No Git Required!)

1. Run:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the **`out`** folder directly into the browser window.
4. Your site will be published instantly with a free live URL!

---

### Option 3: GitHub Pages

1. Install `gh-pages` if you prefer automated deployment:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add this script to `package.json`:
   ```json
   "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
   ```
3. Run:
   ```bash
   npm run deploy
   ```

---

### Option 4: Cloudflare Pages

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages**.
2. Connect your GitHub repository.
3. Build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Click **Save and Deploy**.

---

## 🛠️ Project Structure

- `app/layout.jsx`: Root layout, OpenGraph SEO tags, and typography.
- `app/page.jsx`: Main portfolio content (Hero, Selected Work, What I do, Experience, Contact, Footer).
- `app/components/Hero.jsx`: Client component powering the cinematic breathing gradient and cursor glow effect.
- `app/globals.css`: Stylesheet, dark mode tokens, keyframe animations, and responsive rules.
- `next.config.mjs`: Static export configuration (`output: 'export'`).
- `out/`: Static build artifacts ready to upload to any static hosting provider.
