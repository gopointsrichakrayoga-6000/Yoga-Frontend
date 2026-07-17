import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-paper-grain min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <SectionHeading
          badge="Visit & Connect"
          title="Sanctuary Directions & Inquiry"
          subtitle="We welcome sincere students and researchers to visit our circular arch shala. Please review our visitor guidelines regarding silence and satvic dress code prior to arrival."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-xl bg-dusk-gradient text-white space-y-6 shadow-warm-lg border border-terracotta-500/30">
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-gold-400">Ashram Shala Desk</h3>
              <ul className="space-y-5 text-sm font-normal text-gray-200">
                <li className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>
                    No. 108, Sacred Arch Grove<br />
                    Palakkad Highway Corridor, Nilgiri Foothills<br />
                    Coimbatore District, Tamil Nadu 641108
                  </span>
                </li>
                <li className="flex items-center space-x-3.5">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  <a href="tel:+914222899108" className="hover:text-gold-300 transition-colors font-medium">
                    +91 (422) 2899 108
                  </a>
                </li>
                <li className="flex items-center space-x-3.5">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                  <a href="mailto:archive@srichakrayoga.org" className="hover:text-gold-300 transition-colors font-medium">
                    archive@srichakrayoga.org
                  </a>
                </li>
                <li className="flex items-center space-x-3.5">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0" />
                  <span>Office Hours: 8:30 AM – 5:00 PM Daily</span>
                </li>
              </ul>
            </div>

            <div className="p-8 sm:p-10 rounded-xl bg-white border border-terracotta-500/20 shadow-warm-sm space-y-4 text-sm text-gray-700">
              <h4 className="font-display text-xl text-royal-950 font-medium">Visitor Guidelines</h4>
              <ul className="space-y-2.5 list-disc list-inside font-normal leading-relaxed">
                <li>Silence hours (`Mauna`) are observed daily from 8:00 PM to 5:30 AM.</li>
                <li>Please wear loose, modest white or natural cotton practice attire.</li>
                <li>Photography is strictly prohibited inside the stone mandapam during practice hours without prior authorization from the Sevak desk.</li>
              </ul>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-terracotta-500/20 p-8 sm:p-12 shadow-warm-md">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center mx-auto border border-gold-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-royal-950 font-normal">Message Received</h3>
                <p className="text-sm text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for connecting with Sri Chakra Yoga. Our desk sevak will review your inquiry and respond within two sun cycles.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full border border-royal-900 text-royal-900 font-semibold text-xs uppercase tracking-wider hover:bg-royal-50 transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-3xl text-royal-950 font-normal mb-1">
                    Send a <span className="font-medium text-royal-900">Sanctuary</span> Inquiry
                  </h3>
                  <p className="text-xs text-gray-600 font-normal">
                    For retreat scheduling, archive access requests, or lineage research
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Siddharth Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="siddharth@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                    Subject / Nature of Inquiry
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Access to unlisted pranayama video archive"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please share your background or questions regarding our lineage..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-royal-900 text-white hover:bg-royal-800 py-4 px-8 text-sm font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
                  >
                    <span>Submit Inquiry to Ashram Desk</span>
                    <Send className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
