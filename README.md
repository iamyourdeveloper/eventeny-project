# Vendor Application Management — Eventeny Interview Project

A responsive, accessible organizer-facing front-end experience for reviewing vendor applications, built with **HTML, CSS, and vanilla JavaScript**.

**Live pages:**
- `index.html` Eventeny - Vendor Application Management (list-level review)
- `applicant-profile.html?id={n}` — Applicant Profile Page (depth-level review)

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

---

## Assumptions & Tradeoffs

| Decision | Rationale |
|----------|-----------|
| Mock data only | Backend integration is out of scope for a take-home |
| AI is a prototype | Uses pre-written mock assessments, presented honestly with "Prototype" badge |
| Mobile uses cards | Compressed tables at 375px are unusable; cards preserve readability |
| Session-scoped status persistence | Decision actions (approve, waitlist, reject) persist across page navigations via `sessionStorage` so organizers see consistent state between list and profile views — but reset on refresh so the demo always starts clean |
| Documents are stubs | File viewing is mocked — real integration would need backend |
| 5 items per page default | Matches the spec's `pageSize: 5` for a clear pagination demo; a "Show all" toggle is available for quick full-list scanning |
| "Show all" pagination toggle | Lets organizers view the full list at once when 5-per-page is too restrictive; page size resets when filters or search change |
| System + Inter font | Google Fonts Inter for polish, system-ui fallback for reliability |

---

| Body-appended action dropdown | A single shared dropdown is appended to `<body>` and positioned via JS to avoid overflow clipping from table containers with bounded height |
| Hash-based profile routing | Profile links use `#id` instead of `?id=` for simpler static-hosting compatibility and to avoid server-side URL rewrite configuration |
| Vercel deployment config | `vercel.json` enables `cleanUrls` for cleaner URL paths in production hosting |

---

## Collaboration Plan

| Team | Discussion Topics |
|------|------------------|
| **Design** | Confirm missing interaction states, validate mobile behavior, refine AI card hierarchy |
| **Product** | Confirm most valuable filters, validate list-vs-profile workflow, validate AI framing |
| **Engineering** | Real API contract, decision action endpoints, document asset integration |
| **QA** | Keyboard behavior, responsive regression, empty/loading/error states |

---

## Research Findings

- Mobile required a fundamentally different presentation pattern (cards vs. table)
- AI insight works better in the deeper profile review context than cluttering the list view
- Active filter chips significantly improve understanding of current interface state
- Separating list-level and profile-level review mirrors real organizer workflows
- Eventeny's existing patterns (clean cards, teal accents, spacious layouts) guided visual decisions

---

Built for the Eventeny Front-End Developer Interview — March 2026
