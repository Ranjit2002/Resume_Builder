"use client";

import React, { Suspense } from "react";
import { DashboardNav } from "@/components/layout/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      <Suspense fallback={<div className="w-64 bg-white min-h-screen border-r border-slate-200" />}>
        <DashboardNav />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading workspace...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
