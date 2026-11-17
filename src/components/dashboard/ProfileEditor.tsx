import React, { useState } from "react";
import { StudentProfile } from "@/types";
import { User, Sparkles, X, Plus, Check } from "lucide-react";

interface ProfileEditorProps {
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
  onSwitchProfile: (preset: StudentProfile) => void;
  profiles: StudentProfile[];
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onSaveProfile,
  onSwitchProfile,
  profiles,
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync if profile prop changes
  React.useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmed],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !formData.interests.includes(trimmed)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, trimmed],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Demo Switcher Quick Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon Live Demo Presets
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Instantly switch student personas to demonstrate live real-time skill matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSwitchProfile(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                p.id === formData.id
                  ? "bg-emerald-500 text-black border-emerald-400"
                  : "bg-surface text-gray-300 border-white/10 hover:border-emerald-500/40"
              }`}
            >
              {p.name.split(" ")[0]} ({p.university.split(" ")[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Profile Form Card */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border space-y-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Student Career Profile</h1>
              <p className="text-xs text-gray-400">
                Used strictly by the Gemini AI Advisor to recommend real opportunities.
              </p>
            </div>
          </div>

          {savedNotice && (
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Saved!
            </span>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">University / Institute</label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Degree / Course</label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Year of Study</label>
            <select
              value={formData.year_of_study}
              onChange={(e) => setFormData({ ...formData, year_of_study: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
            >
              <option value={1}>Year 1</option>
              <option value={2}>Year 2</option>
              <option value={3}>Year 3</option>
              <option value={4}>Year 4</option>
              <option value={5}>Year 5 / Postgrad</option>
            </select>
          </div>
        </div>

        {/* Skills Tag Management */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Technical Skills (Matched with Opportunity Requirements)
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Add skill (e.g., Docker, Flutter, PostgreSQL) and press Enter"
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-button flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Career Interests */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Career Interests / Domains
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.interests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface text-gray-300 border border-white/10 flex items-center gap-1.5"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:text-rose-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
              placeholder="Add domain (e.g., AI/ML, Fintech, Mobile, AgriTech)"
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-button flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Experience Summary */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Experience / Project Highlights
          </label>
          <textarea
            rows={3}
            value={formData.experience_summary}
            onChange={(e) => setFormData({ ...formData, experience_summary: e.target.value })}
            placeholder="Briefly describe your notable coursework projects, hackathons, or volunteer experience..."
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-white/10 text-white focus:border-emerald-500/60 focus:outline-none resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md shadow-emerald-950/50"
          >
            Save Profile & Update Matching
          </button>
        </div>
      </form>
    </div>
  );
};

