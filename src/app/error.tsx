"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, HelpCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Note: Do not emit raw console.log in production
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card max-w-lg w-full rounded-3xl p-8 sm:p-10 border border-rose-500/30 text-center relative z-10 shadow-2xl">
        {/* Error Warning Badge */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-6 text-rose-300 shadow-lg shadow-rose-950/60">
          <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
          Temporary Interruption
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-4 mb-2">
          Something Interrupted Your Request
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mx-auto mb-6">
          We encountered an unexpected delay while communicating with our career data services. Your profile and saved listings are safe.
        </p>

        {error?.digest && (
          <div className="text-[11px] text-gray-500 bg-surface/80 px-3 py-1.5 rounded-lg border border-white/5 font-mono mb-6 max-w-xs mx-auto truncate">
            Ref: {error.digest}
          </div>
        )}

        {/* Actionable Recovery Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl glass-button text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Helpful Tips */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>If this persists, check your local data connection or refresh.</span>
        </div>
      </div>
    </div>
  );
}
