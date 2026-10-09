"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getResumes,
  getPortfolios,
  getUserProfile,
  DEFAULT_USER_PROFILE,
  duplicateResume,
  deleteResume,
  deletePortfolio,
} from "@/lib/store/storage";
import { ResumeData } from "@/lib/types/resume";
import { PortfolioData } from "@/lib/types/portfolio";
import { RESUME_TEMPLATES, PORTFOLIO_TEMPLATES } from "@/lib/constants/templates";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  FileText,
  Globe,
  Plus,
  Sparkles,
  ExternalLink,
  Copy,
  Trash2,
  Clock,
  ArrowRight,
  TrendingUp,
  Layout,
  CheckCircle,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [profile, setProfile] = useState(DEFAULT_USER_PROFILE);
  const [deleteModal, setDeleteModal] = useState<{
    type: "resume" | "portfolio";
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const rList = await getResumes();
    const pList = await getPortfolios();
    setResumes(rList);
    setPortfolios(pList);
    setProfile(getUserProfile());
  };

  const handleDuplicate = async (id: string) => {
    const copy = await duplicateResume(id);
    if (copy) {
      await loadData();
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    if (deleteModal.type === "resume") {
      await deleteResume(deleteModal.id);
    } else {
      await deletePortfolio(deleteModal.id);
    }
    setDeleteModal(null);
    await loadData();
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {profile.fullName || "Builder"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your professional resumes, personal portfolio websites, and job application links.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/resumes/new">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              className="shadow-sm shadow-indigo-500/20"
            >
              Create Resume
            </Button>
          </Link>
          <Link href="/dashboard/portfolios/new">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Globe className="w-4 h-4 text-indigo-600" />}
            >
              Create Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Total Resumes</span>
            <FileText className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{resumes.length}</div>
          <p className="text-[11px] text-slate-400">
            {profile.subscription.plan === "pro" ? "Unlimited Pro Resumes" : "2 of 2 Free Resumes used"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Live Portfolios</span>
            <Globe className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {portfolios.filter((p) => p.isPublished).length}
          </div>
          <p className="text-[11px] text-slate-400">
            {portfolios.length} total website projects created
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-indigo-600 text-xs font-semibold uppercase">
            <span>Account Plan</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900 capitalize">
              {profile.subscription.plan} Tier
            </span>
            <Badge variant={profile.subscription.plan === "pro" ? "pro" : "default"} size="sm">
              {profile.subscription.plan.toUpperCase()}
            </Badge>
          </div>
          <Link href="/pricing" className="text-[11px] font-bold text-indigo-600 hover:underline block">
            {profile.subscription.plan === "pro" ? "Manage Subscription →" : "Upgrade to Pro →"}
          </Link>
        </div>
      </div>

      {/* Resumes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">My Resumes</h2>
          </div>
          <Link
            href="/dashboard/resumes"
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            View all ({resumes.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">No resumes yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create your first ATS-friendly resume to start applying for jobs.
            </p>
            <Link href="/dashboard/resumes/new">
              <Button size="sm" variant="primary">Create Resume</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.slice(0, 3).map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary" size="sm">
                      {res.settings?.template.toUpperCase() || "CLASSIC"}
                    </Badge>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(res.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 truncate">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {res.personalInfo.fullName} • {res.personalInfo.jobTitle || "Resume"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(res.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                      title="Duplicate resume"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          type: "resume",
                          id: res.id,
                          title: res.title,
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link href={`/dashboard/resumes/${res.id}`}>
                    <Button variant="primary" size="sm">
                      Open Editor
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Portfolios Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">My Portfolios</h2>
          </div>
          <Link
            href="/dashboard/portfolios"
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            View all ({portfolios.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white space-y-3">
            <Globe className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">No portfolios yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Publish your personal portfolio website with a unique shareable slug.
            </p>
            <Link href="/dashboard/portfolios/new">
              <Button size="sm" variant="primary">Create Portfolio</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.slice(0, 3).map((port) => (
              <div
                key={port.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {port.isPublished ? (
                      <Badge variant="success" size="sm">
                        ● LIVE ONLINE
                      </Badge>
                    ) : (
                      <Badge variant="outline" size="sm">
                        DRAFT
                      </Badge>
                    )}
                    <span className="text-[10px] text-slate-400">
                      /{port.slug}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 truncate">
                    {port.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {port.fullName} • {port.headline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    {port.isPublished && (
                      <a
                        href={`/portfolio/${port.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"
                        title="View live site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          type: "portfolio",
                          id: port.id,
                          title: port.title,
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Delete portfolio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link href={`/dashboard/portfolios/${port.id}`}>
                    <Button variant="primary" size="sm">
                      Edit Website
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModal)}
        onClose={() => setDeleteModal(null)}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteModal?.title}"? This action cannot be undone.`}
        maxWidth="sm"
      >
        <div className="flex justify-end gap-2.5 pt-4">
          <Button variant="outline" size="sm" onClick={() => setDeleteModal(null)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={confirmDelete}>
            Yes, Delete Project
          </Button>
        </div>
      </Modal>
    </div>
  );
}
