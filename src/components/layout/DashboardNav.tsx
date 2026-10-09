"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Globe,
  LayoutDashboard,
  Layers,
  Sparkles,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils/cn";
import { getUserProfile, DEFAULT_USER_PROFILE } from "@/lib/store/storage";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);

  React.useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Resumes", href: "/dashboard/resumes", icon: FileText },
    { label: "My Portfolios", href: "/dashboard/portfolios", icon: Globe },
    { label: "Templates", href: "/templates", icon: Layers },
    { label: "Pricing & Plans", href: "/pricing", icon: Sparkles },
    { label: "Account Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white tracking-tight text-lg">
            Career<span className="text-indigo-600">Craft</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Dashboard Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full p-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 tracking-tight text-lg">
                    Career<span className="text-indigo-600">Craft</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {links.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link href="/dashboard/resumes/new" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full justify-center" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> New Resume
                </Button>
              </Link>
              <Link href="/" className="block text-center text-xs text-slate-500 hover:text-slate-700">
                Back to Homepage
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen p-5 shrink-0 select-none transition-colors">
        {/* Brand & Theme */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Career<span className="text-indigo-600">Craft</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Workspace
              </span>
            </div>
          </Link>
          <ThemeToggle size="sm" />
        </div>

        {/* Quick Actions */}
        <div className="mb-6 space-y-2">
          <Link href="/dashboard/resumes/new" className="block">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-start gap-2 shadow-xs"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create Resume
            </Button>
          </Link>
          <Link href="/dashboard/portfolios/new" className="block">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-slate-700 hover:border-indigo-300"
              leftIcon={<Globe className="w-4 h-4 text-indigo-500" />}
            >
              Create Portfolio
            </Button>
          </Link>
        </div>

        {/* Navigation items */}
        <div className="space-y-1 flex-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </div>
          {links.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-indigo-50/80 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 font-semibold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User / Plan Box */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                {profile.fullName?.charAt(0) || "U"}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {profile.fullName || "User Account"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {profile.subscription?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </p>
              </div>
            </div>
            <Badge
              variant={profile.subscription?.plan === "pro" ? "pro" : "default"}
              size="sm"
            >
              {profile.subscription?.plan === "pro" ? "PRO" : "FREE"}
            </Badge>
          </div>

          <div className="flex items-center justify-between px-1 text-xs text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Public Site
            </Link>
            <Link href="/login" className="hover:text-rose-600 transition-colors flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
