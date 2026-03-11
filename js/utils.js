/**
 * Shared utility functions for the project.
 */

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function matchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const textFields = [
    item.businessName,
    item.applicantName,
    item.applicationName,
    (item.tags || []).join(" ")
  ];
  const exactFields = [item.status, item.paymentStatus];
  return (
    textFields.some(f => f && f.toLowerCase().includes(q)) ||
    exactFields.some(f => f && f.toLowerCase() === q)
  );
}

function matchesFilters(item, filters) {
  if (
    filters.applicationType !== "All applications" &&
    item.applicationName !== filters.applicationType
  ) {
    return false;
  }
  if (filters.status.length > 0 && !filters.status.includes(item.status)) {
    return false;
  }
  if (
    filters.paymentStatus.length > 0 &&
    !filters.paymentStatus.includes(item.paymentStatus)
  ) {
    return false;
  }
  return true;
}

function sortData(data, key, direction) {
  return [...data].sort((a, b) => {
    let valA, valB;
    if (key === "businessName") {
      valA = a.businessName.toLowerCase();
      valB = b.businessName.toLowerCase();
    } else if (key === "date") {
      valA = a.date;
      valB = b.date;
    } else {
      return 0;
    }
    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

function paginate(data, page, pageSize) {
  if (pageSize === Infinity) return data;
  const start = (page - 1) * pageSize;
  return data.slice(start, start + pageSize);
}

function getProcessedData(allData, st) {
  let result = allData.filter(item => matchesSearch(item, st.searchQuery));
  result = result.filter(item => matchesFilters(item, st.filters));
  result = sortData(result, st.sort.key, st.sort.direction);
  return result;
}

function getTotalPages(totalItems, pageSize) {
  if (pageSize === Infinity) return 1;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

function getStatusClass(status) {
  const map = {
    "Approved": "status-approved",
    "Awaiting decision": "status-pending",
    "Waitlisted": "status-waitlisted",
    "Rejected": "status-rejected",
    "Withdrawn": "status-withdrawn"
  };
  return map[status] || "";
}

function getConfidenceClass(confidence) {
  if (confidence.includes("High")) return "confidence-high";
  if (confidence.includes("Moderate")) return "confidence-moderate";
  return "confidence-low";
}

function getFileIcon(type) {
  const icons = {
    "PDF": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    "Image": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    "Archive": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`
  };
  return icons[type] || icons["PDF"];
}

/* Reusable SVG icons */
const ICONS = {
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  filter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`,
  chevronDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  sortAsc: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  sortDesc: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  sortNeutral: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 7 12 3 16 7"/><polyline points="8 17 12 21 16 17"/></svg>`,
  dots: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`,
  ai: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  back: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`
};
