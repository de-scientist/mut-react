// src/pages/committees/SecretaryPage.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const SecretaryPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/GRACE.jpg"
    heroTitle="The Secretary's Office"
    heroSubtitle="Ensuring Effective Communication and Record-Keeping"
    person={{
      name: "Grace Kanyiri",
      role: "Secretary",
      image: "/assets/images/GRACE.jpg",
      border: "navy",
    }}
    aboutTitle="About the Secretary's Office"
    aboutParagraphs={[
      "The Secretary's office is vital for the smooth administrative functioning of MUTCU. It is responsible for all official communications, meticulous record-keeping, and ensuring that decisions made by the Executive Council and general membership are accurately documented and disseminated.",
      "Grace Kanyiri, as Secretary, ensures transparency and efficiency in the Union's operations. Her role involves managing meeting minutes, maintaining official records, and facilitating effective communication channels within MUTCU and with external partners, upholding the Union's commitment to good governance.",
    ]}
    responsibilitiesTitle="Key Roles & Responsibilities"
    responsibilitiesIntro="The Secretary's office is crucial for MUTCU's administrative integrity."
    responsibilities={[
      "Compiling, printing, and ensuring the signing of minutes from all official meetings.",
      "Managing all official correspondence and communications of the Union.",
      "Maintaining comprehensive records of Union members, assets, and activities.",
      "Preparing agendas for meetings in consultation with the Chairman.",
      "Ensuring timely dissemination of information to the Executive Council and general membership.",
    ]}
    ctaTitle="Explore Our Leadership!"
    ctaSubtitle="Learn more about the dedicated individuals guiding MUTCU."
    primaryCtaLabel="Meet the Team"
    primaryCtaHref="/about"
    secondaryCtaLabel="Get in Touch"
    secondaryCtaHref="/contact"
  />
);