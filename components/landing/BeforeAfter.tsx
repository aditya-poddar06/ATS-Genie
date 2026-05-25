"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, X, Check } from "lucide-react";

const TRANSFORMATIONS = [
  {
    before: "Responsible for managing a team of developers and overseeing project delivery",
    after: "Led cross-functional team of 8 engineers, delivering 3 major product releases 2 weeks ahead of schedule",
    improvement: "+340% Impact",
    category: "Leadership",
  },
  {
    before: "Helped improve the performance of the application",
    after: "Reduced API response time by 67% (from 1.8s to 0.6s) through Redis caching and query optimization",
    improvement: "+280% Clarity",
    category: "Technical",
  },
  {
    before: "Worked on increasing sales and revenue for the company",
    after: "Grew ARR from $2.1M to $4.8M (128% YoY) by launching 3 new product tiers and reducing churn by 22%",
    improvement: "+420% Specificity",
    category: "Business",
  },
  {
    before: "Participated in developing new features for the mobile app",
    after: "Architected and shipped 12 React Native features serving 500K+ DAU, achieving 4.8★ App Store rating",
    improvement: "+380% Credibility",
    category: "Mobile",
  },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#03030f] to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-4">
            Before & After
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Watch Weak Bullets
            <br />
            <span className="gradient-text">Become Powerful</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            AI Genie identifies weak language and shows you exactly how to transform
            vague descriptions into compelling, quantified achievements.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {TRANSFORMATIONS.map((t, i) => (
            <button
              key={t.category}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === i
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 hover:text-white/60 border border-transparent"
              }`}
            >
              {t.category}
            </button>
          ))}
        </motion.div>

        {/* Transformation display */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {/* Before */}
          <div className="glass rounded-2xl p-6 border border-red-500/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-3 h-3 text-red-400" />
              </div>
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">Before</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400/60 mt-1 flex-shrink-0">•</span>
              <p className="text-white/50 leading-relaxed text-sm">
                {TRANSFORMATIONS[activeIndex].before}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {["Vague", "No metrics", "Passive", "Weak verb"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-red-500/10 text-red-400/70 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white/40" />
            </div>
          </div>

          {/* After */}
          <div className="glass rounded-2xl p-6 border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">After</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400">
                  {TRANSFORMATIONS[activeIndex].improvement}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400/60 mt-1 flex-shrink-0">•</span>
              <p className="text-white/80 leading-relaxed text-sm font-medium">
                {TRANSFORMATIONS[activeIndex].after}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {["Quantified", "Action verb", "Specific", "Impactful"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400/70 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TRANSFORMATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
