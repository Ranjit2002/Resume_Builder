import { PlanLimits, PlanType } from "../types/subscription";

export interface PricingPlan {
  id: PlanType;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  currencySymbol: string;
  popular?: boolean;
  limits: PlanLimits;
  features: string[];
  ctaText: string;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxResumes: 2,
    maxPortfolios: 1,
    allowedResumeTemplates: ["classic", "modern", "student", "ats"],
    allowedPortfolioTemplates: ["developer", "student"],
    hasAiWriting: false,
    hasCustomBranding: false,
    hasAnalytics: false,
    hasPriorityExport: false,
  },
  pro: {
    maxResumes: 25,
    maxPortfolios: 10,
    allowedResumeTemplates: [
      "classic",
      "modern",
      "student",
      "tech",
      "creative",
      "executive",
      "ats",
    ],
    allowedPortfolioTemplates: [
      "developer",
      "designer",
      "student",
      "professional",
    ],
    hasAiWriting: true,
    hasCustomBranding: true,
    hasAnalytics: true,
    hasPriorityExport: true,
  },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    tagline: "Essential tools for students and first-time job seekers",
    priceMonthly: 0,
    priceYearly: 0,
    currency: "USD",
    currencySymbol: "$",
    limits: PLAN_LIMITS.free,
    features: [
      "Up to 2 active resumes",
      "1 public portfolio website",
      "4 core resume templates (including ATS)",
      "Standard PDF download",
      "Instant shareable portfolio URL",
      "Standard typography & color options",
    ],
    ctaText: "Get Started Free",
  },
  {
    id: "pro",
    name: "Pro Career",
    tagline: "For ambitious professionals and career transitions",
    priceMonthly: 12,
    priceYearly: 96,
    currency: "USD",
    currencySymbol: "$",
    popular: true,
    limits: PLAN_LIMITS.pro,
    features: [
      "Up to 25 resumes with versioning",
      "Up to 10 published portfolios",
      "All 7 premium resume templates",
      "All 4 designer portfolio themes",
      "AI-Powered bullet & summary rewrite",
      "High-res vector PDF export (unlimited)",
      "Custom branding & advanced color palettes",
      "SEO optimization for portfolio profiles",
      "Priority email support",
    ],
    ctaText: "Upgrade to Pro",
  },
];
