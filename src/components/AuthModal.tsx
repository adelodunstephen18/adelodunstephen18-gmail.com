import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Lock, ShieldCheck, Gamepad2, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatNaira } from '../utils/formatters';

export const AuthModal: React.FC = () => {
  const {
    currentUser,
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    logout,
  } = useAuth();

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Ibadan');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showProfileView, setShowProfileView] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await login(loginIdentifier, loginPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.message || 'Login failed. Please verify your details.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      city: regCity,
    });
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.message || 'Registration failed.');
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await login('adelodunstephen18@gmail.com');
    setLoading(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-neutral-950/85 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {currentUser ? 'Gamer Account Profile' : authMode === 'login' ? 'Gamer Sign In' : 'Create Gamer Account'}
              </h3>
              <p className="text-[11px] text-neutral-400">
                ADELOD GAME WORLD · Dugbe, Ibadan
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already logged in, show their profile & order receipts */}
        {currentUser ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center text-lg font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{currentUser.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                    {currentUser.tier}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 truncate">{currentUser.email}</div>
                <div className="text-xs text-neutral-400 font-mono">{currentUser.phone}</div>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-300">
                <span className="text-neutral-500">Delivery City</span>
                <span className="font-semibold text-white">{currentUser.city || 'Ibadan'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-300">
                <span className="text-neutral-500">Member Since</span>
                <span className="font-semibold text-white">{currentUser.registeredAt}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-300">
                <span className="text-neutral-500">Dugbe Workshop Perks</span>
                <span className="text-emerald-400 font-semibold">Priority Diagnostics & Warranty</span>
              </div>
            </div>

            {/* Saved Orders */}
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                My Recent Orders & Receipts ({currentUser.savedOrders?.length || 0})
              </h5>
              {currentUser.savedOrders && currentUser.savedOrders.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {currentUser.savedOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-white">{ord.id}</div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                          {ord.items}
                        </div>
                        <div className="text-[10px] text-neutral-500">{ord.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-amber-400">
                          {formatNaira(ord.totalAmount)}
                        </div>
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 text-center text-xs text-neutral-400">
                  No orders placed yet. Add items to your Cart and checkout via WhatsApp with 1-click!
                </div>
              )}
            </div>

            {/* Logout Action */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={logout}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tabs for Login vs Register */}
            <div className="grid grid-cols-2 bg-neutral-950/60 border-b border-neutral-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  openAuthModal('login');
                }}
                className={`py-3 text-center transition-colors border-b-2 ${
                  authMode === 'login'
                    ? 'border-amber-400 text-amber-400 bg-neutral-900/60'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  openAuthModal('register');
                }}
                className={`py-3 text-center transition-colors border-b-2 ${
                  authMode === 'register'
                    ? 'border-amber-400 text-amber-400 bg-neutral-900/60'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMessage && (
              <div className="mx-6 mt-4 p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            {authMode === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address or Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. gamer@gmail.com or 0803..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Password / Access Code
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In to Account'}
                </button>

                {/* Quick 1-click Demo Login */}
                <div className="pt-2">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-neutral-800" />
                    <span className="flex-shrink mx-3 text-[10px] text-neutral-500 uppercase tracking-wider">
                      Or Fast Login
                    </span>
                    <div className="flex-grow border-t border-neutral-800" />
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full py-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 text-neutral-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick Login as Stephen (VIP Member)</span>
                  </button>
                </div>

                <div className="text-center pt-1">
                  <span className="text-xs text-neutral-400">Don't have an account yet? </span>
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Stephen Adelodun"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. gamer@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0803 123 4567"
                        className="w-full pl-8 pr-2 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      City / Area
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="text"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="Ibadan / Dugbe"
                        className="w-full pl-8 pr-2 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Delivery Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="e.g. Bodija, Ring Road, UI, or Dugbe Pickup"
                    className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* VIP Perks */}
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Member Advantages</span>
                  </div>
                  <div className="text-neutral-400">
                    ✓ Instant repair status sync with WhatsApp notifications<br />
                    ✓ Fast 1-click cart checkout with saved address<br />
                    ✓ Priority discounts on UK used consoles and new game discs
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>

                <div className="text-center pt-1">
                  <span className="text-xs text-neutral-400">Already registered? </span>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
