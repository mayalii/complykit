---
name: compliance-check
description: Review digital content before publication for compliance with ALL Saudi regulations — PDPL (M/19), Anti-Cybercrime (M/17), E-Commerce (M/126), Audiovisual Media (M/33), Media Content Controls (GCAM 2025), Digital Content Platform Regulations (CST/IGNITE), Copyright (M/41), Publications & Publishing, Advertising Law, Consumer Protection, Paid Content Disclosure (Mowthaq), Telecommunications & IT, Competition Law, Anti-Harassment (M/96), Anti-Commercial Fraud, ZATCA VAT Compliance, Anti-Digital Fraud (DGA 2025), and sector-specific (SFDA, CMA, SAMA, REGA, MoC, MoE). Also supports Custom Policy Scan — users can send their company's own conditions/checklist alongside content for dual-layer compliance checking (government + company). Detects violations, ensures required disclosures, validates regulatory alignment, provides compliance scores, and generates a corrected version. Use when a user sends content or a URL.
---

# Compliance Check — Saudi Digital Content Review

## Workflow

### Step 1: Receive and Classify

1. Send immediate acknowledgment
2. Determine content type (ad, post, listing, email, terms, etc.)
3. Determine sector (e-commerce, healthcare, finance, food, media, general)
4. Determine language (Arabic, English, bilingual)

If user sends a URL: browse the page, extract content, then review.

**If user sends an image or screenshot:** You have vision capabilities. Read ALL text directly from the image (Arabic and English). DO NOT ask the user to paste text. Transcribe the visible content yourself, then proceed with the review.

### Step 2: PDPL Scan (Royal Decree M/19)

**Personal Data Exposure — flag immediately:**
- Saudi national ID (10 digits, starts with 1 or 2) → Art. 35: up to 2 years + SAR 3M
- Iqama numbers (10 digits, starts with 2) → Art. 35
- Phone numbers (+966, 05xxxxxxxx) → Art. 35
- Email addresses of identifiable individuals → Art. 15
- Physical addresses with identifiable details → Art. 15
- Saudi IBANs (starts with SA) → Art. 35
- Health info tied to identifiable people → Art. 1 (sensitive data), Art. 35
- Photos/names of real individuals without consent → Art. 5

**Consent & Privacy — check if content collects data:**
- Art. 5: Consent must be clear, unambiguous. Explicit for sensitive data.
- Art. 4: Must mention data subject rights (access, correction, deletion, portability)
- Art. 10: Only collect minimum necessary data (data minimization)
- Art. 11: Data only for stated purpose (purpose limitation)
- Art. 12: Must link to or include a privacy policy
- Art. 29: If data transferred outside KSA, must mention safeguards

**Severity:**
- ❌ 🔴 Exposed personal data (ID, phone, IBAN) → Art. 35 (up to 2 years + SAR 3M)
- ❌ 🔴 Data collection without any consent language → Art. 5 (up to SAR 5M)
- ⚠️ 🟡 Consent present but incomplete (missing rights mention) → Art. 4 (up to SAR 5M)
- ⚠️ 🟢 No privacy policy reference → Art. 12 (best practice)

### Step 3: Anti-Cybercrime Law Scan (Royal Decree M/17)

**Defamation & Privacy:**
- Art. 3(5): Defamation — negative statements about identifiable people/companies. Penalty: 1 year + SAR 500K
- Art. 3(4): Publishing photos/recordings without consent. Penalty: 1 year + SAR 500K
- Art. 5(2): Leaking private data, conversations, personal details. Penalty: 4 years + SAR 3M

**Public Order & Values:**
- Art. 6(1): Content against public order, religious values, public morals, sanctity of private life. Penalty: 5 years + SAR 3M

**Misinformation:**
- Unverified health claims ("cures", "guaranteed results", miracle claims)
- Unverified financial claims (guaranteed returns, risk-free investments)
- Fake statistics or fabricated study references
- Misleading before/after claims

**Intellectual Property:**
- Art. 5(2), 5(3): Unauthorized redistribution of content, website content copying
- Note: IP is primarily under Copyright Law (Royal Decree M/41) but cyber means trigger Anti-Cybercrime Law

