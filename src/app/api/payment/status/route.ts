import { NextRequest, NextResponse } from "next/server";
import { verifyProEntitlementToken } from "@/lib/razorpay";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Check HTTP-only cryptographically signed entitlement cookie
    const cookieToken = req.cookies.get("careercraft_pro_token")?.value;
    const headerToken = req.headers.get("x-pro-token");
    const token = cookieToken || headerToken;

    let isPro = false;
    let entitlementData = null;

    if (token) {
      const verification = verifyProEntitlementToken(token);
      if (verification.valid && verification.data) {
        isPro = true;
        entitlementData = verification.data;
      }
    }

    // 2. Fallback check against Supabase profile if configured
    if (!isPro) {
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
              isPro = true;
            }
          }
        }
      } catch {
        // Supabase check failed or table not found; rely on signed token
      }
    }

    return NextResponse.json({
      isPro,
      plan: isPro ? "pro" : "free",
      entitlement: entitlementData,
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to check payment status";
    return NextResponse.json({ error: errorMsg, isPro: false }, { status: 500 });
  }
}

export async function DELETE() {
  // Clear entitlement cookie on sign out
  const response = NextResponse.json({
    success: true,
    message: "Entitlement cleared.",
    isPro: false,
    plan: "free",
  });

  response.cookies.set("careercraft_pro_token", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
  });

  return response;
}
