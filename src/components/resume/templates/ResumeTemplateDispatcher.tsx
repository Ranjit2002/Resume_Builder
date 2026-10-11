"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
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
}

export function ResumeTemplateDispatcher({ data, scale = 1 }: DispatcherProps) {
  const templateId = data.settings?.template || "classic";
  const fontFamily = data.settings?.fontFamily || "sans";
  const spacing = data.settings?.spacing || "normal";

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
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernMinimalTemplate data={data} />;
      case "ats":
        return <AtsTemplate data={data} />;
      case "student":
        return <StudentFresherTemplate data={data} />;
      case "tech":
        return <TechDeveloperTemplate data={data} />;
      case "creative":
        return <CreativeDesignerTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div
      id="resume-document"
      className={cn(
        "bg-white rounded-md shadow-xl border border-slate-200/90 print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:min-w-0 print:max-w-none print:transform-none print:overflow-visible box-border",
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
      {renderSelectedTemplate()}
    </div>
  );
}
