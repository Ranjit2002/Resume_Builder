"use client";

import React from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { Briefcase, Mail, Download, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

interface Props {
  data: PortfolioData;
}

export function ProfessionalPortfolioTemplate({ data }: Props) {
  const accent = data.settings?.accentColor || "#0f172a";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Corporate Nav */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-lg uppercase tracking-tight text-slate-900">
              {data.fullName || "Executive Profile"}
            </span>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              {data.headline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {data.settings?.showResumeDownload && (
              <button
                onClick={() => window.print()}
                className="text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Executive CV
              </button>
            )}
            <a
              href={`mailto:${data.email}`}
              className="text-xs font-bold text-white px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 max-w-5xl mx-auto space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <ShieldCheck className="w-4 h-4 text-slate-800" />
            <span>Executive Portfolio & Advisory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Driving organizational scale, technology excellence, and strategic growth.
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            {data.about}
          </p>
        </div>

        {/* Milestone Highlights */}
        {data.experiences && data.experiences.length > 0 && (
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.experiences.slice(0, 3).map((exp, idx) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-slate-400">Milestone 0{idx + 1}</span>
                <h3 className="font-bold text-base text-slate-900">{exp.jobTitle}</h3>
                <p className="text-xs font-semibold text-slate-700">{exp.company}</p>
                <p className="text-xs text-slate-500">{exp.highlights?.[0]}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Projects / Case Studies */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-16 bg-slate-50 border-y border-slate-200 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Strategic Engagements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  {proj.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisory & Contact CTA */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
          Inquiries & Board Engagements
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto text-sm">
          {data.availabilityStatus || "Available for strategic consultations, fractional leadership, and senior advisory appointments."}
        </p>
        <a
          href={`mailto:${data.email}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>Contact {data.fullName}</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>© 2026 {data.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
