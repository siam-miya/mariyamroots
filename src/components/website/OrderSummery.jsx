"use client";

import React from "react";
import {
  CheckCircle2,
  Package,
  User,
  MapPin,
  Phone,
  ArrowRight,
  X,
} from "lucide-react";

const OrderSummery = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;
  const orderId =
    orderData?.orderId ||
    `HB-${Math.floor(100000 + Math.random() * 900000)}`;

  const customerName = orderData?.name || "Md. Siam Miya";
  const customerPhone = orderData?.phone || "01700000000";
  const customerAddress = orderData?.address || "মিরপুর ১, ঢাকা";
  const selectedSize = orderData?.size || "100ml";
  const quantity = orderData?.quantity || 1;
  const subtotal = orderData?.subtotal || 650;
  const deliveryCharge = orderData?.deliveryCharge || 60;
  const totalAmount = subtotal + deliveryCharge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        {/* উপরের অংশ */}
        <div className="bg-primary px-6 py-6 text-center text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-md mb-3">
            <CheckCircle2 size={32} />
          </div>

          <h3 className="text-xl font-extrabold sm:text-2xl">
            আপনার অর্ডারের জন্য ধন্যবাদ!
          </h3>

          <p className="text-xs text-gray-300 mt-1">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমরা আপনার
            সাথে যোগাযোগ করব।
          </p>
        </div>

        {/* অর্ডারের বিস্তারিত তথ্য */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">
          {/* অর্ডার নম্বর ও পেমেন্টের অবস্থা */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                অর্ডার নম্বর
              </span>

              <p className="font-black text-primary text-sm sm:text-base">
                {orderId}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                পেমেন্টের অবস্থা
              </span>

              <p className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 text-xs mt-0.5">
                পণ্য হাতে পেয়ে মূল্য পরিশোধ
              </p>
            </div>
          </div>

          {/* গ্রাহক ও ডেলিভারি তথ্য */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-2.5">
            <h4 className="font-extrabold text-primary border-b border-gray-100 pb-2 text-xs tracking-wider">
              ডেলিভারি তথ্য
            </h4>

            <div className="space-y-1.5 text-gray-600">
              <p className="flex items-center gap-2">
                <User size={15} className="text-secondary shrink-0" />
                <span className="font-bold text-primary">
                  {customerName}
                </span>
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

          {/* অর্ডারের হিসাব */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <h4 className="font-extrabold text-primary border-b border-gray-100 pb-2 text-xs tracking-wider flex items-center gap-1.5">
              <Package size={15} className="text-secondary" />
              অর্ডারের বিবরণ
            </h4>

            <div className="flex justify-between items-center gap-3 text-gray-600">
              <span>
                ন্যাচারাল হারবাল ম্যাজিক হেয়ার অয়েল ({selectedSize}) ×{" "}
                {quantity}
              </span>

              <span className="font-bold text-primary shrink-0">
                ৳{subtotal.toLocaleString("bn-BD")}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span>ডেলিভারি চার্জ</span>

              <span className="font-bold text-primary">
                ৳{deliveryCharge.toLocaleString("bn-BD")}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center font-black text-primary text-sm sm:text-base">
              <span>সর্বমোট:</span>

              <span className="text-secondary">
                ৳{totalAmount.toLocaleString("bn-BD")}
              </span>
            </div>
          </div>
        </div>

        {/* নিচের বাটন */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-secondary transition-all cursor-pointer"
          >
            <span>কেনাকাটা চালিয়ে যান</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
