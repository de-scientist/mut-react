const prisma = require('../../config/database')
const { successResponse, errorResponse, paginatedResponse } = require('../../utils/response')
const { getPaginationParams, getPaginationMeta } = require('../../utils/pagination')
const { z } = require('zod')

// Validation schemas
const createPrayerRequestSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    request: z.string().min(1, 'Prayer request is required'),
    isPublic: z.boolean().optional(),
  }),
})

/**
 * Submit prayer request (public)
 */
const createPrayerRequest = async (req, res) => {
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
const getPrayerRequests = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { status } = req.query

    const where = {}
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
const updatePrayerRequestStatus = async (req, res) => {
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
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Prayer request not found', 404)
    }
    console.error('Update prayer request error:', error)
    return errorResponse(res, 'Failed to update prayer request', 500)
  }
}

module.exports = {
  createPrayerRequest,
  getPrayerRequests,
  updatePrayerRequestStatus,
  createPrayerRequestSchema,
}


