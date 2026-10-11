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
  UserCheck,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "@/lib/utils/cn";
import { getUserProfile, DEFAULT_USER_PROFILE } from "@/lib/store/storage";

export function DashboardNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);
  const { theme, mounted: themeMounted } = useTheme();

  const isDark = themeMounted ? theme === "dark" : false;

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
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full p-5 flex flex-col justify-between overflow-y-auto shadow-xl border-r border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tracking-tight text-lg">
                    Career<span className="text-indigo-600 dark:text-indigo-400">Craft</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
                          ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 shrink-0">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors",
                      isDark ? "bg-amber-400/10 text-amber-400" : "bg-indigo-50 text-indigo-600"
                    )}
                  >
                    {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <ThemeToggle variant="pill" size="sm" />
              </div>

              <div className="flex flex-col gap-2.5">
                <Link href="/dashboard/resumes/new" onClick={() => setMobileOpen(false)} className="block w-full">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-indigo-500/20 font-semibold"
                    leftIcon={<Plus className="w-4 h-4 shrink-0" />}
                  >
                    New Resume
                  </Button>
                </Link>

                <Link href="/" onClick={() => setMobileOpen(false)} className="block w-full">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center gap-2 font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 shadow-2xs transition-colors"
                    leftIcon={<Home className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />}
                  >
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen p-5 shrink-0 select-none transition-colors">
        {/* Brand */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Career<span className="text-indigo-600 dark:text-indigo-400">Craft</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase -mt-1">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 space-y-2">
          <Link href="/dashboard/resumes/new" className="block">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-start gap-2 shadow-xs font-semibold"
              leftIcon={<Plus className="w-4 h-4 shrink-0" />}
            >
              New Resume
            </Button>
          </Link>
          <Link href="/dashboard/portfolios/new" className="block">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500"
              leftIcon={<Globe className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
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
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors",
                  isDark ? "bg-amber-400/10 text-amber-400" : "bg-indigo-50 text-indigo-600"
                )}
              >
                {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <ThemeToggle variant="pill" size="sm" />
          </div>

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

          <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-medium" title="Return to CareerCraft Homepage">
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>Back to Homepage</span>
            </Link>
            <Link href="/login" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 font-medium">
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
