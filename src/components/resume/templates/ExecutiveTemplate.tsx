"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { Briefcase, Award, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Linkedin } from "@/components/ui/Icons";

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skillCategories, awards, certifications, settings } = data;
  const accent = settings.accentColor || "#0f172a";

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-[1123px] p-10 shadow-sm border border-slate-200 box-border">
      {/* Executive Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: accent }}>
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
            {personalInfo.jobTitle || "Chief Technology Officer / VP of Engineering"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-600 text-xs pt-2">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" />LinkedIn</span>}
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Executive Profile */}
        {summary && !settings.hiddenSections?.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: accent }}
            >
              Executive Value Proposition
            </h2>
            <p className="text-slate-800 text-[13px] leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Executive Competencies Grid */}
        {skillCategories && skillCategories.length > 0 && !settings.hiddenSections?.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b border-slate-200"
              style={{ color: accent }}
            >
              Core Executive Competencies
            </h2>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {skillCategories.flatMap((c) => c.skills || []).map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Experience */}
        {experiences && experiences.length > 0 && !settings.hiddenSections?.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
              style={{ color: accent }}
            >
              Career History & Executive Milestones
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">{exp.jobTitle}</span>
                    <span className="text-xs font-bold text-slate-500">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">
                    {exp.company} | {exp.location}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-5 mt-2 space-y-1.5 text-slate-800 text-xs">
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

        {/* Education & Credentials */}
        {education && education.length > 0 && !settings.hiddenSections?.includes("education") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: accent }}
            >
              Education & Advanced Degrees
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-600"> — {edu.institution}</span>
                  </div>
                  <span className="text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Honors & Board Appointments */}
        {awards && awards.length > 0 && !settings.hiddenSections?.includes("awards") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: accent }}
            >
              Recognitions & Industry Leadership
            </h2>
            <div className="space-y-1.5 text-xs text-slate-800">
              {awards.map((a) => (
                <div key={a.id}>
                  <span className="font-bold">{a.title}</span> — {a.issuer} ({a.date})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
