import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Genie — Resume Intelligence Platform",
  description:
    "Analyze ATS compatibility, recruiter impact, keyword gaps, and formatting quality instantly. The future of resume intelligence.",
  keywords: [
    "resume analyzer",
    "ATS checker",
    "resume optimization",
    "job application",
    "career intelligence",
    "AI resume",
  ],
  openGraph: {
    title: "AI Genie — Resume Intelligence Platform",
    description:
      "Your resume should open doors — not get ignored. Analyze ATS compatibility instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
