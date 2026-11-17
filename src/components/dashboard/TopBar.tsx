import React, { useState } from "react";
import { Search, UserCheck, Plus, Sparkles, ChevronDown, LogIn, LogOut, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentProfile } from "@/types";
import { useTheme } from "@/lib/theme-context";

interface TopBarProps {
  activeProfile: StudentProfile;
  profiles: StudentProfile[];
  onSwitchProfile: (profile: StudentProfile) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAdvisor: () => void;
  onOpenIngest: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeProfile,
  profiles,
  onSwitchProfile,
  searchQuery,
  setSearchQuery,
  onOpenAdvisor,
  onOpenIngest,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { theme, toggle: toggleTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/5 dark:border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search internships, skills (e.g. React, Python), or orgs..."
          aria-label="Search opportunities, skills, or organizations"
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white/80 dark:bg-surface/90 border border-black/10 dark:border-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
      </div>

      {/* Action Buttons & Profile Switcher Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Ingest Button */}
        <button
          onClick={onOpenIngest}
          aria-label="Paste raw listing to extract"
          className="glass-button px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          title="Paste raw WhatsApp or LinkedIn listing to extract"
        >
          <Plus className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span className="hidden sm:inline">Paste Listing</span>
        </button>

        {/* Quick Advisor Trigger */}
        <button
          onClick={onOpenAdvisor}
          aria-label="Open AI Career Advisor"
          className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
        >
          <Sparkles className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
          <span className="hidden sm:inline">Ask Advisor</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 rounded-xl glass-button border border-white/10 dark:border-white/10 hover:border-emerald-500/40 transition-all text-gray-400 hover:text-emerald-400"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* Demo Student Profile Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label={`Student profile options for ${activeProfile.name}`}
            aria-expanded={showDropdown}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
              {activeProfile.name.charAt(0)}
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-semibold text-white flex items-center gap-1">
                {activeProfile.name}
                <span className="text-[10px] text-emerald-400 font-normal">
                  ({activeProfile.university.split(" ")[0]})
                </span>
              </div>
              <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                Year {activeProfile.year_of_study} • {activeProfile.course.replace("BSc. ", "")}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
          </button>

          {/* Switcher Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel shadow-2xl border border-white/10 p-2 z-50">
              <div className="px-3 py-2 border-b border-white/5">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Instant Demo Switcher
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Click to switch profiles and watch real-time matching change instantly.
                </p>
              </div>

              <div className="space-y-1 mt-1.5">
                {profiles.map((p) => {
                  const isSelected = p.id === activeProfile.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSwitchProfile(p);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all ${
                        isSelected
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-white"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{p.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-white/10 text-emerald-300">
                          {p.university.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {p.course} (Yr {p.year_of_study})
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-gray-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between px-1">
                <Link
                  href="/login"
                  onClick={() => setShowDropdown(false)}
                  className="text-[11px] text-gray-400 hover:text-emerald-300 flex items-center gap-1.5 p-1.5 rounded-lg"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Switch / Sign In</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1.5 p-1.5 rounded-lg"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

