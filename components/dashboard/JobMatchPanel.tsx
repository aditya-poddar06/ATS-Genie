"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import ScoreRing from "@/components/ui/ScoreRing";
import { CheckCircle, XCircle, Target, TrendingUp } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

export default function JobMatchPanel({ analysis }: Props) {
  const { jobMatch } = analysis;
  if (!jobMatch) return null;

  const heatmapData = jobMatch.heatmap.slice(0, 15).map((item) => ({
    name: item.keyword,
    importance: item.importance,
    inResume: item.inResume,
  }));

  return (
    <div className="space-y-6">
      {/* Score overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06] flex flex-col items-center justify-center">
          <ScoreRing score={jobMatch.matchScore} size={100} label="Match Score" />
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-cyan-500/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Semantic Similarity</p>
          <p className="text-4xl font-bold text-cyan-400">{jobMatch.semanticSimilarity}%</p>
          <p className="text-white/40 text-sm mt-1">Language overlap</p>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-emerald-500/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Keywords Matched</p>
          <p className="text-4xl font-bold text-emerald-400">{jobMatch.matchedKeywords.length}</p>
          <p className="text-white/40 text-sm mt-1">Found in resume</p>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-amber-500/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Missing Keywords</p>
          <p className="text-4xl font-bold text-amber-400">{jobMatch.missingKeywords.length}</p>
          <p className="text-white/40 text-sm mt-1">Not in resume</p>
        </GlowCard>
      </div>

      {/* Keyword heatmap */}
      <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Keyword Heatmap</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={heatmapData} layout="vertical" barSize={14}>
            <XAxis
              type="number"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = heatmapData.find((d) => d.name === label);
                  return (
                    <div className="glass rounded-xl px-4 py-3 border border-white/10">
                      <p className="text-white font-semibold">{label}</p>
                      <p className={`text-xs mt-1 ${item?.inResume ? "text-emerald-400" : "text-red-400"}`}>
                        {item?.inResume ? "✓ Found in resume" : "✗ Missing from resume"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
              {heatmapData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.inResume ? "#34d399" : "#f87171"}
                  fillOpacity={0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-400/70" />
            <span className="text-xs text-white/40">Found in resume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-400/70" />
            <span className="text-xs text-white/40">Missing from resume</span>
          </div>
        </div>
      </GlowCard>

      {/* Matched vs Missing */}
      <div className="grid lg:grid-cols-2 gap-6">
        <GlowCard
          glowColor="rgba(52,211,153,0.1)"
          className="glass rounded-2xl p-6 border border-emerald-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-400">
              Matched Keywords ({jobMatch.matchedKeywords.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobMatch.matchedKeywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
              >
                {kw}
              </span>
            ))}
            {jobMatch.matchedKeywords.length === 0 && (
              <p className="text-white/30 text-sm">No keyword matches found</p>
            )}
          </div>
        </GlowCard>

        <GlowCard
          glowColor="rgba(251,191,36,0.1)"
          className="glass rounded-2xl p-6 border border-amber-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-semibold text-amber-400">
              Missing Keywords ({jobMatch.missingKeywords.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobMatch.missingKeywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium"
              >
                + {kw}
              </span>
            ))}
            {jobMatch.missingKeywords.length === 0 && (
              <p className="text-white/30 text-sm">All key terms matched</p>
            )}
          </div>
        </GlowCard>
      </div>

      {/* Suggestions */}
      {jobMatch.suggestions.length > 0 && (
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-semibold text-cyan-400">Tailoring Suggestions</p>
          </div>
          <div className="space-y-3">
            {jobMatch.suggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-cyan-500/5"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm">{suggestion}</p>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      )}
    </div>
  );
}
