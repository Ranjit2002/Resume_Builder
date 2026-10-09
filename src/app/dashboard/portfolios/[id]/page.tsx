"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { getPortfolioById, getUserProfile } from "@/lib/store/storage";
import { PortfolioData } from "@/lib/types/portfolio";
import { PortfolioEditor } from "@/components/portfolio/PortfolioEditor";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function PortfolioEditorInner() {
  const params = useParams();
  const id = params?.id as string;

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const profile = getUserProfile();

  useEffect(() => {
    if (!id) return;
    const fetchPortfolio = async () => {
      const found = await getPortfolioById(id);
      if (found) {
        setPortfolio(found);
      }
      setLoading(false);
    };
    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span>Loading portfolio workspace...</span>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Portfolio Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested portfolio could not be located in your workspace.
        </p>
        <Link href="/dashboard/portfolios">
          <Button variant="primary" size="sm">
            Back to Portfolios
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <PortfolioEditor
      initialPortfolio={portfolio}
      userPlan={profile.subscription?.plan || "free"}
    />
  );
}

export default function PortfolioEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        </div>
      }
    >
      <PortfolioEditorInner />
    </Suspense>
  );
}
