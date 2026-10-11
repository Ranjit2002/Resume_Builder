import { ResumeTemplateId } from "../types/resume";
import { PortfolioTemplateId } from "../types/portfolio";

export type ResumeCategory =
  | "Students"
  | "Business"
  | "Marketing"
  | "Data and AI"
  | "Finance"
  | "Other Professions";

export type ResumeLayoutStyle =
  | "ats"
  | "modern-sidebar"
  | "creative"
  | "executive"
  | "academic"
  | "tech";

export interface ResumeTemplateMeta {
  id: ResumeTemplateId;
  name: string;
  role: string;
  category: ResumeCategory;
  description: string;
  badge?: string;
  isPro: boolean;
  accentColors: string[];
  recommendedFor: string;
  layoutStyle: ResumeLayoutStyle;
}

export const PAID_TEMPLATE_IDS: ResumeTemplateId[] = [
  // Category B — Business and Management
  "project-manager",
  "product-manager",
  // Category C — Marketing and Creative Careers
  "digital-marketing",
  "ui-ux-designer",
  // Category D — Data, AI, and Technical Careers
  "data-scientist",
  "ai-ml-engineer",
  // Category E — Finance and Professional Services
  "financial-analyst",
  "human-resources",
  // Category F — Other Important Professional Careers
  "healthcare-professional",
  "executive",
];

