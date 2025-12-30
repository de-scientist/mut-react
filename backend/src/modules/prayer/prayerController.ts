import prisma from '../../config/database.js'
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js'
import { getPaginationParams, getPaginationMeta } from '../../utils/pagination.js'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const createPrayerRequestSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    request: z.string().min(1, 'Prayer request is required'),
    isPublic: z.boolean().optional(),
  }),
})

/**
 * Submit prayer request (public)
 */
export const createPrayerRequest = async (req: Request, res: Response) => {
  try {
    const { name, request, isPublic } = req.body

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        name: name || null,
        request,
        isPublic: isPublic || false,
      },
    })

    return successResponse(res, prayerRequest, 'Prayer request submitted successfully', 201)
  } catch (error) {
    console.error('Create prayer request error:', error)
    return errorResponse(res, 'Failed to submit prayer request', 500)
  }
}

/**
 * Get prayer requests (admin only)
 */
export const getPrayerRequests = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { status } = req.query

    const where: any = {}
    if (status) {
      where.status = status
    }

    const [requests, total] = await Promise.all([
      prisma.prayerRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.prayerRequest.count({ where }),
    ])

    const pagination = getPaginationMeta(total, page, limit)

    return paginatedResponse(res, requests, pagination, 'Prayer requests retrieved successfully')
  } catch (error) {
    console.error('Get prayer requests error:', error)
    return errorResponse(res, 'Failed to retrieve prayer requests', 500)
  }
}

/**
 * Update prayer request status (admin only)
 */
export const updatePrayerRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['PENDING', 'PRAYED_FOR', 'ANSWERED'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400)
    }

    const prayerRequest = await prisma.prayerRequest.update({
      where: { id },
      data: { status },
    })

    return successResponse(res, prayerRequest, 'Prayer request status updated successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Prayer request not found', 404)
    }
    console.error('Update prayer request error:', error)
    return errorResponse(res, 'Failed to update prayer request', 500)
  }
}


