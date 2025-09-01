import React, { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation("header");

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "events", href: "#events" },
    { key: "booking", href: "#booking" },
    { key: "membership", href: "#membership" },
    { key: "gallery", href: "#gallery" },
    { key: "contact", href: "#contact" }
  ];

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-luxury">
                E
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-luxury font-bold text-foreground">
                {t("logo.company")}
              </span>
              {/* <span className="text-xs text-muted-foreground font-elegant">
                {t("logo.suffix")}
              </span> */}
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-elegant font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {t(`nav.${item.key}`)}
              </motion.a>
            ))}
          </nav>

          {/* Right side: CTA + Language Toggle */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Booking CTA */}
            <a
              href="#booking"
              className="btn-luxury inline-flex items-center"
              aria-label={t("cta.book_now")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t("cta.book_now")}
            </a>

            {/* Language Switcher */}
            <div className="flex space-x-2">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition 
                  ${i18n.resolvedLanguage === "en" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("de")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition 
                  ${i18n.resolvedLanguage === "de" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
              >
                DE
              </button>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden glass border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-elegant font-medium py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.a>
                ))}

                {/* Booking button */}
                <motion.a
                  href="#booking"
                  className="btn-luxury w-full mt-4 inline-flex items-center"
                  aria-label={t("cta.book_now")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t("cta.book_now")}
                </motion.a>

                {/* Mobile Language Switcher */}
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition 
                      ${i18n.resolvedLanguage === "en" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage("de")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition 
                      ${i18n.resolvedLanguage === "de" ? "bg-primary text-white" : "bg-muted text-foreground"}`}
                  >
                    DE
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
