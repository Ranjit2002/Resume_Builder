"use client";

import React from "react";
import { WorkExperience } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Building,
  Calendar,
} from "lucide-react";

interface ExperienceFormProps {
  experiences: WorkExperience[];
  onChange: (updated: WorkExperience[]) => void;
  onOpenAiHelper?: (
    currentText: string,
    contextType: "bullet",
    callback: (improvedText: string) => void
  ) => void;
}

export function ExperienceForm({
  experiences,
  onChange,
  onOpenAiHelper,
}: ExperienceFormProps) {
  const addExperience = () => {
    const newItem: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      highlights: [""],
    };
    onChange([newItem, ...experiences]);
  };

  const updateItem = (id: string, updates: Partial<WorkExperience>) => {
    onChange(
      experiences.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(experiences.filter((item) => item.id !== id));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newArr = [...experiences];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;
    onChange(newArr);
  };

  // Highlights / Bullets helper
  const addHighlight = (expId: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateItem(expId, { highlights: [...(exp.highlights || []), ""] });
  };

  const updateHighlight = (
    expId: string,
    highlightIndex: number,
    text: string
  ) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights];
    newHighlights[highlightIndex] = text;
    updateItem(expId, { highlights: newHighlights });
  };

  const removeHighlight = (expId: string, highlightIndex: number) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newHighlights = exp.highlights.filter((_, idx) => idx !== highlightIndex);
    updateItem(expId, { highlights: newHighlights });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Work Experience</h3>
          <p className="text-xs text-slate-500">
            List your relevant roles in reverse-chronological order.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addExperience}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Role
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50">
          <Building className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No experience added yet</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Add full-time roles, internships, contracts, or freelancing.
          </p>
          <Button size="sm" onClick={addExperience} leftIcon={<Plus className="w-4 h-4" />}>
            Add First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4 relative group"
            >
              {/* Header bar of the item */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                    {exp.jobTitle || "Untitled Role"} {exp.company && `at ${exp.company}`}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === experiences.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(exp.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-1"
                    title="Delete role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Job Title"
                  placeholder="e.g. Staff Software Engineer"
                  value={exp.jobTitle}
                  onChange={(e) => updateItem(exp.id, { jobTitle: e.target.value })}
                />
                <Input
                  label="Company Name"
                  placeholder="e.g. Acme Corp"
                  value={exp.company}
                  onChange={(e) => updateItem(exp.id, { company: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Location"
                  placeholder="Bengaluru, Karnataka / Remote"
                  value={exp.location}
                  onChange={(e) => updateItem(exp.id, { location: e.target.value })}
                />
                <Input
                  label="Start Date"
                  placeholder="YYYY-MM (e.g. 2021-03)"
                  value={exp.startDate}
                  onChange={(e) => updateItem(exp.id, { startDate: e.target.value })}
                />
                <div>
                  <Input
                    label="End Date"
                    placeholder="YYYY-MM"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => updateItem(exp.id, { endDate: e.target.value })}
                  />
                  <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateItem(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? "" : exp.endDate,
                        })
                      }
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-[11px] text-slate-600">Currently work here</span>
                  </label>
                </div>
              </div>

              {/* Bullets / Highlights */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Key Achievements & Bullet Points
                  </span>
                  <button
                    type="button"
                    onClick={() => addHighlight(exp.id)}
                    className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.highlights?.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Action verb + Context + Measurable Result (e.g. Led redesign increasing user retention by 22%)..."
                        value={highlight}
                        onChange={(e) => updateHighlight(exp.id, hIndex, e.target.value)}
                      />
                      {onOpenAiHelper && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenAiHelper(highlight, "bullet", (improved) =>
                              updateHighlight(exp.id, hIndex, improved)
                            )
                          }
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg shrink-0 mt-1"
                          title="Improve with AI"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeHighlight(exp.id, hIndex)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg shrink-0 mt-1"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
