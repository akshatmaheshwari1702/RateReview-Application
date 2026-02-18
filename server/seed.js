require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./src/models/Company');
const Review = require('./src/models/Review');

// Sample data based on the screenshots
const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create companies
    const companies = await Company.create([
      {
        name: 'Graffersid Web and App Development',
        logo: '#1A1F3D',
        location: '816, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
        city: 'Indore, Madhya Pradesh, India',
        foundedDate: new Date('2016-01-01'),
      },
      {
        name: 'Code Tech Company',
        logo: '#4CAF50',
        location: '414, Kanha Appartment, Bhawarkua, Indore (M.P.)',
        city: 'Indore, Madhya Pradesh, India',
        foundedDate: new Date('2016-01-01'),
      },
      {
        name: 'Innogent Pvt. Ltd.',
        logo: '#FF8C00',
        location: '910, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
        city: 'Indore, Madhya Pradesh, India',
        foundedDate: new Date('2016-01-01'),
      },
    ]);

    console.log('✅ Created companies');

    // Create reviews for Graffersid
    const graffersidReviews = await Review.create([
      {
        companyId: companies[0]._id,
        userName: 'Jorgue Watson',
        subject: 'Excellent Service',
        reviewText: 'Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Ultrices ac at nibh et. Aliquam aliquam ultricies ac pulvinar eleifend duis. Eget congue fringilla quam ut mattis tortor posuere semper ac. Sem egestas vestibulum faucibus montes. Gravida sit non arcu consequat.',
        rating: 4,
        date: new Date('2022-01-01T14:33:00'),
      },
      {
        companyId: companies[0]._id,
        userName: 'Jenny Kole',
        subject: 'Great Experience',
        reviewText: 'Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Ultrices ac at nibh et.',
        rating: 4,
        date: new Date('2022-01-12T15:00:00'),
      },
      {
        companyId: companies[0]._id,
        userName: 'Michael Smith',
        subject: 'Outstanding Work',
        reviewText: 'Professional team with excellent communication skills. They delivered our project on time and exceeded our expectations.',
        rating: 5,
        date: new Date('2022-02-05T10:15:00'),
      },
      {
        companyId: companies[0]._id,
        userName: 'Sarah Johnson',
        subject: 'Highly Recommended',
        reviewText: 'Amazing developers! They understood our requirements perfectly and provided innovative solutions.',
        rating: 5,
        date: new Date('2022-02-18T16:45:00'),
      },
      {
        companyId: companies[0]._id,
        userName: 'David Brown',
        subject: 'Good Service',
        reviewText: 'Professional and responsive team. Would recommend their services.',
        rating: 4,
        date: new Date('2022-03-10T11:20:00'),
      },
    ]);

    console.log('✅ Created reviews for Graffersid');

    // Update ratings for all companies
    for (const company of companies) {
      await company.updateRating();
    }

    console.log('✅ Updated company ratings');
    console.log('🎉 Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
