const prisma = require('../../config/database')
const { successResponse, errorResponse, paginatedResponse } = require('../../utils/response')
const { getPaginationParams, getPaginationMeta } = require('../../utils/pagination')
const { z } = require('zod')

// Validation schemas
const createContactSchema = z.object({
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
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'NEW',
      },
    })

    return successResponse(res, contact, 'Contact form submitted successfully', 201)
  } catch (error) {
    console.error('Create contact error:', error)
    return errorResponse(res, 'Failed to submit contact form', 500)
  }
}

/**
 * Get contact submissions (admin only)
 */
const getContacts = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query)
    const { status } = req.query

    const where = {}
    if (status) {
      where.status = status
    }

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactSubmission.count({ where }),
    ])

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
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'].includes(status)) {
      return errorResponse(res, 'Invalid status', 400)
    }

    const contact = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    })

    return successResponse(res, contact, 'Contact status updated successfully')
  } catch (error) {
    if (error.code === 'P2025') {
      return errorResponse(res, 'Contact submission not found', 404)
    }
    console.error('Update contact error:', error)
    return errorResponse(res, 'Failed to update contact status', 500)
  }
}

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  createContactSchema,
}


