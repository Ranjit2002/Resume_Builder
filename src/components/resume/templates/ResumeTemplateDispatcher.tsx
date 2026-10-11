"use client";

import React from "react";
import { ResumeData, ResumeTemplateId } from "@/lib/types/resume";
import { isPaidTemplate } from "@/lib/constants/templates";
import { AtsSingleColumnLayout } from "./AtsSingleColumnLayout";
import { ModernSidebarLayout } from "./ModernSidebarLayout";
import { CreativePortfolioLayout } from "./CreativePortfolioLayout";
import { AcademicEarlyCareerLayout } from "./AcademicEarlyCareerLayout";
import { ExecutiveLeadershipLayout } from "./ExecutiveLeadershipLayout";
import { TechnicalEngineerLayout } from "./TechnicalEngineerLayout";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernMinimalTemplate } from "./ModernMinimalTemplate";
import { AtsTemplate } from "./AtsTemplate";
import { StudentFresherTemplate } from "./StudentFresherTemplate";
import { TechDeveloperTemplate } from "./TechDeveloperTemplate";
import { CreativeDesignerTemplate } from "./CreativeDesignerTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { cn } from "@/lib/utils/cn";

interface DispatcherProps {
  data: ResumeData;
  scale?: number;
  userPlan?: string;
}

