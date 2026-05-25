"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

interface CTAProps {
  onUploadClick: () => void;
}

export default function CTA({ onUploadClick }: CTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050515] to-black" />

      {/* Animated aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, rgba(56,189,248,0.04) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-20, -60, -20],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-medium text-cyan-400 uppercase tracking-widest mb-6">
            Start Now — It&apos;s Free
          </p>

          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
            Your Next Interview
            <br />
            <span className="gradient-text">Starts Here.</span>
          </h2>

          <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of job seekers who transformed their resumes with
            AI Genie. No account required. No data stored. Just results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={onUploadClick}
              className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(56,189,248,0.5)]"
            >
              <Zap className="w-5 h-5" />
              Analyze My Resume Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          <p className="text-white/20 text-sm mt-6">
            PDF & DOCX supported · Instant results · 100% private
          </p>
        </motion.div>
      </div>
    </section>
  );
}
