/*
================================================================================
File: /src/app/about/page.js
Description: Unified About Us page with the same luxury theme as Contact Page
================================================================================
*/
"use client";

// import Image from "next/image"; // Removed Next.js Image component import to resolve build error
import { Users, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider font-serif">
            Our Story: A Legacy Reimagined
          </h1>
          <p className="text-[#B0B0B0] mt-4 max-w-3xl mx-auto">
            From the heart of a community to the height of luxury, this is the story of Elevate Events.
          </p>
        </header>

        {/* Story section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-semibold text-white mb-4">
              From Tribe to Triumph
            </h2>
            <p className="text-[#B0B0B0] mb-4 leading-relaxed">
              Elevate Events GmbH was born from the spirit of the beloved
              &quot;Tribe – Music & Smoking Lounge.&quot; We honored the camaraderie
              and soul of our predecessor while embarking on a mission to
              redefine the luxury experience.
            </p>
            <p className="text-[#B0B0B0] leading-relaxed">
              We&apos;ve blended timeless elegance with modern sophistication,
              ensuring that every corner of our venue tells a story of quality,
              comfort, and unparalleled style.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img // Reverted to <img> tag to resolve "next/image" resolution error
              src="https://placehold.co/600x700/7A4C2E/1C1C1C?text=Our+Venue's+Soul"
              alt="Interior detail of Elevate Events"
              width={600} // Added width for better layout control
              height={700} // Added height for better layout control
              className="rounded-2xl shadow-2xl shadow-black/50 object-cover"
            />
          </div>
        </div>

        {/* Mission, Vision, Team */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <InfoCard
            icon={<Target className="w-12 h-12 text-[#E6A93C] mx-auto mb-4" />}
            title="Our Mission"
            text="To provide a sanctuary of sophisticated indulgence, where every guest experiences impeccable service, curated atmospheres, and unforgettable moments."
          />
          <InfoCard
            icon={<Eye className="w-12 h-12 text-[#E6A93C] mx-auto mb-4" />}
            title="Our Vision"
            text="To be the definitive destination for luxury nightlife and exclusive events in the region, setting a new standard for elegance and hospitality."
          />
          <InfoCard
            icon={<Users className="w-12 h-12 text-[#E6A93C] mx-auto mb-4" />}
            title="Our Team"
            text="A collective of passionate hospitality experts, curators, and service professionals dedicated to perfecting your experience from arrival to departure."
          />
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ icon, title, text }) => (
  <div className="bg-[#2a2a2a]/50 p-8 rounded-2xl border border-[#7A4C2E]/30 shadow-2xl shadow-black/50">
    {icon}
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-[#B0B0B0] text-sm">{text}</p>
  </div>
);
