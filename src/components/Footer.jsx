import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation("footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { key: "about_us", href: "#about" },
      { key: "our_story", href: "#about" },
      { key: "careers", href: "#" },
      { key: "press", href: "#" }
    ],
    services: [
      { key: "event_booking", href: "#booking" },
      { key: "membership", href: "#membership" },
      { key: "private_events", href: "#events" },
      { key: "corporate_services", href: "#" }
    ],
    support: [
      { key: "contact_us", href: "#contact" },
      { key: "faq", href: "#" },
      { key: "terms", href: "#" },
      { key: "privacy", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl font-luxury">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-luxury font-bold text-foreground">{t("logo.company")}</span>
                  {/* <span className="text-xs text-muted-foreground font-elegant">{t("logo.suffix")}</span> */}
                </div>
              </div>
              
              <p className="text-muted-foreground font-elegant mb-6 leading-relaxed">
                {t("description")}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  <span className="font-elegant">Berlin, Germany</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  <span className="font-elegant">+49 30 1234 5678</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                  <span className="font-elegant">info@elevateevents.de</span>
                </div>
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-luxury font-bold text-foreground mb-6">{t("sections.company")}</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-muted-foreground font-elegant hover:text-primary transition-colors duration-300">
                      {t(`links.${link.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-luxury font-bold text-foreground mb-6">{t("sections.services")}</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-muted-foreground font-elegant hover:text-primary transition-colors duration-300">
                      {t(`links.${link.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-luxury font-bold text-foreground mb-6">{t("sections.support")}</h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-muted-foreground font-elegant hover:text-primary transition-colors duration-300">
                      {t(`links.${link.key}`)}
                    </a>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="font-luxury font-semibold text-foreground mb-4">{t("sections.follow")}</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border py-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-luxury font-bold text-foreground mb-4">{t("newsletter.title")}</h3>
            <p className="text-muted-foreground font-elegant mb-8">{t("newsletter.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="btn-luxury whitespace-nowrap">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground font-elegant text-sm mb-4 md:mb-0">
              © {currentYear} {t("logo.company")} {t("logo.suffix")}. {t("bottom.rights")}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground font-elegant hover:text-primary transition-colors">
                {t("links.privacy")}
              </a>
              <a href="#" className="text-muted-foreground font-elegant hover:text-primary transition-colors">
                {t("links.terms")}
              </a>
              <a href="#" className="text-muted-foreground font-elegant hover:text-primary transition-colors">
                {t("links.cookie")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
