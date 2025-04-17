"use client";
import { Hero } from "@/homeSections/Hero";
import { Features } from "@/homeSections/Features";
import { HowItWorks } from "@/homeSections/HowItWorks";
import { CTA } from "@/homeSections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}
