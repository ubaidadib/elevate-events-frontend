"use client";

import { motion } from "framer-motion";
import { X, Crown, Sparkles, ChevronRight, Phone, Mail } from "lucide-react";

const containerVariants = {
  hidden: { 
    x: "100%",
    opacity: 0 
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { 
    x: 50,
    opacity: 0 
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function MobileNav({ navLinks, onClose }) { 
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 h-full w-80 z-50 flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(28,28,28,0.98) 0%, rgba(10,10,10,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212,175,55,0.1)'
        }}
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="relative p-8 border-b border-gold/20"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-gold/20 text-white hover:text-gold hover:bg-gold/30 transition-all duration-300 hover:rotate-90 border border-gold/30"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-full bg-gold/10 border border-gold/30">
              <Crown className="w-6 h-6 text-gold drop-shadow-[0_4px_8px_rgba(212,175,55,0.4)]" />
              <Sparkles className="w-2 h-2 text-gold-light absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white tracking-[0.05em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ELEVATE
              </span>
              <span className="text-[10px] font-sans text-gold tracking-[0.3em] uppercase -mt-1 font-semibold">
                Luxury Events
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        </motion.div>

        {/* Navigation Links */}
        <motion.nav className="flex-1 px-8 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              variants={itemVariants}
              custom={index}
            >
              <a // Replaced Link with a tag
                href={link.href}
                className="group flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-gold/10 hover:to-transparent border border-transparent hover:border-gold/20"
                onClick={onClose}
              >
                <span className="text-lg font-sans uppercase tracking-[0.2em] text-white group-hover:text-gold transition-colors duration-300 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {link.name}
                </span>
                <ChevronRight 
                  className="w-5 h-5 text-white group-hover:text-gold transition-all duration-300 transform group-hover:translate-x-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                />
              </a>
            </motion.div>
          ))}
        </motion.nav>

        {/* Quick Contact */}
        <motion.div 
          variants={itemVariants}
          className="px-8 py-4 border-t border-gold/20"
        >
          <div className="flex justify-center gap-6">
            <a 
              href="tel:+49203123456"
              className="p-3 rounded-full bg-gold/30 text-white hover:bg-gold/40 hover:text-gold transition-all duration-300 hover:scale-110 border border-gold/40"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@elevate-events.de"
              className="p-3 rounded-full bg-gold/30 text-white hover:bg-gold/40 hover:text-gold transition-all duration-300 hover:scale-110 border border-gold/40"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="p-8 space-y-4 border-t border-gold/20"
        >
          {/* VIP Access Button */}
          <a // Replaced Link with a tag
            href="/membership"
            className="group relative flex items-center justify-center w-full px-6 py-4 rounded-full font-semibold uppercase tracking-[0.15em] text-sm border-2 border-gold text-white hover:border-gold-light hover:bg-gold/15 hover:text-gold transition-all duration-500 overflow-hidden bg-gold/5"
            onClick={onClose}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              VIP Access
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
          </a>

          {/* Premium Book Now Button */}
          <a // Replaced Link with a tag
            href="/booking"
            className="group relative flex items-center justify-center w-full px-6 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm text-charcoal overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_32px_rgba(212,175,55,0.6)]"
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #E6C65C 50%, #D4AF37 100%)',
              backgroundSize: '200% 100%',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundPosition = '100% 0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundPosition = '0% 0';
            }}
          >
            <span className="relative z-10 font-bold">
              Book Now
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12" />
          </a>
        </motion.div>

        {/* Decorative bottom accent */}
        <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
      </motion.div>
    </>
  );
}
