// ============ AUTH ============
function getLoggedUser() {
  const u = localStorage.getItem("complykit-user");
  return u ? JSON.parse(u) : null;
}

function checkAuth() {
  const user = getLoggedUser();
  if (user) {
    document.getElementById("auth-page").style.display = "none";
    document.getElementById("app-container").style.display = "";
  } else {
    document.getElementById("auth-page").style.display = "";
    document.getElementById("app-container").style.display = "none";
  }
}

function showAuthTab(tab) {
  const loginBtn = document.getElementById("tab-login");
  const signupBtn = document.getElementById("tab-signup");
  const loginForm = document.getElementById("form-login");
  const signupForm = document.getElementById("form-signup");

  if (tab === "login") {
    loginBtn.classList.add("bg-brand-600", "text-white");
    loginBtn.classList.remove("t-text-secondary");
    signupBtn.classList.remove("bg-brand-600", "text-white");
    signupBtn.classList.add("t-text-secondary");
    loginForm.style.display = "";
    signupForm.style.display = "none";
  } else {
    signupBtn.classList.add("bg-brand-600", "text-white");
    signupBtn.classList.remove("t-text-secondary");
    loginBtn.classList.remove("bg-brand-600", "text-white");
    loginBtn.classList.add("t-text-secondary");
    signupForm.style.display = "";
    loginForm.style.display = "none";
  }
  // Clear errors
  document.getElementById("login-error").classList.add("hidden");
  document.getElementById("signup-error").classList.add("hidden");
  document.getElementById("signup-success").classList.add("hidden");
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const errEl = document.getElementById("login-error");
  errEl.classList.add("hidden");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = data.error;
      errEl.classList.remove("hidden");
      return;
    }
    localStorage.setItem("complykit-user", JSON.stringify(data.user));
    checkAuth();
    loadDashboard();
  } catch (err) {
    errEl.textContent = "خطأ في الاتصال بالسيرفر";
    errEl.classList.remove("hidden");
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const errEl = document.getElementById("signup-error");
  const successEl = document.getElementById("signup-success");
  errEl.classList.add("hidden");
  successEl.classList.add("hidden");

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = data.error;
      errEl.classList.remove("hidden");
      return;
    }
    successEl.textContent = t("auth_success") || "تم إنشاء الحساب بنجاح! سجّل دخولك الآن";
    successEl.classList.remove("hidden");
    // Auto switch to login after 1.5s
    setTimeout(() => {
      showAuthTab("login");
      document.getElementById("login-email").value = email;
    }, 1500);
  } catch (err) {
    errEl.textContent = "خطأ في الاتصال بالسيرفر";
    errEl.classList.remove("hidden");
  }
}

function handleLogout() {
  localStorage.removeItem("complykit-user");
  localStorage.removeItem("complykit-company-id");
  checkAuth();
}

// On page load — check auth
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
});

// ============ NAVIGATION ============
function showPage(page) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  document.getElementById(`page-${page}`).classList.add("active");
  document.getElementById(`nav-${page}`).classList.add("active");

  if (page === "dashboard") loadDashboard();
  if (page === "check") loadChecklistSelect();
  if (page === "history") loadHistory();
}

let loadingDots;
function showLoading(text) {
  const el = document.getElementById("loading-text");
  el.textContent = text || t("loading");
  document.getElementById("loading-overlay").classList.remove("hidden");
  // Animate dots to show it's still working
  let dots = 0;
  const base = text || t("loading");
  clearInterval(loadingDots);
  loadingDots = setInterval(() => {
    dots = (dots + 1) % 4;
    el.textContent = base + ".".repeat(dots);
  }, 500);
}

function hideLoading() {
  clearInterval(loadingDots);
  document.getElementById("loading-overlay").classList.add("hidden");
}

