"use client";

import React from "react";
import { ResumeData } from "@/lib/types/resume";
import { formatDisplayUrl } from "@/lib/utils/format";
import { Mail, Phone, MapPin, Globe, Award, Shield, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/Icons";

interface Props {
  data: ResumeData;
  badgeTitle?: string;
  summaryTitle?: string;
}

export function ExecutiveLeadershipLayout({
  data,
  badgeTitle,
  summaryTitle = "Executive Value Proposition",
}: Props) {
  const { personalInfo, summary, experiences, education, skillCategories, awards, certifications, languages, settings } = data;
  const accent = settings.accentColor || "#0f172a";
  const hidden = settings.hiddenSections || [];

  return (
    <div className="bg-white text-slate-900 font-sans text-xs leading-relaxed w-full min-h-full p-10 shadow-sm border border-slate-200 box-border">
      {/* Executive Masthead */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: accent }}>
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex-1">
            {badgeTitle && (
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded inline-block mb-1 text-white"
                style={{ backgroundColor: accent }}
              >
                {badgeTitle}
              </span>
            )}
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-bold tracking-wider uppercase mt-0.5" style={{ color: accent }}>
              {personalInfo.jobTitle || "Chief Executive Officer / VP of Engineering"}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600 text-xs pt-2">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                  {formatDisplayUrl(personalInfo.linkedin)}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {formatDisplayUrl(personalInfo.website)}
                </span>
              )}
            </div>
          </div>

          {/* Optional Profile Photo */}
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                crossOrigin="anonymous"
                className="w-24 h-24 rounded-2xl object-cover border-2 shadow-md"
                style={{ borderColor: accent }}
              />
            </div>
          )}
        </div>
      </header>

      <div className="space-y-5">
        {/* Executive Profile */}
        {summary && !hidden.includes("summary") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: accent }}
            >
              {summaryTitle}
            </h2>
            <p className="text-slate-800 text-[12px] leading-relaxed text-justify bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
              {summary}
            </p>
          </section>
        )}

        {/* Executive Competencies Grid */}
        {skillCategories && skillCategories.length > 0 && !hidden.includes("skills") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b border-slate-200"
              style={{ color: accent }}
            >
              Strategic & Core Competencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {skillCategories.flatMap((cat) => cat.skills || []).map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-800 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Leadership Experience */}
        {experiences && experiences.length > 0 && !hidden.includes("experiences") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b border-slate-200"
              style={{ color: accent }}
            >
              Leadership History & Milestone Achievements
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3.5 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                    <span className="text-[13px]">{exp.jobTitle}</span>
                    <span className="text-slate-500 font-semibold text-[11px] whitespace-nowrap">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 font-semibold text-xs mb-1.5">
                    {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-700 leading-relaxed text-[11px]">
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

        {/* Credentials & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {education && education.length > 0 && !hidden.includes("education") && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
                style={{ color: accent }}
              >
                Education & Credentials
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-xs">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution} • {edu.location}</div>
                    <div className="text-slate-400 text-[10px]">
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && !hidden.includes("certifications") && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
                style={{ color: accent }}
              >
                Board Certifications & Licensure
              </h2>
              <div className="space-y-1.5 text-slate-700 text-xs">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-slate-500 text-[11px]"> — {c.issuer} ({c.issueDate})</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Board Appointments / Awards */}
        {awards && awards.length > 0 && !hidden.includes("awards") && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200"
              style={{ color: accent }}
            >
              Honors, Awards & Board Appointments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {awards.map((a) => (
                <div key={a.id} className="p-2 rounded bg-slate-50 border border-slate-200/60">
                  <span className="font-bold text-slate-900">{a.title}</span>
                  <span className="text-slate-500 text-[11px] block">{a.issuer} ({a.date})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
