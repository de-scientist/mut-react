const prisma = require('../../config/database')
const { successResponse, errorResponse, paginatedResponse } = require('../../utils/response')
const { getPaginationParams, getPaginationMeta } = require('../../utils/pagination')
const { z } = require('zod')

// Validation schemas
const createMinistrySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    icon: z.string().optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
    slug: z.string().min(1, 'Slug is required'),
  }),
})

/**
 * Get all ministries (public)
 */
const getMinistries = async (req, res) => {
  try {
    const { active } = req.query

    const where = {}
    if (active === 'true') {
      where.isActive = true
    }

    const ministries = await prisma.ministry.findMany({
      where,
      orderBy: { name: 'asc' },
    })

    return successResponse(res, ministries, 'Ministries retrieved successfully')
  } catch (error) {
    console.error('Get ministries error:', error)
    return errorResponse(res, 'Failed to retrieve ministries', 500)
  }
}

/**
 * Get single ministry (public)
 */
const getMinistry = async (req, res) => {
  try {
    const { slug } = req.params

    const ministry = await prisma.ministry.findUnique({
      where: { slug },
    })

    if (!ministry) {
      return errorResponse(res, 'Ministry not found', 404)
    }

    return successResponse(res, ministry, 'Ministry retrieved successfully')
  } catch (error) {
    console.error('Get ministry error:', error)
    return errorResponse(res, 'Failed to retrieve ministry', 500)
  }
}

/**
 * Create ministry (admin only)
 */
const createMinistry = async (req, res) => {
  try {
    const { name, description, icon, imageUrl, slug } = req.body

    const ministry = await prisma.ministry.create({
      data: {
        name,
        description,
        icon,
        imageUrl,
        slug,
      },
    })

    return successResponse(res, ministry, 'Ministry created successfully', 201)
  } catch (error) {
    console.error('Create ministry error:', error)
    return errorResponse(res, 'Failed to create ministry', 500)
  }
}

/**
 * Update ministry (admin only)
 */
const updateMinistry = async (req, res) => {
  try {
    const { slug } = req.params
    const updateData = { ...req.body }

    const ministry = await prisma.ministry.update({
      where: { slug },
      data: updateData,
    })

    return successResponse(res, ministry, 'Ministry updated successfully')
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Ministry not found', 404)
    }
    console.error('Update ministry error:', error)
    return errorResponse(res, 'Failed to update ministry', 500)
  }
}

/**
 * Delete ministry (admin only)
 */
const deleteMinistry = async (req, res) => {
  try {
    const { slug } = req.params

    await prisma.ministry.delete({
      where: { slug },
    })

    return successResponse(res, null, 'Ministry deleted successfully')
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Ministry not found', 404)
    }
    console.error('Delete ministry error:', error)
    return errorResponse(res, 'Failed to delete ministry', 500)
  }
}

module.exports = {
  getMinistries,
  getMinistry,
  createMinistry,
  updateMinistry,
  deleteMinistry,
  createMinistrySchema,
}


