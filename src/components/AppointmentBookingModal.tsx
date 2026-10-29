import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Wrench, Shield, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';
import { RepairService, RepairAppointment } from '../types';
import { formatNaira, generateAppointmentId, buildWhatsAppRepairMessage } from '../utils/formatters';
import { COMPANY_INFO } from '../data/mockData';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  preSelectedService?: RepairService | null;
  onClose: () => void;
  onBookingConfirmed: (appointment: RepairAppointment) => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  preSelectedService,
  onClose,
  onBookingConfirmed,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deviceType, setDeviceType] = useState('PlayStation 5');
  const [issueDescription, setIssueDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [appointmentTime, setAppointmentTime] = useState('11:00 AM');
  const [serviceType, setServiceType] = useState<
    'Shop Drop-Off (Dugbe)' | 'Pickup & Delivery in Ibadan' | 'Waybill Delivery (Nationwide)'
  >('Shop Drop-Off (Dugbe)');
  const [urgency, setUrgency] = useState<'Standard (1-2 Days)' | 'Express Same-Day Priority'>(
    'Standard (1-2 Days)'
  );

  const [confirmedBooking, setConfirmedBooking] = useState<RepairAppointment | null>(null);

  // Sync preSelectedService
  useEffect(() => {
    if (preSelectedService) {
      setDeviceType(preSelectedService.platform);
      setIssueDescription(`${preSelectedService.title}: `);
    }
  }, [preSelectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const baseCost = preSelectedService ? preSelectedService.estimatedCost : 25000;
  const expressFee = urgency === 'Express Same-Day Priority' ? 5000 : 0;
  const estimatedTotal = baseCost + expressFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !issueDescription.trim()) {
      return;
    }

    const newAppointment: RepairAppointment = {
      id: generateAppointmentId(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || 'walkin@adelodgameworld.ng',
      deviceType,
      issueDescription: issueDescription.trim(),
      appointmentDate,
      appointmentTime,
      serviceType,
      urgency,
      status: 'Appointment Confirmed',
      estimatedCost: estimatedTotal,
      createdAt: new Date().toISOString(),
      technicianNotes: 'Scheduled for workshop bench inspection at Shop 32 Zion Samsung Building, Dugbe.',
    };

    onBookingConfirmed(newAppointment);
    setConfirmedBooking(newAppointment);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setIssueDescription('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-400 text-neutral-950">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Book a Console Repair Appointment
              </h2>
              <p className="text-xs text-neutral-400">
                Shop 32 Zion Samsung Building, Ekotedo, Dugbe, Ibadan
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State View */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Appointment Booked Successfully!</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Your repair slot has been logged in our workshop schedule.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-850">
                <span className="text-neutral-400">Repair Ticket Ref:</span>
                <span className="text-base font-bold text-amber-400">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Customer:</span>
                <span className="text-white font-sans">{confirmedBooking.customerName} ({confirmedBooking.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Console / Device:</span>
                <span className="text-white font-sans">{confirmedBooking.deviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Scheduled Time:</span>
                <span className="text-white font-sans">{confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Location / Method:</span>
                <span className="text-white font-sans">{confirmedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-850">
                <span className="text-neutral-400">Est. Service Total:</span>
                <span className="text-white font-bold">{formatNaira(confirmedBooking.estimatedCost)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-800/60 border border-neutral-750 text-xs text-neutral-300 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Drop-off Address:</strong> {COMPANY_INFO.address}. Tell building security you are heading to Shop 32 (Adelod Game World).
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppRepairMessage(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp with CEO</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Babatunde Lawal"
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="gamer@gmail.com"
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Console / Device *
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="PlayStation 5">PlayStation 5 (Disc / Digital / Slim)</option>
                  <option value="PlayStation 4">PlayStation 4 (Fat / Slim / Pro)</option>
                  <option value="Xbox Series">Xbox Series X / Series S</option>
                  <option value="Xbox One">Xbox One / One S / One X</option>
                  <option value="Nintendo Switch">Nintendo Switch (OLED / V2 / Lite)</option>
                  <option value="Controllers">DualSense / Xbox / Pro Controller</option>
                  <option value="Retro & Others">PS3 / Xbox 360 / Other Console</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Fault Symptoms & Issue Description *
              </label>
              <textarea
                required
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="e.g. HDMI port damaged, no display on TV, blue light blinking, stick drift on analog, or liquid metal maintenance needed..."
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Appointment Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Time Slot *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Drop-Off)</option>
                    <option value="11:00 AM">11:00 AM (Late Morning)</option>
                    <option value="01:30 PM">01:30 PM (Afternoon Slot)</option>
                    <option value="03:30 PM">03:30 PM (Late Afternoon)</option>
                    <option value="05:00 PM">05:00 PM (Evening Quick Drop-Off)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Drop-Off or Logistics Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Shop Drop-Off (Dugbe)', label: 'Shop Drop-Off', note: 'Shop 32 Zion Samsung Bldg' },
                  { id: 'Pickup & Delivery in Ibadan', label: 'Ibadan Courier', note: 'Bodija/RingRd/Akobo' },
                  { id: 'Waybill Delivery (Nationwide)', label: 'Nationwide Waybill', note: 'GIGM / Peace Mass' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setServiceType(item.id as any)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      serviceType === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Repair Urgency
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('Standard (1-2 Days)')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    urgency === 'Standard (1-2 Days)'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Standard Queue</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">1 – 2 Days turnaround</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('Express Same-Day Priority')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    urgency === 'Express Same-Day Priority'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400">Express Priority</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Bench priority (+₦5,000)</div>
                </button>
              </div>
            </div>

            {/* Price Preview */}
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-400">Estimated Diagnostic & Labor:</span>
                <span className="block text-white font-mono text-sm font-bold">
                  {formatNaira(estimatedTotal)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pay only after repair is verified</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                Generate Appointment Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
