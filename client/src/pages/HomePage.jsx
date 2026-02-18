import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Header from '../components/Layout/Header';
import CompanyCard from '../components/Company/CompanyCard';
import Button from '../components/Common/Button';
import AddCompanyModal from '../components/Modal/AddCompanyModal';
import '../styles/components/HomePage.css';


const HomePage = () => {
  const {
    companies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    sortBy,
    setSortBy,
    fetchCompanies,
  } = useApp();

  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);


  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleFindCompany = () => {
    fetchCompanies();
  };

  return (
    <div className="home-page">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="main-content">
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="city">Select City</label>
              <div className="city-input-wrapper">
                <input
                  type="text"
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="Indore, Madhya Pradesh, India"
                  className="city-input"
                />
                <FaMapMarkerAlt className="city-icon" />
              </div>
            </div>

            <Button onClick={handleFindCompany} variant="primary" size="medium">
              Find Company
            </Button>

            <Button
              onClick={() => setIsAddCompanyModalOpen(true)}
              variant="primary"
              size="medium"
              icon={<FaPlus />}
            >
              Add Company
            </Button>

            <div className="filter-group">
              <label htmlFor="sort">Sort:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Name</option>
                <option value="rating">Average Rating</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-section">
          {loading ? (
            <div className="loading">Loading companies...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="results-header">
                <span className="results-count">Result Found: {companies.length}</span>
              </div>

              <div className="companies-list">
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <CompanyCard key={company._id} company={company} />
                  ))
                ) : (
                  <div className="no-results">
                    No companies found. Try adjusting your search filters.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
