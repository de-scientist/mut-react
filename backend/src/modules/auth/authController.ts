import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../config/database.js'
import env from '../../config/env.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
  }),
})

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
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
    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: env.jwtExpire,
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
export const login = async (req: Request, res: Response) => {
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
    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: env.jwtExpire,
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
export const getProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
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


