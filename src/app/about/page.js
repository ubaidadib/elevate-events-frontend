

/*
================================================================================
File: /src/app/about/page.js
Description: A new, simple About Us page to complete the website structure.
================================================================================
*/
import { Users, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-charcoal pt-32 pb-20 font-sans text-beige">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gold tracking-wider" style={{ fontFamily: 'serif' }}>
            Our Story: A Legacy Reimagined
          </h1>
          <p className="text-silver mt-6 max-w-3xl mx-auto text-lg">
            From the heart of a community to the height of luxury, this is the story of Elevate Events.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
                <h2 className="text-3xl font-semibold text-white mb-4">From Tribe to Triumph</h2>
                <p className="text-silver/90 mb-4 leading-relaxed">
                    Elevate Events GmbH was born from the spirit of the beloved "Tribe – Music & Smoking Lounge." We honored the camaraderie and soul of our predecessor while embarking on a mission to redefine the luxury experience. Our transformation was meticulous, driven by a passion for creating an environment that is both exclusive and welcoming.
                </p>
                <p className="text-silver/90 leading-relaxed">
                    We've blended timeless elegance with modern sophistication, ensuring that every corner of our venue tells a story of quality, comfort, and unparalleled style.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <img src="https://placehold.co/600x700/7A4C2E/1C1C1C?text=Our+Venue's+Soul" alt="Interior detail of Elevate Events" className="rounded-2xl shadow-2xl shadow-black/50 object-cover"/>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-black/30 p-8 rounded-xl border border-leather/20">
                <Target className="w-12 h-12 text-gold mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-silver text-sm">To provide a sanctuary of sophisticated indulgence, where every guest experiences impeccable service, curated atmospheres, and unforgettable moments.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-xl border border-leather/20">
                <Eye className="w-12 h-12 text-gold mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-silver text-sm">To be the definitive destination for luxury nightlife and exclusive events in the region, setting a new standard for elegance and hospitality.</p>
            </div>
            <div className="bg-black/30 p-8 rounded-xl border border-leather/20">
                <Users className="w-12 h-12 text-gold mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-white mb-2">Our Team</h3>
                <p className="text-silver text-sm">A collective of passionate hospitality experts, curators, and service professionals dedicated to perfecting your experience from arrival to departure.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

