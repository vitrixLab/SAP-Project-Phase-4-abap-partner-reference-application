// ===== ACTIVITY LIST COMPONENT =====
const ActivityListComponent = {
  container: null,
  currentActivities: [],

  // Initialize the component
  async init(containerId) {
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      console.error('Activity list container not found:', containerId);
      return;
    }

    // Render initial loading state
    this.renderLoading();
    
    console.log('✅ ActivityListComponent initialized');
  },

  // Render activities with data
  render(activities) {
    this.currentActivities = activities;
    
    if (!activities || !Array.isArray(activities)) {
      this.renderError('No activity data available');
      return;
    }

    try {
      const html = this.generateActivitiesHTML(activities);
      this.container.innerHTML = html;
      this.attachEventListeners();
      
    } catch (error) {
      console.error('Error rendering activities:', error);
      this.renderError('Failed to load activities');
    }
  },

  // Update activities list
  update(activities) {
    if (!this.currentActivities) {
      this.render(activities);
      return;
    }

    // Check if there are new activities
    const newActivities = this.findNewActivities(activities, this.currentActivities);
    
    if (newActivities.length > 0) {
      // Add new activities with animation
      this.addNewActivitiesWithAnimation(newActivities);
    }

    this.currentActivities = activities;
  },

  // Find new activities compared to current list
  findNewActivities(newActivities, currentActivities) {
    const currentIds = new Set(currentActivities.map(activity => activity.id));
    return newActivities.filter(activity => !currentIds.has(activity.id));
  },

  // Add new activities with animation
  addNewActivitiesWithAnimation(newActivities) {
    newActivities.forEach(activity => {
      const activityHTML = this.generateActivityHTML(activity);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = activityHTML;
      const newElement = tempDiv.firstChild;
      
      // Add new activity at the top with animation
      newElement.style.opacity = '0';
      newElement.style.transform = 'translateY(-20px)';
      
      this.container.insertBefore(newElement, this.container.firstChild);
      
      // Animate in
      setTimeout(() => {
        newElement.style.transition = 'all 0.3s ease';
        newElement.style.opacity = '1';
        newElement.style.transform = 'translateY(0)';
      }, 10);
    });

    // Limit to max 10 activities
    const allActivities = this.container.querySelectorAll('.activity-item');
    if (allActivities.length > 10) {
      for (let i = 10; i < allActivities.length; i++) {
        allActivities[i].remove();
      }
    }
  },

  // Generate HTML for activities list
  generateActivitiesHTML(activities) {
    if (activities.length === 0) {
      return `
        <div class="activity-empty">
          <p>No recent activities</p>
        </div>
      `;
    }

    return activities.map(activity => this.generateActivityHTML(activity)).join('');
  },

  // Generate HTML for individual activity
  generateActivityHTML(activity) {
    const statusIcon = activity.status === 'success' ? '✓' : '⏳';
    const statusClass = activity.status === 'success' ? 'success' : 'pending';
    
    return `
      <div class="activity-item" data-activity-id="${activity.id}">
        <div class="activity-icon ${statusClass}">${statusIcon}</div>
        <div class="activity-content">
          <div class="activity-title">${this.escapeHTML(activity.client)}</div>
          <div class="activity-description">${this.escapeHTML(activity.plan)}</div>
          <div class="activity-time">${this.escapeHTML(activity.time)}</div>
        </div>
        <div class="activity-badge ${activity.tier}">${this.formatTier(activity.tier)}</div>
      </div>
    `;
  },

  // Format tier name for display
  formatTier(tier) {
    const tierMap = {
      enterprise: 'Enterprise',
      growth: 'Growth',
      startup: 'Startup'
    };
    return tierMap[tier] || tier;
  },

  // Escape HTML to prevent XSS
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Render loading state
  renderLoading() {
    this.container.innerHTML = `
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

  // Render error state
  renderError(message) {
    this.container.innerHTML = `
      <div class="activity-error">
        <div style="text-align: center; padding: 20px; color: var(--error-color);">
          <p>⚠️</p>
          <p>${message}</p>
        </div>
      </div>
    `;
  },

  // Attach event listeners to activity items
  attachEventListeners() {
    const activityItems = this.container.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
      item.addEventListener('click', () => {
        const activityId = item.getAttribute('data-activity-id');
        const activity = this.currentActivities.find(a => a.id == activityId);
        this.handleActivityClick(activity);
      });
    });
  },

  // Handle activity item click
  handleActivityClick(activity) {
    console.log('Activity clicked:', activity);
    
    // You can implement detailed view or actions here
    // For now, just add visual feedback
    const item = this.container.querySelector(`[data-activity-id="${activity.id}"]`);
    item.style.backgroundColor = 'var(--bg-tertiary)';
    setTimeout(() => {
      item.style.backgroundColor = '';
    }, 300);
  }
};
