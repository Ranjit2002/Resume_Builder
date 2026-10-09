"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: January 2026
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When using CareerCraft, you provide resume and portfolio data including your name, contact details, work experience, education, projects, and skills. We treat your personal career information with maximum security.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. How Your Data is Stored</h2>
            <p>
              Your data is stored either in your authenticated Supabase database instance with Row Level Security (RLS) enabled or locally in your browser storage. Users exclusively own and control their private resumes and unpublished portfolios.
            </p>

            <h2 className="text-base font-bold text-slate-900">3. Public Portfolios</h2>
            <p>
              Portfolios that you explicitly mark as "Published" generate a publicly viewable web page at your chosen slug. Unpublished drafts remain strictly private to your account.
            </p>

            <h2 className="text-base font-bold text-slate-900">4. AI Writing Features</h2>
            <p>
              When utilizing our AI writing assistant, only the draft text snippet you submit for optimization is processed. We do not sell or utilize your resume data to train public foundation models.
            </p>

            <h2 className="text-base font-bold text-slate-900">5. Contact Us</h2>
            <p>
              If you have any questions or data removal requests, contact our privacy officer at privacy@careercraft.dev.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
