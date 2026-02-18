const Company = require('../models/Company');

/**
 * @desc    Get all companies with optional filters
 * @route   GET /api/companies
 * @access  Public
 */
exports.getAllCompanies = async (req, res) => {
  try {
    const { city, search, sortBy } = req.query;
    let query = {};

    // Filter by city
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // Search across multiple fields
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort = { name: 1 };
        break;
      case 'rating':
        sort = { averageRating: -1 };
        break;
      case 'location':
        sort = { city: 1, location: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const companies = await Company.find(query).sort(sort);

    res.json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching companies',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single company by ID
 * @route   GET /api/companies/:id
 * @access  Public
 */
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    res.json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching company',
      error: error.message,
    });
  }
};

/**
 * @desc    Create new company
 * @route   POST /api/companies
 * @access  Public
 */
exports.createCompany = async (req, res) => {
  try {
    const { name, logo, address, location, city, foundedDate } = req.body;

    console.log('📝 Create Company Request:', req.body);

    // Validation
    if (!name || !location || !city || !foundedDate) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, location, city, foundedDate',
      });
    }

    // Parse and validate date
    const parsedDate = new Date(foundedDate);
    if (isNaN(parsedDate.getTime())) {
      console.log('❌ Invalid date format:', foundedDate);
      return res.status(400).json({
        success: false,
        message: 'Invalid date format for foundedDate',
      });
    }

    const company = await Company.create({
      name,
      logo: logo || '#8B00FF',
      address,
      location,
      city,
      foundedDate: parsedDate,
    });

    console.log('✅ Company created:', company._id);

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: company,
    });
  } catch (error) {
    console.error('❌ Error creating company:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating company',
      error: error.message,
    });
  }
};

/**
 * @desc    Update company
 * @route   PUT /api/companies/:id
 * @access  Public
 */
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    res.json({
      success: true,
      message: 'Company updated successfully',
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating company',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete company
 * @route   DELETE /api/companies/:id
 * @access  Public
 */
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    // Also delete all reviews for this company
    const Review = require('../models/Review');
    await Review.deleteMany({ companyId: req.params.id });

    res.json({
      success: true,
      message: 'Company and associated reviews deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting company',
      error: error.message,
    });
  }
};
