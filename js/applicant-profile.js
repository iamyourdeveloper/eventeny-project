/**
 * Applicant Profile Page controller.
 * Reads applicant ID from URL hash, renders full profile or fallback.
 */
(function () {
  "use strict";

  const container = document.getElementById("profileContent");
  const backIcon = document.getElementById("backIcon");
  if (backIcon) backIcon.innerHTML = ICONS.back;

  const applicantId = Number(window.location.hash.replace("#", ""));
  const applicant = applications.find(item => item.id === applicantId);

  if (!applicant) {
    renderFallback();
    return;
  }

  renderProfile(applicant);

  /* ---------------------------------------------------------------
     FALLBACK
  --------------------------------------------------------------- */
  function renderFallback() {
    container.innerHTML = `
      <div class="fallback-state">
        <h2>Applicant not found</h2>
        <p>The applicant you're looking for doesn't exist or the ID is invalid.</p>
        <a href="index.html" class="btn btn-primary">Back to Vendor Application Management</a>
      </div>
    `;
  }

  /* ---------------------------------------------------------------
     FULL PROFILE
  --------------------------------------------------------------- */
  function renderProfile(app) {
    const initials = getInitials(app.businessName);
    const statusClass = getStatusClass(app.status);
    const paymentClass = app.paymentStatus === "Paid" ? "payment-paid" : "payment-not-paid";
    const ai = app.aiReview;
    const confidenceClass = ai ? getConfidenceClass(ai.confidence) : "";

    container.innerHTML = `
      <!-- Applicant Header -->
      <div class="profile-header">
        <div class="avatar avatar-lg">${initials}</div>
        <div class="profile-header-info">
          <h1>${app.businessName}</h1>
          <div class="applicant-name">${app.applicantName}</div>
          <div class="profile-header-meta">
            <div class="tags-cell">
              ${(app.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
            <span class="profile-meta-item">${app.applicationName}</span>
            <span class="profile-meta-item ${paymentClass}">${app.paymentStatus}</span>
            <span class="status-chip ${statusClass}">${app.status}</span>
            <span class="profile-meta-item">${formatDate(app.date)}</span>
          </div>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="overview-cards">
        <div class="overview-card">
          <div class="card-label">Application Type</div>
          <div class="card-value">${app.applicationName}</div>
        </div>
        <div class="overview-card">
          <div class="card-label">Payment Status</div>
          <div class="card-value ${paymentClass}">${app.paymentStatus}</div>
        </div>
        <div class="overview-card">
          <div class="card-label">Application Status</div>
          <div class="card-value"><span class="status-chip ${statusClass}">${app.status}</span></div>
        </div>
        <div class="overview-card">
          <div class="card-label">AI Suggested Action</div>
          <div class="card-value">${ai ? ai.suggestedAction : "N/A"}</div>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="profile-grid">
        <div class="profile-main">

          <!-- Application Details -->
          <section class="profile-section">
            <h3>Application Details</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Business Name</span>
                <span class="detail-value">${app.businessName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Applicant Name</span>
                <span class="detail-value">${app.applicantName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">${app.email || "—"}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">${app.phone || "—"}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Booth Preference</span>
                <span class="detail-value">${app.boothPreference || "—"}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Submitted</span>
                <span class="detail-value">${formatDate(app.date)}</span>
              </div>
              <div class="detail-item full-width">
                <span class="detail-label">Description</span>
                <span class="detail-value">${app.description || "—"}</span>
              </div>
              <div class="detail-item full-width">
                <span class="detail-label">Notes</span>
                <span class="detail-value">${app.notes || "—"}</span>
              </div>
            </div>
          </section>

          <!-- AI Review Assistant -->
          ${ai ? renderAICard(ai) : `
            <section class="profile-section">
              <h3>AI Review Assistant</h3>
              <p style="color:var(--color-text-muted);font-size:0.9rem;">No AI review is available for this application.</p>
            </section>
          `}

          <!-- Documents -->
          <section class="profile-section">
            <h3>Documents</h3>
            ${app.documents && app.documents.length > 0 ? `
              <div class="doc-list">
                ${app.documents.map(doc => `
                  <div class="doc-item">
                    <span class="doc-icon">${getFileIcon(doc.type)}</span>
                    <div class="doc-info">
                      <div class="doc-name">${doc.name}</div>
                      <div class="doc-type">${doc.type}</div>
                    </div>
                    <button class="btn btn-ghost btn-sm" type="button" aria-label="View ${doc.name}">View</button>
                  </div>
                `).join("")}
              </div>
            ` : `<p style="color:var(--color-text-muted);font-size:0.9rem;">No documents submitted.</p>`}
          </section>

          <!-- Activity Timeline -->
          <section class="profile-section">
            <h3>Activity</h3>
            ${app.activity && app.activity.length > 0 ? `
              <div class="timeline">
                ${app.activity.map(a => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">${a.label}</div>
                    <div class="timeline-date">${formatDate(a.date)}</div>
                  </div>
                `).join("")}
              </div>
            ` : `<p style="color:var(--color-text-muted);font-size:0.9rem;">No activity recorded.</p>`}
          </section>

        </div>

        <!-- Sidebar: Decision Actions -->
        <div class="profile-sidebar">
          <section class="profile-section">
            <h3>Decision</h3>
            <div class="decision-actions">
              <button class="btn btn-primary" type="button" data-decision="Approved">Approve</button>
              <button class="btn btn-secondary" type="button" data-decision="Waitlisted">Waitlist</button>
              <button class="btn btn-danger" type="button" data-decision="Rejected">Reject</button>
              <button class="btn btn-secondary" type="button" data-decision="request-info">Request more info</button>
            </div>
          </section>

          <!-- Quick Info sidebar card -->
          <section class="profile-section">
            <h3>Quick Info</h3>
            <div style="display:flex;flex-direction:column;gap:var(--space-sm);font-size:0.875rem;">
              <div><strong>Status:</strong> <span class="status-chip ${statusClass}" style="font-size:0.8125rem;">${app.status}</span></div>
              <div><strong>Payment:</strong> <span class="${paymentClass}">${app.paymentStatus}</span></div>
              <div><strong>Type:</strong> ${app.applicationName}</div>
              <div><strong>Submitted:</strong> ${formatDate(app.date)}</div>
            </div>
          </section>

          <a href="index.html" class="back-link back-link-sidebar">
            ${ICONS.back}
            Back to Vendor Application Management
          </a>
        </div>
      </div>

      <!-- Mobile / Tablet bottom back link -->
      <a href="index.html" class="back-link back-link-bottom">
        ${ICONS.back}
        Back to Vendor Application Management
      </a>
    `;

    attachDecisionHandlers(app);
  }

  /* ---------------------------------------------------------------
     AI REVIEW CARD
  --------------------------------------------------------------- */
  function renderAICard(ai) {
    const confidenceClass = getConfidenceClass(ai.confidence);
    return `
      <div class="ai-card">
        <div class="ai-card-header">
          <span style="display:flex;color:var(--color-ai-text);">${ICONS.ai}</span>
          <h3>AI Review Assistant</h3>
          <span class="ai-badge">Prototype</span>
        </div>
        <p class="ai-summary">${ai.summary}</p>
        <div class="ai-section-label">Strengths</div>
        <ul class="ai-list">
          ${ai.strengths.map(s => `<li>${s}</li>`).join("")}
        </ul>
        <div class="ai-section-label">Concerns</div>
        <ul class="ai-list">
          ${ai.concerns.map(c => `<li>${c}</li>`).join("")}
        </ul>
        <div class="ai-footer">
          <div>
            <span style="font-size:0.8125rem;color:var(--color-text-muted);">Suggested action:</span>
            <span class="ai-action-pill">${ai.suggestedAction}</span>
          </div>
          <span class="ai-confidence ${confidenceClass}">${ai.confidence}</span>
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------
     DECISION HANDLERS
  --------------------------------------------------------------- */
  function attachDecisionHandlers(app) {
    container.querySelectorAll("[data-decision]").forEach(btn => {
      btn.addEventListener("click", () => {
        const decision = btn.dataset.decision;
        if (decision === "request-info") {
          alert(`Request for more info sent to ${app.applicantName}.`);
        } else {
          app.status = decision;
          persistApplicationStatus(app.id, decision);
          renderProfile(app);
        }
      });
    });
  }
})();
