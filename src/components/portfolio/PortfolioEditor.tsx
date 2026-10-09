"use client";

import React, { useState, useRef } from "react";
import { PortfolioData, PortfolioProject } from "@/lib/types/portfolio";
import { savePortfolio } from "@/lib/store/storage";
import { PORTFOLIO_TEMPLATES } from "@/lib/constants/templates";
import { slugify, isValidSlug } from "@/lib/utils/slug";
import { PortfolioTemplateDispatcher } from "./templates/PortfolioTemplateDispatcher";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import confetti from "canvas-confetti";
import {
  Globe,
  User,
  FolderGit2,
  Sliders,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Eye,
  Edit3,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PortfolioEditorProps {
  initialPortfolio: PortfolioData;
  userPlan?: string;
}

export function PortfolioEditor({
  initialPortfolio,
  userPlan = "free",
}: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolio);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [copiedLink, setCopiedLink] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate = (updated: PortfolioData) => {
    setPortfolio(updated);
    setSaveStatus("unsaved");

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await savePortfolio(updated);
        setSaveStatus("saved");
      } catch (err) {
        setSaveStatus("unsaved");
      }
    }, 1200);
  };

  const handleSlugChange = (rawSlug: string) => {
    const formatted = slugify(rawSlug);
    if (formatted && !isValidSlug(formatted)) {
      setSlugError("Slug must be 3-48 characters, lowercase alphanumeric with hyphens.");
    } else {
      setSlugError(null);
    }
    handleUpdate({ ...portfolio, slug: formatted });
  };

  const handlePublishToggle = (isPublished: boolean) => {
    if (!isValidSlug(portfolio.slug)) {
      setSlugError("Please enter a valid slug before publishing.");
      return;
    }
    handleUpdate({
      ...portfolio,
      isPublished,
      publishedAt: isPublished ? new Date().toISOString() : undefined,
    });

    if (isPublished) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const publicUrl = `${origin}/portfolio/${portfolio.slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Projects Helpers
  const addProject = () => {
    const newProj: PortfolioProject = {
      id: `p-proj-${Date.now()}`,
      title: "",
      description: "",
      tags: [],
      liveUrl: "",
      githubUrl: "",
      featured: true,
    };
    handleUpdate({
      ...portfolio,
      projects: [...(portfolio.projects || []), newProj],
    });
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    handleUpdate({
      ...portfolio,
      projects: portfolio.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    });
  };

  const removeProject = (id: string) => {
    handleUpdate({
      ...portfolio,
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={portfolio.title}
            onChange={(e) =>
              handleUpdate({ ...portfolio, title: e.target.value })
            }
            className="text-base sm:text-lg font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none px-1 py-0.5 max-w-[200px] sm:max-w-md truncate"
            title="Click to rename portfolio"
          />

          <div className="hidden sm:flex items-center gap-2">
            {portfolio.isPublished ? (
              <Badge variant="success" size="sm">
                ● Live Public
              </Badge>
            ) : (
              <Badge variant="outline" size="sm">
                Draft (Unpublished)
              </Badge>
            )}

            {saveStatus === "saving" && (
              <span className="text-xs text-indigo-600 flex items-center gap-1 font-medium">
                <Save className="w-3.5 h-3.5" /> Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Saved
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Edit/Preview Toggle */}
          <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setMobileView("edit")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1",
                mobileView === "edit"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500"
              )}
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1",
                mobileView === "preview"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500"
              )}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>

          {portfolio.isPublished && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            >
              {copiedLink ? "Copied!" : "Copy URL"}
            </Button>
          )}

          <Button
            variant={portfolio.isPublished ? "outline" : "primary"}
            size="sm"
            onClick={() => handlePublishToggle(!portfolio.isPublished)}
            leftIcon={<Globe className="w-4 h-4" />}
          >
            {portfolio.isPublished ? "Unpublish" : "Publish Site"}
          </Button>

          {portfolio.isPublished && (
            <a
              href={`/portfolio/${portfolio.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                View Live
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL: Portfolio Editor Form */}
        <section
          className={cn(
            "w-full lg:w-1/2 lg:max-w-2xl bg-white border-r border-slate-200/80 flex flex-col h-[calc(100vh-65px)] overflow-hidden",
            mobileView === "preview" && "hidden lg:flex"
          )}
        >
          {/* Section Tabs */}
          <div className="border-b border-slate-200 px-4 py-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 bg-white">
            {[
              { id: "general", label: "Profile & Bio", icon: User },
              { id: "projects", label: "Featured Projects", icon: FolderGit2 },
              { id: "publish", label: "Domain & Publish", icon: Globe },
              { id: "theme", label: "Themes & Style", icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* General Profile Tab */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Alex Rivera"
                    value={portfolio.fullName || ""}
                    onChange={(e) =>
                      handleUpdate({ ...portfolio, fullName: e.target.value })
                    }
                  />
                  <Input
                    label="Professional Headline"
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={portfolio.headline || ""}
                    onChange={(e) =>
                      handleUpdate({ ...portfolio, headline: e.target.value })
                    }
                  />
                </div>

                <Textarea
                  label="About Me (Bio)"
                  rows={4}
                  placeholder="Introduce yourself, what problems you solve, and what you're passionate about..."
                  value={portfolio.about || ""}
                  onChange={(e) =>
                    handleUpdate({ ...portfolio, about: e.target.value })
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Location / Availability Headline"
                    placeholder="San Francisco, CA • Open to Remote"
                    value={portfolio.location || ""}
                    onChange={(e) =>
                      handleUpdate({ ...portfolio, location: e.target.value })
                    }
                  />
                  <Input
                    label="Hero Badge Status"
                    placeholder="e.g. Available for new roles"
                    value={portfolio.heroBadge || ""}
                    onChange={(e) =>
                      handleUpdate({ ...portfolio, heroBadge: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Avatar / Profile Picture URL"
                  placeholder="https://images.unsplash.com/..."
                  value={portfolio.avatarUrl || ""}
                  onChange={(e) =>
                    handleUpdate({ ...portfolio, avatarUrl: e.target.value })
                  }
                />

                {/* Social links */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Contact & Social Handles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Contact Email"
                      value={portfolio.email || ""}
                      onChange={(e) =>
                        handleUpdate({ ...portfolio, email: e.target.value })
                      }
                    />
                    <Input
                      label="GitHub URL"
                      placeholder="https://github.com/username"
                      value={portfolio.github || ""}
                      onChange={(e) =>
                        handleUpdate({ ...portfolio, github: e.target.value })
                      }
                    />
                    <Input
                      label="LinkedIn URL"
                      placeholder="https://linkedin.com/in/username"
                      value={portfolio.linkedin || ""}
                      onChange={(e) =>
                        handleUpdate({ ...portfolio, linkedin: e.target.value })
                      }
                    />
                    <Input
                      label="Twitter / X"
                      placeholder="https://twitter.com/username"
                      value={portfolio.twitter || ""}
                      onChange={(e) =>
                        handleUpdate({ ...portfolio, twitter: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Skills tags */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <Input
                    label="Skills & Tech Stack (comma separated)"
                    placeholder="TypeScript, React, Next.js, Node.js, PostgreSQL, Docker"
                    value={portfolio.skills?.join(", ") || ""}
                    onChange={(e) =>
                      handleUpdate({
                        ...portfolio,
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Featured Projects Tab */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Portfolio Showcase Projects
                    </h3>
                    <p className="text-xs text-slate-500">
                      Highlight your best work with live demo links and screenshots.
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addProject}
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Add Project
                  </Button>
                </div>

                {(!portfolio.projects || portfolio.projects.length === 0) ? (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
                    <p className="text-xs text-slate-500 mb-3">No showcase projects added.</p>
                    <Button size="sm" onClick={addProject} leftIcon={<Plus className="w-4 h-4" />}>
                      Add First Project
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {portfolio.projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-slate-900">
                            {proj.title || `Project #${idx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeProject(proj.id)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <Input
                          label="Project Title"
                          value={proj.title}
                          onChange={(e) =>
                            updateProject(proj.id, { title: e.target.value })
                          }
                        />

                        <Textarea
                          label="Description"
                          rows={2}
                          value={proj.description}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              description: e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Cover Image URL (Optional)"
                          placeholder="https://images.unsplash.com/..."
                          value={proj.imageUrl || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              imageUrl: e.target.value,
                            })
                          }
                        />

                        <Input
                          label="Tags / Technologies (comma separated)"
                          placeholder="Next.js, TypeScript, Tailwind"
                          value={proj.tags?.join(", ") || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              tags: e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            })
                          }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Live App / Demo URL"
                            placeholder="https://..."
                            value={proj.liveUrl || ""}
                            onChange={(e) =>
                              updateProject(proj.id, {
                                liveUrl: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="GitHub Repository"
                            placeholder="https://github.com/..."
                            value={proj.githubUrl || ""}
                            onChange={(e) =>
                              updateProject(proj.id, {
                                githubUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Domain & Publish Tab */}
            {activeTab === "publish" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    Public Portfolio URL & Slug
                  </h4>
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    Your portfolio is accessible publicly at your unique username or slug.
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200 shrink-0">
                      /portfolio/
                    </span>
                    <input
                      type="text"
                      value={portfolio.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="your-name"
                      className="w-full text-xs font-mono rounded-xl border border-slate-200 px-3.5 py-2 text-slate-900 bg-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {slugError && (
                    <p className="text-xs text-rose-600 font-medium">{slugError}</p>
                  )}
                </div>

                {/* Publish Switch */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Publication Status
                      </h4>
                      <p className="text-xs text-slate-500">
                        {portfolio.isPublished
                          ? "Your website is currently live and visible to the world."
                          : "Your website is in draft mode and only visible to you."}
                      </p>
                    </div>
                    <Switch
                      checked={portfolio.isPublished}
                      onChange={handlePublishToggle}
                    />
                  </div>

                  {portfolio.isPublished && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-600">
                        Live at: /portfolio/{portfolio.slug}
                      </span>
                      <a
                        href={`/portfolio/${portfolio.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        Visit Page <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* SEO Settings */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    SEO & Meta Tags
                  </h4>
                  <Input
                    label="Page Meta Title"
                    value={portfolio.seoTitle || ""}
                    onChange={(e) =>
                      handleUpdate({ ...portfolio, seoTitle: e.target.value })
                    }
                    placeholder="e.g. Alex Rivera | Senior Full Stack Engineer"
                  />
                  <Textarea
                    label="Page Meta Description"
                    rows={2}
                    value={portfolio.seoDescription || ""}
                    onChange={(e) =>
                      handleUpdate({
                        ...portfolio,
                        seoDescription: e.target.value,
                      })
                    }
                    placeholder="Brief description for Google search results..."
                  />
                </div>
              </div>
            )}

            {/* Themes & Style Tab */}
            {activeTab === "theme" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                    Select Portfolio Theme
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PORTFOLIO_TEMPLATES.map((tmpl) => {
                      const isSelected = portfolio.settings?.template === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() =>
                            handleUpdate({
                              ...portfolio,
                              settings: {
                                ...portfolio.settings,
                                template: tmpl.id,
                              },
                            })
                          }
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-xs text-slate-900">
                              {tmpl.name}
                            </h4>
                            {tmpl.badge && (
                              <Badge variant={tmpl.isPro ? "pro" : "primary"} size="sm">
                                {tmpl.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mb-2">
                            {tmpl.description}
                          </p>
                          <div className="text-[10px] text-slate-400">
                            Best for: {tmpl.bestFor}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <Switch
                    checked={portfolio.settings?.showResumeDownload ?? true}
                    onChange={(checked) =>
                      handleUpdate({
                        ...portfolio,
                        settings: {
                          ...portfolio.settings,
                          showResumeDownload: checked,
                        },
                      })
                    }
                    label="Show Resume Download Button"
                    description="Allow visitors to download your CV directly from the portfolio header"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT PANEL: Live Preview of Selected Portfolio Theme */}
        <section
          className={cn(
            "flex-1 bg-slate-900 p-2 sm:p-6 flex flex-col h-[calc(100vh-65px)] overflow-y-auto relative",
            mobileView === "edit" && "hidden lg:flex"
          )}
        >
          <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
            <PortfolioTemplateDispatcher data={portfolio} />
          </div>
        </section>
      </div>
    </div>
  );
}
