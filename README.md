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
| Session-scoped status persistence | Decision actions (approve, waitlist, reject) persist across page navigations via `sessionStorage` so organizers see consistent state between list and profile views — resets on refresh so the demo always starts clean |
| Mobile select-all control | A separate select-all checkbox appears above mobile cards since the desktop table header (which houses select-all) is hidden in card layout |
| 5 items per page default | Matches the spec's `pageSize: 5` for a clear pagination demo; a "Show all" toggle is available for quick full-list scanning |
| "Show all" pagination toggle | Lets organizers view the full list at once when 5-per-page is too restrictive; page size resets when filters or search change |
| Bulk bar animations on mobile | Slide-up/down transitions on the bulk action bar give a more app-like feel on touch devices; desktop keeps an instant toggle for speed |
| 2×2 summary chip grid on small mobile | At ≤455px, summary chips switch from horizontal scroll to a 2×2 grid so all metrics stay visible without swiping |
| Table → card breakpoint at 930px | Cards replace the table earlier than the standard 768px tablet breakpoint because table columns become too cramped below ~930px — readability over rigid breakpoint convention |
| Exact match for status search | Status and payment status fields use exact-match search to prevent false positives (e.g., typing "paid" won't match "Not paid") while business name and tags stay partial-match |
| Body-appended action dropdown | A single shared dropdown is appended to `<body>` and positioned via JS to avoid overflow clipping from table containers with bounded height |
| Hash-based profile routing | Profile links use `#id` instead of `?id=` for simpler static-hosting compatibility without server-side URL rewrites |
| Vercel deployment config | `vercel.json` enables `cleanUrls` for cleaner URL paths in production hosting |
| Results label wording | "X applications submitted" replaces "Showing X" to frame the count as a dataset property rather than a display description — clearer when filters are active |
| Dynamic mobile select-all label | The label updates to "X selected" or "All N selected" as rows are toggled, giving immediate feedback in card layout where selected state is less visually obvious than table row highlighting |
| Indeterminate checkbox sync | Both desktop and mobile select-all checkboxes reflect partial-selection (indeterminate) state, so organizers always have accurate selection awareness regardless of viewport |
| Always-visible filter close button | The filter panel `×` button is shown on all viewports — not just mobile — so organizers always have a clear dismissal target without relying solely on clicking outside the panel |
| "Apply" button in filter panel | An explicit "Apply" button appears in the filter footer when at least one filter is active, giving organizers a clear completion affordance even though filters apply live |
| Enter-key checkbox toggle in filters | Pressing Enter on a focused filter checkbox toggles it, complementing the native Space key behavior and reducing friction for keyboard-heavy workflows |
| Filter panel footer grouping | Reset and Apply actions are grouped in a dedicated footer bar with a top border separator, preventing action buttons from getting visually lost among filter options |
| Filter snapshot/revert model | Opening the filter panel snapshots the current filter state; closing via ×, overlay, or Escape reverts filters to the snapshot, while "Apply" commits changes — gives organizers a safe preview-before-commit workflow |
| Pagination hidden when ≤5 items | The "Show 5 per page" toggle is suppressed when the filtered dataset has 5 or fewer items, since pagination adds no value at that count |
| Chip removal syncs snapshot | Removing an active filter chip while the panel is open also updates the snapshot, so closing the panel won't silently re-apply the removed filter |
| Apply button scoped to open panel | The Apply button only appears when the filter panel is open and at least one filter is active — decoupled from the badge count to avoid showing a commit action when there's nothing to commit |


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
| **Design** | Validate "X applications submitted" label wording as clearer than "Showing X" for organizer mental models when filters are active |
| **Product** | Confirm whether the mobile select-all dynamic label ("X selected" / "All N selected") provides sufficient feedback or if a toast/notification is also needed |
| **QA** | Verify indeterminate checkbox state renders consistently across browsers in both desktop table header and mobile select-all control |
| **Design** | Validate always-visible filter close button and "Apply" button placement across desktop dropdown and mobile bottom sheet viewports |
| **Product** | Confirm whether "Apply" should eventually defer filter changes (batch mode) or remain a close-only affordance alongside live-filtering |
| **Engineering** | Evaluate Enter-key checkbox toggle for cross-browser consistency; plan for potential batch-apply filter mode if product confirms the need |
| **QA** | Test Enter-key checkbox toggle in the filter panel across browsers; verify "Apply" button visibility syncs correctly with the filter badge count |
| **Product** | Confirm whether the filter snapshot/revert model (preview + cancel on close) matches organizer expectations or if a simpler "always live, no revert" approach is preferred |
| **Design** | Validate the filter revert UX — should closing the panel always revert, or should there be a visual diff showing what changed before dismissal? |
| **QA** | Test filter snapshot revert across all close methods (×, overlay, Escape) and verify chip removal stays in sync with snapshot state; confirm no stale filter state after rapid open/close cycles |
| **Engineering** | Evaluate snapshot model performance if filter count grows significantly; consider memoizing processed data during live preview to reduce redundant re-renders |
| **QA** | Verify "Show 5 per page" toggle correctly hides when filtered results are ≤5 and reappears when results exceed 5 after filter changes |

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
- Changing the results label from "Showing X applications" to "X applications submitted" better communicates the scope of filtered results as a dataset property rather than a display description
- Dynamic select-all labels ("Select all" → "X selected" → "All N selected") give immediate visual feedback in mobile card layout where selected state is less visually obvious than highlighted table rows
- Syncing filtered indeterminate checkbox state between desktop and mobile select-all controls ensures organizers always have accurate selection awareness regardless of which viewport they're using
- An always-visible close button on the filter panel reduces user uncertainty about how to dismiss the dropdown — on desktop, clicking outside works but isn't discoverable; a visible `×` makes the escape path explicit
- Adding an explicit "Apply" button alongside live-filtering provides a clear completion signal — users expect a confirmation affordance even when changes are already applied, reducing "did it save?" anxiety
- Grouping Reset and Apply in a dedicated footer with a border separator creates clearer visual hierarchy and prevents action buttons from getting lost among filter checkbox groups
- Enter-key support on filter checkboxes reduces friction for keyboard-heavy organizers who expect Enter to toggle form controls, complementing the native Space key behavior browsers provide by default
- A filter snapshot/revert model (live preview + cancel) gives organizers confidence to explore filter combinations without fear of losing their previous view — closing the panel reverts to the pre-open state, while "Apply" commits changes
- Hiding the "Show 5 per page" toggle when the filtered dataset has ≤5 items avoids presenting a meaningless control — progressive disclosure keeps the interface clean and focused
- Syncing filter chip removal with the open-panel snapshot prevents a jarring UX where a manually removed filter silently reappears when the panel is closed
- Decoupling the Apply button visibility from the filter badge and scoping it to open-panel context reduces visual noise when browsing the filtered table without the panel open

---

Built for the Eventeny Front-End Developer Interview — March 2026
