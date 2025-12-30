// src/pages/committees/PrayerCoordinatorPage.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const PrayerCoordinatorPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/PRAYER.jpg"
    heroTitle="Prayer Ministry"
    heroSubtitle="Cultivating a Deep Culture of Prayer"
    person={{
      name: "Roy Ndege",
      role: "Prayer Coordinator",
      image: "/assets/images/PRAYER.jpg",
      border: "navy",
    }}
    aboutTitle="About the Prayer Ministry"
    aboutParagraphs={[
      "The Prayer Ministry is the spiritual backbone of MUTCU, dedicated to building a strong culture of intercession, worship, and dependence on God.",
      "Under the leadership of Roy Ndege, the ministry organizes prayer gatherings, keshas, chains, and special seasons of fasting and intercession for the Union, the university, and the nation.",
    ]}
    responsibilitiesTitle="Key Roles & Activities"
    responsibilitiesIntro="The Prayer Ministry leads and structures the prayer life of MUTCU."
    responsibilities={[
      "Coordinating weekly corporate prayer meetings and seasons of fasting.",
      "Organizing prayer keshas and special nights of intercession.",
      "Mobilizing members for focused prayer for missions, leadership, and the university.",
      "Encouraging personal prayer disciplines among members.",
      "Partnering with other ministries to undergird their activities in prayer.",
    ]}
    ctaTitle="Stand in the Gap!"
    ctaSubtitle="Join the Prayer Ministry and help cover MUTCU in intercession."
    primaryCtaLabel="Explore Ministries"
    primaryCtaHref="/ministries"
    secondaryCtaLabel="Contact Us"
    secondaryCtaHref="/contact"
  />
);