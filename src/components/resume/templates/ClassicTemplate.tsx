"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";
import { formatDisplayUrl } from "@/lib/utils/format";

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, languages, volunteer, settings } = data;
  const accent = settings.accentColor || "#1e293b";

  return (
    <div className="bg-white text-slate-900 p-10 font-serif text-sm leading-relaxed w-full min-h-[1123px] box-border">
      {/* Header */}
      <header className="border-b-2 pb-6 text-center" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-base font-sans font-medium text-slate-600 mt-1">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-sans text-xs text-slate-600 mt-3">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.linkedin)}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.github)}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
              {formatDisplayUrl(personalInfo.website)}
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-6 space-y-6">
        {/* Professional Summary */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <h2
              className="text-sm font-sans font-bold uppercase tracking-wider border-b pb-1 mb-2.5"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-normal text-[13px]">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <h2
              className="text-sm font-sans font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{exp.jobTitle}</span>
                      <span className="text-slate-600 font-sans text-xs ml-1">
                        — {exp.company} {exp.location && `(${exp.location})`}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-5 mt-1.5 space-y-1 text-slate-700 text-xs font-sans">
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

        {/* Education */}
        {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
          <section>
            <h2
              className="text-sm font-sans font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-row items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{edu.degree}</span>
                    <span className="text-slate-600 font-sans text-xs ml-1">
                      — {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-slate-500">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
          <section>
            <h2
              className="text-sm font-sans font-bold uppercase tracking-wider border-b pb-1 mb-2.5"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Key Skills
            </h2>
            <div className="space-y-1.5 font-sans text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-row gap-1">
                  <span className="font-bold text-slate-800 w-36 shrink-0">
                    {cat.categoryName}:
                  </span>
                  <span className="text-slate-600">
                    {cat.skills?.join(" • ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && !settings.hiddenSections?.includes("projects") && (
          <section>
            <h2
              className="text-sm font-sans font-bold uppercase tracking-wider border-b pb-1 mb-3"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Notable Projects
            </h2>
            <div className="space-y-3 font-sans">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      {proj.title}
                    </span>
                    {proj.liveUrl && (
                      <span className="text-xs text-indigo-600 hover:underline">
                        {proj.liveUrl.replace(/^https?:\/\//, "")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Technologies: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Awards */}
        {(certifications?.length > 0 || awards?.length > 0) && (
          <div className="grid grid-cols-2 gap-6 font-sans">
            {certifications && certifications.length > 0 && !settings.hiddenSections?.includes("certifications") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
                  style={{ color: accent, borderColor: "#e2e8f0" }}
                >
                  Certifications
                </h2>
                <ul className="space-y-1 text-xs text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-semibold">{c.name}</span> — {c.issuer} ({c.issueDate})
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {awards && awards.length > 0 && !settings.hiddenSections?.includes("awards") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
                  style={{ color: accent, borderColor: "#e2e8f0" }}
                >
                  Honors & Awards
                </h2>
                <ul className="space-y-1 text-xs text-slate-700">
                  {awards.map((a) => (
                    <li key={a.id}>
                      <span className="font-semibold">{a.title}</span> — {a.issuer} ({a.date})
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
