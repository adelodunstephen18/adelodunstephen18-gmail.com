import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, Clock, MapPin, MessageSquare, Wrench } from 'lucide-react';
import { RepairAppointment } from '../types';
import { formatNaira } from '../utils/formatters';
import { COMPANY_INFO } from '../data/mockData';

interface RepairTrackerProps {
  appointments: RepairAppointment[];
  onOpenBooking: () => void;
}

const STAGES = [
  'Appointment Confirmed',
  'Device Received',
  'Under Diagnosis',
  'Repairing & Sourcing Parts',
  'Quality Testing',
  'Ready for Pickup',
];

export const RepairTracker: React.FC<RepairTrackerProps> = ({
  appointments,
  onOpenBooking,
}) => {
  const [ticketInput, setTicketInput] = useState('AGW-8492');
  const [searchedTicket, setSearchedTicket] = useState<RepairAppointment | null>(() => {
    return appointments.find((a) => a.id === 'AGW-8492') || appointments[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = ticketInput.trim().toUpperCase();
    const found = appointments.find((a) => a.id.toUpperCase() === cleanId);
    setSearchedTicket(found || null);
    setHasSearched(true);
  };

  const getStageIndex = (status: string) => {
    const idx = STAGES.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <section id="tracker" className="py-16 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-Time Workshop Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Track Console Repair Status
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Enter your repair tracking code (e.g. <strong className="text-neutral-200">AGW-8492</strong>) provided when dropping off your PlayStation, Xbox, or controller at our Dugbe lab.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder="Enter Ticket ID (e.g. AGW-8492)"
                className="w-full pl-10 pr-4 py-3 text-sm bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono placeholder-neutral-500 uppercase focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-sm font-semibold transition-colors shrink-0"
            >
              Check Status
            </button>
          </div>

          {/* Quick sample chips */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-400">
            <span>Quick test samples:</span>
            {['AGW-8492', 'AGW-7104', 'AGW-9033'].map((sampleId) => (
              <button
                key={sampleId}
                type="button"
                onClick={() => {
                  setTicketInput(sampleId);
                  const found = appointments.find((a) => a.id === sampleId);
                  setSearchedTicket(found || null);
                  setHasSearched(true);
                }}
                className="text-amber-400 hover:underline font-mono text-[11px]"
              >
                {sampleId}
              </button>
            ))}
          </div>
        </form>

        {/* Result Area */}
        {searchedTicket ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-8 backdrop-blur-sm">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
              <div>
                <div className="text-xs text-neutral-400">Repair Ticket Reference</div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {searchedTicket.id}
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  {searchedTicket.deviceType}
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  Current: {searchedTicket.status}
                </span>
                <div className="text-xs text-neutral-400 mt-1.5 font-mono">
                  Est. Service: {formatNaira(searchedTicket.estimatedCost)}
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-8">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {STAGES.map((stage, index) => {
                  const currentIdx = getStageIndex(searchedTicket.status);
                  const isPassed = index <= currentIdx;
                  const isCurrent = index === currentIdx;

                  return (
                    <div key={stage} className="flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono mb-2 transition-colors ${
                          isCurrent
                            ? 'bg-amber-400 text-neutral-950 ring-4 ring-amber-400/20'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                      </div>
                      <span
                        className={`text-[11px] leading-tight ${
                          isCurrent
                            ? 'text-white font-semibold'
                            : isPassed
                            ? 'text-neutral-300'
                            : 'text-neutral-500'
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-800 text-xs">
              <div className="space-y-3">
                <div>
                  <span className="text-neutral-400 font-medium">Customer:</span>
                  <span className="text-white ml-2">{searchedTicket.customerName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-medium">Reported Fault:</span>
                  <p className="text-neutral-200 mt-0.5 leading-relaxed bg-neutral-950 p-3 rounded-lg border border-neutral-850">
                    {searchedTicket.issueDescription}
                  </p>
                </div>
                {searchedTicket.technicianNotes && (
                  <div>
                    <span className="text-neutral-400 font-medium">Technician Stephen's Bench Notes:</span>
                    <p className="text-amber-200/90 mt-0.5 leading-relaxed bg-amber-950/20 p-3 rounded-lg border border-amber-900/40">
                      {searchedTicket.technicianNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-medium">Workshop Location:</span>
                  </div>
                  <p className="text-neutral-300 mt-1">
                    Shop 32 Zion Samsung Building, Ekotedo, Dugbe, Ibadan, Nigeria.
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Present this ticket ID or your registered phone number when collecting.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/2349033363437?text=${encodeURIComponent(
                      `Hello CEO Stephen! I am checking on my console repair ticket *${searchedTicket.id}* (${searchedTicket.deviceType}). Could you send me an update or video test?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Bench Status</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-colors"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Book Another Repair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">Ticket Not Found</h3>
            <p className="text-xs text-neutral-400 mt-1">
              We couldn't locate ticket "{ticketInput}". Please verify the number or book a new repair slot.
            </p>
            <button
              onClick={onOpenBooking}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold transition-colors"
            >
              Book New Appointment
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};
