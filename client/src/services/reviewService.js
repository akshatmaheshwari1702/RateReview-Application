import api from './api';

/**
 * Review Service - Handles all review-related API calls
 */

export const reviewService = {
  /**
   * Get reviews for a company
   */
  getByCompany: async (companyId) => {
    try {
      const response = await api.get('/reviews', { params: { companyId } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get review by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new review
   */
  create: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update review
   */
  update: async (id, reviewData) => {
    try {
      const response = await api.put(`/reviews/${id}`, reviewData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete review
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewService;
