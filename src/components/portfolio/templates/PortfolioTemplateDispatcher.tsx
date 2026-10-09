"use client";

import React from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { DeveloperPortfolioTemplate } from "./DeveloperPortfolioTemplate";
import { DesignerPortfolioTemplate } from "./DesignerPortfolioTemplate";
import { StudentPortfolioTemplate } from "./StudentPortfolioTemplate";
import { ProfessionalPortfolioTemplate } from "./ProfessionalPortfolioTemplate";

interface DispatcherProps {
  data: PortfolioData;
  isPublicView?: boolean;
}

export function PortfolioTemplateDispatcher({
  data,
  isPublicView = false,
}: DispatcherProps) {
  const templateId = data.settings?.template || "developer";

  switch (templateId) {
    case "developer":
      return <DeveloperPortfolioTemplate data={data} isPublicView={isPublicView} />;
    case "designer":
      return <DesignerPortfolioTemplate data={data} />;
    case "student":
      return <StudentPortfolioTemplate data={data} />;
    case "professional":
      return <ProfessionalPortfolioTemplate data={data} />;
    default:
      return <DeveloperPortfolioTemplate data={data} isPublicView={isPublicView} />;
  }
}
