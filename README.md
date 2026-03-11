# Vendor Application Management — Eventeny Interview Project

A responsive, accessible organizer-facing front-end experience for reviewing vendor applications, built with **HTML, CSS, and vanilla JavaScript**.

**Live pages:**
- `index.html` Eventeny - Vendor Application Management (list-level review)
- `applicant-profile.html#{n}` — Applicant Profile Page (depth-level review)

---

## Project Overview

This project implements three core UI components from the Eventeny front-end interview task:

1. **Search Input** — debounced, multi-field search with clear button and live results count
2. **Advanced Filter Dropdown** — multi-criteria filtering (application type, status, payment) with desktop dropdown and mobile bottom sheet
3. **Interactive Table** — sortable, selectable rows with bulk actions, pagination, and mobile card layout

### Intentional Improvements
- **Active Filter Chips** — visible, removable indicators of current filter state
- **AI Review Assistant** — prototype AI-assisted review card with summary, strengths, concerns, suggested action, and confidence indicator

### Bonus Deliverable
- **Applicant Profile Page** — detailed deep-review page with application details, AI review, documents, activity timeline, and decision actions

---

## File Structure

```
index.html                   Main management page
applicant-profile.html       Applicant profile page
css/
  variables.css              CSS custom properties (colors, spacing, radii)
  base.css                   Reset, typography, global styles
  layout.css                 Page structure, grids, containers
  components.css             All UI components
  responsive.css             Tablet and mobile breakpoints
js/
  data.js                    Mock application data (shared)
  state.js                   Centralized state object
  utils.js                   Helpers (debounce, formatting, matching, icons)
  app.js                     Main page controller
  applicant-profile.js       Profile page controller
rules.md                     Full product spec
README.md                    This file
```

---

## How to Run

1. Open a terminal in the project directory
2. Start a local server: `python3 -m http.server 8080`
3. Open `http://localhost:8080` in your browser

No build step, no dependencies, no framework.

---

## Responsive Strategy

| Breakpoint | Layout |
|-----------|--------|
| **1440px** (desktop) | Inline toolbar, anchored filter dropdown, semantic table, spacious layout |
| **768px** (tablet) | Wrapped toolbar, horizontally scrollable table, stacked profile |
| **375px** (mobile) | Full-width search, bottom sheet filter, card-based list, single-column profile |

---

| **≤930px** (tablet / narrow desktop) | Table switches to card layout, mobile select-all appears, bulk bar animates |
| **768px** (tablet) | Wrapped toolbar, stacked profile sections, tighter spacing |
| **≤455px** (small mobile) | Full-width search, bottom sheet filter, 2×2 summary chip grid, single-column profile |

## Accessibility

- Semantic HTML throughout (`<table>`, `<thead>`, `<fieldset>`, `<legend>`, `<nav>`)
- Logical heading hierarchy
- `aria-expanded`, `aria-controls`, `aria-label`, `aria-live`, `aria-sort`, `aria-current`
- Visible keyboard focus states via `:focus-visible`
- Escape closes overlays, focus returns to trigger
- Color is never the sole indicator — status text accompanies colored chips
- Screen-reader-only labels (`.sr-only`) where needed

---

## State Management

A single `state` object drives the main page:

```js
{
  searchQuery, filters, sort, selectedRows,
  currentPage, pageSize, isFilterOpen, isLoading
}
```

Data flow: **all data → search → filter → sort → paginate → render**

---

## Testing Strategy

### Functional
- Search accuracy (partial, case-insensitive, multi-field)
- Filter combinations and chip removal
- Sorting (business name asc/desc, date asc/desc)
- Row selection, select-all, bulk actions
- Pagination reset on search/filter change
- Profile page routing and invalid ID fallback

### Accessibility
- Keyboard-only navigation (Tab, Escape, Enter)
- Screen-reader compatibility
- Focus order and visible focus states

### Responsive
- Tested at 1440px, 768px, 375px
- Table ↔ card toggle verified
- Filter dropdown ↔ bottom sheet verified
- Summary chip grid layout verified at ≤455px

---

- Tested at 1440px, 930px, 768px, 455px, 375px
- Table ↔ card toggle verified at 930px breakpoint


## Assumptions & Tradeoffs

| Decision | Rationale |
|----------|-----------|
| Mock data only | Backend integration is out of scope for a take-home |
| AI is a prototype | Uses pre-written mock assessments, presented honestly with a "Prototype" badge |
| Mobile uses cards | Compressed tables at 375px are unusable; cards preserve readability |
| Documents are stubs | File viewing is mocked — real integration would need a backend |
| System + Inter font | Google Fonts Inter for polish, system-ui fallback for reliability |
| Session-scoped status persistence | Decision actions (approve, waitlist, reject) persist across page navigations via `sessionStorage` so organizers see consistent state between list and profile views — but resets on refresh so the demo always starts clean |
| Mobile select-all control | A separate select-all checkbox appears above mobile cards since the desktop table header (which houses select-all) is hidden in card layout |
| 5 items per page default | Matches the spec's `pageSize: 5` for a clear pagination demo; a "Show all" toggle is available for quick full-list scanning |
| "Show all" pagination toggle | Lets organizers view the full list at once when 5-per-page is too restrictive; page size resets when filters or search change |

---

