import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { flipkartCategories } from '../../data/flipkartCategories';
import { Product } from '../../types/flipkart';
import { Store, X, Plus, ShieldCheck, Upload, Sparkles } from 'lucide-react';

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({ isOpen, onClose }) => {
  const { addNewProduct, openProductDetail } = useFlipkart();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Mobiles');
  const [subcategory, setSubcategory] = useState('Smartphones');
  const [price, setPrice] = useState('49999');
  const [originalPrice, setOriginalPrice] = useState('59999');
  const [stockCount, setStockCount] = useState('25');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80');
  const [highlights, setHighlights] = useState('12GB RAM | 256GB ROM\n6.7" OLED 120Hz Display\n50MP Triple AI Camera\n5000 mAh Fast Charge');
  const [isAssured, setIsAssured] = useState(true);
  const [sellerName, setSellerName] = useState('My Flipkart Store');
  const [warranty, setWarranty] = useState('1 Year Brand Warranty');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !brand || !price || !originalPrice) return;

    const numPrice = Number(price);
    const numOrig = Number(originalPrice);
    const discountPercent = Math.max(0, Math.round(((numOrig - numPrice) / numOrig) * 100));

    const newProd: Product = {
      id: 'prod-' + Date.now(),
      title,
      brand,
      category,
      subcategory,
      price: numPrice,
      originalPrice: numOrig,
      discountPercent,
      rating: 4.5,
      ratingCount: 1,
      reviewCount: 1,
      thumbnail: imageUrl,
      images: [imageUrl],
      inStock: true,
      stockCount: Number(stockCount) || 10,
      isAssured,
      highlights: highlights.split('\n').filter(h => h.trim().length > 0),
      specifications: [
        {
          groupName: 'General',
          specs: [
            { name: 'Brand', value: brand },
            { name: 'Model', value: title }
          ]
        }
      ],
      bankOffers: [
        { id: 'bo-seller-1', bankName: 'Flipkart Axis', title: '5% Unlimited Cashback on Axis Bank Cards' }
      ],
      seller: {
        name: sellerName,
        rating: 4.9,
        isFlipkartAssured: isAssured,
        returnPolicyDays: 7
      },
      tags: ['TRENDING'],
      deliveryDays: 1,
      warranty
    };

    addNewProduct(newProd);
    onClose();
    openProductDetail(newProd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-xs">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#2874f0] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-sm">Flipkart Seller Hub — List a Product</h3>
              <p className="text-[11px] text-blue-100">Add new items directly into the live marketplace catalog</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-blue-600 rounded">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            <label className="font-bold text-gray-700">Product Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Realme GT 6 (Fluid Silver, 256 GB, 12 GB RAM)"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Brand Name *</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple, Samsung, Nike, Sony"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
              >
                {flipkartCategories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Selling Price (₹) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49999"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">M.R.P. (₹) *</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="59999"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Stock Units</label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="25"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Product Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Key Highlights (1 per line)</label>
            <textarea
              rows={3}
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="Enter bullet points separated by new lines"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Seller Store Name</label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Warranty Coverage</label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAssured}
                onChange={(e) => setIsAssured(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div className="flex items-center gap-1 font-bold text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Enroll in Flipkart Assured (Faster Delivery &amp; Quality Seal)</span>
              </div>
            </label>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold rounded uppercase shadow"
            >
              Publish to Flipkart Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
