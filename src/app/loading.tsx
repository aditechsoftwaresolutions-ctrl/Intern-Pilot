import React from "react";
import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Skeleton Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-white/5 p-4 justify-between animate-pulse">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-3 py-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Compass className="w-6 h-6 stroke-[2.2] animate-spin-slow" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="h-2.5 w-16 bg-white/5 rounded" />
            </div>
          </div>

          {/* Skeleton Nav Items */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>

        <div className="h-16 w-full bg-surface/90 rounded-xl border border-white/5" />
      </aside>

      {/* Main Content Skeleton Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Utility Bar Skeleton */}
        <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 animate-pulse">
          <div className="h-9 w-72 bg-white/10 rounded-xl" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-28 bg-white/5 rounded-xl hidden sm:block" />
            <div className="h-9 w-24 bg-emerald-500/20 rounded-xl" />
            <div className="h-9 w-9 bg-white/5 rounded-xl" />
            <div className="h-9 w-32 bg-white/10 rounded-xl" />
          </div>
        </header>

        {/* Scrollable Dashboard Body Skeleton */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 animate-pulse">
          {/* Greeting Header Skeleton */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 bg-surface/50 h-36 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-3 w-40 bg-emerald-500/20 rounded-full" />
              <div className="h-6 w-64 bg-white/10 rounded-lg" />
              <div className="h-3.5 w-96 max-w-full bg-white/5 rounded" />
            </div>
          </div>

          {/* Bento Grid Row Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            <div className="glass-card rounded-2xl p-6 border h-56 bg-surface/40 flex flex-col justify-between">
              <div className="h-5 w-48 bg-white/10 rounded" />
              <div className="space-y-3">
                <div className="h-3 w-full bg-white/5 rounded" />
                <div className="h-3 w-4/5 bg-white/5 rounded" />
                <div className="h-3 w-2/3 bg-white/5 rounded" />
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 border h-56 bg-surface/40 flex flex-col items-center justify-center space-y-3">
              <div className="w-28 h-28 rounded-full border-4 border-white/5 border-t-emerald-500/40 animate-spin" />
              <div className="h-3 w-32 bg-white/10 rounded" />
            </div>
          </div>

          {/* 4 Stat Cards Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-4 sm:p-5 h-28 border bg-surface/40 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-20 bg-white/10 rounded" />
                  <div className="w-7 h-7 rounded-lg bg-white/5" />
                </div>
                <div className="h-7 w-12 bg-white/20 rounded" />
              </div>
            ))}
          </div>

          {/* Opportunity Feed Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-5 border h-64 bg-surface/40 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-emerald-500/20 rounded" />
                    <div className="h-4 w-16 bg-white/10 rounded" />
                  </div>
                  <div className="h-5 w-48 bg-white/15 rounded" />
                  <div className="h-3 w-32 bg-white/5 rounded" />
                  <div className="h-10 w-full bg-white/5 rounded" />
                </div>
                <div className="h-8 w-full bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
