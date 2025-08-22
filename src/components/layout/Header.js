"use client";

import Link from "next/link";
import { Crown, Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium Status Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold z-50" />
      
      <header
        className={`fixed top-1 left-0 w-full z-40 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-charcoal/98 backdrop-blur-2xl border-b border-gold/20 shadow-[0_4px_16px_rgba(212,175,55,0.1)]" // Reduced shadow here
            : "bg-charcoal/85 backdrop-blur-md"
        }`}
      >
        <div className="max-w-8xl mx-auto flex justify-between items-center py-6 px-12 lg:px-16">
          {/* Luxury Logo */}
          <Link href="/" className="group flex items-center gap-3 relative">
            <div className="relative">
              <Crown 
                className={`w-8 h-8 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)] ${
                  scrolled 
                    ? "text-gold-light animate-pulse" 
                    : "text-gold group-hover:animate-glow"
                }`} 
              />
              <Sparkles 
                className="w-3 h-3 text-gold-light absolute -top-1 -right-1 opacity-70 animate-pulse" 
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-2xl font-display font-bold tracking-[0.05em] transition-all duration-500 ${
                  scrolled 
                    ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" // Reduced drop-shadow
                    : "text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" // Reduced drop-shadow
                }`}
              >
                ELEVATE
              </span>
              <span className="text-[10px] font-sans text-gold/70 tracking-[0.3em] uppercase -mt-1">
                Luxury Events
              </span>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12 font-sans text-sm uppercase tracking-[0.25em]">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group transition-all duration-400 hover:scale-105 font-semibold ${
                  scrolled
                    ? "text-white hover:text-yellow-400 drop-shadow-sm" // Adjusted hover color and reduced shadow
                    : "text-gold hover:text-yellow-400 drop-shadow-sm" // Adjusted hover color and reduced shadow
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Luxury underline animation */}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
                
                {/* Elegant hover glow */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/15 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-all duration-400 -m-2" />
              </Link>
            ))}
          </nav>

          {/* Premium Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* VIP Access Button */}
            <Link
              href="/membership"
              className={`group relative px-6 py-2.5 rounded-full font-semibold uppercase tracking-[0.15em] text-sm transition-all duration-500 overflow-hidden ${
                scrolled
                  ? "text-white border border-gold/60 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400" // Adjusted hover color and border
                  : "text-gold border border-gold/60 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400" // Adjusted hover color and border
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                VIP Access
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
            </Link>

            {/* Premium Book Now Button */}
            <Link
              href="/booking"
              className="group relative px-8 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-sm text-charcoal overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_4px_16px_rgba(212,175,55,0.4)]" // Reduced shadow here
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #E6C65C 50%, #D4AF37 100%)',
                backgroundSize: '200% 100%',
                transition: 'background-position 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundPosition = '100% 0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundPosition = '0% 0';
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Now
                <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:rotate-0 transition-transform duration-300" />
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12" />
            </Link>
          </div>

          {/* Premium Mobile Toggle */}
          <button
            className={`lg:hidden relative p-2 transition-all duration-300 hover:scale-110 ${
              scrolled ? "text-gold" : "text-gold-light"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="relative">
              {mobileOpen ? (
                <X size={28} className="animate-pulse" />
              ) : (
                <Menu size={28} />
              )}
              <div className="absolute inset-0 bg-gold/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Subtle bottom border gradient */}
        <div className={`h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </header>

      {mobileOpen && (
        <MobileNav
          navLinks={navLinks}
          scrolled={scrolled}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Header;