**Severity:**
- ❌ 🔴 Defamatory content → Art. 3(5) (up to 1 year + SAR 500K)
- ❌ 🔴 Publishing private info without consent → Art. 3(4), 5(2) (up to 4 years + SAR 3M)
- ❌ 🔴 Content against religious values/public order → Art. 6(1) (up to 5 years + SAR 3M)
- ⚠️ 🟡 Unverified claims, missing attribution → flag with explanation

### Step 4: E-Commerce Law Scan (Royal Decree M/126)

**Only applies to commercial content (ads, product listings, e-commerce pages, marketing emails).**

**Seller Identification (Art. 6):**
- Business name present
- Contact information (phone, email, address)
- Commercial registration number or reference
- Complaint mechanism mentioned

**Pricing (Art. 7, Art. 8):**
- Prices in SAR
- VAT included or clearly indicated (Art. 8)
- No hidden fees
- Shipping costs disclosed (Art. 8)
- No misleading discounts or fake "was" prices (Art. 11)

**Consumer Rights (Art. 13, Art. 14):**
- 7-day return right mentioned for products (Art. 13)
- Exceptions clearly stated if applicable (Art. 14)
- Delivery terms clear (Art. 16: >15 days delay = consumer can cancel)

**Advertising (Art. 10, Art. 11):**
- Sponsored content clearly labeled as advertising (Art. 10)
- Influencer/affiliate content disclosed (Art. 10)
- No false or misleading claims (Art. 11)
- No counterfeit trademarks (Art. 11)
- Marketing emails include unsubscribe mechanism (Art. 10)

**Data Protection (Art. 5):**
- No unauthorized use of consumer data
- No sharing data without consent
- Data retained only as long as needed for transaction

**Severity:**
- ❌ 🟡 Missing seller ID on commercial content → Art. 6 (up to SAR 1M + suspension)
- ❌ 🟡 Deceptive pricing or false claims → Art. 11. Penalty: up to SAR 1M + suspension (Art. 18)
- ❌ 🟡 No return policy for e-commerce products → Art. 13 (up to SAR 1M)
- ⚠️ 🟡 Missing VAT indication → Art. 8 (up to SAR 1M)
- ⚠️ 🟡 No unsubscribe in marketing email → Art. 10 (up to SAR 1M)
- ⚠️ 🟢 Arabic version missing → best practice for Saudi consumers

### Step 5: Audiovisual Media Law Scan (Royal Decree M/33, 1439H)

**Applies to: video content, podcasts, live streams, audio content, any audiovisual media published online.**

**Licensing & Registration:**
- Art. 3: All audiovisual media activities require GCAM license
- Art. 5: Content must align with Islamic Sharia and Saudi media policy
- Art. 7: Foreign audiovisual content needs approval before distribution

**Content Standards:**
- Art. 6: Content must not harm national unity, public order, or public morals
- Art. 6: Must not incite violence, promote terrorism, or encourage discrimination
- Art. 8: Advertising within audiovisual content must comply with advertising regulations
- Art. 9: Must display content rating/classification where applicable

**Severity:**
- ❌ 🔴 Broadcasting without GCAM license → Art. 3 (up to SAR 5M + closure)
- ❌ 🔴 Content against public order/morals/Sharia → Art. 6 (up to SAR 5M + suspension)
- ⚠️ 🟡 Missing content classification/rating → Art. 9 (up to SAR 200K)
- ⚠️ 🟡 Unlicensed advertising within content → Art. 8 (up to SAR 500K)

### Step 5b: Media Content Controls (GCAM Regulations 2025)

**Applies to: ALL published content on social media, websites, blogs, and digital platforms.**

**The General Authority for Media Regulation (GCAM) 2025 Controls:**
- No content that undermines Saudi national constants (sovereignty, religion, national symbols)
- No incitement against the government or the ruling system
- No glorification of destructive groups or entities hostile to the Kingdom
- No false claims, fabricated statistics, or unverified information
- No content harming women's or children's rights
- No content promoting vulgarity or moral degradation
- No display of wealth in a way that promotes materialism or social division
- No filming/photographing children without parental consent
- No content promoting drugs, alcohol, or illegal substances
- No mockery of cultures, religions, or ethnic groups

