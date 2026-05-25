import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/ats-engine";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, jobDescription } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    if (text.trim().length < 50) {
      return NextResponse.json({ error: "Resume text is too short" }, { status: 400 });
    }

    const analysis = analyzeResume(text, jobDescription);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
