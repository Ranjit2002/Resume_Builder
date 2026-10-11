"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe, Terminal, GitBranch, Cpu, Code2, Award, Briefcase, GraduationCap } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
}

export function TechnicalEngineerLayout({ data, badgeTitle }: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, settings } = data;
  const accent = settings.accentColor || "#6366f1";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-full p-9 shadow-sm box-border">
      {/* Header */}
      <header className="pb-5 border-b-2 border-slate-200 flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Optional Profile Photo */}
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                crossOrigin="anonymous"
                className="w-20 h-20 rounded-xl object-cover border-2 shadow-xs"
                style={{ borderColor: accent }}
              />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: accent }}
              >
                {badgeTitle || "Technical Architecture & Engineering"}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 font-mono">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
              {personalInfo.jobTitle || "AI & Machine Learning Engineer"}
            </p>
          </div>
        </div>

        {/* Contact info with monospaced style */}
        <div className="text-[11px] font-mono text-slate-600 space-y-1 text-right shrink-0">
          {personalInfo.email && (
            <div className="flex items-center justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center justify-end gap-1.5 font-bold text-slate-800">
              <Github className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.github)}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center justify-end gap-1.5">
              <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.linkedin)}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center justify-end gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.website)}
            </div>
          )}
        </div>
      </header>

      <div className="mt-5 space-y-5">
        {/* Technical Summary */}
        {summary && !hidden.includes("summary") && (
          <section>
            <h2
              className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Terminal className="w-3.5 h-3.5" />
              Technical Summary
            </h2>
            <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed font-sans text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Technical Stack Pills */}
        {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
          <section>
            <h2
              className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Cpu className="w-3.5 h-3.5" />
              Technical Stack & Frameworks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {cat.categoryName}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-medium text-slate-800 bg-slate-100 border border-slate-200"
                      >
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
        {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Engineering Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3.5 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span className="text-[13px]">{exp.jobTitle}</span>
                    <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium text-xs mb-1">
                    {exp.company} <span className="text-slate-400">• {exp.location}</span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-700 text-[11px] leading-relaxed">
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

        {/* Projects / Machine Learning Models */}
        {projects && projects.length > 0 && !hidden.includes("projects") && (
          <section>
            <h2
              className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Code2 className="w-3.5 h-3.5" />
              Systems, Models & Open Source
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs font-mono">{proj.title}</span>
                    <div className="text-[11px] font-mono space-x-2">
                      {proj.githubUrl && (
                        <span className="text-slate-700 underline font-semibold">
                          {formatDisplayUrl(proj.githubUrl)}
                        </span>
                      )}
                      {proj.liveUrl && (
                        <span className="text-indigo-600 underline">
                          {formatDisplayUrl(proj.liveUrl)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
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

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {education && education.length > 0 && !hidden.includes("education") && (
            <section>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1"
                style={{ color: accent }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-xs">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                    <div className="text-slate-400 font-mono text-[10px]">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
            <section>
              <h2
                className="text-xs font-mono font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1"
                style={{ color: accent }}
              >
                Certifications & Badges
              </h2>
              <div className="space-y-1.5 text-[11px]">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold text-slate-800">{c.name}</span>
                    <span className="text-slate-500 font-mono text-[10px]"> — {c.issuer}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
