"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  delay?: number;
  showNumber?: boolean;
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  color = "#38bdf8",
  delay = 0,
  showNumber = true,
}: ScoreRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayScore, setDisplayScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        start = Math.round(eased * score);
        setDisplayScore(start);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, score, delay]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "#34d399";
    if (s >= 60) return "#38bdf8";
    if (s >= 40) return "#f59e0b";
    return "#f87171";
  };

  const dynamicColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Glow filter */}
          <defs>
            <filter id={`glow-${score}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Score ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={dynamicColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, delay, ease: [0.4, 0, 0.2, 1] }}
            filter={`url(#glow-${score})`}
          />
        </svg>

        {showNumber && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-bold tabular-nums"
              style={{
                fontSize: size * 0.22,
                color: dynamicColor,
                lineHeight: 1,
              }}
            >
              {displayScore}
            </span>
            <span
              className="text-white/40 font-medium"
              style={{ fontSize: size * 0.1 }}
            >
              /100
            </span>
          </div>
        )}
      </div>

      {label && (
        <div className="text-center">
          <p className="text-white/80 font-medium text-sm">{label}</p>
          {sublabel && <p className="text-white/40 text-xs mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
