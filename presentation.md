# Vendor Application Management — Presentation

**Eventeny Front-End Developer Interview**
**March 2026**

---

## Objective

**Build a polished, responsive organizer-facing front-end experience for reviewing vendor applications — one that feels like a realistic Eventeny workflow, not just a static UI implementation.**

This project translates three Figma UI components — a search input, an advanced filter dropdown, and an interactive table — into a cohesive Vendor Application Management page. It goes beyond component assembly by framing the entire experience around a real organizer workflow: scanning many applications quickly at the list level, then diving into a single applicant for deeper evaluation.

### Resulting Impact

- Organizers can **search, filter, sort, and act** on vendor submissions from a single responsive page
- A dedicated **Applicant Profile Page** provides a natural depth-review extension without cluttering the list view
- An **AI Review Assistant** prototype demonstrates how machine intelligence could reduce decision friction in a high-volume review workflow
- The implementation is **responsive across 1440px, 768px, and 375px**, accessible by keyboard and screen reader, and runs with **zero dependencies** — no framework, no build step, no backend

---

## Research Tactics & Findings

### How I Evaluated Usability

1. **Organizer workflow-first thinking** — before writing code, I mapped the two levels of review an organizer needs: breadth (list-level scanning) and depth (applicant-level evaluation). This shaped the two-page architecture.
2. **Eventeny product study** — I studied Eventeny's existing platform (eventeny.com) to align visual patterns: clean white card surfaces, teal brand accents, spacious SaaS-style layouts, rounded corners, and subtle shadows.
3. **Responsive behavior audit** — I tested how each component would behave at each breakpoint, finding that the desktop table pattern breaks down well before 768px. This led to a custom 930px card-switch breakpoint.
4. **Interaction state mapping** — for every component, I identified what the Figma designs showed (default, hover, focus) and what they didn't (empty state, loading state, error state, keyboard interactions). Where Figma was silent, I documented my assumptions.

### Key Findings

| Finding | Impact on Implementation |
|---------|-------------------------|
| Mobile required a fundamentally different presentation pattern | Table rows → stacked application cards below 930px |
| AI insight works better in a deeper review context | AI Review Assistant lives on the profile page; the list view shows only a subtle "AI" cue |
| Active filter chips significantly improve state awareness | Added as an intentional improvement — removable chips below the toolbar |
| Table columns become unusable below ~930px | Custom breakpoint at 930px instead of the conventional 768px |
| Status search needs exact matching | "paid" should not surface "Not paid" — partial matching applies to names and tags only |
| Mobile card layouts need their own select-all control | Desktop table header disappears in card layout; a separate mobile select-all was required |
| Debouncing at 300ms balances responsiveness and performance | Fast enough to feel live, slow enough to avoid excessive re-renders |
| `sessionStorage` effectively simulates state persistence | Decision actions persist across page navigations without backend complexity; resets on refresh for a clean demo |
| A linear data pipeline keeps the page predictable | Search → Filter → Sort → Paginate → Render — easy to reason about and explain |

### Tradeoffs Identified During Implementation

| Decision | Rationale |
|----------|-----------|
| Mock data only | Backend integration is out of scope for a take-home |
| AI is a prototype | Uses pre-written mock assessments; honestly presented with a "Prototype" badge |
| Mobile uses cards instead of compressed tables | Tables at 375px are unusable — cards preserve readability and tap targets |
| Documents are stubs | File viewing is mocked; real integration would require a backend |
| IIFE scoping instead of ES modules | Module-like isolation without a build system; keeps the project deployable from static files |
| Hash-based profile routing | `#id` instead of `?id=` for simpler static-hosting compatibility without server-side URL rewrites |
| Filter snapshot/revert model | Organizers can preview filter combinations without fear of losing their current view — closing the panel reverts; "Apply" commits |
| Body-appended action dropdown | A single shared dropdown positioned via JS avoids overflow clipping from table containers |

---

## Code Structure Review

### Folder Structure

