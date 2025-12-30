// src/pages/committees/ViceChair1Page.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const ViceChair1Page: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/JES.jpg"
    heroTitle="Office of the 1st Vice Chair"
    heroSubtitle="Supporting Leadership and Union Initiatives"
    person={{
      name: "Jesca Kinya",
      role: "1st Vice Chair",
      image: "/assets/images/JES.jpg",
      border: "navy",
    }}
    aboutTitle="About the 1st Vice Chair's Office"
    aboutParagraphs={[
      "The 1st Vice Chair's office plays a crucial supportive role to the Chairman, assisting in the overall leadership and administration of MUTCU.",
      "Jesca Kinya, as 1st Vice Chair, is dedicated to upholding the Union's values and actively contributes to the strategic planning and implementation of activities that build spiritual growth among members. She is also in charge of the Hospitality ministry and ladies committee in overseeing the nurturing of ladies in the union.",
    ]}
    responsibilitiesTitle="Key Roles & Responsibilities"
    responsibilitiesIntro="The 1st Vice Chair supports the Chairman and oversees key Union functions."
    responsibilities={[
      "Deputizing the Chairman in their absence and assisting in their duties.",
      "Overseeing specific projects or initiatives as delegated by the Chairman.",
      "Is in charge of the Ladies ministry.",
      "Is in charge of the Hospitality ministry.",
      "Ensuring the general welfare and spiritual health of the Union leaders.",
    ]}
    ctaTitle="Explore Our Leadership!"
    ctaSubtitle="Learn more about the dedicated individuals guiding MUTCU."
    primaryCtaLabel="Meet the Team"
    primaryCtaHref="/about"
    secondaryCtaLabel="Get in Touch"
    secondaryCtaHref="/contact"
  />
);