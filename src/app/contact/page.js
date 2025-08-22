/*
================================================================================
File: /src/app/contact/page.js
Description: The Contact Page. This is the code from the earlier immersive.
================================================================================
*/
"use client";
import React from 'react';
import Image from "next/image"; // Re-enabled Next.js Image component import
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider" style={{ fontFamily: 'serif' }}>
            Get In Touch
          </h1>
          <p className="text-[#B0B0B0] mt-4 max-w-3xl mx-auto">
            We welcome your inquiries, feedback, and private event proposals. Reach out to us, and our dedicated team will assist you promptly.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#2a2a2a]/50 border border-[#7A4C2E]/30 rounded-2xl p-8 shadow-2xl shadow-black/50">
            <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <FormInput id="name" label="Full Name" placeholder="Your Name" />
              <FormInput id="email" label="Email Address" type="email" placeholder="your.email@example.com" />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#B0B0B0] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="How can we assist you?"
                  className="w-full bg-[#1C1C1C]/80 border border-[#7A4C2E]/50 rounded-md px-4 py-3 text-[#D9C9A8] placeholder-[#B0B0B0]/50 focus:ring-2 focus:ring-[#E6A93C] focus:border-[#E6A93C] transition-all duration-300 outline-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#E6A93C] text-[#1C1C1C] font-bold rounded-lg shadow-lg hover:bg-[#d4982a] transition-all duration-300">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-[#2a2a2a]/50 border border-[#7A4C2E]/30 rounded-2xl p-8 shadow-2xl shadow-black/50">
               <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
               <div className="space-y-4">
                  <InfoItem icon={<MapPin className="text-[#E6A93C]" />} title="Address" content="Musterstraße 123, 47051 Duisburg, Germany" />
                  <InfoItem icon={<Phone className="text-[#E6A93C]" />} title="Reservations" content="+49 203 1234567" />
                  <InfoItem icon={<Mail className="text-[#E6A93C]" />} title="Email" content="contact@elevate-events.de" />
               </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-[#7A4C2E]/30">
              {/* In a real application, you would embed a Google Maps iframe here */}
              <Image // Using Next.js Image component for optimization
                src="https://placehold.co/800x500/101010/7A4C2E?text=Location+Map" 
                alt="Map to Elevate Events" 
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FormInput = ({ id, label, type = 'text', placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#B0B0B0] mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      required
      className="w-full bg-[#1C1C1C]/80 border border-[#7A4C2E]/50 rounded-md px-4 py-3 text-[#D9C9A8] placeholder-[#B0B0B0]/50 focus:ring-2 focus:ring-[#E6A93C] focus:border-[#E6A93C] transition-all duration-300 outline-none"
    />
  </div>
);

const InfoItem = ({ icon, title, content }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-[#B0B0B0]">{content}</p>
    </div>
  </div>
);