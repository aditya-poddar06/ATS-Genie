"use client";

import { motion } from "framer-motion";
import { FullAnalysis } from "@/lib/ats-engine";
import GlowCard from "@/components/ui/GlowCard";
import { Code2, Users, Wrench, Award, Globe } from "lucide-react";

interface Props {
  analysis: FullAnalysis;
}

const SKILL_CATEGORIES = [
  {
    key: "technical" as const,
    label: "Technical Skills",
    icon: Code2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    tagColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  },
  {
    key: "soft" as const,
    label: "Soft Skills",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    tagColor: "bg-purple-500/10 border-purple-500/20 text-purple-300",
  },
  {
    key: "tools" as const,
    label: "Tools & Platforms",
    icon: Wrench,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tagColor: "bg-blue-500/10 border-blue-500/20 text-blue-300",
  },
  {
    key: "certifications" as const,
    label: "Certifications",
    icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    tagColor: "bg-amber-500/10 border-amber-500/20 text-amber-300",
  },
  {
    key: "languages" as const,
    label: "Languages",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tagColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
  },
];

export default function SkillsPanel({ analysis }: Props) {
  const { skills } = analysis;
  const totalSkills =
    skills.technical.length +
    skills.soft.length +
    skills.tools.length +
    skills.certifications.length +
    skills.languages.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = skills[cat.key].length;
          return (
            <GlowCard
              key={cat.key}
              className={`glass rounded-2xl p-4 border ${cat.border} text-center`}
            >
              <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-4 h-4 ${cat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${cat.color}`}>{count}</p>
              <p className="text-white/40 text-xs mt-1">{cat.label}</p>
            </GlowCard>
          );
        })}
      </div>

      {/* Skill categories */}
      <div className="space-y-4">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const skillList = skills[cat.key];

          if (skillList.length === 0) {
            return (
              <GlowCard
                key={cat.key}
                className="glass rounded-2xl p-5 border border-white/[0.06] opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-white/20" />
                  <p className="text-white/30 text-sm">
                    No {cat.label.toLowerCase()} detected
                  </p>
                </div>
              </GlowCard>
            );
          }

          return (
            <GlowCard
              key={cat.key}
              className={`glass rounded-2xl p-6 border ${cat.border}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${cat.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                </div>
                <p className={`font-semibold ${cat.color}`}>{cat.label}</p>
                <span className="ml-auto text-xs text-white/30">{skillList.length} found</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${cat.tagColor}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </GlowCard>
          );
        })}
      </div>

      {/* Total */}
      <div className="text-center py-4">
        <p className="text-white/30 text-sm">
          Total: <span className="text-white font-semibold">{totalSkills}</span> skills detected across all categories
        </p>
      </div>
    </div>
  );
}
