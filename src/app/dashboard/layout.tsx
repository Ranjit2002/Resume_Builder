"use client";

import React, { Suspense } from "react";
import { DashboardNav } from "@/components/layout/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Suspense fallback={<div className="w-64 bg-white dark:bg-slate-900 min-h-screen border-r border-slate-200 dark:border-slate-800" />}>
        <DashboardNav />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<div className="p-8 text-center text-slate-500 dark:text-slate-400">Loading workspace...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
