import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Header from '../components/Layout/Header';
import StarRating from '../components/Common/StarRating';
import ReviewCard from '../components/Review/ReviewCard';
import Button from '../components/Common/Button';
import AddReviewModal from '../components/Modal/AddReviewModal';
import { formatSimpleDate } from '../utils/dateFormatter';
import '../styles/components/CompanyDetailPage.css';


const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedCompany,
    reviews,
    loading,
    searchQuery,
    setSearchQuery,
    fetchCompanyById,
    fetchReviews,
  } = useApp();

  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyById(id);
      fetchReviews(id);
    }
  }, [id, fetchCompanyById, fetchReviews]);

  if (loading && !selectedCompany) {
    return (
      <div className="company-detail-page">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="loading">Loading company details...</div>
      </div>
    );
  }

  if (!selectedCompany) {
    return (
      <div className="company-detail-page">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="error">Company not found</div>
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="company-detail-page">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="detail-content">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="small"
          icon={<FaArrowLeft />}
          className="back-button"
        >
          Back to List
        </Button>

        <div className="company-header-card">
          <div className="company-header-content">
            <div
              className="company-logo-large"
              style={{ backgroundColor: selectedCompany.logo || '#8B00FF' }}
            >
              {getInitials(selectedCompany.name)}
            </div>

            <div className="company-header-info">
              <h1 className="company-title">{selectedCompany.name}</h1>
              <div className="company-location-row">
                <FaMapMarkerAlt className="location-icon" />
                <span>{selectedCompany.location}</span>
              </div>
              <div className="company-rating-info">
                <span className="rating-value-large">
                  {selectedCompany.averageRating.toFixed(1)}
                </span>
                <StarRating rating={selectedCompany.averageRating} size="medium" />
                <span className="review-count-large">
                  {selectedCompany.reviewCount} Reviews
                </span>
              </div>
            </div>

            <div className="company-header-actions">
              <div className="company-founded">
                Founded on {formatSimpleDate(selectedCompany.foundedDate)}
              </div>
              <Button
                onClick={() => setIsAddReviewModalOpen(true)}
                variant="primary"
                size="medium"
                icon={<FaPlus />}
              >
                Add Review
              </Button>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <span className="results-count">Result Found: {reviews.length}</span>
          </div>

          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => <ReviewCard key={review._id} review={review} />)
            ) : (
              <div className="no-reviews">
                No reviews yet. Be the first to review this company!
              </div>
            )}
          </div>
        </div>
      </main>

      <AddReviewModal
        isOpen={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
        companyId={id}
      />
    </div>
  );
};

export default CompanyDetailPage;
