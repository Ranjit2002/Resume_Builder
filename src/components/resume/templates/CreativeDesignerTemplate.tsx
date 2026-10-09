"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Sparkles, Palette, ExternalLink, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin } from "@/components/ui/Icons";

interface TemplateProps {
  data: ResumeData;
}

export function CreativeDesignerTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, settings } = data;
  const accent = settings.accentColor || "#e11d48";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed max-w-[850px] mx-auto min-h-[1100px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
      {/* Decorative top accent element */}
      <div
        className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* Header */}
      <header className="pb-6 mb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ backgroundColor: `${accent}15`, color: accent }}
          >
            Creative Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            {personalInfo.jobTitle || "Lead Product & UI/UX Designer"}
          </p>
        </div>

        {/* Contact block */}
        <div className="text-[11px] text-slate-600 space-y-1">
          {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: accent }} />{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" style={{ color: accent }} />{personalInfo.phone}</div>}
          {personalInfo.website && <div className="flex items-center gap-1.5 font-medium"><Globe className="w-3.5 h-3.5" style={{ color: accent }} />{personalInfo.website.replace(/^https?:\/\//, "")}</div>}
          {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: accent }} />{personalInfo.location}</div>}
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {summary && !settings.hiddenSections?.includes("summary") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
                About & Design Philosophy
              </h2>
              <p className="text-slate-700 leading-relaxed text-xs italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                "{summary}"
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                Design & Leadership Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h4>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-medium" style={{ color: accent }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-700 text-xs">
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

          {/* Featured Case Studies / Projects */}
          {projects && projects.length > 0 && !settings.hiddenSections?.includes("projects") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                Featured Case Studies
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                      {proj.liveUrl && (
                        <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-1">
                          View Work <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-xs mt-1">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 border border-slate-200">
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
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Design Tooling & Skills */}
          {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" style={{ color: accent }} />
                Skills & Disciplines
              </h2>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                      {cat.categoryName}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills?.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-800"
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

          {/* Education */}
          {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-100">
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                    <p className="text-slate-600 text-[11px]">{edu.institution}</p>
                    <p className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && !settings.hiddenSections?.includes("certifications") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 pb-1 border-b border-slate-100">
                Credentials
              </h2>
              <div className="space-y-1.5 text-xs text-slate-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold block">{c.name}</span>
                    <span className="text-[11px] text-slate-500">{c.issuer}</span>
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
