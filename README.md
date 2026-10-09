# CareerCraft — Resume & Portfolio Builder SaaS

A full-stack, responsive **Resume & Portfolio Builder SaaS** built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Designed for students, freshers, job seekers, and senior professionals to create ATS-friendly resumes and personal portfolio websites without writing code.

---

## 🌟 Key Features

### 1. Interactive Resume Builder
* **13 Modular Sections:** Personal information, career summary, work experience, education, skills, featured projects, certifications, honors/awards, languages, volunteer leadership, and custom social links.
* **Real-time Live Preview:** Desktop split-screen two-panel workspace with debounced autosave and mobile editor/preview toggle.
* **7 Distinct Resume Templates:**
  1. *Classic Professional* (Formal serif typography, traditional dividers)
  2. *Modern Minimal* (Two-panel rail, balanced whitespace)
  3. *ATS-Optimized* (Strict single-column layout, semantic headings, high text parsability)
  4. *Student & Fresher* (Highlights education, honors, and capstones first)
  5. *Software Developer* (Terminal aesthetics, code tags, GitHub links, project architecture)
  6. *Creative Designer* (Bold typography contrast, case studies, visual accents)
  7. *Executive Leader* (Executive value proposition, career milestones, board roles)
* **Design Customizer:** Real-time accent color picker, font switching (Sans, Serif, Mono), document spacing controls (compact, normal, relaxed), and section visibility toggles.
* **Resume Completion Strength Score:** Real-time completion score (0–100%) and actionable checklist with instant jump-to-section suggestions.
* **High-Fidelity PDF Export:** Preserves exact formatting and dimensions using `jspdf` + `html2canvas`, with native print stylesheet support.

### 2. Personal Portfolio Website Builder
* **Editable Content:** Headline, bio, hero badge, skills, contact info, and projects (with live demo links, repository URLs, tags, and screenshots).
* **4 Responsive Portfolio Themes:**
  1. *Developer Showcase* (Dark mode terminal aesthetic, live project links, GitHub cards)
  2. *Design Portfolio* (Visual-first cards, typography contrast, process storytelling)
  3. *Academic & Fresher* (Clean layout focused on education, coursework, and capstones)
  4. *Executive & Consultant* (Authoritative case studies and advisory contact CTA)
* **Public Portfolio Hosting:** Instant public profile URLs at `/portfolio/[slug]`.
* **Slug Management:** Real-time slug formatting (`slugify`) and uniqueness/regex validation.
* **One-Click Publishing:** Publish/unpublish toggle, shareable link copy button, and custom 404 page for unpublished/missing portfolios.
* **Resume Integration:** Visitors can download the user's CV directly from the portfolio header.

### 3. AI-Assisted Writing Assistant
* **Action Verb Bullet Rewriter:** Transforms passive bullets into high-impact accomplishment statements (Action + Context + Quantifiable Metric).
* **Summary Enhancer:** Crafts punchy, executive-ready professional summaries.
* **Skill Recommender:** Suggests tailored technical and domain skills based on the candidate's job title.
* **Configurable Provider:** Powered by Google Gemini API (`GEMINI_API_KEY`) with an intelligent built-in heuristic fallback so the app works seamlessly even without an external API key.

### 4. Monetization & Subscriptions
* **Free vs. Pro Plans:** Configurable limits defined in `src/lib/constants/pricing.ts`.
* **Pro Features:** Access to all 7 resume templates, all 4 portfolio themes, AI writing assistant, and unlimited exports.
* **Razorpay Integration:** Server-side order generation (`/api/payment/create-order`) and cryptographic HMAC SHA256 signature verification (`/api/payment/verify`), with an interactive Sandbox Demo Mode for local testing.

### 5. Local-First Offline & Supabase Hybrid Architecture
* Works out of the box with persistent browser `localStorage` and rich pre-populated demo data.
* Automatically syncs and persists to Supabase PostgreSQL when credentials are provided in `.env.local`.

---

## 🚀 Quick Start & Local Development

### Prerequisites
* Node.js v18+ (tested on Node v20 & v26)
* npm or pnpm

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (all keys are optional for initial local exploration):
```env
# Supabase Configuration (Optional for local testing; uses local-first storage when omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Google Gemini AI Assistant (Optional)
GEMINI_API_KEY=your-gemini-api-key-here

# Razorpay Payment Gateway (Optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourkeyid
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Application Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

To connect Supabase PostgreSQL and Supabase Authentication:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository and run the entire SQL script.
4. The script automatically sets up:
   * `profiles` table with updated_at triggers and auto-insert on user signup.
   * `resumes` table with JSONB data store.
   * `portfolios` table with unique `slug` constraint and JSONB data store.
   * Row Level Security (RLS) policies ensuring users can only read/write their own private documents, while permitting public reads for `is_published = TRUE` portfolios.
5. In your Supabase Project Settings, copy the **Project URL** and **anon public API Key**, then paste them into `.env.local`.

---

## 🧪 Testing Core User Flows

1. **Landing Page:** Navigate to `http://localhost:3000`. Toggle the interactive preview between Resume and Portfolio view.
2. **Resume Creation:**
   * Click **Build My Resume** or navigate to `/dashboard/resumes/new`.
   * Pick a template (e.g. ATS-Optimized or Software Developer).
   * Check **Pre-populate with sample data** and click **Create & Open Editor**.
   * Edit contact info, add bullet points, and notice the debounced **Autosaved** status.
   * Click **Enhance with AI** on the summary or a bullet point to test the writing modal.
   * Click **Download PDF** to test client-side vector A4 export.
3. **Portfolio Creation & Publishing:**
   * Navigate to `/dashboard/portfolios/new`.
   * Set your slug (e.g. `john-doe`) and choose a theme (e.g. *Developer Showcase*).
   * Open the editor at `/dashboard/portfolios/[id]`.
   * Go to the **Domain & Publish** tab, toggle **Publish Site**, and click **View Live** to access `/portfolio/[slug]`.
4. **Plan Upgrade & Sandbox Mode:**
   * Navigate to `/pricing`.
   * Click **Upgrade to Pro**.
   * If Razorpay keys are not provided, click **Click here to enable Sandbox Pro Access for testing** to immediately activate the Pro tier.

---

## 📦 Production Deployment

### Deploying on Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Add the environment variables from `.env.example`.
4. Click **Deploy**. Next.js App Router will compile and optimize all static and dynamic routes.

---

## 📋 Status & Unconfigured Integrations

* **Supabase:** Fully configured with SQL schema and RLS policies in `supabase/schema.sql`. Operates in local-first storage mode until `NEXT_PUBLIC_SUPABASE_URL` is configured.
* **Google Gemini AI:** Fully coded in `/api/ai/improve` and `/api/ai/suggest-skills`. If `GEMINI_API_KEY` is not present, falls back gracefully to built-in power-verb rules without failing.
* **Razorpay:** Server routes `/api/payment/create-order` and `/api/payment/verify` are ready with cryptographic signature verification. In the absence of live API keys, provides a sandbox test mode.
