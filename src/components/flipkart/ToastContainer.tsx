import React from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useFlipkart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = 'bg-slate-900 text-white border-slate-700';
        let Icon = CheckCircle2;

        if (toast.type === 'success') {
          bgClass = 'bg-emerald-950 text-emerald-100 border-emerald-800 shadow-emerald-950/40';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-amber-950 text-amber-100 border-amber-800 shadow-amber-950/40';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          bgClass = 'bg-rose-950 text-rose-100 border-rose-800 shadow-rose-950/40';
          Icon = XCircle;
        } else if (toast.type === 'info') {
          bgClass = 'bg-blue-950 text-blue-100 border-blue-800 shadow-blue-950/40';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3 rounded-lg border shadow-xl text-xs transition animate-in slide-in-from-bottom-5 duration-200 ${bgClass}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded transition text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
