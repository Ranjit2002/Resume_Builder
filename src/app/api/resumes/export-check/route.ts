import { NextRequest, NextResponse } from "next/server";
import { isPaidTemplate, getTemplateMeta } from "@/lib/constants/templates";
import { ResumeTemplateId } from "@/lib/types/resume";
import { verifyProEntitlementToken } from "@/lib/razorpay";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body may be empty
    }

    const { templateId } = body || {};
    const isPaid = isPaidTemplate(templateId as ResumeTemplateId);

    // Free templates can always be exported
    if (!isPaid) {
      return NextResponse.json({
        allowed: true,
        isPaid: false,
      });
    }

    // For paid templates, verify real entitlement on the server:
    // 1. Check HTTP-only cookie or custom token header
    const cookieToken = req.cookies.get("careercraft_pro_token")?.value;
    const headerToken = req.headers.get("x-pro-token");
    const token = cookieToken || headerToken;

    const tokenVerification = verifyProEntitlementToken(token);
    let isServerVerifiedPro = tokenVerification.valid;

    // 2. Check Supabase session if configured
    if (!isServerVerifiedPro) {
      try {
        const supabase = await createServerSupabaseClient();
        if (supabase) {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("plan, subscription_status")
              .eq("id", user.id)
              .maybeSingle();

            if (
              profile?.plan === "pro" &&
              profile?.subscription_status === "active"
            ) {
              isServerVerifiedPro = true;
            }
          }
        }
      } catch {
        // Continue if Supabase is not reached
      }
    }

    // 3. Reject if not verified Pro on the server
    if (!isServerVerifiedPro) {
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
      verified: true,
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Export authorization check failed";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
