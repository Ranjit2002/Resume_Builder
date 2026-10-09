"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  FileText,
  Globe,
  Sparkles,
  Layers,
  Menu,
  X,
  ArrowRight,
  User,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Resume Builder", href: "/dashboard/resumes/new", icon: FileText },
    { label: "Portfolio Builder", href: "/dashboard/portfolios/new", icon: Globe },
    { label: "Templates", href: "/templates", icon: Layers },
    { label: "Pricing", href: "/pricing", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Career<span className="text-indigo-600">Craft</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Resume & Portfolio SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-indigo-600 bg-indigo-50/70"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle size="sm" />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/resumes/new">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Build My Resume
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle size="sm" />
            <Link href="/dashboard/resumes/new">
              <Button variant="primary" size="sm">
                Create
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                >
                  <Icon className="w-5 h-5 text-indigo-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-center">
                Dashboard
              </Button>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link
              href="/dashboard/resumes/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button variant="primary" className="w-full justify-center">
                Build My Resume Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
