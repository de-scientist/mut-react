import db from '../../config/drizzle.js'
import { ministries } from '../../db/schema.js'
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js'
import { getPaginationParams, getPaginationMeta } from '../../utils/pagination.js'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const createMinistrySchema = z.object({
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
export const getMinistries = async (req: Request, res: Response) => {
  try {
    const { active } = req.query

    const whereClauses: any[] = []
    if (active === 'true') {
      whereClauses.push(eq(ministries.isActive, true))
    }

    const q = db.select().from(ministries)
    const ministriesList = whereClauses.length ? await q.where(...whereClauses).orderBy(ministries.name) : await q.orderBy(ministries.name)

    return successResponse(res, ministriesList, 'Ministries retrieved successfully')
  } catch (error) {
    console.error('Get ministries error:', error)
    return errorResponse(res, 'Failed to retrieve ministries', 500)
  }
}

/**
 * Get single ministry (public)
 */
export const getMinistry = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params

    const arr = await db.select().from(ministries).where(eq(ministries.slug, slug)).limit(1)
    const ministry = arr[0]

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
export const createMinistry = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, imageUrl, slug } = req.body

    const [ministry] = await db.insert(ministries).values({
      name,
      description,
      icon,
      imageUrl,
      slug,
    }).returning()

    return successResponse(res, ministry, 'Ministry created successfully', 201)
  } catch (error) {
    console.error('Create ministry error:', error)
    return errorResponse(res, 'Failed to create ministry', 500)
  }
}

/**
 * Update ministry (admin only)
 */
export const updateMinistry = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const updateData = { ...req.body }

    const updatedArr = await db.update(ministries).set(updateData).where(eq(ministries.slug, slug)).returning()
    const ministry = updatedArr[0]

    return successResponse(res, ministry, 'Ministry updated successfully')
  } catch (error: any) {
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
export const deleteMinistry = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params

    await db.delete(ministries).where(eq(ministries.slug, slug)).returning()

    return successResponse(res, null, 'Ministry deleted successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Ministry not found', 404)
    }
    console.error('Delete ministry error:', error)
    return errorResponse(res, 'Failed to delete ministry', 500)
  }
}


