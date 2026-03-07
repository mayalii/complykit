# ComplyKit 🛡️

**Saudi Digital Content Compliance Reviewer** — مراجع الامتثال الرقمي السعودي

ComplyKit reviews digital content against **21+ Saudi regulations** before publishing. Send your content (ads, posts, product listings, contracts) and get an instant compliance report with a corrected version.

Built for **Hackathon Tuwaiq** 🚀

---

## Features

- ✅ Reviews content against Saudi regulations (PDPL, Anti-Cybercrime, E-Commerce, SFDA, CMA, SAMA, and more)
- ✅ Custom company policy scanning (dual-layer compliance)
- ✅ Arabic & English support
- ✅ Image analysis (reads text from images)
- ✅ Compliance scoring with severity levels (🔴 High / 🟡 Medium / 🟢 Low)
- ✅ Auto-corrected version ready for publication
- ✅ Admin dashboard with analytics
- ✅ Dark/Light theme

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the server
node server.mjs
```

Then open: `http://localhost:3000`

## Regulations Covered

| Category | Regulations |
|----------|------------|
| **Core** | PDPL (M/19), Anti-Cybercrime (M/17), E-Commerce (M/126) |
| **Media** | Audiovisual Media (M/33), GCAM 2025, Digital Content Platform |
| **IP** | Copyright Law (M/41) |
| **Commercial** | Advertising Law, Consumer Protection, Mowthaq, Competition Law |
| **Safety** | Anti-Harassment (M/96), Anti-Digital Fraud (DGA 2025) |
| **Sector** | SFDA, CMA, SAMA, REGA, MoE/TVTC, MoC |
| **Tax** | ZATCA Compliance |

## Project Structure

```
├── server.mjs          # Express server + API endpoints
├── public/
│   ├── index.html      # Main SPA
│   ├── app.js          # Application logic
│   ├── i18n.js         # Translations (AR/EN)
│   ├── admin.html      # Admin dashboard
│   └── logo-*.svg      # Brand assets
├── data/
│   ├── checklists.json # Company checklists
│   └── history.json    # Check history
├── skills/
│   └── compliance-check/
│       └── SKILL.md    # AI compliance review prompt
├── .env.example        # Environment template
└── package.json
```

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JS SPA + Tailwind CSS
- **AI**: Google Gemini (via API)
- **Charts**: Chart.js
- **Storage**: JSON file-based

## License

MIT

---

**ComplyKit** — Built with ❤️ for Saudi digital compliance
