import * as dotenv from 'dotenv';
import path from 'path';

// Force load the .env file from the absolute path
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import bcrypt from 'bcryptjs';
import { db, pool } from '../src/config/drizzle'
import { users, ministries, events as eventsTable, executiveMembers } from '../src/db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  console.log('🚀 Script started...');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is missing from process.env');
    return;
  }

  try {
    console.log('🌱 Seeding database...');

    const hashedPassword = await bcrypt.hash('admin123', 10)
    const existingAdmin = await db.select().from(users).where(eq(users.email, 'admin@mutcu.ac.ke')).limit(1)
    if (!existingAdmin[0]) {
      await db.insert(users).values({
        email: 'admin@mutcu.ac.ke',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
      }).returning()
      console.log('✅ Admin user created: admin@mutcu.ac.ke')
    } else {
      console.log('ℹ️ Admin user already exists')
    }

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

    for (const ministry of ministriesData) {
      const existing = await db.select().from(ministries).where(eq(ministries.slug, ministry.slug)).limit(1)
      if (!existing[0]) {
        await db.insert(ministries).values(ministry).returning()
      }
    }
    console.log(`✅ Ensured ${ministriesData.length} ministries`)

    const eventsData = [
      { title: 'Prayer Kesha', description: 'Join us for a night of intercession and spiritual revival.', date: new Date('2025-09-26T19:00:00'), time: '7:00 PM - 9:30 PM', location: 'MUTCU Hall', imageUrl: '/assets/images/church1.jpg' },
      { title: 'Praise Fest', description: 'Celebrate our God through our Music Ministry in a lively evening of praise and worship.', date: new Date('2025-11-07T19:00:00'), time: '7:00 PM - 9:30 PM', location: 'MUTCU Hall', imageUrl: '/assets/images/Dance1.jpg' },
      { title: 'Creative Night', description: 'Experience a night full of creativity on the theme Ashes to Beauty though special ministrations and performance by our Creative Arts Ministry (CREAM).', date: new Date('2025-10-10T20:00:00'), time: '8:00 PM - 5:30 AM', location: 'MUTCU Hall', imageUrl: '/assets/images/final poster.png' },
    ]

    for (const ev of eventsData) {
      const existing = await db.select().from(eventsTable).where(eq(eventsTable.title, ev.title)).limit(1)
      if (!existing[0]) {
        await db.insert(eventsTable).values(ev).returning()
      }
    }
    console.log(`✅ Ensured ${eventsData.length} events`)

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

    for (const exec of executives) {
      const existing = await db.select().from(executiveMembers).where(eq(executiveMembers.name, exec.name)).limit(1)
      if (!existing[0]) {
        await db.insert(executiveMembers).values(exec).returning()
      }
    }
    console.log(`✅ Ensured ${executives.length} executive members`)

    console.log('✨ Seeding completed!')
  } catch (error) {
    console.error('❌ Seeding error:', error)
  } finally {
    // Do not end the pool here; `drizzle` config handles pool shutdown on process exit.
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })