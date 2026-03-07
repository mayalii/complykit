# ComplyKit

Saudi digital content compliance reviewer built on OpenClaw. Users send content via Telegram and get a compliance report + corrected version before publishing. Supports dual-layer compliance: government regulations + custom company policies.

## What It Does

1. User sends content to the Telegram bot (ad copy, blog post, product listing, social post, image, video screenshot, contract, etc.)
2. Optionally: user sends their company's own policies/conditions alongside the content
3. ComplyKit reviews it against **ALL** Saudi digital content regulations + custom policies:

### Core Regulations (3 pillars)
   - **PDPL** (M/19) — personal data exposure, consent language, data subject rights
   - **Anti-Cybercrime Law** (M/17) — defamation, privacy, misinformation, IP violations
   - **E-Commerce Law** (M/126) — seller ID, pricing transparency, consumer rights, ad disclosures

### Media & Content Regulations
   - **Audiovisual Media Law** (M/33) — licensing, content standards, content rating
   - **Media Content Controls** (GCAM 2025) — public decency, national constants, children protection
   - **Digital Content Platform Regulations** (CST/IGNITE) — platform registration, content moderation
   - **Publications & Publishing** — licensing, electronic publications, online media

### Intellectual Property
   - **Copyright Law** (M/41) — reproduction rights, attribution, fair use

### Commercial & Advertising
   - **Advertising Law** — truthful advertising, electronic ad rules, national symbols
   - **Consumer Protection Law** — pricing, promotions, competitions, warranties
   - **Paid Content Disclosure** (Mowthaq) — influencer certification, sponsorship disclosure
   - **Competition Law** (GAC) — comparative claims, market dominance, competitive fairness
   - **Anti-Commercial Fraud Law** — counterfeit products, false origin, fake certifications

### Safety & Protection
   - **Anti-Harassment Law** (M/96) — digital harassment, intimidation, sexually suggestive content
   - **Anti-Digital Fraud Guidelines** (DGA 2025) — phishing, government impersonation, scam content

### Telecommunications
   - **Telecommunications & IT Law** (CST) — service descriptions, data localization, unauthorized services

### Tax & Customs
   - **ZATCA Compliance** — VAT display, tax registration number, pricing transparency

### Sector-Specific
   - **SFDA** (health/food/cosmetics/supplements)
   - **CMA** (investments/securities)
   - **SAMA** (fintech/insurance/banking)
   - **REGA** (real estate/off-plan sales)
   - **MoE/TVTC** (education/training)
   - **MoC** (commercial advertising)

### Custom Policy Scan (NEW)
   - User sends company policies/conditions/checklist alongside content
   - Bot checks content against both government regulations AND custom rules
   - Returns dual compliance score: government % + custom policy X/Y rules

4. Returns a structured compliance report with severity levels (🔴 High / 🟡 Medium / 🟢 Low)
5. Provides compliance scores (government % + custom policy %)
6. Generates a corrected version ready for publication

## Capabilities

- ✅ Text analysis (Arabic & English)
- ✅ Image analysis (vision-enabled — reads text from images directly)
- ✅ Arabic & English reports (language matches content)
- ✅ Corrected version generation with [bracketed] changes
- ✅ Article citations with exact numbers & penalty references
- ✅ 21 regulations + 6 sector-specific checks = comprehensive Saudi compliance
- ✅ Custom company policy/checklist scanning (dual-layer compliance)
- ✅ Compliance percentage scoring

## Project Structure

- `skills/compliance-check/` — Core compliance review workflow (SKILL.md)
- `AGENTS.md` — Project overview and regulatory coverage
- `.env` — Telegram bot token configuration

## Quick Start

```bash
pnpm install
pnpm dev
```

## Telegram Setup

1. Create a bot via @BotFather on Telegram
2. Set token: `TELEGRAM_BOT_TOKEN=your-token` in `.env`
3. Start: `pnpm dev`
4. Send content to the bot for review
