"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3, Search, Users, Heart, Cpu, Layout, BookOpen, Code2,
} from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

const FEATURES = [
  {
    icon: BarChart3,
    title: "ATS Analysis",
    description:
      "Deep compatibility scoring against 50+ ATS systems. Know exactly how machines read your resume.",
    color: "text-cyan-400",
    glow: "rgba(56,189,248,0.15)",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    icon: Search,
    title: "Keyword Matching",
    description:
      "Semantic keyword analysis with density scoring, gap detection, and industry-specific term mapping.",
    color: "text-blue-400",
    glow: "rgba(96,165,250,0.15)",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    icon: Users,
    title: "Recruiter Intelligence",
    description:
      "Understand how human recruiters perceive your resume. Impact scoring, first-impression analysis.",
    color: "text-indigo-400",
    glow: "rgba(129,140,248,0.15)",
    gradient: "from-indigo-500/10 to-transparent",
  },
  {
    icon: Heart,
    title: "Resume Health",
    description:
      "Comprehensive health check covering structure, completeness, contact info, and section balance.",
    color: "text-purple-400",
    glow: "rgba(167,139,250,0.15)",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    icon: Cpu,
    title: "Semantic Analysis",
    description:
      "NLP-powered semantic understanding of your experience, skills, and achievements beyond keywords.",
    color: "text-violet-400",
    glow: "rgba(196,181,253,0.15)",
    gradient: "from-violet-500/10 to-transparent",
  },
  {
    icon: Layout,
    title: "Formatting Diagnostics",
    description:
      "Detect formatting issues that break ATS parsing: tables, columns, headers, fonts, and more.",
    color: "text-pink-400",
    glow: "rgba(244,114,182,0.15)",
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    icon: BookOpen,
    title: "Readability Engine",
    description:
      "Flesch-Kincaid scoring, passive voice detection, sentence complexity, and clarity analysis.",
    color: "text-rose-400",
    glow: "rgba(251,113,133,0.15)",
    gradient: "from-rose-500/10 to-transparent",
  },
  {
    icon: Code2,
    title: "Skill Detection",
    description:
      "Auto-detect 200+ technical skills, tools, frameworks, certifications, and soft skills.",
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.15)",
    gradient: "from-amber-500/10 to-transparent",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Aurora background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium text-purple-400 uppercase tracking-widest mb-4">
            Platform Features
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Every Dimension of
            <br />
            <span className="gradient-text">Resume Intelligence</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Eight specialized analysis engines working in concert to give you
            the most complete resume intelligence available.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <GlowCard
                  glowColor={feature.glow}
                  className="h-full glass rounded-2xl p-6 border border-white/[0.06] cursor-default"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient} border border-white/[0.06]`}
                  >
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>

                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
