import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, MessageSquare, MapPin, User, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatNaira, buildWhatsAppOrderMessage } from '../utils/formatters';
import { COMPANY_INFO } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { currentUser, openAuthModal, recordOrder } = useAuth();

  const [deliveryMethod, setDeliveryMethod] = useState<'Store Pickup (Dugbe)' | 'Ibadan City Delivery' | 'Interstate Waybill'>(
    'Store Pickup (Dugbe)'
  );
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [paymentOption, setPaymentOption] = useState<'Pay on Dugbe Pickup' | 'Bank Transfer (Instant)' | 'WhatsApp Order'>(
    'Pay on Dugbe Pickup'
  );
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  } | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.name);
      if (!phone) setPhone(currentUser.phone);
      if (!address && currentUser.address) setAddress(currentUser.address);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemsSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee =
    deliveryMethod === 'Store Pickup (Dugbe)'
      ? 0
      : deliveryMethod === 'Ibadan City Delivery'
      ? 2500
      : 6000;
  const grandTotal = itemsSubtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || items.length === 0) return;

    const randomId = 'AGW-ORD-' + Math.floor(1000 + Math.random() * 9000);
    const orderData = {
      orderId: randomId,
      total: grandTotal,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
    };

    const itemsSummary = items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ');
    recordOrder(itemsSummary, grandTotal);

    setConfirmedOrder(orderData);
    onClearCart();
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    setFullName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={handleFinish}
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Your Shopping Bag</h2>
            <span className="text-xs text-neutral-400 font-mono tabular-nums">
              ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={handleFinish}
            aria-label="Close cart"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order State */}
        {confirmedOrder ? (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Order Received!</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Ref: <span className="text-amber-400 font-mono font-bold">{confirmedOrder.orderId}</span>
              </p>

              <div className="mt-6 p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-left text-xs space-y-2">
                <div className="text-neutral-400">Customer: <strong className="text-white">{fullName}</strong> ({phone})</div>
                <div className="text-neutral-400">Method: <strong className="text-white">{deliveryMethod}</strong></div>
                {address && <div className="text-neutral-400">Address: <span className="text-neutral-200">{address}</span></div>}
                <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm">
                  <span className="text-neutral-300">Total:</span>
                  <span className="text-amber-400 font-mono tabular-nums">{formatNaira(confirmedOrder.total)}</span>
                </div>
              </div>

              {deliveryMethod === 'Store Pickup (Dugbe)' && (
                <div className="mt-4 p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 text-left flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Ready for collection at Shop 32 Zion Samsung Building, Dugbe, Ibadan. Bring your order ref.</span>
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              <a
                href={buildWhatsAppOrderMessage({
                  orderId: confirmedOrder.orderId,
                  items: confirmedOrder.items,
                  total: confirmedOrder.total,
                  customerName: fullName,
                  phone,
                  deliveryMethod,
                  address,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp with CEO</span>
              </a>

              <button
                onClick={handleFinish}
                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-neutral-600 mb-3" />
            <h3 className="text-base font-bold text-white">Your bag is empty</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">
              Explore our PlayStation, Xbox consoles, game discs, and high-performance gaming gear.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Items List + Checkout Form */
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-4 sm:p-5 divide-y divide-neutral-800 space-y-4">
              {/* Item row */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center py-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-neutral-950 border border-neutral-800 shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-neutral-400 font-mono tabular-nums mt-0.5">
                        {formatNaira(item.product.price)}
                      </div>
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-medium text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery & Checkout Details */}
              <form id="checkout-form" onSubmit={handleCheckout} className="pt-4 space-y-3 text-xs">
                <span className="font-semibold text-neutral-200 block uppercase tracking-wider text-[11px]">
                  Fulfillment & Delivery
                </span>

                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'Store Pickup (Dugbe)', label: 'Pickup at Dugbe Shop', cost: 'Free' },
                    { id: 'Ibadan City Delivery', label: 'Ibadan Courier', cost: '+₦2,500' },
                    { id: 'Interstate Waybill', label: 'Interstate (GIGM/Peace)', cost: '+₦6,000' },
                  ].map((del) => (
                    <button
                      key={del.id}
                      type="button"
                      onClick={() => setDeliveryMethod(del.id as any)}
                      className={`flex justify-between items-center px-3 py-2 rounded-lg border text-left transition-colors ${
                        deliveryMethod === del.id
                          ? 'border-amber-400 bg-amber-400/10 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{del.label}</span>
                      <span className="font-mono">{del.cost}</span>
                    </button>
                  ))}
                </div>

                {currentUser ? (
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-white font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ordering as <strong className="text-amber-400">{currentUser.name}</strong></span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-bold text-[10px] border border-amber-400/20">
                      {currentUser.tier}
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Have a gamer account?</span>
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="text-amber-400 hover:text-amber-300 hover:underline font-semibold"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Segun Daniel"
                    className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0810 000 0000"
                    className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {deliveryMethod !== 'Store Pickup (Dugbe)' && (
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Bodija, Ibadan or Ikeja, Lagos"
                      className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Payment Method</label>
                  <select
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value as any)}
                    className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Pay on Dugbe Pickup">Cash / POS on Pickup at Shop 32 Dugbe</option>
                    <option value="Bank Transfer (Instant)">Instant Bank Transfer (GTB / Zenith / OPay)</option>
                    <option value="WhatsApp Order">Direct Order Confirmation via WhatsApp</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Bottom Total & Submit */}
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950">
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums">{formatNaira(itemsSubtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery ({deliveryMethod}):</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-850">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 font-mono tabular-nums">{formatNaira(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                Place Order ({formatNaira(grandTotal)})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
