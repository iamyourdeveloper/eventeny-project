/**
 * Mock data for the Vendor Application Management project.
 * Shared by both index.html and applicant-profile.html.
 */
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
      summary: "Strong food vendor application with complete payment and a clear event-category fit. This submission appears review-ready and likely requires minimal follow-up.",
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
      summary: "Promising artist alley applicant with a strong handmade identity and clear category relevance. Payment is still pending, so the application may need follow-up before final approval.",
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
      summary: "Well-positioned merchandise vendor with complete payment and a polished application profile. No major blockers are visible from the current submission.",
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
      summary: "The application has a relevant food vendor fit, but unresolved issues reduce readiness for acceptance. Payment is still pending and the current profile would benefit from follow-up.",
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
      summary: "The application appears complete, but the vendor has already withdrawn from consideration. No further review action is currently necessary.",
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
      summary: "Strong handmade and textile applicant with complete payment and a clear event fit. The submission looks ready for approval with no meaningful blockers identified.",
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
      summary: "Sponsor booth applicant shows strong potential and completed payment, but still appears to need standard organizer review before a final decision. The application looks promising overall.",
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
      summary: "Promising seasonal merchandise vendor with relevant category fit, but unpaid status introduces uncertainty. The application may be better held until key requirements are completed.",
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
