"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { PRICING_PLANS } from "@/lib/constants/pricing";
import { saveUserProfile, getUserProfile } from "@/lib/store/storage";
import { Check, Sparkles, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function UpgradeModal({
  isOpen,
  onClose,
  featureName = "this premium feature",
}: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [setupNotice, setSetupNotice] = useState<string | null>(null);
  const proPlan = PRICING_PLANS.find((p) => p.id === "pro") || PRICING_PLANS[1];

  const handleCheckout = async () => {
    setIsLoading(true);
    setSetupNotice(null);

    try {
      // Call server order creation route
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "pro", amount: proPlan.priceMonthly }),
      });

      const data = await res.json();

      if (data.isConfigured && data.orderId) {
        // Real Razorpay Checkout flow if key configured
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency || "USD",
          name: "CareerCraft Pro",
          description: "Unlock all templates, AI writing, and unlimited exports",
          order_id: data.orderId,
          handler: async function (response: any) {
            // Verify on server
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              saveUserProfile({ subscription: { userId: "user-1", plan: "pro", status: "active" } });
              window.location.reload();
            }
          },
        };

        if (typeof window !== "undefined" && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          setSetupNotice("Razorpay SDK loading. Please ensure NEXT_PUBLIC_RAZORPAY_KEY_ID is valid.");
        }
      } else {
        // Inform user that Razorpay keys are not yet configured in .env.local
        setSetupNotice(
          data.message ||
            "Payment gateway keys (RAZORPAY_KEY_ID) are currently unconfigured in .env.local. You can test Pro features using sandbox demo mode."
        );
      }
    } catch (err: any) {
      setSetupNotice("Could not connect to payment gateway. Please verify server route.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSandboxUpgrade = () => {
    saveUserProfile({
      subscription: {
        userId: getUserProfile().id,
        plan: "pro",
        status: "active",
      },
    });
    onClose();
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unlock CareerCraft Pro"
      description={`Upgrade your account to access ${featureName} and land more interviews faster.`}
      maxWidth="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Pro Plan Card */}
        <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/40 dark:to-slate-900 relative shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Full Career Acceleration
              </span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">{proPlan.name}</h4>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 dark:text-white">${proPlan.priceMonthly}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium"> / month</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">{proPlan.tagline}</p>

          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6">
            {proPlan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {setupNotice && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Payment Gateway Notice:</p>
                <p className="mt-0.5">{setupNotice}</p>
                <button
                  type="button"
                  onClick={handleSandboxUpgrade}
                  className="mt-2 text-indigo-700 dark:text-indigo-400 underline font-bold"
                >
                  Click here to enable Sandbox Pro Access for testing
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm shadow-md shadow-indigo-500/25"
              isLoading={isLoading}
              onClick={handleCheckout}
              leftIcon={<CreditCard className="w-4 h-4" />}
            >
              Subscribe with Razorpay
            </Button>
            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Cancel anytime. 100% secure payment checkout.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
