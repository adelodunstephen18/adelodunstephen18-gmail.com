import React from 'react';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Address */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.images.logo}
                alt="ADELOD GAMES WORLD Logo"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-lg object-cover ring-1 ring-amber-400/40"
              />
              <h3 className="text-base font-bold text-white tracking-tight uppercase">
                {COMPANY_INFO.name}
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Your premier gaming hub in Ibadan, Nigeria. Buying, selling, trade-ins, and precision motherboard repairs for PlayStation, Xbox, Nintendo, and pro gaming accessories.
            </p>
            <div className="flex items-start gap-2 text-xs text-neutral-300 pt-1">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#store" className="hover:text-amber-400 transition-colors">
                  Buy Consoles & Discs
                </a>
              </li>
              <li>
                <a href="#demos" className="hover:text-amber-400 transition-colors">
                  Game Demos & Trailers
                </a>
              </li>
              <li>
                <a href="#repairs" className="hover:text-amber-400 transition-colors">
                  Console Repair Lab
                </a>
              </li>
              <li>
                <a href="#tradein" className="hover:text-amber-400 transition-colors">
                  Sell or Trade-In Equipment
                </a>
              </li>
              <li>
                <a href="#tracker" className="hover:text-amber-400 transition-colors">
                  Live Repair Status Tracker
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Dugbe Workshop Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>
            </div>
            <div className="pt-2 text-[11px] text-neutral-500">
              Monday – Saturday: 8:30 AM – 6:30 PM
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} ADELOD GAME WORLD. All rights reserved. Dugbe, Ibadan, Nigeria.</p>
          <div className="flex gap-4">
            <span>PlayStation · Xbox · Nintendo · PC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
