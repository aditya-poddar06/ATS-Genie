"use client";

import { motion } from "framer-motion";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import { Zap, ChevronRight, Lightbulb } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

const PRIORITY_CONFIG = {
  high: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/15",
    badge: "bg-red-500/15 text-red-400",
    dot: "bg-red-400",
  },
  medium: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/15",
    badge: "bg-amber-500/15 text-amber-400",
    dot: "bg-amber-400",
  },
  low: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/15",
    badge: "bg-blue-500/15 text-blue-400",
    dot: "bg-blue-400",
  },
};

export default function RecommendationsPanel({ analysis }: Props) {
  const { recommendations } = analysis;

  const high = recommendations.filter((r) => r.priority === "high");
  const medium = recommendations.filter((r) => r.priority === "medium");
  const low = recommendations.filter((r) => r.priority === "low");

  if (recommendations.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 border border-emerald-500/10 text-center">
        <Lightbulb className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
        <p className="text-emerald-400 font-semibold">No Recommendations</p>
        <p className="text-white/40 text-sm mt-1">Your resume is already well-optimized</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Priority summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "High Priority", count: high.length, ...PRIORITY_CONFIG.high },
          { label: "Medium Priority", count: medium.length, ...PRIORITY_CONFIG.medium },
          { label: "Low Priority", count: low.length, ...PRIORITY_CONFIG.low },
        ].map((item) => (
          <GlowCard
            key={item.label}
            className={`glass rounded-2xl p-5 border ${item.border} text-center`}
          >
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
            <p className="text-white/40 text-sm mt-1">{item.label}</p>
          </GlowCard>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((rec, i) => {
          const config = PRIORITY_CONFIG[rec.priority];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <GlowCard className={`glass rounded-2xl p-6 border ${config.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Zap className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                      </span>
                      <span className="text-xs text-white/30">{rec.category}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{rec.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{rec.description}</p>

                    {rec.example && (
                      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/[0.06]">
                        <p className="text-xs text-white/30 mb-1 uppercase tracking-widest">Example</p>
                        <p className="text-white/60 text-sm">{rec.example}</p>
                      </div>
                    )}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
