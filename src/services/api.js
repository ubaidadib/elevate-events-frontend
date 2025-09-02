// API service layer for Elevate Events GmbH
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://elevate-events-backend.vercel.app/api'
  : 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Generic request method with improved error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`);
      const response = await fetch(url, config);
      
      // Handle empty responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      if (!response.ok) {
        const errorMessage = data?.error || data?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      // Re-throw with more context
      throw new Error(`API Error: ${error.message}`);
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Events API
  async getEvents(category = 'all') {
    try {
      const params = category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
      return await this.request(`/events${params}`);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }

  async getEvent(eventId) {
    if (!eventId) throw new Error('Event ID is required');
    return this.request(`/events/${encodeURIComponent(eventId)}`);
  }

  async checkEventAvailability(eventId, guests = 1) {
    if (!eventId) throw new Error('Event ID is required');
    return this.request(`/events/${encodeURIComponent(eventId)}/availability?guests=${guests}`);
  }

  // Bookings API
  async createBooking(bookingData) {
    if (!bookingData) throw new Error('Booking data is required');
    
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBooking(bookingReference) {
    if (!bookingReference) throw new Error('Booking reference is required');
    return this.request(`/bookings/${encodeURIComponent(bookingReference)}`);
  }

  async confirmBooking(bookingReference, paymentData) {
    if (!bookingReference) throw new Error('Booking reference is required');
    
    return this.request(`/bookings/${encodeURIComponent(bookingReference)}/confirm`, {
      method: 'POST',
      body: JSON.stringify(paymentData || {}),
    });
  }

  async cancelBooking(bookingReference) {
    if (!bookingReference) throw new Error('Booking reference is required');
    
    return this.request(`/bookings/${encodeURIComponent(bookingReference)}/cancel`, {
      method: 'POST',
    });
  }

  async checkInBooking(bookingReference) {
    if (!bookingReference) throw new Error('Booking reference is required');
    
    return this.request(`/bookings/${encodeURIComponent(bookingReference)}/checkin`, {
      method: 'POST',
    });
  }

  async getUserBookings(userId) {
    if (!userId) throw new Error('User ID is required');
    return this.request(`/users/${encodeURIComponent(userId)}/bookings`);
  }

  async checkLoungeAvailability(date, time, duration = 2, category = 'all') {
    if (!date || !time) throw new Error('Date and time are required');
    
    const params = new URLSearchParams({
      date,
      time,
      duration: duration.toString(),
      ...(category !== 'all' && { category }),
    });
    
    return this.request(`/availability/lounges?${params}`);
  }

  // Memberships API
  async getMembershipTiers() {
    return this.request('/membership-tiers');
  }

  async getMembershipTier(tierSlug) {
    if (!tierSlug) throw new Error('Tier slug is required');
    return this.request(`/membership-tiers/${encodeURIComponent(tierSlug)}`);
  }

  async createMembership(membershipData) {
    if (!membershipData) throw new Error('Membership data is required');
    
    return this.request('/memberships', {
      method: 'POST',
      body: JSON.stringify(membershipData),
    });
  }

  async getUserMembership(userId) {
    if (!userId) throw new Error('User ID is required');
    return this.request(`/users/${encodeURIComponent(userId)}/membership`);
  }

  async renewMembership(membershipId, paymentData) {
    if (!membershipId) throw new Error('Membership ID is required');
    
    return this.request(`/memberships/${encodeURIComponent(membershipId)}/renew`, {
      method: 'POST',
      body: JSON.stringify(paymentData || {}),
    });
  }

  async cancelMembership(membershipId) {
    if (!membershipId) throw new Error('Membership ID is required');
    
    return this.request(`/memberships/${encodeURIComponent(membershipId)}/cancel`, {
      method: 'POST',
    });
  }

  async upgradeMembership(membershipId, upgradeData) {
    if (!membershipId) throw new Error('Membership ID is required');
    if (!upgradeData) throw new Error('Upgrade data is required');
    
    return this.request(`/memberships/${encodeURIComponent(membershipId)}/upgrade`, {
      method: 'POST',
      body: JSON.stringify(upgradeData),
    });
  }

  async getMembershipBenefits(userId) {
    if (!userId) throw new Error('User ID is required');
    return this.request(`/users/${encodeURIComponent(userId)}/membership/benefits`);
  }

  // Users API
  async getUser(userId) {
    if (!userId) throw new Error('User ID is required');
    return this.request(`/users/${encodeURIComponent(userId)}`);
  }

  async createUser(userData) {
    if (!userData) throw new Error('User data is required');
    
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    if (!userId) throw new Error('User ID is required');
    if (!userData) throw new Error('User data is required');
    
    return this.request(`/users/${encodeURIComponent(userId)}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    if (!userId) throw new Error('User ID is required');
    
    return this.request(`/users/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    });
  }

  // Authentication methods (if needed)
  async login(credentials) {
    if (!credentials) throw new Error('Credentials are required');
    
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async register(userData) {
    if (!userData) throw new Error('User data is required');
    
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Utility methods
  formatPrice(price, currency = 'EUR') {
    if (price === null || price === undefined) return 'N/A';
    
    try {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: currency,
      }).format(parseFloat(price));
    } catch (error) {
      console.error('Error formatting price:', error);
      return `${price} ${currency}`;
    }
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error('Invalid date');
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Berlin',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  formatDateShort(dateString) {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error('Invalid date');
      
      return new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  parseFeatures(featuresString) {
    if (!featuresString) return [];
    
    try {
      if (typeof featuresString === 'string') {
        return JSON.parse(featuresString);
      }
      if (Array.isArray(featuresString)) {
        return featuresString;
      }
      return [];
    } catch (error) {
      console.error('Error parsing features:', error);
      return [];
    }
  }

  // Helper method to validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper method to generate booking reference
  generateBookingReference() {
    const prefix = 'ELE';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  // Method to check if API is available
  async checkConnection() {
    try {
      const response = await fetch(this.baseURL.replace('/api', '/api/health'), {
        method: 'GET',
        headers: this.defaultHeaders,
      });
      return response.ok;
    } catch (error) {
      console.error('API connection check failed:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

// Export both the instance and the class
export default apiService;
export { ApiService };