```
index.html                   Main management page
applicant-profile.html       Applicant profile page (bonus)
css/
  variables.css              CSS custom properties (colors, spacing, radii, typography)
  base.css                   Reset, typography, global styles
  layout.css                 Page structure, grids, containers
  components.css             All UI components (table, cards, chips, filters, AI card)
  responsive.css             Tablet and mobile breakpoints
js/
  data.js                    Mock application data — shared across both pages
  state.js                   Centralized state object for the main page
  utils.js                   Pure helpers (debounce, formatting, matching, sorting, icons)
  app.js                     Main page controller — all rendering and event handling
  applicant-profile.js       Profile page controller — routing, rendering, decision actions
rules.md                     Full product spec and implementation rules
README.md                    Project documentation
```

### Component Hierarchy

**Main Page (`app.js`)**
- Summary metric chips
- Toolbar: Search input + Filter trigger
- Filter panel (desktop dropdown / mobile bottom sheet)
- Active filter chips
- Results count (`aria-live`)
- Data card
  - Loading skeleton
  - Desktop table (semantic `<table>`)
  - Mobile cards
  - Empty state
- Bulk action bar
- Pagination

**Profile Page (`applicant-profile.js`)**
- Back link
- Applicant header (avatar, name, meta)
- Overview cards (4-card grid)
- Application details (2-column detail grid)
- AI Review Assistant card
- Documents list
- Activity timeline
- Decision sidebar (sticky on desktop)
- Invalid applicant fallback state

### State Management

A single `state` object drives the entire main page. Every user interaction mutates state and calls `render()`, which re-derives the view from scratch:

```js
const state = {
  searchQuery: "",
  filters: { applicationType, status[], paymentStatus[] },
  sort: { key, direction },
  selectedRows: new Set(),
  currentPage: 1,
  pageSize: 5,
  isFilterOpen: false,
  isLoading: true
};
```

**Data flow pipeline:**

```
all applications → search → filter → sort → paginate → render
```

This linear pipeline makes the page predictable, debuggable, and easy to explain. Every render is a pure function of the current state — no hidden side effects, no stale closures.

The profile page reads the applicant ID from the URL hash, finds the matching record in the shared `data.js` array, and renders the full profile or a fallback state. Decision actions mutate the shared data and persist to `sessionStorage`.

### Styling Approach

- **CSS custom properties** (`variables.css`) — a single source of truth for colors, spacing, radii, shadows, and typography
- **Layered CSS files** — variables → base → layout → components → responsive — loaded in dependency order
- **No utility-class framework** — each component has purpose-built styles, keeping the CSS readable and maintainable
- **Five status color schemes** — each status (Approved, Awaiting, Waitlisted, Rejected, Withdrawn) has dedicated `--color-{status}-bg` and `--color-{status}-text` variables with sufficient contrast
- **Responsive breakpoints** — `1440px` (desktop), `930px` (table→card), `768px` (tablet), `455px` (small mobile), `375px` (mobile)

---

## Accessibility Strategy

### Semantic HTML

- `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` for the data table
- `<fieldset>` and `<legend>` for filter groups
- `<nav>` with `aria-label` for pagination
- `<section>` with clear headings for profile page regions
- `<h1>` → `<h3>` logical heading hierarchy throughout

### ARIA Roles and Attributes

| Attribute | Where Used | Purpose |
|-----------|-----------|---------|
| `aria-expanded` | Filter trigger button | Communicates dropdown open/closed state |
| `aria-controls` | Filter trigger → filter panel | Links trigger to the panel it controls |
| `aria-label` | Search input, clear button, filter panel, table, pagination, checkboxes, action buttons | Descriptive labels for screen readers |
| `aria-live="polite"` | Results count | Announces filtered count changes without interrupting |
| `aria-sort` | Sort buttons (business name, date) | Communicates current sort direction |
| `aria-current="page"` | Active pagination button | Identifies the current page |
| `role="grid"` | Application table | Communicates interactive table semantics |
| `role="dialog"` | Filter panel | Identifies the filter panel as a dialog |

