"use client";

import React from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { ExternalLink, Mail, Download, ArrowUpRight, Sparkles, Heart } from "lucide-react";

interface Props {
  data: PortfolioData;
}

export function DesignerPortfolioTemplate({ data }: Props) {
  const accent = data.settings?.accentColor || "#ec4899";

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-pink-500 selection:text-white transition-colors">
      {/* Navigation */}
      <header className="sticky top-0 z-30 bg-[#faf9f6]/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-stone-200/60 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
            {data.fullName || "Designer"}
          </span>
          <nav className="flex items-center gap-6 text-sm font-semibold text-stone-600 dark:text-slate-400">
            <a href="#work" className="hover:text-stone-900 dark:hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-stone-900 dark:hover:text-white transition-colors">About</a>
            <a href={`mailto:${data.email}`} className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product & Visual Designer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
          Crafting intuitive, memorable digital experiences.
        </h1>

        <p className="text-lg sm:text-2xl text-stone-600 dark:text-slate-300 font-normal max-w-3xl leading-relaxed">
          {data.about}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={`mailto:${data.email}`}
            className="px-6 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: accent }}
          >
            Start a Project
          </a>

          {data.settings?.showResumeDownload && (
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 rounded-2xl font-bold text-stone-800 dark:text-slate-200 text-sm border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
          )}
        </div>
      </section>

      {/* Visual Work Gallery */}
      <section id="work" className="py-16 px-6 max-w-6xl mx-auto space-y-12">
        <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Selected Design Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects?.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl overflow-hidden border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {proj.imageUrl ? (
                  <div className="overflow-hidden h-64 bg-stone-100 dark:bg-slate-800">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-pink-100 dark:from-pink-950/40 to-indigo-100 dark:to-indigo-950/40 flex items-center justify-center text-stone-400">
                    <Sparkles className="w-12 h-12" />
                  </div>
                )}

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {proj.title}
                    </h3>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              {proj.tags && proj.tags.length > 0 && (
                <div className="px-6 pb-6 pt-2 flex flex-wrap gap-1.5">
                  {proj.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 font-semibold px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Pill Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 px-6 max-w-5xl mx-auto border-t border-stone-200 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Design Disciplines & Tools</h2>
          <div className="flex flex-wrap gap-2.5">
            {data.skills.map((s, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 text-sm font-semibold shadow-2xs transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Contact Banner */}
      <section className="py-24 px-6 text-center bg-stone-900 dark:bg-slate-900 text-white space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Let's build something bold.</h2>
        <p className="text-stone-400 max-w-md mx-auto text-sm">
          {data.availabilityStatus || "Currently taking on select freelance branding and product UI/UX opportunities."}
        </p>
        <a
          href={`mailto:${data.email}`}
          className="inline-block px-8 py-4 rounded-2xl font-bold text-white text-base shadow-xl"
          style={{ backgroundColor: accent }}
        >
          {data.email}
        </a>
      </section>
    </div>
  );
}
