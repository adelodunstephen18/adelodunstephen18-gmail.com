import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Check, MessageSquare, Banknote, ShieldAlert, MapPin } from 'lucide-react';
import { TRADE_IN_OPTIONS, COMPANY_INFO } from '../data/mockData';
import { formatNaira, buildWhatsAppTradeInMessage } from '../utils/formatters';

export const TradeInValuator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(TRADE_IN_OPTIONS[0].category);
  const [selectedModel, setSelectedModel] = useState(TRADE_IN_OPTIONS[0].models[0]);
  const [condition, setCondition] = useState<'Brand New' | 'Like New (Flawless)' | 'Good' | 'Faulty / Needs Repair'>('Like New (Flawless)');
  const [hasBox, setHasBox] = useState(true);
  const [hasExtraController, setHasExtraController] = useState(false);
  const [hasCables, setHasCables] = useState(true);
  const [customNotes, setCustomNotes] = useState('');

  // Update models when category changes
  const activeCategoryData = useMemo(() => {
    return TRADE_IN_OPTIONS.find((c) => c.category === selectedCategory) || TRADE_IN_OPTIONS[0];
  }, [selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const catData = TRADE_IN_OPTIONS.find((c) => c.category === cat);
    if (catData && catData.models.length > 0) {
      setSelectedModel(catData.models[0]);
    }
  };

  // Pricing valuation calculation
  const valuation = useMemo(() => {
    let base = 200000;
    if (selectedCategory === 'PlayStation 5') {
      base = selectedModel.includes('Slim') ? 580000 : 500000;
      if (selectedModel.includes('Digital')) base -= 60000;
    } else if (selectedCategory === 'PlayStation 4') {
      base = selectedModel.includes('Pro') ? 220000 : 160000;
      if (selectedModel.includes('Fat')) base = 130000;
    } else if (selectedCategory === 'PlayStation 3') {
      base = selectedModel.includes('Super') ? 65000 : 75000;
      if (selectedModel.includes('Fat')) base = 50000;
    } else if (selectedCategory === 'PS Vita') {
      base = selectedModel.includes('Slim') ? 68000 : 60000;
    } else if (selectedCategory === 'Xbox') {
      base = selectedModel.includes('Series X') ? 560000 : 250000;
      if (selectedModel.includes('One')) base = 120000;
    } else if (selectedCategory === 'Nintendo') {
      base = selectedModel.includes('OLED') ? 260000 : 170000;
      if (selectedModel.includes('Lite')) base = 120000;
    } else if (selectedCategory === 'Steam Deck') {
      base = selectedModel.includes('512GB') ? 500000 : 380000;
    } else if (selectedCategory === 'Game Discs') {
      base = selectedModel.includes('Current Gen') ? 45000 : 20000;
    }

    // Condition multiplier
    let mult = 1.0;
    if (condition === 'Brand New') mult = 1.15;
    else if (condition === 'Like New (Flawless)') mult = 1.0;
    else if (condition === 'Good') mult = 0.85;
    else if (condition === 'Faulty / Needs Repair') mult = 0.55; // We buy faulty consoles for repairs!

    let est = base * mult;
    if (hasBox) est += 10000;
    if (hasExtraController) est += 35000;
    if (hasCables) est += 5000;

    const min = Math.round(est * 0.95 / 5000) * 5000;
    const max = Math.round(est * 1.08 / 5000) * 5000;

    return { min, max };
  }, [selectedCategory, selectedModel, condition, hasBox, hasExtraController, hasCables]);

  const rangeString = `${formatNaira(valuation.min)} – ${formatNaira(valuation.max)}`;

  const whatsAppUrl = buildWhatsAppTradeInMessage({
    category: selectedCategory,
    model: selectedModel,
    condition,
    estimatedRange: rangeString,
    notes: `${customNotes ? customNotes + ' | ' : ''}Box: ${hasBox ? 'Yes' : 'No'}, Extra Pad: ${
      hasExtraController ? 'Yes' : 'No'
    }, Cables: ${hasCables ? 'Yes' : 'No'}`,
  });

  return (
    <section id="tradein" className="py-16 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Instant Cash & Trade-In Valuation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Sell or Swap Your Console & Games
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Upgrade your setup or turn unwanted gaming equipment into cash. We even buy faulty consoles for our Dugbe repair laboratory!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 shadow-xl">
          {/* Controls Form */}
          <div className="md:col-span-7 space-y-5">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Select Platform / Item
              </label>
              <div className="flex flex-wrap gap-2">
                {TRADE_IN_OPTIONS.map((item) => (
                  <button
                    key={item.category}
                    type="button"
                    onClick={() => handleCategoryChange(item.category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === item.category
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-neutral-950 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Exact Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              >
                {activeCategoryData.models.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Current Condition
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Brand New', 'Like New (Flawless)', 'Good', 'Faulty / Needs Repair'] as const).map(
                  (cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        condition === cond
                          ? 'border-amber-400 bg-amber-400/10 text-white font-medium'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs text-white">{cond}</div>
                    </button>
                  )
                )}
              </div>
              {condition === 'Faulty / Needs Repair' && (
                <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Yes, we buy consoles with broken HDMI, BLOD, or power faults!</span>
                </div>
              )}
            </div>

            {/* Accessories Checklist */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Included Accessories (Adds Payout)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBox}
                    onChange={(e) => setHasBox(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Original Packaging & Box</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasExtraController}
                    onChange={(e) => setHasExtraController(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Includes Extra Working Controller</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCables}
                    onChange={(e) => setHasCables(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Original Power & HDMI Cables</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Any specific flaws or remarks (Optional)
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. slight scratch on bottom, includes FIFA disc..."
                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="md:col-span-5 flex flex-col justify-between bg-neutral-950 rounded-xl p-6 border border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                <Banknote className="w-4 h-4 text-emerald-400" />
                <span>Estimated Cash Offer</span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums leading-tight">
                {rangeString}
              </div>

              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Subject to physical testing at our Dugbe store. We test ports, drive, software, and serial numbers in 15 minutes before instant bank transfer or cash payout.
              </p>

              <div className="mt-5 p-3 rounded-lg border border-neutral-850 bg-neutral-900/60 text-xs text-neutral-300 space-y-1.5">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Immediate cash or bank transfer</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Trade-in toward PS5 or high-tier games</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Shop 32 Zion Samsung Bldg, Dugbe, Ibadan</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-850">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lock In Offer on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