### Keyboard Interaction Patterns

| Key | Context | Behavior |
|-----|---------|----------|
| `Tab` | Everywhere | Standard focus traversal through all interactive elements |
| `Escape` | Filter panel open | Closes filter panel, returns focus to trigger |
| `Escape` | Action dropdown open | Closes action dropdown |
| `Enter` | Filter checkbox focused | Toggles checkbox (complements native Space key) |
| `Space` | Filter checkbox focused | Native browser toggle behavior |
| Focus traversal | Bulk action bar | All bulk action buttons are keyboard accessible |

### Focus Management

- Closing the filter panel via Escape returns focus to the filter trigger button
- Search clear button returns focus to the search input
- Filter panel close (`×`) is always visible — not hidden behind "click outside" discoverability
- Visible `:focus-visible` outlines on all interactive elements using `--color-focus` (teal ring)

### Color Contrast Considerations

- **Color is never the sole indicator** — every status chip includes text alongside its background color
- Five status color schemes were chosen with dedicated text/background pairings that maintain readable contrast:
  - Approved: `#1d6b46` on `#dff3e8`
  - Awaiting: `#8a6a11` on `#fdf3d6`
  - Waitlisted: `#3a5ea8` on `#e8eefb`
  - Rejected: `#9a3040` on `#f9dde1`
  - Withdrawn: `#555555` on `#ececec`
- Payment status uses text differentiation ("Paid" vs "Not paid") with supporting color
- Screen-reader-only labels (`.sr-only`) provide context where visual labels would be redundant

---

## Testing Strategy

### Functional Testing

| Area | What to Verify |
|------|----------------|
| **Search** | Partial matching on business name, applicant name, tags; exact matching on status and payment status; case-insensitive; debounced at 300ms; clears correctly |
| **Filters** | Application type dropdown, status checkboxes, payment checkboxes; combinations work with search; chip removal syncs state; "Clear all" resets everything |
| **Filter snapshot model** | Opening the panel snapshots state; closing reverts; "Apply" commits; chip removal while open syncs the snapshot |
| **Sorting** | Business name (A→Z, Z→A), Date (newest, oldest); persists through search/filter changes; sort icons update correctly |
| **Row selection** | Individual row select/deselect; select-all on current page; indeterminate state; bulk bar count accuracy; deselect all |
| **Bulk actions** | Approve, Waitlist, Reject — update status on selected rows; clear selection after action |
| **Pagination** | Page navigation; page reset on search/filter change; "Show all" toggle; "Show 5 per page" toggle; hidden when ≤5 results |
| **Profile page** | Hash-based routing; correct applicant rendering; invalid ID fallback; decision actions update status; back link returns to list |
| **AI Review Assistant** | Summary, strengths, concerns, suggested action, confidence render correctly; "Prototype" badge visible |

### Accessibility Testing

| Test | Method |
|------|--------|
| Keyboard-only navigation | Tab through all interactive elements without mouse |
| Escape close behavior | Filter panel, action dropdown — focus returns to trigger |
| Screen-reader labels | VoiceOver / NVDA audit of all ARIA attributes |
| Focus order | Logical top-to-bottom, left-to-right traversal |
| Visible focus states | `:focus-visible` ring visible on every interactive element |
| Status readability | Status meaning is conveyed through text, not only color |

### Responsive Testing

| Breakpoint | Key Verifications |
|------------|-------------------|
| **1440px** | Inline toolbar, anchored filter dropdown, full semantic table, spacious layout |
| **930px** | Table → card layout switch, mobile select-all appears, bulk bar animations |
| **768px** | Toolbar wraps, profile page stacks, table scrolls horizontally if visible |
| **455px** | 2×2 summary chip grid, full-width search, tighter spacing |
| **375px** | Bottom sheet filter, card-based list, single-column profile, sticky decision actions |

### Edge Case Testing

