"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";

interface TemplateProps {
  data: ResumeData;
}

export function AtsTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, settings } = data;
  const accent = settings.accentColor || "#111827";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-[1123px] p-10 box-border">
      {/* ATS Header: Simple, Centered or Left, Plain Contact Text */}
      <header className="border-b border-slate-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-900">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm font-semibold text-slate-700 mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="text-xs text-slate-600 mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {formatDisplayUrl(personalInfo.website)}</span>}
          {personalInfo.linkedin && <span>• {formatDisplayUrl(personalInfo.linkedin)}</span>}
          {personalInfo.github && <span>• {formatDisplayUrl(personalInfo.github)}</span>}
        </div>
      </header>

      <div className="space-y-5">
        {/* Professional Summary */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Professional Summary
            </h2>
            <p className="text-slate-800 leading-normal">{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Technical & Professional Skills
            </h2>
            <div className="space-y-1 text-slate-800">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold">{cat.categoryName}: </span>
                  <span>{cat.skills?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-slate-600 text-[11px]">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-700 italic text-[11px]">
                    {exp.company} | {exp.location}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-5 mt-1.5 space-y-1 text-slate-800">
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
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    {proj.liveUrl && (
                      <span className="text-slate-600 text-[11px]">{proj.liveUrl}</span>
                    )}
                  </div>
                  <p className="text-slate-800 mt-0.5">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Technologies Used: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-700 text-[11px]"> — {edu.institution} {edu.gpa && `(GPA: ${edu.gpa})`}</span>
                  </div>
                  <span className="text-slate-600 text-[11px]">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && !settings.hiddenSections?.includes("certifications") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2"
              style={{ color: accent }}
            >
              Certifications & Training
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-800">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="font-semibold">{c.name}</span> — {c.issuer} ({c.issueDate})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
