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
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 70) return "text-indigo-600 bg-indigo-50 border-indigo-200";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getBarColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-indigo-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
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
              <span className="text-xs font-bold text-slate-900">
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
            <p className="text-[11px] text-slate-500 mt-0.5">
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
          className="text-xs text-slate-500 gap-1 px-2.5"
        >
          <span>{isOpen ? "Hide Checklist" : "View Checklist"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500 rounded-full", getBarColor(report.score))}
          style={{ width: `${report.score}%` }}
        />
      </div>

      {/* Dropdown Checklist Details */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in-50">
          {/* Actionable Suggestions */}
          {report.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                Recommended Next Steps
              </h4>
              <div className="space-y-2">
                {report.suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-900">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                          +{item.points} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal pl-5">
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Completed Sections ({report.completedItems.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {report.completedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-600 py-0.5"
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
