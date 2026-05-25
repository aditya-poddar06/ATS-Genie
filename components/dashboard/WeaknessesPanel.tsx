"use client";

import { motion } from "framer-motion";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import { AlertTriangle, AlertCircle, Info, ArrowRight } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/5",
    border: "border-red-500/15",
    badge: "bg-red-500/15 text-red-400",
    label: "Critical",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-500/5",
    border: "border-amber-500/15",
    badge: "bg-amber-500/15 text-amber-400",
    label: "Warning",
  },
  info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/5",
    border: "border-blue-500/15",
    badge: "bg-blue-500/15 text-blue-400",
    label: "Info",
  },
};

export default function WeaknessesPanel({ analysis }: Props) {
  const { weaknesses } = analysis;

  const critical = weaknesses.filter((w) => w.severity === "critical");
  const warnings = weaknesses.filter((w) => w.severity === "warning");
  const info = weaknesses.filter((w) => w.severity === "info");

  if (weaknesses.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 border border-emerald-500/10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 text-emerald-400" />
        </div>
        <p className="text-emerald-400 font-semibold text-lg">No Issues Found</p>
        <p className="text-white/40 text-sm mt-2">Your resume looks clean and well-structured</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical", count: critical.length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/15" },
          { label: "Warnings", count: warnings.length, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/15" },
          { label: "Info", count: info.length, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/15" },
        ].map((item) => (
          <GlowCard
            key={item.label}
            className={`glass rounded-2xl p-5 border ${item.bg} text-center`}
          >
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
            <p className="text-white/40 text-sm mt-1">{item.label}</p>
          </GlowCard>
        ))}
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        {weaknesses.map((weakness, i) => {
          const config = SEVERITY_CONFIG[weakness.severity];
          const Icon = config.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <GlowCard
                className={`glass rounded-2xl p-5 border ${config.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-white/30">{weakness.category}</span>
                    </div>
                    <p className="text-white/80 font-medium text-sm mb-2">{weakness.issue}</p>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                      <p className="text-white/40 text-sm">{weakness.fix}</p>
                    </div>
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
