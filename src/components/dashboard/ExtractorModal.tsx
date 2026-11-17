import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, AlertCircle, Copy, FileText, X } from "lucide-react";
import { Opportunity, ExtractedOpportunityData } from "@/types";

interface ExtractorModalProps {
  onPublish: (newOpp: Omit<Opportunity, "id" | "created_at">) => void;
  onClose?: () => void;
}

const SAMPLE_RAW_POSTS = [
  {
    title: "WhatsApp Campus Forward (Fintech)",
    text: `*URGENT: Wave Mobile Money Uganda Internships 2026*
Hey guys! Wave Uganda is looking for 2 software engineering interns to join the Kampala squad.
Requirements: Must know Python, React or Go, understand REST APIs, and be currently enrolled in university (Makerere, MUST, Kyambogo preferred).
Stipend: UGX 1,500,000/mo.
Deadline: Apply before November 26, 2026!
Send CV and GitHub link to: https://wave.com/careers/uganda-interns
Please share to class groups 🙏`,
  },
  {
    title: "LinkedIn Notice (AI & Data Science)",
    text: `Exciting Fellowship Announcement: Sunbird AI Uganda
We are accepting applications for our 2026 African Language AI Research Fellowship.
Who should apply: 3rd/4th year CS or Electrical Engineering students with Python, PyTorch, and NLP curiosity.
Location: Kololo, Kampala (Hybrid).
Deadline for submissions: 2026-11-24.
Apply at https://sunbird.ai/fellowships-2026`,
  },
];

export const ExtractorModal: React.FC<ExtractorModalProps> = ({ onPublish, onClose }) => {
  const [rawText, setRawText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedOpportunityData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [publishedNotice, setPublishedNotice] = useState(false);

  const handleExtract = async () => {
    if (!rawText.trim()) {
      setErrorMsg("Please paste or load an announcement text first.");
      return;
    }

    setErrorMsg("");
    setIsExtracting(true);

    try {
      const res = await fetch("/api/gemini/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });

      const json = await res.json();
      if (json.data) {
        setExtractedData(json.data);
      } else {
        setErrorMsg(json.error || "Failed to extract opportunity fields. Ensure the post includes job details or deadline.");
      }
    } catch {
      setErrorMsg("Network error contacting Gemini extractor endpoint. Please verify your connection.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePublishToFeed = () => {
    if (!extractedData) return;

    onPublish({
      title: extractedData.title,
      organization: extractedData.organization,
      location: "Kampala, Uganda",
      deadline: extractedData.deadline,
      eligibility: extractedData.eligibility,
      requirements: extractedData.requirements,
      link: extractedData.link,
      summary: extractedData.summary,
      category: extractedData.category || "Internship",
      is_verified: true,
    });

    setPublishedNotice(true);
    setTimeout(() => {
      setPublishedNotice(false);
      setExtractedData(null);
      setRawText("");
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white">
              Messy Post Extractor (Gemini 2.5 Flash)
            </h1>
            <p className="text-xs text-gray-400">
              Paste unformatted WhatsApp messages or LinkedIn posts to extract structured listings.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white glass-button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Demo Sample Pills for 3-minute Live Demo */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          Demo Presets:
        </span>
        {SAMPLE_RAW_POSTS.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setRawText(sample.text);
              setExtractedData(null);
            }}
            className="text-xs px-3 py-1 rounded-lg bg-surface border border-white/10 text-emerald-300 hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
          >
            <Copy className="w-3 h-3" />
            {sample.title}
          </button>
        ))}
      </div>

      {/* Textarea Input Card */}
      <div className="glass-card rounded-2xl p-5 border space-y-3">
        <label className="block text-xs font-semibold text-gray-200">
          Raw Announcement Text
        </label>
        <textarea
          rows={5}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste raw text here... (e.g. forwarded WhatsApp message, LinkedIn post, campus bulletin)"
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-y"
        />

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleExtract}
            disabled={isExtracting || !rawText.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-xs font-bold transition-all shadow-md shadow-emerald-950/50 flex items-center gap-2"
          >
            {isExtracting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Gemini Extracting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Extract with Gemini 2.5 Flash</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Structured Preview Card */}
      {extractedData && (
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/10 space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Structured Output Preview
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified Schema
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Role / Title:</span>
              <input
                type="text"
                value={extractedData.title}
                onChange={(e) => setExtractedData({ ...extractedData, title: e.target.value })}
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-white font-semibold"
              />
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Organization:</span>
              <input
                type="text"
                value={extractedData.organization}
                onChange={(e) => setExtractedData({ ...extractedData, organization: e.target.value })}
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-white"
              />
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Deadline (YYYY-MM-DD):</span>
              <input
                type="text"
                value={extractedData.deadline || ""}
                placeholder="e.g. 2026-11-28"
                onChange={(e) => setExtractedData({ ...extractedData, deadline: e.target.value })}
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-white"
              />
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Application Link:</span>
              <input
                type="text"
                value={extractedData.link || ""}
                placeholder="https://..."
                onChange={(e) => setExtractedData({ ...extractedData, link: e.target.value })}
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-surface border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-400 block font-medium mb-1">
              Extracted Requirements:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {extractedData.requirements.map((req, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-400 block font-medium mb-1">Summary:</span>
            <p className="text-xs text-gray-300 bg-surface/80 p-2.5 rounded-lg border border-white/5">
              {extractedData.summary}
            </p>
          </div>

          {/* Publish Action */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              Review before publishing to student feed.
            </span>
            <button
              onClick={handlePublishToFeed}
              disabled={publishedNotice}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
            >
              {publishedNotice ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Published to Live Feed!</span>
                </>
              ) : (
                <>
                  <span>Publish to Feed & AI Advisor</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

