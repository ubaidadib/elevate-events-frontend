// API service layer for Elevate Events GmbH
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://19hninc8yvd8.manus.space/api'
  : 'http://localhost:5001/api';

class ApiService {
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Events API
  async getEvents(category = 'all') {
    const params = category !== 'all' ? `?category=${category}` : '';
    return this.request(`/events${params}`);
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`);
  }

  async checkEventAvailability(eventId, guests = 1) {
    return this.request(`/events/${eventId}/availability?guests=${guests}`);
  }

  // Bookings API
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBooking(bookingReference) {
    return this.request(`/bookings/${bookingReference}`);
  }

  async confirmBooking(bookingReference, paymentData) {
    return this.request(`/bookings/${bookingReference}/confirm`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async cancelBooking(bookingReference) {
    return this.request(`/bookings/${bookingReference}/cancel`, {
      method: 'POST',
    });
  }

  async checkInBooking(bookingReference) {
    return this.request(`/bookings/${bookingReference}/checkin`, {
      method: 'POST',
    });
  }

  async getUserBookings(userId) {
    return this.request(`/users/${userId}/bookings`);
  }

  async checkLoungeAvailability(date, time, duration = 2, category = 'all') {
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
    return this.request(`/membership-tiers/${tierSlug}`);
  }

  async createMembership(membershipData) {
    return this.request('/memberships', {
      method: 'POST',
      body: JSON.stringify(membershipData),
    });
  }

  async getUserMembership(userId) {
    return this.request(`/users/${userId}/membership`);
  }

  async renewMembership(membershipId, paymentData) {
    return this.request(`/memberships/${membershipId}/renew`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async cancelMembership(membershipId) {
    return this.request(`/memberships/${membershipId}/cancel`, {
      method: 'POST',
    });
  }

  async upgradeMembership(membershipId, upgradeData) {
    return this.request(`/memberships/${membershipId}/upgrade`, {
      method: 'POST',
      body: JSON.stringify(upgradeData),
    });
  }

  async getMembershipBenefits(userId) {
    return this.request(`/users/${userId}/membership/benefits`);
  }

  // Users API
  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Utility methods
  formatPrice(price, currency = 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency,
    }).format(price);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  parseFeatures(featuresString) {
    try {
      return JSON.parse(featuresString);
    } catch (error) {
      console.error('Error parsing features:', error);
      return [];
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

