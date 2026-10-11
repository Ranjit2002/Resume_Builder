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
          <div className="flex items-center justify-center gap-2">
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
      {previewTemplate && (
        <Modal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          title={`Template Preview: ${previewTemplate.name}`}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {previewTemplate.name}
                  </h4>
                  {previewTemplate.isPro ? (
                    <Badge variant="pro" size="sm">PREMIUM</Badge>
                  ) : (
                    <Badge variant="default" size="sm">FREE</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Role: {previewTemplate.role} • Category: {previewTemplate.category}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close Preview
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const t = previewTemplate;
                    setPreviewTemplate(null);
                    handleUseTemplate(t);
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Customize This Template
                </Button>
              </div>
            </div>

            {/* Document Render Area (Scaled to fit neatly in modal) */}
            <div className="bg-slate-200/80 dark:bg-slate-950 p-4 rounded-2xl flex justify-center overflow-auto max-h-[70vh]">
              <div
                style={{
                  transform: "scale(0.85)",
                  transformOrigin: "top center",
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
        </Modal>
      )}

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
