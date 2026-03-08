/**
 * Centralized state for the Vendor Application Management page.
 * All UI rendering is driven from this single state object.
 */
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