// ============ DASHBOARD ============
async function loadDashboard() {
  try {
    const res = await fetch("/api/checklists");
    const allChecklists = await res.json();

    // Auto-lock to first company if not set yet
    if (!getLoggedCompanyId() && allChecklists.length > 0) {
      setLoggedCompany(allChecklists[0].id);
    }

    const checklists = filterMyChecklists(allChecklists);

    const grid = document.getElementById("checklists-grid");
    const empty = document.getElementById("empty-state");

    // Update stats
    const statsRow = document.getElementById("stats-row");
    if (checklists.length > 0) {
      statsRow.classList.remove("hidden");
      statsRow.classList.add("grid");
      document.getElementById("stat-checklists").textContent = checklists.length;
      document.getElementById("stat-rules").textContent = checklists.reduce((s, c) => s + (c.totalRules || 0), 0);
      document.getElementById("stat-companies").textContent = allChecklists.length;
    } else {
      statsRow.classList.add("hidden");
    }

    // Update header company badge (user is "logged in" to their company)
    if (checklists.length > 0) {
      updateHeaderCompanyBadge(checklists[0].companyName);
    } else {
      updateHeaderCompanyBadge(null);
    }

    if (checklists.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    grid.innerHTML = checklists
      .map(
        (c) => `
      <div class="glass rounded-2xl p-5 hover:border-brand-500/30 transition group">
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center text-2xl">
            🏢
          </div>
          <button onclick="deleteChecklist('${c.id}')" class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition text-sm">
            🗑️
          </button>
        </div>
        <h3 class="font-bold text-white text-lg mb-1">${c.companyName}</h3>
        <p class="text-gray-400 text-sm mb-3">${c.checklist?.summary || "Brand Checklist"}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500">${c.totalRules} ${t("card_rules")}</span>
          <span class="text-xs text-gray-600">${new Date(c.createdAt).toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US")}</span>
        </div>
        <button onclick="useChecklist('${c.id}')" class="mt-3 w-full py-2 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 rounded-lg text-sm font-medium transition">
          ${t("card_use")}
        </button>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

function useChecklist(id) {
  // Pre-set the company so loadChecklistSelect picks it up
  document.getElementById("checklist-select").value = id;
  showPage("check");
}

async function deleteChecklist(id) {
  if (!confirm(t("card_delete_confirm"))) return;
  await fetch(`/api/checklists/${id}`, { method: "DELETE" });
  loadDashboard();
}

// ============ FILE UPLOAD ============
let uploadedFiles = []; // {name, type, data (base64 or text)}

// Setup drag & drop + click on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const area = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");
  if (!area || !fileInput) return;

  // Click to open file picker
  area.addEventListener("click", (e) => {
    if (e.target === fileInput) return; // don't re-trigger
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = ""; // reset so same file can be re-selected
  });

  // Drag over — MUST preventDefault to allow drop
  area.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    area.classList.add("border-brand-400", "bg-brand-500/5");
  });

  // Drag enter
  area.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.stopPropagation();
    area.classList.add("border-brand-400", "bg-brand-500/5");
  });

  // Drag leave
  area.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    area.classList.remove("border-brand-400", "bg-brand-500/5");
  });

  // Drop
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    area.classList.remove("border-brand-400", "bg-brand-500/5");
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  });
});

async function processFiles(fileList) {
  for (const file of fileList) {
    try {
      const ext = file.name.split(".").pop().toLowerCase();
      const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
      const isText = ["txt", "json", "md", "csv"].includes(ext);

      const entry = { name: file.name, type: ext, size: file.size };

      if (isImage) {
        const base64 = await fileToBase64(file);
        entry.data = base64;
        entry.isImage = true;
      } else if (isText) {
        const text = await fileToText(file);
        entry.data = text;
        entry.isImage = false;
      } else if (ext === "pdf" || ext === "doc" || ext === "docx") {
        const base64 = await fileToBase64(file);
        entry.data = base64;
        entry.isImage = false;
        entry.needsExtraction = true;
      } else {
        console.warn("Unsupported file type:", ext);
        continue;
      }

      uploadedFiles.push(entry);
    } catch (err) {
      console.error("Error processing file:", file.name, err);
    }
  }
  renderUploadedFiles();
}

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function fileToText(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}

function removeUploadedFile(index) {
  uploadedFiles.splice(index, 1);
  renderUploadedFiles();
}

function renderUploadedFiles() {
  const container = document.getElementById("uploaded-files");
  if (uploadedFiles.length === 0) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  container.classList.remove("hidden");
  container.innerHTML = uploadedFiles.map((f, i) => {
    const icon = f.isImage ? "🖼️" : f.type === "pdf" ? "📄" : "📝";
    const sizeKB = (f.size / 1024).toFixed(1);
    const preview = f.isImage
      ? `<img src="${f.data}" class="w-10 h-10 rounded object-cover" />`
      : `<div class="w-10 h-10 rounded bg-dark-900 flex items-center justify-center text-lg">${icon}</div>`;

    return `
      <div class="flex items-center gap-3 bg-dark-900/50 rounded-lg p-3 border border-gray-700">
        ${preview}
        <div class="flex-1 min-w-0">
          <div class="text-sm text-white truncate">${f.name}</div>
          <div class="text-xs text-gray-500">${sizeKB} KB</div>
        </div>
        <button onclick="removeUploadedFile(${i})" class="text-gray-500 hover:text-red-400 transition text-lg">✕</button>
      </div>
    `;
  }).join("");
}

// ============ ONBOARDING ============
async function extractChecklist() {
  const companyName = document.getElementById("companyName").value.trim();
  const guidelinesText = document.getElementById("guidelinesText").value.trim();
  const sampleContent = document.getElementById("sampleContent").value.trim();

  if (!companyName) return alert(t("onb_alert_name"));
  if (!guidelinesText && !sampleContent && uploadedFiles.length === 0) return alert(t("onb_alert_content"));

  showLoading(t("onb_loading"));

  try {
    // Prepare files data
    const files = uploadedFiles.map(f => ({
      name: f.name,
      type: f.type,
      isImage: f.isImage || false,
      data: f.data,
    }));

    const res = await fetch("/api/checklists/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName, guidelinesText, sampleContent, files }),
    });
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    // Lock user to this new company
    if (data.id) setLoggedCompany(data.id);

    // Show result
    document.getElementById("extraction-result").classList.remove("hidden");
    document.getElementById("rules-count").textContent = `${data.totalRules} ${t("card_rules")}`;

    const details = document.getElementById("extraction-details");
    const categories = data.checklist;
    let html = '<div class="space-y-3">';

    const categoryKeys = ["tone", "vocabulary", "formatting", "structure", "brand_identity", "compliance", "content_rules"];

    for (const key of categoryKeys) {
      const cat = categories[key];
      if (!cat?.rules?.length) continue;
      html += `
        <div class="bg-dark-900/50 rounded-xl p-4">
          <h4 class="font-medium text-gray-200 mb-2">${t("cat_" + key)}</h4>
          <ul class="space-y-1">
            ${cat.rules.map((r) => `<li class="text-sm text-gray-400 flex gap-2"><span class="text-brand-500">•</span>${r}</li>`).join("")}
          </ul>
        </div>
      `;
    }
    html += "</div>";
    details.innerHTML = html;

    // Clear form
    document.getElementById("companyName").value = "";
    document.getElementById("guidelinesText").value = "";
    document.getElementById("sampleContent").value = "";
    uploadedFiles = [];
    renderUploadedFiles();
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    hideLoading();
  }
}

// ============ CONTENT CHECK ============
async function loadChecklistSelect() {
  try {
    const res = await fetch("/api/checklists");
    const allChecklists = await res.json();
    const checklists = filterMyChecklists(allChecklists);
    const select = document.getElementById("checklist-select");
    const banner = document.getElementById("company-banner");

    select.innerHTML = "";
    checklists.forEach((c) => {
      select.innerHTML += `<option value="${c.id}">${c.companyName}</option>`;
    });

    // Auto-select first company (user is already "logged in")
    if (checklists.length > 0) {
      const current = select.value || checklists[0].id;
      select.value = current;
      const company = checklists.find(c => c.id === current) || checklists[0];
      document.getElementById("company-banner-name").textContent = company.companyName;
      document.getElementById("company-banner-rules").textContent = `${company.totalRules} ${t("card_rules")}`;
      // Set avatar letter (first letter of company name)
      const firstLetter = company.companyName.charAt(0).toUpperCase();
      const bannerAvatar = document.getElementById("banner-avatar-letter");
      if (bannerAvatar) bannerAvatar.textContent = firstLetter;
      banner.classList.remove("hidden");
      // Update header company badge
      updateHeaderCompanyBadge(company.companyName);
      showCompanyGuidelines(checklists, current);
    } else {
      banner.classList.add("hidden");
    }
  } catch (err) {
    console.error(err);
  }
}

let currentChecklistId = null;

function showDownloadsSection(checklists, selectedId) {
  const section = document.getElementById("downloads-section");
  const filesCard = document.getElementById("files-download-card");
  const filesList = document.getElementById("files-list");

  if (!selectedId) {
    section.classList.add("hidden");
    currentChecklistId = null;
    return;
  }

  currentChecklistId = selectedId;
  const company = checklists.find(c => c.id === selectedId);
  if (!company) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  // Show uploaded files if any
  if (company.files && company.files.length > 0) {
    filesCard.classList.remove("hidden");
    filesList.innerHTML = company.files.map(f => {
      const icon = f.isImage ? "🖼️" : f.type === "pdf" ? "📄" : "📝";
      return `
        <a href="/api/checklists/${selectedId}/files/${f.index}/download" download="${f.name}"
          class="flex items-center gap-2 p-2 rounded-lg bg-dark-900/50 hover:bg-dark-900 border border-gray-700 hover:border-brand-500/50 transition text-sm cursor-pointer">
          <span>${icon}</span>
          <span class="flex-1 text-gray-300 truncate">${f.name}</span>
          <span class="text-brand-400 text-xs">⬇️</span>
        </a>
      `;
    }).join("");
  } else {
    filesCard.classList.add("hidden");
  }
}

function downloadChecklist() {
  if (!currentChecklistId) return;
  window.open(`/api/checklists/${currentChecklistId}/checklist-download`, "_blank");
}

function showCompanyGuidelines(checklists, selectedId) {
  const container = document.getElementById("guidelines-preview");
  showDownloadsSection(checklists, selectedId);
  if (!selectedId) {
    container.classList.add("hidden");
    return;
  }

  const company = checklists.find(c => c.id === selectedId);
  if (!company) {
    container.classList.add("hidden");
    return;
  }

  const rules = company.checklist;
  let html = `<h3 class="text-lg font-bold text-brand-400 mb-3">📋 ${t("chk_guidelines_title")} — ${company.companyName}</h3>`;
  html += `<p class="text-sm text-gray-400 mb-4">${rules.summary || ""}</p>`;
  html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">`;

  const categoryLabels = {
    tone: "🎯 " + t("chk_cat_tone"),
    vocabulary: "📝 " + t("chk_cat_vocab"),
    formatting: "🔤 " + t("chk_cat_format"),
    structure: "📐 " + t("chk_cat_structure"),
    brand_identity: "🏷️ " + t("chk_cat_brand"),
    compliance: "⚖️ " + t("chk_cat_compliance"),
    content_rules: "🚫 " + t("chk_cat_content"),
  };

  for (const [cat, val] of Object.entries(rules)) {
    if (cat === "companyName" || cat === "summary") continue;
    if (!val || !val.rules) continue;

    const label = categoryLabels[cat] || cat;
    html += `<div class="glass rounded-lg p-3 border border-white/5">`;
    html += `<div class="text-sm font-bold text-white mb-2">${label}</div>`;
    if (val.description) html += `<div class="text-xs text-gray-400 mb-2">${val.description}</div>`;
    html += `<ul class="space-y-1">`;
    val.rules.forEach(r => {
      html += `<li class="text-xs text-gray-300 flex gap-1"><span class="text-brand-400 mt-0.5">•</span><span>${r}</span></li>`;
    });
    html += `</ul>`;
    if (val.preferred) html += `<div class="text-xs text-green-400 mt-2">✅ ${val.preferred.join("، ")}</div>`;
    if (val.banned) html += `<div class="text-xs text-red-400 mt-1">🚫 ${val.banned.join("، ")}</div>`;
    html += `</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
  container.classList.remove("hidden");
}

async function checkContent() {
  const checklistId = document.getElementById("checklist-select").value;
  const content = document.getElementById("content-to-check").value.trim();

  if (!checklistId) return alert(t("chk_alert_select"));
  if (!content && !checkFiles.length) return alert(t("chk_alert_content"));

  showLoading(t("chk_loading"));

  // Prepare content media files (images/videos to analyze)
  const files = checkFiles.map(f => ({ name: f.name, type: f.type, isImage: f.isImage, isVideo: f.isVideo, data: f.dataUrl }));
  // Prepare guideline/policy files (company rules to check against)
  const policyFiles = guidelineFiles.map(f => ({ name: f.name, type: f.type, isImage: false, data: f.dataUrl, isGuideline: true }));

  try {
    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checklistId, content, files, policyFiles }),
    });
    const data = await res.json();

    if (data.error === "API_RATE_LIMIT") {
      alert(t("chk_rate_limit") || "⏳ الخدمة مشغولة حالياً. انتظر دقيقة وحاول مرة ثانية.");
      return;
    }
    if (data.error) throw new Error(data.message || data.error);

    const report = data.report;

    // Show result
    document.getElementById("check-result").classList.remove("hidden");

    // Score animation
    const score = report.overallScore || 0;
    const arc = document.getElementById("score-arc");
    const offset = 264 - (264 * score) / 100;
    setTimeout(() => {
      arc.style.strokeDashoffset = offset;
      arc.style.stroke = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
    }, 100);
    document.getElementById("score-text").textContent = `${score}%`;

    // Summary
    document.getElementById("report-company").textContent = data.companyName;
    document.getElementById("report-summary").textContent = report.summary || "";
    document.getElementById("passed-count").textContent = `${report.passedRules || 0} ${t("chk_passed")}`;
    document.getElementById("failed-count").textContent = `${report.failedRules || 0} ${t("chk_failed")}`;

    // Findings
    const findings = report.findings || [];
    document.getElementById("findings-list").innerHTML = findings
      .map(
        (f) => `
      <div class="glass rounded-xl p-4 border severity-${f.severity}">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm font-medium">${f.severity === "high" ? "🔴" : f.severity === "medium" ? "🟡" : "🟢"} ${f.category}</span>
        </div>
        <p class="text-sm text-gray-200 mb-1"><strong>${t("chk_rule")}:</strong> ${f.rule}</p>
        <p class="text-sm text-gray-300 mb-1"><strong>${t("chk_issue")}:</strong> ${f.issue}</p>
        ${f.excerpt ? `<p class="text-sm text-gray-400 mb-1"><strong>${t("chk_text")}:</strong> <code class="bg-dark-900 px-2 py-0.5 rounded">${f.excerpt}</code></p>` : ""}
        <p class="text-sm text-brand-400"><strong>${t("chk_fix")}:</strong> ${f.suggestion}</p>
      </div>
    `
      )
      .join("");

    // Before/After + Corrected version
    const original = content;
    const corrected = report.correctedVersion || t("chk_no_corrections");
    document.getElementById("before-text").textContent = original;
    document.getElementById("after-text").textContent = corrected;
    document.getElementById("corrected-text").textContent = corrected;
    // Default to diff view
    toggleCorrectedView("diff");
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    hideLoading();
  }
}

function toggleCorrectedView(mode) {
  const diffView = document.getElementById("diff-view");
  const cleanView = document.getElementById("clean-view");
  const btnDiff = document.getElementById("view-toggle-diff");
  const btnClean = document.getElementById("view-toggle-clean");

  if (mode === "diff") {
    diffView.classList.remove("hidden");
    cleanView.classList.add("hidden");
    btnDiff.classList.replace("bg-gray-700/50", "bg-brand-600/20");
    btnDiff.classList.replace("text-gray-400", "text-brand-400");
    btnDiff.classList.replace("border-gray-600/30", "border-brand-500/30");
    btnClean.classList.replace("bg-brand-600/20", "bg-gray-700/50");
    btnClean.classList.replace("text-brand-400", "text-gray-400");
    btnClean.classList.replace("border-brand-500/30", "border-gray-600/30");
  } else {
    diffView.classList.add("hidden");
    cleanView.classList.remove("hidden");
    btnClean.classList.replace("bg-gray-700/50", "bg-brand-600/20");
    btnClean.classList.replace("text-gray-400", "text-brand-400");
    btnClean.classList.replace("border-gray-600/30", "border-brand-500/30");
    btnDiff.classList.replace("bg-brand-600/20", "bg-gray-700/50");
    btnDiff.classList.replace("text-brand-400", "text-gray-400");
    btnDiff.classList.replace("border-brand-500/30", "border-gray-600/30");
  }
}

function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert(t("chk_copied"));
  });
}

// ============ HISTORY ============
async function loadHistory() {
  try {
    const res = await fetch("/api/history");
    const allHistory = await res.json();

    // Filter history to only show logged-in company's checks
    const myId = getLoggedCompanyId();
    const history = myId ? allHistory.filter(h => h.checklistId === myId) : allHistory;

    const list = document.getElementById("history-list");
    const empty = document.getElementById("history-empty");

    if (history.length === 0) {
      list.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    list.innerHTML = history.map((h) => {
      const score = h.report?.overallScore || 0;
      const color = score >= 80 ? "green" : score >= 50 ? "yellow" : "red";
      const date = new Date(h.checkedAt).toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      const findings = h.report?.findings?.length || 0;

      return `
        <div class="glass rounded-2xl p-5 hover:border-brand-500/30 transition cursor-pointer" onclick="showHistoryDetail(this)" data-report='${JSON.stringify(h.report).replace(/'/g, "&#39;")}' data-company="${h.companyName}">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center">
                <span class="text-xl font-bold text-${color}-400">${score}%</span>
              </div>
              <div>
                <h3 class="font-bold text-white">${h.companyName}</h3>
                <p class="text-sm text-gray-400 mt-0.5">${h.contentPreview || ""}...</p>
              </div>
            </div>
            <div class="text-left">
              <div class="text-xs text-gray-500">${date}</div>
              <div class="text-xs mt-1">
                <span class="text-green-400">✅ ${h.report?.passedRules || 0}</span>
                <span class="text-gray-600 mx-1">|</span>
                <span class="text-red-400">❌ ${findings}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error(err);
  }
}

function showHistoryDetail(el) {
  const report = JSON.parse(el.getAttribute("data-report"));
  const company = el.getAttribute("data-company");

  // Switch to check page and show the report
  showPage("check");

  // Display the report
  document.getElementById("check-result").classList.remove("hidden");

  const score = report.overallScore || 0;
  const arc = document.getElementById("score-arc");
  const offset = 264 - (264 * score) / 100;
  setTimeout(() => {
    arc.style.strokeDashoffset = offset;
    arc.style.stroke = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  }, 100);
  document.getElementById("score-text").textContent = `${score}%`;
  document.getElementById("report-company").textContent = company;
  document.getElementById("report-summary").textContent = report.summary || "";
  document.getElementById("passed-count").textContent = `✅ ${report.passedRules || 0} ${t("chk_passed")}`;
  document.getElementById("failed-count").textContent = `❌ ${report.failedRules || 0} ${t("chk_failed")}`;

  const findings = report.findings || [];
  document.getElementById("findings-list").innerHTML = findings
    .map((f) => `
      <div class="glass rounded-xl p-4 border severity-${f.severity}">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm font-medium">${f.severity === "high" ? "🔴" : f.severity === "medium" ? "🟡" : "🟢"} ${f.category}</span>
        </div>
        <p class="text-sm text-gray-200 mb-1"><strong>${t("chk_rule")}:</strong> ${f.rule}</p>
        <p class="text-sm text-gray-300 mb-1"><strong>${t("chk_issue")}:</strong> ${f.issue}</p>
        ${f.excerpt ? `<p class="text-sm text-gray-400 mb-1"><strong>${t("chk_text")}:</strong> <code class="bg-dark-900 px-2 py-0.5 rounded">${f.excerpt}</code></p>` : ""}
        <p class="text-sm text-brand-400"><strong>${t("chk_fix")}:</strong> ${f.suggestion}</p>
      </div>
    `).join("");

  document.getElementById("corrected-text").textContent = report.correctedVersion || t("chk_no_corrections");
}

// ============ HEADER COMPANY BADGE ============
function updateHeaderCompanyBadge(companyName) {
  const badge = document.getElementById("user-company-badge");
  const nameEl = document.getElementById("user-company-name");
  const avatarEl = document.getElementById("user-avatar-letter");
  if (!badge || !nameEl) return;
  if (companyName) {
    nameEl.textContent = companyName;
    avatarEl.textContent = companyName.charAt(0).toUpperCase();
    badge.classList.remove("hidden");
    badge.classList.add("flex");
  } else {
    badge.classList.add("hidden");
    badge.classList.remove("flex");
  }
}

// ============ THEME ============
function applyTheme(theme) {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);
  document.getElementById('theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  const logo = document.getElementById('header-logo');
  if (logo) logo.src = theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';
}

function initTheme() {
  const saved = localStorage.getItem('complykit-theme') || 'dark';
  applyTheme(saved);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('complykit-theme', newTheme);
}

// ============ LOGGED-IN COMPANY (isolate user to their company) ============
function getLoggedCompanyId() {
  return localStorage.getItem("complykit-company-id") || null;
}

function setLoggedCompany(id) {
  localStorage.setItem("complykit-company-id", id);
}

function clearLoggedCompany() {
  localStorage.removeItem("complykit-company-id");
}

// Filter checklists to only show the logged-in company
function filterMyChecklists(checklists) {
  const myId = getLoggedCompanyId();
  if (!myId) return checklists;
  return checklists.filter(c => c.id === myId);
}

// ============ DRAG & DROP FILES ============
let checkFiles = []; // {name, type, dataUrl} — content media (images, videos)
let guidelineFiles = []; // {name, type, dataUrl} — company guidelines/policies

function initDropzone() {
  // === Content Media Dropzone ===
  const dz = document.getElementById("dropzone");
  if (dz) {
    ["dragenter", "dragover"].forEach(evt => {
      dz.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation();
        dz.classList.add("border-purple-500", "bg-purple-600/10");
        document.getElementById("dropzone-default").classList.add("hidden");
        document.getElementById("dropzone-hover").classList.remove("hidden");
      });
    });

    ["dragleave", "drop"].forEach(evt => {
      dz.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation();
        dz.classList.remove("border-purple-500", "bg-purple-600/10");
        document.getElementById("dropzone-default").classList.remove("hidden");
        document.getElementById("dropzone-hover").classList.add("hidden");
      });
    });

    dz.addEventListener("drop", e => {
      const files = e.dataTransfer.files;
      if (files.length) handleDropFiles(files);
    });
  }

  // === Guidelines / Policy Dropzone ===
  const dzg = document.getElementById("dropzone-guidelines");
  if (dzg) {
    ["dragenter", "dragover"].forEach(evt => {
      dzg.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation();
        dzg.classList.add("border-brand-500", "bg-brand-600/10");
        document.getElementById("dropzone-guidelines-default").classList.add("hidden");
        document.getElementById("dropzone-guidelines-hover").classList.remove("hidden");
      });
    });

    ["dragleave", "drop"].forEach(evt => {
      dzg.addEventListener(evt, e => {
        e.preventDefault(); e.stopPropagation();
        dzg.classList.remove("border-brand-500", "bg-brand-600/10");
        document.getElementById("dropzone-guidelines-default").classList.remove("hidden");
        document.getElementById("dropzone-guidelines-hover").classList.add("hidden");
      });
    });

    dzg.addEventListener("drop", e => {
      const files = e.dataTransfer.files;
      if (files.length) handleGuidelineFiles(files);
    });
  }
}

