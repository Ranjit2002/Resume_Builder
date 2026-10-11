"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  RESUME_TEMPLATES,
  PORTFOLIO_TEMPLATES,
  ResumeCategory,
  ResumeTemplateMeta,
} from "@/lib/constants/templates";
import { getSampleResumeForTemplate } from "@/lib/constants/sample-resumes";
import { ResumeTemplateDispatcher } from "@/components/resume/templates/ResumeTemplateDispatcher";
import { UpgradeModal } from "@/components/payment/UpgradeModal";
import { getUserProfile, isUserPro } from "@/lib/store/storage";
import { cn } from "@/lib/utils/cn";
import {
  FileText,
  Globe,
  Search,
  Eye,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  X,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [accessFilter, setAccessFilter] = useState<"all" | "free" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplateMeta | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("Premium Resume Template");
  const [userPlan, setUserPlan] = useState<string>("free");

  // Template preview zoom and responsive fit states
  const previewContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [zoomMode, setZoomMode] = useState<"fit" | "custom">("fit");
  const [customZoom, setCustomZoom] = useState<number>(1);

  // Measure container dimensions for responsive preview
  useEffect(() => {
    if (!previewTemplate) return;

    setZoomMode("fit");

    const updateContainerWidth = () => {
      if (previewContainerRef.current) {
        const clientW = previewContainerRef.current.clientWidth;
        const padding = window.innerWidth < 640 ? 16 : 32;
        const usable = Math.max(160, clientW - padding);
        setContainerWidth(usable);
      }
    };

    updateContainerWidth();
    const rafId = requestAnimationFrame(updateContainerWidth);
    const timer1 = setTimeout(updateContainerWidth, 60);
    const timer2 = setTimeout(updateContainerWidth, 200);

    window.addEventListener("resize", updateContainerWidth);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, [previewTemplate]);

  useEffect(() => {
    const sync = () => {
      const profile = getUserProfile();
      setUserPlan(isUserPro(profile) ? "pro" : "free");
    };
    sync();

    if (typeof window !== "undefined") {
      window.addEventListener("careercraft_user_updated", sync);
      window.addEventListener("storage", sync);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("careercraft_user_updated", sync);
        window.removeEventListener("storage", sync);
      }
    };
  }, []);

  const categories: { id: string; label: string }[] = [
    { id: "all", label: "All Roles (30)" },
    { id: "Students", label: "Students & Early Career (5)" },
    { id: "Business", label: "Business & Management (5)" },
    { id: "Marketing", label: "Marketing & Creative (5)" },
    { id: "Data and AI", label: "Data, AI & Tech (5)" },
    { id: "Finance", label: "Finance & Professional (5)" },
    { id: "Other Professions", label: "Other Professions (5)" },
  ];

  const filteredResumes = RESUME_TEMPLATES.filter((r) => {
    // Category match
    const matchesCategory =
      activeCategory === "all" || r.category === activeCategory;

    // Access match (Free vs Paid)
    const matchesAccess =
      accessFilter === "all" ||
      (accessFilter === "free" && !r.isPro) ||
      (accessFilter === "paid" && r.isPro);

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      r.name.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.recommendedFor.toLowerCase().includes(q);

    return matchesCategory && matchesAccess && matchesSearch;
  });

  const handleUseTemplate = (tmpl: ResumeTemplateMeta) => {
    if (tmpl.isPro && userPlan !== "pro") {
      setUpgradeFeature(`${tmpl.name} (Premium Template)`);
      setUpgradeModalOpen(true);
      return;
    }
    router.push(`/dashboard/resumes/new?template=${tmpl.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge variant="primary" size="md">
            30 In-Demand Career Templates
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Professional Resume Templates for Every Career Stage
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Tailored layouts with industry-tested sections and realistic sample data. Choose from 20 free and 10 premium role-specific designs.
          </p>
        </div>

        {/* Search & Access Filter Bar */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, role, skill, or keywords (e.g. Data Scientist, Nurse, PMP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Access Pills: All / Free (20) / Paid (10) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Tier:
            </span>
            <button
              onClick={() => setAccessFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                accessFilter === "all"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              All (30)
            </button>
            <button
              onClick={() => setAccessFilter("free")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                accessFilter === "free"
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              Free Only (20)
            </button>
            <button
              onClick={() => setAccessFilter("paid")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                accessFilter === "paid"
                  ? "bg-amber-600 text-white"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <Lock className="w-3 h-3" /> Premium Pro (10)
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resumes Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Resume Templates ({filteredResumes.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Showing {filteredResumes.length} of {RESUME_TEMPLATES.length}
            </span>
          </div>

          {filteredResumes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                No matching resume templates found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Try clearing your search query or switching category filters to discover more templates.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory("all");
                  setAccessFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                        {tmpl.category}
                      </span>
                      {tmpl.isPro ? (
                        <Badge variant="pro" size="sm">PREMIUM</Badge>
                      ) : (
                        <Badge variant="default" size="sm">FREE</Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {tmpl.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        {tmpl.role}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {tmpl.description}
                    </p>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Recommended for:{" "}
                      </span>
                      {tmpl.recommendedFor}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    {/* Accent color dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {tmpl.accentColors.map((col, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-700"
                          style={{ backgroundColor: col }}
                          title={`Color ${col}`}
                        />
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewTemplate(tmpl)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        className="text-xs px-2.5"
                      >
                        Preview
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUseTemplate(tmpl)}
                        className="text-xs px-3"
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Templates Section (Preserved) */}
        <div>
          <div className="flex items-center gap-2.5 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Personal Portfolio Themes ({PORTFOLIO_TEMPLATES.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                      Portfolio Theme
                    </span>
                    {tmpl.isPro ? (
                      <Badge variant="pro" size="sm">PREMIUM</Badge>
                    ) : (
                      <Badge variant="default" size="sm">FREE</Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Best for:{" "}
                    </span>
                    {tmpl.bestFor}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {tmpl.accentColors.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                  <Link href={`/dashboard/portfolios/new?template=${tmpl.id}`}>
                    <Button variant="primary" size="sm">
                      Create Portfolio
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Interactive Modal Preview */}
      {previewTemplate && (() => {
        const fitScale =
          containerWidth > 0
            ? Math.min(0.95, Math.max(0.2, containerWidth / 794))
            : 0.85;
        const currentScale = zoomMode === "fit" ? fitScale : customZoom;

        return (
          <Modal
            isOpen={Boolean(previewTemplate)}
            onClose={() => setPreviewTemplate(null)}
            title={`Template Preview: ${previewTemplate.name}`}
            maxWidth="4xl"
          >
            <div className="space-y-3.5">
              {/* Header Box: Fully responsive on mobile, tablet and desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-slate-100 dark:bg-slate-800/90 rounded-2xl w-full min-w-0 border border-slate-200/60 dark:border-slate-700/60">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      {previewTemplate.name}
                    </h4>
                    {previewTemplate.isPro ? (
                      <Badge variant="pro" size="sm">PREMIUM</Badge>
                    ) : (
                      <Badge variant="default" size="sm">FREE</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    Role: {previewTemplate.role} • Category: {previewTemplate.category}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto justify-center text-xs sm:text-sm px-2.5 sm:px-3 py-2 h-9"
                    onClick={() => setPreviewTemplate(null)}
                  >
                    Close Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto justify-center text-xs sm:text-sm px-2.5 sm:px-3 py-2 h-9"
                    onClick={() => {
                      const t = previewTemplate;
                      setPreviewTemplate(null);
                      handleUseTemplate(t);
                    }}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                  >
                    <span className="hidden sm:inline">Customize Template</span>
                    <span className="sm:hidden inline">Customize</span>
                  </Button>
                </div>
              </div>

              {/* View & Zoom Controls: Switch between Full-Fit View and Detailed Zoom */}
              <div className="flex items-center justify-between gap-2 px-1 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-medium min-w-0">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="truncate">
                    {zoomMode === "fit" ? "Whole Resume View (Fit)" : `${Math.round(currentScale * 100)}% Zoom`}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shrink-0">
                  <button
                    type="button"
                    onClick={() => setZoomMode("fit")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1",
                      zoomMode === "fit"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                    title="Fit whole resume to screen width"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Fit Screen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZoomMode("custom");
                      setCustomZoom(1.0);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1",
                      zoomMode === "custom" && customZoom === 1.0
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                    title="View at 100% actual size"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>100%</span>
                  </button>
                  <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => {
                      setZoomMode("custom");
                      setCustomZoom(Math.max(0.25, Number((currentScale - 0.15).toFixed(2))));
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZoomMode("custom");
                      setCustomZoom(Math.min(1.5, Number((currentScale + 0.15).toFixed(2))));
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Document Render Area (Proportionally scaled to show whole resume) */}
              <div
                ref={previewContainerRef}
                className="bg-slate-200/80 dark:bg-slate-950 p-2 sm:p-4 rounded-2xl flex justify-center items-start overflow-auto max-h-[62vh] sm:max-h-[70vh] touch-pan-x touch-pan-y"
              >
                <div
                  style={{
                    width: `${Math.round(794 * currentScale)}px`,
                    height: `${Math.round(1123 * currentScale)}px`,
                    position: "relative",
                    flexShrink: 0,
                    margin: "0 auto",
                    transition: "width 0.15s ease-out, height 0.15s ease-out",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "794px",
                      minHeight: "1123px",
                      transform: `scale(${currentScale})`,
                      transformOrigin: "top left",
                      transition: "transform 0.15s ease-out",
                    }}
                  >
                    <ResumeTemplateDispatcher
                      data={getSampleResumeForTemplate(previewTemplate.id)}
                      scale={1}
                      userPlan={userPlan}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Tip */}
              <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 sm:hidden">
                💡 Tip: Tap <span className="font-semibold text-slate-700 dark:text-slate-300">100%</span> to read up close, or <span className="font-semibold text-slate-700 dark:text-slate-300">Fit Screen</span> to see the full page.
              </p>
            </div>
          </Modal>
        );
      })()}

      {/* Upgrade / Payment Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName={upgradeFeature}
      />

      <Footer />
    </div>
  );
}