export function ResumeTemplateDispatcher({
  data,
  scale = 1,
  userPlan = "free",
}: DispatcherProps) {
  const templateId = (data.settings?.template || "classic") as ResumeTemplateId;
  const fontFamily = data.settings?.fontFamily || "sans";
  const spacing = data.settings?.spacing || "normal";

  const isPaid = isPaidTemplate(templateId);
  const isWatermarked = isPaid && userPlan !== "pro";

  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
    outfit: "font-sans",
    inter: "font-sans",
  }[fontFamily];

  const spacingClass = {
    compact: "[&_section:not(:last-child)]:mb-2.5 [&_section:last-child]:mb-0 [&_ul]:space-y-0.5 leading-tight",
    normal: "[&_section:not(:last-child)]:mb-4 [&_section:last-child]:mb-0 [&_ul]:space-y-1 leading-normal",
    relaxed: "[&_section:not(:last-child)]:mb-6 [&_section:last-child]:mb-0 [&_ul]:space-y-1.5 leading-relaxed",
  }[spacing];

  const renderSelectedTemplate = () => {
    switch (templateId) {
      // ==========================================
      // Category A: Students and Early Careers
      // ==========================================
      case "student":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Student Resume" objectiveHeading="Academic Objective" />;
      case "fresher":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Fresher Resume" objectiveHeading="Career Objective" />;
      case "internship":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Internship Resume" objectiveHeading="Internship Objective" />;
      case "graduate":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Graduate Resume" objectiveHeading="Professional Summary" />;
      case "career-change":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Career Transition" objectiveHeading="Transferable Skills Summary" />;

      // ==========================================
      // Category B: Business and Management
      // ==========================================
      case "business-analyst":
        return <AtsSingleColumnLayout data={data} badgeTitle="Business Analyst" />;
      case "project-manager":
        return <ModernSidebarLayout data={data} badgeTitle="Project Delivery & PMP" />;
      case "product-manager":
        return <ModernSidebarLayout data={data} badgeTitle="Product Strategy & Roadmap" />;
      case "business-development":
        return <ModernSidebarLayout data={data} badgeTitle="Business Development & Growth" />;
      case "operations-manager":
        return <ModernSidebarLayout data={data} badgeTitle="Operations & Process Excellence" />;

      // ==========================================
      // Category C: Marketing and Creative Careers
      // ==========================================
      case "digital-marketing":
        return <CreativePortfolioLayout data={data} badgeTitle="Digital Marketing & Performance" />;
      case "social-media-manager":
        return <CreativePortfolioLayout data={data} badgeTitle="Social Media Strategy" />;
      case "sales-executive":
        return <ModernSidebarLayout data={data} badgeTitle="Enterprise Sales Executive" />;
      case "ui-ux-designer":
        return <CreativePortfolioLayout data={data} badgeTitle="UI/UX & Product Design" />;
      case "graphic-designer":
        return <CreativePortfolioLayout data={data} badgeTitle="Brand & Graphic Design" />;

      // ==========================================
      // Category D: Data, AI, and Technical Careers
      // ==========================================
      case "data-analyst":
        return <AtsSingleColumnLayout data={data} badgeTitle="Data & BI Analyst" />;
      case "data-scientist":
        return <TechnicalEngineerLayout data={data} badgeTitle="Data Science & Modeling" />;
      case "ai-ml-engineer":
        return <TechnicalEngineerLayout data={data} badgeTitle="AI & Machine Learning" />;
      case "cybersecurity-analyst":
        return <AtsSingleColumnLayout data={data} badgeTitle="Cybersecurity & SOC Operations" />;
      case "it-support":
        return <AtsSingleColumnLayout data={data} badgeTitle="IT Systems & Technical Support" />;

      // ==========================================
      // Category E: Finance and Professional Services
      // ==========================================
      case "accountant":
        return <AtsSingleColumnLayout data={data} badgeTitle="Corporate Accounting & Compliance" />;
      case "financial-analyst":
        return <ExecutiveLeadershipLayout data={data} badgeTitle="Financial Analysis & FP&A" summaryTitle="Financial Analyst Profile" />;
      case "human-resources":
        return <ModernSidebarLayout data={data} badgeTitle="Human Resources & People Ops" />;
      case "customer-service":
        return <ModernSidebarLayout data={data} badgeTitle="Customer Success & Support" />;
      case "content-writer":
        return <CreativePortfolioLayout data={data} badgeTitle="Content Strategy & Writing" />;

      // ==========================================
      // Category F: Other Important Professional Careers
      // ==========================================
      case "healthcare-professional":
        return <ExecutiveLeadershipLayout data={data} badgeTitle="Clinical Healthcare & Nursing" summaryTitle="Clinical Practice Summary" />;
      case "teacher":
        return <AcademicEarlyCareerLayout data={data} badgeTitle="Educator & Teacher" objectiveHeading="Teaching Philosophy" />;
      case "mechanical-engineer":
        return <AtsSingleColumnLayout data={data} badgeTitle="Mechanical Engineering & CAD" />;
      case "hr-recruiter":
        return <ModernSidebarLayout data={data} badgeTitle="Talent Acquisition & Recruiting" />;
      case "executive":
        return <ExecutiveLeadershipLayout data={data} badgeTitle="Executive Leadership & Strategy" summaryTitle="Executive Value Proposition" />;

      // ==========================================
      // Backwards Compatibility / Legacy Fallbacks
      // ==========================================
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernMinimalTemplate data={data} />;
      case "ats":
        return <AtsTemplate data={data} />;
      case "tech":
        return <TechDeveloperTemplate data={data} />;
      case "creative":
        return <CreativeDesignerTemplate data={data} />;
      default:
        return <AtsSingleColumnLayout data={data} />;
    }
  };

  return (
    <div
      id="resume-document"
      className={cn(
        "bg-white rounded-md shadow-xl border border-slate-200/90 print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:min-w-0 print:max-w-none print:transform-none print:overflow-visible box-border relative overflow-hidden",
        fontClass,
        spacingClass
      )}
      style={{
        width: "794px",
        minWidth: "794px",
        maxWidth: "794px",
        minHeight: "1123px",
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Template Component Output */}
      {renderSelectedTemplate()}

      {/* Watermarked Preview Overlay for Paid Templates when on Free Plan */}
      {isWatermarked && (
        <div
          className="watermark-overlay absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center overflow-hidden select-none print:block"
          style={{
            background:
              "repeating-linear-gradient(-35deg, rgba(203, 213, 225, 0.08), rgba(203, 213, 225, 0.08) 60px, transparent 60px, transparent 120px)",
          }}
        >
          {/* Subtle repeated watermark text across entire document */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-around opacity-15 rotate-[-28deg] scale-125 select-none pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="text-slate-900 font-extrabold text-2xl tracking-widest uppercase p-12 whitespace-nowrap"
              >
                CareerCraft Pro • Preview
              </div>
            ))}
          </div>

          {/* Top floating badge indicating Pro Preview */}
          <div className="absolute top-4 right-4 bg-amber-500/90 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs">
            <span>🔒</span>
            <span>Premium Template Preview</span>
          </div>
        </div>
      )}
    </div>
  );
}
