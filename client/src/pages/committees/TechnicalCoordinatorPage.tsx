// src/pages/committees/TechnicalCoordinatorPage.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const TechnicalCoordinatorPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/JOSEPH.jpg"
    heroTitle="Technical Ministry"
    heroSubtitle="Enhancing Worship Through Technology and Service"
    person={{
      name: "Joseph Mbogo",
      role: "Technical Coordinator",
      image: "/assets/images/JOSEPH.jpg",
      border: "orange",
    }}
    aboutTitle="About the Technical Ministry"
    aboutParagraphs={[
      "The Technical Ministry of MUTCU oversees all technical and logistical aspects to ensure seamless operations during services and events. Comprising sub-ministries such as Ushering, Sound, Digital Ministry (including livestreaming and social media management), and MBBC/Publicity (posters and event promotion), this ministry manages the Union's public image and delivers high-quality technical support.",
      "Our goal is to enhance the worship experience through innovative technology, excellent service, and effective communication, supporting MUTCU's mission of inspiring love, hope, and godliness.",
    ]}
    responsibilitiesTitle="Key Roles & Activities"
    responsibilitiesIntro="The Technical Ministry supports MUTCU through various functions as outlined in the constitution and policies."
    responsibilities={[
      "Managing sound systems and equipment for all Union meetings and events.",
      "Handling livestreaming of weekly fellowships, Sunday services, and special events.",
      "Creating and distributing publicity materials, including posters and social media promotions.",
      "Coordinating ushering teams to create a welcoming and organized environment during gatherings.",
      "Maintaining, storing, and ensuring the safety of all technical equipment.",
      "Training new members in technical skills and ministry operations.",
    ]}
    ctaTitle="Join Our Technical Ministry!"
    ctaSubtitle="If you have a passion for technology, media, or service, we invite you to join."
    primaryCtaLabel="Explore Ministries"
    primaryCtaHref="/ministries"
    secondaryCtaLabel="View Technical Events"
    secondaryCtaHref="/events"
  />
);