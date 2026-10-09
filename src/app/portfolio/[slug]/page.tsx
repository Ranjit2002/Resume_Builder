"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPortfolioBySlug } from "@/lib/store/storage";
import { PortfolioData } from "@/lib/types/portfolio";
import { PortfolioTemplateDispatcher } from "@/components/portfolio/templates/PortfolioTemplateDispatcher";
import { Button } from "@/components/ui/Button";
import { Globe, Loader2 } from "lucide-react";

function PublicPortfolioInner() {
  const params = useParams();
  const slug = params?.slug as string;

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPublicPortfolio = async () => {
      const found = await getPortfolioBySlug(slug);
      if (found) {
        setPortfolio(found);
      }
      setLoading(false);
    };
    fetchPublicPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3 text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        <span>Loading portfolio profile...</span>
      </div>
    );
  }

  // Custom Not-Found / Unpublished page
  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-6 shadow-xl">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Portfolio Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
          The public portfolio at <code className="text-indigo-400 font-mono">/portfolio/{slug}</code> is either currently unpublished or does not exist.
        </p>

        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline" size="md" className="border-slate-800 text-slate-300 hover:bg-slate-900">
              Back to CareerCraft
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="md">
              Go to Workspace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PortfolioTemplateDispatcher data={portfolio} isPublicView={true} />
    </main>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
      }
    >
      <PublicPortfolioInner />
    </Suspense>
  );
}
