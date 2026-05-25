"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import ScoreRing from "@/components/ui/ScoreRing";

interface HeroProps {
  onUploadClick: () => void;
}

const DEMO_KEYWORDS = [
  { word: "React", score: 95, found: true },
  { word: "TypeScript", score: 88, found: true },
  { word: "Node.js", score: 72, found: true },
  { word: "AWS", score: 45, found: false },
  { word: "Docker", score: 30, found: false },
];

export default function Hero({ onUploadClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const spotlightX = useTransform(springX, (v) => `${v}px`);
  const spotlightY = useTransform(springY, (v) => `${v}px`);

  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Simulate scanning animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true);
      setScanProgress(0);
      const scanInterval = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(scanInterval);
            setIsScanning(false);
            return 100;
          }
          return p + 2;
        });
      }, 30);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const words = ["Doors", "Opportunities", "Interviews", "Offers"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Mesh background */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(56,189,248,0.06), transparent 60%)`,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
                AI-Powered Resume Intelligence
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">Your Resume</span>
              <br />
              <span className="text-white">Should Open </span>
              <span className="relative inline-block">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="gradient-text"
                >
                  {words[wordIndex]}
                </motion.span>
              </span>
              <br />
              <span className="text-white/40">— Not Get Ignored.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/50 leading-relaxed mb-10 max-w-lg"
            >
              Analyze ATS compatibility, recruiter impact, keyword gaps, and
              formatting quality instantly. No AI APIs. No data sent anywhere.
              Pure intelligence, locally.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticButton
                onClick={onUploadClick}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Analyze My Resume
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>

              <MagneticButton
                onClick={onUploadClick}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/70 font-medium text-sm hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                Try Live Demo
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-8"
            >
              {[
                { value: "98%", label: "ATS Accuracy" },
                { value: "2.4s", label: "Analysis Time" },
                { value: "50+", label: "Data Points" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Main dashboard card */}
            <div className="relative float">
              <div className="glass-strong rounded-3xl p-6 gradient-border">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Resume Analysis</p>
                    <p className="text-white font-semibold">John_Resume_2024.pdf</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Analyzed</span>
                  </div>
                </div>

                {/* Score rings */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <ScoreRing score={87} size={90} label="ATS Score" delay={0.5} />
                  <ScoreRing score={74} size={90} label="Recruiter" delay={0.7} />
                  <ScoreRing score={91} size={90} label="Impact" delay={0.9} />
                </div>

                {/* Scan line animation */}
                {isScanning && (
                  <div className="relative h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                )}

                {/* Keywords */}
                <div className="space-y-2">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Keyword Analysis</p>
                  {DEMO_KEYWORDS.map((kw, i) => (
                    <motion.div
                      key={kw.word}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          kw.found ? "bg-emerald-400" : "bg-red-400/60"
                        }`}
                      />
                      <span className="text-sm text-white/70 flex-1">{kw.word}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            kw.found
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                              : "bg-red-500/40"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${kw.score}%` }}
                          transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs text-white/40 w-8 text-right">{kw.score}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -left-12 top-1/3 glass rounded-2xl p-4 border border-white/10 float-delayed"
            >
              <p className="text-xs text-white/40 mb-1">Readability</p>
              <p className="text-2xl font-bold text-cyan-400">A+</p>
              <p className="text-xs text-white/30">Grade Level</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -right-8 bottom-1/4 glass rounded-2xl p-4 border border-white/10 float-slow"
            >
              <p className="text-xs text-white/40 mb-1">Skills Found</p>
              <p className="text-2xl font-bold text-purple-400">24</p>
              <p className="text-xs text-white/30">Technical</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
