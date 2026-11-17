import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Briefcase, Bot } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The requested opportunity or page on InternPilot could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card max-w-lg w-full rounded-3xl p-8 sm:p-10 border border-emerald-500/30 text-center relative z-10 shadow-2xl">
        {/* Brand Compass Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center mx-auto mb-6 text-black shadow-lg shadow-emerald-950/60">
          <Compass className="w-9 h-9 stroke-[2.2] animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          404 Error
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-4 mb-2">
          Opportunity Not Found
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mx-auto mb-8">
          The page or internship listing you are looking for does not exist, has expired, or may have been repositioned.
        </p>

        {/* Actionable buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Return to Dashboard</span>
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-5 py-3 rounded-xl glass-button text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Student Sign In</span>
          </Link>
        </div>

        {/* Helpful Footer Note */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Need guidance? Consult the AI Advisor on the home feed.</span>
        </div>
      </div>
    </div>
  );
}
