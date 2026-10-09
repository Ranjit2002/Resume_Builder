"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getResumes, deleteResume, duplicateResume } from "@/lib/store/storage";
import { ResumeData } from "@/lib/types/resume";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  FileText,
  Plus,
  Search,
  Copy,
  Trash2,
  Clock,
  Edit,
  Download,
} from "lucide-react";

export default function ResumesListPage() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    const data = await getResumes();
    setResumes(data);
  };

  const handleDuplicate = async (id: string) => {
    const copy = await duplicateResume(id);
    if (copy) await loadResumes();
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    await deleteResume(deleteModal.id);
    setDeleteModal(null);
    await loadResumes();
  };

  const filtered = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo?.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            My Resumes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create tailored versions for different job descriptions and industries.
          </p>
        </div>

        <Link href="/dashboard/resumes/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Resume
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="max-w-md">
        <Input
          placeholder="Search by resume title or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {searchQuery ? "No matching resumes found" : "No resumes in your workspace"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? "Try searching with a different keyword."
              : "Create an ATS-friendly resume to start applying for jobs."}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/resumes/new">
              <Button size="sm" variant="primary">Create Resume</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary" size="sm">
                    {res.settings?.template.toUpperCase() || "CLASSIC"}
                  </Badge>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(res.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {res.personalInfo.fullName} • {res.personalInfo.jobTitle || "Resume"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(res.id)}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
                    title="Duplicate resume"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteModal({ id: res.id, title: res.title })
                    }
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 rounded-lg"
                    title="Delete resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link href={`/dashboard/resumes/${res.id}`}>
                  <Button variant="primary" size="sm" leftIcon={<Edit className="w-3.5 h-3.5" />}>
                    Open Editor
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModal)}
        onClose={() => setDeleteModal(null)}
        title="Delete Resume?"
        description={`Are you sure you want to delete "${deleteModal?.title}"?`}
        maxWidth="sm"
      >
        <div className="flex justify-end gap-2.5 pt-4">
          <Button variant="outline" size="sm" onClick={() => setDeleteModal(null)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
