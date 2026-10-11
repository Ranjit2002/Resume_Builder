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
    allowedResumeTemplates: [
      "student",
      "fresher",
      "internship",
      "graduate",
      "career-change",
      "business-analyst",
      "business-development",
      "operations-manager",
      "social-media-manager",
      "sales-executive",
      "graphic-designer",
      "data-analyst",
      "cybersecurity-analyst",
      "it-support",
      "accountant",
      "customer-service",
      "content-writer",
      "teacher",
      "mechanical-engineer",
      "hr-recruiter",
      "classic",
      "modern",
      "ats",
    ],
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
      "student",
      "fresher",
      "internship",
      "graduate",
      "career-change",
      "business-analyst",
      "project-manager",
      "product-manager",
      "business-development",
      "operations-manager",
      "digital-marketing",
      "social-media-manager",
      "sales-executive",
      "ui-ux-designer",
      "graphic-designer",
      "data-analyst",
      "data-scientist",
      "ai-ml-engineer",
      "cybersecurity-analyst",
      "it-support",
      "accountant",
      "financial-analyst",
      "human-resources",
      "customer-service",
      "content-writer",
      "healthcare-professional",
      "teacher",
      "mechanical-engineer",
      "hr-recruiter",
      "executive",
      "classic",
      "modern",
      "tech",
      "creative",
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
      "20 Free profession-specific templates",
      "Standard PDF download (clean single/multi-page)",
      "Instant shareable portfolio URL",
      "Custom typography & color palettes",
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
      "All 30 professional resume templates (including 10 Premium)",
      "All 4 designer portfolio themes",
      "AI-Powered bullet & summary rewrite",
      "High-res vector PDF export (unlimited, no watermark)",
      "Custom branding & advanced color palettes",
      "Priority email support",
    ],
    ctaText: "Upgrade to Pro",
  },
];
