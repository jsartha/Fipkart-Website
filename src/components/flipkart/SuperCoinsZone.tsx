import React from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { Coins, Sparkles, Gift, Award, Zap, CheckCircle2, Ticket } from 'lucide-react';

export const SuperCoinsZone: React.FC = () => {
  const { user, updateUserProfile, showToast, setCurrentView } = useFlipkart();

  const rewardVouchers = [
    {
      id: 'rew-1',
      title: 'Disney+ Hotstar Super (3 Months Subscription)',
      brand: 'Disney+ Hotstar',
      coinsCost: 150,
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&auto=format&fit=crop&q=80',
      category: 'Entertainment'
    },
    {
      id: 'rew-2',
      title: 'Flat ₹500 Off on Myntra Fashion Shopping',
      brand: 'Myntra',
      coinsCost: 200,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80',
      category: 'Fashion'
    },
    {
      id: 'rew-3',
      title: 'YouTube Premium (3 Months Ad-Free Experience)',
      brand: 'Google YouTube',
      coinsCost: 120,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=80',
      category: 'Music & Video'
    },
    {
      id: 'rew-4',
      title: 'Dominos Pizza Flat ₹250 Discount Code',
      brand: 'Dominos',
      coinsCost: 100,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
      category: 'Food & Dining'
    }
  ];

  const handleRedeemVoucher = (voucher: typeof rewardVouchers[0]) => {
    if (user.superCoins < voucher.coinsCost) {
      showToast(`Not enough SuperCoins! You need ${voucher.coinsCost} coins (Balance: ${user.superCoins})`, 'warning');
      return;
    }

    updateUserProfile({ superCoins: user.superCoins - voucher.coinsCost });
    const code = 'FKPLUS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    showToast(`Claimed ${voucher.title}! Your voucher code: ${code}`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Flipkart Plus Gold Header Card */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-xl p-6 sm:p-8 text-slate-950 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-yellow-300 font-black text-xs rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-yellow-300" />
              <span>Flipkart Plus VIP Member</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Flipkart SuperCoins Rewards Zone
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
              Earn <strong>4 SuperCoins per ₹100</strong> on every purchase. Redeem coins for instant checkout discounts, OTT streaming passes, and dining vouchers!
            </p>
          </div>

          {/* Coin Balance Pill Card */}
          <div className="bg-slate-950 text-white p-5 rounded-xl border border-yellow-400/30 shadow-2xl flex items-center gap-4 min-w-[220px]">
            <div className="w-14 h-14 rounded-full bg-yellow-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-inner">
              🪙
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Available Balance</p>
              <p className="text-2xl font-black text-yellow-400">{user.superCoins} <span className="text-xs font-semibold text-white">Coins</span></p>
              <p className="text-[10px] text-emerald-400 font-bold mt-0.5">Worth ₹{user.superCoins} at Checkout</p>
            </div>
          </div>
        </div>

        {/* Decorative coin glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Plus Membership Benefits Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs flex items-center gap-3 text-xs">
          <div className="p-3 bg-yellow-50 text-amber-600 rounded-full">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">2X Faster Earning</h4>
            <p className="text-gray-500 text-[11px]">4 Coins per ₹100 spent (Double non-plus users)</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs flex items-center gap-3 text-xs">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Early Access to Sales</h4>
            <p className="text-gray-500 text-[11px]">Shop Big Billion Days 24 hours before everyone else</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs flex items-center gap-3 text-xs">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Free Priority Delivery</h4>
            <p className="text-gray-500 text-[11px]">Free next-day shipping on all Flipkart Assured orders</p>
          </div>
        </div>
      </div>

      {/* SuperCoins Rewards Redemption Catalog */}
      <div className="bg-white rounded-md border border-gray-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-500" />
              <span>Redeem SuperCoins for Vouchers</span>
            </h2>
            <p className="text-xs text-gray-500">Claim OTT streaming, dining and lifestyle coupon passes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {rewardVouchers.map((voucher) => (
            <div key={voucher.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="h-32 bg-gray-100 overflow-hidden relative">
                  <img src={voucher.image} alt={voucher.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/70 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                    {voucher.category}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[11px] font-bold text-blue-600 uppercase">{voucher.brand}</p>
                  <h4 className="font-bold text-gray-900 line-clamp-2">{voucher.title}</h4>
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <span className="font-extrabold text-amber-600 flex items-center gap-1">
                  <span>🪙 {voucher.coinsCost}</span>
                  <span className="text-[10px] text-gray-500 font-normal">Coins</span>
                </span>
                <button
                  onClick={() => handleRedeemVoucher(voucher)}
                  disabled={user.superCoins < voucher.coinsCost}
                  className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-slate-950 font-bold rounded text-xs transition"
                >
                  Claim Reward
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
