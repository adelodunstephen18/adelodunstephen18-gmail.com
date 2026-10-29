import React from 'react';
import { Wrench, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { REPAIR_SERVICES, COMPANY_INFO } from '../data/mockData';
import { RepairService } from '../types';
import { formatNaira } from '../utils/formatters';

interface RepairServicesProps {
  onSelectServiceForBooking: (service: RepairService) => void;
  onOpenGeneralBooking: () => void;
}

export const RepairServices: React.FC<RepairServicesProps> = ({
  onSelectServiceForBooking,
  onOpenGeneralBooking,
}) => {
  return (
    <section id="repairs" className="py-16 bg-neutral-900/40 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Certified Electronics Lab · Dugbe, Ibadan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Professional Console Diagnostics & Hardware Repairs
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Equipped with precision micro-soldering stations, thermal imaging cameras, and OEM components. We fix what other shops write off — from broken PS5 HDMI ports to permanent Hall-effect stick drift upgrades.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              onClick={onOpenGeneralBooking}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm"
            >
              <span>Book Custom Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Workshop Showcase Banner */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 h-64 lg:h-auto min-h-[260px] relative bg-neutral-950">
            <img
              src={COMPANY_INFO.images.repairBench}
              alt="Adelod Game World Precision Micro-Soldering Station"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-1">
              Workshop Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Why Gamers Across Nigeria Trust Our Dugbe Lab
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Clean Room Protocol:</strong> Anti-static workstation, ultrasonic cleaning tanks, and microscope-guided solder joint verification.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Genuine OEM Parts:</strong> We stock original PS5 HDMI 2.1 sockets, Panasonic laser lenses, and automotive-grade Hall-effect stick sensors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Real Workshop Warranty:</strong> Every completed repair carries 3 to 12 months full warranty backed by our physical store at Shop 32 Zion Samsung Building.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPAIR_SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200"
            >
              <div>
                {/* Platform and Turnaround */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-semibold uppercase tracking-wider text-neutral-300">
                    {service.platform}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {service.turnaroundTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Common Symptoms checklist */}
                <div className="pt-3 border-t border-neutral-800/80">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                    Common Symptoms:
                  </span>
                  <ul className="space-y-1.5">
                    {service.commonSymptoms.map((symp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                        <span className="text-amber-400 font-bold shrink-0">·</span>
                        <span>{symp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cost & Book CTA */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                    Service Estimate
                  </div>
                  <div className="text-lg font-bold text-white font-mono tabular-nums">
                    {formatNaira(service.estimatedCost)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{service.warrantyMonths} Months Warranty</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(service)}
                  className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-white text-xs font-semibold transition-colors whitespace-nowrap border border-neutral-700"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
