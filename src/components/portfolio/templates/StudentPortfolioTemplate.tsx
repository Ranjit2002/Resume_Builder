"use client";

import React from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import { GraduationCap, FolderGit2, Mail, Download, ExternalLink, Award } from "lucide-react";
import { Github } from "@/components/ui/Icons";

interface Props {
  data: PortfolioData;
}

export function StudentPortfolioTemplate({ data }: Props) {
  const accent = data.settings?.accentColor || "#3b82f6";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      {/* Top Banner */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-extrabold text-lg text-slate-900 dark:text-white">
            {data.fullName || "Student Portfolio"}
          </span>
          <div className="flex items-center gap-3">
            {data.settings?.showResumeDownload && (
              <button
                onClick={() => window.print()}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Resume
              </button>
            )}
            <a
              href={`mailto:${data.email}`}
              className="text-xs font-bold text-white px-3.5 py-1.5 rounded-lg shadow-xs"
              style={{ backgroundColor: accent }}
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 max-w-5xl mx-auto space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-8 transition-colors">
          {data.avatarUrl && (
            <img
              src={data.avatarUrl}
              alt={data.fullName}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 shadow-sm"
              style={{ borderColor: accent }}
            />
          )}
          <div className="space-y-3 text-center sm:text-left">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              Recent Graduate & Job Seeker
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {data.fullName}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
              {data.headline}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              {data.about}
            </p>
          </div>
        </div>
      </section>

      {/* Education & Academic Background */}
      {data.education && data.education.length > 0 && (
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Education & Coursework</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{edu.degree}</h3>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{edu.institution}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{edu.startDate} – {edu.endDate}</p>
                {edu.gpa && <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <FolderGit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Capstone & Academic Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between transition-colors">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{proj.description}</p>
                </div>
                {proj.tags && (
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, idx) => (
              <span key={idx} className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs transition-colors">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 mt-12 bg-white dark:bg-slate-900 transition-colors">
        <p>© 2026 {data.fullName}. Built with CareerCraft.</p>
      </footer>
    </div>
  );
}
