import { NextRequest, NextResponse } from "next/server";
import { isPaidTemplate, getTemplateMeta } from "@/lib/constants/templates";
import { ResumeTemplateId } from "@/lib/types/resume";

export async function POST(req: NextRequest) {
  try {
    const { templateId, userPlan } = await req.json();

    const isPaid = isPaidTemplate(templateId as ResumeTemplateId);

    // If free template, anyone can export
    if (!isPaid) {
      return NextResponse.json({
        allowed: true,
        isPaid: false,
      });
    }

    // If paid template, server verifies that user is on 'pro' plan
    if (userPlan !== "pro") {
      const meta = getTemplateMeta(templateId as ResumeTemplateId);
      return NextResponse.json(
        {
          allowed: false,
          isPaid: true,
          templateName: meta?.name || "Premium Template",
          message: `The "${meta?.name || "Premium"}" template is a Pro feature. Please upgrade to download clean, unwatermarked PDFs.`,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      allowed: true,
      isPaid: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Export authorization check failed" },
      { status: 500 }
    );
  }
}
