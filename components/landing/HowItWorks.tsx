"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, FileSearch, Brain, Target, Lightbulb } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Resume",
    description:
      "Drag and drop your PDF or DOCX file. We parse it instantly in your browser — nothing leaves your device.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(56,189,248,0.2)",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Extract & Parse Content",
    description:
      "Our engine extracts every section, bullet point, skill, and achievement with surgical precision.",
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(99,102,241,0.2)",
  },
  {
    icon: Brain,
    number: "03",
    title: "Deep ATS Analysis",
    description:
      "50+ weighted checks analyze your resume against ATS algorithms, recruiter expectations, and industry standards.",
    color: "from-indigo-500 to-purple-600",
    glow: "rgba(167,139,250,0.2)",
  },
  {
    icon: Target,
    number: "04",
    title: "Job Description Match",
    description:
      "Paste any job description and get instant keyword overlap, semantic similarity, and gap analysis.",
    color: "from-purple-500 to-pink-600",
    glow: "rgba(236,72,153,0.2)",
  },
  {
    icon: Lightbulb,
    number: "05",
    title: "Actionable Insights",
    description:
      "Get prioritized recommendations with specific examples to transform your resume from ignored to irresistible.",
    color: "from-pink-500 to-rose-600",
    glow: "rgba(244,63,94,0.2)",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium text-cyan-400 uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            From Upload to
            <br />
            <span className="gradient-text">Intelligence in Seconds</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            A five-step process that transforms raw resume text into actionable career intelligence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

          <div className="space-y-16">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className={`flex items-center gap-8 lg:gap-16 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <div
                      className={`inline-flex items-center gap-2 mb-4 ${
                        isLeft ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="text-xs font-bold text-white/20 tracking-widest">
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Center icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, ${step.glow}, transparent)`,
                        boxShadow: `0 0 40px ${step.glow}`,
                      }}
                    >
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-20`} />
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 rounded-3xl animate-ping opacity-20"
                      style={{ background: `linear-gradient(135deg, ${step.glow}, transparent)` }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
