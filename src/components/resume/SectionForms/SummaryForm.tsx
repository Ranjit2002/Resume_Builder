"use client";

import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

interface SummaryFormProps {
  summary: string;
  onChange: (updated: string) => void;
  onOpenAiHelper?: (currentText: string, contextType: "summary") => void;
}

export function SummaryForm({
  summary,
  onChange,
  onOpenAiHelper,
}: SummaryFormProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Professional Summary / Objective
        </label>
        {onOpenAiHelper && (
          <Button
            type="button"
            variant="subtle"
            size="sm"
            onClick={() => onOpenAiHelper(summary, "summary")}
            className="text-xs h-7 gap-1.5"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
          >
            Enhance with AI
          </Button>
        )}
      </div>

      <Textarea
        rows={5}
        placeholder="High-impact summary of your career experience, strongest competencies, and notable career achievements..."
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        helperText="Tip: Keep this between 2 to 4 sentences. Focus on your years of experience, core tech stack or domain expertise, and quantifiable outcomes."
      />
    </div>
  );
}
