# NEXTIT Technologies Platform

> Next-generation web platform built with Next.js 15, FastAPI, Supabase & Vercel.

## 🗂 Project Structure

```
nextit/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── admin/page.tsx
│   │   ├── services/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── settings/page.tsx
│   │   └── profile/page.tsx
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, Features, Marquee
│   │   ├── dashboard/          # KPI cards, Charts, Tables
│   │   ├── auth/               # Login/Register forms
│   │   ├── ui/                 # Reusable UI components
│   │   └── providers/          # Context providers
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   ├── auth.ts             # Auth helpers
│   │   └── utils.ts            # Utility functions
│   ├── types/index.ts          # TypeScript types
│   ├── styles/globals.css      # Global styles
│   └── i18n/
│       ├── request.ts          # next-intl config
│       └── locales/            # CS, EN, DE, SK, PL, FR, ES, IT
├── prisma/schema.prisma        # Database schema
├── backend/                    # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── app/
│       ├── core/               # Config, Database
│       ├── routers/            # Auth, Users, Projects, etc.
│       ├── models/             # SQLAlchemy models
│       └── schemas/            # Pydantic schemas
├── vercel.json                 # Vercel deployment config
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase, JWT, and API keys
```

### 3. Set up the database

```bash
# Push Prisma schema to Supabase
npx prisma db push

# Or run migrations
npx prisma migrate dev
```

### 4. Run the frontend

```bash
npm run dev
# → http://localhost:3000
```

### 5. Run the backend (optional, in a separate terminal)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
# → http://localhost:8000
# → API docs: http://localhost:8000/api/docs
```

## 🌐 Deployment to Vercel

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login & deploy
vercel login
vercel

# Set environment variables in Vercel Dashboard or CLI:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add JWT_SECRET
vercel env add NEXT_PUBLIC_API_URL
```

### Backend (Railway or Render)

**Railway:**
1. Push backend/ folder to GitHub
2. New project → Deploy from GitHub
3. Set environment variables in Railway dashboard
4. Add PostgreSQL plugin or connect to Supabase

**Render:**
1. New Web Service → Connect GitHub repo
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🗄 Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy keys to `.env.local`
3. Run `npx prisma db push` to create tables
4. Enable **Google** and **GitHub** OAuth providers in Authentication → Providers
5. Set redirect URLs in Authentication → URL Configuration:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback`

## 🌍 Internationalization

The app supports 8 languages out of the box:

| Language | Code | File |
|----------|------|------|
| Czech (default) | `cs` | `src/i18n/locales/cs/common.json` |
| English | `en` | `src/i18n/locales/en/common.json` |
| German | `de` | `src/i18n/locales/de/common.json` |
| Slovak | `sk` | `src/i18n/locales/sk/common.json` |
| Polish | `pl` | `src/i18n/locales/pl/common.json` |
| French | `fr` | `src/i18n/locales/fr/common.json` |
| Spanish | `es` | `src/i18n/locales/es/common.json` |
| Italian | `it` | `src/i18n/locales/it/common.json` |

Language is stored in a `locale` cookie and can be changed via the navbar switcher.

## 🔐 Authentication

- **Supabase Auth** (primary): handles sessions, OAuth, JWT
- **Email/Password** login and registration
- **Google OAuth** and **GitHub OAuth**
- **Protected routes**: `requireAuth()` server-side guard
- **Role-based access**: `user | dev | admin`
- Admin routes protected by `requireAdmin()`

## 📦 Tech Stack

### Frontend
- **Next.js 15** (App Router, Server Components)
- **React 19** with TypeScript 5
- **TailwindCSS** with custom design system
- **Framer Motion** for animations
- **GSAP** for hero animations
- **Three.js / R3F** for 3D (optional)
- **Lenis** for smooth scrolling
- **next-intl** for i18n
- **Recharts** for data visualization
- **Supabase** for auth + database
- **Prisma** ORM for type-safe DB access
- **Zustand** for client state
- **React Hook Form + Zod** for forms
- **Sonner** for toast notifications

### Backend
- **FastAPI** (Python)
- **asyncpg** for async PostgreSQL
- **PyJWT** for token validation
- **bcrypt** for password hashing
- **Pydantic v2** for validation

## 🎨 Design System

- Pure black backgrounds (`#000000`)
- Glassmorphism cards with backdrop blur
- Accent: `#4f8ef7` (blue) · `#7c3aed` (purple) · `#06d6a0` (green)
- Font: DM Sans (body) + DM Mono (labels/code)
- Animated CSS variables for all colors

## 📄 License

© 2026 NEXTIT Technologies s.r.o. All rights reserved.
