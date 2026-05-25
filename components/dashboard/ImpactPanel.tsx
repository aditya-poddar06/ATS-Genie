"use client";

import { motion } from "framer-motion";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import ScoreRing from "@/components/ui/ScoreRing";
import { TrendingUp, TrendingDown, Zap, AlertTriangle } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

export default function ImpactPanel({ analysis }: Props) {
  const { impact } = analysis;

  return (
    <div className="space-y-6">
      {/* Impact score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06] flex flex-col items-center justify-center">
          <ScoreRing score={impact.impactScore} size={100} label="Impact Score" />
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-emerald-500/10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-emerald-400" />
            <p className="text-xs text-white/40 uppercase tracking-widest">Action Verbs</p>
          </div>
          <p className="text-4xl font-bold text-emerald-400">{impact.actionVerbs.length}</p>
          <p className="text-white/40 text-sm mt-1">
            {impact.actionVerbs.length < 5 ? "Add more power verbs" : "Good variety"}
          </p>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-cyan-500/10">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-white/40 uppercase tracking-widest">Quantified</p>
          </div>
          <p className="text-4xl font-bold text-cyan-400">{impact.quantifiedAchievements.length}</p>
          <p className="text-white/40 text-sm mt-1">Measurable achievements</p>
        </GlowCard>

        <GlowCard className="glass rounded-2xl p-6 border border-red-500/10">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <p className="text-xs text-white/40 uppercase tracking-widest">Weak Phrases</p>
          </div>
          <p className="text-4xl font-bold text-red-400">{impact.weakPhrases.length}</p>
          <p className="text-white/40 text-sm mt-1">Need replacing</p>
        </GlowCard>
      </div>

      {/* Action verbs */}
      {impact.actionVerbs.length > 0 && (
        <GlowCard
          glowColor="rgba(52,211,153,0.1)"
          className="glass rounded-2xl p-6 border border-emerald-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-400">
              Strong Action Verbs Found
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {impact.actionVerbs.map((verb, i) => (
              <motion.span
                key={verb}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium capitalize"
              >
                {verb}
              </motion.span>
            ))}
          </div>
        </GlowCard>
      )}

      {/* Quantified achievements */}
      {impact.quantifiedAchievements.length > 0 && (
        <GlowCard
          glowColor="rgba(56,189,248,0.1)"
          className="glass rounded-2xl p-6 border border-cyan-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-semibold text-cyan-400">
              Quantified Achievements
            </p>
          </div>
          <div className="space-y-2">
            {impact.quantifiedAchievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/5"
              >
                <span className="text-cyan-400 font-bold text-sm">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      )}

      {/* Weak phrases */}
      {impact.weakPhrases.length > 0 && (
        <GlowCard
          glowColor="rgba(248,113,113,0.1)"
          className="glass rounded-2xl p-6 border border-red-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-sm font-semibold text-red-400">
              Weak Phrases to Replace
            </p>
          </div>
          <div className="space-y-3">
            {impact.weakPhrases.map((phrase, i) => (
              <motion.div
                key={phrase}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10"
              >
                <span className="text-red-300/70 text-sm line-through">&quot;{phrase}&quot;</span>
                <span className="text-white/40 text-xs">→ Use action verb instead</span>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      )}

      {/* No quantified achievements warning */}
      {impact.quantifiedAchievements.length === 0 && (
        <div className="glass rounded-2xl p-6 border border-amber-500/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium mb-2">No Quantified Achievements Found</p>
              <p className="text-white/50 text-sm mb-4">
                Numbers dramatically increase recruiter engagement. Add metrics to your bullets:
              </p>
              <div className="space-y-2">
                {[
                  "Increased sales by 45% in Q3 2024",
                  "Reduced deployment time from 2 hours to 15 minutes",
                  "Led team of 6 engineers across 3 time zones",
                  "Saved $120K annually through process automation",
                ].map((example) => (
                  <div key={example} className="flex items-center gap-2 text-sm text-white/40">
                    <span className="text-amber-400">•</span>
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
