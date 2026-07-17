import React, { useState, useEffect } from 'react';
import { createOfferingOrder, verifyOfferingPayment } from '../../services/offeringService';

const PURPOSES = [
  { id: 'GENERAL_SEVA', label: 'General Seva', desc: 'Support daily ashram operations and Shala maintenance' },
  { id: 'ANNADANAM', label: 'Annadanam (Sacred Food)', desc: 'Provide wholesome meals to sadhakas and pilgrims' },
  { id: 'GURUKUL_MAINTENANCE', label: 'Gurukul Support', desc: 'Preserve traditional Vedic and yogic heritage' },
  { id: 'FESTIVAL_OFFERING', label: 'Festival & Utsav Seva', desc: 'Contribute toward upcoming sacred celebrations' },
  { id: 'CUSTOM', label: 'Custom Sankalpa', desc: 'Dedicate an offering with your personal prayer' },
];

const PRESET_AMOUNTS = [501, 1008, 2100, 5100];

export default function OfferingModal({ isOpen, onClose }) {
  const [selectedPurpose, setSelectedPurpose] = useState('GENERAL_SEVA');
  const [amount, setAmount] = useState(1008);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gatewayPendingNotice, setGatewayPendingNotice] = useState(null);
  const [verifiedReceipt, setVerifiedReceipt] = useState(null);

  // Load Razorpay checkout script dynamically
  useEffect(() => {
    if (!window.Razorpay && isOpen) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmountSelect = (val) => {
    setIsCustom(false);
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setAmount(customAmount ? Number(customAmount) : 0);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (isCustom) {
      setAmount(val ? Number(val) : 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGatewayPendingNotice(null);
    setVerifiedReceipt(null);

    const finalAmount = isCustom ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) {
      setError('Please enter a valid offering amount (minimum ₹1).');
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError('Please provide your name and valid email address.');
      return;
    }

    setLoading(true);
    try {
      const orderResponse = await createOfferingOrder({
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        amountINR: finalAmount,
        purpose: selectedPurpose,
        message: message.trim(),
      });

      // If Razorpay keys are placeholders, stop right here without processing fake payment
      if (!orderResponse.gatewayReady) {
        setGatewayPendingNotice({
          orderId: orderResponse.orderId,
          amountINR: orderResponse.amountINR,
          message: orderResponse.message,
        });
        setLoading(false);
        return;
      }

      // If gateway is ready and script is loaded, launch real Razorpay popup
      if (!window.Razorpay) {
        setError('Razorpay payment SDK failed to load. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const options = {
        key: orderResponse.keyId,
        amount: orderResponse.amountInPaisa,
        currency: orderResponse.currency,
        name: 'Sri Chakra Yoga Ashram',
        description: `Offering: ${selectedPurpose.replace('_', ' ')}`,
        order_id: orderResponse.orderId,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await verifyOfferingPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyRes.status === 'PAID') {
              setVerifiedReceipt(verifyRes);
            } else {
              setError('Payment verification failed on server. Please contact ashram support.');
            }
          } catch (verErr) {
            setError(verErr.response?.data?.message || verErr.message || 'Payment signature verification failed.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        theme: {
          color: '#d97706', // Amber / Terracotta shade
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initiate offering order.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gray-950 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-gray-200 my-8">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-transparent p-6 border-b border-amber-500/20 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs tracking-widest uppercase font-semibold mb-1">
              <span>ॐ</span>
              <span>Pranav Dhyan Parampara</span>
            </div>
            <h3 className="text-2xl font-serif text-white font-medium">Offer Dakshina & Seva</h3>
            <p className="text-sm text-gray-400 mt-1">
              Support the sacred traditions, daily Shala maintenance, and Annadanam of Sri Chakra Yoga.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* If Verified Receipt Displayed after real payment */}
          {verifiedReceipt ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 text-3xl">
                ✓
              </div>
              <h4 className="text-2xl font-serif text-white mb-2">Sacred Offering Confirmed</h4>
              <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
                Your Dakshina has been cryptographically verified and recorded in the ashram ledger. May this offering bring harmony and spiritual growth.
              </p>

              <div className="bg-black/40 border border-emerald-500/20 rounded-lg p-4 text-left max-w-sm mx-auto space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction Status:</span>
                  <span className="text-emerald-400 font-semibold uppercase">Verified Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Razorpay Payment ID:</span>
                  <span className="font-mono text-white">{verifiedReceipt.razorpayPaymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Offering Amount:</span>
                  <span className="text-white font-semibold">₹{verifiedReceipt.amountINR}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seva Purpose:</span>
                  <span className="text-white">{verifiedReceipt.purpose.replace('_', ' ')}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors shadow-lg"
              >
                Close & Return to Sanctuary
              </button>
            </div>
          ) : gatewayPendingNotice ? (
            /* Gateway Pending Callout (No fake receipt generated) */
            <div className="bg-amber-950/50 border border-amber-500/50 rounded-xl p-6 text-center animate-fade-in space-y-4">
              <div className="w-14 h-14 bg-amber-500/20 border border-amber-500/60 rounded-full flex items-center justify-center mx-auto text-amber-400 text-2xl font-bold">
                !
              </div>
              <div>
                <h4 className="text-xl font-serif text-amber-300 font-semibold mb-2">
                  Payment Gateway Setup Pending
                </h4>
                <p className="text-gray-300 text-sm max-w-lg mx-auto leading-relaxed">
                  {gatewayPendingNotice.message}
                </p>
              </div>

              <div className="bg-black/50 border border-amber-500/30 rounded-lg p-4 max-w-md mx-auto text-left text-xs space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Server Status:</span>
                  <span className="text-amber-400 font-medium">Safe Sandbox Hold (No Fake Charge)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Order Ref:</span>
                  <span className="font-mono text-gray-300">{gatewayPendingNotice.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Requested Offering:</span>
                  <span className="text-white font-semibold">₹{gatewayPendingNotice.amountINR}</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 border-t border-amber-500/20 pt-4 mt-4">
                <strong>Next Step for Admin:</strong> Provide real Razorpay Test Key ID (`rzp_test_...`) and Secret in the backend `application.properties` or `.env` to activate live checkout popups.
              </div>

              <button
                onClick={() => setGatewayPendingNotice(null)}
                className="mt-2 px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs transition-colors"
              >
                ← Modify Offering Details
              </button>
            </div>
          ) : (
            /* Standard Offering Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-red-300 text-sm flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Seva Category Selection */}
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-400 tracking-wider mb-3">
                  1. Select Seva Purpose
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PURPOSES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPurpose(p.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedPurpose === p.id
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{p.label}</div>
                      <div className="text-xs opacity-75 mt-0.5 line-clamp-1">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-400 tracking-wider mb-3">
                  2. Select Dakshina Amount (INR)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-3 px-2 rounded-xl border font-serif text-base transition-all ${
                        !isCustom && amount === amt
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold shadow-sm'
                          : 'border-gray-800 bg-gray-900/60 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleCustomSelect}
                    className={`py-3 px-2 rounded-xl border text-xs font-medium transition-all flex items-center justify-center ${
                      isCustom
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold shadow-sm'
                        : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    Custom ₹
                  </button>
                </div>

                {isCustom && (
                  <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-serif text-lg">
                      ₹
                    </span>
                    <input
                      type="text"
                      placeholder="Enter custom offering amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className="w-full pl-9 pr-4 py-3 bg-gray-900 border border-amber-500/50 rounded-xl text-white font-serif text-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                )}
              </div>

              {/* Donor Details */}
              <div className="border-t border-gray-800 pt-5">
                <label className="block text-xs uppercase font-semibold text-gray-400 tracking-wider mb-3">
                  3. Seeker / Donor Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (Optional)"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Prayer / Sankalpa Message (Optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>
                </div>
              </div>

              {/* Submit / Proceed CTA */}
              <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Total Offering: <strong className="text-amber-400 font-serif text-base ml-1">₹{(isCustom ? Number(customAmount) : amount).toLocaleString()}</strong>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-amber-900/30 transition-all disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed with Offering</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
