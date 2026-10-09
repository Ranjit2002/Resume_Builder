import { Education, WorkExperience, CertificationItem } from "./resume";

export type PortfolioTemplateId =
  | "developer"
  | "designer"
  | "student"
  | "professional";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface PortfolioSettings {
  template: PortfolioTemplateId;
  accentColor: string;
  themeMode: "light" | "dark" | "system";
  fontFamily: "sans" | "serif" | "mono" | "outfit";
  showResumeDownload: boolean;
  linkedResumeId?: string;
  customResumeUrl?: string;
}

export interface PortfolioData {
  id: string;
  userId?: string;
  title: string;
  slug: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Content
  fullName: string;
  headline: string;
  about: string;
  location: string;
  avatarUrl?: string;
  heroBadge?: string;
  
  // Socials
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  
  // Sections
  skills: string[];
  projects: PortfolioProject[];
  experiences: WorkExperience[];
  education: Education[];
  certifications: CertificationItem[];
  
  // Contact
  availabilityStatus?: string; // e.g. "Available for freelance & full-time roles"
  
  // SEO & Customization
  seoTitle?: string;
  seoDescription?: string;
  settings: PortfolioSettings;
}
