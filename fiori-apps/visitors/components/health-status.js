// ===== HEALTH STATUS COMPONENT =====
const HealthStatusComponent = {
  container: null,
  currentStatus: [],

  // Initialize the component
  async init(containerId) {
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      console.error('Health status container not found:', containerId);
      return;
    }

    // Render initial loading state
    this.renderLoading();
    
    console.log('✅ HealthStatusComponent initialized');
  },

  // Render health status with data
  render(healthStatus) {
    this.currentStatus = healthStatus;
    
    if (!healthStatus || !Array.isArray(healthStatus)) {
      this.renderError('No health status data available');
      return;
    }

    try {
      const html = this.generateHealthHTML(healthStatus);
      this.container.innerHTML = html;
      this.attachEventListeners();
      
    } catch (error) {
      console.error('Error rendering health status:', error);
      this.renderError('Failed to load health status');
    }
  },

  // Update health status
  update(healthStatus) {
    if (!this.currentStatus) {
      this.render(healthStatus);
      return;
    }

    this.currentStatus = healthStatus;
    
    // Update each health item
    healthStatus.forEach((status, index) => {
      const healthItem = this.container.querySelector(`[data-service="${this.slugify(status.service)}"]`);
      if (healthItem) {
        this.updateHealthItem(healthItem, status);
      }
    });
  },

  // Update individual health item
  updateHealthItem(healthItem, status) {
    const statusElement = healthItem.querySelector('.health-status');
    const metricElement = healthItem.querySelector('.health-metric');
    
    if (statusElement) {
      statusElement.className = `health-status ${status.status}`;
    }
    
    if (metricElement) {
      metricElement.textContent = status.metric;
    }
    
    // Add update animation if status changed
    const currentStatus = healthItem.getAttribute('data-status');
    if (currentStatus !== status.status) {
      healthItem.style.animation = 'pulse 0.5s ease';
      setTimeout(() => healthItem.style.animation = '', 500);
      healthItem.setAttribute('data-status', status.status);
    }
  },

  // Generate HTML for health status grid
  generateHealthHTML(healthStatus) {
    return healthStatus.map(status => this.generateHealthItemHTML(status)).join('');
  },

  // Generate HTML for individual health item
  generateHealthItemHTML(status) {
    return `
      <div class="health-item" data-service="${this.slugify(status.service)}" data-status="${status.status}">
        <div class="health-status ${status.status}"></div>
        <div class="health-info">
          <div class="health-title">${this.escapeHTML(status.service)}</div>
          <div class="health-metric">${this.escapeHTML(status.metric)}</div>
        </div>
      </div>
    `;
  },

  // Convert string to slug for data attributes
  slugify(text) {
    return text.toLowerCase().replace(/[^\w]+/g, '-');
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

  // Render error state
  renderError(message) {
    this.container.innerHTML = `
      <div class="health-error">
        <div style="text-align: center; padding: 20px; color: var(--error-color);">
          <p>🔄</p>
          <p>${message}</p>
        </div>
      </div>
    `;
  },

  // Attach event listeners to health items
  attachEventListeners() {
    const healthItems = this.container.querySelectorAll('.health-item');
    
    healthItems.forEach(item => {
      item.addEventListener('click', () => {
        const service = item.getAttribute('data-service');
        const status = this.currentStatus.find(s => this.slugify(s.service) === service);
        this.handleHealthItemClick(status);
      });
    });
  },

  // Handle health item click
  handleHealthItemClick(status) {
    console.log('Health item clicked:', status);
    
    // You can implement detailed monitoring view here
    // For now, just add visual feedback
    const item = this.container.querySelector(`[data-service="${this.slugify(status.service)}"]`);
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
      item.style.transform = '';
    }, 150);
  }
};

// Add pulse animation for status changes
const healthStyle = document.createElement('style');
healthStyle.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(healthStyle);
