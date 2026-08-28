import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { User, X, Sparkles, CheckCircle2, Phone, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserProfile, showToast } = useFlipkart();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('4829');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    setOtpStep(true);
    showToast(`OTP 4829 sent to +91 ${phoneNumber}! (Auto-filled)`, 'info');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName,
      phone: '+91 ' + phoneNumber,
      email
    });
    onClose();
    setOtpStep(false);
    showToast(`Welcome back, ${fullName}! Successfully logged in.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full flex overflow-hidden text-xs">
        
        {/* Left Blue Banner */}
        <div className="w-2/5 bg-[#2874f0] p-6 text-white flex flex-col justify-between hidden sm:flex">
          <div className="space-y-3">
            <h3 className="text-2xl font-black">Login</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Get access to your Orders, Wishlist, SuperCoins &amp; personalized recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-yellow-300 font-bold bg-blue-700/60 p-2 rounded">
            <Sparkles className="w-4 h-4 fill-yellow-300" />
            <span>Plus Membership Benefits Active</span>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 p-6 sm:p-8 space-y-4 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded text-gray-500">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-base font-bold text-gray-900">
            {otpStep ? 'Enter OTP Verification' : 'Login or Sign Up'}
          </h2>

          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full p-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full p-2.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Enter Mobile Number</label>
                <div className="flex">
                  <span className="p-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-gray-600 font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit number"
                    className="w-full p-2.5 border border-gray-300 rounded-r text-xs focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <p className="text-[11px] text-gray-400">
                By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold rounded uppercase shadow"
              >
                REQUEST OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <p className="text-gray-600">
                Please enter the 4-digit code sent to <strong>+91 {phoneNumber}</strong>
              </p>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-xl tracking-widest font-mono p-3 border-2 border-blue-600 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold rounded uppercase shadow"
              >
                VERIFY &amp; LOGIN
              </button>

              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="w-full text-center text-blue-600 font-semibold"
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