export function isPaidTemplate(id: ResumeTemplateId): boolean {
  return PAID_TEMPLATE_IDS.includes(id);
}

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  // ==========================================
  // Category A: Students and Early Careers (5 Templates - ALL FREE)
  // ==========================================
  {
    id: "student",
    name: "Student Resume",
    role: "College & University Student",
    category: "Students",
    description: "Spotlights education, coursework, academic achievements, technical skills, and campus projects.",
    badge: "Student Favorite",
    isPro: false,
    accentColors: ["#2563eb", "#0d9488", "#d97706", "#4f46e5"],
    recommendedFor: "Undergraduate and graduate students seeking campus placements, research, or first jobs.",
    layoutStyle: "academic",
  },
  {
    id: "fresher",
    name: "Fresher Resume",
    role: "Entry-Level Job Seeker",
    category: "Students",
    description: "Features clear career objectives, academic credentials, skills, internships, and key achievements.",
    badge: "Entry Level",
    isPro: false,
    accentColors: ["#4f46e5", "#0284c7", "#059669", "#7c3aed"],
    recommendedFor: "Recent college graduates and entry-level applicants entering the professional workforce.",
    layoutStyle: "academic",
  },
  {
    id: "internship",
    name: "Internship Resume",
    role: "Internship Candidate",
    category: "Students",
    description: "Focuses on relevant coursework, practical academic projects, technical skills, and internship objectives.",
    badge: "Internship Ready",
    isPro: false,
    accentColors: ["#0284c7", "#2563eb", "#059669", "#0f172a"],
    recommendedFor: "Students applying for summer internships, co-ops, research fellowships, and trainee roles.",
    layoutStyle: "academic",
  },
  {
    id: "graduate",
    name: "Graduate Resume",
    role: "Master's & Degree Graduate",
    category: "Students",
    description: "Emphasizes degree honors, academic performance, capstone thesis, certifications, and initial experience.",
    badge: "Degree Honors",
    isPro: false,
    accentColors: ["#0f766e", "#1e40af", "#475569", "#d97706"],
    recommendedFor: "Bachelor's and Master's degree holders with academic research, thesis projects, and certifications.",
    layoutStyle: "academic",
  },
  {
    id: "career-change",
    name: "Career Change Resume",
    role: "Career Transitioner",
    category: "Students",
    description: "Highlights transferable skills, cross-industry achievements, professional summary, and adaptable background.",
    badge: "Pivot Friendly",
    isPro: false,
    accentColors: ["#7c3aed", "#2563eb", "#059669", "#dc2626"],
    recommendedFor: "Professionals transitioning into new industries or functional domains utilizing transferable skills.",
    layoutStyle: "academic",
  },

  // ==========================================
  // Category B: Business and Management (5 Templates - 2 PAID, 3 FREE)
  // ==========================================
  {
    id: "business-analyst",
    name: "Business Analyst Resume",
    role: "Business Analyst",
    category: "Business",
    description: "Focuses on business requirements, stakeholder analysis, reporting tools, and measurable project outcomes.",
    badge: "ATS Clean",
    isPro: false,
    accentColors: ["#0f766e", "#1e293b", "#0284c7", "#4338ca"],
    recommendedFor: "Business analysts, systems analysts, requirements engineers, and strategy consultants.",
    layoutStyle: "ats",
  },
  {
    id: "project-manager",
    name: "Project Manager Resume",
    role: "Project Manager",
    category: "Business",
    description: "Highlights end-to-end project delivery, scheduling, budgets, risk management, and cross-functional leadership.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#1e40af", "#0f172a", "#059669", "#b45309"],
    recommendedFor: "PMP-certified PMs, Scrum Masters, delivery managers, and technical project directors.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "product-manager",
    name: "Product Manager Resume",
    role: "Product Manager",
    category: "Business",
    description: "Emphasizes product strategy, roadmaps, customer research, feature launches, and ARR/engagement growth.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#4f46e5", "#0284c7", "#10b981", "#7c3aed"],
    recommendedFor: "Associate to Senior Product Managers, Group PMs, and technical product innovators.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "business-development",
    name: "Business Development Resume",
    role: "Business Development Manager",
    category: "Business",
    description: "Demonstrates sales pipeline growth, lead generation, client partnerships, negotiations, and revenue targets.",
    badge: "Revenue Driver",
    isPro: false,
    accentColors: ["#059669", "#1e3a8a", "#0284c7", "#d97706"],
    recommendedFor: "BD managers, strategic alliance leads, enterprise partnership directors, and growth specialists.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "operations-manager",
    name: "Operations Manager Resume",
    role: "Operations Manager",
    category: "Business",
    description: "Spotlights continuous process improvement, operational efficiency, Lean/Six Sigma, and cost reductions.",
    badge: "Lean & Agile",
    isPro: false,
    accentColors: ["#334155", "#0f766e", "#1e40af", "#0284c7"],
    recommendedFor: "COO candidates, operations supervisors, supply chain leaders, and logistics directors.",
    layoutStyle: "modern-sidebar",
  },

  // ==========================================
  // Category C: Marketing and Creative Careers (5 Templates - 2 PAID, 3 FREE)
  // ==========================================
  {
    id: "digital-marketing",
    name: "Digital Marketing Resume",
    role: "Digital Marketing Specialist",
    category: "Marketing",
    description: "Showcases SEO, SEM, paid performance campaigns, ROAS, analytics dashboards, and funnel optimization.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#ea580c", "#4f46e5", "#0284c7", "#16a34a"],
    recommendedFor: "Growth marketers, performance advertising leads, SEO managers, and paid acquisition specialists.",
    layoutStyle: "creative",
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager Resume",
    role: "Social Media Manager",
    category: "Marketing",
    description: "Highlights content strategy, viral campaigns, community engagement, audience growth, and multi-channel metrics.",
    badge: "High Engagement",
    isPro: false,
    accentColors: ["#db2777", "#8b5cf6", "#0284c7", "#f59e0b"],
    recommendedFor: "Social media leads, community managers, influencer relations leads, and content strategists.",
    layoutStyle: "creative",
  },
  {
    id: "sales-executive",
    name: "Sales Executive Resume",
    role: "Sales Executive / Account Executive",
    category: "Marketing",
    description: "Focuses on sales quota overachievement, deal conversion rates, CRM management, and territory revenue growth.",
    badge: "Quota Crusher",
    isPro: false,
    accentColors: ["#059669", "#1e40af", "#d97706", "#0f172a"],
    recommendedFor: "Account executives, B2B sales consultants, territory managers, and enterprise closing reps.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer Resume",
    role: "UI/UX & Product Designer",
    category: "Marketing",
    description: "Spotlights user research, wireframes, prototypes, design systems, case studies, and live portfolio links.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#e11d48", "#8b5cf6", "#0284c7", "#10b981"],
    recommendedFor: "Product designers, interaction architects, UI/UX researchers, and design system creators.",
    layoutStyle: "creative",
  },
  {
    id: "graphic-designer",
    name: "Graphic Designer Resume",
    role: "Graphic & Brand Designer",
    category: "Marketing",
    description: "Features visual design tools, branding identity campaigns, visual communication, and creative portfolio showcases.",
    badge: "Visual Showcase",
    isPro: false,
    accentColors: ["#8b5cf6", "#ec4899", "#f97316", "#0284c7"],
    recommendedFor: "Graphic artists, brand visual designers, marketing illustrators, and multimedia creators.",
    layoutStyle: "creative",
  },

  // ==========================================
  // Category D: Data, AI, and Technical Careers (5 Templates - 2 PAID, 3 FREE)
  // ==========================================
  {
    id: "data-analyst",
    name: "Data Analyst Resume",
    role: "Data Analyst",
    category: "Data and AI",
    description: "Emphasizes SQL queries, Excel modeling, Python, PowerBI/Tableau dashboards, and data-driven business decisions.",
    badge: "ATS Clean",
    isPro: false,
    accentColors: ["#0284c7", "#0f766e", "#1e293b", "#4f46e5"],
    recommendedFor: "Data analysts, BI specialists, analytics engineers, and quantitative reporting analysts.",
    layoutStyle: "ats",
  },
  {
    id: "data-scientist",
    name: "Data Scientist Resume",
    role: "Data Scientist",
    category: "Data and AI",
    description: "Highlights statistical modeling, predictive algorithms, machine learning pipelines, and experimentation metrics.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#0f766e", "#4f46e5", "#0284c7", "#0f172a"],
    recommendedFor: "Data scientists, machine learning practitioners, statistical modelers, and quantitative researchers.",
    layoutStyle: "tech",
  },
  {
    id: "ai-ml-engineer",
    name: "AI and Machine Learning Resume",
    role: "AI / ML Engineer",
    category: "Data and AI",
    description: "Focuses on deep learning architectures, LLMs, transformer models, PyTorch, MLOps, and model deployment.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#6366f1", "#0284c7", "#10b981", "#0f172a"],
    recommendedFor: "Machine learning engineers, AI researchers, LLM application engineers, and computer vision specialists.",
    layoutStyle: "tech",
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst Resume",
    role: "Cybersecurity Analyst",
    category: "Data and AI",
    description: "Demonstrates SIEM monitoring, threat intelligence, vulnerability mitigation, incident response, and security certs.",
    badge: "SecOps Focus",
    isPro: false,
    accentColors: ["#0f172a", "#0284c7", "#dc2626", "#059669"],
    recommendedFor: "SOC analysts, information security engineers, penetration testers, and compliance auditors.",
    layoutStyle: "ats",
  },
  {
    id: "it-support",
    name: "IT Support Resume",
    role: "IT Support Specialist",
    category: "Data and AI",
    description: "Spotlights hardware/software troubleshooting, OS administration, network maintenance, and helpdesk SLA achievements.",
    badge: "Helpdesk Pro",
    isPro: false,
    accentColors: ["#1e3a8a", "#0284c7", "#059669", "#475569"],
    recommendedFor: "Desktop support technicians, systems administrators, IT support specialists, and field engineers.",
    layoutStyle: "ats",
  },

  // ==========================================
  // Category E: Finance and Professional Services (5 Templates - 2 PAID, 3 FREE)
  // ==========================================
  {
    id: "accountant",
    name: "Accountant Resume",
    role: "Staff / Senior Accountant",
    category: "Finance",
    description: "Features financial statements, general ledger accounting, tax compliance, auditing, and QuickBooks/SAP mastery.",
    badge: "GAAP Compliant",
    isPro: false,
    accentColors: ["#1e293b", "#0f766e", "#1e40af", "#475569"],
    recommendedFor: "Certified public accountants (CPA), corporate accountants, auditors, and bookkeeping managers.",
    layoutStyle: "ats",
  },
  {
    id: "financial-analyst",
    name: "Financial Analyst Resume",
    role: "Financial Analyst",
    category: "Finance",
    description: "Highlights DCF modeling, budgeting, financial forecasting, valuation analysis, and executive investor presentations.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#0f766e", "#1e40af", "#854d0e", "#0f172a"],
    recommendedFor: "FP&A analysts, investment banking associates, corporate financial planners, and equity research analysts.",
    layoutStyle: "executive",
  },
  {
    id: "human-resources",
    name: "Human Resources Resume",
    role: "HR Generalist / HR Manager",
    category: "Finance",
    description: "Spotlights full-cycle talent acquisition, employee relations, onboarding, compliance, and HRIS systems.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#4f46e5", "#0284c7", "#059669", "#7c3aed"],
    recommendedFor: "HR business partners, talent managers, people operations directors, and employee experience leads.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "customer-service",
    name: "Customer Service Resume",
    role: "Customer Support Specialist",
    category: "Finance",
    description: "Focuses on exceptional CSAT scores, dispute resolution, omnichannel ticketing, and high-volume customer retention.",
    badge: "High CSAT",
    isPro: false,
    accentColors: ["#0284c7", "#059669", "#f59e0b", "#4f46e5"],
    recommendedFor: "Customer success representatives, client support specialists, and contact center team leads.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "content-writer",
    name: "Content Writer Resume",
    role: "Content Writer & Copywriter",
    category: "Finance",
    description: "Emphasizes published articles, SEO copywriting, editorial strategy, content marketing, and online portfolio links.",
    badge: "Wordsmith",
    isPro: false,
    accentColors: ["#7c3aed", "#2563eb", "#ea580c", "#059669"],
    recommendedFor: "Content strategists, technical writers, blog copywriters, and communications specialists.",
    layoutStyle: "creative",
  },

  // ==========================================
  // Category F: Other Important Professional Careers (5 Templates - 2 PAID, 3 FREE)
  // ==========================================
  {
    id: "healthcare-professional",
    name: "Healthcare Professional Resume",
    role: "Registered Nurse / Clinical Professional",
    category: "Other Professions",
    description: "Spotlights clinical healthcare experience, state licensure/certifications (RN, BLS, ACLS), and patient care protocols.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#0f766e", "#0284c7", "#1e3a8a", "#059669"],
    recommendedFor: "Registered nurses, clinical coordinators, physician assistants, and allied healthcare practitioners.",
    layoutStyle: "executive",
  },
  {
    id: "teacher",
    name: "Teacher Resume",
    role: "Educator / School Teacher",
    category: "Other Professions",
    description: "Highlights pedagogical training, state teaching credentials, classroom management, and curriculum innovation.",
    badge: "Educator Pick",
    isPro: false,
    accentColors: ["#2563eb", "#059669", "#d97706", "#7c3aed"],
    recommendedFor: "Primary and secondary school educators, subject teachers, tutors, and instructional coordinators.",
    layoutStyle: "academic",
  },
  {
    id: "mechanical-engineer",
    name: "Mechanical Engineer Resume",
    role: "Mechanical Design Engineer",
    category: "Other Professions",
    description: "Features CAD/FEA design tools (SolidWorks, AutoCAD), prototyping, thermal systems, and manufacturing standards.",
    badge: "Engineering Spec",
    isPro: false,
    accentColors: ["#334155", "#0284c7", "#b45309", "#0f172a"],
    recommendedFor: "Mechanical design engineers, product development engineers, and CAD/CAM specialists.",
    layoutStyle: "ats",
  },
  {
    id: "hr-recruiter",
    name: "HR Recruiter Resume",
    role: "Talent Acquisition Specialist",
    category: "Other Professions",
    description: "Demonstrates candidate sourcing, LinkedIn Recruiter mastery, time-to-fill reduction, and high offer acceptance rates.",
    badge: "Talent Sourcing",
    isPro: false,
    accentColors: ["#4f46e5", "#059669", "#0284c7", "#f59e0b"],
    recommendedFor: "Corporate recruiters, technical sourcing specialists, and talent acquisition partners.",
    layoutStyle: "modern-sidebar",
  },
  {
    id: "executive",
    name: "Executive Resume",
    role: "C-Level Executive / VP",
    category: "Other Professions",
    description: "Sophisticated executive design showcasing P&L ownership, corporate governance, strategic turnarounds, and scaling.",
    badge: "Premium Pro",
    isPro: true, // PAID
    accentColors: ["#0f172a", "#155e75", "#334155", "#854d0e"],
    recommendedFor: "CEOs, CTOs, CFOs, Managing Directors, VPs, and senior corporate leadership candidates.",
    layoutStyle: "executive",
  },
];

export function getTemplateMeta(id: ResumeTemplateId): ResumeTemplateMeta {
  // Direct match
  const found = RESUME_TEMPLATES.find((t) => t.id === id);
  if (found) return found;

  // Legacy fallback mapping
  if (id === "classic") return RESUME_TEMPLATES.find((t) => t.id === "business-analyst")!;
  if (id === "modern") return RESUME_TEMPLATES.find((t) => t.id === "fresher")!;
  if (id === "tech") return RESUME_TEMPLATES.find((t) => t.id === "ai-ml-engineer")!;
  if (id === "creative") return RESUME_TEMPLATES.find((t) => t.id === "ui-ux-designer")!;
  if (id === "ats") return RESUME_TEMPLATES.find((t) => t.id === "data-analyst")!;

  return RESUME_TEMPLATES[0];
}

// Portfolio templates metadata preserved
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
