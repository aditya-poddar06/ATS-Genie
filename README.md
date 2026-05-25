<div align="center">

# ✨ AI Genie — Resume Intelligence Platform

**A next-generation AI-powered resume analyzer that combines Apple-level storytelling, enterprise-grade analytics, and cinematic UI design.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-ff0055?style=flat-square)](https://framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

![AI Genie Banner](https://placehold.co/1200x600/0a0a0a/38bdf8?text=AI+Genie+%E2%80%94+Resume+Intelligence+Platform&font=montserrat)

[**Live Demo**](#) · [**Report Bug**](https://github.com/aditya-poddar06/ats-genie/issues) · [**Request Feature**](https://github.com/aditya-poddar06/ats-genie/issues)

</div>

---

## 🚀 What is AI Genie?

AI Genie is a **fully local, zero-API-cost** resume intelligence platform. Upload your PDF or DOCX resume and instantly receive:

- 🎯 **ATS Compatibility Score** — How well machines parse your resume
- 👤 **Recruiter Impact Score** — How compelling it reads to humans
- 💥 **Impact Analysis** — Action verbs, quantified achievements, weak phrases
- 🔑 **Keyword Intelligence** — Density scoring, gap detection, top terms
- 🧠 **Semantic Skill Analysis** — 200+ technical skills, tools, certifications
- 📐 **Formatting Diagnostics** — Contact info, bullet structure, page length
- 📖 **Readability Engine** — Flesch-Kincaid grade, passive voice, clarity
- ⚠️ **Weakness Detection** — Prioritized issues with specific fixes
- 💡 **Recommendations** — Actionable improvements with examples
- 🎯 **Job Description Matching** — Keyword heatmap, semantic similarity, gap analysis

> **Everything runs locally. No OpenAI. No Gemini. No Claude. No data leaves your device.**

---

## ✨ Features

### Cinematic Landing Page
- Mouse-follow spotlight effect on hero section
- Animated ATS dashboard preview with live score rings
- Apple-style "How It Works" storytelling (5 steps)
- 8-feature grid with cursor-reactive glow cards
- Before/After bullet transformation showcase
- Lenis smooth scrolling + Framer Motion animations

### Real Resume Scanning
- Drag-and-drop upload zone
- PDF parsing via `pdf-parse`
- DOCX parsing via `mammoth`
- TXT support
- Upload progress with 3-stage indicator (Upload → Parse → Analyze)
- Optional job description input for JD matching

### Premium Analytics Dashboard (9 tabs)
| Tab | What it shows |
|-----|--------------|
| **Overview** | Radar chart + bar chart + section detection grid |
| **Keywords** | Horizontal bar chart + found/missing tag clouds |
| **Skills** | Technical, soft, tools, certifications, languages |
| **Impact** | Action verbs, quantified achievements, weak phrases |
| **Formatting** | Contact checklist + structure metrics |
| **Readability** | Flesch-Kincaid grade + passive voice analysis |
| **Issues** | Severity-tiered weakness list (critical/warning/info) |
| **Fixes** | Prioritized recommendations with examples |
| **JD Match** | Keyword heatmap + semantic similarity + gap analysis |

### UI System
- `ScoreRing` — Animated SVG rings with dynamic color by score
- `GlowCard` — Cursor-reactive radial gradient glow
- `MagneticButton` — Spring-physics magnetic pull on hover
- `AnimatedCounter` — Eased number counting on scroll-into-view
- Glassmorphism, aurora gradients, mesh backgrounds throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion + Lenis smooth scroll |
| **Charts** | Recharts (Radar, Bar) |
| **PDF Parsing** | pdf-parse |
| **DOCX Parsing** | mammoth |
| **NLP** | Rule-based engine (local, no API) |
| **Icons** | Lucide React |
| **Fonts** | Inter + Space Grotesk (Google Fonts) |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/aditya-poddar06/ats-genie.git
cd ats-genie

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ats-genie/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # ATS analysis endpoint
│   │   └── parse/route.ts      # File parsing endpoint (PDF/DOCX)
│   ├── globals.css             # Global styles, animations, glassmorphism
│   ├── layout.tsx              # Root layout with fonts + metadata
│   └── page.tsx                # Main app (landing ↔ dashboard state)
│
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx           # Main dashboard shell + tab nav
│   │   ├── ScoresOverview.tsx      # Radar + bar charts + section grid
│   │   ├── KeywordsPanel.tsx       # Keyword analysis + found/missing
│   │   ├── SkillsPanel.tsx         # Skills by category
│   │   ├── ImpactPanel.tsx         # Action verbs + achievements
│   │   ├── FormattingPanel.tsx     # Contact + structure diagnostics
│   │   ├── WeaknessesPanel.tsx     # Severity-tiered issues
│   │   ├── RecommendationsPanel.tsx # Prioritized fixes
│   │   └── JobMatchPanel.tsx       # JD matching + heatmap
│   │
│   ├── landing/
│   │   ├── Navbar.tsx          # Sticky nav with mobile menu
│   │   ├── Hero.tsx            # Cinematic hero + floating dashboard
│   │   ├── HowItWorks.tsx      # 5-step Apple-style storytelling
│   │   ├── Features.tsx        # 8-feature glow card grid
│   │   ├── BeforeAfter.tsx     # Bullet transformation showcase
│   │   └── CTA.tsx             # Cinematic call-to-action
│   │
│   ├── ui/
│   │   ├── ScoreRing.tsx       # Animated SVG score ring
│   │   ├── GlowCard.tsx        # Cursor-reactive glow card
│   │   ├── MagneticButton.tsx  # Spring-physics magnetic button
│   │   └── AnimatedCounter.tsx # Scroll-triggered number counter
│   │
│   └── upload/
│       ├── UploadModal.tsx     # Modal wrapper
│       └── UploadZone.tsx      # Drag-drop + progress + JD input
│
└── lib/
    └── ats-engine.ts           # Core NLP analysis engine (local)
```

---

## 🧠 How the ATS Engine Works

The engine in `lib/ats-engine.ts` runs entirely on the server with no external AI APIs:

### Scoring Dimensions
| Score | Weight | What it measures |
|-------|--------|-----------------|
| **ATS** | 25% | Section detection, contact info, bullet structure |
| **Recruiter** | 20% | Action verbs, quantified achievements, weak phrase penalty |
| **Impact** | 20% | Measurable results, strong language, achievement density |
| **Formatting** | 15% | Contact completeness, page length, bullet consistency |
| **Readability** | 10% | Flesch-Kincaid, passive voice, sentence complexity |
| **Keywords** | 10% | Technical skill coverage, density, relevance |

### Detection Capabilities
- **45 action verbs** (achieved, architected, scaled, shipped...)
- **12 weak phrases** (responsible for, helped with, participated in...)
- **200+ technical skills** (React, TypeScript, AWS, Docker, PostgreSQL...)
- **15 soft skills** (leadership, communication, analytical...)
- **30+ tools** (Jira, GitHub, Datadog, Tableau...)
- **10 certification patterns** (AWS Certified, PMP, CISSP...)
- **Quantified achievement regex** (numbers + %, $, x, K, M)
- **Passive voice detection** (was/were/been + past participle)
- **Flesch-Kincaid readability** (syllable counting approximation)

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Base |
| Surface | `rgba(255,255,255,0.03)` | Glass cards |
| Cyan | `#38bdf8` | Primary accent |
| Blue | `#818cf8` | Secondary accent |
| Purple | `#a78bfa` | Tertiary accent |
| Emerald | `#34d399` | Success / high scores |
| Amber | `#f59e0b` | Warning / medium scores |
| Red | `#f87171` | Error / low scores |

### Typography
- **Display**: Space Grotesk — headlines, scores
- **Body**: Inter — all other text
- **Scale**: 7xl (hero) → xs (labels)

---

## 🔒 Privacy

- **No data is stored** — resumes are processed in memory and discarded
- **No external API calls** — all analysis is local rule-based NLP
- **No authentication required** — fully anonymous
- **No cookies or tracking**

---

## 📄 License

MIT © [Aditya Kumar Poddar](https://github.com/aditya-poddar06)

---

<div align="center">

Built with ❤️ using Next.js, Framer Motion, and local NLP intelligence.

**[⬆ Back to top](#-ai-genie--resume-intelligence-platform)**

</div>
