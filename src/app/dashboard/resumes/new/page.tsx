"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveResume, getUserProfile, isUserPro } from "@/lib/store/storage";
import { ResumeData, ResumeTemplateId } from "@/lib/types/resume";
import { getSampleResumeForTemplate } from "@/lib/constants/sample-resumes";
import {
  RESUME_TEMPLATES,
  ResumeCategory,
  isPaidTemplate,
} from "@/lib/constants/templates";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UpgradeModal } from "@/components/payment/UpgradeModal";
import { FileText, ArrowRight, Check, Search, Lock, Sparkles } from "lucide-react";

const CATEGORIES: { id: "All" | ResumeCategory; label: string }[] = [
  { id: "All", label: "All (30)" },
  { id: "Students", label: "Students (5)" },
  { id: "Business", label: "Business (5)" },
  { id: "Marketing", label: "Marketing (5)" },
  { id: "Data and AI", label: "Data & AI (5)" },
  { id: "Finance", label: "Finance (5)" },
  { id: "Other Professions", label: "Other (5)" },
];

function CreateResumeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState("My Professional Resume");
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateId>("student");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ResumeCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [populateSample, setPopulateSample] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [userPlan, setUserPlan] = useState("free");
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("Pro Resume Templates");

  useEffect(() => {
    const syncProfile = () => {
      const profile = getUserProfile();
      setUserPlan(profile.subscription?.plan || "free");
    };
    syncProfile();

    if (typeof window !== "undefined") {
      window.addEventListener("careercraft_user_updated", syncProfile);
      window.addEventListener("storage", syncProfile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("careercraft_user_updated", syncProfile);
        window.removeEventListener("storage", syncProfile);
      }
    };
  }, []);

  // Sync selectedTemplate when URL search param changes
  useEffect(() => {
    setIsCreating(false);
    const tmplParam = searchParams.get("template") as ResumeTemplateId;
    if (tmplParam && RESUME_TEMPLATES.some((t) => t.id === tmplParam)) {
      const match = RESUME_TEMPLATES.find((t) => t.id === tmplParam);
      const profile = getUserProfile();
      const hasPro = isUserPro(profile);

      // If requested template is Pro and user is Free, block auto-selection
      if (match?.isPro && !hasPro) {
        setSelectedTemplate("student");
        setTitle("Student Resume");
        setUpgradeFeature(`${match.name} (Pro Template)`);
        setUpgradeModalOpen(true);
      } else {
        setSelectedTemplate(tmplParam);
        if (match) {
          setTitle(`${match.name}`);
        }
      }
    }
  }, [searchParams]);

  const handleSelectTemplate = (tmplId: ResumeTemplateId) => {
    const match = RESUME_TEMPLATES.find((t) => t.id === tmplId);
    const profile = getUserProfile();
    const hasPro = isUserPro(profile);

    // If template is Pro and user is Free, prompt upgrade and do not grant selection
    if (match?.isPro && !hasPro) {
      setUpgradeFeature(`${match.name} (Pro Template)`);
      setUpgradeModalOpen(true);
      return;
    }

    setSelectedTemplate(tmplId);
    if (match) {
      setTitle(`${match.name}`);
    }
  };

  const handleCreate = async () => {
    if (isCreating) return;

    // Enforce Pro entitlement before creating
    const profile = getUserProfile();
    const hasPro = isUserPro(profile);
    if (isPaidTemplate(selectedTemplate) && !hasPro) {
      const match = RESUME_TEMPLATES.find((t) => t.id === selectedTemplate);
      setUpgradeFeature(`${match?.name || "Premium"} (Pro Template)`);
      setUpgradeModalOpen(true);
      return;
    }

    setIsCreating(true);

    try {
      const newId = `resume-${Date.now()}`;
      const sample = getSampleResumeForTemplate(selectedTemplate);

      const baseData: ResumeData = populateSample
        ? {
            ...sample,
            settings: {
              ...sample.settings,
              template: selectedTemplate,
            },
          }
        : {
            ...sample,
            personalInfo: {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              location: "",
            },
            summary: "",
            experiences: [],
            education: [],
            skillCategories: [],
            projects: [],
            certifications: [],
            awards: [],
            languages: [],
            volunteer: [],
            settings: {
              ...sample.settings,
              template: selectedTemplate,
            },
          };

      const newResume: ResumeData = {
        ...baseData,
        id: newId,
        title: title.trim() || "Untitled Resume",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage immediately (0ms latency)
      await saveResume(newResume);

      // Navigate to the newly created resume editor
      router.push(`/dashboard/resumes/${newId}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setIsCreating(false);
    }
  };

  const filteredTemplates = RESUME_TEMPLATES.filter((tmpl) => {
    const matchesCategory =
      selectedCategory === "All" || tmpl.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedMeta =
    RESUME_TEMPLATES.find((t) => t.id === selectedTemplate) ||
    RESUME_TEMPLATES[0];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Create a New Resume
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pick a specialized career template and begin editing immediately.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          isLoading={isCreating}
          onClick={handleCreate}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shadow-md shadow-indigo-500/20"
        >
          Create Resume & Start Editing
        </Button>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Resume Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Software Engineer Resume"
            className="max-w-md"
          />
        </div>

        {/* Populate with realistic sample data toggle */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 max-w-xl">
          <input
            type="checkbox"
            id="populateSample"
            checked={populateSample}
            onChange={(e) => setPopulateSample(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <label
            htmlFor="populateSample"
            className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer select-none"
          >
            <strong className="text-indigo-900 dark:text-indigo-300 block font-bold">
              Pre-fill with role-specific sample data
            </strong>
            Populates bullet points, skills, certifications, and career summaries tailored to this profession.
          </label>
        </div>

        {/* Template Selector */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Choose Role-Specific Template ({RESUME_TEMPLATES.length} Available)
            </label>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Selected: <strong className="text-indigo-600 dark:text-indigo-400">{selectedMeta.name}</strong>{" "}
              {selectedMeta.isPro && (
                <span className="text-amber-600 dark:text-amber-400 font-bold">(PRO)</span>
              )}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, skill, or keyword (e.g. PMP, Python, Nurse)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredTemplates.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              const isProLocked = tmpl.isPro && userPlan !== "pro";

              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/25"
                      : isProLocked
                      ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-amber-400/60"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {tmpl.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {tmpl.isPro ? (
                          <Badge variant="pro" size="sm">
                            PRO
                          </Badge>
                        ) : (
                          <Badge variant="default" size="sm">
                            FREE
                          </Badge>
                        )}
                        {isProLocked && (
                          <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                      {tmpl.role}
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mb-2.5 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/60">
                      {tmpl.category}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                    {!isSelected && isProLocked && (
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Upgrade
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            isLoading={isCreating}
            onClick={handleCreate}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shadow-md shadow-indigo-500/20"
          >
            Create & Open Editor
          </Button>
        </div>
      </div>

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName={upgradeFeature}
      />
    </div>
  );
}

export default function CreateResumePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
          Loading templates...
        </div>
      }
    >
      <CreateResumeContent />
    </Suspense>
  );
}
