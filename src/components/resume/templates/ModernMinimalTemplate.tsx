"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";
import { formatDisplayUrl } from "@/lib/utils/format";

export function ModernMinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, settings } = data;
  const accent = settings.accentColor || "#4f46e5";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs w-full max-w-full min-h-full flex flex-row box-border">
      {/* Left Sidebar Accent Rail */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200/80 p-6 shrink-0 flex flex-col justify-start box-border">
        <div className="space-y-6">
          {/* Avatar / Photo if enabled */}
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-start">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                crossOrigin="anonymous"
                className="w-24 h-24 rounded-2xl object-cover border-2 shadow-sm"
                style={{ borderColor: accent }}
              />
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1 border-b"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Contact
            </h3>
            <div className="space-y-2 text-slate-600">
              {personalInfo.email && (
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 truncate">
                  <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span className="truncate">{formatDisplayUrl(personalInfo.linkedin)}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2 truncate">
                  <Github className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span className="truncate">{formatDisplayUrl(personalInfo.github)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills by Category */}
          {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                style={{ color: accent, borderColor: "#e2e8f0" }}
              >
                Skills & Stack
              </h3>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">
                      {cat.categoryName}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills?.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[10px] font-medium shadow-2xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                style={{ color: accent, borderColor: "#e2e8f0" }}
              >
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                    <p className="text-slate-600 text-[11px]">{edu.institution}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-[10px] text-slate-500 mt-0.5">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right Column / Body */}
      <main className="flex-1 p-6 min-w-0 box-border">
        {/* Name and Title */}
        <header className="border-b border-slate-100 pb-4 mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm font-semibold mt-1" style={{ color: accent }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </header>

        {/* Professional Summary */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Profile Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-xs break-words">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Work Experience
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex flex-row items-baseline justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h4>
                      <p className="text-slate-600 font-medium text-[11px]">
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0 text-right whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-700 text-xs break-words">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="break-words leading-relaxed">{h}</li>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Key Projects
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.liveUrl && (
                      <span className="text-[10px] text-indigo-600 font-medium">Link</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-3">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[9px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && !settings.hiddenSections?.includes("certifications") && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <div key={c.id} className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <span className="font-semibold">{c.name}</span> — {c.issuer}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

interface TemplateProps {
  data: ResumeData;
}
