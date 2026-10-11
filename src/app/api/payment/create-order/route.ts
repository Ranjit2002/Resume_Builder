import { NextRequest, NextResponse } from "next/server";
import {
  getRazorpayClient,
  getRazorpayKeyId,
  isRazorpayConfigured,
} from "@/lib/razorpay";

interface CreateOrderRequestBody {
  planId?: string;
  amount?: number | string;
  currency?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          success: false,
          isConfigured: false,
          message:
            "Razorpay credentials are not configured on the server. Please check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables.",
        },
        { status: 500 }
      );
    }

    let body: CreateOrderRequestBody = {};
    try {
      body = (await req.json()) as CreateOrderRequestBody;
    } catch {
      // Body may be empty or invalid JSON; fallback to defaults
    }

    const { planId = "pro", amount = 12, currency = "USD" } = body || {};

    const numericAmount =
      typeof amount === "number" ? amount : parseFloat(String(amount));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          isConfigured: true,
          message: "Invalid payment amount specified.",
        },
        { status: 400 }
      );
    }

    // Amount in smallest currency subunit (cents for USD, paise for INR)
    const amountInSubunits = Math.round(numericAmount * 100);

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountInSubunits,
      currency: currency || "USD",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        planId: planId || "pro",
      },
    });

    return NextResponse.json({
      success: true,
      isConfigured: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: getRazorpayKeyId(),
    });
  } catch (err: unknown) {
    console.error("Error creating Razorpay order:", err);
    const errorObj = err as {
      error?: { description?: string };
      message?: string;
    };
    const errorMessage =
      errorObj?.error?.description ||
      errorObj?.message ||
      "Order creation failed on Razorpay.";

    return NextResponse.json(
      {
        success: false,
        isConfigured: true,
        message: errorMessage,
      },
      { status: 400 }
    );
  }
}
