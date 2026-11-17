import React from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Opportunity, StudentProfile } from "@/types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  student: StudentProfile;
  isSaved: boolean;
  isApplied: boolean;
  onToggleSave: (id: string) => void;
  onToggleApplied: (id: string) => void;
  onAskAbout?: (opportunity: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  student,
  isSaved,
  isApplied,
  onToggleSave,
  onToggleApplied,
  onAskAbout,
}) => {
  // Calculate deadline countdown & urgency
  let countdownText = "Rolling deadline";
  let urgency: "normal" | "urgent" | "critical" | "expired" = "normal";

  if (opportunity.deadline) {
    const today = new Date();
    const deadlineDate = new Date(opportunity.deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      countdownText = "Closed";
      urgency = "expired";
    } else if (diffDays === 0) {
      countdownText = "Closes today!";
      urgency = "critical";
    } else if (diffDays === 1) {
      countdownText = "Closes tomorrow";
      urgency = "critical";
    } else if (diffDays <= 7) {
      countdownText = `${diffDays} days left`;
      urgency = "urgent";
    } else {
      countdownText = `${diffDays} days left`;
      urgency = "normal";
    }
  }

  const urgencyStyles = {
    normal: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    urgent: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    critical: "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse",
    expired: "bg-gray-800 text-gray-400 border-gray-700",
  };

  // Match analysis
  const studentSkillsLower = student.skills.map((s) => s.toLowerCase());
  const matchedSkills = opportunity.requirements.filter((req) =>
    studentSkillsLower.some((s) => req.toLowerCase().includes(s) || s.includes(req.toLowerCase()))
  );
  const matchPercentage = Math.round(
    (matchedSkills.length / Math.max(opportunity.requirements.length, 1)) * 100
  );

  return (
    <div className="glass-card rounded-2xl p-5 border flex flex-col justify-between hover:border-emerald-500/40 transition-all">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-surface border border-white/10 text-emerald-300">
              {opportunity.category}
            </span>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border flex items-center gap-1 ${urgencyStyles[urgency]}`}
            >
              {urgency === "critical" && <AlertTriangle className="w-3 h-3" />}
              {urgency !== "critical" && <Clock className="w-3 h-3" />}
              {countdownText}
            </span>
          </div>

          {matchPercentage >= 50 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {matchPercentage}% Match
            </span>
          )}
        </div>

        {/* Title and Organization */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
          {opportunity.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1.5 flex-wrap">
          <span className="font-medium text-gray-200">{opportunity.organization}</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-500" />
            {opportunity.location}
          </span>
          {opportunity.deadline && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              Due {opportunity.deadline}
            </span>
          )}
        </div>

        {/* Summary */}
        <p className="text-xs text-gray-300 mt-3 line-clamp-2 leading-relaxed">
          {opportunity.summary}
        </p>

        {/* Eligibility Snippet */}
        <div className="mt-3 text-[11px] text-gray-400 bg-surface/80 rounded-lg p-2 border border-white/5">
          <strong className="text-gray-300">Eligibility:</strong> {opportunity.eligibility}
        </div>

        {/* Required Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {opportunity.requirements.map((req) => {
            const isMatch = studentSkillsLower.some(
              (s) => req.toLowerCase().includes(s) || s.includes(req.toLowerCase())
            );
            return (
              <span
                key={req}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                  isMatch
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                    : "bg-surface text-gray-400 border-white/5"
                }`}
              >
                {req}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleSave(opportunity.id)}
            aria-label={isSaved ? `Remove ${opportunity.title} from saved listings` : `Save ${opportunity.title}`}
            className={`p-2 rounded-xl border text-xs font-medium transition-all ${
              isSaved
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "glass-button text-gray-300 hover:text-white"
            }`}
            title={isSaved ? "Saved to your list" : "Save opportunity"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-amber-400" : ""}`} aria-hidden="true" />
          </button>

          <button
            onClick={() => onToggleApplied(opportunity.id)}
            aria-label={isApplied ? `Mark ${opportunity.title} as not applied` : `Mark ${opportunity.title} as applied`}
            className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isApplied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "glass-button text-gray-300 hover:text-white"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isApplied ? "text-emerald-400" : ""}`} aria-hidden="true" />
            <span>{isApplied ? "Applied" : "Mark Applied"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onAskAbout && (
            <button
              onClick={() => onAskAbout(opportunity)}
              aria-label={`Ask AI Advisor about ${opportunity.title}`}
              className="text-xs px-2.5 py-2 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-1"
              title="Ask Gemini how to position yourself for this listing"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {opportunity.link ? (
            <a
              href={opportunity.link.startsWith("http") || opportunity.link.startsWith("mailto:") ? opportunity.link : `https://${opportunity.link}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apply directly to ${opportunity.title} at ${opportunity.organization}`}
              className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
            >
              <span>Apply</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onAskAbout?.(opportunity)}
              className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1"
              title="Direct link not listed. Ask AI Advisor for contact guidance."
            >
              <span>Ask Apply Info</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

