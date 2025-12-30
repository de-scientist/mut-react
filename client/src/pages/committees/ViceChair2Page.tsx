// src/pages/committees/ViceChair2Page.tsx
import React from "react";
import { LeaderProfileLayout } from "@/components/LeaderProfileLayout";

export const ViceChair2Page: React.FC = () => (
  <LeaderProfileLayout
    heroImage="/assets/images/MARTIN.jpg"
    heroTitle="Office of the 2nd Vice Chair"
    heroSubtitle="Supporting Growth and Community Engagement"
    person={{
      name: "Martin Gitau",
      role: "2nd Vice Chair",
      image: "/assets/images/MARTIN.jpg",
      border: "orange",
    }}
    aboutTitle="About the 2nd Vice Chair's Office"
    aboutParagraphs={[
      "The 2nd Vice Chair's office works in close collaboration with the Chairman and 1st Vice Chair, providing essential support in the overall administration and spiritual direction of MUTCU. This role is vital in ensuring that the Union's diverse activities are well-coordinated and effectively reach all members.",
      "Martin Gitau, as 2nd Vice Chair, is committed to fostering an environment of unity and spiritual vibrancy. He assists in various capacities, contributing to the planning and execution of programs that align with MUTCU's mission to raise a well-equipped family in Christ.",
    ]}
    responsibilitiesTitle="Key Roles & Responsibilities"
    responsibilitiesIntro="The 2nd Vice Chair provides crucial support to the Executive leadership."
    responsibilities={[
      "Assisting the Chairman and 1st Vice Chair in their executive duties.",
      "Is in charge of the gents committee.",
      "Is a member of the Alumni Association Committee.",
      "Organizes leadership development forums and trainings for the Union’s leaders.",
      "Is the chairperson of the Welfare Committee.",
    ]}
    ctaTitle="Explore Our Leadership!"
    ctaSubtitle="Learn more about the dedicated individuals guiding MUTCU."
    primaryCtaLabel="Meet the Team"
    primaryCtaHref="/about"
    secondaryCtaLabel="Get in Touch"
    secondaryCtaHref="/contact"
  />
);