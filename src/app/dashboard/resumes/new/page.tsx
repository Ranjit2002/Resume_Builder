"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveResume, getUserProfile } from "@/lib/store/storage";
import { ResumeData, ResumeTemplateId } from "@/lib/types/resume";
import { getSampleResumeForTemplate } from "@/lib/constants/sample-resumes";
import { RESUME_TEMPLATES, ResumeCategory } from "@/lib/constants/templates";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
  const initialTemplate = (searchParams.get("template") as ResumeTemplateId) || "student";

  const [title, setTitle] = useState("My Professional Resume");
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateId>(initialTemplate);
  const [selectedCategory, setSelectedCategory] = useState<"All" | ResumeCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [populateSample, setPopulateSample] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [userPlan, setUserPlan] = useState("free");

  useEffect(() => {
    const profile = getUserProfile();
    setUserPlan(profile.subscription?.plan || "free");
  }, []);

  // Sync selectedTemplate when URL search param changes
  useEffect(() => {
    setIsCreating(false);
    const tmplParam = searchParams.get("template") as ResumeTemplateId;
    if (tmplParam && RESUME_TEMPLATES.some((t) => t.id === tmplParam)) {
      setSelectedTemplate(tmplParam);
      const match = RESUME_TEMPLATES.find((t) => t.id === tmplParam);
      if (match) {
        setTitle(`${match.name}`);
      }
    }
  }, [searchParams]);

  const handleSelectTemplate = (tmplId: ResumeTemplateId) => {
    setSelectedTemplate(tmplId);
    const match = RESUME_TEMPLATES.find((t) => t.id === tmplId);
    if (match) {
      setTitle(`${match.name}`);
    }
  };

  const handleCreate = async () => {
    if (isCreating) return;
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
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      tmpl.name.toLowerCase().includes(q) ||
      tmpl.role.toLowerCase().includes(q) ||
      tmpl.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const selectedMeta = RESUME_TEMPLATES.find((t) => t.id === selectedTemplate);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Create New Resume
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Choose from 30 in-demand career role templates. You can customize colors, fonts, sections, and add an optional profile photo anytime.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <Input
          label="Resume Project Title"
          placeholder="e.g. Senior Product Manager Resume"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Template Selector Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Select Starting Career Template ({RESUME_TEMPLATES.length} Available)
            </label>
            {selectedMeta && (
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                Selected: {selectedMeta.name} {selectedMeta.isPro && "(PRO)"}
              </span>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 30 templates by title or career role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
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
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/25"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {tmpl.name}
                      </span>
                      {tmpl.isPro ? (
                        <Badge variant="pro" size="sm">PRO</Badge>
                      ) : (
                        <Badge variant="default" size="sm">FREE</Badge>
                      )}
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample Content Checkbox */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Pre-populate with realistic, role-tailored sample data
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-0.5">
              Includes profession-specific achievements, bullet points, skills categories, and projects.
            </span>
          </div>
          <input
            type="checkbox"
            checked={populateSample}
            onChange={(e) => setPopulateSample(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" size="md" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            isLoading={isCreating}
            onClick={handleCreate}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create & Open Editor
          </Button>
        </div>
      </div>
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
