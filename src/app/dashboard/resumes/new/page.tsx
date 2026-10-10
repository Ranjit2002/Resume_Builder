"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveResume } from "@/lib/store/storage";
import { ResumeData, ResumeTemplateId } from "@/lib/types/resume";
import { SAMPLE_RESUME } from "@/lib/constants/sample-data";
import { RESUME_TEMPLATES } from "@/lib/constants/templates";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, ArrowRight, Check, Sparkles } from "lucide-react";

function CreateResumeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTemplate = (searchParams.get("template") as ResumeTemplateId) || "classic";

  const [title, setTitle] = useState("Software Engineer Resume");
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateId>(initialTemplate);
  const [populateSample, setPopulateSample] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Sync selectedTemplate when URL search param changes (e.g. user browses templates and clicks a different one)
  React.useEffect(() => {
    setIsCreating(false);
    const tmplParam = searchParams.get("template") as ResumeTemplateId;
    if (tmplParam && RESUME_TEMPLATES.some((t) => t.id === tmplParam)) {
      setSelectedTemplate(tmplParam);
    }
  }, [searchParams]);

  const handleCreate = async () => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const newId = `resume-${Date.now()}`;
      const baseData = populateSample
        ? SAMPLE_RESUME
        : {
            ...SAMPLE_RESUME,
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
          };

      const newResume: ResumeData = {
        ...baseData,
        id: newId,
        title: title.trim() || "Untitled Resume",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        settings: {
          ...(baseData.settings || SAMPLE_RESUME.settings),
          template: selectedTemplate,
        },
      };

      // Save to localStorage immediately (0ms latency)
      await saveResume(newResume);

      // Navigate instantly to the newly created resume editor
      router.push(`/dashboard/resumes/${newId}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Create New Resume
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Choose a starting template and project title. You can customize colors and typography anytime.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <Input
          label="Resume Project Title"
          placeholder="e.g. Lead Frontend Engineer Resume"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Template Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Select Starting Resume Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {RESUME_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/25"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {tmpl.name}
                    </span>
                    {tmpl.isPro && <Badge variant="pro" size="sm">PRO</Badge>}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mb-2.5 leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div className="inline-block text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/60">
                    {tmpl.category}
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
              Pre-populate with realistic sample data
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-0.5">
              Provides editable placeholder content so you can preview the layout immediately.
            </span>
          </div>
          <input
            type="checkbox"
            checked={populateSample}
            onChange={(e) => setPopulateSample(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
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
    <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading templates...</div>}>
      <CreateResumeContent />
    </Suspense>
  );
}
