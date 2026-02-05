import db from "../config/drizzle.js";
import { users } from "../db/schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { ADMIN_EMAIL_MAPPING } from "../config/adminMapping.js";

async function seedAdmins() {
  const adminsToSeed = [
    {
      email: "secretary@mutcu.org",
      password: "secretaryMUTCU",
      name: "Church Secretary",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "treasurer@mutcu.org",
      password: "treasurerMUTCU",
      name: "Church Treasurer",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "communications@mutcu.org",
      password: "communicationsMUTCU",
      name: "Communications Lead",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "media@mutcu.org",
      password: "mediaMUTCU",
      name: "Media Manager",
      role: "MODERATOR",
      adminRole: "MODERATOR",
    },
    {
      email: "events@mutcu.org",
      password: "eventsMUTCU",
      name: "Events Coordinator",
      role: "MODERATOR",
      adminRole: "MODERATOR",
    },
    {
      email: "pastor@mutcu.org",
      password: "pastorMUTCU",
      name: "Senior Pastor",
      role: "SUPER_ADMIN",
      adminRole: "SUPER_ADMIN",
    },
  ];

  for (const admin of adminsToSeed) {
    try {
      // Check if user already exists
      const existingArr = await db
        .select()
        .from(users)
        .where(eq(users.email, admin.email))
        .limit(1);

      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const adminAccess = ADMIN_EMAIL_MAPPING[admin.email];

      if (existingArr.length > 0) {
        // Update existing user
        await db
          .update(users)
          .set({
            password: hashedPassword,
            role: admin.role,
            adminRole: admin.adminRole,
            privileges: JSON.stringify(adminAccess?.permissions || []),
            isActive: true,
            updatedAt: new Date(),
          })
          .where(eq(users.email, admin.email));

        console.log(`✓ Updated ${admin.email}`);
      } else {
        // Insert new user
        await db.insert(users).values({
          id: crypto.randomUUID(),
          email: admin.email,
          password: hashedPassword,
          name: admin.name,
          role: admin.role,
          adminRole: admin.adminRole,
          privileges: JSON.stringify(adminAccess?.permissions || []),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log(`✓ Seeded ${admin.email}`);
      }
    } catch (error) {
      console.error(`✗ Error seeding ${admin.email}:`, error);
    }
  }

  console.log("✅ Admin seeding complete!");
  process.exit(0);
}

seedAdmins().catch((error) => {
  console.error("❌ Seeding error:", error);
  process.exit(1);
});
