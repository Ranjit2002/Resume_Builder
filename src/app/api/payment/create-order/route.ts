import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { planId, amount } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if real keys are configured
    const isConfigured = Boolean(
      keyId &&
      keySecret &&
      keyId !== "rzp_test_yourkeyid" &&
      keySecret !== "your_razorpay_secret"
    );

    if (!isConfigured) {
      return NextResponse.json({
        isConfigured: false,
        message:
          "Razorpay test keys are not configured in your .env.local file (NEXT_PUBLIC_RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET). You can test Pro features using Sandbox Demo mode.",
      });
    }

    // Call Razorpay API to create an order
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: (amount || 12) * 100, // In cents or paisa
        currency: "USD",
        receipt: `rcpt_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { isConfigured: false, message: errorData.error?.description || "Order creation failed" },
        { status: 400 }
      );
    }

    const orderData = await response.json();
    return NextResponse.json({
      isConfigured: true,
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
