// src/pages/committees/TreasurerPage.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const TreasurerPage: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/JOY.jpg"
    heroTitle="The Treasurer's Office"
    heroSubtitle="Ensuring Financial Stewardship and Accountability"
    person={{
      name: "Joy Karimi",
      role: "Treasurer",
      image: "/assets/images/JOY.jpg",
      border: "navy",
    }}
    aboutTitle="About the Treasurer's Office"
    aboutParagraphs={[
      "The Treasurer's office is central to MUTCU's financial integrity and sustainability. It is responsible for the diligent management of all Union funds, ensuring strict adherence to financial procedures and policies. This includes overseeing budgets, managing expenditures, and providing transparent financial reports to the Executive Council and members.",
      "Joy Karimi, as Treasurer, ensures the responsible stewardship of members' offerings and Union resources. Her role is critical in maintaining accountability and transparency in all financial matters, enabling MUTCU to effectively fund its ministries and outreach programs.",
    ]}
    responsibilitiesTitle="Key Roles & Responsibilities"
    responsibilitiesIntro="The Treasurer's office manages all financial aspects of MUTCU."
    responsibilities={[
      "Handling all Union funds with strict adherence to established financial procedures.",
      "Managing budgets submitted by various ministries and ensuring proper budgetary allocations.",
      "Ensuring all expenditures are accounted for with official requisition forms and receipts.",
      "Keeping records of all assets of the Union.",
      "Advising the Executive Council on financial matters and resource mobilization strategies.",
    ]}
    ctaTitle="Explore Our Leadership!"
    ctaSubtitle="Learn more about the dedicated individuals guiding MUTCU."
    primaryCtaLabel="Meet the Team"
    primaryCtaHref="/about"
    secondaryCtaLabel="Get in Touch"
    secondaryCtaHref="/contact"
  />
);