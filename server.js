const express = require('express');
const colors = require('colors')
const helmet = require('helmet')
const dotenv = require('dotenv').config()
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')
const port = process.env.PORT || 8000

const app = express()
// Configure Helmet with relaxed settings for API server
app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );
  
  // Configure CORS
  app.use(cors({
    origin: '*', // Replace with your frontend domain in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    maxAge: 86400
  }));

  connectDB()

// app.use(rateLimiterRedisMiddleware);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())


app.use('/api/payments', require('./routes/paymentRoute'))
app.use('/api/apartment', require('./routes/apartmentRoutes'))
app.use('/api/properties', require('./routes/propertyRoute'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tenants', require('./routes/tenantRoutes'))
app.use('/api/rent', require('./routes/rentRoutes'))
app.use('/api/businesses', require('./routes/businessRoutes'))
app.use('/api/sms', require('./routes/SMSRoute'))
app.use('/api/dashboard', require('./routes/dashboardRoute'))
app.use('/api/receipt', require('./routes/receipt'))

app.use(errorHandler) 


// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
  
  // Export for Vercel
  module.exports = app;