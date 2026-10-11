"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { ThemeToggle } from "../theme/ThemeToggle";
import confetti from "canvas-confetti";
import { isPaidTemplate, getTemplateMeta } from "@/lib/constants/templates";
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

const MIN_ZOOM = 0.35; // 35% minimum zoom limit prevents document from shrinking excessively
const MAX_ZOOM = 1.6;  // 160% maximum zoom limit ensures crisp readable zoom without DOM distortion

export function ResumeEditor({
  initialResume,
  userPlan = "free",
}: ResumeEditorProps) {
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [previewScale, setPreviewScale] = useState<number>(0.9);
  const [fitScale, setFitScale] = useState<number>(0.9);
  const [docHeight, setDocHeight] = useState<number>(1123);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatusText, setExportStatusText] = useState<string>("");

  const previewPanelRef = useRef<HTMLDivElement>(null);
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef<number>(previewScale);
  const lastTapRef = useRef<number>(0);

  // Keep touchStartScaleRef updated
  useEffect(() => {
    touchStartScaleRef.current = previewScale;
  }, [previewScale]);

  // Dynamically calculate scale so the whole A4 document (794px) fits neatly on screen
  const calculateFitScale = useCallback(() => {
    if (!previewPanelRef.current) return 0.9;
    const containerWidth = previewPanelRef.current.clientWidth;
    // On small screens use minimal horizontal padding (16px), on desktop use 48px
    const padding = containerWidth < 640 ? 16 : 48;
    const availableWidth = Math.max(260, containerWidth - padding);
    const ideal = parseFloat((availableWidth / 794).toFixed(2));
    return Math.min(1.0, Math.max(MIN_ZOOM, ideal));
  }, []);

  const handleResetToFit = useCallback(() => {
    const fit = calculateFitScale();
    setPreviewScale(fit);
  }, [calculateFitScale]);

  // Auto-fit document when switching to preview or when window resizes
  useEffect(() => {
    const updateScale = () => {
      const fit = calculateFitScale();
      setFitScale(fit);
      // Auto-fit on mobile or tablet screens
      if (window.innerWidth < 1024) {
        setPreviewScale(fit);
      }
    };

    const timeout = setTimeout(updateScale, 60);
    window.addEventListener("resize", updateScale);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateScale);
    };
  }, [mobileView, calculateFitScale]);

  // Dynamically measure actual rendered document height so multi-page resumes never clip
  useEffect(() => {
    const docElem = document.getElementById("resume-document");
    if (!docElem) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const measured = Math.round(entry.contentRect.height);
        if (measured > 100) {
          setDocHeight(Math.max(1123, measured));
        }
      }
    });

    observer.observe(docElem);
    return () => observer.disconnect();
  }, [resume]);

  // Double-tap on mobile to toggle between auto-fit and 100% zoom
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Double-tap detected
        setPreviewScale((prev) => (Math.abs(prev - fitScale) < 0.08 ? 1.0 : fitScale));
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = previewScale;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      touchStartDistRef.current = null;
    }
  };

  // Attach non-passive touchmove listener to allow smooth pinch zooming without browser zoom conflict
  useEffect(() => {
    const panel = previewPanelRef.current;
    if (!panel) return;

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchStartDistRef.current !== null) {
        if (e.cancelable) {
          e.preventDefault(); // Prevents browser from zooming entire website
        }
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / touchStartDistRef.current;
        const target = touchStartScaleRef.current * factor;
        const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, parseFloat(target.toFixed(2))));
        setPreviewScale(clamped);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.003;
        setPreviewScale((prev) =>
          Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, parseFloat((prev + delta).toFixed(2))))
        );
      }
    };

    panel.addEventListener("touchmove", onTouchMove, { passive: false });
    panel.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      panel.removeEventListener("touchmove", onTouchMove);
      panel.removeEventListener("wheel", onWheel);
    };
  }, []);

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
    // 1. Verify eligibility for paid templates
    const isPaid = isPaidTemplate(resume.settings?.template);
    if (isPaid && userPlan !== "pro") {
      const meta = getTemplateMeta(resume.settings.template);
      setUpgradeFeature(`${meta.name} (Premium Template)`);
      setUpgradeModalOpen(true);
      return;
    }

    // 2. Server-side verification check
    try {
      const checkRes = await fetch("/api/resumes/export-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: resume.settings?.template,
          userPlan,
        }),
      });
      const checkData = await checkRes.json();
      if (!checkData.allowed) {
        setUpgradeFeature(`${checkData.templateName || "Premium Template"}`);
        setUpgradeModalOpen(true);
        return;
      }
    } catch {
      // In offline / network failure, client verification above protects export
    }

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
      <header className="editor-header print:hidden sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xs gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
          <input
            type="text"
            value={resume.title}
            onChange={(e) =>
              handleUpdate({ ...resume, title: e.target.value })
            }
            className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 min-w-0 w-full sm:w-auto max-w-[120px] xs:max-w-[170px] sm:max-w-md truncate"
            title="Click to rename resume"
          />

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0">
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
              <span className="text-amber-600 dark:text-amber-400 font-medium">Unsaved</span>
            )}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Edit/Preview Toggle */}
          <div className="flex lg:hidden bg-slate-100 dark:bg-slate-800 p-0.5 sm:p-1 rounded-xl shrink-0">
            <button
              onClick={() => setMobileView("edit")}
              className={cn(
                "px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors",
                mobileView === "edit"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="inline">Editor</span>
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={cn(
                "px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors",
                mobileView === "preview"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="inline">Preview</span>
            </button>
          </div>

          {/* Theme Mode Toggle */}
          <ThemeToggle size="sm" />

          <Button
            variant="outline"
            size="sm"
            onClick={triggerPrintDialog}
            className="hidden md:inline-flex"
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleExportPdf}
            isLoading={isExporting}
            className="px-2.5 sm:px-3 text-xs sm:text-sm whitespace-nowrap shrink-0"
            leftIcon={<Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          >
            {isExporting ? (
              <>
                <span className="hidden sm:inline">{exportStatusText || "Exporting..."}</span>
                <span className="sm:hidden">Saving...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
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
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
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
          <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 bg-white dark:bg-slate-900">
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
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
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
          ref={previewPanelRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={cn(
            "editor-preview-panel flex-1 bg-slate-200/70 dark:bg-slate-950/80 p-2 sm:p-6 flex flex-col items-center h-[calc(100vh-65px)] overflow-y-auto overflow-x-auto relative select-none print:bg-white print:p-0 print:m-0 print:h-auto print:overflow-visible print:block print:w-full touch-pan-x touch-pan-y",
            mobileView === "edit" && "hidden lg:flex print:block"
          )}
        >
          {/* Zoom controls float */}
          <div className="zoom-controls print:hidden sticky top-2 z-20 mb-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-300 dark:border-slate-700 shadow-md flex items-center gap-1.5 sm:gap-2 text-xs select-none">
            <button
              onClick={() => setPreviewScale((prev) => Math.max(MIN_ZOOM, parseFloat((prev - 0.1).toFixed(2))))}
              disabled={previewScale <= MIN_ZOOM}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
              title={`Zoom out (Min limit: ${Math.round(MIN_ZOOM * 100)}%)`}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-200 font-bold min-w-10 text-center">
              {Math.round(previewScale * 100)}%
            </span>
            <button
              onClick={() => setPreviewScale((prev) => Math.min(MAX_ZOOM, parseFloat((prev + 0.1).toFixed(2))))}
              disabled={previewScale >= MAX_ZOOM}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
              title={`Zoom in (Max limit: ${Math.round(MAX_ZOOM * 100)}%)`}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700 mx-0.5" />

            <button
              onClick={handleResetToFit}
              className="px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-md transition-colors flex items-center gap-1"
              title="Fit entire resume to screen width"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Fit</span>
            </button>
          </div>

          {/* Render Resume Document */}
          <div className="w-full flex justify-center pb-12 print:block print:p-0 print:m-0 print:w-full">
            <div
              className="resume-preview-wrapper print:!transform-none print:!w-full print:!h-auto print:!m-0 print:!p-0 transition-all duration-75"
              style={{
                width: `${Math.round(794 * previewScale)}px`,
                height: `${Math.round(docHeight * previewScale)}px`,
                position: "relative",
              }}
            >
              <div
                className="resume-scale-wrapper print:!transform-none print:!w-full print:!min-w-0 print:!max-w-none print:!m-0"
                style={{
                  width: "794px",
                  minWidth: "794px",
                  maxWidth: "794px",
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                }}
              >
                <ResumeTemplateDispatcher data={resume} scale={1} userPlan={userPlan} />
              </div>
            </div>
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
