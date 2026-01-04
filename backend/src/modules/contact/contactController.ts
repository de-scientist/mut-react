import db from '../../config/drizzle.js'
import { contactSubmissions } from '../../db/schema.js'
import { successResponse, errorResponse, paginatedResponse } from '../../utils/response.js'
import { getPaginationParams, getPaginationMeta } from '../../utils/pagination.js'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import type { Request, Response } from 'express'

// Validation schemas
export const createContactSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
  }),
})

/**
 * Submit contact form (public)
 */
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body

    const [contact] = await db.insert(contactSubmissions).values({
      name,
      email,
      subject,
      message,
      status: 'NEW',
    }).returning()

    return successResponse(res, contact, 'Contact form submitted successfully', 201)
  } catch (error) {
    console.error('Create contact error:', error)
    return errorResponse(res, 'Failed to submit contact form', 500)
  }
}

/**
 * Get contact submissions (admin only)
 */
export const getContacts = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { status } = req.query

    // Build queries
    let contactsQuery = db.select().from(contactSubmissions)
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(contactSubmissions)

    if (status) {
      contactsQuery = contactsQuery.where(eq(contactSubmissions.status, status as string))
      countQuery = countQuery.where(eq(contactSubmissions.status, status as string))
    }

    // Execute queries in parallel
    const [contacts, countResult] = await Promise.all([
      contactsQuery.limit(limit).offset(skip),
      countQuery,
    ])

    const total = Number(countResult[0]?.count ?? 0)
    const pagination = getPaginationMeta(total, page, limit)

    return paginatedResponse(res, contacts, pagination, 'Contact submissions retrieved successfully')
  } catch (error) {
    console.error('Get contacts error:', error)
    return errorResponse(res, 'Failed to retrieve contact submissions', 500)
  }
}

/**
 * Update contact status (admin only)
 */
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400)
    }

    const updatedArr = await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id)).returning()
    const contact = updatedArr[0]

    return successResponse(res, contact, 'Contact status updated successfully')
  } catch (error: any) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Contact submission not found', 404)
    }
    console.error('Update contact error:', error)
    return errorResponse(res, 'Failed to update contact status', 500)
  }
}


