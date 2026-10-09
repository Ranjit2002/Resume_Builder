"use client";

import React, { useState } from "react";
import { ResumeData } from "@/lib/types/resume";
import { calculateResumeScore } from "@/lib/utils/score";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ResumeScoreProps {
  resume: ResumeData;
  onSelectSection?: (sectionKey: string) => void;
}

export function ResumeScore({ resume, onSelectSection }: ResumeScoreProps) {
  const [isOpen, setIsOpen] = useState(false);
  const report = calculateResumeScore(resume);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800";
    if (score >= 70) return "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800";
    if (score >= 50) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800";
    return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800";
  };

  const getBarColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-indigo-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-xl border flex flex-col items-center justify-center font-black transition-colors shrink-0",
              getScoreColor(report.score)
            )}
          >
            <span className="text-base leading-none">{report.score}</span>
            <span className="text-[9px] uppercase font-bold opacity-80">%</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Resume Strength
              </span>
              <Badge
                variant={
                  report.score >= 85
                    ? "success"
                    : report.score >= 70
                    ? "primary"
                    : report.score >= 50
                    ? "warning"
                    : "default"
                }
                size="sm"
              >
                {report.grade}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {report.suggestions.length === 0
                ? "Your resume is fully optimized!"
                : `${report.suggestions.length} actionable suggestions to reach 100%`}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-slate-500 dark:text-slate-400 gap-1 px-2.5"
        >
          <span>{isOpen ? "Hide Checklist" : "View Checklist"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500 rounded-full", getBarColor(report.score))}
          style={{ width: `${report.score}%` }}
        />
      </div>

      {/* Dropdown Checklist Details */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in-50">
          {/* Actionable Suggestions */}
          {report.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Recommended Next Steps
              </h4>
              <div className="space-y-2">
                {report.suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950/70 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                          +{item.points} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal pl-5">
                        {item.description}
                      </p>
                    </div>

                    {onSelectSection && (
                      <Button
                        variant="subtle"
                        size="sm"
                        className="text-[11px] h-7 px-2.5 shrink-0"
                        onClick={() => onSelectSection(item.sectionKey)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Milestones */}
          {report.completedItems.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Completed Sections ({report.completedItems.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {report.completedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 py-0.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
