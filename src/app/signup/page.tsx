"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { saveUserProfile } from "@/lib/store/storage";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FileText, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });

          if (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            return;
          }
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to create Supabase account.");
        setIsLoading(false);
        return;
      }
    }

    saveUserProfile({ fullName, email });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            Career<span className="text-indigo-600 dark:text-indigo-400">Craft</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Create your CareerCraft account
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Build ATS resumes and publish personal portfolio websites for free
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl shadow-slate-200/50 dark:shadow-none sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 sm:px-10">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Alex Rivera"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

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
              label="Password (min 6 characters)"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline">Privacy Policy</Link>.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-md shadow-indigo-500/20"
              isLoading={isLoading}
            >
              Get Started Free
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
