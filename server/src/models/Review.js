const mongoose = require('mongoose');

/**
 * Review Schema
 * Represents a user review for a company
 */
const reviewSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company ID is required'],
      index: true,
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to update company rating after saving a review
reviewSchema.post('save', async function () {
  const Company = mongoose.model('Company');
  const company = await Company.findById(this.companyId);
  if (company) {
    await company.updateRating();
  }
});

// Middleware to update company rating after deleting a review
reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const Company = mongoose.model('Company');
    const company = await Company.findById(doc.companyId);
    if (company) {
      await company.updateRating();
    }
  }
});

module.exports = mongoose.model('Review', reviewSchema);
