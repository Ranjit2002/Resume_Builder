"use client";

import React, { useState, useEffect, useRef } from "react";
import { ResumeData } from "@/lib/types/resume";
import { saveResume } from "@/lib/store/storage";
import { exportResumeToPdf, triggerPrintDialog } from "@/lib/utils/pdf";
import { PersonalInfoForm } from "./SectionForms/PersonalInfoForm";
import { SummaryForm } from "./SectionForms/SummaryForm";
import { ExperienceForm } from "./SectionForms/ExperienceForm";
import { EducationForm } from "./SectionForms/EducationForm";
import { SkillsForm } from "./SectionForms/SkillsForm";
import { ProjectsForm } from "./SectionForms/ProjectsForm";
import { CertificationsForm } from "./SectionForms/CertificationsForm";
import { AwardsLanguagesVolunteerForm } from "./SectionForms/AwardsLanguagesVolunteerForm";
import { ResumeCustomizationForm } from "./SectionForms/ResumeCustomizationForm";
import { ResumeTemplateDispatcher } from "./templates/ResumeTemplateDispatcher";
import { ResumeScore } from "./ResumeScore";
import { AiAssistantModal } from "../ai/AiAssistantModal";
import { UpgradeModal } from "../payment/UpgradeModal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import confetti from "canvas-confetti";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Globe,
  Sliders,
  Download,
  Eye,
  Edit3,
  CheckCircle,
  Save,
  Printer,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ResumeEditorProps {
  initialResume: ResumeData;
  userPlan?: string;
}

