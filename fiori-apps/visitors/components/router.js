// ===== ROUTER COMPONENT =====
const Router = {
  currentRoute: 'dashboard',
  routes: {
    dashboard: {
      title: 'Dashboard',
      component: 'DashboardView'
    },
    clients: {
      title: 'Clients',
      component: 'ClientsView'
    },
    transactions: {
      title: 'Transactions',
      component: 'TransactionsView'
    },
    api: {
      title: 'API Management',
      component: 'ApiView'
    },
    analytics: {
      title: 'Analytics',
      component: 'AnalyticsView'
    }
  },

  // Initialize router
  init() {
    this.setupNavigationListeners();
    this.setupRouteChangeHandler();
    
    // Set initial route
    this.navigate('dashboard');
    
    console.log('✅ Router initialized');
  },

  // Setup navigation event listeners
  setupNavigationListeners() {
    const navItems = document.querySelectorAll('.nav-item[data-route]');
    
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const route = item.getAttribute('data-route');
        this.navigate(route);
      });
    });
  },

  // Setup route change handling
  setupRouteChangeHandler() {
    window.addEventListener('popstate', (event) => {
      const route = event.state?.route || 'dashboard';
      this.handleRouteChange(route);
    });
  },

  // Navigate to route
  navigate(route) {
    if (this.routes[route]) {
      // Update browser history
      window.history.pushState({ route }, '', `#${route}`);
      
      // Handle route change
      this.handleRouteChange(route);
    } else {
      console.warn(`Route not found: ${route}`);
      this.navigate('dashboard'); // Fallback to dashboard
    }
  },

  // Handle route change
  handleRouteChange(route) {
    this.currentRoute = route;
    
    // Update active navigation item
    this.updateActiveNavItem(route);
    
    // Update page title
    this.updatePageTitle(route);
    
    // Load route component
    this.loadRouteComponent(route);
    
    console.log(`📍 Navigated to: ${route}`);
  },

  // Update active navigation item
  updateActiveNavItem(route) {
    const navItems = document.querySelectorAll('.nav-item[data-route]');
    
    navItems.forEach(item => {
      const itemRoute = item.getAttribute('data-route');
      if (itemRoute === route) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  // Update page title
  updatePageTitle(route) {
    const routeConfig = this.routes[route];
    if (routeConfig) {
      document.title = `${routeConfig.title} - Ascend Payments Platform`;
    }
  },

  // Load route component (placeholder for future implementation)
  loadRouteComponent(route) {
    const routeConfig = this.routes[route];
    
    if (routeConfig && routeConfig.component) {
      // Here you would load the actual component
      // For now, just update the main content area
      this.updateMainContent(route);
    }
  },

  // Update main content based on route
  updateMainContent(route) {
    const mainContent = document.querySelector('.dashboard-content');
    if (!mainContent) return;

    // Simple content update - in a real app, you'd load different components
    const content = this.getRouteContent(route);
    mainContent.innerHTML = content;
    
    // Re-initialize components for the new route
    this.initializeRouteComponents(route);
  },

  // Get content for route
  getRouteContent(route) {
    const contentMap = {
      dashboard: `
        <div class="content-header">
          <h2>Platform Overview</h2>
          <p>Monitor your payment gateway performance and client activities in real-time.</p>
        </div>
        <div id="metricsCardsContainer" class="cards-grid"></div>
        <div class="dashboard-section">
          <h3>Recent Client Onboarding</h3>
          <div id="activityListContainer" class="activity-list"></div>
        </div>
        <div class="dashboard-section">
          <h3>System Health & Monitoring</h3>
          <div id="healthStatusContainer" class="health-grid"></div>
        </div>
      `,
      clients: `
        <div class="content-header">
          <h2>Client Management</h2>
          <p>Manage your SaaS clients and their subscription plans.</p>
        </div>
        <div class="dashboard-section">
          <h3>Client List</h3>
          <p>Client management interface coming soon...</p>
        </div>
      `,
      transactions: `
        <div class="content-header">
          <h2>Transaction History</h2>
          <p>View and analyze payment transactions.</p>
        </div>
        <div class="dashboard-section">
          <h3>Recent Transactions</h3>
          <p>Transaction management interface coming soon...</p>
        </div>
      `,
      api: `
        <div class="content-header">
          <h2>API Management</h2>
          <p>Monitor and manage your API endpoints and usage.</p>
        </div>
        <div class="dashboard-section">
          <h3>API Endpoints</h3>
          <p>API management interface coming soon...</p>
        </div>
      `,
      analytics: `
        <div class="content-header">
          <h2>Analytics & Reports</h2>
          <p>Deep dive into your platform performance metrics.</p>
        </div>
        <div class="dashboard-section">
          <h3>Performance Analytics</h3>
          <p>Analytics dashboard coming soon...</p>
        </div>
      `
    };

    return contentMap[route] || contentMap.dashboard;
  },

  // Initialize components for specific route
  initializeRouteComponents(route) {
    switch (route) {
      case 'dashboard':
        // Re-initialize dashboard components
        if (typeof MetricsCardsComponent !== 'undefined') {
          MetricsCardsComponent.init('metricsCardsContainer');
          ActivityListComponent.init('activityListContainer');
          HealthStatusComponent.init('healthStatusContainer');
          
          // Reload data
          App.loadInitialData();
        }
        break;
      
      // Add other route component initializations here
      
      default:
        console.log(`No specific components for route: ${route}`);
    }
  }
};
