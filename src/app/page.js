

/*
================================================================================
File: /src/app/page.js
Description: The Home Page. This is the code from the earlier immersive.
================================================================================
*/
// This file contains the code from the 'elevate_events_home_page' immersive.
// (Code is omitted here for brevity, but you would paste it in this file)


import React from 'react';
import { ArrowRight, Calendar, Star, Sparkles } from 'lucide-react';

// Mock data for featured events
const featuredEvents = [
  {
    date: 'SEP 28',
    title: 'Grand Re-Opening Gala',
    image: '/images/gallery/event1.jpg',
  },
  {
    date: 'OCT 11',
    title: 'Velvet & Vinyl: A Jazz Night',
    image: '/images/gallery/event1.jpg',
  },
];

export default function App() {
  return (
    <div className="bg-[#1C1C1C] font-sans text-[#D9C9A8]">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center text-center p-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(28, 28, 28, 0.8), rgba(28, 28, 28, 1)), url('/images/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider leading-tight" style={{ fontFamily: 'serif' }}>
            Experience the Pinnacle of Nightlife
          </h1>
          <p className="text-[#B0B0B0] mt-6 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            From the legacy of Tribe Music & Smoking Lounge, we present Elevate Events—a new era of sophisticated indulgence and exclusive gatherings.
          </p>
          <a href="/booking" className="inline-flex items-center gap-3 px-8 py-4 bg-[#E6A93C] text-[#1C1C1C] font-bold text-lg rounded-lg shadow-lg hover:bg-[#d4982a] transition-all duration-300 transform hover:scale-105">
            Book Your Table
            <ArrowRight size={22} />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#E6A93C] mb-6" style={{ fontFamily: 'serif' }}>
              A Legacy, Reimagined.
            </h2>
            <p className="text-[#B0B0B0] mb-4 leading-relaxed">
              Elevate Events GmbH is the evolution of a cherished local icon. We've taken the soul and camaraderie of the original Tribe lounge and infused it with a new standard of luxury, creating an unparalleled atmosphere for our discerning clientele.
            </p>
            <p className="text-[#B0B0B0] leading-relaxed">
              Our commitment is to provide an escape—a place where exceptional service, curated experiences, and lasting connections converge.
            </p>
            <a href="/about" className="inline-flex items-center gap-2 mt-8 text-[#E6A93C] font-semibold hover:text-white transition-colors">
              Discover Our Story <ArrowRight size={18} />
            </a>
          </div>
          <div className="flex justify-center">
             <img src="/images/gallery/about-section.jpg" alt="Lounge Interior" className="rounded-2xl shadow-2xl shadow-black/50 object-cover"/>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 md:py-32 bg-[#2a2a2a]/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#E6A93C] mb-4" style={{ fontFamily: 'serif' }}>Upcoming Experiences</h2>
          <p className="text-[#B0B0B0] max-w-2xl mx-auto mb-12">Be part of our most anticipated nights. View the calendar for a full list of exclusive events.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg shadow-black/40">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-left">
                  <p className="text-lg font-bold text-[#E6A93C]">{event.date}</p>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white mt-1">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <a href="/events" className="inline-flex items-center gap-3 mt-12 px-8 py-3 border-2 border-[#7A4C2E] text-[#D9C9A8] font-semibold rounded-lg hover:bg-[#7A4C2E] hover:text-white transition-all duration-300">
            View Full Calendar
          </a>
        </div>
      </section>
      
      {/* VIP Membership CTA */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center bg-[#2a2a2a]/50 border border-[#7A4C2E]/30 rounded-2xl p-12 shadow-2xl shadow-black/50">
           <Sparkles className="w-16 h-16 text-[#E6A93C] mx-auto mb-6"/>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'serif' }}>
              Unlock a Higher Tier
            </h2>
            <p className="text-[#B0B0B0] max-w-2xl mx-auto mb-8">
              Join our exclusive VIP program to enjoy priority reservations, access to members-only events, and special loyalty benefits that enhance every visit.
            </p>
            <a href="/membership" className="inline-flex items-center gap-2 px-8 py-3 bg-[#E6A93C] text-[#1C1C1C] font-bold rounded-lg shadow-lg hover:bg-[#d4982a] transition-all duration-300">
              Become a VIP Member
            </a>
        </div>
      </section>
    </div>
  );
}
