"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { PRICING_PLANS } from "@/lib/constants/pricing";
import { saveUserProfile, getUserProfile } from "@/lib/store/storage";
import {
  Check,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  QrCode,
  Wallet,
  Landmark,
} from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

interface NoticeState {
  type: "error" | "warning" | "info" | "success";
  message: string;
}

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  config?: {
    display?: {
      blocks?: Record<
        string,
        {
          name: string;
          instruments: Array<{ method: string; [key: string]: unknown }>;
        }
      >;
      sequence?: string[];
      preferences?: {
        show_default_blocks?: boolean;
      };
    };
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
}

interface RazorpayModalInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayErrorResponse) => void
  ) => void;
}

function loadRazorpayCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    const win = window as unknown as {
      Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayModalInstance;
    };

    if (win.Razorpay) return resolve(true);

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existingScript) {
      if (win.Razorpay) return resolve(true);
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function UpgradeModal({
  isOpen,
  onClose,
  featureName = "this premium feature",
}: UpgradeModalProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [statusNotice, setStatusNotice] = useState<NoticeState | null>(null);

  const proPlan = PRICING_PLANS.find((p) => p.id === "pro") || PRICING_PLANS[1];

  const price = currency === "INR" ? 999 : proPlan.priceMonthly;
  const currencySymbol = currency === "INR" ? "₹" : "$";

  const handleModalClose = () => {
    setIsLoading(false);
    setIsVerifying(false);
    setStatusNotice(null);
    onClose();
  };

  const handleCheckout = async () => {
    if (isLoading || isVerifying || isPaymentSuccess) return;

    setIsLoading(true);
    setStatusNotice(null);

    try {
      // 1. Ensure Razorpay Checkout SDK script is loaded
      const scriptReady = await loadRazorpayCheckoutScript();
      if (!scriptReady) {
        setStatusNotice({
          type: "error",
          message:
            "Unable to load Razorpay Checkout SDK. Please check your internet connection.",
        });
        setIsLoading(false);
        return;
      }

      // 2. Call server-side order creation route
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: "pro",
          amount: price,
          currency: currency,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.orderId) {
        setStatusNotice({
          type: data.isConfigured === false ? "warning" : "error",
          message:
            data.message ||
            "Unable to initialize payment order. Please verify server configuration.",
        });
        setIsLoading(false);
        return;
      }

      const clientKey =
        data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!clientKey) {
        setStatusNotice({
          type: "error",
          message:
            "Razorpay Key ID is missing. Ensure RAZORPAY_KEY_ID is configured.",
        });
        setIsLoading(false);
        return;
      }

      const currentUser = getUserProfile();

      // 3. Initialize Razorpay Standard Checkout with all supported payment methods
      const options: RazorpayCheckoutOptions = {
        key: clientKey,
        amount: data.amount,
        currency: data.currency || currency,
        name: "CareerCraft WORKSHOP",
        description: "CareerCraft Pro Career Plan — All Templates & Exports",
        order_id: data.orderId,
        prefill: {
          name: currentUser.fullName || "CareerCraft User",
          email: currentUser.email || "user@example.com",
          contact: (currentUser as { phone?: string }).phone || "9999999999",
        },
        notes: {
          planId: "pro",
          userId: currentUser.id || "user-1",
        },
        theme: {
          color: "#4f46e5",
          backdrop_color: "rgba(15, 23, 42, 0.6)",
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI / QR",
                instruments: [{ method: "upi" }],
              },
              cards: {
                name: "Debit & Credit Cards",
                instruments: [{ method: "card" }],
              },
              wallets: {
                name: "Wallets",
                instruments: [{ method: "wallet" }],
              },
              emi: {
                name: "EMI & Cardless EMI",
                instruments: [{ method: "emi" }],
              },
              netbanking: {
                name: "Net Banking",
                instruments: [{ method: "netbanking" }],
              },
            },
            sequence: [
              "block.upi",
              "block.cards",
              "block.wallets",
              "block.emi",
              "block.netbanking",
            ],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
          escape: true,
          backdropclose: false,
        },
        handler: async function (response: RazorpaySuccessResponse) {
          setIsVerifying(true);
          setStatusNotice({
            type: "info",
            message: "Verifying payment with CareerCraft secure server...",
          });

          try {
            // 4. Verify signature on backend
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: currentUser.id || "user-1",
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              // 5. Update user profile subscription on successful verified payment
              const profile = getUserProfile();
              saveUserProfile({
                subscription: {
                  userId: profile.id || "user-1",
                  plan: "pro",
                  status: "active",
                  razorpaySubscriptionId: response.razorpay_order_id,
                  razorpayCustomerId: response.razorpay_payment_id,
                },
              });

              setIsPaymentSuccess(true);
              setStatusNotice({
                type: "success",
                message:
                  "Payment verified successfully! Welcome to CareerCraft WORKSHOP Pro.",
              });

              try {
                const confetti = (await import("canvas-confetti")).default;
                confetti({
                  particleCount: 120,
                  spread: 75,
                  origin: { y: 0.6 },
                });
              } catch {
                // Confetti is decorative; ignore import failure
              }

              setTimeout(() => {
                handleModalClose();
                window.location.reload();
              }, 1600);
            } else {
              setStatusNotice({
                type: "error",
                message:
                  verifyData.message ||
                  "Payment verification failed: Invalid signature or pending payment.",
              });
            }
          } catch {
            setStatusNotice({
              type: "error",
              message:
                "Network error during payment verification. Please contact support.",
            });
          } finally {
            setIsVerifying(false);
            setIsLoading(false);
          }
        },
      };

      const win = window as unknown as {
        Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayModalInstance;
      };

      const rzp = new win.Razorpay(options);

      rzp.on("payment.failed", function (response: RazorpayErrorResponse) {
        setIsLoading(false);
        const description =
          response?.error?.description ||
          response?.error?.reason ||
          "Payment was declined or cancelled. Please try again.";
        setStatusNotice({
          type: "error",
          message: description,
        });
      });

      rzp.open();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Could not connect to payment gateway. Please verify server connection.";

      setStatusNotice({
        type: "error",
        message: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="Unlock CareerCraft Pro"
      description={`Upgrade your account to access ${featureName} and unlock all professional resume templates.`}
      maxWidth="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Pro Plan Card */}
        <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/40 dark:to-slate-900 relative shadow-sm">
          {/* Currency Toggle */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Select Currency:
            </span>
            <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1 rounded-md transition-all ${
                  currency === "INR"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                ₹ INR (UPI / EMI / Cards)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-md transition-all ${
                  currency === "USD"
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                $ USD (Cards)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Full Career Acceleration
              </span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                {proPlan.name}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {currencySymbol}{price}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {" "}
                / month
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            {proPlan.tagline}
          </p>

          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-5">
            {proPlan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Supported Payment Badges */}
          <div className="mb-5 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <QrCode className="w-3.5 h-3.5 text-indigo-500" /> UPI / QR
            </span>
            <span className="flex items-center gap-1 font-medium">
              <CreditCard className="w-3.5 h-3.5 text-indigo-500" /> Debit & Credit Cards
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Wallet className="w-3.5 h-3.5 text-indigo-500" /> Wallets
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Landmark className="w-3.5 h-3.5 text-indigo-500" /> EMI & Netbanking
            </span>
          </div>

          {statusNotice && (
            <div
              className={`mb-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                statusNotice.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300"
                  : statusNotice.type === "info"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60 text-indigo-800 dark:text-indigo-300"
                  : statusNotice.type === "warning"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300"
              }`}
            >
              {statusNotice.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : statusNotice.type === "info" ? (
                <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 animate-spin" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold">
                  {statusNotice.type === "success"
                    ? "Payment Successful"
                    : statusNotice.type === "info"
                    ? "Processing Payment"
                    : "Payment Notice"}
                </p>
                <p className="mt-0.5">{statusNotice.message}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button
              id="razorpay-subscribe-btn"
              type="button"
              variant={isPaymentSuccess ? "secondary" : "primary"}
              size="lg"
              className="w-full justify-center text-sm shadow-md shadow-indigo-500/25"
              isLoading={isLoading || isVerifying}
              disabled={isLoading || isVerifying || isPaymentSuccess}
              onClick={handleCheckout}
              leftIcon={
                isPaymentSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <CreditCard className="w-4 h-4" />
                )
              }
            >
              {isPaymentSuccess
                ? "Pro Activated!"
                : isVerifying
                ? "Verifying Payment..."
                : isLoading
                ? "Opening Razorpay..."
                : `Subscribe with Razorpay (${currencySymbol}${price})`}
            </Button>
            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Cancel anytime. 100% secure Razorpay Standard Checkout.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