| Scenario | Expected Behavior |
|----------|-------------------|
| Zero search results | Empty state with "Reset filters" action |
| Long business names | Truncated with ellipsis; full text visible on profile page |
| Missing tags | Row/card renders cleanly without tag section |
| Page exceeds total after filter | Current page auto-corrects to last valid page |
| Rapid open/close of filter panel | No stale snapshot state; filter values remain consistent |
| Invalid profile ID | Fallback state: "Applicant not found" with link back to list |
| Withdrawn vendor actions | Decision buttons still functional for re-evaluation |

---

## Collaboration Plan

### Design

| Topic | Discussion |
|-------|-----------|
| Missing interaction states | Confirm hover, active, disabled states not shown in Figma — document where I used judgment |
| Mobile behavior validation | Validate 930px card breakpoint, bottom sheet filter, bulk bar slide animation timing |
| AI card hierarchy | Review AI Review Assistant card color scheme and "Prototype" badge relative to the profile page |
| Filter revert UX | Should closing the panel always revert, or should there be a visual diff showing changes before dismissal? |
| Results label wording | Validate "X applications submitted" as clearer than "Showing X" for organizer mental models |

### Product

| Topic | Discussion |
|-------|-----------|
| Filter priority | Confirm the most valuable filter categories for real organizer workflows |
| List vs. profile workflow | Validate the two-level review pattern as matching real organizer behavior |
| AI framing | Confirm "Prototype" badge messaging; validate that AI as decision support (not replacement) is the right frame |
| Snapshot/revert model | Does preview-then-commit match organizer expectations, or is "always live, no revert" preferred? |
| "Request more info" lifecycle | Should this trigger a real workflow (email/notification) or remain an action placeholder? |

### Engineering

| Topic | Discussion |
|-------|-----------|
| API contract | Define real field mapping and endpoints for application data, decision actions, and document assets |
| State persistence | Replace `sessionStorage` with real backend state; discuss real-time update needs (WebSocket vs polling) |
| Routing | Evaluate hash-based routing implications for analytics and deep linking; migrate to proper router if SPA needed |
| Scaling | IIFE → ES module migration path; inline SVG icons → proper icon system; consider build tooling if project grows |

### QA

| Topic | Discussion |
|-------|-----------|
| Keyboard validation | Full keyboard-only walkthrough across all features and viewports |
| Responsive regression | Test card layout at 930px across real devices; validate bulk bar animation; test 2×2 chip grid at ≤455px |
| Filter snapshot testing | Test revert across all close methods (×, overlay, Escape); verify chip removal syncs with snapshot; confirm no stale state after rapid open/close |
| Cross-browser | Verify indeterminate checkbox rendering, Enter-key toggle, and focus-visible behavior across Chrome, Firefox, Safari |
| Profile edge cases | Test with missing optional fields (empty documents, empty activity); confirm fallback for invalid IDs across browsers |

---

## Intentional Functionality

### Improvement 1: Active Filter Chips

**What it does:** When any filter is active, removable chips appear below the toolbar showing the current filter state. A "Clear all" button resets everything.

**Why I chose this:**
- Filters are hidden inside a dropdown — once closed, organizers lose visibility into what's currently filtering their view
- Active chips provide **persistent, glanceable feedback** about the current filter state
- Each chip is individually removable, giving organizers a fast way to refine without reopening the panel
- This is a pattern used extensively in production SaaS tools (Notion, Linear, Figma) because it directly addresses the "what am I looking at?" question
- The "Clear all" action provides an escape hatch from complex filter combinations — especially important when a filtered view returns zero results

### Improvement 2: AI Review Assistant

**What it does:** A prototype AI-assisted review card that surfaces a summary, strengths, concerns, suggested action, and confidence level for each applicant. Lives primarily on the Applicant Profile Page with a subtle "AI" cue in the list view.

