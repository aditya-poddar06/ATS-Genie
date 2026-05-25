"use client";

import { motion } from "framer-motion";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import { CheckCircle, XCircle, AlertTriangle, Mail, Phone, Link2, GitBranch, List, FileText } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

export default function FormattingPanel({ analysis }: Props) {
  const { formatting } = analysis;

  const contactChecks = [
    { label: "Email Address", value: formatting.hasEmail, icon: Mail },
    { label: "Phone Number", value: formatting.hasPhone, icon: Phone },
    { label: "LinkedIn URL", value: formatting.hasLinkedIn, icon: Link2 },
    { label: "GitHub Profile", value: formatting.hasGitHub, icon: GitBranch },
  ];

  const structureChecks = [
    {
      label: "Bullet Points",
      value: formatting.bulletPoints,
      status: formatting.bulletPoints >= 10 ? "good" : formatting.bulletPoints >= 5 ? "warn" : "bad",
      detail: `${formatting.bulletPoints} found`,
    },
    {
      label: "Avg Bullet Length",
      value: formatting.avgBulletLength,
      status: formatting.avgBulletLength <= 120 ? "good" : formatting.avgBulletLength <= 150 ? "warn" : "bad",
      detail: `${formatting.avgBulletLength} chars`,
    },
    {
      label: "Sections",
      value: formatting.sectionCount,
      status: formatting.sectionCount >= 5 ? "good" : formatting.sectionCount >= 3 ? "warn" : "bad",
      detail: `${formatting.sectionCount} detected`,
    },
    {
      label: "Estimated Pages",
      value: formatting.estimatedPages,
      status: formatting.estimatedPages <= 2 ? "good" : formatting.estimatedPages <= 3 ? "warn" : "bad",
      detail: `~${formatting.estimatedPages} page${formatting.estimatedPages !== 1 ? "s" : ""}`,
    },
  ];

  const statusColor = {
    good: "text-emerald-400",
    warn: "text-amber-400",
    bad: "text-red-400",
  };

  const statusBg = {
    good: "bg-emerald-500/10 border-emerald-500/15",
    warn: "bg-amber-500/10 border-amber-500/15",
    bad: "bg-red-500/10 border-red-500/15",
  };

  return (
    <div className="space-y-6">
      {/* Contact info */}
      <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-5">Contact Information</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {contactChecks.map((check) => {
            const Icon = check.icon;
            return (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
                  check.value
                    ? "bg-emerald-500/5 border-emerald-500/15"
                    : "bg-red-500/5 border-red-500/10"
                }`}
              >
                <Icon className={`w-5 h-5 ${check.value ? "text-emerald-400" : "text-red-400/50"}`} />
                <span className="text-xs text-white/60 text-center">{check.label}</span>
                {check.value ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400/50" />
                )}
              </motion.div>
            );
          })}
        </div>
      </GlowCard>

      {/* Structure metrics */}
      <GlowCard className="glass rounded-2xl p-6 border border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-5">Structure Metrics</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {structureChecks.map((check) => (
            <div
              key={check.label}
              className={`p-4 rounded-xl border ${statusBg[check.status as keyof typeof statusBg]}`}
            >
              <p className={`text-2xl font-bold ${statusColor[check.status as keyof typeof statusColor]}`}>
                {check.detail}
              </p>
              <p className="text-white/50 text-xs mt-1">{check.label}</p>
            </div>
          ))}
        </div>
      </GlowCard>

      {/* Issues */}
      {formatting.issues.length > 0 && (
        <GlowCard
          glowColor="rgba(248,113,113,0.1)"
          className="glass rounded-2xl p-6 border border-red-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-sm font-semibold text-red-400">
              Formatting Issues ({formatting.issues.length})
            </p>
          </div>
          <div className="space-y-3">
            {formatting.issues.map((issue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5"
              >
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm">{issue}</p>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      )}

      {/* Suggestions */}
      {formatting.suggestions.length > 0 && (
        <GlowCard
          glowColor="rgba(56,189,248,0.1)"
          className="glass rounded-2xl p-6 border border-cyan-500/10"
        >
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-semibold text-cyan-400">
              Improvement Suggestions
            </p>
          </div>
          <div className="space-y-3">
            {formatting.suggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-cyan-500/5"
              >
                <span className="text-cyan-400 font-bold text-sm flex-shrink-0">→</span>
                <p className="text-white/60 text-sm">{suggestion}</p>
              </motion.div>
            ))}
          </div>
        </GlowCard>
      )}

      {/* All good */}
      {formatting.issues.length === 0 && (
        <div className="glass rounded-2xl p-6 border border-emerald-500/10 text-center">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-emerald-400 font-semibold">Formatting Looks Great</p>
          <p className="text-white/40 text-sm mt-1">No major formatting issues detected</p>
        </div>
      )}
    </div>
  );
}
