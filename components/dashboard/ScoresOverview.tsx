"use client";

import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import { FullAnalysis } from "@/lib/ats-engine";
import ScoreRing from "@/components/ui/ScoreRing";
import GlowCard from "@/components/ui/GlowCard";
import { FileText, Hash, Layers } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

const SCORE_COLORS: Record<string, string> = {
  ats: "#38bdf8",
  recruiter: "#818cf8",
  impact: "#34d399",
  formatting: "#f59e0b",
  readability: "#a78bfa",
  keywords: "#22d3ee",
};

export default function ScoresOverview({ analysis }: Props) {
  const { scores } = analysis;

  const radarData = [
    { subject: "ATS", value: scores.ats, fullMark: 100 },
    { subject: "Recruiter", value: scores.recruiter, fullMark: 100 },
    { subject: "Impact", value: scores.impact, fullMark: 100 },
    { subject: "Format", value: scores.formatting, fullMark: 100 },
    { subject: "Readability", value: scores.readability, fullMark: 100 },
    { subject: "Keywords", value: scores.keywords, fullMark: 100 },
  ];

  const barData = [
    { name: "ATS", score: scores.ats, color: SCORE_COLORS.ats },
    { name: "Recruiter", score: scores.recruiter, color: SCORE_COLORS.recruiter },
    { name: "Impact", score: scores.impact, color: SCORE_COLORS.impact },
    { name: "Formatting", score: scores.formatting, color: SCORE_COLORS.formatting },
    { name: "Readability", score: scores.readability, color: SCORE_COLORS.readability },
    { name: "Keywords", score: scores.keywords, color: SCORE_COLORS.keywords },
  ];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-xl px-4 py-3 border border-white/10">
          <p className="text-white font-semibold">{payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Score rings row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {barData.map((item, i) => (
          <GlowCard
            key={item.name}
            glowColor={`${item.color}20`}
            className="glass rounded-2xl p-5 border border-white/[0.06] flex flex-col items-center"
          >
            <ScoreRing
              score={item.score}
              size={80}
              strokeWidth={6}
              delay={i * 0.1}
            />
            <p className="text-white/60 text-xs mt-3 font-medium">{item.name}</p>
          </GlowCard>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Score Radar</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#38bdf8"
                fill="#38bdf8"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </GlowCard>

        {/* Bar chart */}
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Score Breakdown</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barSize={28}>
              <XAxis
                dataKey="name"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlowCard>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: FileText,
            label: "Word Count",
            value: analysis.wordCount.toLocaleString(),
            sub: analysis.wordCount < 300 ? "Too short" : analysis.wordCount > 800 ? "Consider trimming" : "Good length",
            color: "text-cyan-400",
          },
          {
            icon: Layers,
            label: "Sections Found",
            value: `${analysis.sections.filter((s) => s.detected).length}/${analysis.sections.length}`,
            sub: "Resume sections",
            color: "text-blue-400",
          },
          {
            icon: Hash,
            label: "Skills Detected",
            value: analysis.skills.technical.length + analysis.skills.soft.length,
            sub: `${analysis.skills.technical.length} technical, ${analysis.skills.soft.length} soft`,
            color: "text-purple-400",
          },
          {
            icon: FileText,
            label: "Action Verbs",
            value: analysis.impact.actionVerbs.length,
            sub: analysis.impact.actionVerbs.length < 5 ? "Add more" : "Good variety",
            color: "text-emerald-400",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <GlowCard
              key={stat.label}
              className="glass rounded-2xl p-5 border border-white/[0.06]"
            >
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
            </GlowCard>
          );
        })}
      </div>

      {/* Sections detected */}
      <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-5">Section Detection</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {analysis.sections.map((section) => (
            <div
              key={section.name}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                section.detected
                  ? "bg-emerald-500/5 border-emerald-500/15"
                  : "bg-red-500/5 border-red-500/10"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  section.detected ? "bg-emerald-400" : "bg-red-400/50"
                }`}
              />
              <span className="text-xs text-white/60 truncate">{section.name}</span>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  );
}
