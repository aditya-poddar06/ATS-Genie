"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, X, Loader2 } from "lucide-react";
import { FullAnalysis } from "@/lib/ats-engine";

interface UploadZoneProps {
  onAnalysisComplete: (analysis: FullAnalysis, fileName: string) => void;
}

type UploadState = "idle" | "dragging" | "uploading" | "parsing" | "analyzing" | "done" | "error";

const STATE_MESSAGES: Record<UploadState, string> = {
  idle: "Drop your resume here",
  dragging: "Release to upload",
  uploading: "Uploading file...",
  parsing: "Extracting content...",
  analyzing: "Running deep analysis...",
  done: "Analysis complete",
  error: "Something went wrong",
};

const STATE_PROGRESS: Record<UploadState, number> = {
  idle: 0,
  dragging: 0,
  uploading: 20,
  parsing: 50,
  analyzing: 80,
  done: 100,
  error: 0,
};

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [showJD, setShowJD] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      if (!file) return;

      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      const validExts = [".pdf", ".docx", ".txt"];
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));

      if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
        setError("Please upload a PDF, DOCX, or TXT file");
        setState("error");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB");
        setState("error");
        return;
      }

      setFileName(file.name);
      setError("");

      try {
        // Step 1: Upload & parse
        setState("uploading");
        await new Promise((r) => setTimeout(r, 400));

        setState("parsing");
        const formData = new FormData();
        formData.append("file", file);

        const parseRes = await fetch("/api/parse", {
          method: "POST",
          body: formData,
        });

        if (!parseRes.ok) {
          const err = await parseRes.json();
          throw new Error(err.error || "Failed to parse file");
        }

        const { text } = await parseRes.json();

        // Step 2: Analyze
        setState("analyzing");
        await new Promise((r) => setTimeout(r, 600));

        const analyzeRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            jobDescription: jobDescription.trim() || undefined,
          }),
        });

        if (!analyzeRes.ok) {
          const err = await analyzeRes.json();
          throw new Error(err.error || "Analysis failed");
        }

        const analysis: FullAnalysis = await analyzeRes.json();

        setState("done");
        await new Promise((r) => setTimeout(r, 800));
        onAnalysisComplete(analysis, file.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        setState("error");
      }
    },
    [jobDescription, onAnalysisComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setState("idle");
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const isProcessing = ["uploading", "parsing", "analyzing"].includes(state);
  const progress = STATE_PROGRESS[state];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!isProcessing) setState("dragging"); }}
        onDragLeave={() => { if (!isProcessing) setState("idle"); }}
        onDrop={handleDrop}
        className={`upload-zone relative rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
          state === "dragging" ? "drag-over" : ""
        } ${isProcessing ? "pointer-events-none" : ""}`}
        onClick={() => {
          if (!isProcessing) document.getElementById("file-input")?.click();
        }}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={handleFileInput}
        />

        <AnimatePresence mode="wait">
          {state === "idle" || state === "dragging" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto">
                <Upload className={`w-7 h-7 text-cyan-400 transition-transform duration-300 ${state === "dragging" ? "scale-110" : ""}`} />
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">
                  {state === "dragging" ? "Release to analyze" : "Drop your resume here"}
                </p>
                <p className="text-white/40 text-sm">
                  PDF, DOCX, or TXT · Max 10MB
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs text-white/50">or click to browse files</span>
              </div>
            </motion.div>
          ) : state === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <p className="text-red-400 font-semibold mb-1">Upload Failed</p>
                <p className="text-white/40 text-sm">{error}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setState("idle"); setError(""); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:text-white transition-colors"
              >
                <X className="w-3 h-3" /> Try again
              </button>
            </motion.div>
          ) : state === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-emerald-400 font-semibold">Analysis Complete!</p>
            </motion.div>
          ) : (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">
                  {STATE_MESSAGES[state]}
                </p>
                {fileName && (
                  <p className="text-white/40 text-sm flex items-center justify-center gap-2">
                    <FileText className="w-3 h-3" />
                    {fileName}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs mx-auto">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full progress-bar rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {["Upload", "Parse", "Analyze"].map((step, i) => (
                    <span
                      key={step}
                      className={`text-xs transition-colors ${
                        (state === "uploading" && i === 0) ||
                        (state === "parsing" && i === 1) ||
                        (state === "analyzing" && i === 2)
                          ? "text-cyan-400"
                          : "text-white/20"
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Job Description toggle */}
      {(state === "idle" || state === "error") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setShowJD(!showJD)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl glass border border-white/[0.06] text-white/50 hover:text-white/70 transition-colors text-sm"
          >
            <span>+ Add Job Description (optional)</span>
            <span className="text-xs text-white/30">Enables JD matching</span>
          </button>

          <AnimatePresence>
            {showJD && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to get keyword matching, gap analysis, and tailored recommendations..."
                  className="w-full mt-3 p-4 rounded-2xl glass border border-white/[0.06] text-white/70 text-sm placeholder:text-white/20 resize-none focus:outline-none focus:border-cyan-500/30 transition-colors"
                  rows={6}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
