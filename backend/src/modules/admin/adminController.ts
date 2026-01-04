import db from '../../config/drizzle.js'
import {
  users,
  events,
  ministries,
  prayerRequests,
  contactSubmissions,
  newsletterSubscriptions,
} from '../../db/schema.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import { sql, eq } from 'drizzle-orm'
import type { Request, Response } from 'express'

/**
 * Get dashboard statistics (admin only)
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      usersCount,
      eventsCount,
      ministriesCount,
      prayerRequestsCount,
      contactsCount,
      subscriptionsCount,
      pendingPrayerRequestsCount,
      newContactsCount,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(events),
      db.select({ count: sql<number>`count(*)` }).from(ministries),
      db.select({ count: sql<number>`count(*)` }).from(prayerRequests),
      db.select({ count: sql<number>`count(*)` }).from(contactSubmissions),
      db
        .select({ count: sql<number>`count(*)` })
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.isActive, true)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(prayerRequests)
        .where(eq(prayerRequests.status, 'PENDING')),
      db
        .select({ count: sql<number>`count(*)` })
        .from(contactSubmissions)
        .where(eq(contactSubmissions.status, 'NEW')),
    ])

    return successResponse(
      res,
      {
        users: Number(usersCount[0]?.count ?? 0),
        events: Number(eventsCount[0]?.count ?? 0),
        ministries: Number(ministriesCount[0]?.count ?? 0),
        prayerRequests: Number(prayerRequestsCount[0]?.count ?? 0),
        contacts: Number(contactsCount[0]?.count ?? 0),
        subscriptions: Number(subscriptionsCount[0]?.count ?? 0),
        pendingPrayerRequests: Number(pendingPrayerRequestsCount[0]?.count ?? 0),
        newContacts: Number(newContactsCount[0]?.count ?? 0),
      },
      'Dashboard statistics retrieved successfully'
    )
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return errorResponse(res, 'Failed to retrieve dashboard statistics', 500)
  }
}