**Public Decency Standards:**
- Content must respect Saudi cultural values and social norms
- No sexually suggestive content or nudity
- No excessive violence or graphic content
- Language must be respectful — no profanity targeting individuals or groups

**Severity:**
- ❌ 🔴 Content undermining national constants → (up to SAR 500K + platform ban)
- ❌ 🔴 Incitement or glorification of hostile entities → (criminal referral possible)
- ❌ 🟡 Filming children without consent → (up to SAR 100K)
- ⚠️ 🟡 Wealth display / vulgarity → (warning → SAR 100K on repeat)
- ⚠️ 🟡 Unverified claims / false information → (up to SAR 100K)

### Step 5c: Digital Content Platform Regulations (CST/IGNITE)

**Applies to: platforms hosting user-generated content, digital content service providers.**

**Communications, Space & Technology Commission (CST) Requirements:**
- Platforms must register with CST if serving Saudi users
- Must implement content moderation mechanisms
- Must have a complaint handling process for Saudi users
- Must comply with content removal requests from competent authorities
- Must store data of Saudi users per PDPL requirements
- Must provide content in Arabic where targeting Saudi audience
- Must display terms of service clearly

**Severity:**
- ❌ 🔴 Operating unregistered platform serving Saudi users → (suspension + fines)
- ⚠️ 🟡 No content moderation mechanism → (warning → suspension)
- ⚠️ 🟡 No Arabic terms of service → (compliance notice)

### Step 5d: Copyright Law Scan (Royal Decree M/41)

**Applies to: ALL content containing third-party material — text, images, music, video, software, designs.**

**Saudi Authority for Intellectual Property (SAIP) Requirements:**
- Art. 2: Protection covers literary, artistic, and scientific works from moment of creation
- Art. 9: Author has exclusive right to reproduce, translate, distribute, and make available
- Art. 10: Moral rights — attribution and integrity of work must be respected
- Art. 15: Fair use limited to personal use, quotation with attribution, educational purposes
- Art. 22: Protection lasts 50 years after author's death

**Common Violations in Digital Content:**
- Using images/graphics without license or permission
- Copying text/articles without attribution
- Using music/sound effects without license
- Reposting others' content without permission
- Using trademarks or logos without authorization
- Screenshot/screen recording of copyrighted content

**Severity:**
- ❌ 🔴 Reproducing copyrighted work without permission → Art. 22 (up to SAR 250K + confiscation)
- ❌ 🔴 Removing author attribution → Art. 10 (up to SAR 250K)
- ⚠️ 🟡 Missing attribution on quoted material → Art. 15 (up to SAR 50K)
- ⚠️ 🟢 Using stock images without visible license reference → best practice

### Step 5e: Publications & Publishing Regulations

**Applies to: blogs, articles, newsletters, e-books, online publications.**

**Ministry of Media Requirements:**
- Electronic publications need Ministry of Media license
- Publisher must display license number on publication
- Content must not contradict Sharia, public order, or national unity
- Must not publish state secrets or classified information
- Foreign publications distributed in KSA need approval

**Severity:**
- ❌ 🔴 Publishing without license (for commercial publications) → (up to SAR 500K + closure)
- ❌ 🔴 Publishing classified/state information → (criminal referral)
- ⚠️ 🟡 Missing license number display → (warning → SAR 50K)

### Step 5f: Advertising Law & Electronic Advertising Controls

**Applies to: ALL commercial advertising — social media ads, website banners, email marketing, influencer content, Google/Meta ads targeting KSA.**

**General Requirements:**
- Ad must be truthful and not misleading
- Must not exploit emotions, fears, or superstitions
- Must not demean competitors or use comparative advertising unfairly
- Must not use Saudi national symbols (flag, emblem, anthem) commercially without permission
- Must not target children with inappropriate products
- Must include advertiser identity (name or CR number)
- Arabic must be primary language in ads targeting Saudi audience

**Specific Electronic Ad Rules:**
- Pop-up ads must have clear close button
- Email marketing requires prior consent + unsubscribe option
- SMS marketing requires prior consent + sender identification
- Retargeting must comply with PDPL consent requirements

