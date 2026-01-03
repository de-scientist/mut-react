import * as dotenv from 'dotenv'
import path from 'path'

// Force load the .env file from the absolute path
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { db } from '../src/config/drizzle'
import {
  users,
  ministries,
  events as eventsTable,
  executiveMembers,
} from '../src/db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  console.log('🚀 Script started...')

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is missing from process.env')
    return
  }

  try {
    console.log('🧹 Clearing previously seeded data...')

    // IMPORTANT: clear child/dependent tables first
    await db.delete(executiveMembers)
    await db.delete(eventsTable)
    await db.delete(ministries)

    // Clear users LAST (auth-sensitive table)
    await db.delete(users).where(eq(users.email, 'admin@mutcu.ac.ke'))

    console.log('✅ Database cleared')

    console.log('🌱 Seeding database...')

    // =========================
    // ADMIN USER
    // =========================
    const hashedPassword = await bcrypt.hash('admin@mutcu.ac.ke', 10)

    const [admin] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        email: 'admin@mutcu.ac.ke',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.log('✅ Admin user seeded:', admin.email)

    // =========================
    // MINISTRIES
    // =========================
    const ministriesData = [
      { name: 'Music Ministry', slug: 'music-ministry', description: 'Leading and ministering worship through Choir, Band, Instrumentalism and Praise & Worship.', icon: 'fa-music', imageUrl: '/assets/images/music1.jpg' },
      { name: 'Bible Study & Discipleship', slug: 'bible-study-discipleship', description: 'Deepening faith through small groups, nurturing classes for new believers, and intensive training programs.', icon: 'fa-book-open', imageUrl: '/assets/images/bs1.jpg' },
      { name: 'Missions & Evangelism', slug: 'missions-evangelism', description: 'Sharing the Gospel through campus outreach, annual missions, and hope ministry visits to prisons and hospitals.', icon: 'fa-globe', imageUrl: '/assets/images/mission1.jpg' },
      { name: 'Creative Arts Ministry (CREAM)', slug: 'creative-arts', description: 'Expressing faith through drama, dance, spoken word, and other artistic talents.', icon: 'fa-paint-brush', imageUrl: '/assets/images/dance3.jpg' },
      { name: 'Prayer Ministry', slug: 'prayer-ministry', description: 'Cultivating a deep culture of prayer and intercession for the Union, university, and wider community.', icon: 'fa-pray', imageUrl: '/assets/images/church2.jpg' },
      { name: 'Welfare Committee', slug: 'welfare-committee', description: 'Actively raising funds and providing support to members facing financial and personal difficulties.', icon: 'fa-hand-holding-heart', imageUrl: '/assets/images/prayer1.jpg' },
      { name: 'Hospitality Ministry', slug: 'hospitality-ministry', description: 'Ensuring a welcoming environment for all members and visitors, managing amenities and visitor care.', icon: 'fa-handshake-angle', imageUrl: '/assets/images/tlp.jpg' },
      { name: 'Technical Department', slug: 'technical-department', description: 'Providing essential technical support for all Union activities, including sound, Publicity, Ushering and live streaming.', icon: 'fa-laptop-code', imageUrl: '/assets/images/mbbc1.jpg' },
      { name: 'Resource Mobilisation Committee (RMC)', slug: 'RMC', description: 'Working in conjunction with all other ministries to enhance the transformative gospel through creative and innovative ways of acquiring resources.', icon: 'fa-lightbulb', imageUrl: '/assets/images/prayer1.jpg' },
    ]

    await db.insert(ministries).values(
      ministriesData.map((m) => ({
        id: randomUUID(),
        ...m,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )

    console.log(`✅ Seeded ${ministriesData.length} ministries`)

    // =========================
    // EVENTS
    // =========================
    const eventsData = [
      { title: 'Prayer Kesha', description: 'Join us for a night of intercession and spiritual revival.', date: new Date('2025-09-26T19:00:00'), time: '7:00 PM - 9:30 PM', location: 'MUTCU Hall', imageUrl: '/assets/images/church1.jpg' },
      { title: 'Praise Fest', description: 'Celebrate our God through our Music Ministry in a lively evening of praise and worship.', date: new Date('2025-11-07T19:00:00'), time: '7:00 PM - 9:30 PM', location: 'MUTCU Hall', imageUrl: '/assets/images/Dance1.jpg' },
      { title: 'Creative Night', description: 'Experience a night full of creativity on the theme Ashes to Beauty though special ministrations and performance by our Creative Arts Ministry (CREAM).', date: new Date('2025-10-10T20:00:00'), time: '8:00 PM - 5:30 AM', location: 'MUTCU Hall', imageUrl: '/assets/images/final poster.png' },
    ]

    await db.insert(eventsTable).values(
      eventsData.map((e) => ({
        id: randomUUID(),
        ...e,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )

    console.log(`✅ Seeded ${eventsData.length} events`)

    // =========================
    // EXECUTIVE MEMBERS
    // =========================
    const executives = [
      { name: 'Ezekiel Thaara', role: 'Chairman', imageUrl: '/assets/images/EZEKIEL.jpg', order: 1 },
      { name: 'Jesca Kinya', role: '1st Vice Chair', imageUrl: '/assets/images/JES.jpg', order: 2 },
      { name: 'Martin Gitau', role: '2nd Vice Chair', imageUrl: '/assets/images/MARTIN.jpg', order: 3 },
      { name: 'Grace Kanyiri', role: 'Secretary', imageUrl: '/assets/images/GRACE.jpg', order: 4 },
      { name: 'Daisy Mutheu', role: 'Vice Secretary', imageUrl: '/assets/images/DAISY.jpg', order: 5 },
      { name: 'Joy Karimi', role: 'Treasurer', imageUrl: '/assets/images/JOY.jpg', order: 6 },
      { name: 'Purity Njeri', role: 'Bible Study & Discipleship Coordinator', imageUrl: '/assets/images/PURITY.jpg', order: 7 },
      { name: 'Roy Ndege', role: 'Prayer Coordinator', imageUrl: '/assets/images/PRAYER.jpg', order: 8 },
      { name: 'Yusuf Muchiri', role: 'Missions & Evangelism Coordinator', imageUrl: '/assets/images/YUSUF.jpg', order: 9 },
      { name: 'Jabez Ayugu', role: 'Music Coordinator', imageUrl: '/assets/images/JABEZ.jpg', order: 10 },
      { name: 'Joseph Mbogo', role: 'Technical Coordinator', imageUrl: '/assets/images/JOSEPH.jpg', order: 11 },
      { name: 'Brian Ingwee', role: 'Creative Ministry Coordinator', imageUrl: '/assets/images/Ingwee.JPG', order: 12 },
    ]

    await db.insert(executiveMembers).values(
      executives.map((e) => ({
        id: randomUUID(),
        ...e,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )

    console.log(`✅ Seeded ${executives.length} executive members`)
    console.log('✨ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

main()
