import prisma from '../../config/database.js'
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js'
import { getPaginationParams, getPaginationMeta } from '../../utils/pagination.js'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const subscribeSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
})

/**
 * Subscribe to newsletter (public)
 */
export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    // Check if already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.isActive) {
        return errorResponse(res, 'Email already subscribed', 409)
      } else {
        // Reactivate subscription
        const subscription = await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true },
        })
        return successResponse(res, subscription, 'Subscription reactivated successfully')
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email,
        isActive: true,
      },
    })

    return successResponse(res, subscription, 'Subscribed successfully', 201)
  } catch (error) {
    console.error('Subscribe error:', error)
    return errorResponse(res, 'Failed to subscribe', 500)
  }
}

/**
 * Unsubscribe from newsletter (public)
 */
export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const subscription = await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false },
    })

    return successResponse(res, subscription, 'Unsubscribed successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Email not found', 404)
    }
    console.error('Unsubscribe error:', error)
    return errorResponse(res, 'Failed to unsubscribe', 500)
  }
}

/**
 * Get all subscriptions (admin only)
 */
export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { active } = req.query

    const where: any = {}
    if (active === 'true') {
      where.isActive = true
    }

    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsletterSubscription.count({ where }),
    ])

    const pagination = getPaginationMeta(total, page, limit)

    return paginatedResponse(res, subscriptions, pagination, 'Subscriptions retrieved successfully')
  } catch (error) {
    console.error('Get subscriptions error:', error)
    return errorResponse(res, 'Failed to retrieve subscriptions', 500)
  }
}