**Why I chose this:**
- In a high-volume review workflow, organizers spend significant time reading through application details to form a judgment
- AI reduces cognitive load by **pre-surfacing the most relevant signals** — strengths, concerns, and a suggested next action
- Placed on the profile page (not the list) because AI insight is most valuable during deep review, not quick scanning
- Presented honestly as a "Prototype" with mock data — building trust with the user by not pretending it's a production AI system
- The confidence indicator (High / Moderate / Low) gives organizers a calibrated sense of how much to weight the AI's assessment

---

## Bonus: Applicant Profile Page

### What I Built

A dedicated **Applicant Profile Page** (`applicant-profile.html`) that serves as the natural depth-review extension of the list workflow. Clicking a business name or "View" action navigates to the profile via hash-based routing (`#id`).

### Page Sections

| Section | Purpose |
|---------|---------|
| **Applicant header** | Avatar, business name, applicant name, tags, application type, payment status, current status, submission date — full identity at a glance |
| **Overview cards** | 4-card grid: Application Type, Payment Status, Application Status, AI Suggested Action — quick decision summary before scrolling into detail |
| **Application details** | 2-column grid: Business Name, Applicant Name, Email, Phone, Booth Preference, Submitted date, Description, Notes |
| **AI Review Assistant** | Full AI card with summary, strengths, concerns, suggested action, and confidence — the primary value-add for deep review |
| **Documents** | File list with icon, name, type, and mock "View" action — represents submission assets an organizer would review |
| **Activity timeline** | Chronological timeline: submitted → payment → AI review → manual review — gives context for where the application is in its lifecycle |
| **Decision sidebar** | Sticky sidebar with Approve, Waitlist, Reject, Request more info — always visible during deep review, reducing scroll-to-act friction |
| **Invalid applicant fallback** | "Applicant not found" with explanation and link back to the management page — handles bad URLs gracefully |

### Why This Stands Out

- **Two-level review architecture** — list for breadth, profile for depth — mirrors how real organizers actually work
- **Session-persisted decisions** — approving, waitlisting, or rejecting on the profile page persists back to the list view via `sessionStorage`, so the organizer sees consistent state across both pages
- **Responsive profile** — multi-column on desktop, stacked single-column on mobile, with decision actions always accessible
- **Graceful fallback** — invalid or missing applicant IDs show a clear error state instead of a broken page

---

## Technical Highlights

| Aspect | Implementation |
|--------|---------------|
| **Zero dependencies** | HTML, CSS, vanilla JavaScript — no framework, no build step, no npm |
| **Modular CSS architecture** | 5 layered stylesheets loaded in dependency order; CSS custom properties for theming |
| **Centralized state** | Single `state` object with a linear data pipeline — predictable, debuggable, explainable |
| **IIFE isolation** | Each page controller runs in an IIFE for module-like scoping without a bundler |
| **Shared utilities** | `utils.js` provides pure functions (debounce, sort, search, filter, paginate) reused across both pages |
| **Shared data** | `data.js` is the single source of mock records, consumed by both pages |
| **Inline SVG icons** | Dependency-free, crisp at all sizes, color-controllable via CSS |
| **Skeleton loading** | Animated skeleton rows simulate realistic loading (~700ms) |
| **Body-appended dropdown** | Single shared action dropdown positioned via JS — avoids overflow clipping in bounded containers |

---

## Summary

This project demonstrates:

1. **Strong front-end fundamentals** — semantic HTML, modular CSS, predictable state management, zero dependencies
2. **Thoughtful product design judgment** — organizer-first workflow, two-level review architecture, intentional feature additions with clear reasoning
3. **Accessible interaction design** — ARIA attributes, keyboard navigation, focus management, color-plus-text status indicators
4. **Responsive implementation** — five breakpoints, table-to-card adaptation, bottom sheet filter, mobile-specific controls
5. **Meaningful feature extension** — active filter chips, AI Review Assistant, and a full Applicant Profile Page with decision persistence
6. **A realistic Eventeny-aligned workflow** — not just three isolated components, but a cohesive organizer experience that could scale into a real product

---

Built for the Eventeny Front-End Developer Interview — March 2026
