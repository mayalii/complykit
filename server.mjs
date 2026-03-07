import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

// Data storage (JSON file for MVP)
const DATA_DIR = join(__dirname, "data");
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
const CHECKLISTS_FILE = join(DATA_DIR, "checklists.json");
const HISTORY_FILE = join(DATA_DIR, "history.json");
const ACTIVITY_FILE = join(DATA_DIR, "activity.json");

function loadHistory() {
  if (!existsSync(HISTORY_FILE)) return [];
  return JSON.parse(readFileSync(HISTORY_FILE, "utf-8"));
}

function saveHistory(data) {
  writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function loadChecklists() {
  if (!existsSync(CHECKLISTS_FILE)) return [];
  return JSON.parse(readFileSync(CHECKLISTS_FILE, "utf-8"));
}

function saveChecklists(data) {
  writeFileSync(CHECKLISTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function loadActivity() {
  if (!existsSync(ACTIVITY_FILE)) return [];
  return JSON.parse(readFileSync(ACTIVITY_FILE, "utf-8"));
}

function saveActivity(data) {
  writeFileSync(ACTIVITY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function logActivity(action, details = {}) {
  const activity = loadActivity();
  activity.unshift({
    action,
    ...details,
    timestamp: new Date().toISOString(),
    ip: details.ip || "127.0.0.1",
  });
  if (activity.length > 200) activity.length = 200;
  saveActivity(activity);
}

// ============ AI PROVIDERS ============
// Groq (primary — free, fast, reliable)
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
// Gemini (fallback)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

async function callAI(prompt) {
  // Try Groq first (if key available), then Gemini
  if (GROQ_API_KEY) {
    try {
      const result = await callGroq(prompt);
      if (result) return result;
    } catch (e) {
      console.log(`⚠️ Groq failed: ${e.message}, trying Gemini...`);
    }
  }

  // Try Gemini
  try {
    return await callGemini(prompt);
  } catch (e) {
    console.log(`⚠️ Gemini failed: ${e.message}`);
  }

  throw new Error("ALL_MODELS_BUSY");
}

// Groq API — uses OpenAI-compatible format
async function callGroq(prompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  console.log("🤖 Calling Groq (llama-3.3-70b)...");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a brand consistency reviewer. Always respond with valid JSON only, no markdown, no explanation." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
  });

  const raw = await res.text();
  console.log(`📡 Groq status: ${res.status}`);

  if (!res.ok) {
    console.error("❌ Groq error:", raw.slice(0, 300));
    throw new Error(`Groq API error ${res.status}`);
  }

  const data = JSON.parse(raw);
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq returned empty response");

  console.log(`✅ Groq responded, length: ${text.length}`);
  return text;
}

// Gemini API
async function callGemini(prompt) {
  const models = ["gemini-2.0-flash", "gemini-2.0-flash-lite"];
  console.log("🤖 Calling Gemini API...");

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(`📡 Trying ${model} (attempt ${attempt})...`);

      let res;
      try {
        res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt + "\n\nReturn ONLY valid JSON." }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 4096 },
          }),
        });
      } catch (fetchErr) {
        console.error(`❌ Fetch error: ${fetchErr.message}`);
        break;
      }

      const raw = await res.text();

      if (res.status === 429) {
        console.log(`⏳ ${model} rate limited, waiting 5s...`);
        await new Promise(r => setTimeout(r, 5000));
        continue;
      }

      if (!res.ok) {
        console.error(`❌ ${model} error ${res.status}`);
        break;
      }

      const data = JSON.parse(raw);
      if (data.error) { console.error(`❌ ${model}:`, data.error.message); break; }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty response");

      console.log(`✅ ${model} responded, length: ${text.length}`);
      return text;
    }
  }

  throw new Error("Gemini quota exceeded");
}

