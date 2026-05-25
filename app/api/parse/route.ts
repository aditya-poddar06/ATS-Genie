import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.toLowerCase();
    let extractedText = "";

    if (fileName.endsWith(".pdf")) {
      // Dynamic import to avoid SSR issues
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParseModule = await import("pdf-parse") as any;
      const pdfParse = pdfParseModule.default || pdfParseModule;
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (fileName.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (fileName.endsWith(".txt")) {
      extractedText = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload PDF, DOCX, or TXT." },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract text from file. Please ensure the file contains readable text." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text: extractedText,
      wordCount: extractedText.split(/\s+/).filter((w) => w.length > 0).length,
      charCount: extractedText.length,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse file. Please try again." },
      { status: 500 }
    );
  }
}
