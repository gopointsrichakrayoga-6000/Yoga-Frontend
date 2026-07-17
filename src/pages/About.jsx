import React from 'react';
import { Sparkles, Heart, Compass, Shield, Sun, Award } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ArchBadge } from '../components/common/ArchBadge';

export const About = () => {
  return (
    <div className="bg-paper-grain min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <SectionHeading
          badge="Lineage & Heritage"
          title="The Parampara of Sri Chakra Yoga"
          subtitle="Dedicated to the preservation of classical Hatha sadhana, satvic mindfulness, and Upanishadic dharana at the foot of the Nilgiri forest canopy."
          align="center"
        />

        {/* Main Feature: Asymmetric Two-Column Alternating Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#F5F7FA] border border-terracotta-500/20 text-royal-900 text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>VASTU SHASTRA ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-royal-950 font-normal leading-tight">
              The Stone Pillar Mandapam & <span className="font-medium text-royal-900">Sacred Geometry</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-terracotta-500 to-gold-500 rounded-full" />
            <div className="space-y-4 text-base text-gray-700 font-normal leading-relaxed">
              <p>
                Constructed with reclaimed Burma teak and granite hand-carved by traditional Kerala temple artisans (`Sthapatis`), our central shala follows the exact proportions of ancient Vastu Shastra. The circular dome and stone corridors eliminate angular corners, allowing sound waves from Vedic chanting and satsang to circle softly without echo or dissipation.
              </p>
              <p>
                Surrounded by 108 acres of protected Nilgiri forest, the mandir sits directly above a subterranean granite ridge that has been revered for sadhana and contemplation by monks for generations.
              </p>
            </div>
          </div>

          {/* Image Right Column with Floating Corner Label */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-warm-md aspect-4/3 bg-gray-900 border border-terracotta-500/20">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Side_corridor_of_Brihadisvara_Temple%2C_Thanjavur.jpg"
                alt="Ashram Stone Pillar Hallway"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Label Card Overlapping Image Corner */}
            <div className="absolute -bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md px-5 py-4 rounded-lg shadow-warm-sm border border-terracotta-500/20 flex items-center space-x-3.5 z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-royal-900/15 bg-white shrink-0">
                <img src="/logo.png" alt="Ashram Emblem" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                  ACOUSTIC STILLNESS
                </div>
                <div className="font-display text-base font-semibold text-royal-950 mt-0.5">
                  Granite & Teak Mandapam
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-8 sm:p-10 rounded-xl bg-white border border-terracotta-500/20 shadow-warm-sm hover:shadow-warm-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center shadow-sm border border-gold-500/30">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-royal-950 font-normal">
              Classical Hatha & Pranayama
            </h3>
            <p className="text-sm text-gray-700 font-normal leading-relaxed">
              We practice traditional asana sequences focused on spinal longevity, diaphragmatic breath regulation (`Pranayama`), and inner dharana on natural stone mats without commercial fitness modification.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-white border border-terracotta-500/20 shadow-warm-sm hover:shadow-warm-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center shadow-sm border border-gold-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-royal-950 font-normal">
              Upanishadic Satsang
            </h3>
            <p className="text-sm text-gray-700 font-normal leading-relaxed">
              Every evening beneath the old banyan grove, our Acharya guides resident monks and initiated seekers through contemplation on the Mandukya, Katha, and Bhagavad Gita texts.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-white border border-terracotta-500/20 shadow-warm-sm hover:shadow-warm-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center shadow-sm border border-gold-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-royal-950 font-normal">
              Satvic Seva & Ahimsa
            </h3>
            <p className="text-sm text-gray-700 font-normal leading-relaxed">
              All meals are harvested daily from our organic kitchen gardens and prepared in traditional brass cookware, promoting internal lightness, clarity, and non-violence (`Ahimsa`) across daily life.
            </p>
          </div>
        </div>

        {/* Acharya Quote Feature Box */}
        <div className="p-12 sm:p-16 rounded-xl bg-dusk-gradient text-cream-100 shadow-warm-lg border border-terracotta-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-gold-500/15 pointer-events-none translate-x-1/3 -translate-y-1/3 opacity-30" />
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto" />
            <blockquote className="font-display text-2xl sm:text-4xl font-normal leading-relaxed text-cream-50">
              "Sadhana is not the external shaping of the physical form, but the steady settling of consciousness into its own luminous source. When the body is aligned on stone and the breath quiet, the heart remembers its eternal stillness."
            </blockquote>
            <div className="pt-2 text-xs uppercase tracking-[0.25em] font-bold text-gold-400">
              — Acharya, Founder & Guide of Sri Chakra Yoga
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
