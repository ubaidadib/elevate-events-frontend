
/*
================================================================================
File: /src/app/booking/page.js
Description: The Booking Page. This is the code from the earlier immersive.
================================================================================
*/
// This file contains the code from the 'elevate_events_booking_page' immersive.
// (Code is omitted here for brevity, but you would paste it in this file)

"use client";
import React, { useState } from 'react';
import { Calendar, Users, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

// Main component for the Booking Page
export default function App() {
  return (
    <div className="bg-[#1C1C1C] min-h-screen font-sans text-[#D9C9A8] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6A93C] tracking-wider" style={{ fontFamily: 'serif' }}>
            Reserve Your Experience
          </h1>
          <p className="text-[#B0B0B0] mt-4 max-w-2xl mx-auto">
            Embark on a seamless journey to secure your exclusive space at Elevate Events. Our refined booking process ensures your upcoming visit is tailored to perfection.
          </p>
        </header>

        <BookingWorkflow />
      </div>
    </div>
  );
}

// The core booking workflow component
const BookingWorkflow = () => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    lounge: 'Emerald Lounge',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'Credit Card',
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const steps = [
    { id: 1, name: 'Date & Time', icon: <Calendar className="w-6 h-6" /> },
    { id: 2, name: 'Lounge & Guests', icon: <Users className="w-6 h-6" /> },
    { id: 3, name: 'Your Information', icon: <CreditCard className="w-6 h-6" /> },
    { id: 4, name: 'Confirmation', icon: <CheckCircle className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-[#2a2a2a]/50 border border-[#7A4C2E]/30 rounded-2xl shadow-2xl shadow-black/50 p-6 sm:p-10 backdrop-blur-sm">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step >= s.id ? 'bg-[#E6A93C] border-[#E6A93C] text-[#1C1C1C]' : 'bg-transparent border-[#7A4C2E] text-[#B0B0B0]'
                  }`}
                >
                  {s.icon}
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-semibold transition-colors duration-500 ${step >= s.id ? 'text-[#E6A93C]' : 'text-[#B0B0B0]'}`}>
                  {s.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 sm:mx-4 rounded-full bg-[#7A4C2E]/50">
                   <div className="h-full bg-[#E6A93C] rounded-full transition-all duration-500" style={{ width: step > s.id ? '100%' : '0%' }}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[350px]">
        {step === 1 && <Step1 data={bookingDetails} onChange={handleChange} />}
        {step === 2 && <Step2 data={bookingDetails} onChange={handleChange} />}
        {step === 3 && <Step3 data={bookingDetails} onChange={handleChange} />}
        {step === 4 && <Step4 data={bookingDetails} />}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 bg-[#7A4C2E] text-white rounded-lg shadow-md hover:bg-[#6E2C2C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={step === 4}
          className="flex items-center gap-2 px-6 py-3 bg-[#E6A93C] text-[#1C1C1C] font-bold rounded-lg shadow-lg hover:bg-[#d4982a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 3 ? 'Confirm & Book' : 'Next'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#B0B0B0] mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#1C1C1C]/80 border border-[#7A4C2E]/50 rounded-md px-4 py-3 text-[#D9C9A8] placeholder-[#B0B0B0]/50 focus:ring-2 focus:ring-[#E6A93C] focus:border-[#E6A93C] transition-all duration-300 outline-none"
    />
  </div>
);

// Custom Select Component
const CustomSelect = ({ id, label, value, onChange, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-[#B0B0B0] mb-2">{label}</label>
        <div className="relative">
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-[#1C1C1C]/80 border border-[#7A4C2E]/50 rounded-md px-4 py-3 text-[#D9C9A8] focus:ring-2 focus:ring-[#E6A93C] focus:border-[#E6A93C] transition-all duration-300 outline-none"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#B0B0B0]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);


// Step 1: Date & Time
const Step1 = ({ data, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
    <h2 className="text-2xl font-semibold text-[#E6A93C] md:col-span-2">Select Date and Time</h2>
    <FormInput id="date" label="Date" type="date" value={data.date} onChange={onChange} />
    <FormInput id="time" label="Time" type="time" value={data.time} onChange={onChange} />
    <div className="md:col-span-2 mt-4 p-4 bg-[#2E5D3A]/20 border border-[#2E5D3A]/50 rounded-lg">
      <p className="text-sm text-[#D9C9A8]"><span className="font-bold">Please Note:</span> Reservations are available from 6:00 PM to 2:00 AM. For special arrangements or private events outside these hours, please contact us directly.</p>
    </div>
  </div>
);

// Step 2: Lounge & Guests
const Step2 = ({ data, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
    <h2 className="text-2xl font-semibold text-[#E6A93C] md:col-span-2">Choose Your Setting</h2>
    <CustomSelect id="lounge" label="Lounge or Table" value={data.lounge} onChange={onChange}>
      <option>Emerald Lounge</option>
      <option>Velvet Burgundy Booth</option>
      <option>The Royal Purple Corner</option>
      <option>Main Floor Table</option>
    </CustomSelect>
    <div>
        <label htmlFor="guests" className="block text-sm font-medium text-[#B0B0B0] mb-2">Number of Guests: {data.guests}</label>
        <input
            type="range"
            id="guests"
            name="guests"
            min="1"
            max="12"
            value={data.guests}
            onChange={onChange}
            className="w-full h-2 bg-[#7A4C2E]/50 rounded-lg appearance-none cursor-pointer accent-[#E6A93C]"
        />
        <div className="flex justify-between text-xs text-[#B0B0B0] mt-1">
            <span>1</span>
            <span>12</span>
        </div>
    </div>
  </div>
);

// Step 3: Your Information
const Step3 = ({ data, onChange }) => (
  <div className="animate-fadeIn">
    <h2 className="text-2xl font-semibold text-[#E6A93C] mb-6">Your Contact & Payment Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput id="name" label="Full Name" value={data.name} onChange={onChange} placeholder="e.g., Alex Schmidt" />
      <FormInput id="email" label="Email Address" type="email" value={data.email} onChange={onChange} placeholder="e.g., alex.schmidt@example.com" />
      <FormInput id="phone" label="Phone Number" type="tel" value={data.phone} onChange={onChange} placeholder="+49 123 4567890" />
      <CustomSelect id="paymentMethod" label="Payment Method" value={data.paymentMethod} onChange={onChange}>
        <option>Credit Card</option>
        <option>PayPal</option>
        <option>Klarna</option>
      </CustomSelect>
    </div>
    <div className="mt-6 text-xs text-center text-[#B0B0B0]">
      Your payment information is securely processed. A temporary hold may be placed, but you will not be charged until your visit.
    </div>
  </div>
);

// Step 4: Confirmation
const Step4 = ({ data }) => (
  <div className="text-center animate-fadeIn">
    <CheckCircle className="w-20 h-20 text-[#2E5D3A] mx-auto mb-6" />
    <h2 className="text-3xl font-bold text-[#E6A93C] mb-4">Reservation Confirmed!</h2>
    <p className="text-[#D9C9A8] mb-8">
      Thank you, {data.name}. Your exclusive experience at Elevate Events is booked. A confirmation email with your QR code for check-in has been sent to <span className="font-semibold text-[#E6A93C]">{data.email}</span>.
    </p>
    <div className="bg-[#1C1C1C]/60 border border-[#7A4C2E]/30 rounded-lg p-6 max-w-md mx-auto text-left space-y-3">
      <p><strong>Date:</strong> {new Date(data.date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p><strong>Time:</strong> {data.time}</p>
      <p><strong>Guests:</strong> {data.guests}</p>
      <p><strong>Selection:</strong> {data.lounge}</p>
    </div>
    <p className="text-sm text-[#B0B0B0] mt-8">We eagerly await your arrival.</p>
  </div>
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

