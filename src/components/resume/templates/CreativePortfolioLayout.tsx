"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe, Sparkles, ExternalLink, Award, Briefcase, GraduationCap } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
}

export function CreativePortfolioLayout({ data, badgeTitle }: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, projects, certifications, awards, languages, settings } = data;
  const accent = settings.accentColor || "#e11d48";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-full p-9 shadow-sm relative overflow-hidden box-border">
      {/* Decorative subtle ambient circle in top corner */}
      <div
        className="absolute top-0 right-0 w-44 h-44 -mr-16 -mt-16 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* Header */}
      <header className="pb-5 mb-5 border-b border-slate-100 flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Optional Profile Photo */}
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                crossOrigin="anonymous"
                className="w-20 h-20 rounded-2xl object-cover border-2 shadow-sm"
                style={{ borderColor: accent }}
              />
            </div>
          )}

          <div>
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full inline-block mb-1.5"
              style={{ backgroundColor: `${accent}18`, color: accent }}
            >
              {badgeTitle || "Portfolio & Creative Showcase"}
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">
              {personalInfo.jobTitle || "Creative Designer & Strategist"}
            </p>
          </div>
        </div>

        {/* Contact info list */}
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
      </header>

      {/* Two Column Grid */}
      <div className="grid grid-cols-3 gap-7">
        {/* Main Column (2/3) */}
        <div className="col-span-2 space-y-5">
          {/* Summary / Vision */}
          {summary && !hidden.includes("summary") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
                Creative Vision & Summary
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {summary}
              </p>
            </section>
          )}

          {/* Featured Projects & Case Studies */}
          {projects && projects.length > 0 && !hidden.includes("projects") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" style={{ color: accent }} />
                Featured Projects & Case Studies
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                      {proj.liveUrl && (
                        <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-0.5">
                          {formatDisplayUrl(proj.liveUrl)}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: `${accent}12`, color: accent }}
                          >
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

          {/* Work Experience */}
          {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" style={{ color: accent }} />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[13px]">{exp.jobTitle}</span>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-slate-600 font-medium text-xs mb-1">
                      {exp.company} • {exp.location}
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
        </div>

        {/* Right Sidebar Column (1/3) */}
        <div className="space-y-5">
          {/* Skills & Design Tools */}
          {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                Tools & Capabilities
              </h2>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {cat.categoryName}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills?.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md font-medium text-slate-700 bg-slate-50 border border-slate-200"
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
          {education && education.length > 0 && !hidden.includes("education") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" style={{ color: accent }} />
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-800 text-xs">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                    <div className="text-slate-400 text-[10px]">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </div>
                    {edu.gpa && <div className="text-slate-500 text-[10px]">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                Certifications
              </h2>
              <div className="space-y-2 text-[11px]">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-semibold text-slate-800">{c.name}</div>
                    <div className="text-slate-500 text-[10px]">{c.issuer} ({c.issueDate})</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards && awards.length > 0 && !hidden.includes("awards") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" style={{ color: accent }} />
                Awards
              </h2>
              <div className="space-y-1.5 text-[11px] text-slate-700">
                {awards.map((a) => (
                  <div key={a.id}>
                    <span className="font-semibold">{a.title}</span>
                    <span className="text-slate-500 text-[10px]"> ({a.issuer})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && !hidden.includes("languages") && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-100 pb-1">
                Languages
              </h2>
              <div className="space-y-1 text-[11px] text-slate-700">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium">{l.language}</span>
                    <span className="text-slate-400">{l.proficiency}</span>
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
