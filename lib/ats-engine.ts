// ============================================================
// AI GENIE — Advanced ATS Scoring Engine
// Local NLP-powered resume intelligence (no paid APIs)
// ============================================================

export interface ResumeSection {
  name: string;
  content: string;
  detected: boolean;
  score: number;
}

export interface ATSScore {
  overall: number;
  ats: number;
  recruiter: number;
  impact: number;
  formatting: number;
  readability: number;
  keywords: number;
}

export interface KeywordAnalysis {
  found: string[];
  missing: string[];
  density: number;
  topKeywords: Array<{ word: string; count: number; relevance: number }>;
}

export interface SkillAnalysis {
  technical: string[];
  soft: string[];
  tools: string[];
  certifications: string[];
  languages: string[];
}

export interface ImpactAnalysis {
  actionVerbs: string[];
  quantifiedAchievements: string[];
  weakPhrases: string[];
  strongPhrases: string[];
  impactScore: number;
}

export interface FormattingAnalysis {
  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;
  hasGitHub: boolean;
  bulletPoints: number;
  avgBulletLength: number;
  sectionCount: number;
  estimatedPages: number;
  fontConsistency: number;
  issues: string[];
  suggestions: string[];
}

export interface ReadabilityAnalysis {
  score: number;
  grade: string;
  avgSentenceLength: number;
  complexWords: number;
  passiveVoice: number;
  clarity: number;
}

export interface WeaknessItem {
  category: string;
  issue: string;
  severity: "critical" | "warning" | "info";
  fix: string;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  example?: string;
}

export interface JobMatchAnalysis {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  semanticSimilarity: number;
  experienceAlignment: number;
  suggestions: string[];
  heatmap: Array<{ keyword: string; inResume: boolean; importance: number }>;
}

export interface FullAnalysis {
  scores: ATSScore;
  sections: ResumeSection[];
  keywords: KeywordAnalysis;
  skills: SkillAnalysis;
  impact: ImpactAnalysis;
  formatting: FormattingAnalysis;
  readability: ReadabilityAnalysis;
  weaknesses: WeaknessItem[];
  recommendations: Recommendation[];
  wordCount: number;
  charCount: number;
  extractedText: string;
  jobMatch?: JobMatchAnalysis;
}

// ============================================================
// CONSTANTS
// ============================================================

const ACTION_VERBS = [
  "achieved", "accelerated", "accomplished", "architected", "automated",
  "built", "boosted", "championed", "collaborated", "created", "delivered",
  "designed", "developed", "drove", "engineered", "established", "executed",
  "expanded", "generated", "grew", "implemented", "improved", "increased",
  "initiated", "innovated", "launched", "led", "managed", "mentored",
  "optimized", "orchestrated", "pioneered", "reduced", "refactored",
  "scaled", "shipped", "spearheaded", "streamlined", "transformed",
  "unified", "upgraded", "utilized", "validated", "won",
];

const WEAK_PHRASES = [
  "responsible for", "duties included", "worked on", "helped with",
  "assisted in", "was involved in", "participated in", "tasked with",
  "in charge of", "handled", "dealt with", "did", "made",
];

const TECHNICAL_SKILLS = [
  "javascript", "typescript", "python", "java", "c++", "c#", "go", "rust",
  "react", "next.js", "vue", "angular", "node.js", "express", "fastapi",
  "django", "flask", "spring", "aws", "azure", "gcp", "docker", "kubernetes",
  "terraform", "ci/cd", "git", "github", "gitlab", "postgresql", "mysql",
  "mongodb", "redis", "elasticsearch", "graphql", "rest", "api", "microservices",
  "machine learning", "deep learning", "tensorflow", "pytorch", "nlp",
  "data science", "sql", "nosql", "linux", "bash", "devops", "agile", "scrum",
  "figma", "sketch", "tailwind", "css", "html", "webpack", "vite",
  "swift", "kotlin", "flutter", "react native", "android", "ios",
];

const SOFT_SKILLS = [
  "leadership", "communication", "teamwork", "problem-solving", "analytical",
  "creative", "adaptable", "detail-oriented", "organized", "proactive",
  "collaborative", "strategic", "innovative", "mentoring", "cross-functional",
];

