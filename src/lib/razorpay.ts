import Razorpay from "razorpay";
import crypto from "crypto";

export function isRazorpayConfigured(): boolean {
  const keyId =
    process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  return Boolean(
    keyId &&
    keySecret &&
    keyId !== "rzp_test_yourkeyid" &&
    keySecret !== "your_razorpay_secret"
  );
}

export function getRazorpayKeyId(): string | null {
  return (
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    null
  );
}

let razorpayInstance: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  const key_id = getRazorpayKeyId();
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay credentials are not configured in environment variables (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET)."
    );
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id,
      key_secret,
    });
  }

  return razorpayInstance;
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature.length !== signature.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );
  } catch {
    return false;
  }
}

export interface ProEntitlementData {
  userId: string;
  plan: "pro";
  orderId: string;
  paymentId: string;
  method?: string;
  amount?: number;
  currency?: string;
  verifiedAt: number;
}

export function createProEntitlementToken(data: ProEntitlementData): string {
  const secret = process.env.RAZORPAY_KEY_SECRET || "default_fallback_secret";
  const payload = JSON.stringify(data);
  const base64Payload = Buffer.from(payload, "utf-8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(base64Payload)
    .digest("hex");
  return `${base64Payload}.${signature}`;
}

export function verifyProEntitlementToken(
  token?: string | null
): { valid: boolean; data?: ProEntitlementData } {
  if (!token || typeof token !== "string") return { valid: false };

  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false };

  const [base64Payload, signature] = parts;
  const secret = process.env.RAZORPAY_KEY_SECRET || "default_fallback_secret";

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(base64Payload)
    .digest("hex");

  if (expectedSignature.length !== signature.length) {
    return { valid: false };
  }

  try {
    const matches = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );

    if (!matches) return { valid: false };

    const raw = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const data = JSON.parse(raw) as ProEntitlementData;
    if (data.plan === "pro") {
      return { valid: true, data };
    }
  } catch {
    return { valid: false };
  }

  return { valid: false };
}
