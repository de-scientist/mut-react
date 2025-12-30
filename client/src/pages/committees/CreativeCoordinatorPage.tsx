// src/pages/committees/CreativeCoordinatorPage.tsx
import React from "react";
import { LeaderProfileLayout } from "../../components/LeaderProfileLayout";

export const CreativeCoordinatorPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/Ingwee.JPG"
    heroTitle="Creative Ministry (CREAM)"
    heroSubtitle="Expressing Faith Through Creative Arts"
    person={{
      name: "Brian Ingwee",
      role: "Creative Ministry Coordinator",
      image: "/assets/images/Ingwee.JPG",
      border: "navy",
    }}
    aboutTitle="About the Creative Ministry"
    aboutParagraphs={[
      "The Creative Arts Ministry (CREAM) uses drama, dance, spoken word, film, and other artistic expressions to communicate the Gospel and edify the body of Christ.",
      "Under the leadership of Brian Ingwee, the team explores innovative, Christ-centered expressions that complement preaching, worship, and missions, engaging both the campus and wider community.",
    ]}
    responsibilitiesTitle="Key Roles & Activities"
    responsibilitiesIntro="CREAM brings the Gospel to life through arts and creativity."
    responsibilities={[
      "Coordinating drama, dance, film, and spoken word presentations for fellowships and events.",
      "Developing creative concepts for evangelism and campus outreaches.",
      "Collaborating with the Music, Missions, and Technical ministries for major productions.",
      "Mentoring members in using their creative gifts for God's glory.",
      "Organizing creative nights and productions such as themed drama and film events.",
    ]}
    ctaTitle="Use Your Gifts for God!"
    ctaSubtitle="Join the Creative Ministry and express your faith through arts."
    primaryCtaLabel="Explore Ministries"
    primaryCtaHref="/ministries"
    secondaryCtaLabel="Contact Us"
    secondaryCtaHref="/contact"
  />
);