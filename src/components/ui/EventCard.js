"use client";

import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";

export default function EventCard({ event }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#2a2a2a]/30 p-6 rounded-2xl border border-[#7A4C2E]/20 hover:bg-[#2a2a2a]/60 hover:border-[#E6A93C]/40 transition-all duration-500 ease-in-out">
      {/* Image Section */}
      <div className="md:col-span-4 lg:col-span-3">
        <Image
          src={
            imgError
              ? "https://placehold.co/600x400/1C1C1C/B0B0B0?text=Image+Error"
              : event.image
          }
          alt={event.title}
          width={600}
          height={400}
          className="rounded-lg w-full h-auto object-cover aspect-[4/3] shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Date Section */}
      <div className="md:col-span-2 lg:col-span-2 text-center md:text-left border-b-2 md:border-b-0 md:border-r-2 border-[#7A4C2E]/30 pb-4 md:pb-0 md:pr-6">
        <p className="text-lg font-bold text-[#E6A93C]">{event.date.split(",")[0]},</p>
        <p className="text-md text-[#B0B0B0]">{event.date.split(",")[1]}</p>
      </div>

      {/* Details Section */}
      <div className="md:col-span-6 lg:col-span-7">
        <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-3">{event.title}</h2>
        <p className="text-[#B0B0B0] mb-4 text-sm lg:text-base">{event.description}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs lg:text-sm text-[#D9C9A8]">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#E6A93C]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#E6A93C]" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
