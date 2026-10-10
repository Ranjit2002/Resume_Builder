"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Terminal, Code, Cpu, GitBranch, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { formatDisplayUrl } from "@/lib/utils/format";

interface TemplateProps {
  data: ResumeData;
}

export function TechDeveloperTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, settings } = data;
  const accent = settings.accentColor || "#0284c7";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-[1123px] p-9 shadow-sm border-t-8 box-border" style={{ borderTopColor: accent }}>
      {/* Dev Header */}
      <header className="border-b border-slate-200 pb-5 mb-5">
        <div className="flex flex-row items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                &lt;/dev&gt;
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
            </div>
            <p className="text-sm font-semibold font-mono mt-1 text-slate-700">
              {personalInfo.jobTitle || "Full Stack Software Engineer"}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-end gap-1.5 text-[11px] font-mono text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5 hover:text-slate-900">
                <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1.5 hover:text-slate-900">
                <Github className="w-3.5 h-3.5" style={{ color: accent }} />
                {formatDisplayUrl(personalInfo.github)}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5 hover:text-slate-900">
                <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
                {formatDisplayUrl(personalInfo.linkedin)}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                {personalInfo.location}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-5">
        {/* Summary */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <div className="flex items-center gap-2 mb-1.5">
              <Terminal className="w-3.5 h-3.5" style={{ color: accent }} />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                // System Summary
              </h2>
            </div>
            <p className="text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-200/60 font-sans text-xs">
              {summary}
            </p>
          </section>
        )}

        {/* Stack & Competencies */}
        {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-3.5 h-3.5" style={{ color: accent }} />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                // Technical Stack
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 text-white p-3.5 rounded-xl font-mono text-[11px]">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    {cat.categoryName}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((s, idx) => (
                      <span key={idx} className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-3.5 h-3.5" style={{ color: accent }} />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                // Professional Experience
              </h2>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3.5" style={{ borderColor: accent }}>
                  <div className="flex flex-row items-center justify-between font-mono">
                    <span className="font-bold text-slate-900 text-xs">{exp.jobTitle}</span>
                    <span className="text-[10px] text-slate-500">
                      {exp.startDate} ~ {exp.current ? "CURRENT" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] font-sans font-medium">
                    @ {exp.company} {exp.location && `[${exp.location}]`}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-700 text-xs font-sans">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && !settings.hiddenSections?.includes("projects") && (
          <section>
            <div className="flex items-center gap-2 mb-2.5">
              <Code className="w-3.5 h-3.5" style={{ color: accent }} />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                // Featured Builds
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/40">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono text-xs">{proj.title}</span>
                    {proj.githubUrl && (
                      <span className="text-[10px] text-indigo-600 font-mono flex items-center gap-0.5">
                        Repo <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs mt-1">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 font-mono">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="bg-slate-200 text-slate-800 text-[9px] px-1.5 py-0.5 rounded">
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

        {/* Education & Certs */}
        {(education?.length > 0 || certifications?.length > 0) && (
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            {education && education.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                  // Education
                </h3>
                {education.map((e) => (
                  <div key={e.id} className="text-xs">
                    <p className="font-bold text-slate-900">{e.degree}</p>
                    <p className="text-slate-600 text-[11px]">{e.institution} ({e.startDate} - {e.endDate})</p>
                  </div>
                ))}
              </div>
            )}
            {certifications && certifications.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                  // Certifications
                </h3>
                {certifications.map((c) => (
                  <div key={c.id} className="text-xs">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-slate-600 text-[11px]">{c.issuer} ({c.issueDate})</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
