import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, contextType, jobTitle } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Original text is required for AI enhancement." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is configured, make real call to Gemini API
    if (apiKey && apiKey !== "your-gemini-api-key-here") {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        
        let systemPrompt = "";
        if (contextType === "summary") {
          systemPrompt = `You are a professional resume consultant. Improve the following professional summary for a ${jobTitle || "candidate"}. Make it punchy, high-impact, and metrics-oriented while preserving all facts. Never invent fake jobs or fake credentials. Return ONLY the improved summary text without quotes or markdown formatting.`;
        } else if (contextType === "bullet") {
          systemPrompt = `You are an executive resume writer. Rewrite the following resume work experience bullet point starting with a strong power action verb (e.g., Spearheaded, Orchestrated, Engineered, Accelerated) and include quantifiable outcomes or structure (Action + Context + Result). Never invent facts. Return ONLY the rewritten bullet point text.`;
        } else {
          systemPrompt = `You are an ATS resume editor. Improve clarity, fix grammatical issues, and enhance professional tone for the following text. Never invent facts. Return ONLY the improved text.`;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemPrompt}\n\nOriginal Text:\n${text}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 300,
            },
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const generatedText =
            result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (generatedText) {
            return NextResponse.json({
              improvedText: generatedText,
              provider: "gemini",
              isConfigured: true,
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, using rule-based enhancement:", geminiError);
      }
    }

    // Smart Rule-based Enhancer Fallback (runs when GEMINI_API_KEY is not set or network fails)
    // Clearly informs user about offline/rules mode vs Gemini mode
    let improvedText = text.trim();

    if (contextType === "bullet") {
      const powerVerbs = [
        "Spearheaded",
        "Architected",
        "Optimized",
        "Engineered",
        "Streamlined",
        "Orchestrated",
        "Scaled",
        "Delivered",
      ];
      const randomVerb = powerVerbs[Math.floor(Math.random() * powerVerbs.length)];
      
      // Clean up common passive phrasing
      let cleaned = improvedText
        .replace(/^(i was |responsible for |worked on |helped to |assisted with )/i, "")
        .trim();

      // Capitalize
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

      if (!powerVerbs.some((v) => cleaned.toLowerCase().startsWith(v.toLowerCase()))) {
        improvedText = `${randomVerb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
      } else {
        improvedText = cleaned;
      }

      if (!improvedText.endsWith(".")) {
        improvedText += ".";
      }
    } else if (contextType === "summary") {
      improvedText = `Dynamic and results-driven professional with proven expertise in delivering scalable solutions. ${improvedText} Demonstrated history of improving operational velocity, collaborating across cross-functional squads, and achieving business milestones.`;
    }

    return NextResponse.json({
      improvedText,
      provider: "rules-fallback",
      isConfigured: Boolean(apiKey && apiKey !== "your-gemini-api-key-here"),
      notice: apiKey
        ? "Enhanced using built-in writing rules."
        : "Gemini API key not configured in .env.local. Enhanced using built-in power-verb heuristic rules.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process AI writing enhancement." },
      { status: 500 }
    );
  }
}
