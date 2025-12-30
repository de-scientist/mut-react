const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../../config/database')
const { jwtSecret, jwtExpire } = require('../../config/env')
const { successResponse, errorResponse } = require('../../utils/response')
const { z } = require('zod')

// Validation schemas
const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
  }),
})

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return errorResponse(res, 'User with this email already exists', 409)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    // Generate token
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: jwtExpire,
    })

    return successResponse(res, { user, token }, 'User registered successfully', 201)
  } catch (error) {
    console.error('Register error:', error)
    return errorResponse(res, 'Registration failed', 500)
  }
}

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.isActive) {
      return errorResponse(res, 'Invalid credentials', 401)
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials', 401)
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: jwtExpire,
    })

    return successResponse(res, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }, 'Login successful')
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse(res, 'Login failed', 500)
  }
}

/**
 * Get current user profile
 */
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return successResponse(res, user, 'Profile retrieved successfully')
  } catch (error) {
    console.error('Get profile error:', error)
    return errorResponse(res, 'Failed to retrieve profile', 500)
  }
}

module.exports = {
  register,
  login,
  getProfile,
  loginSchema,
  registerSchema,
}


