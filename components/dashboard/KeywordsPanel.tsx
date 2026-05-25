"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

export default function KeywordsPanel({ analysis }: Props) {
  const { keywords } = analysis;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-xl px-4 py-3 border border-white/10">
          <p className="text-white/60 text-xs mb-1">{label}</p>
          <p className="text-white font-semibold">Relevance: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Density overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Keyword Density</p>
          <p className="text-4xl font-bold text-cyan-400">{keywords.density}%</p>
          <p className="text-white/40 text-sm mt-1">Technical coverage</p>
          <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${keywords.density}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Keywords Found</p>
          <p className="text-4xl font-bold text-emerald-400">{keywords.found.length}</p>
          <p className="text-white/40 text-sm mt-1">Matched skills</p>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Gaps Detected</p>
          <p className="text-4xl font-bold text-amber-400">{keywords.missing.length}</p>
          <p className="text-white/40 text-sm mt-1">Missing keywords</p>
        </GlowCard>
      </div>

      {/* Top keywords chart */}
      <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Top Keywords by Relevance</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={keywords.topKeywords.slice(0, 12)}
            layout="vertical"
            barSize={16}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="word"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="relevance" radius={[0, 6, 6, 0]}>
              {keywords.topKeywords.slice(0, 12).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.relevance > 60 ? "#38bdf8" : entry.relevance > 30 ? "#818cf8" : "#475569"}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlowCard>

      {/* Found vs Missing */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Found */}
        <GlowCard
          glowColor="rgba(52,211,153,0.1)"
          className="glass rounded-2xl p-6 border border-emerald-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-400">
              Keywords Found ({keywords.found.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.found.map((kw) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </GlowCard>

        {/* Missing */}
        <GlowCard
          glowColor="rgba(251,191,36,0.1)"
          className="glass rounded-2xl p-6 border border-amber-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-semibold text-amber-400">
              Suggested Additions ({keywords.missing.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.missing.map((kw) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium"
              >
                + {kw}
              </motion.span>
            ))}
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
