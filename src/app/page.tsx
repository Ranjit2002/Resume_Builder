"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RESUME_TEMPLATES, PORTFOLIO_TEMPLATES } from "@/lib/constants/templates";
import { PRICING_PLANS } from "@/lib/constants/pricing";
import { SAMPLE_RESUME } from "@/lib/constants/sample-data";
import { ResumeTemplateDispatcher } from "@/components/resume/templates/ResumeTemplateDispatcher";
import {
  FileText,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Download,
  Check,
  ChevronDown,
  Layers,
  Code2,
  Award,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePreviewTab, setActivePreviewTab] = useState<"resume" | "portfolio">("resume");

  const faqs = [
    {
      q: "Are the resumes truly ATS-friendly?",
      a: "Yes! CareerCraft includes a dedicated single-column ATS-Optimized template built with clean semantic HTML headings and selectable text. We format bullet points, dates, and contact blocks specifically for parsers like Workday, Greenhouse, Taleo, and Lever.",
    },
    {
      q: "Can I publish my personal portfolio with a custom URL?",
      a: "Absolutely. Every portfolio you create gets an instant public slug (for example, /portfolio/your-name). You can share this link on LinkedIn, job applications, or directly with recruiters.",
    },
    {
      q: "Can I switch templates without losing my resume data?",
      a: "Yes! All your information, work history, projects, and custom bullet points remain completely intact when switching between any of our 7 resume templates or 4 portfolio themes.",
    },
    {
      q: "How does the AI writing assistant work?",
      a: "Our AI assistant helps you rewrite bullet points using high-impact action verbs (such as Spearheaded, Orchestrated, Engineered) and structure your achievements. It never invents fake degrees or companies.",
    },
    {
      q: "Is there a free plan available?",
      a: "Yes! Our Starter plan is 100% free forever, including 2 resumes, 1 published portfolio, core templates, and unlimited PDF exports.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-400/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Gen Career Launchpad for 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Build Your Resume. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Showcase Your Potential.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create a professional, ATS-friendly resume and a stunning personal portfolio website in minutes. No design or coding skills required.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/dashboard/resumes/new" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-indigo-600/25 px-8"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create My Resume Free
              </Button>
            </Link>

            <Link href="/templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 bg-white hover:bg-slate-50"
                leftIcon={<Layers className="w-4 h-4 text-slate-500" />}
              >
                Explore Templates
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Real-Time Live Editing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% ATS-Friendly Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Instant High-Res PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No Credit Card Required</span>
            </div>
          </div>

          {/* Hero Visual Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-5 shadow-2xl shadow-indigo-500/10">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    careercraft.dev/studio
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePreviewTab("resume")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activePreviewTab === "resume"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Resume Preview
                  </button>
                  <button
                    onClick={() => setActivePreviewTab("portfolio")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activePreviewTab === "portfolio"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Portfolio Preview
                  </button>
                </div>
              </div>

              <div className="h-[480px] sm:h-[560px] overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 relative">
                {activePreviewTab === "resume" ? (
                  <div className="p-4 sm:p-8 transform scale-[0.68] sm:scale-[0.82] origin-top max-w-[850px] mx-auto pointer-events-none">
                    <ResumeTemplateDispatcher data={SAMPLE_RESUME} />
                  </div>
                ) : (
                  <div className="p-6 sm:p-12 text-left bg-slate-950 text-white h-full flex flex-col justify-between overflow-hidden">
                    <div className="space-y-4">
                      <Badge variant="pro" size="sm">
                        Live Public Profile
                      </Badge>
                      <h2 className="text-3xl sm:text-5xl font-black">
                        Alex Rivera
                      </h2>
                      <p className="text-slate-400 font-mono text-sm max-w-xl">
                        Senior Full Stack Engineer & Systems Architect. Scaling cloud-native web apps to millions of users.
                      </p>
                      <div className="flex gap-2 pt-2">
                        <span className="bg-slate-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded">
                          React 19
                        </span>
                        <span className="bg-slate-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded">
                          Next.js
                        </span>
                        <span className="bg-slate-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded">
                          TypeScript
                        </span>
                        <span className="bg-slate-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded">
                          PostgreSQL
                        </span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Public Link: careercraft.dev/portfolio/alex-rivera</span>
                      <Link href="/portfolio/alex-rivera">
                        <span className="text-indigo-400 font-bold hover:underline">
                          View Live Page →
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Effortless Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              From blank page to dream job in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-md shadow-indigo-500/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Choose a Tailored Template
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pick from 7 recruiter-tested resume formats and 4 portfolio designs suited for developers, designers, freshers, or executives.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-md shadow-indigo-500/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Add Your Experience & AI Polish
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fill your details in the split-screen editor. Use the AI writing assistant to rewrite bullets with strong action verbs and metrics.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-md shadow-indigo-500/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Download PDF & Publish Online
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Export pixel-perfect A4 PDF documents ready for job portals, and publish your personal portfolio website with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Templates Gallery Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Template Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Crafted for every career path
            </h2>
          </div>
          <Link href="/templates">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 11 Templates
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME_TEMPLATES.slice(0, 6).map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {tmpl.category}
                  </span>
                  {tmpl.isPro ? (
                    <Badge variant="pro" size="sm">PRO</Badge>
                  ) : (
                    <Badge variant="default" size="sm">FREE</Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{tmpl.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {tmpl.accentColors.map((c, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-slate-200"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <Link href={`/dashboard/resumes/new?template=${tmpl.id}`}>
                  <span className="text-xs font-bold text-indigo-600 hover:underline">
                    Use Template →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Comparison Preview */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Simple, Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Start free, upgrade as you grow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl border flex flex-col justify-between ${
                  plan.popular
                    ? "border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/40 to-white shadow-xl relative"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                    {plan.popular && <Badge variant="pro" size="sm">MOST POPULAR</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mb-6">{plan.tagline}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-black text-slate-900">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={plan.id === "pro" ? "/pricing" : "/dashboard/resumes/new"}>
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full justify-center"
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pre-Footer CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to build a career-defining resume?
          </h2>
          <p className="text-indigo-200 text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of job seekers who landed interviews at top tech companies, startups, and enterprises.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/resumes/new">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-indigo-950 hover:bg-slate-100 font-bold shadow-xl"
              >
                Build My Resume Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
