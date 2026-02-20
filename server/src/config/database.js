const mongoose = require('mongoose');

// Mongoose configuration for serverless
mongoose.set('strictQuery', false);

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Mongoose connection options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Don't exit in serverless - just throw the error
    throw error;
  }
};

module.exports = connectDB;
