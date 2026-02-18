import { useState } from 'react';
import { FaTimes, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import Button from '../Common/Button';
import { useApp } from '../../context/AppContext';
import '../../styles/components/Modal.css';


const AddCompanyModal = ({ isOpen, onClose }) => {
  const { createCompany } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    foundedDate: '',
    logo: '#8B00FF',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.location || !formData.city || !formData.foundedDate) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      console.log('📤 Sending company data:', formData);
      await createCompany(formData);
      setFormData({
        name: '',
        location: '',
        city: '',
        foundedDate: '',
        logo: '#8B00FF',
      });
      onClose();
    } catch (err) {
      console.error('❌ Error creating company:', err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to create company';
      setError(errorMsg);
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

        <h2 className="modal-title">Add Company</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Company name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Select Location"
                required
              />
              <FaMapMarkerAlt className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="foundedDate">Founded on</label>
            <div className="input-with-icon">
              <input
                type="date"
                id="foundedDate"
                name="foundedDate"
                value={formData.foundedDate}
                onChange={handleChange}
                required
              />
              <FaCalendar className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
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

export default AddCompanyModal;
