import { successResponse } from '../../utils/response.js'
import type { Request, Response } from 'express'

/**
 * Get all resources (public)
 * Currently returns empty array - can be extended to fetch from database
 */
export const getResources = async (req: Request, res: Response) => {
  try {
    // For now, return empty array
    // TODO: Add resources table to database schema and implement full CRUD
    return successResponse(res, [], 'Resources retrieved successfully')
  } catch (error) {
    console.error('Get resources error:', error)
    return successResponse(res, [], 'Resources retrieved successfully')
  }
}