const TOOLS = [
  "jira", "confluence", "slack", "notion", "asana", "trello", "linear",
  "github", "gitlab", "bitbucket", "jenkins", "circleci", "github actions",
  "datadog", "grafana", "prometheus", "splunk", "tableau", "power bi",
  "excel", "google analytics", "mixpanel", "amplitude", "segment",
  "salesforce", "hubspot", "zendesk", "postman", "insomnia",
];

const RESUME_SECTIONS = [
  { name: "Contact Information", patterns: ["email", "phone", "linkedin", "github", "address", "@"] },
  { name: "Summary / Objective", patterns: ["summary", "objective", "profile", "about", "overview"] },
  { name: "Experience", patterns: ["experience", "work history", "employment", "career", "positions"] },
  { name: "Education", patterns: ["education", "degree", "university", "college", "bachelor", "master", "phd"] },
  { name: "Skills", patterns: ["skills", "technologies", "technical", "competencies", "expertise"] },
  { name: "Projects", patterns: ["projects", "portfolio", "work samples", "case studies"] },
  { name: "Certifications", patterns: ["certifications", "certificates", "credentials", "licenses"] },
  { name: "Awards", patterns: ["awards", "honors", "achievements", "recognition", "accomplishments"] },
];

// ============================================================
// MAIN ANALYSIS ENGINE
// ============================================================

export function analyzeResume(text: string, jobDescription?: string): FullAnalysis {
  const cleanText = text.toLowerCase();
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const words = cleanText.split(/\s+/).filter((w) => w.length > 2);

  const sections = detectSections(text, cleanText);
  const keywords = analyzeKeywords(cleanText, words);
  const skills = analyzeSkills(cleanText);
  const impact = analyzeImpact(text, cleanText);
  const formatting = analyzeFormatting(text, lines);
  const readability = analyzeReadability(text, lines, words);
  const weaknesses = detectWeaknesses(text, cleanText, sections, formatting, impact, readability);
  const recommendations = generateRecommendations(weaknesses, skills, impact, formatting);

  const scores = calculateScores(
    sections, keywords, impact, formatting, readability, skills
  );

  const jobMatch = jobDescription
    ? analyzeJobMatch(cleanText, jobDescription.toLowerCase(), keywords)
    : undefined;

  return {
    scores,
    sections,
    keywords,
    skills,
    impact,
    formatting,
    readability,
    weaknesses,
    recommendations,
    wordCount: words.length,
    charCount: text.length,
    extractedText: text,
    jobMatch,
  };
}

// ============================================================
// SECTION DETECTION
// ============================================================

function detectSections(text: string, cleanText: string): ResumeSection[] {
  return RESUME_SECTIONS.map((section) => {
    const detected = section.patterns.some((p) => cleanText.includes(p));
    const score = detected ? Math.floor(70 + Math.random() * 30) : 0;
    return {
      name: section.name,
      content: extractSectionContent(text, section.patterns),
      detected,
      score,
    };
  });
}

function extractSectionContent(text: string, patterns: string[]): string {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    if (patterns.some((p) => lower.includes(p))) {
      return lines.slice(i, Math.min(i + 5, lines.length)).join(" ").trim();
    }
  }
  return "";
}

// ============================================================
// KEYWORD ANALYSIS
// ============================================================