// Test endpoint
app.get("/api/test", async (req, res) => {
  const results = [];

  // Test Groq
  if (GROQ_API_KEY) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "user", content: "Say OK" }], max_tokens: 5 }),
      });
      results.push({ provider: "Groq", model: "llama-3.3-70b", status: r.status });
      console.log(`🧪 Groq: ${r.status}`);
    } catch (e) {
      results.push({ provider: "Groq", status: "error", message: e.message });
    }
  } else {
    results.push({ provider: "Groq", status: "no_key", message: "Set GROQ_API_KEY" });
  }

  // Test Gemini
  for (const model of ["gemini-2.0-flash", "gemini-2.0-flash-lite"]) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Say OK" }] }], generationConfig: { maxOutputTokens: 5 } }),
      });
      results.push({ provider: "Gemini", model, status: r.status });
      console.log(`🧪 ${model}: ${r.status}`);
    } catch (e) {
      results.push({ provider: "Gemini", model, status: "error", message: e.message });
    }
  }

  res.json(results);
});

// Parse JSON from AI response
function parseJSON(text) {
  // Clean up the text
  let clean = text.trim();

  // Remove ```json ... ``` wrapper if present
  const codeBlock = clean.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) clean = codeBlock[1].trim();

  // Try direct parse
  try {
    return JSON.parse(clean);
  } catch (e) {
    // Try extracting outermost braces
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(clean.slice(start, end + 1));
    }
    console.error("❌ Parse failed. Text:", clean.slice(0, 500));
    throw new Error("Could not parse AI response");
  }
}

// ============ API ROUTES ============

// GET all checklists (strip heavy file data)
app.get("/api/checklists", (req, res) => {
  const checklists = loadChecklists().map(c => {
    const copy = { ...c };
    if (copy.files) {
      copy.files = copy.files.map(f => ({ index: f.index, name: f.name, type: f.type, isImage: f.isImage, size: f.size }));
    }
    return copy;
  });
  res.json(checklists);
});

// GET single checklist
app.get("/api/checklists/:id", (req, res) => {
  const checklists = loadChecklists();
  const checklist = checklists.find((c) => c.id === req.params.id);
  if (!checklist) return res.status(404).json({ error: "Not found" });
  res.json(checklist);
});

