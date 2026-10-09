"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPortfolios, deletePortfolio } from "@/lib/store/storage";
import { PortfolioData } from "@/lib/types/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  Globe,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Clock,
  Edit,
  Copy,
  Check,
} from "lucide-react";

export default function PortfoliosListPage() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    const list = await getPortfolios();
    setPortfolios(list);
  };

  const handleCopy = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/portfolio/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const confirmDelete = async () => {
    if (!deleteModal) return;
    await deletePortfolio(deleteModal.id);
    setDeleteModal(null);
    await loadPortfolios();
  };

  const filtered = portfolios.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Portfolios
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Personal portfolio websites published with shareable unique slugs.
          </p>
        </div>

        <Link href="/dashboard/portfolios/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Portfolio
          </Button>
        </Link>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search by title or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white space-y-3">
          <Globe className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">
            {searchQuery ? "No matching portfolios found" : "No portfolios in your workspace"}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Build and launch a personal developer or designer portfolio in minutes.
          </p>
          {!searchQuery && (
            <Link href="/dashboard/portfolios/new">
              <Button size="sm" variant="primary">Create Portfolio</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((port) => (
            <div
              key={port.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
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
                  <span className="text-[10px] text-slate-400 font-mono">
                    /{port.slug}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 truncate">
                  {port.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 truncate">
                  {port.fullName} • {port.headline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  {port.isPublished && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCopy(port.slug)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                        title="Copy shareable link"
                      >
                        {copiedSlug === port.slug ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`/portfolio/${port.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"
                        title="Open live website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteModal({ id: port.id, title: port.title })
                    }
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Delete portfolio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link href={`/dashboard/portfolios/${port.id}`}>
                  <Button variant="primary" size="sm" leftIcon={<Edit className="w-3.5 h-3.5" />}>
                    Edit Site
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={Boolean(deleteModal)}
        onClose={() => setDeleteModal(null)}
        title="Delete Portfolio?"
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
