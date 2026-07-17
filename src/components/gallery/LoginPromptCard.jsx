import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LogIn, Lock, Heart, Compass } from 'lucide-react';

export const LoginPromptCard = ({ totalRemaining = 150, mediaType = 'photographs' }) => {
  const location = useLocation();

  return (
    <div className="masonry-item group relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 bg-white text-royal-950 flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
      {/* Top Badge & Lock Icon */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-royal-900/10 text-royal-900 text-xs font-semibold uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5 text-gold-500" />
          <span>STUDENT INVITATION</span>
        </div>
        <div className="p-2.5 rounded-full bg-royal-900/10 text-royal-900">
          <Lock className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 space-y-4">
        <h3 className="font-display text-3xl sm:text-4xl font-normal text-royal-950 leading-tight">
          Continuing the <span className="italic font-light text-royal-800">Contemplative</span> Journey
        </h3>

        <p className="text-sm text-gray-600 font-normal leading-relaxed">
          You are currently viewing our open public preview. To preserve the quiet sanctity of ashram life and respect student intimacy during practice, the remaining <strong className="text-royal-950 font-semibold">{totalRemaining}+ high-definition {mediaType}</strong> and unlisted discourse archives are shared exclusively with authenticated students and members.
        </p>

        <div className="pt-3 flex items-center space-x-3 text-xs text-gray-500 bg-[#F5F7FA] p-4 rounded-2xl border border-gray-100">
          <Heart className="w-4 h-4 text-gold-500 fill-gold-500 shrink-0" />
          <span>Non-commercial sanctuary — sign in with your ashram profile to explore the complete historical archive.</span>
        </div>
      </div>

      {/* Bottom Pill CTA Button */}
      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/login"
          state={{ from: location }}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-royal-900 text-white font-semibold text-sm hover:bg-royal-800 transition-all shadow-md hover:shadow-lg"
        >
          <LogIn className="w-4 h-4 text-gold-400" />
          <span>Sign In to Full Archive</span>
        </Link>

        <Link
          to="/register"
          state={{ from: location }}
          className="text-xs text-royal-900 hover:text-royal-800 underline transition-colors font-semibold"
        >
          Request Student Profile →
        </Link>
      </div>
    </div>
  );
};
