const mongoose = require('mongoose');

/**
 * Company Schema
 * Represents a company that can be reviewed
 */
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: {
      type: String,
      default: '#8B00FF', // Default purple color
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      index: true,
    },
    foundedDate: {
      type: Date,
      required: [true, 'Founded date is required'],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
companySchema.index({ name: 'text', location: 'text', city: 'text' });

/**
 * Calculate and update average rating for a company
 */
companySchema.methods.updateRating = async function () {
  const Review = mongoose.model('Review');
  const reviews = await Review.find({ companyId: this._id });
  
  if (reviews.length === 0) {
    this.averageRating = 0;
    this.reviewCount = 0;
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = Math.round((totalRating / reviews.length) * 10) / 10;
    this.reviewCount = reviews.length;
  }
  
  await this.save();
};

module.exports = mongoose.model('Company', companySchema);