export function ResumeEditor({
  initialResume,
  userPlan = "free",
}: ResumeEditorProps) {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [previewScale, setPreviewScale] = useState<number>(0.9);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatusText, setExportStatusText] = useState<string>("");

  // AI Modal state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiContext, setAiContext] = useState<{
    text: string;
    type: "summary" | "bullet" | "skills";
    callback?: (improved: string) => void;
  }>({ text: "", type: "summary" });

  // Upgrade Modal state
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("Pro Resume Templates");

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced Autosave
  const handleUpdate = (updated: ResumeData) => {
    setResume(updated);
    setSaveStatus("unsaved");

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await saveResume(updated);
        setSaveStatus("saved");
      } catch (e) {
        console.error("Autosave failed", e);
        setSaveStatus("unsaved");
      }
    }, 1200);
  };

  const handleManualSave = async () => {
    setSaveStatus("saving");
    await saveResume(resume);
    setSaveStatus("saved");
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportStatusText("Initializing PDF engine...");

    const success = await exportResumeToPdf(
      "resume-document",
      `${resume.personalInfo?.fullName || "resume"}_CV.pdf`,
      (status) => setExportStatusText(status)
    );

    setIsExporting(false);
    setExportStatusText("");

    if (success) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const openAiHelper = (
    text: string,
    type: "summary" | "bullet" | "skills",
    callback?: (improved: string) => void
  ) => {
    setAiContext({ text, type, callback });
    setAiModalOpen(true);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "extras", label: "Extras", icon: Globe },
    { id: "design", label: "Design & Style", icon: Sliders },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-950 print:bg-white print:min-h-0 print:block">
      {/* Editor Top Bar */}
      <header className="editor-header print:hidden sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={resume.title}
            onChange={(e) =>
              handleUpdate({ ...resume, title: e.target.value })
            }
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 max-w-[220px] sm:max-w-md truncate"
            title="Click to rename resume"
          />

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            {saveStatus === "saving" && (
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                <Save className="w-3.5 h-3.5" /> Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Autosaved
              </span>
            )}
            {saveStatus === "unsaved" && (
              <span className="text-amber-600 dark:text-amber-400 font-medium">Unsaved edits</span>
            )}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Edit/Preview Toggle */}
          <div className="flex lg:hidden bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setMobileView("edit")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors",
                mobileView === "edit"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" /> Editor
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors",
                mobileView === "preview"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={triggerPrintDialog}
            className="hidden sm:inline-flex"
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleExportPdf}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4" />}
          >
            {isExporting ? exportStatusText || "Exporting..." : "Download PDF"}
          </Button>
        </div>
      </header>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden print:block print:overflow-visible">
        {/* LEFT PANEL: Form Sections */}
        <section
          className={cn(
            "editor-form-panel print:hidden w-full lg:w-1/2 lg:max-w-2xl bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col h-[calc(100vh-65px)] overflow-hidden",
            mobileView === "preview" && "hidden lg:flex"
          )}
        >
          {/* Resume Score Widget at Top */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <ResumeScore
              resume={resume}
              onSelectSection={(secKey) => {
                if (secKey === "personal") setActiveTab("personal");
                else if (secKey === "summary") setActiveTab("summary");
                else if (secKey === "experiences") setActiveTab("experience");
                else if (secKey === "education") setActiveTab("education");
                else if (secKey === "skills") setActiveTab("skills");
                else if (secKey === "projects") setActiveTab("projects");
                else if (secKey === "certifications") setActiveTab("certifications");
              }}
            />
          </div>

          {/* Section Navigation Tabs (Horizontal Scrollable) */}
          <div className="border-b border-slate-200 px-4 py-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 bg-white">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Tab Body Container */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
            {activeTab === "personal" && (
              <PersonalInfoForm
                data={resume.personalInfo}
                onChange={(personalInfo) =>
                  handleUpdate({ ...resume, personalInfo })
                }
              />
            )}

            {activeTab === "summary" && (
              <SummaryForm
                summary={resume.summary}
                onChange={(summary) => handleUpdate({ ...resume, summary })}
                onOpenAiHelper={(currentText, type) =>
                  openAiHelper(currentText, type, (improved) =>
                    handleUpdate({ ...resume, summary: improved })
                  )
                }
              />
            )}

            {activeTab === "experience" && (
              <ExperienceForm
                experiences={resume.experiences || []}
                onChange={(experiences) =>
                  handleUpdate({ ...resume, experiences })
                }
                onOpenAiHelper={(currentText, type, callback) =>
                  openAiHelper(currentText, type, callback)
                }
              />
            )}

            {activeTab === "education" && (
              <EducationForm
                education={resume.education || []}
                onChange={(education) =>
                  handleUpdate({ ...resume, education })
                }
              />
            )}

            {activeTab === "skills" && (
              <SkillsForm
                categories={resume.skillCategories || []}
                onChange={(skillCategories) =>
                  handleUpdate({ ...resume, skillCategories })
                }
                onOpenAiHelper={() => {
                  fetch("/api/ai/suggest-skills", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      roleTitle: resume.personalInfo.jobTitle,
                    }),
                  })
                    .then((r) => r.json())
                    .then((data) => {
                      if (data.skills) {
                        const newCat = {
                          id: `cat-${Date.now()}`,
                          categoryName: "AI Recommended Skills",
                          skills: data.skills,
                        };
                        handleUpdate({
                          ...resume,
                          skillCategories: [
                            newCat,
                            ...(resume.skillCategories || []),
                          ],
                        });
                      }
                    });
                }}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsForm
                projects={resume.projects || []}
                onChange={(projects) =>
                  handleUpdate({ ...resume, projects })
                }
              />
            )}

            {activeTab === "certifications" && (
              <CertificationsForm
                certifications={resume.certifications || []}
                onChange={(certifications) =>
                  handleUpdate({ ...resume, certifications })
                }
              />
            )}

            {activeTab === "extras" && (
              <AwardsLanguagesVolunteerForm
                awards={resume.awards || []}
                languages={resume.languages || []}
                volunteer={resume.volunteer || []}
                onChangeAwards={(awards) => handleUpdate({ ...resume, awards })}
                onChangeLanguages={(languages) =>
                  handleUpdate({ ...resume, languages })
                }
                onChangeVolunteer={(volunteer) =>
                  handleUpdate({ ...resume, volunteer })
                }
              />
            )}

            {activeTab === "design" && (
              <ResumeCustomizationForm
                settings={resume.settings}
                onChange={(settings) =>
                  handleUpdate({ ...resume, settings })
                }
                userPlan={userPlan}
                onUpgradePrompt={() => {
                  setUpgradeFeature("Pro Resume Templates");
                  setUpgradeModalOpen(true);
                }}
              />
            )}
          </div>
        </section>

        {/* RIGHT PANEL: Live Interactive Preview */}
        <section
          className={cn(
            "editor-preview-panel flex-1 bg-slate-200/70 dark:bg-slate-950/80 p-4 sm:p-8 flex flex-col items-center h-[calc(100vh-65px)] overflow-y-auto relative print:bg-white print:p-0 print:m-0 print:h-auto print:overflow-visible print:block print:w-full",
            mobileView === "edit" && "hidden lg:flex print:block"
          )}
        >
          {/* Zoom controls float */}
          <div className="zoom-controls print:hidden sticky top-2 z-20 mb-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 shadow-md flex items-center gap-2 text-xs">
            <button
              onClick={() => setPreviewScale((prev) => Math.max(0.5, prev - 0.1))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-200 font-bold w-12 text-center">
              {Math.round(previewScale * 100)}%
            </span>
            <button
              onClick={() => setPreviewScale((prev) => Math.min(1.4, prev + 0.1))}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewScale(0.9)}
              className="p-1 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Render Resume Document */}
          <div
            className="transition-all print:max-w-none print:w-full print:m-0 flex justify-center pb-12"
            style={{
              width: `${Math.round(794 * previewScale)}px`,
              minHeight: `${Math.round(1123 * previewScale)}px`,
            }}
          >
            <ResumeTemplateDispatcher data={resume} scale={previewScale} />
          </div>
        </section>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialText={aiContext.text}
        contextType={aiContext.type}
        jobTitle={resume.personalInfo.jobTitle}
        onApply={(improved) => {
          if (aiContext.callback) {
            aiContext.callback(improved);
          } else if (aiContext.type === "summary") {
            handleUpdate({ ...resume, summary: improved });
          }
        }}
      />

      {/* Pro Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName={upgradeFeature}
      />
    </div>
  );
}
