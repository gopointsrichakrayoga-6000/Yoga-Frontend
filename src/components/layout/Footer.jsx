import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp, Camera, Film, Heart } from 'lucide-react';
import { AshramLogo } from '../common/AshramLogo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-royal-950 text-cream-100/85 pt-16 pb-12 border-t border-terracotta-500/30 relative overflow-hidden font-sans">
      {/* Subtle Arch Silhouette Background Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full border border-gold-500/15 pointer-events-none opacity-40 translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full border border-terracotta-500/15 pointer-events-none opacity-30 -translate-x-1/3 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-royal-800/60">
          {/* Column 1: Brand & Logo */}
          <div className="space-y-5 lg:pr-4">
            <Link to="/" onClick={scrollToTop}>
              <AshramLogo variant="light" />
            </Link>
            <p className="text-sm font-normal leading-relaxed text-cream-200/80">
              A traditional, non-commercial sanctuary preserving classical Hatha sadhana, Vastu geometry, and Upanishadic dharana at the foot of the Nilgiris.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-gold-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
              <span>Shala Open Daily: 5:30 AM – 8:00 PM</span>
            </div>
          </div>

          {/* Column 2: Archive Navigation */}
          <div>
            <h3 className="font-display text-lg font-normal text-cream-50 tracking-wide mb-5 flex items-center space-x-2">
              <span className="w-4 h-0.5 bg-gold-500 rounded-full" />
              <span>Archive Navigation</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                  Sanctuary Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" onClick={scrollToTop} className="hover:text-gold-400 transition-colors flex items-center space-x-2">
                  <Camera className="w-3.5 h-3.5 text-gold-500" />
                  <span>Photographic Archive</span>
                </Link>
              </li>
              <li>
                <Link to="/videos" onClick={scrollToTop} className="hover:text-gold-400 transition-colors flex items-center space-x-2">
                  <Film className="w-3.5 h-3.5 text-gold-500" />
                  <span>Discourse Recordings</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                  Lineage & Ashram Tradition
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">
                  Visit & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Sanctuary Location */}
          <div>
            <h3 className="font-display text-lg font-normal text-cream-50 tracking-wide mb-5 flex items-center space-x-2">
              <span className="w-4 h-0.5 bg-gold-500 rounded-full" />
              <span>Ashram Sanctuary</span>
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                <span>
                  No. 108, Sacred Arch Grove<br />
                  Palakkad Highway Corridor<br />
                  Nilgiri Foothills, Tamil Nadu 641108
                </span>
              </li>
              <li className="flex items-center space-x-3 pt-1">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+914222899108" className="hover:text-gold-400 transition-colors">
                  +91 (422) 2899 108
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:archive@srichakrayoga.org" className="hover:text-gold-400 transition-colors">
                  archive@srichakrayoga.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Archival Note & Back to top */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-normal text-cream-50 tracking-wide mb-5 flex items-center space-x-2">
                <span className="w-4 h-0.5 bg-gold-500 rounded-full" />
                <span>Preserving Stillness</span>
              </h3>
              <p className="text-xs font-light text-cream-200/60 leading-relaxed">
                This digital repository is maintained to share the peaceful resonance and structural heritage of our tradition with seekers globally.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-royal-900 border border-royal-800 text-xs font-medium text-cream-100 hover:border-gold-500/60 hover:text-gold-400 transition-all duration-200"
              >
                <span>Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-gold-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/50 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Sri Chakra Yoga. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Production Media Platform</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Crafted in Stillness</span>
              <Heart className="w-3 h-3 text-gold-500 inline fill-gold-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
