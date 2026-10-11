import { NextRequest, NextResponse } from "next/server";
import {
  verifyRazorpaySignature,
  isRazorpayConfigured,
  getRazorpayClient,
  createProEntitlementToken,
} from "@/lib/razorpay";
import { createServerSupabaseClient } from "@/lib/supabase/server";

interface VerifyRequestBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay credentials are not configured on the server.",
        },
        { status: 500 }
      );
    }

    let body: VerifyRequestBody = {};
    try {
      body = (await req.json()) as VerifyRequestBody;
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId = "user-1",
    } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required payment verification parameters (order_id, payment_id, or signature).",
        },
        { status: 400 }
      );
    }

    // 1. Cryptographic HMAC-SHA256 signature verification
    const isValidSignature = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValidSignature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature. Verification failed.",
        },
        { status: 400 }
      );
    }

    // 2. Fetch live payment details from Razorpay to verify status & prevent pending/fraudulent claims
    const razorpay = getRazorpayClient();
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Verify order ID matches
    if (payment.order_id && payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order mismatch. Verification failed.",
        },
        { status: 400 }
      );
    }

    // Verify payment is captured or authorized (not failed, pending, or refunded)
    const validStatuses = ["captured", "authorized"];
    if (!validStatuses.includes(payment.status)) {
      return NextResponse.json(
        {
          success: false,
          message: `Payment status is '${payment.status}'. Access is only granted for captured or authorized payments.`,
        },
        { status: 400 }
      );
    }

    // 3. Generate tamper-proof server entitlement token
    const entitlementToken = createProEntitlementToken({
      userId: userId || "user-1",
      plan: "pro",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      method: (payment as any)?.method,
      amount: (payment as any)?.amount,
      currency: (payment as any)?.currency,
      verifiedAt: Date.now(),
    });

    // 4. Update Supabase if configured and user exists
    try {
      const supabase = await createServerSupabaseClient();
      if (supabase && userId && userId !== "user-1") {
        await supabase
          .from("profiles")
          .update({
            plan: "pro",
            subscription_status: "active",
            subscription_id: razorpay_order_id,
            customer_id: razorpay_payment_id,
          })
          .eq("id", userId);
      }
    } catch {
      // Continue with server entitlement token
    }

    // 5. Construct verified success response with secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Payment successfully verified.",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      entitlementToken,
      subscription: {
        userId: userId || "user-1",
        plan: "pro",
        status: "active",
        razorpaySubscriptionId: razorpay_order_id,
        razorpayCustomerId: razorpay_payment_id,
      },
    });

    response.cookies.set("careercraft_pro_token", entitlementToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year entitlement
    });

    return response;
  } catch (err: unknown) {
    console.error("Payment verification error:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Payment verification encountered a server error.";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
