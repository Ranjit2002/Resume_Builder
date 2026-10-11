"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe, GraduationCap, Award, BookOpen, Code2, Users } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
  objectiveHeading?: string;
}

export function AcademicEarlyCareerLayout({
  data,
  badgeTitle,
  objectiveHeading = "Career Objective",
}: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, languages, volunteer, settings } = data;
  const accent = settings.accentColor || "#2563eb";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-full p-9 shadow-sm box-border">
      {/* Header */}
      <header className="pb-5 border-b-2" style={{ borderColor: accent }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Optional Profile Photo - gracefully collapses if absent */}
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
              {badgeTitle && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 text-white shadow-2xs"
                  style={{ backgroundColor: accent }}
                >
                  {badgeTitle}
                </span>
              )}
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {personalInfo.jobTitle || "Aspiring Software Engineer"}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-[11px] text-slate-600 space-y-1 text-right shrink-0">
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
            {personalInfo.website && (
              <div className="flex items-center justify-end gap-1.5 font-medium">
                <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
                {formatDisplayUrl(personalInfo.website)}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end gap-1.5">
                <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
                {formatDisplayUrl(personalInfo.linkedin)}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center justify-end gap-1.5">
                <Github className="w-3.5 h-3.5" style={{ color: accent }} />
                {formatDisplayUrl(personalInfo.github)}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-5 space-y-5">
        {/* Objective / Summary */}
        {summary && !hidden.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {objectiveHeading}
            </h2>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Education (Prominently Placed at Top) */}
        {education && education.length > 0 && !hidden.includes("education") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Education & Academic Performance
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span>{edu.degree}</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 text-xs mt-0.5">
                    <span className="font-medium text-slate-800">{edu.institution}</span>
                    <span className="text-[11px]">{edu.location}</span>
                  </div>
                  {edu.gpa && (
                    <div className="mt-1 text-[11px] font-semibold" style={{ color: accent }}>
                      Cumulative GPA / Grade: {edu.gpa}
                    </div>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 mt-1.5 space-y-0.5 text-slate-600 text-[11px]">
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
        {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Code2 className="w-3.5 h-3.5" />
              Technical & Professional Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="p-2.5 rounded-xl border border-slate-100 bg-white">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    {cat.categoryName}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded font-medium text-slate-700 bg-slate-50 border border-slate-200"
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

        {/* Academic & Practical Projects */}
        {projects && projects.length > 0 && !hidden.includes("projects") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Code2 className="w-3.5 h-3.5" />
              Academic Projects & Capstone
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    <div className="text-[11px] space-x-2">
                      {proj.githubUrl && (
                        <span className="text-slate-600 underline">{formatDisplayUrl(proj.githubUrl)}</span>
                      )}
                      {proj.liveUrl && (
                        <span className="text-indigo-600 underline">{formatDisplayUrl(proj.liveUrl)}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
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

        {/* Experience / Internships */}
        {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Internships & Work Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span>{exp.jobTitle}</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] font-medium mb-1">
                    {exp.company} • {exp.location}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-700 text-[11px]">
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

        {/* Certifications & Awards */}
        {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
          <div className="grid grid-cols-2 gap-4 pt-1">
            {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-slate-100 pb-1"
                  style={{ color: accent }}
                >
                  Certifications
                </h2>
                <div className="space-y-1.5 text-[11px]">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-semibold text-slate-800">{c.name}</span>
                      <span className="text-slate-500 text-[10px]"> — {c.issuer}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {awards && awards.length > 0 && !hidden.includes("awards") && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-slate-100 pb-1 flex items-center gap-1"
                  style={{ color: accent }}
                >
                  <Award className="w-3.5 h-3.5" />
                  Academic Honors
                </h2>
                <div className="space-y-1.5 text-[11px]">
                  {awards.map((a) => (
                    <div key={a.id}>
                      <span className="font-semibold text-slate-800">{a.title}</span>
                      <span className="text-slate-500 text-[10px]"> ({a.issuer})</span>
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
