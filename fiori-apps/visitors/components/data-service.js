// ===== DATA SERVICE MODULE =====
const DataService = {
  // API configuration
  endpoints: {
    metrics: '/api/v1/metrics',
    activities: '/api/v1/activities',
    health: '/api/v1/health',
    clients: '/api/v1/clients'
  },

  // Request headers
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (window.API_TOKEN || 'demo-token')
  },

  // Fetch metrics data from API
  async fetchMetrics() {
    try {
      const response = await fetch(this.endpoints.metrics, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return this.getMockMetrics();
    }
  },

  // Fetch activities data from API
  async fetchActivities() {
    try {
      const response = await fetch(this.endpoints.activities, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return this.getMockActivities();
    }
  },

  // Fetch health status from API
  async fetchHealthStatus() {
    try {
      const response = await fetch(this.endpoints.health, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return this.getMockHealthStatus();
    }
  },

  // Mock data generators (fallback)
  getMockMetrics() {
    return {
      clients: {
        total: 42 + Math.floor(Math.random() * 5),
        enterprise: 8,
        growth: 24,
        startup: 10,
        trend: '+12%'
      },
      transactions: {
        volume: `$${(2.5 + Math.random() * 0.5).toFixed(1)}M`,
        successRate: `${(98.5 + Math.random() * 1.5).toFixed(1)}%`,
        avgTransaction: `$${(85 + Math.random() * 10).toFixed(2)}`,
        chargebacks: `${(0.02 + Math.random() * 0.02).toFixed(2)}%`,
        trend: '+18%'
      },
      api: {
        uptime: '99.98%',
        responseTime: `${(130 + Math.random() * 20).toFixed(0)}ms`,
        callsToday: (280000 + Math.floor(Math.random() * 10000)).toLocaleString(),
        errorRate: '0.02%',
        status: 'Stable'
      },
      revenue: {
        monthly: `$${(82000 + Math.random() * 5000).toLocaleString()}`,
        platformFees: `$${(42000 + Math.random() * 2000).toLocaleString()}`,
        transactionFees: `$${(40000 + Math.random() * 3000).toLocaleString()}`,
        growthRate: `${(14 + Math.random() * 2).toFixed(1)}%`,
        trend: '+22%'
      }
    };
  },

  getMockActivities() {
    const activities = [
      {
        id: 1,
        client: 'TechFlow SaaS',
        plan: 'Enterprise plan - $50K MRR',
        time: '2 hours ago',
        status: 'success',
        tier: 'enterprise'
      },
      {
        id: 2,
        client: 'DataSphere Analytics',
        plan: 'Growth plan - $25K MRR',
        time: '5 hours ago',
        status: 'success',
        tier: 'growth'
      },
      {
        id: 3,
        client: 'CloudSecure API',
        plan: 'Underwriting in progress',
        time: 'Yesterday',
        status: 'pending',
        tier: 'startup'
      }
    ];

    // Occasionally add a new activity
    if (Math.random() > 0.7) {
      activities.unshift({
        id: Date.now(),
        client: `NewClient${Math.floor(Math.random() * 100)}`,
        plan: 'Signup completed',
        time: 'Just now',
        status: 'success',
        tier: ['startup', 'growth', 'enterprise'][Math.floor(Math.random() * 3)]
      });
    }

    return activities;
  },

  getMockHealthStatus() {
    return [
      {
        service: 'Payment Processing',
        status: 'success',
        metric: 'All systems operational'
      },
      {
        service: 'Subscription Engine',
        status: 'success',
        metric: `Processing ${(1200 + Math.floor(Math.random() * 100)).toLocaleString()} renewals/hour`
      },
      {
        service: '3D Secure Service',
        status: Math.random() > 0.8 ? 'warning' : 'success',
        metric: Math.random() > 0.8 ? 'Elevated latency in EU region' : 'All regions operational'
      },
      {
        service: 'Fraud Detection',
        status: 'success',
        metric: `Blocked ${(20 + Math.floor(Math.random() * 10))} suspicious transactions`
      }
    ];
  }
};
