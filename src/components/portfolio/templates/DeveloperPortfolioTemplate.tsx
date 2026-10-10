"use client";

import React from "react";
import { PortfolioData } from "@/lib/types/portfolio";
import {
  Mail,
  ExternalLink,
  Download,
  Terminal,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/Icons";

interface Props {
  data: PortfolioData;
  isPublicView?: boolean;
}

export function DeveloperPortfolioTemplate({ data }: Props) {
  const accent = data.settings?.accentColor || "#6366f1";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            <span className="text-emerald-500 dark:text-emerald-400">&gt;</span>
            <span>{data.slug || "developer"}.dev</span>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              // About
            </a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              // Projects
            </a>
            <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              // Experience
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              // Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-5">
            {data.heroBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                <span>{data.heroBadge}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Hi, I'm <span style={{ color: accent }}>{data.fullName || "Developer"}</span>
            </h1>

            <p className="text-lg sm:text-xl font-mono text-slate-600 dark:text-slate-400 font-medium">
              {data.headline || "Full Stack Software Engineer & Distributed Systems Builder"}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {data.about}
            </p>

            {/* CTAs & Socials */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white transition-all shadow-md"
                style={{ backgroundColor: accent }}
              >
                Get In Touch
              </a>

              {data.settings?.showResumeDownload && (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>Download CV</span>
                </button>
              )}

              <div className="flex items-center gap-2 pl-2">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Avatar */}
          {data.avatarUrl && (
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-3xl blur-lg opacity-40 animate-pulse"
                style={{ backgroundColor: accent }}
              />
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-800 shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Cloud */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-12 border-y border-slate-200 dark:border-slate-900 bg-slate-100/60 dark:bg-slate-900/40 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Technical Arsenal
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl font-mono text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400" /> Featured Projects
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Selected client work, software architectures, and open-source packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 shadow-xs transition-all group"
              >
                <div className="space-y-4">
                  {proj.imageUrl && (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-44 rounded-xl object-cover border border-slate-200 dark:border-slate-800 group-hover:scale-[1.01] transition-transform"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 font-mono text-[11px]">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {data.experiences && data.experiences.length > 0 && (
        <section id="experience" className="py-20 border-t border-slate-200 dark:border-slate-900 px-4 sm:px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-10">
            <Briefcase className="w-6 h-6 text-indigo-500 dark:text-indigo-400" /> Work History
          </h2>

          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 space-y-2 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-mono">
                  <span className="font-bold text-base text-slate-900 dark:text-white">{exp.jobTitle}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                  {exp.company} {exp.location && `// ${exp.location}`}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-5 pt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400 font-sans">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-900 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Let's Connect</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          {data.availabilityStatus || "Have an open role, architectural consulting challenge, or interesting project? My inbox is always open."}
        </p>
        <a
          href={`mailto:${data.email}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-bold text-white shadow-xl hover:scale-105 transition-transform"
          style={{ backgroundColor: accent }}
        >
          <Mail className="w-4 h-4" />
          <span>{data.email || "Email Me"}</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-8 text-center text-xs font-mono text-slate-500 dark:text-slate-500">
        <p>© 2026 {data.fullName}. Published via CareerCraft SaaS.</p>
      </footer>
    </div>
  );
}
