"use client";

import React from "react";
import Link from "next/link";
import { FileText, Heart, ShieldCheck } from "lucide-react";
import { Github, Twitter, Linkedin } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Career<span className="text-indigo-600">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              The modern resume and personal portfolio builder designed for students, freshers, job seekers, and senior professionals to land their dream career moves.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-500 hover:bg-slate-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard/resumes/new" className="hover:text-indigo-600 transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/portfolios/new" className="hover:text-indigo-600 transition-colors">
                  Portfolio Builder
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-indigo-600 transition-colors">
                  Template Gallery
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Templates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Templates
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/templates?type=ats" className="hover:text-indigo-600 transition-colors">
                  ATS Resume Format
                </Link>
              </li>
              <li>
                <Link href="/templates?type=tech" className="hover:text-indigo-600 transition-colors">
                  Software Engineer Resume
                </Link>
              </li>
              <li>
                <Link href="/templates?type=student" className="hover:text-indigo-600 transition-colors">
                  Fresher & College Student
                </Link>
              </li>
              <li>
                <Link href="/templates?type=creative" className="hover:text-indigo-600 transition-colors">
                  UI/UX Designer Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs pt-2">
                <ShieldCheck className="w-4 h-4" />
                <span>ATS & Privacy Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CareerCraft SaaS. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for career builders worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
