import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// In-Memory state for Analytics Dashboard & Operations
const newsletterEmails: string[] = ["gouravonjob@gmail.com"];
const telemetrySubmissions: any[] = [];
let adCtrClicks = 142;
let pageViews = 1845;

// Lazy initialize Gemini client
let aiInstance: any = null;
function getAi(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in the secrets settings.");
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

// 1. AI API endpoint utilizing Gemini flash model
app.post("/api/ai", async (req: Request, res: Response) => {
  const { action, text, tone, targetLang } = req.body;

  if (!text) {
    res.status(400).json({ error: "Missing source text properties." });
    return;
  }

  try {
    const ai = getAi();
    let prompt = "";

    if (action === "grammar") {
      prompt = `Correct any spelling or grammar errors in the following text. Upgrade the clarity and format it to be in a ${tone} tone. Keep length proportions similar. Just return the polished text directly: \n\n"${text}"`;
    } else if (action === "summarize") {
      prompt = `Provide a concise, high-density bullet point summary of the following text with key highlights: \n\n"${text}"`;
    } else if (action === "translate") {
      prompt = `Translate the following text accurately into ${targetLang || "Spanish"}, preserving the native sentiment: \n\n"${text}"`;
    } else {
      prompt = `Analyze and optimize the following content structure: \n\n"${text}"`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const result = response.text || "No response received from Gemini.";
    res.json({ result: result.trim() });
  } catch (error: any) {
    console.error("AI Error:", error.message);
    res.status(500).json({
      error: error.message || "Failed to parse content via Gemini connection."
    });
  }
});

// 2. Newsletter Registration
app.post("/api/newsletter", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Malformatted email argument." });
    return;
  }
  newsletterEmails.push(email);
  res.json({ success: true, message: "Subscribed successfully!" });
});

// 3. Telemetry Feedback Reports
app.post("/api/feedback", (req: Request, res: Response) => {
  const { type, email, message } = req.body;
  if (!email || !message) {
    res.status(400).json({ error: "Missing required telemetry fields." });
    return;
  }
  const item = {
    id: `fb-${Date.now()}`,
    type: type || "feedback",
    email,
    message,
    timestamp: new Date().toISOString()
  };
  telemetrySubmissions.push(item);
  res.json({ success: true, submissionId: item.id });
});

// 4. Analytics and CTR monitoring for AdSense/Affiliate metrics
app.get("/api/analytics", (req: Request, res: Response) => {
  pageViews += 1;
  if (Math.random() > 0.8) adCtrClicks += 1;

  res.json({
    activeUsers: Math.floor(Math.random() * 45) + 5,
    pageViews,
    adCtrClicks,
    ctrPercentage: ((adCtrClicks / pageViews) * 100).toFixed(2),
    trafficByDevice: { desktop: 62, mobile: 31, tablet: 7 },
    countries: [
      { code: "US", count: 852 },
      { code: "DE", count: 421 },
      { code: "IN", count: 395 },
      { code: "JP", count: 312 },
      { code: "GB", count: 280 }
    ],
    recentAudits: telemetrySubmissions.slice(-5),
    newsletterCount: newsletterEmails.length
  });
});

// 5. Robots/Sitemap XML endpoint
app.get("/sitemap.xml", (req: Request, res: Response) => {
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omnitoolbox.net/</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://omnitoolbox.net/tools/word-counter</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

// Serve static compiled assets
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// In production, fallback any route to the SPA's index.html
app.get("*", (req: Request, res: Response, next) => {
  // If requesting api routes, don't trigger html fallback
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[OmniToolbox] App server online and listening on http://localhost:${PORT}`);
});
