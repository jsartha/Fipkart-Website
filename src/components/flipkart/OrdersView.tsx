import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  Download, 
  RotateCcw, 
  ChevronRight, 
  HelpCircle,
  XCircle,
  FileText
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, cancelOrder, setCurrentView, showToast } = useFlipkart();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter === 'ON_THE_WAY') {
      if (order.status === 'DELIVERED' || order.status === 'CANCELLED') return false;
    } else if (statusFilter === 'DELIVERED') {
      if (order.status !== 'DELIVERED') return false;
    } else if (statusFilter === 'CANCELLED') {
      if (order.status !== 'CANCELLED') return false;
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchItem = order.items.some(item => item.productTitle.toLowerCase().includes(q));
      if (!matchNumber && !matchItem) return false;
    }

    return true;
  });

  const handleDownloadInvoice = (orderNumber: string) => {
    showToast(`Downloading Tax Invoice for ${orderNumber}... 📄`, 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-md border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span>My Orders ({orders.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Track shipments, download invoices &amp; manage past purchases</p>
        </div>

        {/* Search within orders */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search in your orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'ALL', label: 'All Orders' },
          { id: 'ON_THE_WAY', label: 'On the Way' },
          { id: 'DELIVERED', label: 'Delivered' },
          { id: 'CANCELLED', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              statusFilter === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isTrackingExpanded = selectedOrderForTracking === order.id;

            return (
              <div key={order.id} className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden text-xs">
                
                {/* Top Order Metadata Strip */}
                <div className="px-4 py-3 bg-gray-50/75 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-gray-900">Order #{order.orderNumber}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">Placed on {order.orderedDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">Total: ₹{order.finalPaidAmount.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => handleDownloadInvoice(order.orderNumber)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-4 space-y-4 divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.productImage} alt={item.productTitle} className="w-16 h-16 object-contain rounded p-1 border border-gray-100 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{item.productTitle}</h4>
                          {item.selectedVariant && <p className="text-gray-500 text-[11px]">{item.selectedVariant}</p>}
                          <p className="text-gray-500 text-[11px]">Quantity: {item.quantity}</p>
                          <p className="font-bold text-gray-900 text-sm mt-0.5">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="sm:text-right space-y-1">
                        <div className="flex sm:justify-end items-center gap-1.5">
                          {order.status === 'DELIVERED' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Delivered on {order.expectedDeliveryDate}</span>
                            </span>
                          ) : order.status === 'CANCELLED' ? (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Cancelled</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              <Truck className="w-3.5 h-3.5" />
                              <span>Expected by {order.expectedDeliveryDate}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400">Your item has been verified by seller</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Actions Strip */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedOrderForTracking(isTrackingExpanded ? null : order.id)}
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>{isTrackingExpanded ? 'Hide Tracking Steps' : 'Track Package Details'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isTrackingExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="text-rose-600 hover:text-rose-800 font-semibold"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Need Help with this Order? Call 1800-202-9898</span>
                  </div>
                </div>

                {/* Expanded Tracking Timeline */}
                {isTrackingExpanded && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-4">Delivery Lifecycle Tracking</h4>
                    
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                      {order.trackingSteps.map((step, sIdx) => (
                        <div key={sIdx} className="relative flex items-start gap-3">
                          <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            step.completed
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                              : step.current
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {step.completed ? '✓' : sIdx + 1}
                          </div>
                          <div>
                            <p className={`font-bold ${step.completed || step.current ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                            <p className="text-gray-500 text-[11px]">{step.description}</p>
                            <p className="text-gray-400 text-[10px]">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-md border border-gray-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-800">No orders found</h3>
            <p className="text-xs text-gray-500">You don't have any orders matching your criteria.</p>
          </div>
          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 bg-[#2874f0] text-white text-xs font-bold rounded shadow hover:bg-blue-700 transition"
          >
            Start Shopping on Flipkart
          </button>
        </div>
      )}

    </div>
  );
};
