
/*
================================================================================
File: /src/app/membership/page.js
Description: The Membership/VIP Page. This is the code from the earlier immersive.
================================================================================
*/
// This file contains the code from the 'elevate_events_membership_page' immersive.
// (Code is omitted here for brevity, but you would paste it in this file)

"use client";

import React, { useState } from "react";
import { User, Lock, Mail, ArrowRight } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider" style={{ fontFamily: 'serif' }}>
            VIP Access
          </h1>
          <p className="text-[#B0B0B0] mt-4">
            Unlock exclusive perks, priority bookings, and member-only events.
          </p>
        </header>

        <div className="bg-[#2a2a2a]/50 border border-[#7A4C2E]/30 rounded-2xl shadow-2xl shadow-black/50 p-8 backdrop-blur-sm">
          <div className="flex border-b border-[#7A4C2E]/50 mb-8">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === 'login' ? 'text-[#E6A93C] border-b-2 border-[#E6A93C]' : 'text-[#B0B0B0] hover:text-white'}`}
            >
              SIGN IN
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === 'register' ? 'text-[#E6A93C] border-b-2 border-[#E6A93C]' : 'text-[#B0B0B0] hover:text-white'}`}
            >
              BECOME A MEMBER
            </button>
          </div>

          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

const InputField = ({ icon, type, placeholder }) => (
  <div className="relative flex items-center">
    <span className="absolute left-4 text-[#B0B0B0]/60">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#1C1C1C]/80 border border-[#7A4C2E]/50 rounded-md pl-12 pr-4 py-3 text-[#D9C9A8] placeholder-[#B0B0B0]/50 focus:ring-2 focus:ring-[#E6A93C] focus:border-[#E6A93C] transition-all duration-300 outline-none"
    />
  </div>
);

const LoginForm = () => (
  <form className="space-y-6 animate-fadeIn">
    <InputField icon={<Mail size={20} />} type="email" placeholder="Email Address" />
    <InputField icon={<Lock size={20} />} type="password" placeholder="Password" />
    <div className="text-right">
        <a href="#" className="text-xs text-[#B0B0B0] hover:text-[#E6A93C] transition-colors">Forgot Password?</a>
    </div>
    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E6A93C] text-[#1C1C1C] font-bold rounded-lg shadow-lg hover:bg-[#d4982a] transition-all duration-300">
      Sign In <ArrowRight size={18} />
    </button>
  </form>
);

const RegisterForm = () => (
  <form className="space-y-6 animate-fadeIn">
    <InputField icon={<User size={20} />} type="text" placeholder="Full Name" />
    <InputField icon={<Mail size={20} />} type="email" placeholder="Email Address" />
    <InputField icon={<Lock size={20} />} type="password" placeholder="Create Password" />
    <p className="text-xs text-center text-[#B0B0B0]">By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#7A4C2E] text-white rounded-lg shadow-md hover:bg-[#6E2C2C] transition-all duration-300">
      Create Account <ArrowRight size={18} />
    </button>
  </form>
);

// Add keyframes for fadeIn animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);
