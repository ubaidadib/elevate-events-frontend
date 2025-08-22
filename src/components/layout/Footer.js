import Link from "next/link";
import { Crown, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-yellow-700/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-16 px-6">
        
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-serif font-bold text-yellow-500">ELEVATE</span>
          </Link>
          <p className="text-sm leading-relaxed text-stone-500">
            The evolution of luxury nightlife.
          </p>
          <p className="mt-4 text-xs text-stone-600">
            © {currentYear} Elevate Events GmbH.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-stone-100 mb-5 tracking-wide uppercase text-sm">Quick Links</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/about" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
            <li><Link href="/events" className="hover:text-yellow-500 transition-colors">Events</Link></li>
            <li><Link href="/booking" className="hover:text-yellow-500 transition-colors">Reservations</Link></li>
            <li><Link href="/membership" className="hover:text-yellow-500 transition-colors">VIP Membership</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-stone-100 mb-5 tracking-wide uppercase text-sm">Contact Us</h3>
          <ul className="space-y-3 text-sm font-light">
            <li className="flex items-start gap-3">
              <MapPin className="text-yellow-500 w-4 h-4 mt-1" />
              <span>Knesebeckstr. 39–49, <br/> 10719 Berlin</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-yellow-500 w-4 h-4" />
              <a href="mailto:elevate-events@gmx.de">elevate-events@gmx.de</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-stone-100 mb-5 tracking-wide uppercase text-sm">Follow Us</h3>
          <div className="flex gap-5 text-stone-300">
            <Link href="https://facebook.com" className="hover:text-yellow-500 transition-colors"><Facebook size={24} /></Link>
            <Link href="https://instagram.com" className="hover:text-yellow-500 transition-colors"><Instagram size={24} /></Link>
            <Link href="https://linkedin.com" className="hover:text-yellow-500 transition-colors"><Linkedin size={24} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;