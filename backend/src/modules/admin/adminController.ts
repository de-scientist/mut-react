import db from '../../config/drizzle.js'
import { users, events, ministries, prayerRequests, contactSubmissions, newsletterSubscriptions } from '../../db/schema.js'
import { successResponse, errorResponse } from '../../utils/response.js'
import { sql } from 'drizzle-orm'
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
      db.select({ count: sql`count(*)` }).from(users),
      db.select({ count: sql`count(*)` }).from(events),
      db.select({ count: sql`count(*)` }).from(ministries),
      db.select({ count: sql`count(*)` }).from(prayerRequests),
      db.select({ count: sql`count(*)` }).from(contactSubmissions),
      db.select({ count: sql`count(*)` }).from(newsletterSubscriptions).where(sql`is_active = true`),
      db.select({ count: sql`count(*)` }).from(prayerRequests).where(sql`status = 'PENDING'`),
      db.select({ count: sql`count(*)` }).from(contactSubmissions).where(sql`status = 'NEW'`),
    ])

    const totals = await Promise.all((await Promise.all([
      db.select({ count: sql`count(*)` }).from(users),
      db.select({ count: sql`count(*)` }).from(events),
      db.select({ count: sql`count(*)` }).from(ministries),
      db.select({ count: sql`count(*)` }).from(prayerRequests),
      db.select({ count: sql`count(*)` }).from(contactSubmissions),
    ])).map(async (r: any) => Number(r[0]?.count || 0)))

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


