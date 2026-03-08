# Eventeny Interview Project — Full Product Spec & Implementation Rules

**Company:** Eventeny  
**Website:** https://www.eventeny.com/  
**Project Name:** Vendor Application Management + Applicant Profile Experience  
**Project Type:** Front-end interview project / take-home assignment  
**Tech Stack:** HTML, CSS, Vanilla JavaScript

---

## Table of Contents

- [1. Project Objective](#1-project-objective)
- [2. Product Framing](#2-product-framing)
- [3. Full Deliverables](#3-full-deliverables)
- [4. Project Rules](#4-project-rules)
- [5. Design Direction](#5-design-direction)
- [6. Core UX Goals](#6-core-ux-goals)
- [7. Information Architecture](#7-information-architecture)
- [8. Main Experience: Vendor Application Management](#8-main-experience-vendor-application-management)
- [9. Required Component 1: Search Input](#9-required-component-1-search-input)
- [10. Required Component 2: Advanced Filter Dropdown](#10-required-component-2-advanced-filter-dropdown)
- [11. Required Component 3: Interactive Table](#11-required-component-3-interactive-table)
- [12. Intentional Functionality Improvements](#12-intentional-functionality-improvements)
- [13. AI Feature Spec: AI Review Assistant](#13-ai-feature-spec-ai-review-assistant)
- [14. Bonus Deliverable: Applicant Profile Page](#14-bonus-deliverable-applicant-profile-page)
- [15. Responsive Strategy](#15-responsive-strategy)
- [16. Accessibility Requirements](#16-accessibility-requirements)
- [17. Data Model](#17-data-model)
- [18. State Management](#18-state-management)
- [19. File Structure](#19-file-structure)
- [20. Interaction Rules](#20-interaction-rules)
- [21. Loading, Empty, Error, and Edge States](#21-loading-empty-error-and-edge-states)
- [22. Testing Strategy](#22-testing-strategy)
- [23. Research Tactics and Findings](#23-research-tactics-and-findings)
- [24. Code Structure Review Guidance](#24-code-structure-review-guidance)
- [25. Collaboration Plan](#25-collaboration-plan)
- [26. Assumptions and Tradeoffs](#26-assumptions-and-tradeoffs)
- [27. Phase-by-Phase Build Plan](#27-phase-by-phase-build-plan)
- [28. Final Success Criteria](#28-final-success-criteria)
- [29. Code Snippets and Project Reference Blocks](#29-code-snippets-and-project-reference-blocks)

---

# 1. Project Objective

Build a polished, responsive organizer-facing front-end experience for reviewing vendor applications.

This project must implement the three required UI components from the interview task:

- [ ] Search input
- [ ] Advanced filter dropdown
- [ ] Interactive table

This project should also include:

- [ ] Intentional usability improvements
- [ ] An AI-assisted functionality improvement
- [ ] The bonus Applicant Profile Page
- [ ] Responsive behavior across desktop, tablet, and mobile
- [ ] Accessibility considerations throughout
- [ ] Thoughtful product reasoning and clear implementation structure

### Primary Goal
Build something that feels like a realistic Eventeny-style organizer workflow rather than just a static UI implementation.

---

# 2. Product Framing

Eventeny is an event management platform: https://www.eventeny.com/

This project should be framed as an organizer workflow for reviewing vendor submissions for upcoming events.

## Two Levels of Review

### A. Breadth: List-level review
The organizer needs to:
- [ ] Search applications quickly
- [ ] Filter by common review criteria
- [ ] Scan status and payment state
- [ ] Sort by meaningful fields
- [ ] Select rows and take bulk action

This is handled by the **Vendor Application Management** page.

### B. Depth: Applicant-level review
The organizer also needs to:
- [ ] Inspect a single applicant in detail
- [ ] Review supporting submission details
- [ ] See AI-assisted guidance
- [ ] Review documents/assets
- [ ] Review activity history
- [ ] Take next-step actions

This is handled by the **Bonus Applicant Profile Page**.

---

# 3. Full Deliverables

## Required Deliverables
- [ ] Responsive Vendor Application Management page
- [ ] Search input
- [ ] Advanced filter dropdown
- [ ] Interactive table
- [ ] Loading state
- [ ] Empty state
- [ ] Populated state
- [ ] Sorting
- [ ] Row selection
- [ ] Bulk actions
- [ ] Pagination
- [ ] Mobile-friendly layout
- [ ] Accessibility support
- [ ] Clear assumptions and tradeoffs
- [ ] Research tactics and findings
- [ ] Testing strategy
- [ ] Collaboration plan
- [ ] Code structure review explanation

## Intentional Improvements
- [ ] Active filter chips
- [ ] Clear all filters behavior
- [ ] AI Review Assistant
- [ ] AI confidence indicator
- [ ] AI cue in list/profile flow

## Bonus Deliverable
- [ ] Dedicated Applicant Profile Page
- [ ] Query-param routing by applicant ID
- [ ] Applicant detail rendering
- [ ] AI Review Assistant on profile page
- [ ] Documents section
- [ ] Activity timeline
- [ ] Decision action area
- [ ] Invalid applicant fallback state

---

# 4. Project Rules

## Technical Rules
- [ ] Use only HTML, CSS, and vanilla JavaScript
- [ ] No frameworks
- [ ] No backend required
- [ ] Use mock data
- [ ] Keep implementation realistic for a take-home
- [ ] Keep code modular and easy to explain in an interview
- [ ] Prioritize polish, clarity, accessibility, and responsiveness
- [ ] Treat AI as a prototype, not a full backend-integrated production AI system

## Product Rules
- [ ] Design for organizer workflow first
- [ ] Optimize list view for fast scanning
- [ ] Optimize profile view for deeper evaluation
- [ ] Each feature added must have a clear product reason
- [ ] Prefer useful, realistic additions over flashy complexity

## Code Rules
- [ ] Use semantic HTML
- [ ] Use reusable CSS variables and shared patterns
- [ ] Keep naming clear and readable
- [ ] Keep state predictable
- [ ] Avoid unnecessary rewrites after structure is stable
- [ ] Make the project easy to walk through during review

---

# 5. Design Direction

The UI should feel aligned with a clean, modern Eventeny-style admin interface.

**Reference:** https://www.eventeny.com/

## Visual Principles
- [ ] White card surfaces
- [ ] Light gray page background
- [ ] Teal-forward brand accents
- [ ] Rounded corners
- [ ] Subtle borders
- [ ] Soft shadows
- [ ] Clear visual hierarchy
- [ ] Practical SaaS/admin feel
- [ ] Polished but not overdesigned

## Suggested Typography
- [ ] Inter
- [ ] system-ui
- [ ] -apple-system
- [ ] "Segoe UI"
- [ ] sans-serif

---

# 6. Core UX Goals

The experience should help organizers answer:

- [ ] Which applications need review?
- [ ] Which vendors are approved, waitlisted, rejected, withdrawn, or awaiting decision?
- [ ] Which applicants have or have not paid?
- [ ] Which applicants should I look at more closely?
- [ ] What are the next logical actions to take?
- [ ] How can AI help reduce decision friction without replacing human judgment?

---

# 7. Information Architecture

## Page 1: Vendor Application Management
Purpose:
- [ ] Search, filter, sort, scan, select, and act on many applications quickly

## Page 2: Applicant Profile Page
Purpose:
- [ ] Review one application in depth and take action with richer context

---

# 8. Main Experience: Vendor Application Management

## Page Purpose
Provide a realistic organizer workspace for managing many vendor submissions efficiently.

## Main Page Sections
- [ ] Page header
- [ ] Subtitle / intro text
- [ ] Summary metric chips
- [ ] Toolbar
- [ ] Search input
- [ ] Filter trigger and panel
- [ ] Active filter chips
- [ ] Results count
- [ ] Data card
- [ ] Bulk action bar
- [ ] Semantic table on desktop/tablet
- [ ] Mobile application cards
- [ ] Empty state
- [ ] Loading state
- [ ] Pagination

## Suggested Header
**Title:** Vendor Application Management  
**Subtitle:** Search, filter, and review vendor submissions for upcoming events.

## Optional Summary Chips
- [ ] Total applications
- [ ] Awaiting decision
- [ ] Approved
- [ ] Not paid

---

# 9. Required Component 1: Search Input

## Purpose
Allow organizers to quickly locate applications across meaningful fields.

## Search Matches Against
- [ ] `businessName`
- [ ] `applicantName`
- [ ] `applicationName`
- [ ] `tags`
- [ ] `status`
- [ ] `paymentStatus`

## Functional Requirements
- [ ] `type="search"`
- [ ] Left search icon
- [ ] Placeholder: `Search by business, name, tag, etc`
- [ ] Clear button appears only when text exists
- [ ] Case-insensitive matching
- [ ] Partial matching
- [ ] Debounced filtering at 300ms
- [ ] Resets to page 1 on search change
- [ ] Works in combination with filters
- [ ] Updates results count live

## Required Search States
- [ ] Default
- [ ] Hover
- [ ] Focus
- [ ] Typing
- [ ] Clear button visible
- [ ] Empty results

## Accessibility
- [ ] Accessible label
- [ ] Clear button keyboard accessible
- [ ] Visible focus styles
- [ ] Results count can use `aria-live="polite"`

---

# 10. Required Component 2: Advanced Filter Dropdown

## Purpose
Allow organizers to narrow results by key workflow filters.

## Filter Categories

### Application Type
- [ ] All applications
- [ ] Food Vendor
- [ ] Merchandise Vendor
- [ ] Sponsor Booth
- [ ] Artist Alley

### Status
- [ ] Approved
- [ ] Awaiting decision
- [ ] Waitlisted
- [ ] Rejected
- [ ] Withdrawn

### Payment Status
- [ ] Paid
- [ ] Not paid

## Filter Trigger Requirements
- [ ] Button labeled `Filter`
- [ ] Filter icon
- [ ] Chevron icon
- [ ] Chevron rotates when open
- [ ] Active filter count badge when filters exist

## Desktop / Tablet Behavior
- [ ] Anchored dropdown below trigger

## Mobile Behavior
- [ ] Bottom sheet or full-width modal panel
- [ ] Close button
- [ ] Scrollable content if needed

## Interaction Requirements
- [ ] Opens/closes on click
- [ ] Click outside closes
- [ ] Escape closes
- [ ] Keyboard navigable
- [ ] Auto-applies filters
- [ ] Preserves values when reopened
- [ ] Reset filters action

## Accessibility
- [ ] `aria-expanded`
- [ ] `aria-controls`
- [ ] `fieldset` and `legend`
- [ ] Logical tab order
- [ ] Restore focus to trigger on close where appropriate

---

# 11. Required Component 3: Interactive Table

## Purpose
Display vendor application records in a scan-friendly, actionable format.

## Desktop / Tablet Columns
- [ ] Select checkbox
- [ ] Business name
- [ ] Tags
- [ ] Application
- [ ] Payment
- [ ] Status
- [ ] Date
- [ ] Action

## Row Content
- [ ] Select checkbox
- [ ] Avatar / initials marker
- [ ] Business name
- [ ] Applicant name secondary text
- [ ] Tags
- [ ] Application type
- [ ] Payment state
- [ ] Status chip
- [ ] Date
- [ ] Action button / menu

## Functional Requirements
- [ ] At least 6–8 rows of mock data
- [ ] Sorting on Business Name
- [ ] Sorting on Date
- [ ] Row selection
- [ ] Select-all on current page
- [ ] Bulk action bar
- [ ] Pagination
- [ ] Loading state
- [ ] Empty state
- [ ] Hover state
- [ ] Selected row state

---

# 12. Intentional Functionality Improvements

## Improvement 1: Active Filter Chips

### Purpose
Make current filter state visible and easy to change.

### Requirements
- [ ] Render chips below toolbar
- [ ] Show application type chip when active
- [ ] Show status chips when active
- [ ] Show payment chips when active
- [ ] Each chip has remove action
- [ ] Removing a chip immediately updates results
- [ ] Include `Clear all` when any filters are active

### Why It Matters
- [ ] Improves clarity
- [ ] Reduces ambiguity
- [ ] Speeds up refinement of current view

---

## Improvement 2: AI Review Assistant
See full section below.

---

# 13. AI Feature Spec: AI Review Assistant

## Purpose
Help organizers review applications faster by surfacing a concise AI-assisted assessment.

## Product Philosophy
- [ ] AI is decision support
- [ ] AI does not replace the organizer’s judgment
- [ ] AI should reduce cognitive load in a high-volume review workflow

## Recommended Placement
- [ ] Primary placement: Applicant Profile Page
- [ ] Optional placement: applicant drawer/details panel if implemented
- [ ] Optional subtle cue in main list view

## AI Content Structure
- [ ] Summary
- [ ] Strengths
- [ ] Concerns
- [ ] Suggested action
- [ ] Confidence

## Suggested Action Values
- [ ] Approve
- [ ] Waitlist
- [ ] Continue review
- [ ] Request more info
- [ ] No action needed

## Confidence Values
- [ ] High confidence
- [ ] Moderate confidence
- [ ] Low confidence

## AI UI Requirements
- [ ] Section title: `AI Review Assistant`
- [ ] Badge: `AI-assisted` or `Prototype`
- [ ] Polished card styling
- [ ] Summary paragraph
- [ ] Strengths list
- [ ] Concerns list
- [ ] Suggested action pill
- [ ] Confidence label
- [ ] Accessible text-first communication

## Implementation Guidance
- [ ] Can use mock AI data
- [ ] Can use rule-based AI-style generation
- [ ] Can use hybrid approach
- [ ] Must be presented honestly as a prototype

## AI Cue in List View
Optional subtle indicators:
- [ ] `AI`
- [ ] `Insight`
- [ ] `AI insight available`

Keep it:
- [ ] minimal
- [ ] tasteful
- [ ] not cluttered

---

# 14. Bonus Deliverable: Applicant Profile Page

## File
- [ ] `applicant-profile.html`

## Routing
- [ ] Use query param route such as `applicant-profile.html?id=1`
- [ ] Read ID from URL
- [ ] Find matching applicant in mock data
- [ ] Render matching profile
- [ ] Show fallback state if ID is invalid

## Purpose
Provide a natural deep-review extension of the list workflow.

## Required Sections
- [ ] Back link to management page
- [ ] Applicant header
- [ ] Overview cards
- [ ] Application details
- [ ] AI Review Assistant
- [ ] Documents / submission assets
- [ ] Activity timeline
- [ ] Decision action area
- [ ] Invalid applicant fallback state

## Applicant Header Must Include
- [ ] Avatar / initials
- [ ] Business name
- [ ] Applicant name
- [ ] Tags
- [ ] Application type
- [ ] Payment status
- [ ] Current status
- [ ] Submission date

## Overview Cards
- [ ] Application Type
- [ ] Payment Status
- [ ] Application Status
- [ ] AI Suggested Action

## Application Details
At minimum:
- [ ] Business Name
- [ ] Applicant Name
- [ ] Email
- [ ] Phone
- [ ] Booth Preference
- [ ] Description
- [ ] Notes
- [ ] Submitted Date

## Documents Section
Examples:
- [ ] `menu.pdf`
- [ ] `booth-photo.jpg`
- [ ] `insurance-certificate.pdf`
- [ ] `brand-logo.png`

Each document item should include:
- [ ] File icon placeholder
- [ ] File name
- [ ] File type
- [ ] Mock View action

## Activity Timeline
Example items:
- [ ] Application submitted
- [ ] Payment received
- [ ] AI review generated
- [ ] Manual review pending

## Decision Action Area
Buttons:
- [ ] Approve
- [ ] Waitlist
- [ ] Reject
- [ ] Request more info

Desktop:
- [ ] Sticky side card or anchored action area

Mobile:
- [ ] Sticky bottom actions or strong inline action section

---

# 15. Responsive Strategy

Support:
- [ ] 1440px desktop
- [ ] 768px tablet
- [ ] 375px mobile

## Desktop
- [ ] Inline toolbar
- [ ] Anchored filter dropdown
- [ ] Semantic table
- [ ] Spacious layout
- [ ] Profile page can use multi-column sections

## Tablet
- [ ] Toolbar can wrap
- [ ] Table can scroll horizontally if necessary
- [ ] Profile page stacks more tightly
- [ ] Maintain comfortable spacing

## Mobile
- [ ] Do not force desktop table into cramped layout
- [ ] Convert list rows into stacked application cards
- [ ] Search full width
- [ ] Filter becomes modal/bottom sheet
- [ ] Bulk actions may become sticky bottom bar
- [ ] Profile page becomes single column
- [ ] Documents and activity remain readable
- [ ] Actions remain easy to tap

## Mobile Card Content
- [ ] Checkbox
- [ ] Business name
- [ ] Applicant name
- [ ] Tags
- [ ] Application type
- [ ] Payment status
- [ ] Status chip
- [ ] Date
- [ ] Link/action to profile page

---

# 16. Accessibility Requirements

Accessibility must be part of the core build.

## Global Accessibility Requirements
- [ ] Semantic HTML
- [ ] Logical heading order
- [ ] Visible keyboard focus
- [ ] Keyboard-accessible buttons and controls
- [ ] Color is not the only indicator of meaning
- [ ] Screen-reader-friendly labels where needed

## Main Page Accessibility
- [ ] Search input labeled
- [ ] Clear button labeled
- [ ] Filter trigger uses `aria-expanded`
- [ ] Filter panel uses semantic grouping
- [ ] Table uses semantic table markup on desktop
- [ ] Sort controls communicate current state
- [ ] Row checkboxes have descriptive labels
- [ ] Bulk action controls are keyboard accessible

## Overlay / Filter Accessibility
- [ ] Escape closes modal/sheet/dropdown
- [ ] Focus returns to trigger where appropriate
- [ ] Logical tab order maintained

## Profile Page Accessibility
- [ ] Back link has descriptive text
- [ ] AI strengths/concerns use list semantics
- [ ] Documents list uses meaningful structure
- [ ] Activity timeline/list is readable in logical order
- [ ] Action buttons clearly labeled
- [ ] Invalid applicant state is accessible and understandable

---

# 17. Data Model

## Base Application Shape
```js
{
  id: 1,
  businessName: "Golden Spoon Kitchen",
  applicantName: "Maya Carter",
  tags: ["Food", "Local", "Returning"],
  applicationName: "Food Vendor",
  paymentStatus: "Paid",
  status: "Awaiting decision",
  date: "2026-02-02"
}


# 18. State Management

## Use centralized state for the main page.

Suggested State Shape

const state = {
  searchQuery: "",
  filters: {
    applicationType: "All applications",
    status: [],
    paymentStatus: []
  },
  sort: {
    key: "date",
    direction: "desc"
  },
  selectedRows: new Set(),
  currentPage: 1,
  pageSize: 5,
  isFilterOpen: false,
  isLoading: true
};

Data Flow Pipeline

 Start with all applications

 Apply search

 Apply filters

 Apply sorting

 Apply pagination

 Render UI

Keep logic:

 predictable

 easy to reason about

 easy to explain in review


19. File Structure

Simplified Structure

index.html
applicant-profile.html
styles.css
data.js
app.js
applicant-profile.js
README.md
RULES.md

Optional Modular Structure

index.html
applicant-profile.html
css/
  variables.css
  base.css
  layout.css
  components.css
  responsive.css
js/
  data.js
  state.js
  utils.js
  app.js
  applicant-profile.js
README.md
RULES.md


20. Interaction Rules

Main Page

 Search change resets to page 1

 Filter change resets to page 1

 Clear search resets immediately

 Active filter chip removal rerenders immediately

 Select-all affects current visible page rows

 Bulk actions reflect selected rows

 Sorting persists through search/filter changes

 Clicking business name navigates to profile page

 Mobile cards also link to profile page

Applicant Profile Page

 Read applicant ID from URL

 Render matching applicant

 Back link returns to main page

 Invalid applicant ID shows fallback state

 Action buttons remain usable and accessible

 AI Review Assistant renders correctly


21. Loading, Empty, Error, and Edge States

Loading State

 Simulate initial loading (~700ms)

 Show skeleton rows or cards

 Keep it polished and lightweight

Empty State

Show when no results match:

 Title: No applications found

 Short supporting text

 Reset filters action

Invalid Profile State

Show when applicant ID is invalid:

 Title: Applicant not found

 Short explanation

 Link back to Vendor Application Management

Edge Cases

 Long business names

 Missing tags

 Filtered result count smaller than current page

 Withdrawn applications

 Unpaid applications

 No AI review available fallback if needed

 Empty documents or activity data if needed


22. Testing Strategy

Functional Testing

 Search accuracy

 Filter combinations

 Sorting behavior

 Row selection

 Select-all

 Bulk actions

 Pagination behavior

 Profile page routing

 AI review rendering

 Invalid profile fallback

Accessibility Testing

 Keyboard-only navigation

 Focus order

 Escape close behavior

 Screen-reader labels

 Visible focus states

 Status meaning readable without relying only on color

Responsive Testing

 1440px

 768px

 375px

Edge Case Testing

 Zero search results

 Long text handling

 Missing optional fields

 Page reset after filter/search changes

 Withdrawn vendor logic

 Unpaid vendor AI recommendations


23. Research Tactics and Findings

Research Tactics

 Think through organizer workflow needs first

 Prioritize scanability in the list view

 Prioritize clarity/actionability in the profile view

 Consider how AI can reduce review effort without overstepping

 Consider how mobile use differs from desktop use

Likely Findings to Mention

 Mobile required a different presentation pattern than desktop

 AI insight worked better in a deeper review context than only in the list view

 Active filter chips improve understanding of interface state

 Separating list review from profile review improves workflow clarity

24. Code Structure Review Guidance

Be prepared to explain:

 How files are organized

 How shared mock data supports both pages

 How state drives the management page

 How query params drive the profile page

 How rendering is separated from data helpers

 How reusable styles keep both screens consistent


25. Collaboration Plan

Design

 Confirm missing interaction states

 Validate mobile behavior

 Refine AI card hierarchy

 Review spacing and visual consistency

Product

 Confirm most valuable filters

 Confirm which statuses matter most

 Validate list vs profile workflow

 Validate AI framing and confidence messaging

Engineering / Backend

 Real field mapping

 API contract for application data

 Real decision action endpoints

 Document asset integration

 AI signal/data inputs if expanded

QA

 Keyboard behavior validation

 Responsive regression testing

 Empty/loading/error state testing

 Edge case verification


26. Assumptions and Tradeoffs

Document these clearly:

 Mock data is used because backend integration is out of scope

 AI is implemented as a prototype using mock or rule-based logic

 Mobile uses stacked cards instead of compressed tables for usability

 Documents and activity are representative mock artifacts

 Decision actions may update only in-memory mock state

 The profile page is the natural deep-review extension of the list workflow


27. Phase-by-Phase Build Plan

Phase 1 — Project Foundation

Goal

Establish the base design system, file structure, and mock data.

Checklist

 Set up file structure

 Add CSS variables

 Add typography and spacing system

 Create reusable buttons, chips, card styles

 Add mock data

 Define state object

Output

A stable visual and data foundation.

Phase 2 — Main Page Shell

Goal

Build the Vendor Application Management page scaffold.

Checklist

 Header

 Subtitle

 Summary chips

 Toolbar layout

 Results count area

 Data card container

 Empty placeholders for future interactions

Output

A complete static page shell.

Phase 3 — Search Component

Goal

Implement search.

Checklist

 Search UI

 Search icon

 Clear button

 Debounce logic

 Search state updates

 Page reset on change

 Results count updates

Output

Functional search experience.

Phase 4 — Advanced Filter Dropdown

Goal

Implement filtering.

Checklist

 Filter trigger

 Desktop dropdown

 Mobile bottom sheet/modal

 Application type filter

 Status filter

 Payment status filter

 Auto-apply behavior

 Outside click close

 Escape close

 Reset filters

Output

Functional filter system.

Phase 5 — Active Filter Chips

Goal

Add intentional usability improvement.

Checklist

 Render active chips

 Remove individual chips

 Clear all action

 Immediate rerender behavior

Output

Visible and editable filter state.

Phase 6 — Interactive Table / Mobile Cards

Goal

Implement data display.

Checklist

 Desktop table

 Mobile cards

 Row layout

 Status chips

 Payment labels

 Action controls

 Hover and selected states

Output

Functional application list view.

Phase 7 — Sorting, Selection, Bulk Actions, Pagination

Goal

Add advanced interactions.

Checklist

 Sort by business name

 Sort by date

 Row selection

 Select-all

 Bulk action bar

 Pagination controls

 Page reset logic after filtering/searching

Output

Fully interactive list experience.

Phase 8 — Loading, Empty, and Edge States

Goal

Polish resilience and realism.

Checklist

 Loading skeletons

 Empty state

 Long text handling

 Missing tag handling

 Invalid page correction

 Stable rerender logic

Output

Polished state coverage.

Phase 9 — AI Review Assistant

Goal

Implement the intentional AI feature.

Checklist

 Add AI data or generation logic

 Render summary

 Render strengths

 Render concerns

 Render suggested action

 Render confidence

 Add AI cue in list/profile flow if desired

 Add optional AI loading state

Output

AI-assisted review prototype.

Phase 10 — Bonus Applicant Profile Page Foundation

Goal

Add profile page and routing.

Checklist

 Create applicant-profile.html

 Create applicant-profile.js

 Read query param ID

 Find matching applicant

 Connect list/card links to profile

 Add invalid ID fallback

Output

Working profile page foundation.

Phase 11 — Applicant Profile Content

Goal

Render rich detail experience.

Checklist

 Applicant header

 Overview cards

 Application details

 AI Review Assistant

 Documents section

 Activity timeline

 Decision actions

Output

Complete applicant detail workflow.

Phase 12 — Accessibility and Responsive Polish

Goal

Raise implementation quality.

Checklist

 Heading order audit

 Keyboard support audit

 Focus state audit

 Filter accessibility

 Sort accessibility

 Profile page accessibility

 Mobile spacing refinement

 Tap target refinement

Output

Accessible and responsive polish.

Phase 13 — Final Review, README, and Presentation Prep

Goal

Prepare project for submission and walkthrough.

Checklist

 Document assumptions and tradeoffs

 Finalize testing strategy

 Finalize research tactics/findings

 Finalize collaboration plan

 Prepare code structure explanation

 Prepare presentation walkthrough

Output

Submission-ready project.

28. Final Success Criteria

The project is successful if it:

 Clearly implements the three required components

 Feels like a coherent organizer workflow

 Demonstrates strong front-end craft

 Includes meaningful intentional improvements

 Integrates AI in a believable, useful way

 Includes the bonus Applicant Profile Page

 Is responsive, accessible, and easy to explain

29. Code Snippets and Project Reference Blocks

29.1 CSS Variables

:root {
  --color-bg: #f6f7f8;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #d9dee5;
  --color-border-strong: #b8c2cc;

  --color-primary: #0f8f8a;
  --color-primary-dark: #0c6f6b;
  --color-primary-light: #dff5f3;
  --color-focus: #4fc3bd;

  --color-approved-bg: #dff3e8;
  --color-approved-text: #1d6b46;

  --color-waitlisted-bg: #e8eefb;
  --color-waitlisted-text: #3a5ea8;

  --color-pending-bg: #fdf3d6;
  --color-pending-text: #8a6a11;

  --color-rejected-bg: #f9dde1;
  --color-rejected-text: #9a3040;

  --color-withdrawn-bg: #ececec;
  --color-withdrawn-text: #555;

  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.06);
  --shadow-md: 0 8px 24px rgba(16, 24, 40, 0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

29.2 Font Stack

font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

29.3 Suggested Main State Object

const state = {
  searchQuery: "",
  filters: {
    applicationType: "All applications",
    status: [],
    paymentStatus: []
  },
  sort: {
    key: "date",
    direction: "desc"
  },
  selectedRows: new Set(),
  currentPage: 1,
  pageSize: 5,
  isFilterOpen: false,
  isLoading: true
};

29.4 Searchable Fields Reference

[
  businessName,
  applicantName,
  applicationName,
  tags.join(" "),
  status,
  paymentStatus
]

29.5 URL Query Param Routing for Profile Page

const params = new URLSearchParams(window.location.search);
const applicantId = Number(params.get("id"));
const applicant = applications.find(item => item.id === applicantId);

29.6 Extended Mock Data Shape Example

{
  id: 1,
  businessName: "Golden Spoon Kitchen",
  applicantName: "Maya Carter",
  tags: ["Food", "Local", "Returning"],
  applicationName: "Food Vendor",
  paymentStatus: "Paid",
  status: "Awaiting decision",
  date: "2026-02-02",
  email: "maya.carter@example.com",
  phone: "(555) 210-4439",
  boothPreference: "10x10 Corner Booth",
  description: "Local food vendor specializing in handcrafted comfort bowls and seasonal specials.",
  notes: "Strong local following and complete menu submission.",
  documents: [
    { name: "menu.pdf", type: "PDF" },
    { name: "booth-photo.jpg", type: "Image" },
    { name: "insurance-certificate.pdf", type: "PDF" }
  ],
  activity: [
    { label: "Application submitted", date: "2026-02-02" },
    { label: "Payment received", date: "2026-02-03" },
    { label: "AI review generated", date: "2026-02-03" },
    { label: "Manual review pending", date: "2026-02-04" }
  ],
  aiReview: {
    summary:
      "Strong food vendor application with complete payment and a clear event-category fit. This submission appears review-ready and likely requires minimal follow-up.",
    strengths: [
      "Returning vendor",
      "Payment completed",
      "Strong category alignment",
      "Clear business identity"
    ],
    concerns: [
      "Booth setup details are somewhat limited"
    ],
    suggestedAction: "Approve",
    confidence: "High confidence"
  }
}

29.7 Full Mock Data for the Project

const applications = [
  {
    id: 1,
    businessName: "Golden Spoon Kitchen",
    applicantName: "Maya Carter",
    tags: ["Food", "Local", "Returning"],
    applicationName: "Food Vendor",
    paymentStatus: "Paid",
    status: "Awaiting decision",
    date: "2026-02-02",
    email: "maya.carter@example.com",
    phone: "(555) 210-4439",
    boothPreference: "10x10 Corner Booth",
    description: "Local food vendor specializing in handcrafted comfort bowls and seasonal specials.",
    notes: "Strong local following and complete menu submission.",
    documents: [
      { name: "menu.pdf", type: "PDF" },
      { name: "booth-photo.jpg", type: "Image" },
      { name: "insurance-certificate.pdf", type: "PDF" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-02-02" },
      { label: "Payment received", date: "2026-02-03" },
      { label: "AI review generated", date: "2026-02-03" },
      { label: "Manual review pending", date: "2026-02-04" }
    ],
    aiReview: {
      summary:
        "Strong food vendor application with complete payment and a clear event-category fit. This submission appears review-ready and likely requires minimal follow-up.",
      strengths: [
        "Returning vendor",
        "Payment completed",
        "Strong category alignment",
        "Clear business identity"
      ],
      concerns: [
        "Booth setup details are somewhat limited"
      ],
      suggestedAction: "Approve",
      confidence: "High confidence"
    }
  },
  {
    id: 2,
    businessName: "Paper Lantern Studio",
    applicantName: "Noah Kim",
    tags: ["Art", "Handmade"],
    applicationName: "Artist Alley",
    paymentStatus: "Not paid",
    status: "Waitlisted",
    date: "2026-01-28",
    email: "noah.kim@example.com",
    phone: "(555) 338-1902",
    boothPreference: "8x8 Inline Booth",
    description: "Handmade paper goods, art prints, and specialty stationery for curated market events.",
    notes: "Handmade paper goods and art prints with a strong visual brand.",
    documents: [
      { name: "product-catalog.pdf", type: "PDF" },
      { name: "display-photo.jpg", type: "Image" },
      { name: "brand-logo.png", type: "Image" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-01-28" },
      { label: "Payment reminder sent", date: "2026-01-29" },
      { label: "AI review generated", date: "2026-01-29" },
      { label: "Waitlist status applied", date: "2026-01-30" }
    ],
    aiReview: {
      summary:
        "Promising artist alley applicant with a strong handmade identity and clear category relevance. Payment is still pending, so the application may need follow-up before final approval.",
      strengths: [
        "Strong handmade and art positioning",
        "Clear application category",
        "Good thematic fit for artist alley"
      ],
      concerns: [
        "Payment not yet received",
        "Final approval may depend on payment completion"
      ],
      suggestedAction: "Continue review",
      confidence: "Moderate confidence"
    }
  },
  {
    id: 3,
    businessName: "Bloom & Vine",
    applicantName: "Sara Fields",
    tags: ["Retail", "Floral"],
    applicationName: "Merchandise Vendor",
    paymentStatus: "Paid",
    status: "Approved",
    date: "2026-01-24",
    email: "sara.fields@example.com",
    phone: "(555) 470-2881",
    boothPreference: "10x10 Standard Booth",
    description: "Floral gifts, seasonal arrangements, and decorative merchandise for event attendees.",
    notes: "Polished product presentation with a clear floral gifting concept.",
    documents: [
      { name: "catalog.pdf", type: "PDF" },
      { name: "booth-setup.jpg", type: "Image" },
      { name: "insurance-certificate.pdf", type: "PDF" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-01-24" },
      { label: "Payment received", date: "2026-01-24" },
      { label: "AI review generated", date: "2026-01-25" },
      { label: "Application approved", date: "2026-01-26" }
    ],
    aiReview: {
      summary:
        "Well-positioned merchandise vendor with complete payment and a polished application profile. No major blockers are visible from the current submission.",
      strengths: [
        "Payment completed",
        "Clear merchandising fit",
        "Complete and organized application",
        "Strong readiness for review"
      ],
      concerns: [
        "No major concerns identified"
      ],
      suggestedAction: "Approve",
      confidence: "High confidence"
    }
  },
  {
    id: 4,
    businessName: "Night Market BBQ",
    applicantName: "Andre Lewis",
    tags: ["Food", "Outdoor"],
    applicationName: "Food Vendor",
    paymentStatus: "Not paid",
    status: "Rejected",
    date: "2026-01-18",
    email: "andre.lewis@example.com",
    phone: "(555) 580-1147",
    boothPreference: "Outdoor Food Truck Slot",
    description: "Outdoor barbecue concept with festival-style service and quick-serve menu offerings.",
    notes: "Strong concept, but application details and readiness appear incomplete.",
    documents: [
      { name: "menu-draft.pdf", type: "PDF" },
      { name: "truck-photo.jpg", type: "Image" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-01-18" },
      { label: "Payment reminder sent", date: "2026-01-19" },
      { label: "AI review generated", date: "2026-01-19" },
      { label: "Application rejected", date: "2026-01-20" }
    ],
    aiReview: {
      summary:
        "The application has a relevant food vendor fit, but unresolved issues reduce readiness for acceptance. Payment is still pending and the current profile would benefit from follow-up.",
      strengths: [
        "Relevant vendor category",
        "Business concept appears aligned with event needs"
      ],
      concerns: [
        "Payment not received",
        "Current application does not appear fully ready",
        "Prior status suggests additional review may be needed"
      ],
      suggestedAction: "Request more info",
      confidence: "Moderate confidence"
    }
  },
  {
    id: 5,
    businessName: "Oakline Goods",
    applicantName: "Emily Brooks",
    tags: ["Retail", "Home"],
    applicationName: "Merchandise Vendor",
    paymentStatus: "Paid",
    status: "Withdrawn",
    date: "2026-01-12",
    email: "emily.brooks@example.com",
    phone: "(555) 229-7461",
    boothPreference: "10x10 Corner Booth",
    description: "Home goods, decor, and lifestyle merchandise for local and regional market events.",
    notes: "Originally submitted a complete home goods application before withdrawing.",
    documents: [
      { name: "product-lineup.pdf", type: "PDF" },
      { name: "display-mockup.jpg", type: "Image" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-01-12" },
      { label: "Payment received", date: "2026-01-12" },
      { label: "AI review generated", date: "2026-01-13" },
      { label: "Application withdrawn", date: "2026-01-14" }
    ],
    aiReview: {
      summary:
        "The application appears complete, but the vendor has already withdrawn from consideration. No further review action is currently necessary.",
      strengths: [
        "Payment completed",
        "Application was submitted in a complete state"
      ],
      concerns: [
        "Vendor has withdrawn",
        "No additional action needed in current workflow"
      ],
      suggestedAction: "No action needed",
      confidence: "High confidence"
    }
  },
  {
    id: 6,
    businessName: "Festival Fiber Co.",
    applicantName: "Jordan Price",
    tags: ["Textiles", "Handmade"],
    applicationName: "Artist Alley",
    paymentStatus: "Paid",
    status: "Approved",
    date: "2026-01-11",
    email: "jordan.price@example.com",
    phone: "(555) 664-2014",
    boothPreference: "Artist Alley Corner Space",
    description: "Handmade textile goods, woven art, and premium fabric accessories for curated markets.",
    notes: "Clear handmade textile brand with complete supporting details.",
    documents: [
      { name: "lookbook.pdf", type: "PDF" },
      { name: "booth-visual.jpg", type: "Image" },
      { name: "brand-assets.zip", type: "Archive" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-01-11" },
      { label: "Payment received", date: "2026-01-11" },
      { label: "AI review generated", date: "2026-01-12" },
      { label: "Application approved", date: "2026-01-13" }
    ],
    aiReview: {
      summary:
        "Strong handmade and textile applicant with complete payment and a clear event fit. The submission looks ready for approval with no meaningful blockers identified.",
      strengths: [
        "Payment completed",
        "Strong handmade and textile fit",
        "Clear brand identity",
        "Good review readiness"
      ],
      concerns: [
        "No major concerns identified"
      ],
      suggestedAction: "Approve",
      confidence: "High confidence"
    }
  },
  {
    id: 7,
    businessName: "Bright Tent Collective",
    applicantName: "Alyssa Reed",
    tags: ["Sponsor", "Premium"],
    applicationName: "Sponsor Booth",
    paymentStatus: "Paid",
    status: "Awaiting decision",
    date: "2026-02-05",
    email: "alyssa.reed@example.com",
    phone: "(555) 711-0829",
    boothPreference: "Premium Sponsor Pavilion",
    description: "Premium sponsor activation concept focused on high-visibility attendee engagement.",
    notes: "Premium sponsor prospect with strong potential value for event visibility.",
    documents: [
      { name: "sponsorship-deck.pdf", type: "PDF" },
      { name: "activation-render.jpg", type: "Image" },
      { name: "brand-guidelines.pdf", type: "PDF" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-02-05" },
      { label: "Payment received", date: "2026-02-05" },
      { label: "AI review generated", date: "2026-02-06" },
      { label: "Manual review pending", date: "2026-02-07" }
    ],
    aiReview: {
      summary:
        "Sponsor booth applicant shows strong potential and completed payment, but still appears to need standard organizer review before a final decision. The application looks promising overall.",
      strengths: [
        "Payment completed",
        "Premium sponsor category",
        "Strong potential event value"
      ],
      concerns: [
        "Still awaiting manual review",
        "Sponsor fit may depend on broader event priorities"
      ],
      suggestedAction: "Continue review",
      confidence: "Moderate confidence"
    }
  },
  {
    id: 8,
    businessName: "Harvest Moon Crafts",
    applicantName: "Tyler Nash",
    tags: ["Handmade", "Seasonal"],
    applicationName: "Merchandise Vendor",
    paymentStatus: "Not paid",
    status: "Waitlisted",
    date: "2026-02-07",
    email: "tyler.nash@example.com",
    phone: "(555) 842-3206",
    boothPreference: "Seasonal Market Aisle Booth",
    description: "Seasonal handmade goods and craft merchandise designed for holiday and themed events.",
    notes: "Seasonal handmade goods with good market fit, but application readiness is incomplete.",
    documents: [
      { name: "seasonal-catalog.pdf", type: "PDF" },
      { name: "display-photo.jpg", type: "Image" },
      { name: "brand-logo.png", type: "Image" }
    ],
    activity: [
      { label: "Application submitted", date: "2026-02-07" },
      { label: "AI review generated", date: "2026-02-07" },
      { label: "Payment reminder sent", date: "2026-02-08" },
      { label: "Waitlist status applied", date: "2026-02-08" }
    ],
    aiReview: {
      summary:
        "Promising seasonal merchandise vendor with relevant category fit, but unpaid status introduces uncertainty. The application may be better held until key requirements are completed.",
      strengths: [
        "Strong seasonal retail alignment",
        "Clear merchandising category",
        "Relevant event-market fit"
      ],
      concerns: [
        "Payment not received",
        "Readiness remains incomplete"
      ],
      suggestedAction: "Waitlist",
      confidence: "Moderate confidence"
    }
  }
];

29.8 Profile Data Helper Example

const params = new URLSearchParams(window.location.search);
const applicantId = Number(params.get("id"));
const applicant = applications.find(item => item.id === applicantId);

if (!applicant) {
  // Render fallback state: Applicant not found
}

29.9 AI Review Assistant Example Structure

aiReview: {
  summary:
    "Strong applicant with complete payment and a clear fit for the selected event category.",
  strengths: [
    "Returning vendor",
    "Payment completed",
    "Clear category alignment"
  ],
  concerns: [
    "Limited booth setup detail"
  ],
  suggestedAction: "Approve",
  confidence: "High confidence"
}

29.10 Search + Filter Behavioral Notes

// Expected data flow:
const processedApplications = applications
  // 1. search
  // 2. filter
  // 3. sort
  // 4. paginate


Final Notes:

Review Positioning

This project should ultimately communicate:

 strong front-end fundamentals

 thoughtful product design judgment

 accessible interaction design

 responsive implementation skill

 meaningful feature extension

 a realistic Eventeny-aligned workflow

One-Sentence Project Positioning:

Build a responsive Eventeny-style vendor application workflow that includes list-level management, AI-assisted review, and a bonus applicant profile page for deeper decision-making.

Eventeny reference: https://www.eventeny.com/