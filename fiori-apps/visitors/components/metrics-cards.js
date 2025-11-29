// ===== METRICS CARDS COMPONENT =====
const MetricsCardsComponent = {
  container: null,
  currentData: null,

  // Initialize the component
  async init(containerId) {
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      console.error('Metrics cards container not found:', containerId);
      return;
    }

    // Render initial loading state
    this.renderLoading();
    
    console.log('✅ MetricsCardsComponent initialized');
  },

  // Render metrics cards with data
  render(data) {
    this.currentData = data;
    
    if (!data) {
      this.renderError('No data available');
      return;
    }

    try {
      const html = this.generateMetricsHTML(data);
      this.container.innerHTML = html;
      this.attachEventListeners();
      
    } catch (error) {
      console.error('Error rendering metrics cards:', error);
      this.renderError('Failed to render metrics');
    }
  },

  // Update existing metrics cards (optimized)
  update(data) {
    if (!this.currentData) {
      this.render(data);
      return;
    }

    this.currentData = data;
    
    // Only update if values changed significantly
    Object.keys(data).forEach(metricType => {
      const card = document.querySelector(`[data-metric="${metricType}"]`);
      if (card) {
        this.updateCard(card, data[metricType], metricType);
      }
    });
  },

  // Update individual card
  updateCard(card, data, metricType) {
    const valueElement = card.querySelector('.metric-value');
    const trendElement = card.querySelector('.metric-trend');
    
    if (valueElement) {
      valueElement.textContent = this.getPrimaryValue(data, metricType);
    }
    
    if (trendElement && data.trend) {
      trendElement.textContent = data.trend;
    }
    
    // Update breakdown items
    this.updateBreakdown(card, data, metricType);
    
    // Add update animation
    card.style.animation = 'highlight 1s ease';
    setTimeout(() => card.style.animation = '', 1000);
  },

  // Update breakdown items
  updateBreakdown(card, data, metricType) {
    const breakdownContainer = card.querySelector('.metric-breakdown');
    if (!breakdownContainer) return;

    const breakdownHTML = this.generateBreakdownHTML(data, metricType);
    breakdownContainer.innerHTML = breakdownHTML;
  },

  // Generate HTML for metrics cards
  generateMetricsHTML(data) {
    const { clients, transactions, api, revenue } = data;
    
    return `
      <!-- Clients Card -->
      <div class="dashboard-card" data-metric="clients">
        <div class="card-header">
          <div class="card-icon"><p>👥</p></div>
          <h3 class="card-title">Active Clients</h3>
        </div>
        <div class="card-content">
          <div class="metric-display">
            <div class="metric-value">${clients.total}</div>
            <div class="metric-label">SaaS Companies</div>
            <div class="metric-trend positive">
              <span>${clients.trend}</span>
            </div>
          </div>
          <div class="metric-breakdown">
            ${this.generateBreakdownHTML(clients, 'clients')}
          </div>
        </div>
      </div>

      <!-- Transactions Card -->
      <div class="dashboard-card" data-metric="transactions">
        <div class="card-header">
          <div class="card-icon"><p>💳</p></div>
          <h3 class="card-title">Transaction Volume</h3>
        </div>
        <div class="card-content">
          <div class="metric-display">
            <div class="metric-value">${transactions.volume}</div>
            <div class="metric-label">Monthly Processed</div>
            <div class="metric-trend positive">
              <span>${transactions.trend}</span>
            </div>
          </div>
          <div class="metric-breakdown">
            ${this.generateBreakdownHTML(transactions, 'transactions')}
          </div>
        </div>
      </div>

      <!-- API Performance Card -->
      <div class="dashboard-card" data-metric="api">
        <div class="card-header">
          <div class="card-icon"><p>🔧</p></div>
          <h3 class="card-title">API Performance</h3>
        </div>
        <div class="card-content">
          <div class="metric-display">
            <div class="metric-value">${api.uptime}</div>
            <div class="metric-label">Uptime</div>
            <div class="metric-trend positive">
              <span>${api.status}</span>
            </div>
          </div>
          <div class="metric-breakdown">
            ${this.generateBreakdownHTML(api, 'api')}
          </div>
        </div>
      </div>

      <!-- Revenue Card -->
      <div class="dashboard-card" data-metric="revenue">
        <div class="card-header">
          <div class="card-icon"><p>💰</p></div>
          <h3 class="card-title">Revenue Metrics</h3>
        </div>
        <div class="card-content">
          <div class="metric-display">
            <div class="metric-value">${revenue.monthly}</div>
            <div class="metric-label">Monthly Revenue</div>
            <div class="metric-trend positive">
              <span>${revenue.trend}</span>
            </div>
          </div>
          <div class="metric-breakdown">
            ${this.generateBreakdownHTML(revenue, 'revenue')}
          </div>
        </div>
      </div>
    `;
  },

  // Generate breakdown HTML based on metric type
  generateBreakdownHTML(data, type) {
    switch (type) {
      case 'clients':
        return `
          <div class="breakdown-item">
            <span class="breakdown-label">Enterprise:</span>
            <span class="breakdown-value">${data.enterprise} clients</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Growth:</span>
            <span class="breakdown-value">${data.growth} clients</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Startup:</span>
            <span class="breakdown-value">${data.startup} clients</span>
          </div>
        `;
      
      case 'transactions':
        return `
          <div class="breakdown-item">
            <span class="breakdown-label">Success Rate:</span>
            <span class="breakdown-value success">${data.successRate}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Avg Transaction:</span>
            <span class="breakdown-value">${data.avgTransaction}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Chargebacks:</span>
            <span class="breakdown-value warning">${data.chargebacks}</span>
          </div>
        `;
      
      case 'api':
        return `
          <div class="breakdown-item">
            <span class="breakdown-label">Avg Response:</span>
            <span class="breakdown-value success">${data.responseTime}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">API Calls Today:</span>
            <span class="breakdown-value">${data.callsToday}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Error Rate:</span>
            <span class="breakdown-value success">${data.errorRate}</span>
          </div>
        `;
      
      case 'revenue':
        return `
          <div class="breakdown-item">
            <span class="breakdown-label">Platform Fees:</span>
            <span class="breakdown-value">${data.platformFees}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">Transaction Fees:</span>
            <span class="breakdown-value">${data.transactionFees}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">MRR Growth:</span>
            <span class="breakdown-value success">${data.growthRate}</span>
          </div>
        `;
      
      default:
        return '';
    }
  },

  // Get primary value for a metric type
  getPrimaryValue(data, type) {
    const valueMap = {
      clients: data.total,
      transactions: data.volume,
      api: data.uptime,
      revenue: data.monthly
    };
    
    return valueMap[type] || 'N/A';
  },

  // Render loading state
  renderLoading() {
    this.container.innerHTML = `
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

  // Render error state
  renderError(message) {
    this.container.innerHTML = `
      <div class="dashboard-card error">
        <div class="card-content">
          <div style="text-align: center; padding: 20px; color: var(--error-color);">
            <p>📊</p>
            <p>${message}</p>
          </div>
        </div>
      </div>
    `;
  },

  // Attach event listeners to cards
  attachEventListeners() {
    const cards = this.container.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const metricType = card.getAttribute('data-metric');
        this.handleCardClick(metricType, this.currentData[metricType]);
      });
    });
  },

  // Handle card click
  handleCardClick(metricType, data) {
    console.log(`Card clicked: ${metricType}`, data);
    
    // You can implement detailed view or drill-down here
    // For now, just add a visual feedback
    const card = this.container.querySelector(`[data-metric="${metricType}"]`);
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  }
};

// Add highlight animation
const style = document.createElement('style');
style.textContent = `
  @keyframes highlight {
    0% { background-color: transparent; }
    50% { background-color: rgba(255, 122, 0, 0.1); }
    100% { background-color: transparent; }
  }
`;
document.head.appendChild(style);