// File size limits (bytes)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20 MB
const MAX_DOC_SIZE = 5 * 1024 * 1024;    // 5 MB

function handleDropFiles(fileList) {
  Array.from(fileList).forEach(file => {
    if (checkFiles.some(f => f.name === file.name)) return; // skip duplicates

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    // File size validation
    if (isImage && file.size > MAX_IMAGE_SIZE) {
      alert(t("chk_file_too_large") || `${file.name}: الملف كبير جداً (الحد الأقصى 10 MB)`);
      return;
    }
    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      alert(t("chk_file_too_large_video") || `${file.name}: الفيديو كبير جداً (الحد الأقصى 20 MB)`);
      return;
    }
    if (!isImage && !isVideo && file.size > MAX_DOC_SIZE) {
      alert(t("chk_file_too_large") || `${file.name}: الملف كبير جداً (الحد الأقصى 5 MB)`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      checkFiles.push({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1),
        dataUrl: reader.result,
        isImage,
        isVideo
      });
      renderCheckFilesPreview();
    };
    reader.readAsDataURL(file);
  });
}

function removeCheckFile(idx) {
  checkFiles.splice(idx, 1);
  renderCheckFilesPreview();
}

function renderCheckFilesPreview() {
  const container = document.getElementById("check-files-preview");
  if (!checkFiles.length) { container.classList.add("hidden"); container.innerHTML = ""; return; }
  container.classList.remove("hidden");
  container.innerHTML = checkFiles.map((f, i) => `
    <div class="flex items-center gap-3 bg-dark-900/50 rounded-xl px-4 py-3 border border-gray-700">
      ${f.isImage
        ? `<img src="${f.dataUrl}" class="w-10 h-10 rounded-lg object-cover border border-gray-600" />`
        : f.isVideo
          ? `<div class="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-lg">🎬</div>`
          : `<div class="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center text-lg">📄</div>`
      }
      <div class="flex-1 min-w-0">
        <p class="text-sm text-white truncate">${f.name}</p>
        <p class="text-xs text-gray-500">${f.size} KB ${f.isVideo ? '🎥' : f.isImage ? '🖼️' : ''}</p>
      </div>
      <button onclick="removeCheckFile(${i})" class="text-gray-500 hover:text-red-400 transition text-lg">✕</button>
    </div>
  `).join("");
}

