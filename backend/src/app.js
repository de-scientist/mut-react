const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const { frontendUrl } = require('./config/env')
const errorHandler = require('./middlewares/errorHandler')

// Import routes
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const ministryRoutes = require('./routes/ministryRoutes')
const prayerRoutes = require('./routes/prayerRoutes')
const contactRoutes = require('./routes/contactRoutes')
const newsletterRoutes = require('./routes/newsletterRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/ministries', ministryRoutes)
app.use('/api/prayer', prayerRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

module.exports = app