| Bulk bar animations on mobile | Slide-up/down transitions on the bulk action bar give a more app-like feel on touch devices; desktop keeps an instant toggle for speed |
| 2×2 summary chip grid on small mobile | At ≤455px, summary chips switch from horizontal scroll to a 2×2 grid so all metrics stay visible without swiping |
| Table → card breakpoint at 930px | Cards replace the table earlier than the standard 768px tablet breakpoint because table columns become too cramped below ~930px — readability over rigid breakpoint convention |
| Exact match for status search | Status and payment status fields use exact-match search to prevent false positives (e.g., typing "paid" won't match "Not paid") while business name and tags stay partial-match |

---

| Body-appended action dropdown | A single shared dropdown is appended to `<body>` and positioned via JS to avoid overflow clipping from table containers with bounded height |
| Hash-based profile routing | Profile links use `#id` instead of `?id=` for simpler static-hosting compatibility without server-side URL rewrites |
| Vercel deployment config | `vercel.json` enables `cleanUrls` for cleaner URL paths in production hosting |


## Collaboration Plan

| Team | Discussion Topics |
|------|------------------|
| **Design** | Confirm missing interaction states, validate mobile behavior, refine AI card hierarchy |
| **Design** | Validate the 930px table→card breakpoint, review mobile select-all placement, confirm bulk bar animation timing feels natural |
| **Design** | Review AI card color scheme and "Prototype" badge framing relative to the profile; validate activity timeline visual design |
| **Design** | Validate document section layout for future real-file-preview integration; review consistency of five status color schemes across light/dark contexts |
| **Product** | Confirm most valuable filters, validate list-vs-profile workflow, validate AI framing |
| **Product** | Confirm exact-match vs. partial-match search is the right UX for status fields, validate "Show all" pagination as a real organizer need |
| **Product** | Clarify whether "Request more info" should trigger a real workflow (email/notification); define the full lifecycle for Withdrawn applicants |
| **Product** | Confirm whether AI review data should influence summary chip counts; validate whether bulk actions should include "Request more info" |
| **Engineering** | Real API contract, decision action endpoints, document asset integration |
| **Engineering** | Replace `sessionStorage` persistence with real backend state, evaluate hash-based routing implications for analytics and deep linking |
| **Engineering** | Inline SVG icon library → proper icon system at scale; discuss IIFE → ES module migration path if project grows |
| **Engineering** | Real-time data updates would need WebSocket or polling; confirm `performance.getEntriesByType("navigation")` refresh detection vs. server-side session |
| **QA** | Keyboard behavior, responsive regression, empty/loading/error states |
| **QA** | Verify card layout at the 930px breakpoint across devices, validate bulk bar slide animation, test 2×2 summary chip grid at ≤455px |
| **QA** | Test select-all behavior across page boundaries; verify action dropdown positioning at all viewport sizes (scroll + resize edge cases) |
| **QA** | Test profile page with missing optional fields (empty documents, empty activity); confirm fallback state for invalid IDs across browsers |

---

## Research Findings

- Mobile required a fundamentally different presentation pattern (cards vs. table)
- AI insight works better in the deeper profile review context than cluttering the list view
- Active filter chips significantly improve understanding of current interface state
- Separating list-level and profile-level review mirrors real organizer workflows
- Eventeny's existing patterns (clean cards, teal accents, spacious layouts) guided visual decisions
- Table columns become unusable below ~930px — a custom breakpoint proved more effective than following conventional responsive conventions
- Search behavior for status fields needs exact matching to avoid confusing false positives in organizer workflows (e.g., "paid" should not surface "Not paid")
- Mobile card layouts need their own select-all control since the desktop table header disappears — selection UX must be reconsidered per layout mode
- Animated transitions on the bulk action bar provide spatial context for appearing/disappearing UI on touch devices, reducing disorientation
- Summary metrics work better in a 2×2 grid than a horizontal scroll on very small screens — immediate visibility beats compactness
- `sessionStorage` effectively simulates real state persistence across page navigations without backend complexity, while keeping the demo resettable on refresh
- A centralized state object with a linear data pipeline (search → filter → sort → paginate → render) made the main page predictable and easy to reason about
- IIFE scoping gave module-like isolation without needing a build system, keeping the project deployable from static files with zero dependencies
- Debouncing search at 300ms struck the right balance between perceived responsiveness and avoiding excessive re-renders on each keystroke
- An AI "Prototype" badge was critical for setting honest expectations — without it, mock AI data could be mistaken for a real integrated system
- Inline SVG icons kept the project dependency-free while preserving crisp rendering and color control across all interaction states
- The profile page's sticky sidebar keeps decision actions always visible, reducing scroll-to-act friction during deep review
- Five distinct status color schemes with dedicated text + background pairings ensured color alone was never the only status indicator — meeting accessibility requirements
- Keeping sort state persistent across search and filter changes prevented disorientation when organizers refine their current view
- Providing "Clear all" on both active filter chips and the empty state gave users multiple escape hatches from zero-result dead ends
- Overview cards on the profile page serve as a quick decision summary before scrolling into detail, reducing cognitive load in deep review
- A shared `getProcessedData` utility let both the desktop table and mobile cards render from the same processed dataset, avoiding duplicated logic
- A single shared action dropdown appended to `<body>` and repositioned on scroll/resize avoided the need for per-row dropdown instances and overflow-clipping issues

---

Built for the Eventeny Front-End Developer Interview — March 2026
