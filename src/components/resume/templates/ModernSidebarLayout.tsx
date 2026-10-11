"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
}

export function ModernSidebarLayout({ data, badgeTitle }: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, languages, settings } = data;
  const accent = settings.accentColor || "#4f46e5";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs w-full max-w-full min-h-full flex flex-row box-border">
      {/* Left Sidebar Rail */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200/80 p-6 shrink-0 flex flex-col justify-start box-border space-y-5">
        {/* Profile Photo (Optional - Cleanly hidden if empty or disabled) */}
        {settings.showPhoto && personalInfo.photoUrl && (
          <div className="flex justify-center sm:justify-start">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              crossOrigin="anonymous"
              className="w-24 h-24 rounded-2xl object-cover border-2 shadow-sm"
              style={{ borderColor: accent }}
            />
          </div>
        )}

        {/* Contact Information */}
        <div>
          <h3
            className="text-[11px] font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
            style={{ color: accent, borderColor: "#e2e8f0" }}
          >
            Contact
          </h3>
          <div className="space-y-2 text-slate-600 text-[11px]">
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
                <span className="truncate">{formatDisplayUrl(personalInfo.website)}</span>
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

        {/* Skills Tags */}
        {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Skills & Expertise
            </h3>
            <div className="space-y-3">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    {cat.categoryName}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md font-medium text-slate-700 bg-white border border-slate-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {education && education.length > 0 && !hidden.includes("education") && (
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Education
            </h3>
            <div className="space-y-2.5 text-[11px]">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-slate-800 leading-snug">{edu.degree}</div>
                  <div className="text-slate-600 text-[10px]">{edu.institution}</div>
                  <div className="text-slate-400 text-[10px]">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </div>
                  {edu.gpa && <div className="text-slate-500 text-[10px] mt-0.5">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications in Sidebar */}
        {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-2.5 pb-1 border-b"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Certifications
            </h3>
            <div className="space-y-1.5 text-[10px]">
              {certifications.map((c) => (
                <div key={c.id}>
                  <div className="font-semibold text-slate-800">{c.name}</div>
                  <div className="text-slate-500">{c.issuer} ({c.issueDate})</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in Sidebar */}
        {languages && languages.length > 0 && !hidden.includes("languages") && (
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{ color: accent, borderColor: "#e2e8f0" }}
            >
              Languages
            </h3>
            <div className="space-y-1 text-[10px] text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-slate-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Right Content Panel */}
      <main className="flex-1 p-8 box-border space-y-5">
        {/* Header Name & Title */}
        <header className="border-b pb-4" style={{ borderColor: "#f1f5f9" }}>
          {badgeTitle && (
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 text-white shadow-2xs"
              style={{ backgroundColor: accent }}
            >
              {badgeTitle}
            </span>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm font-semibold mt-1" style={{ color: accent }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </header>

        {/* Executive Summary */}
        {summary && !hidden.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Briefcase className="w-3.5 h-3.5" /> Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Briefcase className="w-3.5 h-3.5" /> Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${accent}40` }}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[13px]">{exp.jobTitle}</span>
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs font-medium mb-1.5">
                    {exp.company} <span className="text-slate-400 font-normal">• {exp.location}</span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-700 leading-relaxed">
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

        {/* Key Projects */}
        {projects && projects.length > 0 && !hidden.includes("projects") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Wrench className="w-3.5 h-3.5" /> Key Projects & Achievements
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                    {proj.liveUrl && (
                      <span className="text-[10px] text-indigo-600 underline">
                        {formatDisplayUrl(proj.liveUrl)}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
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

        {/* Awards */}
        {awards && awards.length > 0 && !hidden.includes("awards") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <Award className="w-3.5 h-3.5" /> Honors & Awards
            </h2>
            <div className="space-y-1 text-slate-700 text-xs">
              {awards.map((a) => (
                <div key={a.id}>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-slate-500 text-[11px]"> — {a.issuer} ({a.date})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
