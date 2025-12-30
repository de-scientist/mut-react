import prisma from '../../config/database.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import type { Request, Response } from 'express'

/**
 * Get dashboard statistics (admin only)
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalEvents,
      totalMinistries,
      totalPrayerRequests,
      totalContacts,
      totalSubscriptions,
      pendingPrayerRequests,
      newContacts,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.ministry.count(),
      prisma.prayerRequest.count(),
      prisma.contactSubmission.count(),
      prisma.newsletterSubscription.count({ where: { isActive: true } }),
      prisma.prayerRequest.count({ where: { status: 'PENDING' } }),
      prisma.contactSubmission.count({ where: { status: 'NEW' } }),
    ])

    return successResponse(res, {
      users: totalUsers,
      events: totalEvents,
      ministries: totalMinistries,
      prayerRequests: totalPrayerRequests,
      contacts: totalContacts,
      subscriptions: totalSubscriptions,
      pendingPrayerRequests,
      newContacts,
    }, 'Dashboard statistics retrieved successfully')
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return errorResponse(res, 'Failed to retrieve dashboard statistics', 500)
  }
}


