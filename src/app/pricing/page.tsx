"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PRICING_PLANS } from "@/lib/constants/pricing";
import { UpgradeModal } from "@/components/payment/UpgradeModal";
import { Check, X, ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const comparisonFeatures = [
    { name: "Active Resume Projects", free: "2 Resumes", pro: "25 Resumes" },
    { name: "Public Portfolios", free: "1 Published", pro: "10 Published" },
    { name: "ATS-Friendly Single Column Template", free: true, pro: true },
    { name: "All 7 Resume Templates", free: "4 Core", pro: "All 7 Templates" },
    { name: "All 4 Portfolio Themes", free: "2 Themes", pro: "All 4 Themes" },
    { name: "High-Res PDF Export", free: "Unlimited", pro: "Unlimited Vector" },
    { name: "AI-Powered Bullet & Summary Rewrite", free: false, pro: true },
    { name: "Custom Palette & Typography Fonts", free: false, pro: true },
    { name: "Portfolio Custom Slug Hosting", free: true, pro: true },
    { name: "Priority Support & Career Review", free: false, pro: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="primary" size="md">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Invest in your next career move
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Everything you need to create standout job applications and personal websites without monthly lock-ins.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between ${
                plan.popular
                  ? "border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/50 to-white shadow-xl relative"
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
                  <span className="text-5xl font-black text-slate-900">
                    ${plan.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-500 font-medium"> / month</span>
                </div>

                <ul className="space-y-3.5 text-xs text-slate-700 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.id === "pro" ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-lg shadow-indigo-500/25"
                  onClick={() => setUpgradeModalOpen(true)}
                >
                  Upgrade to Pro
                </Button>
              ) : (
                <Link href="/dashboard/resumes/new">
                  <Button variant="outline" size="lg" className="w-full justify-center">
                    Get Started Free
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 pb-3 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3">Features & Limits</th>
                  <th className="py-3 px-4">Starter (Free)</th>
                  <th className="py-3 px-4 text-indigo-600">Pro Career</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonFeatures.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3.5 font-medium">{f.name}</td>
                    <td className="py-3.5 px-4">
                      {typeof f.free === "boolean" ? (
                        f.free ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300" />
                        )
                      ) : (
                        <span>{f.free}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {typeof f.pro === "boolean" ? (
                        f.pro ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300" />
                        )
                      ) : (
                        <span>{f.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName="CareerCraft Pro Subscription"
      />

      <Footer />
    </div>
  );
}
