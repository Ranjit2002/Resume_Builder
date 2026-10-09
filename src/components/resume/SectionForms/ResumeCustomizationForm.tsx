"use client";

import React from "react";
import { ResumeSettings, ResumeTemplateId } from "@/lib/types/resume";
import { RESUME_TEMPLATES } from "@/lib/constants/templates";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";
import { Check, Palette, Type, AlignJustify, EyeOff } from "lucide-react";

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
];

export function ResumeCustomizationForm({
  settings,
  onChange,
  userPlan = "free",
  onUpgradePrompt,
}: ResumeCustomizationFormProps) {
  const selectTemplate = (id: ResumeTemplateId, isPro?: boolean) => {
    if (isPro && userPlan !== "pro" && onUpgradePrompt) {
      onUpgradePrompt();
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

  return (
    <div className="space-y-6">
      {/* Template Selector Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
          Resume Template Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESUME_TEMPLATES.map((tmpl) => {
            const isSelected = settings.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => selectTemplate(tmpl.id, tmpl.isPro)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900">
                      {tmpl.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {tmpl.isPro && <Badge variant="pro" size="sm">PRO</Badge>}
                      {tmpl.badge && !tmpl.isPro && (
                        <Badge variant="primary" size="sm">
                          {tmpl.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal mb-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {tmpl.category}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
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
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
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
                  ? "scale-110 ring-2 ring-offset-2 ring-slate-400"
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
            <span className="text-xs text-slate-400">Custom:</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
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
            className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs bg-white text-slate-900"
          >
            <option value="sans">Modern Sans-Serif (Plus Jakarta / Inter)</option>
            <option value="serif">Classic Serif (Playfair / Times)</option>
            <option value="mono">Developer Monospace (JetBrains Mono)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <AlignJustify className="w-3.5 h-3.5" /> Document Spacing
          </label>
          <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
            {(["compact", "normal", "relaxed"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ ...settings, spacing: mode })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  settings.spacing === mode
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Visibility & Toggles */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
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
                    ? "bg-white border-slate-200 text-slate-800 font-medium"
                    : "bg-slate-50 border-dashed border-slate-300 text-slate-400 line-through"
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
      <div className="pt-2">
        <Switch
          checked={settings.showPhoto}
          onChange={(checked) => onChange({ ...settings, showPhoto: checked })}
          label="Display Profile Photo"
          description="Toggle photo display on supported template sidebars"
        />
      </div>
    </div>
  );
}
