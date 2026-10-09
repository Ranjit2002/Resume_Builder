"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { saveUserProfile } from "@/lib/store/storage";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FileText, Mail, Lock, ArrowRight, UserCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            return;
          }
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to sign in via Supabase.");
        setIsLoading(false);
        return;
      }
    }

    // Update local profile & redirect
    saveUserProfile({ email: email || "alex.rivera@example.com" });
    router.push("/dashboard");
  };

  const handleGuestLogin = () => {
    saveUserProfile({
      email: "demo@careercraft.dev",
      fullName: "Alex Rivera",
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            Career<span className="text-indigo-600">Craft</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome back to CareerCraft
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your credentials to manage your resumes & portfolios
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-3xl border border-slate-200/80 sm:px-10">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-semibold text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-md shadow-indigo-500/20"
              isLoading={isLoading}
            >
              Sign In to Workspace
            </Button>
          </form>

          {/* Guest Quick Test Button */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full justify-center text-xs"
              onClick={handleGuestLogin}
              leftIcon={<UserCheck className="w-4 h-4 text-emerald-600" />}
            >
              Continue as Demo Guest User
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{" "}
            <Link href="/signup" className="font-bold text-indigo-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
