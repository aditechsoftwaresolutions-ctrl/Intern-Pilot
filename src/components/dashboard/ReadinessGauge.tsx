import React from "react";
import { CheckCircle2, Bookmark, Flame } from "lucide-react";

interface ReadinessGaugeProps {
  score: number; // 0 - 100
  appliedCount: number;
  monthlyGoal?: number;
  openCount: number;
  savedCount: number;
  onSelectFilter?: (filter: "all" | "saved" | "applied") => void;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  score,
  appliedCount,
  monthlyGoal = 5,
  openCount,
  savedCount,
  onSelectFilter,
}) => {
  // SVG arc calculation for semi-circular gauge
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius; // Half circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            Application Readiness
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Target
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Profile strength & monthly application momentum
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-44 h-28 flex items-center justify-center">
          <svg className="w-44 h-28 overflow-visible" viewBox="0 0 160 90">
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            {/* Background Arc */}
            <path
              d="M 15 80 A 65 65 0 0 1 145 80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Value Arc */}
            <path
              d="M 15 80 A 65 65 0 0 1 145 80"
              fill="none"
              stroke="url(#emeraldGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center score readout */}
          <div className="absolute bottom-1 flex flex-col items-center">
            <div className="text-3xl font-extrabold text-white flex items-baseline">
              {score}
              <span className="text-sm font-medium text-emerald-400">%</span>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Profile Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-2 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
          <Flame className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>
            <strong className="text-white font-semibold">{appliedCount} of {monthlyGoal}</strong> applications sent this month
          </span>
        </div>
      </div>

      {/* 3 Compact Summary Interactive Pills */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
        <button
          type="button"
          onClick={() => onSelectFilter?.("all")}
          className="bg-surface/80 rounded-xl p-2.5 text-center border border-white/5 hover:border-emerald-500/30 transition-all text-left sm:text-center group"
          title="Filter all open opportunities"
        >
          <div className="text-[11px] text-gray-400 group-hover:text-emerald-400 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Open
          </div>
          <div className="text-base font-bold text-white mt-0.5">{openCount}</div>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter?.("saved")}
          className="bg-surface/80 rounded-xl p-2.5 text-center border border-white/5 hover:border-amber-500/30 transition-all text-left sm:text-center group"
          title="Filter saved opportunities"
        >
          <div className="text-[11px] text-gray-400 group-hover:text-amber-400 flex items-center justify-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-400" />
            Saved
          </div>
          <div className="text-base font-bold text-white mt-0.5">{savedCount}</div>
        </button>

        <button
          type="button"
          onClick={() => onSelectFilter?.("applied")}
          className="bg-surface/80 rounded-xl p-2.5 text-center border border-white/5 hover:border-emerald-500/30 transition-all text-left sm:text-center group"
          title="Filter applied opportunities"
        >
          <div className="text-[11px] text-gray-400 group-hover:text-emerald-300 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Applied
          </div>
          <div className="text-base font-bold text-white mt-0.5">{appliedCount}</div>
        </button>
      </div>
    </div>
  );
};

