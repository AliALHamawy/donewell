"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Logo from '@/components/myComponents/Logo';
import { MailOpen, Loader2 } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/toast";

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.add({
        type: "error",
        title: "Error",
        description: "No email address found. Please try signing up again.",
      });
      return;
    }

    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast.add({
        type: "success",
        title: "Email sent!",
        description: "We've resent the verification link to your inbox.",
      });
    } catch (err: any) {
      toast.add({
        type: "error",
        title: "Failed to resend",
        description: err?.message || "Please try again later.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="px-4 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto flex flex-col space-y-8 items-center justify-center">
        <Logo icoClass="size-10 p-1 inline-flex" textClass="text-2xl font-bold" />
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-panel)] sm:p-10">
          <h1 className="font-display text-4xl font-semibold tracking-[-.03em]">Check your email</h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            We&apos;ve sent a verification link to <span className="text-foreground font-medium">{email || "your email address"}</span>. Please check your inbox and click the link to activate your account.
          </p>
          
          <a 
            href="https://mail.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-8 mt-8 h-12 w-full text-base font-semibold"
          >
            <MailOpen className="size-5" />
            Open email
          </a>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Didn&apos;t receive the email?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
            >
              {resending && <Loader2 className="size-3.5 animate-spin" />}
              {resending ? "Sending..." : "Resend link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;