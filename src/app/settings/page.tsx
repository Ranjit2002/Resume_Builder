"use client";

import React, { useState, useEffect } from "react";
import { getUserProfile, saveUserProfile } from "@/lib/store/storage";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { UserProfile } from "@/lib/types/subscription";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UpgradeModal } from "@/components/payment/UpgradeModal";
import {
  User,
  ShieldCheck,
  CreditCard,
  Database,
  Sparkles,
  Key,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  useEffect(() => {
    const p = getUserProfile();
    setProfile(p);
    setFullName(p.fullName || "");
    setEmail(p.email || "");
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveUserProfile({ fullName, email });
    setProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Account & Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal profile, subscription tier, and system integrations.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Personal Profile
        </h2>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Rivera"
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Subscription Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Subscription & Plan
            </h2>
          </div>
          <Badge
            variant={profile.subscription?.plan === "pro" ? "pro" : "default"}
            size="md"
          >
            {profile.subscription?.plan?.toUpperCase()} PLAN
          </Badge>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white capitalize">
              {profile.subscription?.plan} Membership
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {profile.subscription?.plan === "pro"
                ? "Full access to all 7 resume templates, 4 portfolio themes, and AI writing assistance."
                : "Basic access with up to 2 resumes and 1 public portfolio."}
            </p>
          </div>

          <Button
            variant={profile.subscription?.plan === "pro" ? "outline" : "primary"}
            size="sm"
            onClick={() => setUpgradeModalOpen(true)}
          >
            {profile.subscription?.plan === "pro"
              ? "Change Subscription"
              : "Upgrade to Pro ($12/mo)"}
          </Button>
        </div>
      </div>

      {/* Environment Integration Health Check */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Cloud Services & Integrations Status
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 -mt-4">
          CareerCraft includes transparent local-first fallbacks. Connect your external keys in <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono">.env.local</code> to activate live cloud services.
        </p>

        <div className="space-y-3">
          {/* Supabase Status */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  Supabase PostgreSQL & Auth
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {hasSupabase
                    ? "Connected with active URL & Anon Key"
                    : "Running on Persistent Local-First Storage Engine"}
                </span>
              </div>
            </div>
            <Badge variant={hasSupabase ? "success" : "default"} size="sm">
              {hasSupabase ? "CONNECTED" : "OFFLINE / LOCAL"}
            </Badge>
          </div>

          {/* Gemini AI Status */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  Google Gemini AI Assistant
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Configured via GEMINI_API_KEY with built-in heuristic rule-based assistant
                </span>
              </div>
            </div>
            <Badge variant="primary" size="sm">
              ACTIVE
            </Badge>
          </div>

          {/* Razorpay Status */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  Razorpay Payment Gateway
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Server-side cryptographic order verification & Sandbox test mode
                </span>
              </div>
            </div>
            <Badge variant="warning" size="sm">
              SANDBOX TEST
            </Badge>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName="CareerCraft Pro Subscription"
      />
    </div>
  );
}
