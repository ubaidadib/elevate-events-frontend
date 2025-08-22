/*
================================================================================
File: /src/app/gallery/page.js
Description: The Gallery Page. This is the code from the earlier immersive.
================================================================================
*/
// This file contains the code from the 'elevate_events_gallery_page' immersive.
// (Code is omitted here for brevity, but you would paste it in this file)

"use client";
import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock data for gallery images
const galleryItems = [
  { type: 'image', src: '/images/gallery/gallery01.jpg', category: 'venue', title: 'Main Lounge Ambiance' },
  { type: 'image', src: '/images/gallery/gallery02.jpg', category: 'details', title: 'Artisanal Cocktails' },
  { type: 'image', src: '/images/gallery/gallery03.jpg', category: 'venue', title: 'The Emerald Lounge' },
  { type: 'image', src: '/images/gallery/gallery04.jpg', category: 'events', title: 'Live Jazz Night' },
  { type: 'image', src: '/images/gallery/gallery05.jpg', category: 'details', title: 'Premium Leather Seating' },
  { type: 'image', src: '/images/gallery/gallery06.jpg', category: 'venue', title: 'Royal Purple Corner' },
  { type: 'image', src: '/images/gallery/gallery08.jpg', category: 'events', title: 'Gala Evening' },
  { type: 'image', src: '/images/gallery/gallery10.jpg', category: 'details', title: 'Bespoke Lighting' },
];

export default function App() {
  const [filter, setFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

  const openLightbox = (index) => {
    setCurrentItemIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentItemIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider" style={{ fontFamily: 'serif' }}>
            Visual Journey
          </h1>
          <p className="text-[#B0B0B0] mt-4 max-w-3xl mx-auto">
            Step inside Elevate Events. Explore the refined details, vibrant atmosphere, and unforgettable moments that define our exclusive world.
          </p>
        </header>

        <div className="flex justify-center gap-2 sm:gap-4 mb-10">
          <FilterButton label="All" filter="all" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Venue" filter="venue" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Events" filter="events" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Details" filter="details" activeFilter={filter} setFilter={setFilter} />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg break-inside-avoid cursor-pointer group" onClick={() => openLightbox(index)}>
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/1C1C1C/B0B0B0?text=Error'; }}
              />
            </div>
          ))}
        </div>
      </div>
      {lightboxOpen && <Lightbox item={filteredItems[currentItemIndex]} onClose={closeLightbox} onNext={showNext} onPrev={showPrev} />}
    </div>
  );
}

const FilterButton = ({ label, filter, activeFilter, setFilter }) => (
  <button
    onClick={() => setFilter(filter)}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
      activeFilter === filter 
      ? 'bg-[#E6A93C] text-[#1C1C1C]' 
      : 'bg-[#2a2a2a]/50 text-[#B0B0B0] hover:bg-[#7A4C2E]/50 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const Lightbox = ({ item, onClose, onNext, onPrev }) => (
  <div 
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn"
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50">
      <X size={32} />
    </button>
    <button onClick={onPrev} className="absolute left-4 sm:left-10 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full">
      <ArrowLeft size={28} />
    </button>
    <button onClick={onNext} className="absolute right-4 sm:right-10 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full">
      <ArrowRight size={28} />
    </button>
    <div className="relative max-w-4xl max-h-[90vh] w-full p-4" onClick={(e) => e.stopPropagation()}>
      <img src={item.src} alt={item.title} className="w-full h-full object-contain" />
      <p className="text-center text-white mt-4 text-lg">{item.title}</p>
    </div>
  </div>
);

// Add keyframes for fadeIn animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);
