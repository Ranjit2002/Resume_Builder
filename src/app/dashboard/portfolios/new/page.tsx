"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { savePortfolio } from "@/lib/store/storage";
import { PortfolioData, PortfolioTemplateId } from "@/lib/types/portfolio";
import { SAMPLE_PORTFOLIO } from "@/lib/constants/sample-data";
import { PORTFOLIO_TEMPLATES } from "@/lib/constants/templates";
import { slugify, isValidSlug } from "@/lib/utils/slug";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Globe, ArrowRight } from "lucide-react";

function CreatePortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTheme = (searchParams.get("template") as PortfolioTemplateId) || "developer";

  const [title, setTitle] = useState("My Developer Portfolio");
  const [slug, setSlug] = useState("alex-rivera");
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplateId>(initialTheme);
  const [populateSample, setPopulateSample] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  const handleSlugInput = (val: string) => {
    const s = slugify(val);
    setSlug(s);
    if (s && !isValidSlug(s)) {
      setSlugError("Slug must be 3-48 lowercase characters, numbers and hyphens only.");
    } else {
      setSlugError(null);
    }
  };

  const handleCreate = async () => {
    if (!isValidSlug(slug)) {
      setSlugError("Please enter a valid URL slug (e.g. john-doe).");
      return;
    }

    setIsCreating(true);

    const newId = `portfolio-${Date.now()}`;
    const baseData = populateSample
      ? SAMPLE_PORTFOLIO
      : {
          ...SAMPLE_PORTFOLIO,
          fullName: "Your Name",
          headline: "Professional Headline",
          about: "",
          skills: [],
          projects: [],
          experiences: [],
          education: [],
        };

    const newPortfolio: PortfolioData = {
      ...baseData,
      id: newId,
      title: title.trim() || "My Portfolio",
      slug: slug.trim(),
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings: {
        ...SAMPLE_PORTFOLIO.settings,
        template: selectedTemplate,
      },
    };

    await savePortfolio(newPortfolio);
    router.push(`/dashboard/portfolios/${newId}`);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Create Personal Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pick a template theme and claim your unique public username slug.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Portfolio Website Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Alex Rivera Portfolio"
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Shareable URL Slug (/portfolio/...)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                /portfolio/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugInput(e.target.value)}
                placeholder="your-name"
                className="w-full text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-2 text-slate-900 dark:text-white bg-white dark:bg-slate-950 focus:outline-none focus:border-indigo-500"
              />
            </div>
            {slugError && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{slugError}</p>
            )}
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Select Starting Portfolio Theme
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PORTFOLIO_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {tmpl.name}
                    </span>
                    {tmpl.isPro && <Badge variant="pro" size="sm">PRO</Badge>}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    {tmpl.description}
                  </p>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    Best for: {tmpl.bestFor}
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
              Pre-populate with sample developer projects & bio
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              Load demonstration projects and experience so you can preview right away.
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
            Create & Open Portfolio Editor
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreatePortfolioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading portfolio setup...</div>}>
      <CreatePortfolioContent />
    </Suspense>
  );
}
