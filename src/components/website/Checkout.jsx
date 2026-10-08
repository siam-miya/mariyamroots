"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, User, Phone, MapPin, Check, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import productPhoto from "../../assets/images/product.jpg";
import OrderSummery from "./OrderSummery";

const variantsData = [
  { size: "50ml", price: 350, oldPrice: 500, discount: "30% OFF" },
  { size: "100ml", price: 650, oldPrice: 950, discount: "32% OFF" },
];

const Checkout = () => {
  const [selectedVariant, setSelectedVariant] = useState(variantsData[0]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("inside");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const handleVariantSelect = (e) => {
      const sizeStr = e.detail;
      const matched = variantsData.find((v) => v.size === sizeStr);
      if (matched) {
        setSelectedVariant(matched);
      }
    };

    window.addEventListener("selectProductVariant", handleVariantSelect);
    return () => {
      window.removeEventListener("selectProductVariant", handleVariantSelect);
    };
  }, []);

  const deliveryCharge = deliveryArea === "inside" ? 60 : 120;
  const subtotal = selectedVariant.price * quantity;
  const grandTotal = subtotal + deliveryCharge;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const currentOrder = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        size: selectedVariant.size,
        quantity: quantity,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
      };

      setOrderInfo(currentOrder);
      setIsLoading(false);
      setIsModalOpen(true);
    }, 1500);
  };

  return (
    <section id="order" className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
            Secure Checkout
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">
            অর্ডারটি সম্পন্ন করতে আপনার তথ্য দিন
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            পণ্য হাতে পেয়ে ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Form Inputs & Area */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-3">
                ১. ডেলিভারি তথ্য (Delivery Details)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">আপনার নাম *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-primary focus:bg-white focus:border-secondary focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">মোবাইল নম্বর *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-primary focus:bg-white focus:border-secondary focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">সম্পূর্ণ ঠিকানা *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 top-3 pl-3.5 text-gray-400">
                      <MapPin size={16} />
                    </span>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="বাসা/রোড নং, এলাকা, থানা ও জেলা"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-primary focus:bg-white focus:border-secondary focus:outline-none transition resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Area */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-3">
                ২. ডেলিভারি এলাকা (Delivery Area)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryArea("inside")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                    deliveryArea === "inside"
                      ? "border-secondary bg-secondary/5 text-secondary font-bold"
                      : "border-gray-200 bg-gray-50/40 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-primary">ঢাকার ভেতরে</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">৳৬০</p>
                  </div>
                  {deliveryArea === "inside" && <Check size={16} className="text-secondary" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryArea("outside")}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                    deliveryArea === "outside"
                      ? "border-secondary bg-secondary/5 text-secondary font-bold"
                      : "border-gray-200 bg-gray-50/40 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-primary">ঢাকার বাইরে</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">৳১২০</p>
                  </div>
                  {deliveryArea === "outside" && <Check size={16} className="text-secondary" />}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary & Size Picker */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gray-50/70 rounded-2xl border border-gray-200 p-6 sm:p-7 space-y-5 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-gray-200/60 pb-3">
                ৩. অর্ডার ওভারভিউ (Order Summary)
              </h3>

              {/* Selected Product info */}
              <div className="flex items-center gap-3.5 bg-white p-3 rounded-xl border border-gray-200/80">
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-white">
                  <Image src={productPhoto} alt="Product" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-primary">Natural Herbal Magic Hair Oil</h4>
                  <p className="text-[11px] text-secondary font-extrabold mt-0.5">{selectedVariant.size} • ৳{selectedVariant.price}</p>
                </div>
              </div>

              {/* Size Switcher */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  প্যাকেজ সাইজ নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {variantsData.map((variant) => {
                    const isSelected = selectedVariant.size === variant.size;
                    return (
                      <button
                        key={variant.size}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                          isSelected
                            ? "border-secondary bg-secondary text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{variant.size}</span>
                        <span>৳{variant.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between border-t border-b border-gray-200/60 py-3.5">
                <span className="text-xs font-bold text-gray-600">পরিমাণ:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={decreaseQty}
                    className="w-7 h-7 rounded-lg border border-gray-200 bg-white font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-primary">{quantity}</span>
                  <button
                    type="button"
                    onClick={increaseQty}
                    className="w-7 h-7 rounded-lg border border-gray-200 bg-white font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Sub total</span>
                  <span className="font-bold text-primary">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-primary">৳{deliveryCharge}</span>
                </div>
                <div className="border-t border-gray-200/80 pt-3 flex justify-between items-center text-sm font-extrabold text-primary">
                  <span>TOTAL:</span>
                  <span className="text-secondary text-lg">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* COD Note */}
              <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-white p-3 rounded-xl border border-gray-200/60">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি: পণ্য হাতে পেয়ে টাকা দিন।</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-md hover:bg-secondary transition cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>প্রসেসিং হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    <span>অর্ডার কনফার্ম করুন (৳{grandTotal.toLocaleString()})</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

            </div>

          </div>

        </form>
      </div>

      <OrderSummery 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        orderData={orderInfo} 
      />
    </section>
  );
};

export default Checkout;