import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreStore: () => void;
  onOpenTradeIn: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreStore, onOpenTradeIn }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Location & Trust kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400 mb-4">
              <span className="text-amber-400 font-semibold uppercase tracking-wider">Ibadan Gaming Center</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                Shop 32 Zion Samsung Bldg, Dugbe
              </span>
              <span aria-hidden="true">·</span>
              <span>Mon – Sat 8:30 AM – 6:30 PM</span>
            </div>

            {/* Display headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight lg:leading-tight mb-5" style={{ textWrap: 'balance' }}>
              Buy, Sell & Repair Video Games and Accessories in Ibadan.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-8 max-w-2xl">
              Welcome to <strong className="text-neutral-200">ADELOD GAMES WORLD</strong>. Your verified destination for original PlayStation, Xbox, and Nintendo consoles, authentic game discs, and precision motherboard & controller micro-soldering.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm"
              >
                <Wrench className="w-4 h-4" />
                <span>Book Repair Appointment</span>
              </button>

              <button
                onClick={onExploreStore}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTradeIn}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                <span>Sell or Trade Console</span>
              </button>
            </div>

            {/* Direct CEO hotline contact strip */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
                <div>
                  <div className="font-semibold text-white">CEO Stephen Adelodun Hotline</div>
                  <div className="text-neutral-400 mt-0.5">Calls & 24/7 WhatsApp Consultations</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello CEO Stephen, I am reaching out from Adelod Game World website regarding game console sales and repair services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with fallback */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[340px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative shadow-2xl">
              <img
                src={COMPANY_INFO.images.hero}
                alt="Adelod Game World Retail & Repair Showroom in Ibadan"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 text-xs">
                <div className="flex items-center justify-between text-neutral-200">
                  <span className="font-semibold text-white">Shop No. 32 Zion Samsung Building</span>
                  <span className="text-amber-400 font-medium">Walk-ins Welcome</span>
                </div>
                <p className="text-neutral-400 mt-1 text-[11px] leading-tight">
                  Ekotedo, Dugbe commercial corridor · Certified technicians on site
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column trust strip below the hero split */}
        <div className="mt-12 pt-8 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Dugbe, Ibadan Lab</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Physical store in Ekotedo for safe in-person testing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Express Same-Day Fix</h3>
              <p className="text-xs text-neutral-400 mt-0.5">HDMI ports & stick drift repaired in 45m – 2 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Guaranteed Warranty</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Up to 12 months warranty on consoles and repairs</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Direct WhatsApp Sync</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Instant booking & order status with CEO Stephen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
