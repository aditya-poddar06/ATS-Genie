"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import BeforeAfter from "@/components/landing/BeforeAfter";
import CTA from "@/components/landing/CTA";
import UploadModal from "@/components/upload/UploadModal";
import Dashboard from "@/components/dashboard/Dashboard";
import { FullAnalysis } from "@/lib/ats-engine";

type AppState = "landing" | "dashboard";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState<FullAnalysis | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Smooth scroll init
  useEffect(() => {
    // Lenis smooth scroll (lightweight init)
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
      } catch {
        // Lenis not available, use native scroll
      }
    };

    if (appState === "landing") {
      initLenis();
    }
  }, [appState]);

  const handleAnalysisComplete = (result: FullAnalysis, name: string) => {
    setAnalysis(result);
    setFileName(name);
    setUploadModalOpen(false);
    setAppState("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setAppState("landing");
    setAnalysis(null);
    setFileName("");
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {appState === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar onUploadClick={() => setUploadModalOpen(true)} />

            <div id="hero">
              <Hero onUploadClick={() => setUploadModalOpen(true)} />
            </div>

            <div id="how-it-works">
              <HowItWorks />
            </div>

            <div id="features">
              <Features />
            </div>

            <div id="before-after">
              <BeforeAfter />
            </div>

            <CTA onUploadClick={() => setUploadModalOpen(true)} />

            {/* Footer */}
            <footer className="border-t border-white/[0.04] py-12">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-white/40 text-sm">AI Genie</span>
                </div>
                <p className="text-white/20 text-xs">
                  Built with local NLP · No data stored · 100% private
                </p>
              </div>
            </footer>

            <UploadModal
              isOpen={uploadModalOpen}
              onClose={() => setUploadModalOpen(false)}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {analysis && (
              <Dashboard
                analysis={analysis}
                fileName={fileName}
                onBack={handleBack}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
