"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
}

export function AtsSingleColumnLayout({ data, badgeTitle }: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, languages, volunteer, settings } = data;
  const accent = settings.accentColor || "#1e293b";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-full p-10 box-border">
      {/* ATS Header */}
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: accent }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex-1">
            {badgeTitle && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-1 text-white"
                style={{ backgroundColor: accent }}
              >
                {badgeTitle}
              </span>
            )}
            <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
                {personalInfo.jobTitle}
              </p>
            )}

            <div className="text-xs text-slate-600 mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  {formatDisplayUrl(personalInfo.website)}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-400" />
                  {formatDisplayUrl(personalInfo.linkedin)}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-400" />
                  {formatDisplayUrl(personalInfo.github)}
                </span>
              )}
            </div>
          </div>

          {/* Optional Profile Photo - neatly aligned without gaps when absent */}
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                crossOrigin="anonymous"
                className="w-20 h-20 rounded-lg object-cover border-2 shadow-xs"
                style={{ borderColor: accent }}
              />
            </div>
          )}
        </div>
      </header>

      <div className="space-y-4">
        {/* Professional Summary */}
        {summary && !hidden.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Professional Summary
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Core & Technical Skills */}
        {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Skills & Competencies
            </h2>
            <div className="space-y-1.5 text-slate-800">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-slate-900">{cat.categoryName}: </span>
                  <span className="text-slate-700">{cat.skills?.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-semibold">
                    <span className="text-slate-900 text-[13px]">{exp.jobTitle}</span>
                    <span className="text-slate-500 text-[11px] font-normal whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 text-xs mb-1.5">
                    <span className="font-medium text-slate-800">{exp.company}</span>
                    <span className="text-[11px]">{exp.location}</span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="leading-snug">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && !hidden.includes("projects") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Projects & Deliverables
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900 text-xs">{proj.title}</span>
                    <div className="text-[11px] text-slate-500 space-x-2">
                      {proj.liveUrl && (
                        <span className="text-blue-600 underline">{formatDisplayUrl(proj.liveUrl)}</span>
                      )}
                      {proj.githubUrl && (
                        <span className="text-slate-600 underline">{formatDisplayUrl(proj.githubUrl)}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-700 text-[11px] mt-0.5 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      <span className="font-semibold">Tools: </span>
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && !hidden.includes("education") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Education & Academic Credentials
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-semibold">
                    <span className="text-slate-900 text-xs">{edu.degree}</span>
                    <span className="text-slate-500 text-[11px] font-normal whitespace-nowrap">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 text-xs">
                    <span>{edu.institution}</span>
                    <span className="text-[11px]">{edu.location}</span>
                  </div>
                  {edu.gpa && (
                    <p className="text-[11px] text-slate-600 mt-0.5">GPA: {edu.gpa}</p>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-600 text-[11px]">
                      {edu.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2"
              style={{ color: accent, borderColor: "#cbd5e1" }}
            >
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
              {certifications.map((c) => (
                <div key={c.id} className="text-xs">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-slate-500 text-[11px]"> — {c.issuer} ({c.issueDate})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Awards */}
        {((languages && languages.length > 0) || (awards && awards.length > 0)) && (
          <div className="grid grid-cols-2 gap-4 pt-1">
            {languages && languages.length > 0 && !hidden.includes("languages") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5"
                  style={{ color: accent, borderColor: "#cbd5e1" }}
                >
                  Languages
                </h2>
                <p className="text-slate-700 text-xs">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(", ")}
                </p>
              </section>
            )}

            {awards && awards.length > 0 && !hidden.includes("awards") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5"
                  style={{ color: accent, borderColor: "#cbd5e1" }}
                >
                  Honors & Awards
                </h2>
                <div className="space-y-1 text-slate-700 text-xs">
                  {awards.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold">{a.title}</span>
                      <span className="text-slate-500 text-[11px]"> ({a.issuer}, {a.date})</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
