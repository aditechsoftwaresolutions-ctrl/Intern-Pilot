"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Compass,
} from "lucide-react";
// Sparkles kept for right overlay panel only
import { sanitizeRedirect } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect");
  const targetUrl = sanitizeRedirect(rawRedirect);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setErrorMsg("Please enter a valid student or institutional email (e.g. student@mak.ac.ug).");
      return;
    }

    if (isSignUp && !name.trim()) {
      setErrorMsg("Please enter your full student name.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: isSignUp ? "signup" : "login",
          name: name.trim(),
          email: cleanEmail,
          password,
          _hp_verify: honeypot,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          setErrorMsg("Too many authentication attempts. Please wait 60 seconds before trying again.");
        } else {
          setErrorMsg(json.error || "Authentication failed. Please verify your credentials.");
        }
        return;
      }

      router.push(targetUrl);
      router.refresh();
    } catch {
      setErrorMsg("Unable to reach authentication server. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#080D0B] text-white relative overflow-hidden selection:bg-emerald-500/30">
      {/* Subtle emerald ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Dual-Panel Container */}
      <div className="relative max-w-[860px] w-full min-h-[540px] rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/[0.03] shadow-2xl flex flex-col md:flex-row">
        
        {/* ================= DESKTOP SLIDING OVERLAY CONTAINER ================= */}
        {/* LEFT PANEL */}
        <div
          className={`flex-1 p-8 sm:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out ${
            isSignUp
              ? "order-2 md:order-1 bg-gradient-to-br from-emerald-950/60 to-surface/90 border-r border-white/5 text-center items-center"
              : "order-1 md:order-1 bg-transparent"
          }`}
        >
          {isSignUp ? (
            /* Left Overlay State when Create Account is Active */
            <div className="max-w-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-300">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                WELCOME BACK!
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Already a member? Please login with your student credentials to track your opportunities.
              </p>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setIsSignUp(false);
                }}
                className="mt-4 inline-flex items-center gap-1.5 border border-white/25 rounded-full px-7 py-2.5 text-xs font-semibold hover:bg-white/10 transition-all text-white"
              >
                Sign In &rarr;
              </button>
            </div>
          ) : (
            /* Left Form State when Sign In is Active */
            <div className="w-full max-w-sm mx-auto space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    InternPilot
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Login</h1>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your student credentials to continue
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot field for bot spam deterrence */}
                <input
                  type="text"
                  name="_hp_verify"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden pointer-events-none"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Student Email (e.g. student@university.ac.ug)"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>

                {/* 1-Click Demo button removed */}
              </form>

              {/* Mobile Toggle */}
              <div className="text-center pt-2 md:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setIsSignUp(true);
                  }}
                  className="text-xs text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  Don&apos;t have an account? <span className="text-emerald-400 font-semibold">Sign Up</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`flex-1 p-8 sm:p-12 flex flex-col justify-center transition-all duration-500 ease-in-out ${
            isSignUp
              ? "order-1 md:order-2 bg-transparent"
              : "order-2 md:order-2 bg-gradient-to-br from-emerald-950/60 to-surface/90 border-l border-white/5 text-center items-center"
          }`}
        >
          {isSignUp ? (
            /* Right Form State when Create Account is Active */
            <div className="w-full max-w-sm mx-auto space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    InternPilot
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
                <p className="text-xs text-gray-400 mt-1">
                  Join verified Ugandan tech opportunities today
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot field for bot spam deterrence */}
                <input
                  type="text"
                  name="_hp_verify"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden pointer-events-none"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name (e.g. Amina Namukasa)"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="University / Student Email"
                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password (min 6 chars)"
                    className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              {/* Mobile Toggle */}
              <div className="text-center pt-2 md:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setIsSignUp(false);
                  }}
                  className="text-xs text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  Already a Member? <span className="text-emerald-400 font-semibold">Login</span>
                </button>
              </div>
            </div>
          ) : (
            /* Right Overlay State when Sign In is Active */
            <div className="max-w-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                HELLO, FRIEND!
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Enter your personal details and start your career journey with InternPilot.
              </p>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setIsSignUp(true);
                }}
                className="mt-4 inline-flex items-center gap-1.5 border border-white/25 rounded-full px-7 py-2.5 text-xs font-semibold hover:bg-white/10 transition-all text-white"
              >
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#080D0B] flex flex-col items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-3 border border-emerald-500/30 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <Compass className="w-6 h-6 stroke-[2.2] animate-spin" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide">
              Loading InternPilot...
            </span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
