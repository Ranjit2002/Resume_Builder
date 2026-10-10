"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/lib/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, X, Sparkles, Trash2 } from "lucide-react";

interface SkillsFormProps {
  categories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
  onOpenAiHelper?: (contextType: "skills") => void;
}

const COMMON_PRESETS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Git",
  "REST APIs",
  "System Design",
];

export function SkillsForm({
  categories,
  onChange,
  onOpenAiHelper,
}: SkillsFormProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const addCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: "Technical Skills",
      skills: [],
    };
    onChange([...categories, newCat]);
  };

  const removeCategory = (id: string) => {
    onChange(categories.filter((c) => c.id !== id));
  };

  const updateCategoryName = (id: string, name: string) => {
    onChange(
      categories.map((c) => (c.id === id ? { ...c, categoryName: name } : c))
    );
  };

  const addSkillToCategory = (catId: string, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    onChange(
      categories.map((c) => {
        if (c.id === catId && !c.skills.includes(trimmed)) {
          return { ...c, skills: [...c.skills, trimmed] };
        }
        return c;
      })
    );
    setNewSkillInputs((prev) => ({ ...prev, [catId]: "" }));
  };

  const removeSkillFromCategory = (catId: string, skillToRemove: string) => {
    onChange(
      categories.map((c) => {
        if (c.id === catId) {
          return {
            ...c,
            skills: c.skills.filter((s) => s !== skillToRemove),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Skills & Competencies</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organize skills by category for optimal ATS keyword scanning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onOpenAiHelper && (
            <Button
              type="button"
              size="sm"
              variant="subtle"
              onClick={() => onOpenAiHelper("skills")}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Suggest Skills
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addCategory}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Group
          </Button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/40">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">No skill groups configured.</p>
          <Button size="sm" onClick={addCategory} leftIcon={<Plus className="w-4 h-4" />}>
            Create Skill Group
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                <input
                  type="text"
                  className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                  value={cat.categoryName}
                  onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                  placeholder="Group Name (e.g. Languages, Cloud, Frameworks)"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(cat.id)}
                  className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-500 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Skills Chip List */}
              <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                {cat.skills?.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillFromCategory(cat.id, skill)}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Input to add single skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill and press Enter..."
                  value={newSkillInputs[cat.id] || ""}
                  onChange={(e) =>
                    setNewSkillInputs((prev) => ({
                      ...prev,
                      [cat.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkillToCategory(cat.id, newSkillInputs[cat.id] || "");
                    }
                  }}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-1.5 focus:border-indigo-500 focus:outline-none"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="subtle"
                  className="shrink-0 text-xs px-3"
                  onClick={() =>
                    addSkillToCategory(cat.id, newSkillInputs[cat.id] || "")
                  }
                >
                  Add
                </Button>
              </div>
            </div>
          ))}

          {/* Quick presets footer */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 block mb-1.5">
              Popular skills to add:
            </span>
            <div className="flex flex-wrap gap-1">
              {COMMON_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (categories.length > 0) {
                      addSkillToCategory(categories[0].id, preset);
                    }
                  }}
                  className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded transition-colors"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
