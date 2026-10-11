import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { message: "Webhook secret is not configured" },
        { status: 500 }
      );
    }

    const signature = req.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { message: "Missing webhook signature" },
        { status: 400 }
      );
    }

    const rawBody = await req.text();
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isValid =
      expectedSignature.length === signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const eventData = JSON.parse(rawBody);
    const event = eventData.event;
    const payload = eventData.payload;

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload?.payment?.entity;
      const notes = paymentEntity?.notes || {};
      const userId = notes.userId;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (userId && userId !== "user-1") {
        try {
          const supabase = await createServerSupabaseClient();
          if (supabase) {
            await supabase
              .from("profiles")
              .update({
                plan: "pro",
                subscription_status: "active",
                subscription_id: orderId,
                customer_id: paymentId,
              })
              .eq("id", userId);
          }
        } catch (dbErr) {
          console.error("Webhook database update error:", dbErr);
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: unknown) {
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { message: "Webhook processing error" },
      { status: 500 }
    );
  }
}
