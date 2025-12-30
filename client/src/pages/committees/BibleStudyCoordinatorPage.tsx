// src/pages/committees/BibleStudyCoordinatorPage.tsx
import React from "react";
import { LeaderProfileLayout } from "../../components/LeaderProfileLayout";

export const BibleStudyCoordinatorPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/PURITY.jpg"
    heroTitle="Bible Study, Discipleship & BEST"
    heroSubtitle="Deepening Faith Through God's Word"
    person={{
      name: "Purity Njeri",
      role: "Bible Study & Discipleship  Coordinator",
      image: "/assets/images/PURITY.jpg",
      border: "orange",
    }}
    aboutTitle="About the Bible Study, Discipleship & BEST Ministry"
    aboutParagraphs={[
      "The Bible Study, Discipleship & BEST-P (Bible Exposition Self-Training Program) Ministry is dedicated to equipping MUTCU members with a deeper understanding of the Holy Scripture and empowering spiritual maturity. This ministry runs various programs, including small group Bible studies, nurturing classes for new believers, and intensive training programs.",
      "Purity Njeri, as the coordinator, leads the efforts to ensure members are grounded in biblical truths and encouraged to apply these teachings in their daily lives. The ministry aims to raise a family well-equipped in all aspects of life, exemplary to Jesus Christ.",
    ]}
    responsibilitiesTitle="Key Roles & Activities"
    responsibilitiesIntro="This ministry focuses on discipleship, Bible study, and structured training."
    responsibilities={[
      "Coordinating weekly Bible study groups across the university.",
      "Organizing nurturing classes for new believers.",
      "Facilitating BEST-P and other in-depth Bible exposition trainings.",
      "Developing Bible study materials and guides for the fellowship.",
      "Encouraging personal and corporate Bible reading among members.",
    ]}
    ctaTitle="Grow in the Word!"
    ctaSubtitle="Join our Bible Study and Discipleship programs and deepen your walk with Christ."
    primaryCtaLabel="Explore Ministries"
    primaryCtaHref="/ministries"
    secondaryCtaLabel="Contact Us"
    secondaryCtaHref="/contact"
  />
);