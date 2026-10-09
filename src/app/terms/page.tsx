"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: January 2026
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using CareerCraft, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue use of our service.
            </p>

            <h2 className="text-base font-bold text-slate-900">2. User Accounts & Content Responsibility</h2>
            <p>
              You represent that all information entered into resumes and public portfolio websites is truthful and accurate. You are solely responsible for all content published on your public portfolio page.
            </p>

            <h2 className="text-base font-bold text-slate-900">3. Subscriptions & Billing</h2>
            <p>
              Pro subscriptions are billed on a monthly or annual recurring cycle. You may cancel your subscription at any time via your account settings. Refunds are handled in accordance with our 14-day satisfaction policy.
            </p>

            <h2 className="text-base font-bold text-slate-900">4. Applicant Tracking Systems (ATS) Disclaimer</h2>
            <p>
              While CareerCraft templates are structured according to industry ATS best practices and parsable semantic formatting, we cannot guarantee that any specific resume will pass every individual third-party applicant tracking system or secure employment.
            </p>

            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
            <p>
              CareerCraft shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