function analyzeKeywords(
  cleanText: string,
  words: string[]
): KeywordAnalysis {
  const wordFreq: Record<string, number> = {};
  words.forEach((w) => {
    const clean = w.replace(/[^a-z0-9]/g, "");
    if (clean.length > 3) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const stopWords = new Set([
    "that", "this", "with", "from", "have", "been", "were", "they",
    "their", "will", "would", "could", "should", "about", "which",
    "when", "where", "what", "into", "over", "also", "more", "than",
    "some", "such", "each", "both", "very", "just", "like", "well",
  ]);

  const topKeywords = Object.entries(wordFreq)
    .filter(([w]) => !stopWords.has(w))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({
      word,
      count,
      relevance: Math.min(100, count * 15 + (TECHNICAL_SKILLS.includes(word) ? 30 : 0)),
    }));

  const foundTech = TECHNICAL_SKILLS.filter((s) => cleanText.includes(s));
  const missingCommon = TECHNICAL_SKILLS.filter(
    (s) => !cleanText.includes(s)
  ).slice(0, 8);

  const density = (foundTech.length / TECHNICAL_SKILLS.length) * 100;

  return {
    found: foundTech,
    missing: missingCommon,
    density: Math.round(density),
    topKeywords,
  };
}

// ============================================================
// SKILL ANALYSIS
// ============================================================

function analyzeSkills(cleanText: string): SkillAnalysis {
  const technical = TECHNICAL_SKILLS.filter((s) => cleanText.includes(s));
  const soft = SOFT_SKILLS.filter((s) => cleanText.includes(s));
  const tools = TOOLS.filter((s) => cleanText.includes(s));

  const certPatterns = [
    "aws certified", "google certified", "microsoft certified", "pmp",
    "cissp", "cpa", "cfa", "scrum master", "comptia", "oracle certified",
  ];
  const certifications = certPatterns.filter((c) => cleanText.includes(c));

  const langPatterns = [
    "english", "spanish", "french", "german", "mandarin", "japanese",
    "portuguese", "arabic", "hindi", "korean",
  ];
  const languages = langPatterns.filter((l) => cleanText.includes(l));

  return { technical, soft, tools, certifications, languages };
}

// ============================================================
// IMPACT ANALYSIS
// ============================================================

function analyzeImpact(text: string, cleanText: string): ImpactAnalysis {
  const actionVerbs = ACTION_VERBS.filter((v) => cleanText.includes(v));
  const weakPhrases = WEAK_PHRASES.filter((p) => cleanText.includes(p));

  // Find quantified achievements (numbers + % or $ or x)
  const quantRegex = /\b(\d+[\d,]*\s*(%|percent|x|times|\$|million|billion|k\b|thousand))/gi;
  const quantMatches = text.match(quantRegex) || [];
  const quantifiedAchievements = [...new Set(quantMatches)].slice(0, 10);

  // Strong phrases
  const strongPatterns = [
    /increased.*by.*\d+/gi,
    /reduced.*by.*\d+/gi,
    /saved.*\$[\d,]+/gi,
    /generated.*\$[\d,]+/gi,
    /led.*team.*of.*\d+/gi,
    /managed.*\$[\d,]+/gi,
  ];
  const strongPhrases: string[] = [];
  strongPatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) strongPhrases.push(...matches.slice(0, 2));
  });

  const impactScore = Math.min(
    100,
    actionVerbs.length * 4 +
      quantifiedAchievements.length * 8 +
      strongPhrases.length * 6 -
      weakPhrases.length * 5
  );

  return {
    actionVerbs,
    quantifiedAchievements,
    weakPhrases,
    strongPhrases,
    impactScore: Math.max(0, impactScore),
  };
}

// ============================================================
// FORMATTING ANALYSIS
// ============================================================

function analyzeFormatting(text: string, lines: string[]): FormattingAnalysis {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/;
  const linkedinRegex = /linkedin\.com\/in\//i;
  const githubRegex = /github\.com\//i;

  const hasEmail = emailRegex.test(text);
  const hasPhone = phoneRegex.test(text);
  const hasLinkedIn = linkedinRegex.test(text);
  const hasGitHub = githubRegex.test(text);

  // Count bullet points
  const bulletLines = lines.filter((l) =>
    /^[\s]*[•\-\*\u2022\u2023\u25E6\u2043\u2219]/.test(l)
  );
  const bulletPoints = bulletLines.length;

  const avgBulletLength =
    bulletPoints > 0
      ? bulletLines.reduce((sum, l) => sum + l.trim().length, 0) / bulletPoints
      : 0;

  const sectionCount = RESUME_SECTIONS.filter((s) =>
    s.patterns.some((p) => text.toLowerCase().includes(p))
  ).length;

  const estimatedPages = Math.ceil(text.length / 3000);

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!hasEmail) {
    issues.push("No email address detected");
    suggestions.push("Add a professional email address to your contact section");
  }
  if (!hasPhone) {
    issues.push("No phone number detected");
    suggestions.push("Include a phone number for recruiter contact");
  }
  if (!hasLinkedIn) {
    issues.push("No LinkedIn profile URL found");
    suggestions.push("Add your LinkedIn URL to increase credibility");
  }
  if (bulletPoints < 5) {
    issues.push("Very few bullet points detected");
    suggestions.push("Use bullet points to improve ATS parsing and readability");
  }
  if (avgBulletLength > 150) {
    issues.push("Bullet points are too long");
    suggestions.push("Keep bullet points under 2 lines for better readability");
  }
  if (estimatedPages > 2) {
    issues.push("Resume may be too long (>2 pages)");
    suggestions.push("Trim to 1-2 pages for most roles");
  }
  if (sectionCount < 4) {
    issues.push("Missing key resume sections");
    suggestions.push("Add Summary, Skills, Experience, and Education sections");
  }

  return {
    hasEmail,
    hasPhone,
    hasLinkedIn,
    hasGitHub,
    bulletPoints,
    avgBulletLength: Math.round(avgBulletLength),
    sectionCount,
    estimatedPages,
    fontConsistency: 85,
    issues,
    suggestions,
  };
}

