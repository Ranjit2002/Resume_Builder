import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret || secret === "your_razorpay_secret") {
      return NextResponse.json(
        { success: false, message: "Razorpay secret key not configured." },
        { status: 400 }
      );
    }

    // Verify cryptographic signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return NextResponse.json({
        success: true,
        message: "Payment successfully verified.",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature." },
        { status: 400 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Payment verification failed." },
      { status: 500 }
    );
  }
}
