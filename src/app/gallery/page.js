/*
================================================================================
File: /src/app/gallery/page.js
Description: Gallery Page with filters, lightbox, and SafeImage fallback
================================================================================
*/
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

// ✅ SafeImage component with fallback
function SafeImage({ src, alt, ...props }) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={
        error
          ? "https://placehold.co/600x400/1C1C1C/B0B0B0?text=Image+Unavailable"
          : src
      }
      alt={alt}
      onError={() => setError(true)}
      unoptimized={error}
      loading="lazy"
      {...props}
    />
  );
}

// Mock data for gallery images
const galleryItems = [
  { type: "image", src: "/images/gallery/gallery01.jpg", category: "venue", title: "Main Lounge Ambiance" },
  { type: "image", src: "/images/gallery/gallery02.jpg", category: "details", title: "Artisanal Cocktails" },
  { type: "image", src: "/images/gallery/gallery03.jpg", category: "venue", title: "The Emerald Lounge" },
  { type: "image", src: "/images/gallery/gallery04.jpg", category: "events", title: "Live Jazz Night" },
  { type: "image", src: "/images/gallery/gallery05.jpg", category: "details", title: "Premium Leather Seating" },
  { type: "image", src: "/images/gallery/gallery06.jpg", category: "venue", title: "Royal Purple Corner" },
  { type: "image", src: "/images/gallery/gallery08.jpg", category: "events", title: "Gala Evening" },
  { type: "image", src: "/images/gallery/gallery10.jpg", category: "details", title: "Bespoke Lighting" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (index) => {
    setCurrentItemIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentItemIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentItemIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );
  };

  return (
<div className="bg-charcoal min-h-screen font-sans text-beige p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold tracking-wider font-serif">
            Visual Journey
          </h1>
          <p className="text-silver mt-4 max-w-3xl mx-auto text-lg">
            Step inside Elevate Events. Explore refined details, vibrant
            atmosphere, and unforgettable moments that define our exclusive
            world.
          </p>
        </header>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12">
          <FilterButton label="All" filter="all" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Venue" filter="venue" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Events" filter="events" activeFilter={filter} setFilter={setFilter} />
          <FilterButton label="Details" filter="details" activeFilter={filter} setFilter={setFilter} />
        </div>

        {/* Gallery grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl break-inside-avoid cursor-pointer group border border-leather/30 shadow-lg shadow-black/40"
              onClick={() => openLightbox(index)}
            >
              <SafeImage
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          item={filteredItems[currentItemIndex]}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </div>
  );
}

/* ------------------ Reusable Components ------------------ */

const FilterButton = ({ label, filter, activeFilter, setFilter }) => (
  <button
    onClick={() => setFilter(filter)}
    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
      activeFilter === filter
        ? "bg-gold text-charcoal"
        : "bg-onyx/50 text-silver hover:bg-leather/50 hover:text-white"
    }`}
  >
    {label}
  </button>
);

const Lightbox = ({ item, onClose, onNext, onPrev }) => (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn"
    onClick={onClose}
  >
    {/* Close button */}
    <button
      onClick={onClose}
      className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
    >
      <X size={32} />
    </button>
    {/* Navigation */}
    <button
      onClick={onPrev}
      className="absolute left-4 sm:left-10 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
    >
      <ArrowLeft size={28} />
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 sm:right-10 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
    >
      <ArrowRight size={28} />
    </button>
    {/* Image */}
    <div
      className="relative max-w-4xl max-h-[90vh] w-full p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <SafeImage
        src={item.src}
        alt={item.title}
        width={1200}
        height={800}
        className="w-full h-full object-contain rounded-lg"
      />
      <p className="text-center text-white mt-4 text-lg">{item.title}</p>
    </div>
  </div>
);
