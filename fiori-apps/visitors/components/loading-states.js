// ===== LOADING STATES COMPONENT =====
const LoadingStates = {
  // Show metrics loading state
  showMetricsLoading() {
    const container = document.getElementById('metricsCardsContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="dashboard-card loading">
        <div class="card-header">
          <div class="card-icon"><p>👥</p></div>
          <h3 class="card-title">Active Clients</h3>
        </div>
        <div class="card-content">
          <div class="skeleton-loader" style="height: 120px;">
            <div class="skeleton-loader" style="width: 60%; height: 20px; margin-bottom: 12px;"></div>
            <div class="skeleton-loader" style="width: 80%; height: 14px; margin-bottom: 8px;"></div>
            <div class="skeleton-loader" style="width: 90%; height: 14px; margin-bottom: 8px;"></div>
          </div>
        </div>
      </div>
      <!-- Repeat for other cards -->
    `;
  },

  // Show activities loading state
  showActivitiesLoading() {
    const container = document.getElementById('activityListContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="activity-item loading">
        <div class="activity-icon skeleton-loader"></div>
        <div class="activity-content">
          <div class="skeleton-loader" style="width: 120px; height: 16px; margin-bottom: 8px;"></div>
          <div class="skeleton-loader" style="width: 180px; height: 14px; margin-bottom: 6px;"></div>
          <div class="skeleton-loader" style="width: 80px; height: 12px;"></div>
        </div>
        <div class="activity-badge skeleton-loader" style="width: 60px; height: 20px;"></div>
      </div>
    `;
  },

  // Show health status loading state
  showHealthLoading() {
    const container = document.getElementById('healthStatusContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="health-item loading">
        <div class="health-status skeleton-loader"></div>
        <div class="health-info">
          <div class="skeleton-loader" style="width: 120px; height: 16px; margin-bottom: 8px;"></div>
          <div class="skeleton-loader" style="width: 180px; height: 14px;"></div>
        </div>
      </div>
      <!-- Repeat for other health items -->
    `;
  },

  // Show global loading state
  showGlobalLoading() {
    const placeholder = document.getElementById('loadingPlaceholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
      <div class="app-container">
        <div class="side-nav" style="padding-top:20px;">
          <div class="skeleton-loader" style="margin:20px; height:32px;"></div>
          <div style="padding:0 20px;">
            <div class="skeleton-loader" style="width:100%; height:40px; margin-bottom:8px;"></div>
            <div class="skeleton-loader" style="width:100%; height:40px; margin-bottom:8px;"></div>
            <div class="skeleton-loader" style="width:100%; height:40px; margin-bottom:8px;"></div>
            <div class="skeleton-loader" style="width:100%; height:40px; margin-bottom:8px;"></div>
          </div>
        </div>
        
        <div class="main-content" style="flex:1;">
          <div class="app-header">
            <div class="skeleton-loader" style="width:300px; height:32px;"></div>
          </div>
          <div class="dashboard-content">
            <div class="skeleton-loader" style="width:200px; height:28px; margin-bottom:16px;"></div>
            <div class="cards-grid">
              <div class="skeleton-loader" style="height:120px;">
                <div class="skeleton-loader" style="width:60%; height:20px; margin-bottom:12px;"></div>
                <div class="skeleton-loader" style="width:80%; height:14px; margin-bottom:8px;"></div>
                <div class="skeleton-loader" style="width:90%; height:14px; margin-bottom:8px;"></div>
              </div>
              <!-- Repeat for other cards -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
