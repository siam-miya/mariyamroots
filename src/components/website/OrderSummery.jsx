"use client";

import React from "react";
import { CheckCircle2, Package, User, MapPin, Phone, ArrowRight, X } from "lucide-react";

const OrderSummery = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;

  // ডেমো ডাটা (যদি প্রপস থেকে ডাটা না আসে)
  const orderId = orderData?.orderId || `HB-${Math.floor(100000 + Math.random() * 900000)}`;
  const customerName = orderData?.name || "Md. Siam Miya";
  const customerPhone = orderData?.phone || "01700000000";
  const customerAddress = orderData?.address || "Mirpur 1, Dhaka";
  const selectedSize = orderData?.size || "100ml";
  const quantity = orderData?.quantity || 1;
  const subtotal = orderData?.subtotal || 650;
  const deliveryCharge = orderData?.deliveryCharge || 60;
  const totalAmount = subtotal + deliveryCharge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        
        {/* Top Header Banner */}
        <div className="bg-primary px-6 py-6 text-center text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-md mb-3">
            <CheckCircle2 size={32} />
          </div>

          <h3 className="text-xl font-extrabold sm:text-2xl">Thank You For Your Order!</h3>
          <p className="text-xs text-gray-300 mt-1">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।
          </p>
        </div>

        {/* Modal Body Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">
          
          {/* Order ID & Status */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Order ID</span>
              <p className="font-black text-primary text-sm sm:text-base">{orderId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Payment Status</span>
              <p className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 text-xs mt-0.5">
                Cash on Delivery
              </p>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-2.5">
            <h4 className="font-extrabold text-primary border-b border-gray-100 pb-2 text-xs uppercase tracking-wider">
              ডেলিভারি তথ্য (Shipping Details)
            </h4>
            <div className="space-y-1.5 text-gray-600">
              <p className="flex items-center gap-2">
                <User size={15} className="text-secondary shrink-0" />
                <span className="font-bold text-primary">{customerName}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-secondary shrink-0" />
                <span>{customerPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-secondary shrink-0" />
                <span>{customerAddress}</span>
              </p>
            </div>
          </div>

          {/* Order Summary Details */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <h4 className="font-extrabold text-primary border-b border-gray-100 pb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Package size={15} className="text-secondary" />
              অর্ডার সামারি (Order Summary)
            </h4>

            <div className="flex justify-between items-center text-gray-600">
              <span>Natural Herbal Magic Hair Oil ({selectedSize}) × {quantity}</span>
              <span className="font-bold text-primary">৳{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery Charge</span>
              <span className="font-bold text-primary">৳{deliveryCharge}</span>
            </div>

            <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center font-black text-primary text-sm sm:text-base">
              <span>TOTAL:</span>
              <span className="text-secondary">৳{totalAmount.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Button */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary transition-all cursor-pointer"
          >
            <span>শপিং চালিয়ে যান (Continue Shopping)</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSummery;