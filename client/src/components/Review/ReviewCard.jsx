import { formatDate } from '../../utils/dateFormatter';
import StarRating from '../Common/StarRating';
import '../../styles/components/ReviewCard.css';

/**
 * Review Card Component
 * Displays a single review
 */
const ReviewCard = ({ review }) => {
  // Generate avatar initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate random avatar color based on name
  const getAvatarColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div
          className="review-avatar"
          style={{ backgroundColor: getAvatarColor(review.userName) }}
        >
          {getInitials(review.userName)}
        </div>

        <div className="review-user-info">
          <h4 className="review-username">{review.userName}</h4>
          <span className="review-date">{formatDate(review.date)}</span>
        </div>

        <div className="review-rating">
          <StarRating rating={review.rating} size="small" />
        </div>
      </div>

      <div className="review-body">
        <p className="review-text">{review.reviewText}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
