import React from 'react';
import { Wrench, ShoppingBag, User } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenBooking }) => {
  const { currentUser, openAuthModal } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-8 h-20 sm:h-22">
          {/* Zone 1: Brand logo with Kratos holding PS5 & Xbox controllers */}
          <a
            href="#"
            className="flex items-center gap-3 sm:gap-3.5 text-lg sm:text-xl font-black tracking-tight text-white uppercase hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group py-1"
          >
            <img
              src={COMPANY_INFO.images.logo}
              alt="ADELOD GAMES WORLD Logo"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover ring-2 ring-amber-400/50 shadow-lg shadow-black/60 group-hover:ring-amber-400 group-hover:scale-105 transition-all"
            />
            <span className="hidden xs:inline">ADELOD GAMES WORLD</span>
          </a>

          {/* Zone 2: concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-neutral-300">
            <a href="#store" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Buy Games
            </a>
            <a href="#demos" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors whitespace-nowrap shrink-0">
              Game Demos
            </a>
            <a href="#repairs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Repair Lab
            </a>
            <a href="#tradein" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Sell & Trade-In
            </a>
            <a href="#tracker" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Track Repair
            </a>
            <a href="#location" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Dugbe Store
            </a>
          </nav>

          {/* Zone 3: User Auth + Cart + Primary Action */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* User Profile / Login Button */}
            {currentUser ? (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 text-white text-xs font-semibold transition-colors"
                title="View Gamer Account Profile"
              >
                <div className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 text-xs font-semibold transition-colors"
                title="Login or Create Account"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="hidden sm:inline">Sign In / Register</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Cart Trigger with label */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-xs font-semibold"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-neutral-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Repair CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Book Repair</span>
              <span className="xs:hidden">Repair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
