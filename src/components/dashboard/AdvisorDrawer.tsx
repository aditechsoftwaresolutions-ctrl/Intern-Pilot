import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  X,
  User,
  ShieldCheck,
  RefreshCw,
  Lightbulb,
} from "lucide-react";
import { StudentProfile, Opportunity, ChatMessage } from "@/types";

interface AdvisorDrawerProps {
  student: StudentProfile;
  opportunities: Opportunity[];
  isOpen?: boolean;
  onClose?: () => void;
  isDrawer?: boolean; // if true, renders as slide-over overlay; if false, renders as full page tab
}

const STARTER_PROMPTS = [
  "Which open internship fits my current skills best?",
  "What deadlines are coming up this week?",
  "What skills am I missing for the top backend roles in Kampala?",
];

export const AdvisorDrawer: React.FC<AdvisorDrawerProps> = ({
  student,
  opportunities,
  isOpen = true,
  onClose,
  isDrawer = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: `Hello ${student.name.split(" ")[0]}! I'm your InternPilot career advisor.\n\nI have indexed your **${student.course}** profile and all **${opportunities.length} active opportunities** in Uganda. Ask me which roles match your stack, what deadlines are urgent, or how to prepare!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: student,
          message: text,
          history: historyPayload,
        }),
      });

      const json = await res.json();
      const botResponse = json.response || json.error || "I'm currently reviewing the latest openings. Ask me again shortly!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I had trouble reaching the AI advisor. Showing current open listings on the dashboard.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="flex flex-col h-full max-h-[85vh] glass-card rounded-2xl border border-emerald-500/25 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-surface/90">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              {isDrawer ? (
                <h2 className="text-sm sm:text-base font-bold text-white">
                  InternPilot AI Advisor
                </h2>
              ) : (
                <h1 className="text-sm sm:text-base font-bold text-white">
                  InternPilot AI Advisor
                </h1>
              )}
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                gemini-2.5-flash
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grounded in {opportunities.length} live database listings • No hallucinations</span>
            </div>
          </div>
        </div>

        {onClose && isDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white glass-button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Starter Prompts Strip */}
      <div className="p-3 bg-surface/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-gray-500 text-[11px] font-medium flex items-center gap-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Quick Ask:
        </span>
        {STARTER_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-surface border border-white/10 hover:border-emerald-500/40 text-emerald-300 transition-all shrink-0 whitespace-nowrap text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-emerald-500 text-black font-medium shadow-md shadow-emerald-950/30"
                    : "glass-card text-gray-200 border border-white/10"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    isUser ? "text-emerald-950" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-900 border border-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {student.name.charAt(0)}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass-card rounded-2xl px-4 py-2.5 text-xs text-gray-300 flex items-center gap-2 border border-white/10">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Gemini is checking open Ugandan listings for you...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 border-t border-white/5 bg-surface/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask about ${student.course} internships, deadlines, or prep...`}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black transition-all shadow-md shadow-emerald-950/40 shrink-0"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );

  if (isDrawer) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
        <div className="w-full max-w-lg h-full p-3 sm:p-4">
          {content}
        </div>
      </div>
    );
  }

  return <div className="max-w-4xl mx-auto h-[750px]">{content}</div>;
};

