import React from 'react';
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck, Navigation } from 'lucide-react';
import { COMPANY_INFO, TESTIMONIALS } from '../data/mockData';

export const StoreLocation: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-neutral-900/30 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Storefront & Service Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Visit Our Dugbe, Ibadan Workshop
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Centrally located in the heart of Dugbe commercial hub for easy drop-offs, console testing, and instant cash trade-ins.
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Details */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                  Physical Store Address
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Shop No. 32 Zion Samsung Building
                </h3>
                <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                  Ekotedo, Dugbe, Ibadan, Oyo State, Nigeria.
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Landmark: {COMPANY_INFO.landmark}
                </p>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-neutral-300 font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Workshop Hours</span>
                </div>
                <div className="text-neutral-400">
                  {COMPANY_INFO.openingHours.weekdays}
                </div>
                <div className="text-neutral-500 text-[11px]">
                  {COMPANY_INFO.openingHours.sunday}
                </div>
              </div>

              {/* Direct CEO Contacts */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-neutral-400 text-[11px]">CEO Phone Hotline</div>
                      <div className="font-mono text-white font-semibold">{COMPANY_INFO.phoneDisplay}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
                  >
                    Call Now
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-neutral-400 text-[11px]">Official WhatsApp Chat</div>
                      <div className="font-mono text-white font-semibold">{COMPANY_INFO.phoneDisplay}</div>
                    </div>
                  </div>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                  >
                    Chat WhatsApp
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-neutral-400 text-[11px]">Customer Support Email</div>
                      <div className="font-mono text-white font-medium truncate max-w-[200px]">{COMPANY_INFO.email}</div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered electronics repair & retail facility in Oyo State, Nigeria.</span>
            </div>
          </div>

          {/* Right Visual Map Card */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="p-6 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Dugbe Commercial Map Guide</span>
                </div>
                <span className="text-xs text-neutral-400">Ekotedo / Cocoa House Area</span>
              </div>
            </div>

            {/* Stylized Map View */}
            <div className="relative flex-1 min-h-[260px] bg-neutral-950 p-6 flex flex-col justify-center items-center text-center">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Zion Samsung Building, Shop 32
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Easily accessible from Mokola, Iwo Road, Ring Road, Bodija, and UI. Parking space available in the complex.
                </p>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Shop No. 32 Zion Samsung Building, Ekotedo, Dugbe, Ibadan, Oyo State, Nigeria')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold transition-colors mt-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Security Guard on duty</span>
              <span>Air-conditioned testing lounge</span>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Real Verified Ibadan Gamer Reviews */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Customer Testimonials
              </span>
              <h3 className="text-xl font-bold text-white">
                Trusted by Gamers Across Ibadan & Nigeria
              </h3>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              4.9 / 5.0 Rating
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 flex flex-col justify-between"
              >
                <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-neutral-400">{t.role} · {t.location}</div>
                  </div>
                  <span className="text-amber-400 font-mono text-xs">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
