import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../../styles/components/StarRating.css';

const StarRating = ({ 
  rating = 0, 
  onChange = null, 
  interactive = false,
  size = 'medium' 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const renderStar = (index) => {
    const starValue = index + 1;
    const currentRating = interactive && hoverRating ? hoverRating : rating;

    let StarIcon;
    if (currentRating >= starValue) {
      StarIcon = FaStar;
    } else if (currentRating >= starValue - 0.5) {
      StarIcon = FaStarHalfAlt;
    } else {
      StarIcon = FaRegStar;
    }

    return (
      <span
        key={index}
        className={`star ${interactive ? 'interactive' : ''}`}
        onClick={() => interactive && onChange && onChange(starValue)}
        onMouseEnter={() => interactive && setHoverRating(starValue)}
        onMouseLeave={() => interactive && setHoverRating(0)}
      >
        <StarIcon />
      </span>
    );
  };

  return (
    <div className={`star-rating star-rating-${size}`}>
      {[0, 1, 2, 3, 4].map(renderStar)}
    </div>
  );
};

export default StarRating;
