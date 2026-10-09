"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Sparkles, Check, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  contextType: "summary" | "bullet" | "skills";
  jobTitle?: string;
  onApply: (improvedText: string) => void;
}

export function AiAssistantModal({
  isOpen,
  onClose,
  initialText,
  contextType,
  jobTitle,
  onApply,
}: AiAssistantModalProps) {
  const [inputText, setInputText] = useState(initialText);
  const [improvedText, setImprovedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Sync initialText whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setInputText(initialText);
      setImprovedText("");
      setNotice(null);
    }
  }, [isOpen, initialText]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setNotice(null);

    try {
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          contextType,
          jobTitle,
        }),
      });

      const data = await res.json();
      if (data.improvedText) {
        setImprovedText(data.improvedText);
        if (data.notice) {
          setNotice(data.notice);
        }
      }
    } catch (err) {
      console.error("AI Assistant error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (improvedText) {
      onApply(improvedText);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Resume Writing Assistant"
      description={
        contextType === "summary"
          ? "Craft a compelling, recruiter-ready professional summary with quantifiable metrics."
          : "Strengthen this bullet point with powerful action verbs and structured achievements."
      }
      maxWidth="xl"
    >
      <div className="space-y-4 pt-2">
        {/* Notice banner if simulated/provider mode */}
        {notice && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-relaxed">{notice}</p>
          </div>
        )}

        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Original Content
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter the draft sentence or bullet to optimize..."
            className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            size="sm"
            isLoading={isLoading}
            onClick={handleGenerate}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {improvedText ? "Regenerate Variation" : "Enhance with AI"}
          </Button>
        </div>

        {/* Improved Output Comparison */}
        {improvedText && (
          <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in-50">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              AI Recommended Enhancement
            </label>
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-slate-900 text-xs leading-relaxed font-medium">
              {improvedText}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setInputText(improvedText)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Edit this draft
              </button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApply}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Apply to Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
