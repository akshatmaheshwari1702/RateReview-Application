import api from './api';


export const companyService = {
  /**
   * Get all companies with optional filters
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/companies', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get company by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new company
   */
  create: async (companyData) => {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update company
   */
  update: async (id, companyData) => {
    try {
      const response = await api.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete company
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default companyService;
