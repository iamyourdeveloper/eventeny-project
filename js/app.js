/**
 * Main application controller for Vendor Application Management.
 * Drives all rendering and interactions from centralized state.
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     DOM REFERENCES
  --------------------------------------------------------------- */
  const dom = {
    summaryChips: document.getElementById("summaryChips"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    searchIcon: document.getElementById("searchIcon"),
    filterTrigger: document.getElementById("filterTrigger"),
    filterPanel: document.getElementById("filterPanel"),
    filterBadge: document.getElementById("filterBadge"),
    filterChevron: document.getElementById("filterChevron"),
    filterIcon: document.getElementById("filterIcon"),
    filterPanelClose: document.getElementById("filterPanelClose"),
    filterOverlay: document.getElementById("filterOverlay"),
    filterAppType: document.getElementById("filterAppType"),
    filterReset: document.getElementById("filterReset"),
    activeFilters: document.getElementById("activeFilters"),
    resultsCount: document.getElementById("resultsCount"),
    dataCard: document.getElementById("dataCard"),
    loadingSkeleton: document.getElementById("loadingSkeleton"),
    desktopTable: document.getElementById("desktopTable"),
    tableBody: document.getElementById("tableBody"),
    mobileCards: document.getElementById("mobileCards"),
    emptyState: document.getElementById("emptyState"),
    emptyReset: document.getElementById("emptyReset"),
    selectAll: document.getElementById("selectAll"),
    sortBusiness: document.getElementById("sortBusiness"),
    sortDate: document.getElementById("sortDate"),
    sortBusinessIcon: document.getElementById("sortBusinessIcon"),
    sortDateIcon: document.getElementById("sortDateIcon"),
    bulkBar: document.getElementById("bulkBar"),
    bulkCount: document.getElementById("bulkCount"),
    bulkDeselect: document.getElementById("bulkDeselect"),
    pagination: document.getElementById("pagination")
  };

  /* ---------------------------------------------------------------
     INJECT STATIC ICONS
  --------------------------------------------------------------- */
  dom.searchIcon.innerHTML = ICONS.search;
  dom.searchClear.innerHTML = ICONS.close;
  dom.filterIcon.innerHTML = ICONS.filter;
  dom.filterChevron.innerHTML = ICONS.chevronDown;
  dom.filterPanelClose.innerHTML = ICONS.close;

  /* ---------------------------------------------------------------
     OPEN ACTION MENU TRACKER
  --------------------------------------------------------------- */
  let openActionMenu = null;

  /* ---------------------------------------------------------------
     RENDER PIPELINE
  --------------------------------------------------------------- */
  function render() {
    const all = getProcessedData(applications, state);
    const totalPages = getTotalPages(all.length, state.pageSize);

    if (state.currentPage > totalPages) {
      state.currentPage = totalPages;
    }

    const paged = paginate(all, state.currentPage, state.pageSize);

    renderSummaryChips();
    renderActiveFilters();
    renderResultsCount(all.length);
    renderSortIcons();

    if (all.length === 0) {
      dom.desktopTable.style.display = "none";
      dom.mobileCards.style.display = "none";
      dom.emptyState.style.display = "";
      dom.pagination.innerHTML = "";
    } else {
      dom.emptyState.style.display = "none";
      dom.desktopTable.style.display = "";
      dom.mobileCards.style.display = "";
      renderTableRows(paged);
      renderMobileCards(paged);
      renderPagination(all.length, totalPages);
    }

    renderBulkBar();
    syncSelectAll(paged);
  }

  /* ---------------------------------------------------------------
     SUMMARY CHIPS
  --------------------------------------------------------------- */
  function renderSummaryChips() {
    const total = applications.length;
    const awaiting = applications.filter(a => a.status === "Awaiting decision").length;
    const approved = applications.filter(a => a.status === "Approved").length;
    const notPaid = applications.filter(a => a.paymentStatus === "Not paid").length;

    dom.summaryChips.innerHTML = `
      <div class="summary-chip"><span class="chip-count">${total}</span> Total</div>
      <div class="summary-chip"><span class="chip-count">${awaiting}</span> Awaiting</div>
      <div class="summary-chip"><span class="chip-count">${approved}</span> Approved</div>
      <div class="summary-chip"><span class="chip-count">${notPaid}</span> Not Paid</div>
    `;
  }

  /* ---------------------------------------------------------------
     ACTIVE FILTER CHIPS
  --------------------------------------------------------------- */
  function renderActiveFilters() {
    const chips = [];

    if (state.filters.applicationType !== "All applications") {
      chips.push({
        label: state.filters.applicationType,
        remove: () => {
          state.filters.applicationType = "All applications";
          dom.filterAppType.value = "All applications";
          state.currentPage = 1;
          render();
        }
      });
    }

    state.filters.status.forEach(s => {
      chips.push({
        label: s,
        remove: () => {
          state.filters.status = state.filters.status.filter(x => x !== s);
          syncFilterCheckboxes();
          state.currentPage = 1;
          render();
        }
      });
    });

    state.filters.paymentStatus.forEach(p => {
      chips.push({
        label: p,
        remove: () => {
          state.filters.paymentStatus = state.filters.paymentStatus.filter(x => x !== p);
          syncFilterCheckboxes();
          state.currentPage = 1;
          render();
        }
      });
    });

    if (chips.length === 0) {
      dom.activeFilters.innerHTML = "";
      return;
    }

    dom.activeFilters.innerHTML =
      chips
        .map(
          (c, i) =>
            `<span class="filter-chip">${c.label}<button class="filter-chip-remove" data-chip-index="${i}" type="button" aria-label="Remove ${c.label} filter">&times;</button></span>`
        )
        .join("") +
      `<button class="clear-all-btn" id="clearAllFilters" type="button">Clear all</button>`;

    dom.activeFilters.querySelectorAll(".filter-chip-remove").forEach((btn, i) => {
      btn.addEventListener("click", () => chips[i].remove());
    });

    document.getElementById("clearAllFilters").addEventListener("click", clearAllFilters);
  }

  /* ---------------------------------------------------------------
     RESULTS COUNT
  --------------------------------------------------------------- */
  function renderResultsCount(count) {
    dom.resultsCount.textContent = `Showing ${count} application${count !== 1 ? "s" : ""}`;
  }

  /* ---------------------------------------------------------------
     SORT ICONS
  --------------------------------------------------------------- */
  function renderSortIcons() {
    dom.sortBusinessIcon.innerHTML =
      state.sort.key === "businessName"
        ? state.sort.direction === "asc"
          ? ICONS.sortAsc
          : ICONS.sortDesc
        : ICONS.sortNeutral;

    dom.sortDateIcon.innerHTML =
      state.sort.key === "date"
        ? state.sort.direction === "asc"
          ? ICONS.sortAsc
          : ICONS.sortDesc
        : ICONS.sortNeutral;

    dom.sortBusiness.setAttribute(
      "aria-sort",
      state.sort.key === "businessName" ? state.sort.direction === "asc" ? "ascending" : "descending" : "none"
    );
    dom.sortDate.setAttribute(
      "aria-sort",
      state.sort.key === "date" ? state.sort.direction === "asc" ? "ascending" : "descending" : "none"
    );
  }

  /* ---------------------------------------------------------------
     TABLE ROWS
  --------------------------------------------------------------- */
  function renderTableRows(data) {
    dom.tableBody.innerHTML = data
      .map(item => {
        const checked = state.selectedRows.has(item.id) ? "checked" : "";
        const selectedClass = state.selectedRows.has(item.id) ? "selected" : "";
        const initials = getInitials(item.businessName);
        const statusClass = getStatusClass(item.status);
        const paymentClass = item.paymentStatus === "Paid" ? "payment-paid" : "payment-not-paid";
        const hasAI = item.aiReview ? `<span class="ai-cue" title="AI insight available">${ICONS.ai} AI</span>` : "";

        return `
          <tr class="${selectedClass}" data-id="${item.id}">
            <td class="td-checkbox">
              <input type="checkbox" class="row-checkbox row-select" ${checked}
                data-id="${item.id}" aria-label="Select ${item.businessName}">
            </td>
            <td>
              <div class="business-cell">
                <div class="avatar">${initials}</div>
                <div class="business-info">
                  <a class="business-name" href="applicant-profile.html?id=${item.id}">${item.businessName}</a>
                  <div class="applicant-name">${item.applicantName} ${hasAI}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="tags-cell">
                ${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
              </div>
            </td>
            <td>${item.applicationName}</td>
            <td><span class="${paymentClass}">${item.paymentStatus}</span></td>
            <td>${formatDate(item.date)}</td>
            <td><span class="status-chip ${statusClass}">${item.status}</span></td>
            <td class="td-action">
              <button class="action-btn" type="button" aria-label="Actions for ${item.businessName}" data-action-id="${item.id}">
                ${ICONS.dots}
              </button>
              <div class="action-menu" id="actionMenu-${item.id}">
                <a class="action-menu-item" href="applicant-profile.html?id=${item.id}">View profile</a>
                <button class="action-menu-item" type="button" data-quick-action="approve" data-id="${item.id}">Approve</button>
                <button class="action-menu-item" type="button" data-quick-action="waitlist" data-id="${item.id}">Waitlist</button>
                <button class="action-menu-item" type="button" data-quick-action="reject" data-id="${item.id}">Reject</button>
              </div>
            </td>
          </tr>`;
      })
      .join("");

    attachTableEvents();
  }

  /* ---------------------------------------------------------------
     MOBILE CARDS
  --------------------------------------------------------------- */
  function renderMobileCards(data) {
    dom.mobileCards.innerHTML = data
      .map(item => {
        const checked = state.selectedRows.has(item.id) ? "checked" : "";
        const initials = getInitials(item.businessName);
        const statusClass = getStatusClass(item.status);
        const paymentClass = item.paymentStatus === "Paid" ? "payment-paid" : "payment-not-paid";

        return `
          <div class="mobile-card" data-id="${item.id}">
            <div class="mobile-card-header">
              <input type="checkbox" class="row-checkbox row-select-mobile" ${checked}
                data-id="${item.id}" aria-label="Select ${item.businessName}">
              <div class="avatar">${initials}</div>
              <div class="business-info">
                <a class="business-name" href="applicant-profile.html?id=${item.id}">${item.businessName}</a>
                <div class="applicant-name">${item.applicantName}</div>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="tags-cell">
                ${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
              </div>
              <div class="mobile-card-row">
                <span class="label">Application</span>
                <span>${item.applicationName}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Payment</span>
                <span class="${paymentClass}">${item.paymentStatus}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Date</span>
                <span>${formatDate(item.date)}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <span class="status-chip ${statusClass}">${item.status}</span>
              <a class="btn btn-ghost btn-sm" href="applicant-profile.html?id=${item.id}">View &rarr;</a>
            </div>
          </div>`;
      })
      .join("");

    dom.mobileCards.querySelectorAll(".row-select-mobile").forEach(cb => {
      cb.addEventListener("change", () => handleRowSelect(Number(cb.dataset.id)));
    });
  }

  /* ---------------------------------------------------------------
     PAGINATION
  --------------------------------------------------------------- */
  function renderPagination(totalItems, totalPages) {
    if (totalPages <= 1) {
      dom.pagination.innerHTML = "";
      return;
    }

    let html = `<button class="page-btn" data-page="prev" ${state.currentPage === 1 ? "disabled" : ""} aria-label="Previous page">&lsaquo;</button>`;

    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === state.currentPage ? "active" : ""}" data-page="${i}" ${i === state.currentPage ? 'aria-current="page"' : ""}>${i}</button>`;
    }

    html += `<button class="page-btn" data-page="next" ${state.currentPage === totalPages ? "disabled" : ""} aria-label="Next page">&rsaquo;</button>`;

    dom.pagination.innerHTML = html;

    dom.pagination.querySelectorAll(".page-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const p = btn.dataset.page;
        if (p === "prev") state.currentPage = Math.max(1, state.currentPage - 1);
        else if (p === "next") state.currentPage = Math.min(totalPages, state.currentPage + 1);
        else state.currentPage = Number(p);
        state.selectedRows.clear();
        render();
      });
    });
  }

  /* ---------------------------------------------------------------
     BULK ACTION BAR
  --------------------------------------------------------------- */
  function renderBulkBar() {
    if (state.selectedRows.size > 0) {
      dom.bulkBar.classList.remove("hidden");
      dom.bulkCount.textContent = `${state.selectedRows.size} application${state.selectedRows.size > 1 ? "s" : ""} selected`;
    } else {
      dom.bulkBar.classList.add("hidden");
    }
  }

  /* ---------------------------------------------------------------
     SELECT-ALL SYNC
  --------------------------------------------------------------- */
  function syncSelectAll(pageData) {
    if (pageData.length === 0) {
      dom.selectAll.checked = false;
      dom.selectAll.indeterminate = false;
      return;
    }
    const allSelected = pageData.every(item => state.selectedRows.has(item.id));
    const someSelected = pageData.some(item => state.selectedRows.has(item.id));
    dom.selectAll.checked = allSelected;
    dom.selectAll.indeterminate = !allSelected && someSelected;
  }

  /* ---------------------------------------------------------------
     LOADING STATE
  --------------------------------------------------------------- */
  function renderLoading() {
    dom.desktopTable.style.display = "none";
    dom.mobileCards.style.display = "none";
    dom.emptyState.style.display = "none";
    dom.pagination.innerHTML = "";

    let rows = "";
    for (let i = 0; i < state.pageSize; i++) {
      rows += `
        <div class="skeleton-row">
          <div class="skeleton skeleton-circle"></div>
          <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
            <div class="skeleton skeleton-line" style="width:${50 + Math.random() * 30}%"></div>
            <div class="skeleton skeleton-line-sm" style="width:${30 + Math.random() * 20}%"></div>
          </div>
          <div class="skeleton skeleton-line" style="width:60px"></div>
          <div class="skeleton skeleton-line" style="width:80px"></div>
        </div>`;
    }
    dom.loadingSkeleton.innerHTML = rows;
  }

  /* ---------------------------------------------------------------
     TABLE ROW EVENTS
  --------------------------------------------------------------- */
  function attachTableEvents() {
    dom.tableBody.querySelectorAll(".row-select").forEach(cb => {
      cb.addEventListener("change", () => handleRowSelect(Number(cb.dataset.id)));
    });

    dom.tableBody.querySelectorAll(".action-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const id = btn.dataset.actionId;
        const menu = document.getElementById("actionMenu-" + id);
        if (openActionMenu && openActionMenu !== menu) {
          openActionMenu.classList.remove("open");
        }
        menu.classList.toggle("open");
        openActionMenu = menu.classList.contains("open") ? menu : null;
      });
    });

    dom.tableBody.querySelectorAll("[data-quick-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const action = btn.dataset.quickAction;
        handleQuickAction(id, action);
        if (openActionMenu) {
          openActionMenu.classList.remove("open");
          openActionMenu = null;
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     EVENT HANDLERS
  --------------------------------------------------------------- */

  // Search
  const debouncedSearch = debounce(() => {
    state.searchQuery = dom.searchInput.value.trim();
    state.currentPage = 1;
    state.selectedRows.clear();
    render();
  }, 300);

  dom.searchInput.addEventListener("input", () => {
    dom.searchClear.classList.toggle("visible", dom.searchInput.value.length > 0);
    debouncedSearch();
  });

  dom.searchClear.addEventListener("click", () => {
    dom.searchInput.value = "";
    dom.searchClear.classList.remove("visible");
    state.searchQuery = "";
    state.currentPage = 1;
    state.selectedRows.clear();
    render();
    dom.searchInput.focus();
  });

  // Filter toggle
  function openFilter() {
    state.isFilterOpen = true;
    dom.filterPanel.classList.add("open");
    dom.filterTrigger.setAttribute("aria-expanded", "true");
    dom.filterOverlay.classList.add("visible");
  }

  function closeFilter() {
    state.isFilterOpen = false;
    dom.filterPanel.classList.remove("open");
    dom.filterTrigger.setAttribute("aria-expanded", "false");
    dom.filterOverlay.classList.remove("visible");
  }

  dom.filterTrigger.addEventListener("click", () => {
    state.isFilterOpen ? closeFilter() : openFilter();
  });

  dom.filterPanelClose.addEventListener("click", closeFilter);
  dom.filterOverlay.addEventListener("click", closeFilter);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (state.isFilterOpen) {
        closeFilter();
        dom.filterTrigger.focus();
      }
      if (openActionMenu) {
        openActionMenu.classList.remove("open");
        openActionMenu = null;
      }
    }
  });

  document.addEventListener("click", e => {
    if (state.isFilterOpen && !dom.filterPanel.contains(e.target) && !dom.filterTrigger.contains(e.target)) {
      closeFilter();
    }
    if (openActionMenu && !openActionMenu.contains(e.target) && !e.target.closest(".action-btn")) {
      openActionMenu.classList.remove("open");
      openActionMenu = null;
    }
  });

  // Filter changes
  dom.filterAppType.addEventListener("change", () => {
    state.filters.applicationType = dom.filterAppType.value;
    state.currentPage = 1;
    state.selectedRows.clear();
    updateFilterBadge();
    render();
  });

  document.querySelectorAll('#filterStatusGroup input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      state.filters.status = getCheckedValues("#filterStatusGroup");
      state.currentPage = 1;
      state.selectedRows.clear();
      updateFilterBadge();
      render();
    });
  });

  document.querySelectorAll('#filterPaymentGroup input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      state.filters.paymentStatus = getCheckedValues("#filterPaymentGroup");
      state.currentPage = 1;
      state.selectedRows.clear();
      updateFilterBadge();
      render();
    });
  });

  dom.filterReset.addEventListener("click", clearAllFilters);
  dom.emptyReset.addEventListener("click", clearAllFilters);

  // Sorting
  dom.sortBusiness.addEventListener("click", () => handleSort("businessName"));
  dom.sortDate.addEventListener("click", () => handleSort("date"));

  // Select-all
  dom.selectAll.addEventListener("change", () => {
    const all = getProcessedData(applications, state);
    const paged = paginate(all, state.currentPage, state.pageSize);
    if (dom.selectAll.checked) {
      paged.forEach(item => state.selectedRows.add(item.id));
    } else {
      paged.forEach(item => state.selectedRows.delete(item.id));
    }
    render();
  });

  // Bulk actions
  dom.bulkDeselect.addEventListener("click", () => {
    state.selectedRows.clear();
    render();
  });

  dom.bulkBar.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const statusMap = { approve: "Approved", waitlist: "Waitlisted", reject: "Rejected" };
      state.selectedRows.forEach(id => {
        const app = applications.find(a => a.id === id);
        if (app) app.status = statusMap[action];
      });
      state.selectedRows.clear();
      render();
    });
  });

  /* ---------------------------------------------------------------
     HELPERS
  --------------------------------------------------------------- */
  function handleSort(key) {
    if (state.sort.key === key) {
      state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
    } else {
      state.sort.key = key;
      state.sort.direction = key === "businessName" ? "asc" : "desc";
    }
    render();
  }

  function handleRowSelect(id) {
    if (state.selectedRows.has(id)) {
      state.selectedRows.delete(id);
    } else {
      state.selectedRows.add(id);
    }
    render();
  }

  function handleQuickAction(id, action) {
    const statusMap = { approve: "Approved", waitlist: "Waitlisted", reject: "Rejected" };
    const app = applications.find(a => a.id === id);
    if (app && statusMap[action]) {
      app.status = statusMap[action];
      render();
    }
  }

  function getCheckedValues(groupSelector) {
    return Array.from(
      document.querySelectorAll(`${groupSelector} input[type="checkbox"]:checked`)
    ).map(cb => cb.value);
  }

  function syncFilterCheckboxes() {
    document.querySelectorAll('#filterStatusGroup input[type="checkbox"]').forEach(cb => {
      cb.checked = state.filters.status.includes(cb.value);
    });
    document.querySelectorAll('#filterPaymentGroup input[type="checkbox"]').forEach(cb => {
      cb.checked = state.filters.paymentStatus.includes(cb.value);
    });
  }

  function clearAllFilters() {
    state.filters.applicationType = "All applications";
    state.filters.status = [];
    state.filters.paymentStatus = [];
    dom.filterAppType.value = "All applications";
    syncFilterCheckboxes();
    state.searchQuery = "";
    dom.searchInput.value = "";
    dom.searchClear.classList.remove("visible");
    state.currentPage = 1;
    state.selectedRows.clear();
    updateFilterBadge();
    render();
  }

  function updateFilterBadge() {
    let count = 0;
    if (state.filters.applicationType !== "All applications") count++;
    count += state.filters.status.length;
    count += state.filters.paymentStatus.length;
    if (count > 0) {
      dom.filterBadge.textContent = count;
      dom.filterBadge.classList.remove("hidden");
    } else {
      dom.filterBadge.classList.add("hidden");
    }
  }

  /* ---------------------------------------------------------------
     INITIALIZE
  --------------------------------------------------------------- */
  function init() {
    state.isLoading = true;
    renderLoading();

    setTimeout(() => {
      state.isLoading = false;
      dom.loadingSkeleton.innerHTML = "";
      render();
    }, 700);
  }

  init();
})();
