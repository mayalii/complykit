// ============ INTERNATIONALIZATION (i18n) ============
const translations = {
  ar: {
    // Header
    subtitle: "محتوى موحّد — جمهورك يعرفك من أول نظرة",
    nav_dashboard: "📊 لوحة التحكم",
    nav_onboarding: "➕ إضافة شركة",
    nav_check: "✅ فحص المحتوى",

    // Hero
    hero_title: "محتواك يتكلم بصوت واحد،<br/>وجمهورك يعرفك من أول كلمة.",
    hero_desc: "خلّ كل بوست وكل إعلان وكل إيميل يطلع من شركتك بنفس الهوية — أي شخص يشوف محتواك يعرف فوراً إنه لك. ComplyKit يضمن توحيد المحتوى + التوافق مع الأنظمة السعودية قبل النشر.",
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
    onb_desc: "ارفع دليل أسلوب شركتك أو أمثلة من محتواك — الذكاء الاصطناعي يستخلص قواعد هويتك تلقائياً",
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
    chk_desc: "الصق محتواك وبنتأكد إنه يطلع بنفس هوية شركتك ومتوافق مع الأنظمة",
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
    chk_drop_text: "اسحب الملفات هنا أو اضغط للرفع",
    chk_drop_hint: "يدعم: صور، PDF، TXT، Word",
    chk_drop_release: "أفلت الملفات هنا",
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
    about_desc: "منصة تخلّي محتوى شركتك كله يطلع بنفس الصوت والهوية — ما يفرق إذا كتبه فريق التسويق أو المبيعات أو خدمة العملاء، الجمهور يشوف محتواك ويعرف فوراً إنه لك. وفوق كذا، يتأكد إن محتواك متوافق مع الأنظمة السعودية.",
    about_f1_title: "صوت واحد لكل محتواك",
    about_f1_desc: "يفحص كل قطعة محتوى ويتأكد إنها تعكس هوية شركتك — نفس النبرة، نفس المصطلحات، نفس الأسلوب. جمهورك يعرفك بدون ما يشوف اللوقو.",
    about_f2_title: "نسخة مصححة جاهزة",
    about_f2_desc: "يعطيك نسخة معدّلة تطابق هوية شركتك بالضبط — مقارنة قبل/بعد توضح كل تعديل وليش تم.",
    about_f3_title: "يتعلم أسلوبك",
    about_f3_desc: "كل ما استخدمته أكثر، فهم أسلوب شركتك أعمق — يصير يعرف هويتك مثل ما يعرفها فريقك.",
    audience_title: "لمن هذا المنتج؟",
    aud_1_title: "فرق التسويق والمحتوى",
    aud_1_desc: "عندك أكثر من شخص يكتب محتوى؟ ComplyKit يضمن إن الكل يكتب بنفس الصوت — جمهورك يحس إن المحتوى من مصدر واحد.",
    aud_2_title: "الوكالات الإعلانية",
    aud_2_desc: "تدير محتوى عدة شركات؟ كل براند له صوته الخاص — ComplyKit يحافظ على هوية كل عميل بدون ما تتداخل.",
    aud_3_title: "الشركات الناشئة",
    aud_3_desc: "تبني براندك من الصفر؟ ثبّت هويتك من أول محتوى — خلّ جمهورك يتعرف عليك من البداية.",
    aud_4_title: "أي جهة سعودية",
    aud_4_desc: "محتواك يمثّلك قدام الجمهور — ComplyKit يضمن إنه موحّد ومتوافق مع الأنظمة السعودية.",
    why_title: "ليش ComplyKit؟",
    why_without: "بدون ComplyKit",
    why_without_desc: "كل شخص يكتب بطريقته، المحتوى يطلع مختلف كل مرة، وجمهورك ما يقدر يميّز هويتك — ومخاطر مخالفات نظامية فوق كذا.",
    why_with: "مع ComplyKit",
    why_with_desc: "محتوى موحّد بصوت واحد — أي شخص يشوف محتواك يعرف إنه لشركتك. فحص تلقائي بثوانٍ + توافق مع الأنظمة السعودية.",

    // Auth
    auth_login: "دخول الشركة",
    auth_signup: "شركة جديدة",
    auth_company_name: "اسم الشركة",
    auth_company_name_ph: "مثال: أرامكو، STC، نيوم...",
    auth_company_email: "البريد الإلكتروني للشركة",
    auth_password: "كلمة المرور",
    auth_login_btn: "دخول",
    auth_signup_btn: "تسجيل شركة جديدة",
    auth_success: "تم تسجيل الشركة بنجاح! سجّل دخولك الآن",

    // Footer
    footer_powered: "مدعوم بالذكاء الاصطناعي",
    loading: "جاري التحليل",
  },

  en: {
    // Header
    subtitle: "One Brand Voice — Recognized at First Glance",
    nav_dashboard: "📊 Dashboard",
    nav_onboarding: "➕ Onboarding",
    nav_check: "✅ Content Check",

    // Hero
    hero_title: "One Voice for All Your Content.<br/>Your Audience Knows It's You.",
    hero_desc: "Every post, ad, and email from your company speaks with the same identity — anyone who sees your content instantly knows it's yours. ComplyKit ensures unified brand voice + Saudi regulatory compliance before publishing.",
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
    onb_desc: "Upload your brand guidelines or content examples — AI will auto-extract your brand identity rules",
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
    chk_desc: "Paste your content and we'll make sure it matches your brand identity & complies with regulations",
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
    chk_drop_text: "Drag files here or click to upload",
    chk_drop_hint: "Supports: Images, PDF, TXT, Word",
    chk_drop_release: "Drop files here",
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
    about_desc: "A platform that makes all your company's content speak with one unified voice — whether it's written by marketing, sales, or support, your audience sees your content and instantly knows it's yours. Plus, it ensures compliance with Saudi regulations.",
    about_f1_title: "One Voice for All Content",
    about_f1_desc: "Checks every piece of content to ensure it reflects your brand identity — same tone, same terms, same style. Your audience recognizes you without seeing the logo.",
    about_f2_title: "Ready-to-Publish Version",
    about_f2_desc: "Get a corrected version that matches your brand identity exactly — before/after comparison showing every change and why.",
    about_f3_title: "Learns Your Style",
    about_f3_desc: "The more you use it, the deeper it understands your brand voice — it learns your identity just like your own team does.",
    audience_title: "Who is this for?",
    aud_1_title: "Marketing & Content Teams",
    aud_1_desc: "Multiple people writing content? ComplyKit ensures everyone writes with the same voice — your audience feels it all comes from one source.",
    aud_2_title: "Advertising Agencies",
    aud_2_desc: "Managing content for multiple brands? Each brand has its own voice — ComplyKit keeps every client's identity intact without overlap.",
    aud_3_title: "Startups",
    aud_3_desc: "Building your brand from scratch? Lock in your identity from day one — let your audience recognize you from the start.",
    aud_4_title: "Any Saudi Organization",
    aud_4_desc: "Your content represents you to the world — ComplyKit ensures it's unified and compliant with Saudi regulations.",
    why_title: "Why ComplyKit?",
    why_without: "Without ComplyKit",
    why_without_desc: "Everyone writes differently, content looks inconsistent every time, your audience can't recognize your identity — plus risk of regulatory violations.",
    why_with: "With ComplyKit",
    why_with_desc: "Unified content with one voice — anyone who sees your content knows it's your company. Automatic check in seconds + Saudi regulatory compliance.",

    // Auth
    auth_login: "Company Login",
    auth_signup: "New Company",
    auth_company_name: "Company Name",
    auth_company_name_ph: "e.g. Aramco, STC, NEOM...",
    auth_company_email: "Company Email",
    auth_password: "Password",
    auth_login_btn: "Log In",
    auth_signup_btn: "Register Company",
    auth_success: "Company registered successfully! Log in now",

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