**Severity:**
- ❌ 🟡 Misleading advertising claims → (up to SAR 500K)
- ❌ 🟡 Missing advertiser identity → (up to SAR 300K)
- ❌ 🟡 Unauthorized use of national symbols → (up to SAR 500K + criminal referral)
- ⚠️ 🟡 Ads targeting children inappropriately → (up to SAR 300K)
- ⚠️ 🟡 No Arabic in ads targeting Saudi audience → (compliance notice)

### Step 5g: Consumer Protection Law

**Applies to: content involving product/service promotion, pricing, offers, warranties, competitions.**

**Ministry of Commerce Requirements:**
- Art. 4: Product descriptions must be accurate and complete
- Art. 6: Prices must be displayed clearly in SAR including VAT
- Art. 9: Warranty terms must be clearly stated
- Art. 10: No misleading promotions, fake discounts, or deceptive "was/now" pricing
- Art. 12: Competition/prize draws need Ministry approval + clear terms
- Art. 14: Free trial offers must clearly state post-trial charges
- Art. 15: Bundled offers must show individual and bundle prices

**Severity:**
- ❌ 🟡 False/misleading product descriptions → Art. 4 (up to SAR 1M)
- ❌ 🟡 Fake discounts or deceptive pricing → Art. 10 (up to SAR 1M + closure)
- ❌ 🟡 Unapproved competitions/prizes → Art. 12 (up to SAR 500K)
- ⚠️ 🟡 Hidden post-trial charges → Art. 14 (up to SAR 500K)
- ⚠️ 🟢 Missing warranty terms → Art. 9 (best practice)

### Step 5h: Paid Content Disclosure (Mowthaq / Influencer Regulations)

**Applies to: influencer content, sponsored posts, affiliate marketing, brand partnerships, gifted products.**

**Ministry of Commerce + GCAM Requirements:**
- Influencers must have Mowthaq (موثوق) certification for commercial content
- ALL paid/sponsored content must be clearly labeled as "إعلان" (Ad) or "محتوى مدفوع" (Paid Content)
- Gifted products must be disclosed
- Affiliate links must be disclosed
- Brand ambassador relationships must be disclosed
- Disclosure must be prominent — not hidden in hashtags or end of caption
- Disclosure must be in the same language as the content

**Severity:**
- ❌ 🔴 Commercial content without Mowthaq certification → (up to SAR 500K)
- ❌ 🟡 No ad/sponsored disclosure on paid content → (up to SAR 300K)
- ⚠️ 🟡 Disclosure present but not prominent → (warning → SAR 100K)
- ⚠️ 🟡 Missing affiliate link disclosure → (up to SAR 100K)

### Step 5i: Telecommunications & IT Law

**Applies to: content related to telecom services, apps, digital platforms, IT services.**

**CST Requirements:**
- Apps and digital services must comply with data localization where required
- Must provide user-friendly complaint mechanism
- Service descriptions must be accurate and not misleading
- Must not promote unauthorized telecom services or VPN for illegal purposes
- Content must not interfere with telecom infrastructure

**Severity:**
- ❌ 🔴 Promoting unauthorized telecom services → (up to SAR 5M + criminal referral)
- ⚠️ 🟡 Misleading service descriptions → (up to SAR 1M)
- ⚠️ 🟢 No complaint mechanism → (compliance notice)

### Step 5j: Competition Law

**Applies to: advertising and content involving competitive claims, market comparisons, pricing strategies.**

**General Authority for Competition (GAC) Requirements:**
- No false claims about competitor products/services
- No misleading market dominance claims
- Comparative advertising must be factual and verifiable
- No coordinated pricing claims (collusion indicators)
- No exclusive dealing claims that harm market competition

**Severity:**
- ❌ 🟡 False competitive claims → (up to SAR 10M)
- ❌ 🟡 Misleading market dominance claims → (investigation + fines)
- ⚠️ 🟡 Unverifiable comparative claims → (up to SAR 1M)

### Step 5k: Sector-Specific Checks

**Healthcare / Pharma (SFDA):**
- Health claims need SFDA approval reference
- No "cure" or "guaranteed treatment" without approval
- Medical device ads need SFDA listing number
- Supplements need disclaimer: "هذا المنتج ليس دواءً ولا يغني عن استشارة الطبيب"
- Cosmetic claims must not imply medical benefits
- No before/after images without SFDA-approved clinical evidence

