import { ResumeTemplateId } from "../types/resume";
import { PortfolioTemplateId } from "../types/portfolio";

export interface ResumeTemplateMeta {
  id: ResumeTemplateId;
  name: string;
  category: "General" | "Tech" | "Creative" | "Executive" | "ATS";
  description: string;
  badge?: string;
  isPro?: boolean;
  accentColors: string[];
  recommendedFor: string;
}

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  {
    id: "classic",
    name: "Classic Professional",
    category: "General",
    description: "Traditional serif headers, clean horizontal dividers, and timeless two-column layout.",
    isPro: false,
    accentColors: ["#1e293b", "#0f766e", "#1e40af", "#475569"],
    recommendedFor: "Law, Finance, Healthcare, Academia, and Traditional Corporate roles.",
  },
  {
    id: "modern",
    name: "Modern Minimal",
    category: "General",
    description: "Crisp sans-serif fonts, elegant left accent rail, balanced whitespace, and subtle tag pills.",
    badge: "Most Popular",
    isPro: false,
    accentColors: ["#4f46e5", "#0284c7", "#059669", "#7c3aed"],
    recommendedFor: "Product Managers, Marketers, Consultants, and General Business.",
  },
  {
    id: "ats",
    name: "ATS Optimized",
    category: "ATS",
    description: "Strict single-column layout, standard semantic headings, and high text parsability for automated ATS screeners.",
    badge: "High Pass Rate",
    isPro: false,
    accentColors: ["#111827", "#1f2937", "#374151"],
    recommendedFor: "Applying via Workday, Greenhouse, Taleo, Lever, and corporate portals.",
  },
  {
    id: "student",
    name: "Student & Fresher",
    category: "General",
    description: "Spotlights education, academic projects, coursework, and campus leadership before work history.",
    isPro: false,
    accentColors: ["#2563eb", "#0d9488", "#d97706", "#4f46e5"],
    recommendedFor: "College students, new university graduates, and early-career applicants.",
  },
  {
    id: "tech",
    name: "Software Developer",
    category: "Tech",
    description: "Engineered for coders: prominent GitHub/portfolio links, categorized tech stack pills, and project metrics.",
    badge: "Developer Pick",
    isPro: true,
    accentColors: ["#0284c7", "#10b981", "#6366f1", "#0f172a"],
    recommendedFor: "Full-stack Engineers, DevOps, Data Scientists, and Mobile Developers.",
  },
  {
    id: "creative",
    name: "Creative Designer",
    category: "Creative",
    description: "Bold visual hierarchy, tasteful accent sidebars, typography contrast, and portfolio link highlights.",
    isPro: true,
    accentColors: ["#e11d48", "#8b5cf6", "#ea580c", "#0284c7"],
    recommendedFor: "UI/UX Designers, Brand Artists, Content Creators, and Art Directors.",
  },
  {
    id: "executive",
    name: "Executive Leader",
    category: "Executive",
    description: "Sophisticated corporate styling with high-impact executive summary and milestone achievements.",
    isPro: true,
    accentColors: ["#0f172a", "#155e75", "#334155", "#854d0e"],
    recommendedFor: "Directors, VPs, CTOs, CEOs, and Senior Management candidates.",
  },
];

export interface PortfolioTemplateMeta {
  id: PortfolioTemplateId;
  name: string;
  description: string;
  badge?: string;
  isPro?: boolean;
  accentColors: string[];
  bestFor: string;
}

export const PORTFOLIO_TEMPLATES: PortfolioTemplateMeta[] = [
  {
    id: "developer",
    name: "Developer Showcase",
    description: "Terminal aesthetics, code accents, live project links, GitHub cards, and interactive skill tags.",
    badge: "Tech Favorite",
    isPro: false,
    accentColors: ["#6366f1", "#06b6d4", "#10b981", "#3b82f6"],
    bestFor: "Software Engineers, Open-Source Contributors, and Tech Leads.",
  },
  {
    id: "designer",
    name: "Design Portfolio",
    description: "Visual-first card layout, bold typography, image galleries, and process storytelling.",
    badge: "Pro",
    isPro: true,
    accentColors: ["#ec4899", "#8b5cf6", "#f43f5e", "#06b6d4"],
    bestFor: "UI/UX Designers, Illustrators, Motion Designers, and Creatives.",
  },
  {
    id: "student",
    name: "Academic & Fresher",
    description: "Clean, structured portfolio focusing on education, coursework, capstone projects, and certifications.",
    isPro: false,
    accentColors: ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"],
    bestFor: "Students, bootcamp graduates, and entry-level talent.",
  },
  {
    id: "professional",
    name: "Executive & Consultant",
    description: "Sleek, authoritative aesthetic with case study highlights, career milestones, and client contact CTA.",
    badge: "Pro",
    isPro: true,
    accentColors: ["#0f172a", "#1e3a8a", "#0f766e", "#374151"],
    bestFor: "Independent Consultants, Executives, Strategists, and Freelancers.",
  },
];
