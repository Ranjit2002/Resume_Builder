"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Mail, Phone, MapPin, Globe, GraduationCap } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface TemplateProps {
  data: ResumeData;
}

export function StudentFresherTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, volunteer, settings } = data;
  const accent = settings.accentColor || "#2563eb";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-[1123px] p-9 shadow-sm box-border">
      {/* Header with vibrant accent banner underline */}
      <header className="pb-5 border-b-2" style={{ borderColor: accent }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">
              {personalInfo.jobTitle || "Aspiring Software Engineer"}
            </p>
          </div>
          <div className="text-[11px] text-slate-600 space-y-1 text-right">
            {personalInfo.email && <div className="flex items-center justify-end gap-1.5"><Mail className="w-3 h-3" style={{ color: accent }} />{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center justify-end gap-1.5"><Phone className="w-3 h-3" style={{ color: accent }} />{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center justify-end gap-1.5"><MapPin className="w-3 h-3" style={{ color: accent }} />{personalInfo.location}</div>}
            {personalInfo.github && <div className="flex items-center justify-end gap-1.5"><Github className="w-3 h-3" style={{ color: accent }} />{personalInfo.github.replace(/^https?:\/\//, "")}</div>}
          </div>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        {/* Career Objective */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              Career Objective
            </h2>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {summary}
            </p>
          </section>
        )}

        {/* Education (Priority for Freshers) */}
        {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <GraduationCap className="w-4 h-4" /> Education & Credentials
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{edu.degree}</span>
                      <p className="text-slate-600 text-[11px] font-medium">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                      </span>
                      {edu.gpa && (
                        <p className="text-[11px] font-bold" style={{ color: accent }}>GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-700 text-[11px]">
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

        {/* Technical & Core Skills */}
        {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5"
              style={{ color: accent }}
            >
              Technical Skills & Proficiencies
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-2.5 rounded-lg border border-slate-200/60 bg-white">
                  <span className="font-bold text-slate-800 text-[11px] block mb-1">
                    {cat.categoryName}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
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

        {/* Academic & Personal Projects */}
        {projects && projects.length > 0 && !settings.hiddenSections?.includes("projects") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent }}
            >
              Academic & Capstone Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.githubUrl && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {proj.githubUrl.replace(/^https?:\/\//, "")}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 text-xs mt-1">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
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

        {/* Internships & Work Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent }}
            >
              Internships & Practical Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{exp.jobTitle}</span>
                    <span className="text-slate-500 text-[11px]">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium text-[11px]">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-slate-700 text-xs">
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

        {/* Volunteer & Campus Leadership */}
        {volunteer && volunteer.length > 0 && !settings.hiddenSections?.includes("volunteer") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: accent }}
            >
              Extracurricular & Leadership
            </h2>
            <div className="space-y-2">
              {volunteer.map((v) => (
                <div key={v.id} className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">{v.role}</span> — {v.organization} ({v.startDate} – {v.endDate})
                  <p className="text-slate-600 mt-0.5">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
