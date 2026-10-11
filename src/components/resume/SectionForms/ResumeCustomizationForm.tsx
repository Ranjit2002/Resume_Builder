"use client";

import React, { useState } from "react";
import { ResumeSettings, ResumeTemplateId } from "@/lib/types/resume";
import { RESUME_TEMPLATES, ResumeCategory } from "@/lib/constants/templates";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";
import { Check, Palette, Type, AlignJustify, EyeOff, Search, Lock, Sparkles } from "lucide-react";

interface ResumeCustomizationFormProps {
  settings: ResumeSettings;
  onChange: (updated: ResumeSettings) => void;
  userPlan?: string;
  onUpgradePrompt?: () => void;
}

const PRESET_COLORS = [
  "#4f46e5", // Indigo
  "#0284c7", // Sky
  "#059669", // Emerald
  "#0f172a", // Slate/Black
  "#e11d48", // Rose
  "#7c3aed", // Violet
  "#d97706", // Amber
  "#0f766e", // Teal
  "#2563eb", // Blue
  "#ea580c", // Orange
];

const CATEGORIES: { id: "All" | ResumeCategory; label: string }[] = [
  { id: "All", label: "All (30)" },
  { id: "Students", label: "Students (5)" },
  { id: "Business", label: "Business (5)" },
  { id: "Marketing", label: "Marketing (5)" },
  { id: "Data and AI", label: "Data & AI (5)" },
  { id: "Finance", label: "Finance (5)" },
  { id: "Other Professions", label: "Other (5)" },
];

export function ResumeCustomizationForm({
  settings,
  onChange,
  userPlan = "free",
  onUpgradePrompt,
}: ResumeCustomizationFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ResumeCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const selectTemplate = (id: ResumeTemplateId, isPro?: boolean) => {
    if (isPro && userPlan !== "pro") {
      if (onUpgradePrompt) {
        onUpgradePrompt();
      }
      return;
    }
    onChange({ ...settings, template: id });
  };

  const toggleHiddenSection = (sectionKey: string) => {
    const hidden = settings.hiddenSections || [];
    const isCurrentlyHidden = hidden.includes(sectionKey);
    const updated = isCurrentlyHidden
      ? hidden.filter((s) => s !== sectionKey)
      : [...hidden, sectionKey];
    onChange({ ...settings, hiddenSections: updated });
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

  const currentTemplate = RESUME_TEMPLATES.find((t) => t.id === settings.template);

  return (
    <div className="space-y-6">
      {/* Pro Banner if user is previewing a paid template */}
      {currentTemplate?.isPro && userPlan !== "pro" && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Previewing Pro Template: {currentTemplate.name}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                You can edit and test this template freely with watermark. Upgrade to Pro to download clean PDFs.
              </p>
            </div>
          </div>
          {onUpgradePrompt && (
            <button
              type="button"
              onClick={onUpgradePrompt}
              className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xs transition-colors shrink-0"
            >
              Upgrade Now
            </button>
          )}
        </div>
      )}

      {/* Template Selector Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Select Resume Template ({RESUME_TEMPLATES.length} Available)
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Active: <strong className="text-indigo-600 dark:text-indigo-400">{currentTemplate?.name || settings.template}</strong>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates by role, profession, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {filteredTemplates.map((tmpl) => {
            const isSelected = settings.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => selectTemplate(tmpl.id, tmpl.isPro)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/25"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {tmpl.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {tmpl.isPro ? (
                        <Badge variant="pro" size="sm">PREMIUM</Badge>
                      ) : (
                        <Badge variant="default" size="sm">FREE</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mb-1 line-clamp-1">
                    {tmpl.role}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal mb-2 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="inline-block text-[10px] font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/60">
                    {tmpl.category}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accent Color Picker */}
      <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ ...settings, accentColor: color })}
              className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                settings.accentColor === color
                  ? "scale-110 ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            >
              {settings.accentColor === color && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          ))}
          {/* Custom hex input */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Custom:</span>
            <input
              type="color"
              value={settings.accentColor || "#4f46e5"}
              onChange={(e) =>
                onChange({ ...settings, accentColor: e.target.value })
              }
              className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0"
            />
          </div>
        </div>
      </div>

      {/* Typography & Spacing Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5" /> Typography Font
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) =>
              onChange({
                ...settings,
                fontFamily: e.target.value as ResumeSettings["fontFamily"],
              })
            }
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 py-2 px-3 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          >
            <option value="sans">Modern Sans-Serif (Plus Jakarta / Inter)</option>
            <option value="serif">Classic Serif (Playfair / Times)</option>
            <option value="mono">Developer Monospace (JetBrains Mono)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <AlignJustify className="w-3.5 h-3.5" /> Document Spacing
          </label>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-900">
            {(["compact", "normal", "relaxed"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ ...settings, spacing: mode })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  settings.spacing === mode
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Visibility & Toggles */}
      <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <EyeOff className="w-3.5 h-3.5" /> Section Visibility
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { key: "summary", label: "Summary" },
            { key: "experiences", label: "Experience" },
            { key: "education", label: "Education" },
            { key: "skills", label: "Skills" },
            { key: "projects", label: "Projects" },
            { key: "certifications", label: "Certifications" },
            { key: "awards", label: "Awards" },
            { key: "volunteer", label: "Volunteer" },
          ].map((sec) => {
            const isHidden = settings.hiddenSections?.includes(sec.key);
            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => toggleHiddenSection(sec.key)}
                className={`text-xs px-3 py-1.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                  !isHidden
                    ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                    : "bg-slate-50 dark:bg-slate-950/60 border-dashed border-slate-300 dark:border-slate-800 text-slate-400 dark:text-slate-600 line-through"
                }`}
              >
                <span>{sec.label}</span>
                <span className="text-[10px] font-bold">
                  {!isHidden ? "Visible" : "Hidden"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Photo Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <Switch
          checked={settings.showPhoto}
          onChange={(checked) => onChange({ ...settings, showPhoto: checked })}
          label="Display Profile Photo"
          description="Toggle photo display on resume. Layout automatically adapts without empty spaces if no photo is uploaded."
        />
      </div>
    </div>
  );
}
