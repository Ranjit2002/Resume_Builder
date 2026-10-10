"use client";

import React, { useState, useEffect } from "react";
import { getUserProfile, saveUserProfile, DEFAULT_USER_PROFILE } from "@/lib/store/storage";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { UserProfile } from "@/lib/types/subscription";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UpgradeModal } from "@/components/payment/UpgradeModal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils/cn";
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
  Palette,
  Sun,
  Moon,
} from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
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

      {/* Appearance & Theme Preferences */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Appearance & Theme
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Customize CareerCraft's workspace appearance to reduce eye strain.
              </p>
            </div>
          </div>
          <Badge variant={mounted && theme === "dark" ? "pro" : "default"} size="sm">
            {mounted && theme === "dark" ? "DARK MODE" : "LIGHT MODE"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer",
              (!mounted || theme === "light")
                ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
            )}
          >
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Light Mode</span>
                {(!mounted || theme === "light") && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Bright, crisp contrast optimized for daytime reading, writing, and PDF reviewing.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer",
              (mounted && theme === "dark")
                ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
            )}
          >
            <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-300 shrink-0 border border-indigo-800">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Dark Mode</span>
                {mounted && theme === "dark" && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Sleek, low-glare deep dark theme tailored for nighttime drafting and focused editing.
              </p>
            </div>
          </button>
        </div>
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
            variant={mounted && profile.subscription?.plan === "pro" ? "pro" : "default"}
            size="md"
          >
            {(mounted ? profile.subscription?.plan : "free")?.toUpperCase()} PLAN
          </Badge>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white capitalize">
              {(mounted ? profile.subscription?.plan : "free")} Membership
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {(mounted && profile.subscription?.plan === "pro")
                ? "Full access to all 7 resume templates, 4 portfolio themes, and AI writing assistance."
                : "Basic access with up to 2 resumes and 1 public portfolio."}
            </p>
          </div>

          <Button
            variant={mounted && profile.subscription?.plan === "pro" ? "outline" : "primary"}
            size="sm"
            onClick={() => setUpgradeModalOpen(true)}
          >
            {mounted && profile.subscription?.plan === "pro"
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
