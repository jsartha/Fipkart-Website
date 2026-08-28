import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { Address, Order } from '../../types/flipkart';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MapPin, 
  Plus, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  QrCode, 
  Check, 
  ArrowRight,
  Sparkles,
  Package,
  Calendar,
  Download
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId, 
    addAddress, 
    createOrder, 
    user, 
    appliedCoupon, 
    setCurrentView,
    showToast 
  } = useFlipkart();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(2);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState('rahul.sharma@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8921 4452 9012');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('891');
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // New Address Form State
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: 'Karnataka',
    landmark: '',
    type: 'HOME' as 'HOME' | 'WORK',
    isDefault: true
  });

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  // Price calculations
  const totalOriginalPrice = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const packagingFee = cart.length > 0 ? 29 : 0;

  let couponDiscount = 0;
  if (appliedCoupon === 'BIGBILLION' || appliedCoupon === 'FLIPKART10') {
    couponDiscount = Math.round(totalPrice * 0.1);
  } else if (appliedCoupon === 'WELCOME500') {
    couponDiscount = Math.min(totalPrice, 500);
  }

  const finalAmount = Math.max(0, totalPrice + deliveryFee + packagingFee - couponDiscount);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phone || !newAddr.pincode || !newAddr.addressLine) {
      showToast('Please fill all mandatory address fields', 'warning');
      return;
    }
    addAddress(newAddr);
    setShowNewAddressForm(false);
    showToast('New address saved!');
  };

  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      showToast('Please select or add a delivery address', 'warning');
      setActiveStep(2);
      return;
    }

    if (selectedPaymentMethod === 'CASH_ON_DELIVERY' && captchaInput !== captchaCode) {
      showToast('Incorrect captcha code entered', 'error');
      return;
    }

    const order = createOrder({
      items: cart,
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      superCoinsUsed: 0,
      couponCode: appliedCoupon || undefined,
      couponDiscount
    });

    setPlacedOrder(order);

    // Fire Confetti Celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-emerald-200 shadow-xl overflow-hidden">
          
          {/* Green Celebration Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center space-y-2">
            <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Order Placed Successfully!</h2>
            <p className="text-sm text-emerald-100 font-medium">
              Order ID: <span className="font-mono font-bold text-white bg-black/20 px-2 py-0.5 rounded">{placedOrder.orderNumber}</span>
            </p>
          </div>

          <div className="p-6 space-y-6 text-xs">
            
            {/* SuperCoins Earned Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
                  🪙
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">+{placedOrder.superCoinsEarned} SuperCoins Earned!</h4>
                  <p className="text-gray-600">Credited to your Flipkart Plus rewards balance.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                ★ Plus Member
              </span>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="space-y-1">
                <p className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">Delivery Address</p>
                <p className="font-bold text-gray-900">{placedOrder.address.fullName}</p>
                <p className="text-gray-600">{placedOrder.address.addressLine}, {placedOrder.address.locality}</p>
                <p className="text-gray-600">{placedOrder.address.city}, {placedOrder.address.state} - {placedOrder.address.pincode}</p>
                <p className="text-gray-600">Phone: {placedOrder.address.phone}</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">Payment &amp; Delivery</p>
                <p className="text-gray-700">Payment: <strong className="text-gray-900">{placedOrder.paymentMethod}</strong> ({placedOrder.paymentStatus})</p>
                <p className="text-gray-700">Amount Paid: <strong className="text-gray-900">₹{placedOrder.finalPaidAmount.toLocaleString('en-IN')}</strong></p>
                <p className="text-emerald-700 font-bold flex items-center gap-1 pt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Expected Delivery: {placedOrder.expectedDeliveryDate}</span>
                </p>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Ordered Items ({placedOrder.items.length})</h4>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-md">
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.productImage} alt={item.productTitle} className="w-12 h-12 object-contain rounded p-1 border border-gray-100" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.productTitle}</p>
                        {item.selectedVariant && <p className="text-gray-500 text-[11px]">{item.selectedVariant}</p>}
                        <p className="text-gray-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setCurrentView('orders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-1/2 py-3 bg-[#2874f0] hover:bg-blue-700 text-white font-bold rounded-sm shadow text-center uppercase tracking-wider transition"
              >
                Track Order Status
              </button>

              <button
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-1/2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-sm border border-gray-300 text-center uppercase tracking-wider transition"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT 8 COLS: 4-Step Flipkart Checkout Stepper */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* STEP 1: Login */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-blue-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-sm bg-[#2874f0] text-white font-bold text-xs flex items-center justify-center">1</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">LOGIN</h3>
                  <p className="text-xs text-gray-600 font-medium">{user.fullName} <span className="text-gray-400">({user.phone})</span></p>
                </div>
              </div>
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          {/* STEP 2: Delivery Address */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-sm bg-[#2874f0] text-white font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">DELIVERY ADDRESS</h3>
              </div>
              {activeStep !== 2 && (
                <button
                  onClick={() => setActiveStep(2)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase"
                >
                  Change
                </button>
              )}
            </div>

            {activeStep === 2 && (
              <div className="p-4 space-y-4 text-xs">
                {/* Saved Address Cards */}
                <div className="space-y-2">
                  {addresses.map((addr) => {
                    const isSelected = addr.id === selectedAddressId;

                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-3.5 rounded border transition cursor-pointer flex items-start gap-3 ${
                          isSelected ? 'border-blue-600 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="addressRadio"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 text-blue-600"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{addr.fullName}</span>
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                              {addr.type}
                            </span>
                            <span className="font-semibold text-gray-700">{addr.phone}</span>
                          </div>
                          <p className="text-gray-600">
                            {addr.addressLine}, {addr.locality}, {addr.city}, {addr.state} - <strong className="text-gray-900">{addr.pincode}</strong>
                          </p>
                          {isSelected && (
                            <div className="pt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveStep(3);
                                }}
                                className="px-6 py-2 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold uppercase rounded-xs shadow-xs"
                              >
                                DELIVER HERE
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add New Address Accordion */}
                {!showNewAddressForm ? (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="w-full py-3 border border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded flex items-center justify-center gap-2 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD A NEW ADDRESS</span>
                  </button>
                ) : (
                  <form onSubmit={handleSaveAddress} className="bg-gray-50 p-4 rounded border border-gray-200 space-y-3">
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Add New Delivery Location</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number *"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Pincode *"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Locality / Area *"
                        value={newAddr.locality}
                        onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                        required
                      />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Flat, House no., Building, Company, Apartment *"
                      value={newAddr.addressLine}
                      onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                      className="w-full p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City / District *"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={newAddr.landmark}
                        onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                        className="p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <span className="font-semibold text-gray-700">Address Type:</span>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="addrType"
                          checked={newAddr.type === 'HOME'}
                          onChange={() => setNewAddr({ ...newAddr, type: 'HOME' })}
                        />
                        <span>Home (All day delivery)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="addrType"
                          checked={newAddr.type === 'WORK'}
                          onChange={() => setNewAddr({ ...newAddr, type: 'WORK' })}
                        />
                        <span>Work (10 AM - 5 PM)</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#fb641b] text-white font-bold rounded uppercase shadow-xs"
                      >
                        SAVE AND DELIVER HERE
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: Order Summary */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-sm bg-[#2874f0] text-white font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">ORDER SUMMARY ({cart.length} ITEMS)</h3>
              </div>
              {activeStep > 3 && (
                <button
                  onClick={() => setActiveStep(3)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase"
                >
                  Change
                </button>
              )}
            </div>

            {activeStep === 3 && (
              <div className="p-4 space-y-4 text-xs divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.product.thumbnail} alt={item.product.title} className="w-14 h-14 object-contain rounded p-1 border border-gray-100" />
                      <div>
                        <h4 className="font-semibold text-gray-900 line-clamp-1">{item.product.title}</h4>
                        <p className="text-gray-500">Seller: {item.product.seller.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                      <p className="text-emerald-600 font-semibold text-[11px]">{item.product.discountPercent}% Off</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-gray-500">Confirmation email will be sent to <strong>{user.email}</strong></span>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold uppercase rounded-xs shadow-xs"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Payment Options */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-sm bg-[#2874f0] text-white font-bold text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">PAYMENT OPTIONS</h3>
              </div>
            </div>

            {activeStep === 4 && (
              <div className="p-4 space-y-4 text-xs">
                
                {/* 1. UPI */}
                <div className={`p-3.5 rounded border ${selectedPaymentMethod === 'UPI' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === 'UPI'}
                      onChange={() => setSelectedPaymentMethod('UPI')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-gray-900">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                    </div>
                  </label>

                  {selectedPaymentMethod === 'UPI' && (
                    <div className="mt-3 pl-7 space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter your UPI ID (e.g. mobile@upi)"
                          className="flex-1 p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        />
                        <button
                          type="button"
                          onClick={() => showToast('UPI ID Verified!', 'success')}
                          className="px-4 py-2 bg-blue-600 text-white font-bold rounded"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500">Pay directly from your bank account via UPI</p>
                    </div>
                  )}
                </div>

                {/* 2. Credit / Debit Card */}
                <div className={`p-3.5 rounded border ${selectedPaymentMethod === 'CREDIT_DEBIT_CARD' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === 'CREDIT_DEBIT_CARD'}
                      onChange={() => setSelectedPaymentMethod('CREDIT_DEBIT_CARD')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-gray-900">Credit / Debit / ATM Card</span>
                    </div>
                  </label>

                  {selectedPaymentMethod === 'CREDIT_DEBIT_CARD' && (
                    <div className="mt-3 pl-7 space-y-2.5 max-w-md">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (16 Digits)"
                        className="w-full p-2 bg-white border border-gray-300 rounded font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="p-2 bg-white border border-gray-300 rounded font-mono"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="p-2 bg-white border border-gray-300 rounded font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Net Banking */}
                <div className={`p-3.5 rounded border ${selectedPaymentMethod === 'NET_BANKING' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === 'NET_BANKING'}
                      onChange={() => setSelectedPaymentMethod('NET_BANKING')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-gray-900">Net Banking (All Indian Banks Supported)</span>
                    </div>
                  </label>
                </div>

                {/* 4. Cash on Delivery */}
                <div className={`p-3.5 rounded border ${selectedPaymentMethod === 'CASH_ON_DELIVERY' ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === 'CASH_ON_DELIVERY'}
                      onChange={() => setSelectedPaymentMethod('CASH_ON_DELIVERY')}
                      className="text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-gray-900">Cash on Delivery (COD)</span>
                    </div>
                  </label>

                  {selectedPaymentMethod === 'CASH_ON_DELIVERY' && (
                    <div className="mt-3 pl-7 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-base bg-amber-200 px-3 py-1 rounded tracking-widest text-slate-900">
                          {captchaCode}
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Captcha Code"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          className="p-2 border border-gray-300 rounded font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-gray-500">Pay cash or scan QR when delivery agent arrives</p>
                    </div>
                  )}
                </div>

                {/* FINAL PAY CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full sm:w-auto px-10 py-3 bg-[#fb641b] hover:bg-[#e85b16] text-white font-extrabold text-sm uppercase tracking-wider rounded-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>PAY ₹{finalAmount.toLocaleString('en-IN')} &amp; CONFIRM ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* RIGHT 4 COLS: Order Price Summary */}
        <div className="lg:col-span-4 space-y-3 sticky top-18">
          <div className="bg-white rounded-md border border-gray-200 shadow-xs p-4 space-y-3 text-xs">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
              Price Details
            </h3>

            <div className="space-y-2 text-gray-700">
              <div className="flex items-center justify-between">
                <span>Price ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between text-sm font-extrabold text-gray-900">
                <span>Total Payable</span>
                <span>₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-gray-500 text-[11px] border-t border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Safe &amp; Secure 256-bit SSL Encrypted Payments</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
