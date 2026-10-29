import React, { useState } from 'react';
import { Play, Tv, MessageSquare, Search, X, Check, Flame } from 'lucide-react';
import { GameDemo } from '../types';
import { GAME_DEMOS } from '../data/gameDemosData';
import { formatNaira } from '../utils/formatters';

export const GameDemosShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDemoModal, setActiveDemoModal] = useState<GameDemo | null>(null);

  const categories = ['All', 'Upcoming', 'PlayStation Exclusives', 'Action RPG', 'Blockbusters', 'Sports'];

  const filteredDemos = GAME_DEMOS.filter((demo) => {
    const matchesCategory = activeCategory === 'All' || demo.category === activeCategory;
    const matchesSearch =
      demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.studio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const buildWhatsAppDemoOrder = (demo: GameDemo) => {
    const text = `Hello CEO Stephen / Adelod Game World! I am checking out the *${demo.title}* demo on your website. I want to inquire about purchasing / pre-ordering the physical disc or testing it at your Shop 32 Zion Samsung Building, Dugbe store!`;
    return `https://wa.me/2349033363437?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="demos" className="py-16 bg-neutral-950 border-b border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Next-Gen Playable Demos & Cinematic Showcases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Watch Gameplay Demos & Upcoming Blockbusters
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Experience gameplay teasers, 4K ray-traced graphics, and trailers for the world’s most anticipated titles. Visit our Shop 32 Dugbe store to test live games on our 4K OLED gaming display!
            </p>
          </div>

          {/* Dugbe In-Store Test Banner */}
          <div className="p-3.5 rounded-xl border border-amber-400/30 bg-amber-950/20 text-xs text-neutral-300 max-w-xs shrink-0 flex items-start gap-2.5">
            <Tv className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">Dugbe Live Gaming Station</div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Test PS5, PS5 Pro & Switch games in-person at Shop 32 Zion Samsung Building before buying!
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8 pb-4 border-b border-neutral-850">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 007, GTA6, Wukong, FC27..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemos.map((demo) => (
            <article
              key={demo.id}
              className="group flex flex-col justify-between bg-neutral-900/80 rounded-2xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Poster Container with Play Trigger */}
                <div className="relative aspect-16/9 overflow-hidden bg-neutral-950">
                  <img
                    src={demo.poster}
                    alt={demo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setActiveDemoModal(demo)}
                    className="absolute inset-0 flex items-center justify-center group/btn cursor-pointer"
                    aria-label={`Play demo for ${demo.title}`}
                  >
                    <div className="w-13 h-13 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl transition-all group-hover/btn:scale-115 group-hover/btn:bg-amber-300">
                      <Play className="w-6 h-6 ml-1 fill-neutral-950" />
                    </div>
                  </button>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {demo.resolutionBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-neutral-900/85 backdrop-blur-md text-neutral-200 border border-neutral-750">
                      {demo.releaseStatus}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1.5">
                    <span className="font-semibold text-neutral-300">{demo.studio}</span>
                    <span>·</span>
                    <span>{demo.genre}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {demo.title}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Supported Hardware platforms */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {demo.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-950 text-neutral-400 border border-neutral-855"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-neutral-850/60 mt-4 flex items-center justify-between gap-3">
                {demo.discPrice ? (
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Physical Disc</div>
                    <div className="text-sm font-bold text-white font-mono tabular-nums">
                      {formatNaira(demo.discPrice)}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-amber-400 font-medium">Demo Available</div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDemoModal(demo)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Demo</span>
                  </button>

                  <a
                    href={buildWhatsAppDemoOrder(demo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Inquire / Pre-Order on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Gameplay Demo Video Modal */}
      {activeDemoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <div
            onClick={() => setActiveDemoModal(null)}
            className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md transition-opacity"
          />

          {/* Modal Surface */}
          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col">
            {/* Header bar */}
            <div className="px-5 py-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-white truncate max-w-md">
                  {activeDemoModal.title} — Official Gameplay Showcase
                </h3>
              </div>

              <button
                onClick={() => setActiveDemoModal(null)}
                aria-label="Close demo player"
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player 16:9 Iframe */}
            <div className="relative aspect-16/9 bg-black w-full">
              <iframe
                src={`${activeDemoModal.trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={`${activeDemoModal.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Details and Dugbe Store Action */}
            <div className="p-6 bg-neutral-900 space-y-4 max-h-[40vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                <div>
                  <div className="text-xs text-neutral-400">
                    {activeDemoModal.studio} · {activeDemoModal.genre}
                  </div>
                  <h4 className="text-lg font-bold text-white">{activeDemoModal.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-mono font-semibold">
                    {activeDemoModal.resolutionBadge}
                  </span>
                  {activeDemoModal.discPrice && (
                    <span className="text-sm font-mono font-bold text-white">
                      {formatNaira(activeDemoModal.discPrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeDemoModal.description}
              </p>

              {/* Key Features */}
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Key Technical Features
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeDemoModal.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Store testing banner & Call to Action */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-300 flex items-start gap-2.5">
                  <Tv className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Want to play this in person?</strong> Visit our testing lounge at Shop 32 Zion Samsung Building, Dugbe, Ibadan to test it on our 4K OLED TV setup!
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={buildWhatsAppDemoOrder(activeDemoModal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs whitespace-nowrap transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire / Pre-Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
