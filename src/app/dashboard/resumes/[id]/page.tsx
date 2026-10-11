"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { getResumeById, getUserProfile, DEFAULT_USER_PROFILE, isUserPro } from "@/lib/store/storage";
import { ResumeData } from "@/lib/types/resume";
import { UserProfile } from "@/lib/types/subscription";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function ResumeEditorInner() {
  const params = useParams();
  const id = params?.id as string;

  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  useEffect(() => {
    if (!id) return;
    const fetchResume = async () => {
      const found = await getResumeById(id);
      if (found) {
        setResume(found);
      }
      setProfile(getUserProfile());
      setLoading(false);
    };
    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500 text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span>Loading resume workspace...</span>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Resume Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested resume could not be located in your workspace.
        </p>
        <Link href="/dashboard/resumes">
          <Button variant="primary" size="sm">
            Back to Resumes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ResumeEditor
      initialResume={resume}
      userPlan={isUserPro(profile) ? "pro" : "free"}
    />
  );
}

export default function ResumeEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        </div>
      }
    >
      <ResumeEditorInner />
    </Suspense>
  );
}
