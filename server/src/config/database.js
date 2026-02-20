const mongoose = require('mongoose');

// Mongoose configuration for serverless
mongoose.set('strictQuery', false);

// Cache the connection to reuse across function invocations
let cachedConnection = null;

/**
 * Connect to MongoDB database with connection caching for serverless
 */
const connectDB = async () => {
  // Reuse existing connection if available
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Mongoose connection options optimized for serverless
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      bufferCommands: false, // Disable buffering for better error handling
    };

    console.log('🔌 Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    cachedConnection = null;
    // Don't exit in serverless - just throw the error
    throw error;
  }
};

module.exports = connectDB;