**Finance / Fintech (CMA & SAMA):**
- Investment content needs CMA disclaimer: "هذا ليس توصية استثمارية"
- Financial advice needs licensing reference
- Risk disclosures required: "الاستثمار ينطوي على مخاطر"
- Crowdfunding platforms need CMA authorization reference
- Insurance products need SAMA license reference
- No guaranteed return claims

**Food & Beverage (SFDA):**
- Nutritional claims need SFDA backing
- Halal certification must be accurate and from approved body
- Allergen info required for the 14 major allergens
- No "organic" claim without valid certification
- Home kitchen businesses need Baladi or municipal license

**Real Estate (REGA):**
- Off-plan sales need REGA Wafi registration
- Must display REGA license number
- Must show accurate project details (location, size, delivery date)
- No misleading renders or exaggerated visuals
- Must include developer registration number

**Education (Ministry of Education / TVTC):**
- Educational course ads need accreditation reference if claiming certification
- No misleading job placement guarantees
- Must state actual course duration and requirements

### Step 6: Generate Report

Compile findings using the report format from SOUL.md:
1. Summary with pass/warn/violation per regulation — include 🔴🟡🟢 risk level next to each non-compliant regulation
2. Detailed findings with **specific article citations** — each finding shows severity (✅/⚠️/❌) + risk color (🔴/🟡/🟢)
3. Priority fixes ordered by risk level: 🔴 High first, then 🟡 Medium, then 🟢 Low
4. Corrected version with changes marked in [brackets]

### Step 7: Generate Corrected Version

**Updated Workflow: The report now covers 17 regulations across 14 scan steps.**

Rules:
- Fix all ❌ violations (mandatory) and ⚠️ warnings (recommended)
- Mark changes with [square brackets]: `[Added: SFDA disclaimer]`, `[Removed: exposed phone number — PDPL Art. 35]`
- Preserve original language, tone, and intent
- For Arabic content, correct in Arabic
- Add required disclosures naturally within content flow
- If a claim must be removed, replace with compliant alternative

### Step 5l: Anti-Harassment Law (Royal Decree M/96)

**Applies to: ALL digital content — social media posts, messages, comments, videos, images.**

**Content that constitutes digital harassment:**
- Art. 1: Any content with sexual connotation targeting a specific person (words, gestures, images, videos)
- Art. 1: Includes online harassment via social media, messaging apps, email
- Art. 6: Content that harasses, intimidates, or threatens individuals online
- Applies to content targeting any person regardless of gender

**Severity:**
- ❌ 🔴 Sexually suggestive content targeting an individual → Art. 6 (up to 2 years + SAR 100K)
- ❌ 🔴 Harassment in workplace context published online → Art. 6 (up to 5 years + SAR 300K)
- ⚠️ 🟡 Content that could be perceived as intimidating/threatening → Art. 6 (up to SAR 100K)

### Step 5m: Anti-Commercial Fraud Law

**Applies to: product listings, e-commerce content, product descriptions, promotional material.**

**Ministry of Commerce Requirements:**
- No promotion of counterfeit or imitation products
- Product origin must be accurately stated
- No misleading product composition or ingredient claims
- No tampering with manufacturing/expiry dates in content
- No selling or promoting products with falsified Saudi standards (SASO) marks
- No claiming certifications, awards, or ratings without proof

**Severity:**
- ❌ 🔴 Promoting counterfeit products → (up to 3 years + SAR 1M)
- ❌ 🔴 False origin claims (e.g., "Made in Saudi" when not) → (up to SAR 1M)
- ❌ 🟡 Misleading ingredient/composition claims → (up to SAR 500K)
- ⚠️ 🟡 Unverified certification claims → (up to SAR 300K)

### Step 5n: ZATCA Compliance (VAT & Tax Display)

**Applies to: e-commerce content, product pricing, invoices, commercial ads with prices.**

**Zakat, Tax and Customs Authority Requirements:**
- All prices displayed to consumers must include 15% VAT
- Tax Registration Number (TRN) must be displayed on commercial pages/invoices
- No misleading pricing that hides VAT (showing price without VAT to appear cheaper)
- Commercial registration and VAT number should be visible in e-commerce stores
- Import-related content must reflect accurate customs duties where applicable

