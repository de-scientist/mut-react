// src/pages/committees/MissionsCoordinatorPage.tsx
import React from "react";
import { LeaderProfileLayout } from "../../components/LeaderProfileLayout";

export const MissionsCoordinatorPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/YUSUF.jpg"
    heroTitle="Missions & Evangelism Ministry"
    heroSubtitle="Sharing the Gospel and Impacting Communities"
    person={{
      name: "Yusuf Muchiri",
      role: "Missions & Evangelism Coordinator",
      image: "/assets/images/YUSUF.jpg",
      border: "orange",
    }}
    aboutTitle="About the Missions & Evangelism Ministry"
    aboutParagraphs={[
      "The Missions and Evangelism Ministry is at the forefront of MUTCU's outreach efforts, dedicated to sharing the Gospel of Jesus Christ both within the university and in wider communities. This ministry organizes campus outreach programs, annual missions, and extends its reach through the Hope Ministry, visiting prisons and hospitals to bring spiritual and material support.",
      "Yusuf Muchiri, as the coordinator, leads the strategic planning and execution of these initiatives, ensuring that MUTCU actively fulfills its mission of reaching out to non-believers. The ministry is also responsible for the Kairos Course, enhancing global understanding of God's mission.",
    ]}
    responsibilitiesTitle="Key Roles & Activities"
    responsibilitiesIntro="This ministry is dedicated to spreading the Gospel and serving others."
    responsibilities={[
      "Organizing and leading campus outreach programs to share the Gospel with students.",
      "Planning and executing annual missions to various communities, including pre-visits and follow-ups.",
      "Coordinating the Hope Ministry for visits to prisons and hospitals, providing spiritual and material support.",
      "Developing and implementing a detailed mission checklist for effective mission planning.",
      "Facilitating the Kairos Course annually to deepen members' understanding of God's global mission.",
      "Partnering with relevant organizations for financial and material support for mission work.",
    ]}
    ctaTitle="Be a Part of Our Outreach!"
    ctaSubtitle="Join the Missions & Evangelism team and help us transform lives."
    primaryCtaLabel="Explore All Ministries"
    primaryCtaHref="/ministries"
    secondaryCtaLabel="Partner With Us"
    secondaryCtaHref="/contact"
  />
);