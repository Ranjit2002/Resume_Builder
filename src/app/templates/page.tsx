"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RESUME_TEMPLATES, PORTFOLIO_TEMPLATES } from "@/lib/constants/templates";
import { FileText, Globe, Check, ArrowRight, Sparkles, Filter } from "lucide-react";

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "resumes", label: "Resume Formats (7)" },
    { id: "portfolios", label: "Portfolio Themes (4)" },
    { id: "ats", label: "ATS-Optimized" },
    { id: "tech", label: "Developer & Tech" },
    { id: "creative", label: "Design & Creative" },
  ];

  const filteredResumes = RESUME_TEMPLATES.filter((r) => {
    if (activeCategory === "all" || activeCategory === "resumes") return true;
    if (activeCategory === "ats" && r.category === "ATS") return true;
    if (activeCategory === "tech" && r.category === "Tech") return true;
    if (activeCategory === "creative" && r.category === "Creative") return true;
    return false;
  });

  const filteredPortfolios = PORTFOLIO_TEMPLATES.filter((p) => {
    if (activeCategory === "all" || activeCategory === "portfolios") return true;
    if (activeCategory === "tech" && p.id === "developer") return true;
    if (activeCategory === "creative" && p.id === "designer") return true;
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="primary" size="md">
            Production-Ready Gallery
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Templates designed to win interviews
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every template is meticulously engineered for readable typography, consistent visual hierarchy, and instant ATS compliance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resume Templates Section */}
        {filteredResumes.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Resume Templates ({filteredResumes.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                        {tmpl.category}
                      </span>
                      {tmpl.isPro ? (
                        <Badge variant="pro" size="sm">PRO</Badge>
                      ) : (
                        <Badge variant="default" size="sm">FREE</Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tmpl.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Recommended for: </span>
                      {tmpl.recommendedFor}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {tmpl.accentColors.map((col, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-700"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <Link href={`/dashboard/resumes/new?template=${tmpl.id}`}>
                      <Button variant="primary" size="sm">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Templates Section */}
        {filteredPortfolios.length > 0 && (
          <div>
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Personal Portfolio Themes ({filteredPortfolios.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPortfolios.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">
                        Portfolio Theme
                      </span>
                      {tmpl.isPro ? (
                        <Badge variant="pro" size="sm">PRO</Badge>
                      ) : (
                        <Badge variant="default" size="sm">FREE</Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tmpl.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Best for: </span>
                      {tmpl.bestFor}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {tmpl.accentColors.map((col, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-700"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <Link href={`/dashboard/portfolios/new?template=${tmpl.id}`}>
                      <Button variant="primary" size="sm">
                        Create Portfolio
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
