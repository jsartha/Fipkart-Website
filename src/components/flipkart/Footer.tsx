import React from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { 
  Store, 
  HelpCircle, 
  Gift, 
  CreditCard, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';

export const Footer: React.FC<{ onOpenSeller: () => void }> = ({ onOpenSeller }) => {
  const { setCurrentView } = useFlipkart();

  return (
    <footer className="bg-slate-900 text-gray-300 text-xs mt-12 border-t border-slate-800">
      
      {/* Top 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-[11px] leading-relaxed">
          
          {/* ABOUT */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">ABOUT</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:underline hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Flipkart Stories</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Press</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Corporate Information</a></li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">GROUP COMPANIES</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline hover:text-white">Myntra</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Cleartrip</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Shopsy</a></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">HELP</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline hover:text-white">Payments</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Cancellation &amp; Returns</a></li>
              <li><a href="#" className="hover:underline hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">CONSUMER POLICY</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline hover:text-white">Cancellation &amp; Returns</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Security</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Sitemap</a></li>
              <li><a href="#" className="hover:underline hover:text-white">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="space-y-2.5 lg:border-l lg:border-slate-800 lg:pl-6">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Mail Us:</h4>
            <p className="text-gray-400">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &amp;<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India
            </p>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Registered Office:</h4>
            <p className="text-gray-400">
              Flipkart Internet Private Limited,<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: 044-45614700 / 044-67415800
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Features Strip */}
      <div className="border-t border-slate-800 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <button
              onClick={onOpenSeller}
              className="flex items-center gap-1.5 hover:text-yellow-400 transition font-semibold"
            >
              <Store className="w-4 h-4 text-yellow-400" />
              <span>Become a Seller</span>
            </button>

            <button
              onClick={() => setCurrentView('supercoins')}
              className="flex items-center gap-1.5 hover:text-yellow-400 transition font-semibold"
            >
              <Gift className="w-4 h-4 text-yellow-400" />
              <span>SuperCoins &amp; Rewards</span>
            </button>

            <div className="flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>Help Center</span>
            </div>
          </div>

          <div className="text-gray-500 text-[11px]">
            © 2007-2026 Flipkart.com | All rights reserved.
          </div>

          {/* Card & Payment Logos */}
          <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px]">
            <span className="px-1.5 py-0.5 bg-slate-800 rounded font-bold">VISA</span>
            <span className="px-1.5 py-0.5 bg-slate-800 rounded font-bold">MasterCard</span>
            <span className="px-1.5 py-0.5 bg-slate-800 rounded font-bold">RuPay</span>
            <span className="px-1.5 py-0.5 bg-slate-800 rounded font-bold">UPI</span>
            <span className="px-1.5 py-0.5 bg-slate-800 rounded font-bold">NetBanking</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
