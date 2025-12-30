import prisma from '../../config/database.js'
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js'
import { getPaginationParams, getPaginationMeta } from '../../utils/pagination.js'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    date: z.string().datetime('Invalid date format'),
    time: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
  }),
})

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    date: z.string().datetime().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().optional(),
  }),
})

/**
 * Get all events (public)
 */
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { active } = req.query

    const where: any = {}
    if (active === 'true') {
      where.isActive = true
      where.date = { gte: new Date() }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'asc' },
      }),
      prisma.event.count({ where }),
    ])

    const pagination = getPaginationMeta(total, page, limit)

    return paginatedResponse(res, events, pagination, 'Events retrieved successfully')
  } catch (error) {
    console.error('Get events error:', error)
    return errorResponse(res, 'Failed to retrieve events', 500)
  }
}

/**
 * Get single event
 */
export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return errorResponse(res, 'Event not found', 404)
    }

    return successResponse(res, event, 'Event retrieved successfully')
  } catch (error) {
    console.error('Get event error:', error)
    return errorResponse(res, 'Failed to retrieve event', 500)
  }
}

/**
 * Create event (admin only)
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, time, location, imageUrl } = req.body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        imageUrl,
      },
    })

    return successResponse(res, event, 'Event created successfully', 201)
  } catch (error) {
    console.error('Create event error:', error)
    return errorResponse(res, 'Failed to create event', 500)
  }
}

/**
 * Update event (admin only)
 */
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateData: any = { ...req.body }

    if (updateData.date) {
      updateData.date = new Date(updateData.date)
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    })

    return successResponse(res, event, 'Event updated successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Event not found', 404)
    }
    console.error('Update event error:', error)
    return errorResponse(res, 'Failed to update event', 500)
  }
}

/**
 * Delete event (admin only)
 */
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prisma.event.delete({
      where: { id },
    })

    return successResponse(res, null, 'Event deleted successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Event not found', 404)
    }
    console.error('Delete event error:', error)
    return errorResponse(res, 'Failed to delete event', 500)
  }
}


