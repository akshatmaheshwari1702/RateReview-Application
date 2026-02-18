import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from '../Common/Button';
import StarRating from '../Common/StarRating';
import { useApp } from '../../context/AppContext';
import '../../styles/components/Modal.css';

/**
 * Add Review Modal Component
 */
const AddReviewModal = ({ isOpen, onClose, companyId }) => {
  const { createReview } = useApp();
  const [formData, setFormData] = useState({
    userName: '',
    subject: '',
    reviewText: '',
    rating: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Satisfied',
    5: 'Excellent',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.userName || !formData.subject || !formData.reviewText) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    setSubmitting(true);

    try {
      await createReview({
        ...formData,
        companyId,
      });
      // Reset form and close modal
      setFormData({
        userName: '',
        subject: '',
        reviewText: '',
        rating: 0,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create review');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-decoration" />
        
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Add Review</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Full Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reviewText">Enter your Review</label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder="Description"
              rows="5"
              required
            />
          </div>

          <div className="form-group rating-group">
            <label>Rating</label>
            <div className="rating-selector">
              <StarRating
                rating={formData.rating}
                onChange={handleRatingChange}
                interactive={true}
                size="large"
              />
              {formData.rating > 0 && (
                <span className="rating-label">{ratingLabels[formData.rating]}</span>
              )}
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <Button type="submit" variant="primary" size="large" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
