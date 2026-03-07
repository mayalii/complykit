// ============ INTERNATIONALIZATION (i18n) ============
const translations = {
  ar: {
    // Header
    subtitle: "تناسق البراند + توافق الأنظمة السعودية",
    nav_dashboard: "📊 لوحة التحكم",
    nav_onboarding: "➕ إضافة شركة",
    nav_check: "✅ فحص المحتوى",

    // Hero
    hero_title: "محتوى متناسق،<br/>ومتوافق مع الأنظمة.",
    hero_desc: "أول منصة سعودية تضمن إن محتواك يعكس هوية شركتك ويتوافق مع الأنظمة المحلية — فحص مزدوج بالذكاء الاصطناعي قبل النشر.",
    hero_btn_add: "➕ أضف شركة جديدة",
    hero_btn_check: "✅ افحص محتوى",

    // Stats
    stat_checklists: "قوائم الفحص",
    stat_rules: "إجمالي القواعد",
    stat_companies: "شركات مسجلة",

    // Dashboard
    saved_checklists: "قوائم الفحص المحفوظة",
    empty_title: "لا توجد قوائم فحص بعد",
    empty_desc: "ابدأ بإضافة دليل أسلوب شركتك",
    empty_btn: "➕ أضف أول قائمة فحص",
    card_rules: "قاعدة",
    card_use: "استخدم للفحص →",
    card_delete_confirm: "هل تريد حذف قائمة الفحص هذه؟",

    // Onboarding
    onb_title: "إضافة شركة جديدة",
    onb_desc: "أرسل دليل الأسلوب أو أمثلة محتوى وسنستخلص قائمة الفحص تلقائياً",
    onb_company_label: "اسم الشركة *",
    onb_company_ph: "مثال: أرامكو، STC، نيوم...",
    onb_guidelines_label: "دليل الأسلوب / Brand Guidelines",
    onb_guidelines_hint: "الصق نص دليل الأسلوب هنا أو ارفع ملفات",
    onb_upload_title: "اسحب الملفات هنا أو اضغط للرفع",
    onb_upload_formats: "يدعم: TXT, PDF, صور (PNG, JPG), JSON",
    onb_guidelines_ph: "مثال: نستخدم لغة رسمية واحترافية. نتجنب المصطلحات العامية. نكتب اسم الشركة بالإنجليزية دائماً...",
    onb_sample_label: "أمثلة محتوى (اختياري)",
    onb_sample_hint: "الصق أمثلة محتوى ناجح — سنحلل الأسلوب منه",
    onb_sample_ph: "الصق هنا محتوى سوشال ميديا، إعلانات، أو أي نص تريد أن يتعلم الذكاء الاصطناعي أسلوبه...",
    onb_extract_btn: "🔍 استخلص قائمة الفحص",
    onb_result_title: "✅ تم استخلاص قائمة الفحص!",
    onb_back_btn: "← العودة للوحة التحكم",
    onb_alert_name: "اكتب اسم الشركة",
    onb_alert_content: "أضف دليل الأسلوب أو أمثلة محتوى على الأقل",
    onb_loading: "جاري تحليل الأسلوب",

    // Categories
    cat_tone: "🎭 النبرة والأسلوب",
    cat_vocabulary: "📖 المصطلحات",
    cat_formatting: "✏️ التنسيق",
    cat_structure: "🏗️ الهيكلة",
    cat_brand_identity: "🏷️ الهوية البصرية",
    cat_compliance: "⚖️ الأنظمة السعودية",
    cat_content_rules: "📋 قواعد المحتوى",

    // Content Check
    chk_title: "فحص المحتوى",
    chk_desc: "الصق محتواك وسنفحصه مقابل قواعد شركتك والأنظمة السعودية",
    chk_connected: "متصل",
    chk_logged_as: "مسجل دخول كـ",
    chk_select_label: "اختر قائمة الفحص",
    chk_select_ph: "-- اختر شركة --",
    chk_content_label: "المحتوى المراد فحصه",
    chk_content_ph: "الصق المحتوى هنا... (بوست سوشال ميديا، إعلان، إيميل، مقال)",
    chk_btn: "✅ افحص المحتوى",
    chk_corrected_title: "📝 النسخة المصححة",
    chk_copy_btn: "📋 نسخ النص المصحح",
    chk_alert_select: "اختر قائمة فحص أولاً",
    chk_alert_content: "الصق المحتوى المراد فحصه",
    chk_loading: "جاري فحص تناسق المحتوى",
    chk_passed: "ناجح",
    chk_failed: "مخالفة",
    chk_no_corrections: "لا توجد تصحيحات مطلوبة",
    chk_rule: "القاعدة",
    chk_issue: "المشكلة",
    chk_text: "النص",
    chk_fix: "الحل",
    chk_copied: "تم النسخ ✅",
    chk_rate_limit: "⏳ الخدمة مشغولة حالياً. انتظر دقيقة وحاول مرة ثانية.",
    chk_downloads_title: "📥 التحميلات",
    chk_dl_checklist: "قائمة الفحص",
    chk_dl_checklist_desc: "حمّل قائمة الفحص المستخلصة كملف نصي",
    chk_dl_files: "الملفات المرفوعة",
    chk_dl_files_desc: "الملفات الأصلية المرفوعة مع دليل الأسلوب",
    chk_dl_btn: "⬇️ تحميل",
    chk_brand_score: "Brand Score",
    chk_before: "قبل",
    chk_after: "بعد",
    chk_guidelines_title: "قواعد الشركة",
    chk_cat_tone: "النبرة",
    chk_cat_vocab: "المصطلحات",
    chk_cat_format: "التنسيق",
    chk_cat_structure: "الهيكل",
    chk_cat_brand: "الهوية",
    chk_cat_compliance: "الأنظمة",
    chk_cat_content: "قواعد المحتوى",

    // History
    nav_history: "📜 السجل",
    hist_title: "سجل الفحوصات",
    hist_desc: "جميع الفحوصات السابقة ونتائجها",
    hist_empty: "لا توجد فحوصات سابقة",
    hist_empty_desc: "ابدأ بفحص محتوى وستظهر النتائج هنا",

    // About Section
    about_title: "ما هو ComplyKit؟",
    about_desc: "أول منصة سعودية تفحص المحتوى الرقمي فحص مزدوج — تناسق مع هوية البراند + توافق مع الأنظمة السعودية المحلية. ارفع دليل أسلوب شركتك، والذكاء الاصطناعي يستخرج القواعد تلقائياً ويفحص كل محتوى قبل النشر.",
    about_f1_title: "فحص مزدوج بالـ AI",
    about_f1_desc: "يراجع تناسق البراند + توافق الأنظمة السعودية في نفس الوقت ويعطيك Brand Score + تقرير مفصّل.",
    about_f2_title: "نسخة مصححة جاهزة",
    about_f2_desc: "مقارنة قبل/بعد توضح كل تغيير ولماذا — نسخة مصححة جاهزة للنشر بضغطة زر.",
    about_f3_title: "يتحسّن مع الوقت",
    about_f3_desc: "كل فحص يبني قاعدة بيانات أقوى — التحليل يصير أدق وأذكى مع كل استخدام.",
    audience_title: "لمن هذا المنتج؟",
    aud_1_title: "فرق التسويق والمحتوى",
    aud_1_desc: "تضمن إن كل بوست وإعلان وإيميل يعكس هوية الشركة بشكل موحّد قبل ما ينزل.",
    aud_2_title: "الوكالات الإعلانية",
    aud_2_desc: "تدير محتوى عدة شركات؟ كل شركة لها قواعدها — ComplyKit يضمن التناسق لكل عميل.",
    aud_3_title: "الشركات الناشئة",
    aud_3_desc: "تبني براندك من البداية؟ ComplyKit يساعدك تثبّت هويتك من أول محتوى تنشره.",
    aud_4_title: "أي جهة سعودية",
    aud_4_desc: "تنشر محتوى رقمي وتحتاج تتوافق مع الأنظمة المحلية — PDPL، نظام التجارة الإلكترونية، وغيرها.",
    why_title: "ليش ComplyKit؟",
    why_without: "بدون ComplyKit",
    why_without_desc: "مراجعة يدوية تاخذ ساعات، أخطاء تفوت، محتوى غير متناسق، ومخاطر مخالفات نظامية.",
    why_with: "مع ComplyKit",
    why_with_desc: "فحص تلقائي بثوانٍ، تناسق ١٠٠٪ مع البراند، توافق مع الأنظمة السعودية، ونسخة مصححة جاهزة.",

    // Footer
    footer_powered: "مدعوم بالذكاء الاصطناعي",
    loading: "جاري التحليل",
  },

  en: {
    // Header
    subtitle: "Brand Consistency + Saudi Compliance",
    nav_dashboard: "📊 Dashboard",
    nav_onboarding: "➕ Onboarding",
    nav_check: "✅ Content Check",

    // Hero
    hero_title: "Consistent Content,<br/>Compliant by Default.",
    hero_desc: "The first Saudi platform that ensures your content reflects your brand identity AND complies with local regulations — dual AI-powered review before publishing.",
    hero_btn_add: "➕ Add New Company",
    hero_btn_check: "✅ Check Content",

    // Stats
    stat_checklists: "Checklists",
    stat_rules: "Total Rules",
    stat_companies: "Companies",

    // Dashboard
    saved_checklists: "Saved Checklists",
    empty_title: "No Checklists Yet",
    empty_desc: "Start by adding your company's brand guidelines",
    empty_btn: "➕ Add First Checklist",
    card_rules: "rules",
    card_use: "Use for Check →",
    card_delete_confirm: "Delete this checklist?",

    // Onboarding
    onb_title: "Add New Company",
    onb_desc: "Upload brand guidelines or content examples and we'll auto-extract a compliance checklist",
    onb_company_label: "Company Name *",
    onb_company_ph: "e.g. Aramco, STC, NEOM...",
    onb_guidelines_label: "Style Guide / Brand Guidelines",
    onb_guidelines_hint: "Paste your style guide text here or upload files",
    onb_upload_title: "Drag files here or click to upload",
    onb_upload_formats: "Supports: TXT, PDF, Images (PNG, JPG), JSON",
    onb_guidelines_ph: "e.g. We use formal and professional language. We avoid slang. We always write the company name in English...",
    onb_sample_label: "Content Examples (Optional)",
    onb_sample_hint: "Paste successful content examples — we'll analyze the style",
    onb_sample_ph: "Paste social media posts, ads, or any text you want the AI to learn the style from...",
    onb_extract_btn: "🔍 Extract Checklist",
    onb_result_title: "✅ Checklist Extracted Successfully!",
    onb_back_btn: "← Back to Dashboard",
    onb_alert_name: "Enter company name",
    onb_alert_content: "Add brand guidelines or content examples at minimum",
    onb_loading: "Analyzing brand style",

    // Categories
    cat_tone: "🎭 Tone & Voice",
    cat_vocabulary: "📖 Terminology",
    cat_formatting: "✏️ Formatting",
    cat_structure: "🏗️ Structure",
    cat_brand_identity: "🏷️ Brand Identity",
    cat_compliance: "⚖️ Saudi Regulations",
    cat_content_rules: "📋 Content Rules",

    // Content Check
    chk_title: "Content Check",
    chk_desc: "Paste your content and we'll check it against your company's rules & Saudi regulations",
    chk_connected: "Connected",
    chk_logged_as: "Logged in as",
    chk_select_label: "Select Checklist",
    chk_select_ph: "-- Select Company --",
    chk_content_label: "Content to Review",
    chk_content_ph: "Paste your content here... (social media post, ad, email, article)",
    chk_btn: "✅ Check Content",
    chk_corrected_title: "📝 Corrected Version",
    chk_copy_btn: "📋 Copy Corrected Text",
    chk_alert_select: "Select a checklist first",
    chk_alert_content: "Paste the content you want to check",
    chk_loading: "Checking brand consistency",
    chk_passed: "passed",
    chk_failed: "violations",
    chk_no_corrections: "No corrections needed",
    chk_rule: "Rule",
    chk_issue: "Issue",
    chk_text: "Text",
    chk_fix: "Fix",
    chk_copied: "Copied ✅",
    chk_rate_limit: "⏳ The AI service is temporarily busy. Please wait 1-2 minutes and try again.",
    chk_downloads_title: "📥 Downloads",
    chk_dl_checklist: "Checklist",
    chk_dl_checklist_desc: "Download the extracted checklist as a text file",
    chk_dl_files: "Uploaded Files",
    chk_dl_files_desc: "Original files uploaded with the style guide",
    chk_dl_btn: "⬇️ Download",
    chk_brand_score: "Brand Score",
    chk_before: "Before",
    chk_after: "After",
    chk_guidelines_title: "Company Guidelines",
    chk_cat_tone: "Tone",
    chk_cat_vocab: "Vocabulary",
    chk_cat_format: "Formatting",
    chk_cat_structure: "Structure",
    chk_cat_brand: "Brand Identity",
    chk_cat_compliance: "Regulations",
    chk_cat_content: "Content Rules",

    // History
    nav_history: "📜 History",
    hist_title: "Check History",
    hist_desc: "All previous checks and their results",
    hist_empty: "No Previous Checks",
    hist_empty_desc: "Start by checking content and results will appear here",

    // About Section
    about_title: "What is ComplyKit?",
    about_desc: "The first Saudi platform that dual-checks digital content — brand consistency + compliance with Saudi local regulations. Upload your style guide and AI extracts the rules automatically, checking every piece of content before publishing.",
    about_f1_title: "Dual AI Check",
    about_f1_desc: "Reviews brand consistency + Saudi regulatory compliance simultaneously, giving you a Brand Score + detailed report.",
    about_f2_title: "Ready-to-Publish Version",
    about_f2_desc: "Before/after comparison showing every change and why — a corrected version ready to publish with one click.",
    about_f3_title: "Gets Smarter Over Time",
    about_f3_desc: "Every check builds a stronger database — analysis becomes more accurate and smarter with every use.",
    audience_title: "Who is this for?",
    aud_1_title: "Marketing & Content Teams",
    aud_1_desc: "Ensure every post, ad, and email reflects your company's identity consistently before it goes live.",
    aud_2_title: "Advertising Agencies",
    aud_2_desc: "Managing content for multiple brands? Each has its own rules — ComplyKit ensures consistency for every client.",
    aud_3_title: "Startups",
    aud_3_desc: "Building your brand from scratch? ComplyKit helps you establish your identity from the very first piece of content.",
    aud_4_title: "Any Saudi Organization",
    aud_4_desc: "Publishing digital content and need to comply with local regulations — PDPL, E-Commerce Law, and more.",
    why_title: "Why ComplyKit?",
    why_without: "Without ComplyKit",
    why_without_desc: "Manual review takes hours, mistakes slip through, inconsistent content, and risk of regulatory violations.",
    why_with: "With ComplyKit",
    why_with_desc: "Automatic check in seconds, 100% brand consistency, Saudi regulatory compliance, and a corrected version ready to go.",

    // Footer
    footer_powered: "Powered by AI",
    loading: "Analyzing",
  },
};

// Current language
let currentLang = localStorage.getItem("complykit-lang") || "ar";

function t(key) {
  return translations[currentLang]?.[key] || translations["ar"]?.[key] || key;
}

function applyTranslations() {
  // Update dir and lang
  const html = document.documentElement;
  html.lang = currentLang;
  html.dir = currentLang === "ar" ? "rtl" : "ltr";

  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val.includes("<br")) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  // Update lang toggle button
  document.getElementById("lang-label").textContent = currentLang === "ar" ? "EN" : "عربي";

  // Update gradient direction for RTL/LTR
  document.querySelectorAll(".bg-gradient-to-l").forEach((el) => {
    if (currentLang === "en") {
      el.classList.remove("bg-gradient-to-l");
      el.classList.add("bg-gradient-to-r");
    }
  });
  document.querySelectorAll(".bg-gradient-to-r").forEach((el) => {
    if (currentLang === "ar") {
      el.classList.remove("bg-gradient-to-r");
      el.classList.add("bg-gradient-to-l");
    }
  });
}

function toggleLang() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("complykit-lang", currentLang);
  applyTranslations();
}

// Apply on load
document.addEventListener("DOMContentLoaded", applyTranslations);
