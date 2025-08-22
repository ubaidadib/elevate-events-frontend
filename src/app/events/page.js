/*
================================================================================
File: /src/app/events/page.js
Description: The Events Page. Lists upcoming events.
================================================================================
*/
"use client";
import EventCard from "../../components/ui/EventCard";

// Mock data for events
const upcomingEvents = [
  {
    date: "SAT, 28 SEP 2025",
    title: "Grand Re-Opening Gala",
    description:
      "An exclusive black-tie evening celebrating the official launch of Elevate Events. Featuring live music, curated cocktails, and a first look at our renovated lounges.",
    time: "20:00 - LATE",
    location: "Emerald Lounge",
    image: "https://placehold.co/600x400/2E5D3A/D9C9A8?text=Gala",
  },
  {
    date: "FRI, 11 OCT 2025",
    title: "Velvet & Vinyl: A Jazz Night",
    description:
      "Immerse yourself in the smooth sounds of a live jazz quartet. A night dedicated to timeless music, fine cigars, and premium whiskey selections.",
    time: "21:00 - 01:00",
    location: "Velvet Burgundy Booths",
    image: "https://placehold.co/600x400/6E2C2C/D9C9A8?text=Jazz",
  },
  {
    date: "THU, 31 OCT 2025",
    title: "The Royal Masquerade",
    description:
      "A Halloween night of mystery and elegance. Don your finest mask and attire for an unforgettable evening of enchantment and intrigue.",
    time: "22:00 - LATE",
    location: "Main Hall & Royal Purple Corner",
    image: "https://placehold.co/600x400/5A3F82/D9C9A8?text=Masquerade",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider"
            style={{ fontFamily: "serif" }}
          >
            Events & Experiences
          </h1>
          <p className="text-[#B0B0B0] mt-4 max-w-3xl mx-auto">
            Discover a curated calendar of exclusive gatherings, live
            performances, and unique thematic nights designed to elevate your
            senses and create lasting memories.
          </p>
        </header>

        <div className="space-y-12">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