// ============ GUIDELINE FILES (company policies/conditions) ============
function handleGuidelineFiles(fileList) {
  Array.from(fileList).forEach(file => {
    if (guidelineFiles.some(f => f.name === file.name)) return; // skip duplicates

    if (file.size > MAX_DOC_SIZE) {
      alert(t("chk_file_too_large") || `${file.name}: الملف كبير جداً (الحد الأقصى 5 MB)`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      guidelineFiles.push({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1),
        dataUrl: reader.result,
        isImage: false,
        isVideo: false,
        isGuideline: true
      });
      renderGuidelineFilesPreview();
    };
    reader.readAsDataURL(file);
  });
}

function removeGuidelineFile(idx) {
  guidelineFiles.splice(idx, 1);
  renderGuidelineFilesPreview();
}

function renderGuidelineFilesPreview() {
  const container = document.getElementById("guideline-files-preview");
  if (!guidelineFiles.length) { container.classList.add("hidden"); container.innerHTML = ""; return; }
  container.classList.remove("hidden");
  container.innerHTML = guidelineFiles.map((f, i) => {
    const ext = f.name.split(".").pop().toLowerCase();
    const icon = ext === "pdf" ? "📄" : ext === "json" ? "📋" : ext === "doc" || ext === "docx" ? "📝" : "📄";
    return `
      <div class="flex items-center gap-3 bg-dark-900/50 rounded-xl px-4 py-3 border border-gray-700">
        <div class="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center text-lg">${icon}</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-white truncate">${f.name}</p>
          <p class="text-xs text-gray-500">${f.size} KB</p>
        </div>
        <button onclick="removeGuidelineFile(${i})" class="text-gray-500 hover:text-red-400 transition text-lg">✕</button>
      </div>
    `;
  }).join("");
}

// ============ INIT ============
initTheme();
showPage("dashboard");
setTimeout(initDropzone, 100);
