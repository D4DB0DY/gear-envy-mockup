# Gear Envy — Sharetribe-ready website template

A visual mockup of the Gear Envy pre-launch site: three static screens built
with plain HTML + CSS, designed so the design system ports into Sharetribe's
React + Redux + CSS Modules template with minimal rework.

**Status:** design exploration — not a production build. No backend, no real
waitlist submission, no marketplace functionality.

---

## Files

```
gear-envy-template/
├── index.html               # Screen 1 — Home
├── for-lenders.html         # Screen 2 — For lenders (supply side)
├── waitlist-confirmed.html  # Screen 3 — Waitlist confirmation + referral tiers
├── styles/
│   ├── tokens.css           # Every design token (the porting surface)
│   └── main.css             # Shared component styles, class selectors only
├── js/
│   └── main.js              # Progressive enhancement only (menu, FAQ, copy)
├── README.md                # This file
├── CONTENT.md               # All copy in one place
└── PLACEHOLDERS.md          # Every [PLACEHOLDER] left in the work
```

Open any HTML file directly in a browser — no build step, no server needed.

## Design rationale

**Direction.** Warm, editorial, photography-led. The palette is paper, not
pixels: a cream base (`#f2ecdc`), deep forest ink (`#0e2a22`), and a single
amber accent (`#f3c13a`) reserved for action. It reads closer to a heritage
outdoor journal than a SaaS landing page — deliberately, since the brand has
to feel trustworthy enough to hand over a $4,000 camera body.

**Signature moves.**

- *Italic serif emphasis words* inside headlines ("a **solved** problem")
  carry the voice: confident, a little clever, never corporate.
- *Numbered section markers* (`01 / The insight`) give the page editorial
  rhythm and map naturally to Sharetribe content-page sections.
- *Hairline borders over shadows.* Depth comes from low-opacity ink rules and
  paper layering (paper → paper-2 → paper-3), not drop shadows. One lift
  shadow exists, used only on the referral tier hover.
- *A rotating "Waitlist open · Sydney" sticker* on the hero — the one piece
  of ambient motion, plus a pulsing availability dot. Everything else moves
  only in response to the user, and `prefers-reduced-motion` disables it all.

**Imagery.** All photography is a marked `[IMAGE: ...]` placeholder well —
real commissioned photography (real gear, real Sydney, golden-hour warmth)
replaces the wells in production. No stock was sourced, per the brief.

## Fonts

Both typefaces are SIL Open Font License — free for commercial use,
self-hostable, no per-seat fees.

| Role | Font | Licence | Source |
|---|---|---|---|
| Display / headlines | **Fraunces** (incl. italic, optical size axis) | OFL 1.1 | fonts.google.com/specimen/Fraunces |
| Body / UI | **DM Sans** | OFL 1.1 | fonts.google.com/specimen/DM+Sans |
| Mono (eyebrows, step numbers, data) | **Space Mono** | OFL 1.1 | fonts.google.com/specimen/Space+Mono |

The mockup loads them from Google Fonts for convenience. For production,
self-host the woff2 files inside the Sharetribe app (better performance, no
third-party dependency) and update `--fontFamily` / `--ge-font-display` /
`--ge-font-mono` in `tokens.css` accordingly.

## What ports vs what doesn't (statement required by brief §3)

- **Ports directly:** the entire token layer — colour system, type scale,
  spacing rhythm, breakpoint behaviour. `tokens.css` is written to drop into
  `src/styles/marketplaceDefaults.css`: Sharetribe slot names
  (`--marketplaceColor`, `--marketplaceColorDark`, `--marketplaceColorLight`,
  `--colorSuccess`, `--colorFail`, `--fontFamily`) are used wherever a
  concept maps, and Gear Envy–only tokens are prefixed `--ge-`.
- **Ports with light rework:** the marketing layouts — hero, insight/stats
  band, 3-step "how it works" columns, showcase tiles, FAQ accordion, CTA
  bands, footer. These map to Sharetribe's configurable content pages; the
  class-per-element CSS translates into CSS Modules classes one for one
  (that is why there are no element selectors).
- **Does not port (and was not attempted):** any marketplace-specific
  component — listing cards, search filters, booking panels, checkout,
  messaging. Those have fixed structure in the Sharetribe template and are
  restyled, not redesigned.

**Spacing & breakpoints.** Mobile-first. All margins, paddings and component
heights sit on a 6px baseline below 768px and an 8px baseline from 768px up,
achieved by redefining the `--ge-space-*` tokens at the medium breakpoint —
spacing transfers without re-derivation. Only two breakpoints exist anywhere:
768px (`--viewportMedium`) and 1024px (`--viewportLarge`). Plain CSS cannot
reference custom properties in `@media`, so the raw values appear in media
queries only; in the Sharetribe build these become `@media (--viewportMedium)`
/ `(--viewportLarge)` custom media. This is the single documented exception
to "no px outside tokens.css". (`--ge-radius-pill: 999px` is the other
conventional exception.)

**JavaScript.** `js/main.js` is progressive enhancement only: mobile menu,
FAQ accordion, referral-link copy. Pages render and read fully without it
(`ge-no-js` fallback shows FAQ answers). In Sharetribe these become small
React hooks; nothing here is a dependency.

## Sharetribe integration notes

1. **Tokens:** copy the `:root` block of `styles/tokens.css` into
   `src/styles/marketplaceDefaults.css` (and the 768px `:root` override into
   the matching media block). Sharetribe's own variable names already match.
2. **Fonts:** self-host Fraunces, DM Sans and Space Mono; register them in
   the template's font loading and update `--fontFamily`.
3. **Content pages:** rebuild each screen as a Sharetribe content page (or
   via Console page editor where available), converting `.ge-*` classes to
   CSS Module classes per component. The HTML structure is flat and
   section-based to make this mechanical.
4. **Forms:** the waitlist forms are visual only (`action` points between the
   mockup pages). Wire them to your actual waitlist backend or email tool —
   none is included, per scope.
5. **Placeholders:** before any public release, resolve every marker in
   `PLACEHOLDERS.md` — legal wording, fees, deposits, cancellation terms,
   statistics and all photography.

## Accessibility

WCAG 2.1 AA was a design input, not an afterthought: ink-on-paper and
paper-on-ink pairs exceed 7:1, muted text pairs stay above 4.5:1, amber is
never used for body text on light backgrounds (ink text sits on amber fills),
focus states are visible 2px outlines on both palettes, headings are
hierarchical, placeholders carry `role="img"` + `aria-label`, and the
accordion/menu expose `aria-expanded` / `aria-controls`.
