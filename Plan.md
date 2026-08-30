# Ascend Trade Commercial Brand-Led Landing Page

## Summary and Source Authority

Build a polished, single-page corporate landing site positioning Ascend Trade Commercial Pvt Ltd as the partner that manages global sourcing, procurement, production, verification, and logistics from requirement to delivery.

- Treat the supplied brand kit as the authority for logo, colors, typography, and visual motifs.
- Use the discussion document only for factual company context, services, industries, and audience.
- Disregard its former website directions, sitemap, CMS, dashboard, uploads, multiple forms, payments, and other superseded requirements.
- Take inspiration from Li & Fung’s bold positioning, content-led structure, end-to-end journey explanation, and logistics-focused motion—without copying its layouts, assets, wording, or animation. [Li & Fung](https://www.lifung.com/) [Website development showcase](https://www.rcksld.com/work/li-fung/)
- Retain the agreed stack: React, TypeScript, Vite, CSS, GSAP, Motion, Python 3.14, FastAPI, and Gmail SMTP.

## Brand and Visual System

- Use the exact brand palette:
  - Blue Whale `#11384F` as the primary corporate color.
  - Pearl Bush `#E6DDCE` as the warm neutral background.
  - Dandelion `#F3C129` only for pathways, active states, and important calls to action.
  - White and near-black only as supporting neutrals.
- Use the supplied full-color logo on Pearl/white, the white logo on Blue Whale, and the approved white variant on Dandelion. Preserve proportions and never recolor or redraw the mark.
- Use Telegraf as the primary family when a licensed webfont is provided. Until then, bundle Inter Tight as the first-draft fallback rather than extracting an embedded PDF font without licensing confirmation.
- Use oversized, left-aligned headings, generous negative space, restrained rounded geometry, thin route lines, and strong editorial grids.
- Carry the logo’s yellow pathway across the site as a recurring route motif connecting sections.
- Combine supplied global-trade photography with SVG routes, masks, map coordinates, container-grid patterns, and subtle image treatments.
- Avoid the previous dark-charcoal/cobalt concept, generic gold luxury styling, stock marketplace grids, product cards with prices, WebGL, and decorative effects unrelated to trade.
- Do not publish unverified figures such as supplier counts, project totals, or claimed market reach, even if they appear in brand mockups.

## Page Narrative and Interaction

1. **Navigation**
   - Reversed logo over the opening Blue Whale hero.
   - Anchors: Capabilities, Process, Industries, Network, Contact.
   - Primary CTA: “Start a sourcing project.”
   - Compact animated mobile menu using Motion.

2. **Hero — “A clearer path through global trade.”**
   - Eyebrow: “India · China · The World.”
   - Supporting copy: “Ascend Trade Commercial connects Indian businesses with verified manufacturers and manages sourcing, production, quality and logistics from requirement to delivery.”
   - CTAs: “Start a sourcing project” and “Explore our process.”
   - Use an aerial container or logistics image from the brand material under a Blue Whale treatment.
   - Animate the yellow pathway through the hero, followed by masked headline and CTA reveals.

3. **Purpose — “Pathway of Opportunity”**
   - Explain that Ascend turns procurement complexity into a managed, transparent process.
   - Use an asymmetric Pearl Bush layout with large typography and a route moving between India, China, and the wider world.

4. **Capabilities**
   - Present four original service pillars:
     - Source — requirement analysis, supplier discovery, and commercial negotiation.
     - Verify — factory qualification, compliance checks, and sample coordination.
     - Manage — product development, production oversight, and quality assurance.
     - Deliver — packaging, documentation, customs, and shipment coordination.
   - Use expanding editorial panels rather than catalogue cards.

5. **Process — “The Ascend Network”**
   - Visual sequence: Requirement → Supplier Discovery → Verification → Production → Quality Inspection → Logistics → Customs → Delivery.
   - Desktop: a controlled sticky section with the yellow pathway progressing as the visitor scrolls.
   - Mobile: a vertical step sequence with no horizontal scrolling or pinning.

6. **Industries**
   - Show representative capability areas rather than individual products:
     - Hospitality and FF&E.
     - Industrial machinery.
     - Solar and renewable energy.
     - Construction and infrastructure.
     - Chemicals and raw materials.
     - Customized manufacturing.
   - Use a photographic editorial rail with concise descriptions and no pricing or product-detail routes.

7. **Global Bridge**
   - Animated SVG network connecting India and China, then extending outward to future markets.
   - Position Ascend as a relationship-led trade bridge without claiming offices or capabilities that have not been verified.

8. **The Ascend Promise**
   - Four principles from the brand identity:
     - Rigorous verification.
     - Clear communication.
     - Built for scale.
     - Long-term relationships.
   - Avoid unsupported guarantees such as zero risk, fixed savings, or universal delivery terms.

9. **Contact**
   - Heading: “Start your pathway to the right supply partner.”
   - Required fields: name, email, and requirement/message.
   - Optional fields: company and phone.
   - Hidden `website` honeypot.
   - Show clear loading, success, retry, and validation states.
   - Add a short privacy notice explaining that submitted details are used to respond to the inquiry.

10. **Footer**
   - Full legal company name and approved logo.
   - Navigation anchors and placeholder contact details.
   - “India · China · The World.”
   - No social, office, registration, or legal information until verified.

### Motion Language

- GSAP and ScrollTrigger own hero sequencing, route drawing, masked text, image reveals, process progression, and global-network animation.
- Motion owns navigation, button feedback, cards, and form-state transitions.
- CSS owns simple hover, focus, and color transitions.
- Never let two animation systems control the same property on the same element.
- Respect `prefers-reduced-motion`; replace scrubbing, parallax, pinning, and route drawing with static completed states.
- Keep all motion purposeful: it should communicate movement, connection, verification, or progression through a supply chain.

## Technical and Email Architecture

- Organize the empty repository into `frontend/` and `backend/`.
- Frontend dependencies: React, TypeScript, Vite, GSAP, `@gsap/react`, Motion, Inter Tight fallback fonts, Vitest, Testing Library, and Playwright.
- Use plain CSS with centralized brand, typography, spacing, motion, and breakpoint tokens.
- Export logo and usable photography from the supplied brand PDF into optimized web assets; use SVG for the mark and route artwork, AVIF/WebP for photography, and retain PNG fallbacks where necessary.
- Backend dependencies: Python 3.14, FastAPI, Pydantic, Pydantic Settings, Uvicorn, email-validator, pytest, and HTTPX.
- Use Python’s `smtplib`, `ssl`, and `EmailMessage`; do not add a database or third-party email package.

### Public Interfaces

- `POST /api/contact`
  - Request: `{ name, email, company?, phone?, message, website? }`
  - `200`: `{ "ok": true, "message": "Thanks—your message has been received." }`
  - `422`: validation errors.
  - `502`: retryable email-delivery failure.
- `GET /api/health`
  - Response: `{ "status": "ok" }`
- Validation:
  - Name: 2–80 characters.
  - Email: valid address, maximum 254 characters.
  - Company: maximum 120 characters.
  - Phone: maximum 30 characters.
  - Message: 10–2,000 characters.
- Gmail configuration remains backend-only:
  - `GMAIL_USERNAME`
  - `GMAIL_APP_PASSWORD`
  - `CONTACT_RECIPIENT`
  - `COMPANY_NAME`
  - `FRONTEND_ORIGIN`
- Send the company notification first, using the visitor’s validated address only as `Reply-To`.
- Send the visitor acknowledgement only after internal delivery succeeds.
- If acknowledgement fails after the inquiry was received, return success and log a non-PII warning.
- If the honeypot is filled, return the normal success response and send no email.
- Keep CORS restricted to the two local Vite origins during the current local-only phase.

## Test Plan and Assumptions

- Validate the layout at 1440px, 1024px, 768px, and 390px, including long headings and form errors.
- Add visual regression coverage for the hero, capabilities, process, global network, contact section, and mobile menu.
- Verify logo variants and WCAG AA contrast across Blue Whale, Pearl Bush, Dandelion, white, and text combinations.
- Test keyboard navigation, focus visibility, `aria-live` form messages, semantic headings, and reduced-motion behavior.
- Confirm that animations clean up after unmount, do not create horizontal overflow, and remain smooth under CPU throttling.
- Mock SMTP in backend tests for success, validation, honeypot, internal failure, confirmation failure, header injection, and secret/PII logging.
- Require passing TypeScript checks, production build, Python 3.14 tests, and Lighthouse preview targets of at least 90 performance and 95 accessibility.
- First-draft imagery may be exported from the client-supplied brand kit; production launch requires confirmation that those images are licensed for web use.
- A standalone SVG logo and licensed Telegraf webfont should replace first-draft exports when supplied.
- Hosting, analytics, CMS, file uploads, CRM, WhatsApp, multilingual support, dashboards, multiple lead types, additional pages, and legal-document creation remain outside this v1 plan.
