// src/pages/committees/ViceSecretaryPage.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const ViceSecretaryPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/DAISY.jpg"
    heroTitle="Office of the Vice Secretary"
    heroSubtitle="Supporting Administrative Efficiency"
    person={{
      name: "Daisy Mutheu",
      role: "Vice Secretary",
      image: "/assets/images/DAISY.jpg",
      border: "orange",
    }}
    aboutTitle="About the Vice Secretary's Office"
    aboutParagraphs={[
      "The Vice Secretary's office provides essential support to the Secretary in managing the administrative backbone of MUTCU. This role is crucial for maintaining organized records, facilitating internal and external communications, and ensuring that all administrative tasks are handled efficiently and accurately.",
      "Daisy Mutheu, as Vice Secretary, works diligently to uphold the Union's commitment to transparency and effective communication. She assists in preparing meeting documents, managing correspondence, and ensuring that the Union's administrative processes support its spiritual and outreach goals.",
    ]}
    responsibilitiesTitle="Key Roles & Responsibilities"
    responsibilitiesIntro="The Vice Secretary supports the Secretary in all administrative duties."
    responsibilities={[
      "Assisting the Secretary in compiling and maintaining meeting minutes and records.",
      "Supporting the management of Union correspondence and official documents.",
      "Head of the Literature Department managing the CU library.",
      "Facilitating internal communication within the Executive Council and various committees.",
      "Deputizing the Secretary in their absence and handling delegated administrative tasks.",
    ]}
    ctaTitle="Explore Our Leadership!"
    ctaSubtitle="Learn more about the dedicated individuals guiding MUTCU."
    primaryCtaLabel="Meet the Team"
    primaryCtaHref="/about"
    secondaryCtaLabel="Get in Touch"
    secondaryCtaHref="/contact"
  />
);