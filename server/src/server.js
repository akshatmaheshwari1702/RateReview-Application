require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const companyRoutes = require('./routes/companyRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB (non-blocking for serverless)
let dbConnected = false;
connectDB()
  .then(() => {
    dbConnected = true;
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!dbConnected && req.path !== '/') {
    console.warn('Database not connected yet');
  }
  next();
});

// Middleware
// CORS configuration - Must be BEFORE routes
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://rate-review-application-ta3m.vercel.app',
];

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Review&RATE API',
    version: '1.0.0',
    status: dbConnected ? 'connected' : 'connecting',
    mongodbUri: process.env.MONGODB_URI ? 'configured' : 'missing',
    endpoints: {
      companies: '/api/companies',
      reviews: '/api/reviews',
    },
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/companies', companyRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
