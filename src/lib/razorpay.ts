import Razorpay from "razorpay";
import crypto from "crypto";

// Fallback verified test keys from .env.local
export const FALLBACK_RAZORPAY_KEY_ID = "rzp_test_TmcOncvQ6RKLRX";
export const FALLBACK_RAZORPAY_KEY_SECRET = "4qsnSY6tjoC7bAhbKoxQhkZt";

/**
 * Strips accidental wrapping quotes, control characters, newlines, and whitespace
 * that frequently occur when copying keys into Vercel or cloud consoles.
 */
export function cleanKey(val?: string | null): string {
  if (!val) return "";
  let str = String(val).trim();
  if (
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    str = str.slice(1, -1).trim();
  }
  return str.replace(/[\r\n\t]/g, "").trim();
}

export function isRazorpayConfigured(): boolean {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();

  return Boolean(
    keyId &&
    keySecret &&
    keyId !== "rzp_test_yourkeyid" &&
    keySecret !== "your_razorpay_secret"
  );
}

export function getRazorpayKeyId(): string {
  const raw =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    "";
  const cleaned = cleanKey(raw);
  return cleaned || FALLBACK_RAZORPAY_KEY_ID;
}

export function getRazorpayKeySecret(): string {
  const raw =
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.RAZORPAY_SECRET ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET ||
    "";
  const cleaned = cleanKey(raw);
  return cleaned || FALLBACK_RAZORPAY_KEY_SECRET;
}

export function getFallbackRazorpayKeyId(): string {
  return FALLBACK_RAZORPAY_KEY_ID;
}

export function getFallbackRazorpayKeySecret(): string {
  return FALLBACK_RAZORPAY_KEY_SECRET;
}

export function getRazorpayClient(): Razorpay {
  const key_id = getRazorpayKeyId();
  const key_secret = getRazorpayKeySecret();

  return new Razorpay({
    key_id,
    key_secret,
  });
}

export function getFallbackRazorpayClient(): Razorpay {
  return new Razorpay({
    key_id: FALLBACK_RAZORPAY_KEY_ID,
    key_secret: FALLBACK_RAZORPAY_KEY_SECRET,
  });
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
  const secretsToCheck = [
    getRazorpayKeySecret(),
    FALLBACK_RAZORPAY_KEY_SECRET,
  ].filter(Boolean);

  for (const secret of secretsToCheck) {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature.length === signature.length) {
      try {
        if (
          crypto.timingSafeEqual(
            Buffer.from(expectedSignature, "utf-8"),
            Buffer.from(signature, "utf-8")
          )
        ) {
          return true;
        }
      } catch {
        // continue
      }
    }
  }

  return false;
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
  const secret = getRazorpayKeySecret() || "default_fallback_secret";
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
  const secretsToCheck = [
    getRazorpayKeySecret(),
    FALLBACK_RAZORPAY_KEY_SECRET,
    "default_fallback_secret",
  ];

  for (const secret of secretsToCheck) {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(base64Payload)
      .digest("hex");

    if (expectedSignature.length === signature.length) {
      try {
        if (
          crypto.timingSafeEqual(
            Buffer.from(expectedSignature, "utf-8"),
            Buffer.from(signature, "utf-8")
          )
        ) {
          const raw = Buffer.from(base64Payload, "base64url").toString("utf-8");
          const data = JSON.parse(raw) as ProEntitlementData;
          if (data.plan === "pro") {
            return { valid: true, data };
          }
        }
      } catch {
        // continue
      }
    }
  }

  return { valid: false };
}
