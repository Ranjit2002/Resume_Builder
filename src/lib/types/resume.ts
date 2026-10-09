export type ResumeTemplateId =
  | "classic"
  | "modern"
  | "student"
  | "tech"
  | "creative"
  | "executive"
  | "ats";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  photoUrl?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g. "Languages", "Frameworks & Tools", "Soft Skills"
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Proficient" | "Intermediate" | "Basic";
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface ResumeSettings {
  template: ResumeTemplateId;
  accentColor: string;
  fontFamily: "sans" | "serif" | "mono" | "outfit" | "inter";
  fontSize: "sm" | "base" | "lg";
  spacing: "compact" | "normal" | "relaxed";
  showPhoto: boolean;
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface ResumeData {
  id: string;
  userId?: string;
  title: string;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: WorkExperience[];
  education: Education[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
  volunteer: VolunteerItem[];
  settings: ResumeSettings;
}

export interface ResumeScoreReport {
  score: number;
  grade: "Needs Work" | "Good" | "Strong" | "Excellent" | "All-Star";
  completedItems: string[];
  suggestions: {
    title: string;
    description: string;
    points: number;
    sectionKey: string;
  }[];
}
