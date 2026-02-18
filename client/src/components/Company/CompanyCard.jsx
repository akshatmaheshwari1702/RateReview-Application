import { useNavigate } from 'react-router-dom';
import { formatSimpleDate } from '../../utils/dateFormatter';
import StarRating from '../Common/StarRating';
import Button from '../Common/Button';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../../styles/components/CompanyCard.css';

/**
 * Company Card Component
 * Displays company information in a card format
 */
const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/company/${company._id}`);
  };

  // Generate initials from company name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="company-card">
      <div className="company-card-header">
        <div
          className="company-logo"
          style={{ backgroundColor: company.logo || '#8B00FF' }}
        >
          {getInitials(company.name)}
        </div>

        <div className="company-info">
          <h3 className="company-name">{company.name}</h3>
          <div className="company-location">
            <FaMapMarkerAlt className="location-icon" />
            <span>{company.location}</span>
          </div>
          <div className="company-rating-row">
            <span className="rating-value">{company.averageRating.toFixed(1)}</span>
            <StarRating rating={company.averageRating} size="small" />
            <span className="review-count">{company.reviewCount} Reviews</span>
          </div>
        </div>

        <div className="company-date">
          {company.reviewCount > 0 ? (
            <span>Founded on {formatSimpleDate(company.foundedDate)}</span>
          ) : (
            <span>Reg. Date {formatSimpleDate(company.foundedDate)}</span>
          )}
        </div>
      </div>

      <div className="company-card-footer">
        <Button onClick={handleDetailClick} variant="secondary" size="medium">
          Detail Review
        </Button>
      </div>
    </div>
  );
};

export default CompanyCard;
