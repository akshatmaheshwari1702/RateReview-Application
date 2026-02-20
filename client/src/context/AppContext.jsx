import { createContext, useContext, useState, useCallback } from "react";
import companyService from "../services/companyService";
import reviewService from "../services/reviewService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("name");

  /**
   * Fetch all companies
   */
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCity) params.city = selectedCity;
      if (sortBy) params.sortBy = sortBy;

      const response = await companyService.getAll(params);
      setCompanies(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch companies");
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCity, sortBy]);

  /**
   * Fetch company by ID
   */
  const fetchCompanyById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await companyService.getById(id);
      setSelectedCompany(response.data || null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch company");
      console.error("Error fetching company:", err);
      setSelectedCompany(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new company
   */
  const createCompany = useCallback(async (companyData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await companyService.create(companyData);
      await fetchCompanies(); // Refresh list
      return response.data || null;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create company");
      console.error("Error creating company:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCompanies]);

  /**
   * Fetch reviews for a company
   */
  const fetchReviews = useCallback(async (companyId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await reviewService.getByCompany(companyId);
      setReviews(response.data || []);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
      setReviews([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new review
   */
  const createReview = useCallback(async (reviewData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await reviewService.create(reviewData);
      // Refresh reviews and company data
      await fetchReviews(reviewData.companyId);
      await fetchCompanyById(reviewData.companyId);
      return response.data || null;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create review");
      console.error("Error creating review:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchReviews, fetchCompanyById]);

  /**
   * Clear error
   */
  const clearError = () => setError(null);

  const value = {
    // State
    companies,
    selectedCompany,
    reviews,
    loading,
    error,
    searchQuery,
    selectedCity,
    sortBy,

    // Actions
    setSearchQuery,
    setSelectedCity,
    setSortBy,
    fetchCompanies,
    fetchCompanyById,
    createCompany,
    fetchReviews,
    createReview,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to use app context
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export default AppContext;
