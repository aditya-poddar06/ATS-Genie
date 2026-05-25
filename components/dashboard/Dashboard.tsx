"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, Search, Users, Heart, Cpu, Layout, BookOpen, Code2,
  ArrowLeft, ChevronRight, AlertTriangle, CheckCircle, Info,
  TrendingUp, Target, Zap,
} from "lucide-react";
import { FullAnalysis } from "@/lib/ats-engine";
import ScoreRing from "@/components/ui/ScoreRing";
import GlowCard from "@/components/ui/GlowCard";
import ScoresOverview from "./ScoresOverview";
import KeywordsPanel from "./KeywordsPanel";
import SkillsPanel from "./SkillsPanel";
import ImpactPanel from "./ImpactPanel";
import FormattingPanel from "./FormattingPanel";
import JobMatchPanel from "./JobMatchPanel";
import WeaknessesPanel from "./WeaknessesPanel";
import RecommendationsPanel from "./RecommendationsPanel";

interface DashboardProps {
  analysis: FullAnalysis;
  fileName: string;
  onBack: () => void;
}

const TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "keywords", label: "Keywords", icon: Search },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "impact", label: "Impact", icon: TrendingUp },
  { id: "formatting", label: "Formatting", icon: Layout },
  { id: "readability", label: "Readability", icon: BookOpen },
  { id: "weaknesses", label: "Issues", icon: AlertTriangle },
  { id: "recommendations", label: "Fixes", icon: Zap },
  { id: "jobmatch", label: "JD Match", icon: Target },
];

export default function Dashboard({ analysis, fileName, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-cyan-400";
    if (score >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60 text-sm truncate max-w-48">{fileName}</span>
            </div>
          </div>

          {/* Overall score badge */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-white/30">Overall Score</p>
              <p className={`text-2xl font-bold ${getScoreColor(analysis.scores.overall)}`}>
                {analysis.scores.overall}
                <span className="text-sm text-white/30">/100</span>
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                analysis.scores.overall >= 80
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : analysis.scores.overall >= 60
                  ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                  : analysis.scores.overall >= 40
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {getScoreLabel(analysis.scores.overall)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab navigation */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = tab.id === "jobmatch" && !analysis.jobMatch;

            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setActiveTab(tab.id)}
                disabled={isDisabled}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white border border-white/15"
                    : isDisabled
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.id === "weaknesses" && analysis.weaknesses.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">
                    {analysis.weaknesses.filter(w => w.severity === "critical").length}
                  </span>
                )}
                {tab.id === "jobmatch" && !analysis.jobMatch && (
                  <span className="text-xs text-white/20">(no JD)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && <ScoresOverview analysis={analysis} />}
            {activeTab === "keywords" && <KeywordsPanel analysis={analysis} />}
            {activeTab === "skills" && <SkillsPanel analysis={analysis} />}
            {activeTab === "impact" && <ImpactPanel analysis={analysis} />}
            {activeTab === "formatting" && <FormattingPanel analysis={analysis} />}
            {activeTab === "readability" && (
              <ReadabilityPanel analysis={analysis} />
            )}
            {activeTab === "weaknesses" && <WeaknessesPanel analysis={analysis} />}
            {activeTab === "recommendations" && <RecommendationsPanel analysis={analysis} />}
            {activeTab === "jobmatch" && analysis.jobMatch && (
              <JobMatchPanel analysis={analysis} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Inline readability panel
function ReadabilityPanel({ analysis }: { analysis: FullAnalysis }) {
  const { readability } = analysis;

  const metrics = [
    { label: "Readability Score", value: readability.score, suffix: "/100", color: "text-cyan-400" },
    { label: "Clarity Score", value: readability.clarity, suffix: "/100", color: "text-blue-400" },
    { label: "Avg Sentence Length", value: readability.avgSentenceLength, suffix: " words", color: "text-purple-400" },
    { label: "Complex Words", value: readability.complexWords, suffix: "", color: "text-amber-400" },
    { label: "Passive Voice", value: readability.passiveVoice, suffix: " instances", color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Grade card */}
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06] col-span-full lg:col-span-1">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Reading Grade</p>
          <div className="text-6xl font-bold gradient-text mb-2">{readability.grade}</div>
          <p className="text-white/40 text-sm">Flesch-Kincaid Grade Level</p>
          <div className="mt-4 p-3 rounded-xl bg-white/5">
            <p className="text-xs text-white/50">
              {readability.score >= 70
                ? "Your resume is easy to read — great for recruiters scanning quickly."
                : readability.score >= 50
                ? "Moderate readability. Consider simplifying some sentences."
                : "Complex language detected. Simplify for better recruiter engagement."}
            </p>
          </div>
        </GlowCard>

        {/* Metrics */}
        {metrics.map((m) => (
          <GlowCard key={m.label} className="glass rounded-2xl p-6 border border-white/[0.06]">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{m.label}</p>
            <p className={`text-3xl font-bold ${m.color}`}>
              {m.value}{m.suffix}
            </p>
          </GlowCard>
        ))}
      </div>

      {/* Passive voice warning */}
      {readability.passiveVoice > 3 && (
        <div className="glass rounded-2xl p-5 border border-amber-500/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium mb-1">Passive Voice Detected</p>
              <p className="text-white/50 text-sm">
                {readability.passiveVoice} passive voice constructions found. Replace with active voice:
                &quot;The project was managed by me&quot; → &quot;I managed the project&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