**Severity:**
- ❌ 🟡 Prices displayed without VAT → ZATCA regulations (up to SAR 50K per violation)
- ❌ 🟡 Missing TRN on commercial content → (up to SAR 50K)
- ⚠️ 🟡 No VAT registration visible on e-commerce store → (compliance notice → fines)

### Step 5o: Anti-Digital Fraud Guidelines (DGA 2025)

**Applies to: ALL digital content — websites, apps, social media, emails, messages.**

**Digital Government Authority Guidelines:**
- Content must not impersonate government entities, logos, or official communications
- No phishing or social engineering content (fake login pages, fake official forms)
- No content that tricks users into sharing personal/financial data
- No fake government service links or unofficial service portals
- No scam promotions disguised as government programs or subsidies

**Severity:**
- ❌ 🔴 Impersonating government entity → Anti-Cybercrime Art. 4 (up to 3 years + SAR 2M)
- ❌ 🔴 Phishing/social engineering content → (up to 4 years + SAR 3M)
- ❌ 🟡 Fake government program promotions → (up to SAR 1M + criminal referral)

---

### Step 6: Custom Policy Scan (User-Provided Checklist)

**This step ONLY runs if the user provides their own company/organization policies, conditions, or checklist.**

**How it works:**
1. User sends their company's content policy, brand guidelines, or compliance checklist alongside the content
2. The bot extracts each rule/condition from the user's document
3. Each rule is checked against the submitted content
4. Results show: ✅ Compliant / ❌ Non-compliant / ⚠️ Partially compliant for each rule

**Checklist Analysis Format:**
```
📋 Custom Policy Compliance: X/Y rules met (Z%)

✅ Rule 1: [description] — Compliant
❌ Rule 2: [description] — Non-compliant: [explanation + fix]
⚠️ Rule 3: [description] — Partially compliant: [what's missing]
...
```

**Rules for Custom Policy Scan:**
- Treat user-provided rules with same rigor as government regulations
- If a custom rule CONFLICTS with a government regulation, flag both and note the conflict — government regulation takes priority
- Generate corrected version that satisfies BOTH government regulations AND custom policies
- If the user's checklist is vague, ask for clarification on specific rules
- Number each custom rule for easy reference in the report

**Trigger phrases:**
- User sends a document/text labeled as "شروط" / "سياسات" / "قوانين الشركة" / "checklist" / "conditions" / "company policy"
- User says "عندي شروط خاصة" / "أبغى أضيف شروط" / "فحص حسب شروطنا"
- User sends two separate items: content + policy document

---

### Step 7: Generate Report

Compile findings using the report format from SOUL.md:
1. Summary with pass/warn/violation per regulation — include 🔴🟡🟢 risk level next to each non-compliant regulation
2. **Government Compliance Score**: X% compliant with Saudi regulations
3. **Custom Policy Score** (if applicable): X/Y rules met (Z%)
4. Detailed findings with **specific article citations** — each finding shows severity (✅/⚠️/❌) + risk color (🔴/🟡/🟢)
5. Priority fixes ordered by risk level: 🔴 High first, then 🟡 Medium, then 🟢 Low
6. Corrected version with changes marked in [brackets]

### Step 8: Generate Corrected Version

**Updated Workflow: The report now covers 21 regulations across 18 scan steps + custom policy scan.**

Rules:
- Fix all ❌ violations (mandatory) and ⚠️ warnings (recommended)
- Mark changes with [square brackets]: `[Added: SFDA disclaimer]`, `[Removed: exposed phone number — PDPL Art. 35]`
- Preserve original language, tone, and intent
- For Arabic content, correct in Arabic
- Add required disclosures naturally within content flow
- If a claim must be removed, replace with compliant alternative
- If custom policy rules were provided, mark those fixes separately: `[Company Policy: Added required disclaimer per Rule #3]`

### Step 9: Offer Follow-Up

After delivering the report:
- Explain any specific finding in detail (with full article text if requested)
- Review revised versions after user makes changes
- Suggest scheduling periodic content reviews
- Offer to review related content
- Accept updated company policies for future reviews
