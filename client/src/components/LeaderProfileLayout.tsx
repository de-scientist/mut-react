// src/components/LeaderProfileLayout.tsx
import React from "react";
import { MainLayout } from "../layout/MainLayout";
import { Button } from "@/components/ui/button";

type BorderColor = "orange" | "navy";

type Person = {
  name: string;
  role: string;
  image: string;
  border: BorderColor;
};

type LeaderProfileLayoutProps = {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  person: Person;
  aboutTitle: string;
  aboutParagraphs: string[];
  responsibilitiesTitle: string;
  responsibilitiesIntro?: string;
  responsibilities: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export const LeaderProfileLayout: React.FC<LeaderProfileLayoutProps> = ({
  heroImage,
  heroTitle,
  heroSubtitle,
  person,
  aboutTitle,
  aboutParagraphs,
  responsibilitiesTitle,
  responsibilitiesIntro,
  responsibilities,
  ctaTitle,
  ctaSubtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}) => {
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative flex h-[40vh] min-h-[280px] items-center justify-center overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-mutcu-navy/80" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="mt-3 text-base md:text-xl text-white/90">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Profile + about */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
            <div className="flex justify-center">
              <div className="text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className={`mx-auto mb-3 h-40 w-40 rounded-full border-4 object-cover shadow-lg ${
                    person.border === "orange"
                      ? "border-mutcu-orange"
                      : "border-mutcu-navy"
                  }`}
                />
                <h3 className="text-lg font-semibold text-mutcu-navy">
                  {person.name}
                </h3>
                <p className="text-sm text-slate-600">{person.role}</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-mutcu-navy">
                {aboutTitle}
              </h2>
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 30)} className="mb-3 text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles & responsibilities */}
      <section className="bg-slate-100 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mutcu-section-title">{responsibilitiesTitle}</h2>
          {responsibilitiesIntro && (
            <p className="mx-auto mb-6 max-w-3xl text-center text-lg text-slate-600">
              {responsibilitiesIntro}
            </p>
          )}
          <ul className="mx-auto max-w-3xl space-y-3 text-sm md:text-base text-slate-700">
            {responsibilities.map((r) => (
              <li key={r.slice(0, 40)} className="flex items-start gap-2">
                <i className="fas fa-check-circle mt-1 text-mutcu-orange" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-mutcu-navy to-mutcu-teal py-12 md:py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="mutcu-section-title text-white">{ctaTitle}</h2>
          <p className="mb-6 text-lg text-white/80">{ctaSubtitle}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              className="bg-mutcu-orange hover:bg-[#e68a00]"
              onClick={() => (window.location.href = primaryCtaHref)}
            >
              {primaryCtaLabel}
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => (window.location.href = secondaryCtaHref)}
            >
              {secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};