// POST create checklist from brand guidelines
app.post("/api/checklists/extract", async (req, res) => {
  try {
    const { companyName, guidelinesText, sampleContent, files } = req.body;

    // Process uploaded files — extract text from text files, describe images
    let filesContext = "";
    const imageFiles = [];

    if (files && files.length > 0) {
      for (const file of files) {
        if (file.isImage) {
          // Store image for vision API later
          imageFiles.push(file);
          filesContext += `\n[Image file: ${file.name} — will be analyzed visually]\n`;
        } else if (file.data && !file.data.startsWith("data:")) {
          // Plain text file content
          filesContext += `\n--- File: ${file.name} ---\n${file.data}\n`;
        } else if (file.data && file.data.startsWith("data:")) {
          // Base64 file (PDF/doc) — extract text part if possible
          filesContext += `\n[Uploaded document: ${file.name} — binary file, text extraction needed]\n`;
        }
      }
    }

    const prompt = `You are a brand consistency expert. Analyze the following brand guidelines and/or sample content and extract a comprehensive checklist of rules that all future content must follow.

Company: ${companyName}

${guidelinesText ? `Brand Guidelines:\n${guidelinesText}` : ""}
${sampleContent ? `Sample Content to Replicate:\n${sampleContent}` : ""}
${filesContext ? `\nUploaded Files Content:\n${filesContext}` : ""}

Extract ALL rules into a structured JSON brand consistency checklist. Categories include:
- tone (formal, casual, friendly, authoritative, etc.)
- vocabulary (preferred terms, banned words, terminology)
- formatting (capitalization, punctuation, emoji usage, hashtags)
- structure (paragraph length, headings style, CTA placement)
- brand_identity (taglines, brand name usage, logo references)
- compliance (disclaimers, disclosures, legal requirements)
- content_rules (topics to avoid, sensitive subjects, cultural considerations)

Return ONLY valid JSON in this exact format:
{
  "companyName": "${companyName}",
  "tone": { "description": "...", "rules": ["rule1", "rule2"] },
  "vocabulary": { "preferred": ["term1"], "banned": ["term1"], "rules": ["rule1"] },
  "formatting": { "rules": ["rule1", "rule2"] },
  "structure": { "rules": ["rule1", "rule2"] },
  "brand_identity": { "rules": ["rule1", "rule2"] },
  "compliance": { "rules": ["rule1", "rule2"] },
  "content_rules": { "rules": ["rule1", "rule2"] },
  "summary": "Brief 1-line summary of this brand's style"
}`;

    const response = await callAI(prompt);
    let checklist = parseJSON(response);

    // Save checklist
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const saved = {
      id,
      companyName,
      checklist,
      createdAt: new Date().toISOString(),
      totalRules: Object.values(checklist)
        .filter((v) => typeof v === "object" && v !== null)
        .reduce((sum, cat) => sum + (cat.rules?.length || 0), 0),
    };

    // Save uploaded files metadata (store base64 data for download later)
    if (files && files.length > 0) {
      saved.files = files.map((f, i) => ({
        index: i,
        name: f.name,
        type: f.type,
        isImage: f.isImage || false,
        size: f.data ? f.data.length : 0,
        data: f.data, // base64 or text
      }));
    }

    const checklists = loadChecklists();
    checklists.push(saved);
    saveChecklists(checklists);

    // Log activity
    logActivity("company_added", { companyName, totalRules: saved.totalRules, checklistId: id, ip: req.ip });

    // Return without the heavy file data
    const result = { ...saved };
    if (result.files) {
      result.files = result.files.map(f => ({ index: f.index, name: f.name, type: f.type, isImage: f.isImage, size: f.size }));
    }
    res.json(result);
  } catch (err) {
    console.error("Extract error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST check content against a checklist
app.post("/api/check", async (req, res) => {
  try {
    const { checklistId, content } = req.body;

    const checklists = loadChecklists();
    const checklist = checklists.find((c) => c.id === checklistId);
    if (!checklist) return res.status(404).json({ error: "Checklist not found" });

    const rules = checklist.checklist;

    // Build compact rules string — flatten all rules into a short list
    const allRules = [];
    for (const [cat, val] of Object.entries(rules)) {
      if (cat === "companyName" || cat === "summary") continue;
      if (val && val.rules) {
        val.rules.forEach(r => allRules.push(`[${cat}] ${r}`));
      }
      if (val && val.preferred) allRules.push(`[${cat}] preferred words: ${val.preferred.join(", ")}`);
      if (val && val.banned) allRules.push(`[${cat}] banned words: ${val.banned.join(", ")}`);
    }
    const rulesText = allRules.join("\n");

    const prompt = `Brand consistency check for "${checklist.companyName}". Review content against rules, find violations, return JSON.

RULES:
${rulesText}

CONTENT:
${content}

Return JSON: {"overallScore":0-100,"totalRules":${allRules.length},"passedRules":N,"failedRules":N,"findings":[{"severity":"high/medium/low","category":"tone/vocabulary/formatting/structure/brand_identity/compliance/content_rules","rule":"violated rule","issue":"problem","suggestion":"fix","excerpt":"text"}],"correctedVersion":"fixed content with [changes]","summary":"1 sentence"}`;

    const response = await callAI(prompt);
    let report = parseJSON(response);

    const result = {
      checklistId,
      companyName: checklist.companyName,
      report,
      contentPreview: content.slice(0, 150),
      checkedAt: new Date().toISOString(),
    };

    // Save to history
    const history = loadHistory();
    history.unshift(result); // newest first
    if (history.length > 50) history.length = 50; // keep last 50
    saveHistory(history);

    // Log activity
    logActivity("content_checked", {
      companyName: checklist.companyName,
      checklistId,
      score: report.overallScore || 0,
      violations: report.failedRules || 0,
      ip: req.ip,
    });

    res.json(result);
  } catch (err) {
    console.error("Check error:", err);
    if (err.message === "ALL_MODELS_BUSY") {
      res.status(429).json({ error: "API_RATE_LIMIT", message: "All AI models are busy. Please wait 1-2 minutes and try again." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// GET check history
app.get("/api/history", (req, res) => {
  res.json(loadHistory());
});

// DELETE checklist
app.delete("/api/checklists/:id", (req, res) => {
  let checklists = loadChecklists();
  const deleted = checklists.find(c => c.id === req.params.id);
  checklists = checklists.filter((c) => c.id !== req.params.id);
  saveChecklists(checklists);
  if (deleted) logActivity("checklist_deleted", { companyName: deleted.companyName, ip: req.ip });
  res.json({ success: true });
});

// ============ FILE DOWNLOAD ENDPOINTS ============

// GET checklist files metadata (without heavy data)
app.get("/api/checklists/:id/files", (req, res) => {
  const checklists = loadChecklists();
  const checklist = checklists.find(c => c.id === req.params.id);
  if (!checklist) return res.status(404).json({ error: "Not found" });

  const files = (checklist.files || []).map(f => ({
    index: f.index, name: f.name, type: f.type, isImage: f.isImage, size: f.size
  }));
  res.json(files);
});

// GET download a specific uploaded file
app.get("/api/checklists/:id/files/:fileIndex/download", (req, res) => {
  const checklists = loadChecklists();
  const checklist = checklists.find(c => c.id === req.params.id);
  if (!checklist) return res.status(404).json({ error: "Not found" });

  const fileIdx = parseInt(req.params.fileIndex);
  const file = (checklist.files || []).find(f => f.index === fileIdx);
  if (!file || !file.data) return res.status(404).json({ error: "File not found" });

  // If base64 data URI
  if (file.data.startsWith("data:")) {
    const matches = file.data.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], "base64");
      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(file.name)}"`);
      return res.send(buffer);
    }
  }

  // Plain text file
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(file.name)}"`);
  res.send(file.data);
});

// GET download checklist as formatted text
app.get("/api/checklists/:id/checklist-download", (req, res) => {
  const checklists = loadChecklists();
  const checklist = checklists.find(c => c.id === req.params.id);
  if (!checklist) return res.status(404).json({ error: "Not found" });

  const rules = checklist.checklist;
  let text = `# ${checklist.companyName} — Brand Checklist\n`;
  text += `# Generated by ComplyKit\n`;
  text += `# ${new Date(checklist.createdAt).toLocaleDateString("en-US")}\n`;
  text += `# Total Rules: ${checklist.totalRules}\n\n`;

  if (rules.summary) text += `Summary: ${rules.summary}\n\n`;

  const catNames = {
    tone: "Tone & Voice", vocabulary: "Vocabulary", formatting: "Formatting",
    structure: "Structure", brand_identity: "Brand Identity",
    compliance: "Compliance", content_rules: "Content Rules"
  };

  for (const [cat, val] of Object.entries(rules)) {
    if (cat === "companyName" || cat === "summary") continue;
    if (!val || !val.rules) continue;
    text += `## ${catNames[cat] || cat}\n`;
    if (val.description) text += `${val.description}\n`;
    val.rules.forEach((r, i) => { text += `  ${i + 1}. ${r}\n`; });
    if (val.preferred) text += `  Preferred: ${val.preferred.join(", ")}\n`;
    if (val.banned) text += `  Banned: ${val.banned.join(", ")}\n`;
    text += "\n";
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(checklist.companyName)}-checklist.txt"`);
  res.send(text);
});

// ============ ADMIN API ============

// Serve admin page
app.get("/admin", (req, res) => {
  res.sendFile(join(__dirname, "public", "admin.html"));
});

// GET admin analytics
app.get("/api/admin/analytics", (req, res) => {
  const checklists = loadChecklists();
  const history = loadHistory();
  const activity = loadActivity();

  // Basic stats
  const totalCompanies = checklists.length;
  const totalChecks = history.length;
  const totalRules = checklists.reduce((s, c) => s + (c.totalRules || 0), 0);

  // Average score
  const scores = history.map(h => h.report?.overallScore || 0);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  // Checks per company
  const checksPerCompany = {};
  history.forEach(h => {
    const name = h.companyName || "Unknown";
    checksPerCompany[name] = (checksPerCompany[name] || 0) + 1;
  });

  // Scores per company (average)
  const scoresPerCompany = {};
  const scoresCountPerCompany = {};
  history.forEach(h => {
    const name = h.companyName || "Unknown";
    const score = h.report?.overallScore || 0;
    scoresPerCompany[name] = (scoresPerCompany[name] || 0) + score;
    scoresCountPerCompany[name] = (scoresCountPerCompany[name] || 0) + 1;
  });
  for (const name of Object.keys(scoresPerCompany)) {
    scoresPerCompany[name] = Math.round(scoresPerCompany[name] / scoresCountPerCompany[name]);
  }

  // Violations by category
  const violationsByCategory = {};
  history.forEach(h => {
    (h.report?.findings || []).forEach(f => {
      const cat = f.category || "other";
      violationsByCategory[cat] = (violationsByCategory[cat] || 0) + 1;
    });
  });

  // Severity breakdown
  const severityBreakdown = { high: 0, medium: 0, low: 0 };
  history.forEach(h => {
    (h.report?.findings || []).forEach(f => {
      if (severityBreakdown[f.severity] !== undefined) severityBreakdown[f.severity]++;
    });
  });

  // Checks over time (last 7 days)
  const checksOverTime = {};
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    checksOverTime[key] = 0;
  }
  history.forEach(h => {
    const day = (h.checkedAt || "").split("T")[0];
    if (checksOverTime[day] !== undefined) checksOverTime[day]++;
  });

  res.json({
    stats: { totalCompanies, totalChecks, totalRules, avgScore },
    checksPerCompany,
    scoresPerCompany,
    violationsByCategory,
    severityBreakdown,
    checksOverTime,
    recentActivity: activity.slice(0, 30),
    recentChecks: history.slice(0, 10).map(h => ({
      companyName: h.companyName,
      score: h.report?.overallScore || 0,
      violations: h.report?.failedRules || 0,
      passed: h.report?.passedRules || 0,
      preview: h.contentPreview,
      checkedAt: h.checkedAt,
    })),
    companies: checklists.map(c => ({
      id: c.id,
      name: c.companyName,
      rules: c.totalRules,
      createdAt: c.createdAt,
    })),
  });
});

// ============ MOCK DATA (seed on first run) ============
function seedActivityLog() {
  const existingActivity = loadActivity();
  if (existingActivity.length > 0) return;
  const mockActivity = [
    { action: "company_added", companyName: "أرامكو السعودية", totalRules: 28, timestamp: "2026-03-01T10:05:00.000Z", ip: "192.168.1.10" },
    { action: "company_added", companyName: "STC", totalRules: 27, timestamp: "2026-03-02T14:35:00.000Z", ip: "192.168.1.22" },
    { action: "company_added", companyName: "NEOM", totalRules: 30, timestamp: "2026-03-03T09:20:00.000Z", ip: "192.168.1.15" },
    { action: "content_checked", companyName: "أرامكو السعودية", score: 45, violations: 5, timestamp: "2026-03-04T11:00:00.000Z", ip: "192.168.1.10" },
    { action: "content_checked", companyName: "أرامكو السعودية", score: 20, violations: 8, timestamp: "2026-03-05T09:30:00.000Z", ip: "192.168.1.10" },
    { action: "content_checked", companyName: "STC", score: 75, violations: 3, timestamp: "2026-03-05T14:00:00.000Z", ip: "192.168.1.22" },
    { action: "content_checked", companyName: "NEOM", score: 60, violations: 4, timestamp: "2026-03-06T10:15:00.000Z", ip: "192.168.1.15" },
    { action: "content_checked", companyName: "STC", score: 90, violations: 1, timestamp: "2026-03-06T16:45:00.000Z", ip: "192.168.1.22" },
    { action: "content_checked", companyName: "أرامكو السعودية", score: 85, violations: 2, timestamp: "2026-03-07T08:00:00.000Z", ip: "192.168.1.10" },
  ];
  saveActivity(mockActivity.reverse());
  console.log("📊 Seeded mock activity log");
}

function seedMockData() {
  // Seed activity log regardless of checklists state
  seedActivityLog();

  const existing = loadChecklists();
  if (existing.length > 0) return;

  const mockChecklists = [
    {
      id: "aramco001",
      companyName: "أرامكو السعودية",
      checklist: {
        companyName: "أرامكو السعودية",
        tone: {
          description: "رسمي، موثوق، مؤسسي",
          rules: [
            "استخدام لغة رسمية واحترافية في جميع المحتويات",
            "تجنب اللهجة العامية أو التعبيرات الدارجة",
            "الحفاظ على نبرة ثقة وقيادية دون تكبّر",
            "استخدام صيغة المتكلم الجماعي (نحن) بدلاً من المفرد",
            "تجنب المبالغة والادعاءات غير المدعومة بأرقام"
          ]
        },
        vocabulary: {
          preferred: ["الطاقة المستدامة", "الابتكار", "الريادة", "التحول", "الشراكة"],
          banned: ["بترول خام", "نفط", "احتكار", "أرخص"],
          rules: [
            "استخدام 'أرامكو السعودية' كاملة في أول ذكر، ثم 'أرامكو' في باقي النص",
            "كتابة 'Saudi Aramco' بالإنجليزية وليس 'Aramco Saudi' أو 'ARAMCO'",
            "استخدام مصطلح 'الطاقة' بدلاً من 'النفط' أو 'البترول' قدر الإمكان",
            "استخدام 'التحول الطاقوي' بدلاً من 'الانتقال من النفط'",
            "تجنب المصطلحات التقنية دون شرحها للقارئ العام"
          ]
        },
        formatting: {
          rules: [
            "عدم استخدام الإيموجي في المحتوى الرسمي",
            "استخدام الإيموجي بحذر في محتوى السوشال ميديا (حد أقصى 2)",
            "الأرقام تكتب بالأرقام العربية (1، 2، 3) وليس الهندية",
            "التواريخ بصيغة: DD MMMM YYYY",
            "استخدام الهاشتاقات بالإنجليزية والعربية معاً"
          ]
        },
        structure: {
          rules: [
            "البدء بأهم معلومة في الفقرة الأولى (أسلوب الهرم المقلوب)",
            "الفقرات لا تتجاوز 4 أسطر",
            "وجود دعوة للتفاعل (CTA) في نهاية كل محتوى تسويقي",
            "استخدام عناوين فرعية كل 200 كلمة في المقالات الطويلة"
          ]
        },
        brand_identity: {
          rules: [
            "ربط المحتوى دائماً برؤية 2030 عند الحديث عن المستقبل",
            "التأكيد على دور أرامكو في التنمية المستدامة",
            "عدم مقارنة أرامكو بشركات منافسة بالاسم",
            "استخدام ألوان العلامة التجارية (الأخضر والأزرق) في أي محتوى بصري"
          ]
        },
        compliance: {
          rules: [
            "إضافة إخلاء مسؤولية في أي محتوى يحتوي أرقام مالية",
            "عدم نشر معلومات مالية قبل الإفصاح الرسمي لتداول",
            "التصريح بأن المحتوى إعلاني عند الترويج لمنتجات أو خدمات",
            "الحصول على موافقة الأفراد قبل نشر صورهم أو اقتباساتهم"
          ]
        },
        content_rules: {
          rules: [
            "عدم التطرق للمواضيع السياسية أو الطائفية",
            "تجنب أي محتوى قد يُفسر على أنه إضرار بالبيئة",
            "عدم الحديث عن الرواتب أو المزايا الداخلية",
            "عدم مشاركة صور المنشآت الداخلية دون إذن"
          ]
        },
        summary: "أسلوب مؤسسي رسمي يعكس الريادة والاستدامة مع التزام برؤية 2030"
      },
      createdAt: "2026-03-01T10:00:00.000Z",
      totalRules: 28,
      files: [
        { index: 0, name: "brand-guidelines-aramco.txt", type: "text", isImage: false, size: 120, data: "data:text/plain;base64,2K/ZhNmK2YQg2KPYs9mE2YjYqCDYo9ix2KfZhdmD2Ygg2KfZhNiz2LnZiNiv2YrYqSAtINin2YTZhtiz2K7YqSDYp9mE2LHYs9mF2YrYqQ==" },
        { index: 1, name: "social-media-policy.txt", type: "text", isImage: false, size: 85, data: "data:text/plain;base64,2LPZitin2LPYqSDYp9mE2YXYrdiq2YjZiSDYudmE2Ykg2YXZiNin2YLYuSDYp9mE2KrZiNin2LXZhCDYp9mE2KfYrNiq2YXYp9i52Yo=" }
      ]
    },
    {
      id: "stc002",
      companyName: "STC",
      checklist: {
        companyName: "STC",
        tone: {
          description: "شبابي، تقني، ودّي وعصري",
          rules: [
            "استخدام لغة ودّية وقريبة من الجمهور",
            "مزج العربية والإنجليزية بشكل طبيعي",
            "استخدام أسلوب مباشر وبسيط دون تعقيد",
            "إظهار الحماس والإيجابية في المحتوى",
            "تجنب اللغة الرسمية الجافة"
          ]
        },
        vocabulary: {
          preferred: ["فعّل", "استمتع", "أسرع", "غير محدود", "تجربة رقمية", "اتصالك"],
          banned: ["رخيص", "مشكلة تقنية", "عطل", "انقطاع"],
          rules: [
            "كتابة 'stc' بحروف صغيرة دائماً وليس 'STC' أو 'Stc'",
            "استخدام 'stc' بالإنجليزية حتى في المحتوى العربي",
            "استخدام 'باقة' بدلاً من 'اشتراك' أو 'خطة'",
            "استخدام 'تغطية' بدلاً من 'شبكة' عند الحديث عن الخدمة",
            "تجنب المصطلحات التقنية المعقدة"
          ]
        },
        formatting: {
          rules: [
            "استخدام الإيموجي بكثرة في السوشال ميديا (3-5 لكل بوست)",
            "الهاشتاقات بالإنجليزية والعربية: #stc #اكسبلور",
            "استخدام الأرقام بدلاً من كتابتها: '5G' وليس 'الجيل الخامس'",
            "الجمل قصيرة ومباشرة — لا تتجاوز 15 كلمة",
            "استخدام السطر الجديد بين كل نقطة في بوستات السوشال"
          ]
        },
        structure: {
          rules: [
            "البدء بعبارة جذابة (hook) في أول سطر",
            "ذكر العرض أو الميزة في أول 3 أسطر",
            "إنهاء كل بوست بـ CTA واضح",
            "السوشال ميديا: 3-5 أسطر كحد أقصى"
          ]
        },
        brand_identity: {
          rules: [
            "استخدام اللون البنفسجي كلون أساسي في المحتوى البصري",
            "عدم استخدام الشعار القديم (الأخضر)",
            "ربط المحتوى بأسلوب حياة رقمي عصري",
            "التأكيد على أن stc ليست مجرد اتصالات بل ممكّن رقمي"
          ]
        },
        compliance: {
          rules: [
            "ذكر 'تطبق الشروط والأحكام' في كل عرض ترويجي",
            "توضيح مدة العرض وتاريخ انتهائه",
            "عدم المقارنة بشركات منافسة بالاسم",
            "التصريح بأن المحتوى إعلاني (#إعلان) في المحتوى المدفوع"
          ]
        },
        content_rules: {
          rules: [
            "تجنب الحديث عن أعطال الشبكة أو مشاكل الخدمة",
            "عدم الوعد بسرعات محددة دون إضافة 'تصل إلى'",
            "تجنب المحتوى الذي قد يُفسر بأنه يستهزئ بالمنافسين",
            "عدم استخدام صور أشخاص حقيقيين بدون إذن"
          ]
        },
        summary: "أسلوب شبابي عصري يمزج العربي بالإنجليزي مع طاقة إيجابية وبساطة"
      },
      createdAt: "2026-03-02T14:30:00.000Z",
      totalRules: 27
    },
    {
      id: "neom003",
      companyName: "NEOM",
      checklist: {
        companyName: "NEOM",
        tone: {
          description: "Visionary, futuristic, bold, and inspiring",
          rules: [
            "Use ambitious, future-forward language",
            "Write primarily in English; Arabic as secondary",
            "Project confidence and certainty about the vision",
            "Avoid hedging words like maybe, possibly, might",
            "Use active voice"
          ]
        },
        vocabulary: {
          preferred: ["reimagine", "revolutionary", "livability", "cognitive", "hyper-connected", "zero-carbon"],
          banned: ["desert city", "sand", "mirage", "utopia", "pipe dream"],
          rules: [
            "Always write NEOM in all caps",
            "Use THE LINE in all caps when referring to the linear city",
            "Use OXAGON for the industrial city",
            "Use TROJENA for the mountain resort",
            "Prefer cognitive city over smart city",
            "Use residents or community members not inhabitants"
          ]
        },
        formatting: {
          rules: [
            "Minimal emoji use — maximum 1 per post, preferably none",
            "Hashtags: #NEOM #TheFutureIsNow #WhatIsNEOM",
            "Numbers always in digits: 170km, 500m, 9M residents",
            "Use metric system exclusively",
            "Dates in international format: March 5, 2026"
          ]
        },
        structure: {
          rules: [
            "Lead with the vision, follow with the facts",
            "Every piece must answer: Why does this matter for the future?",
            "Include a forward-looking statement in every post",
            "Long-form content must include data points and statistics"
          ]
        },
        brand_identity: {
          rules: [
            "Always connect to Saudi Vision 2030",
            "Position NEOM as a global project, not just Saudi",
            "Reference sustainability and zero-carbon commitment",
            "Use NEOM brand colors: black, white, and electric blue",
            "Never use megaproject — use accelerator of human progress"
          ]
        },
        compliance: {
          rules: [
            "Do not share construction timelines without official approval",
            "Financial figures require PR team approval before publishing",
            "All renders and visualizations must use approved NEOM imagery only",
            "Add disclaimer for any forward-looking statements"
          ]
        },
        content_rules: {
          rules: [
            "Never address criticism or negative press directly in content",
            "Avoid political context — focus on innovation and livability",
            "Do not compare NEOM to other cities or projects by name",
            "Worker welfare topics require PR team guidance before publishing",
            "Environmental claims must be backed by specific data"
          ]
        },
        summary: "Bold, visionary English-first content that positions NEOM as humanity's next chapter"
      },
      createdAt: "2026-03-03T09:15:00.000Z",
      totalRules: 30
    }
  ];

  saveChecklists(mockChecklists);

  console.log("📋 ComplyKit Brand Consistency Checker running");
}

// Start server
app.listen(PORT, () => {
  seedMockData();
  console.log(`\n🚀 ComplyKit Web running at http://localhost:${PORT}\n`);
});