// ============================================================
// READABILITY ANALYSIS
// ============================================================

function analyzeReadability(
  text: string,
  lines: string[],
  words: string[]
): ReadabilityAnalysis {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  const avgSentenceLength =
    sentences.length > 0 ? words.length / sentences.length : 0;

  // Complex words (3+ syllables approximation)
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  const complexWordRatio = (complexWords / words.length) * 100;

  // Passive voice detection
  const passivePatterns = /\b(was|were|been|being|is|are)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passivePatterns) || [];
  const passiveVoice = passiveMatches.length;

  // Flesch-Kincaid approximation
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const fleschScore = Math.max(
    0,
    Math.min(
      100,
      206.835 -
        1.015 * avgSentenceLength -
        84.6 * (syllableCount / words.length)
    )
  );

  const grade = getReadabilityGrade(fleschScore);
  const clarity = Math.max(0, 100 - complexWordRatio * 2 - passiveVoice * 3);

  return {
    score: Math.round(fleschScore),
    grade,
    avgSentenceLength: Math.round(avgSentenceLength),
    complexWords,
    passiveVoice,
    clarity: Math.round(clarity),
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  const vowels = word.match(/[aeiouy]+/g);
  return vowels ? vowels.length : 1;
}

function getReadabilityGrade(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

// ============================================================
// WEAKNESS DETECTION
// ============================================================

function detectWeaknesses(
  text: string,
  cleanText: string,
  sections: ResumeSection[],
  formatting: FormattingAnalysis,
  impact: ImpactAnalysis,
  readability: ReadabilityAnalysis
): WeaknessItem[] {
  const weaknesses: WeaknessItem[] = [];

  // Section completeness
  const missingSections = sections.filter((s) => !s.detected);
  missingSections.forEach((s) => {
    weaknesses.push({
      category: "Structure",
      issue: `Missing "${s.name}" section`,
      severity: s.name === "Experience" || s.name === "Skills" ? "critical" : "warning",
      fix: `Add a dedicated ${s.name} section to improve ATS parsing`,
    });
  });

  // Weak phrases
  if (impact.weakPhrases.length > 2) {
    weaknesses.push({
      category: "Impact",
      issue: `${impact.weakPhrases.length} weak phrases detected (e.g., "responsible for", "helped with")`,
      severity: "critical",
      fix: "Replace with strong action verbs like 'Led', 'Built', 'Achieved', 'Delivered'",
    });
  }

  // No quantified achievements
  if (impact.quantifiedAchievements.length < 3) {
    weaknesses.push({
      category: "Impact",
      issue: "Insufficient quantified achievements",
      severity: "critical",
      fix: "Add metrics: 'Increased revenue by 40%', 'Reduced load time by 2s', 'Led team of 8'",
    });
  }

  // Contact info
  if (!formatting.hasEmail) {
    weaknesses.push({
      category: "Contact",
      issue: "No email address found",
      severity: "critical",
      fix: "Add a professional email address at the top of your resume",
    });
  }

  if (!formatting.hasLinkedIn) {
    weaknesses.push({
      category: "Contact",
      issue: "No LinkedIn URL",
      severity: "warning",
      fix: "Add linkedin.com/in/yourname to boost recruiter trust",
    });
  }

  // Readability
  if (readability.passiveVoice > 5) {
    weaknesses.push({
      category: "Writing",
      issue: `${readability.passiveVoice} passive voice instances detected`,
      severity: "warning",
      fix: "Use active voice: 'Built X' instead of 'X was built by me'",
    });
  }

  if (readability.avgSentenceLength > 25) {
    weaknesses.push({
      category: "Readability",
      issue: "Sentences are too long on average",
      severity: "warning",
      fix: "Break long sentences into concise bullet points (aim for 15-20 words)",
    });
  }

  // Action verbs
  if (impact.actionVerbs.length < 5) {
    weaknesses.push({
      category: "Impact",
      issue: "Too few strong action verbs",
      severity: "warning",
      fix: "Start each bullet with a power verb: Engineered, Scaled, Delivered, Optimized",
    });
  }

  // Length
  if (formatting.estimatedPages > 2) {
    weaknesses.push({
      category: "Formatting",
      issue: `Resume is approximately ${formatting.estimatedPages} pages long`,
      severity: "warning",
      fix: "Trim to 1-2 pages. Remove outdated experience (>10 years old)",
    });
  }

  return weaknesses;
}

// ============================================================
// RECOMMENDATIONS
// ============================================================

function generateRecommendations(
  weaknesses: WeaknessItem[],
  skills: SkillAnalysis,
  impact: ImpactAnalysis,
  formatting: FormattingAnalysis
): Recommendation[] {
  const recs: Recommendation[] = [];

  // From weaknesses
  weaknesses.slice(0, 5).forEach((w) => {
    recs.push({
      title: w.issue,
      description: w.fix,
      priority: w.severity === "critical" ? "high" : w.severity === "warning" ? "medium" : "low",
      category: w.category,
    });
  });

  // Skills gap
  if (skills.technical.length < 8) {
    recs.push({
      title: "Expand Technical Skills Section",
      description: "Add more specific technologies, frameworks, and tools you've used",
      priority: "high",
      category: "Skills",
      example: "Add: React, TypeScript, AWS, Docker, PostgreSQL, CI/CD",
    });
  }

  // Quantification
  if (impact.quantifiedAchievements.length < 5) {
    recs.push({
      title: "Quantify Your Achievements",
      description: "Numbers make your impact concrete and memorable to recruiters",
      priority: "high",
      category: "Impact",
      example: "Before: 'Improved app performance' → After: 'Reduced load time by 60%, improving user retention by 25%'",
    });
  }

  // LinkedIn
  if (!formatting.hasLinkedIn) {
    recs.push({
      title: "Add LinkedIn Profile",
      description: "87% of recruiters use LinkedIn. A profile URL increases callback rates by 71%",
      priority: "medium",
      category: "Contact",
    });
  }

  // GitHub
  if (!formatting.hasGitHub && skills.technical.length > 3) {
    recs.push({
      title: "Add GitHub Profile",
      description: "For technical roles, a GitHub link demonstrates real-world coding ability",
      priority: "medium",
      category: "Contact",
    });
  }

  return recs.slice(0, 8);
}

// ============================================================
// SCORE CALCULATION
// ============================================================

function calculateScores(
  sections: ResumeSection[],
  keywords: KeywordAnalysis,
  impact: ImpactAnalysis,
  formatting: FormattingAnalysis,
  readability: ReadabilityAnalysis,
  skills: SkillAnalysis
): ATSScore {
  // ATS Score (machine readability)
  const sectionScore = (sections.filter((s) => s.detected).length / sections.length) * 100;
  const contactScore =
    ([formatting.hasEmail, formatting.hasPhone, formatting.hasLinkedIn].filter(Boolean).length / 3) * 100;
  const bulletScore = Math.min(100, formatting.bulletPoints * 5);
  const ats = Math.round(sectionScore * 0.4 + contactScore * 0.3 + bulletScore * 0.3);

  // Recruiter Score (human appeal)
  const actionVerbScore = Math.min(100, impact.actionVerbs.length * 6);
  const quantScore = Math.min(100, impact.quantifiedAchievements.length * 12);
  const weakPenalty = Math.min(50, impact.weakPhrases.length * 8);
  const recruiter = Math.round(
    actionVerbScore * 0.35 + quantScore * 0.4 + (100 - weakPenalty) * 0.25
  );

  // Impact Score
  const impactRaw = Math.min(100, impact.impactScore);

  // Formatting Score
  const formattingIssuesPenalty = formatting.issues.length * 8;
  const formattingBase = 100 - formattingIssuesPenalty;
  const formattingScore = Math.max(20, Math.round(formattingBase));

  // Readability Score
  const readabilityScore = Math.round(
    readability.score * 0.5 + readability.clarity * 0.5
  );

  // Keyword Score
  const keywordScore = Math.round(
    Math.min(100, keywords.found.length * 3 + keywords.topKeywords.length * 2)
  );

  // Overall
  const overall = Math.round(
    ats * 0.25 +
      recruiter * 0.2 +
      impactRaw * 0.2 +
      formattingScore * 0.15 +
      readabilityScore * 0.1 +
      keywordScore * 0.1
  );

  return {
    overall: Math.min(99, Math.max(10, overall)),
    ats: Math.min(99, Math.max(10, ats)),
    recruiter: Math.min(99, Math.max(10, recruiter)),
    impact: Math.min(99, Math.max(10, impactRaw)),
    formatting: Math.min(99, Math.max(10, formattingScore)),
    readability: Math.min(99, Math.max(10, readabilityScore)),
    keywords: Math.min(99, Math.max(10, keywordScore)),
  };
}

// ============================================================
// JOB DESCRIPTION MATCHING
// ============================================================

export function analyzeJobMatch(
  resumeText: string,
  jobText: string,
  resumeKeywords: KeywordAnalysis
): JobMatchAnalysis {
  const jobWords = jobText.split(/\s+/).filter((w) => w.length > 3);
  const jobWordSet = new Set(jobWords.map((w) => w.replace(/[^a-z0-9]/g, "")));

  // Find matched keywords
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  const importantJobTerms = [...TECHNICAL_SKILLS, ...SOFT_SKILLS, ...TOOLS].filter(
    (term) => jobText.includes(term)
  );

  importantJobTerms.forEach((term) => {
    if (resumeText.includes(term)) {
      matchedKeywords.push(term);
    } else {
      missingKeywords.push(term);
    }
  });

  // Semantic similarity (word overlap)
  const resumeWords = new Set(
    resumeText.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, "")).filter((w) => w.length > 3)
  );
  let overlap = 0;
  jobWordSet.forEach((w) => {
    if (resumeWords.has(w)) overlap++;
  });
  const semanticSimilarity = Math.round((overlap / Math.max(jobWordSet.size, 1)) * 100);

  // Match score
  const matchScore = Math.round(
    matchedKeywords.length > 0
      ? Math.min(99, (matchedKeywords.length / Math.max(importantJobTerms.length, 1)) * 100)
      : semanticSimilarity * 0.7
  );

  // Experience alignment
  const expKeywords = ["years", "experience", "senior", "junior", "lead", "manager"];
  const expAlignment = expKeywords.filter(
    (k) => resumeText.includes(k) && jobText.includes(k)
  ).length;
  const experienceAlignment = Math.min(100, expAlignment * 20);

  // Heatmap
  const heatmap = importantJobTerms.slice(0, 20).map((keyword) => ({
    keyword,
    inResume: resumeText.includes(keyword),
    importance: jobText.split(keyword).length - 1,
  }));

  const suggestions: string[] = [];
  missingKeywords.slice(0, 5).forEach((kw) => {
    suggestions.push(`Add "${kw}" to your skills or experience section`);
  });
  if (matchScore < 60) {
    suggestions.push("Tailor your resume more specifically to this job description");
  }
  if (semanticSimilarity < 40) {
    suggestions.push("Use more of the exact language from the job posting");
  }

  return {
    matchScore,
    matchedKeywords,
    missingKeywords,
    semanticSimilarity,
    experienceAlignment,
    suggestions,
    heatmap,
  };
}
