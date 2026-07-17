import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, Film, MapPin, ShieldAlert, LogIn, LogOut, User as UserIcon, Heart } from 'lucide-react';
import { AshramLogo } from '../common/AshramLogo';
import { useAuth } from '../../context/AuthContext';
import OfferingModal from '../offerings/OfferingModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOfferingModalOpen, setIsOfferingModalOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Videos', path: '/videos' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-terracotta-500/20 ${
          isScrolled ? 'py-3.5 shadow-warm-sm' : 'py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Left Aligned Circular Logo & Tracked Wordmark */}
            <Link to="/" aria-label="Sri Chakra Yoga Home">
              <AshramLogo variant="dark" />
            </Link>

            {/* Center-Right Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm tracking-wide transition-colors duration-200 ${
                      isActive
                        ? 'font-bold text-royal-950 border-b-2 border-royal-900 pb-1'
                        : 'font-medium text-royal-900/75 hover:text-royal-950'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Area: Sign In text link + Solid Dark Pill CTA */}
            <div className="hidden lg:flex items-center space-x-5">
              <button
                type="button"
                onClick={() => setIsOfferingModalOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-amber-600/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                <span>Offer Dakshina</span>
              </button>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-xs text-royal-900/80 font-medium">
                    <UserIcon className="w-3.5 h-3.5 text-royal-800" />
                    <span className="truncate max-w-[130px]">{user?.name}</span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-5 py-2.5 rounded-full bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shadow-sm"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    type="button"
                    className="text-xs font-semibold text-royal-900/80 hover:text-royal-950 underline transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-royal-900 hover:text-royal-950 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/gallery"
                    className="px-6 py-2.5 rounded-full bg-royal-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-royal-900 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Enter Sanctuary
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsOfferingModalOpen(true)}
                className="px-3 py-1.5 rounded-full border border-amber-600/40 bg-amber-500/10 text-amber-800 text-xs font-semibold flex items-center space-x-1"
              >
                <Heart className="w-3 h-3 text-amber-600 fill-amber-500/20" />
                <span>Dakshina</span>
              </button>
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-full bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-wider"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-royal-900 hover:bg-terracotta-500/10 focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-royal-950/45 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-cream-100 shadow-2xl p-6 flex flex-col justify-between border-l border-royal-800/15">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-royal-800/10">
                <span className="font-display text-lg font-bold text-royal-900">Sanctuary Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-royal-800/10 text-royal-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-royal-800 text-cream-50'
                          : 'text-royal-900/80 hover:bg-royal-800/5 hover:text-royal-900'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-3">
                      {link.icon && <link.icon className="w-4 h-4 text-gold-500" />}
                      <span>{link.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-royal-800/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOfferingModalOpen(true);
                }}
                className="w-full py-3 rounded-full border border-amber-600/50 bg-amber-500/15 text-amber-900 font-semibold text-center flex items-center justify-center space-x-2 shadow-sm"
              >
                <Heart className="w-4 h-4 text-amber-700 fill-amber-500/20" />
                <span>Offer Dakshina & Seva</span>
              </button>

              {isAuthenticated ? (
                <div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-cream-200/80 mb-3 text-xs">
                    <span className="font-semibold text-royal-900 truncate">{user?.name}</span>
                    <span className="text-[10px] uppercase font-bold text-gold-700 bg-gold-500/20 px-2 py-0.5 rounded">
                      {user?.role}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 rounded-full bg-gold-500 text-royal-950 font-bold text-center flex items-center justify-center space-x-2 mb-3"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Open Admin Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-full bg-royal-800 text-cream-50 font-semibold text-center flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4 text-gold-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-royal-800 text-cream-50 font-semibold text-center flex items-center justify-center space-x-2 shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-gold-500" />
                  <span>Sign In for Full Archive</span>
                </Link>
              )}
              <p className="text-[11px] text-center text-royal-900/50 mt-3 uppercase tracking-widest">
                Sri Chakra Yoga
              </p>
            </div>
          </div>
        </div>
      )}

      <OfferingModal
        isOpen={isOfferingModalOpen}
        onClose={() => setIsOfferingModalOpen(false)}
      />
    </>
  );
};
