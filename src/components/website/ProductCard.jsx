"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, CheckCircle2, X } from "lucide-react";

const ProductCard = ({ product, onVariantChange }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || {});
  const [isImageOpen, setIsImageOpen] = useState(false); // ইমেজ পপআপ কন্ট্রোল করার জন্য state

  const productImage = product?.image ? product.image : "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80";

  // Order Now ক্লিক হ্যান্ডলার (চেকআউট সেকশনে ডাটা পাঠানোর জন্য)
  const handleOrderClick = (e) => {
    e.preventDefault();
    
    // ১. কাস্টম ইভেন্ট ফায়ার করা যাতে চেকআউট সাথে সাথে আপডেট হয়
    window.dispatchEvent(
      new CustomEvent("selectProductVariant", { detail: selectedVariant.size })
    );

    // ২. অর্ডার সেকশনে স্মুথ স্ক্রল করা
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <article className="group relative mx-auto w-full max-w-7xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col md:flex-row">
        {/* Image Side */}
        <div 
          onClick={() => setIsImageOpen(true)} // ইমেজে ক্লিক করলে পপআপ ওপেন হবে
          className="relative h-64 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-72 md:h-auto md:w-5/12 lg:w-4/12 cursor-pointer"
          title="Click to view full image"
        >
          <Image
            src={productImage}
            alt={product?.name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            priority
          />

          {/* Discount Badge */}
          {selectedVariant?.discount && (
            <span className="absolute left-3 top-3 z-10 rounded-md bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-sm">
              {selectedVariant.discount}
            </span>
          )}
        </div>

        {/* Content Side */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 lg:p-8">
          <div>
            {/* Rating & Stock Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-secondary/5 px-2.5 py-0.5 rounded border border-secondary/10">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={11}
                      className="fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-secondary">
                  {product?.rating || "4.9"}
                </span>
              </div>
              
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
                In Stock
              </span>
            </div>

            {/* Product Name */}
            <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-primary sm:text-2xl leading-snug">
              {product?.name}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              {product?.description}
            </p>

            {/* Size Variant Selector */}
            <div className="mt-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-2">
                Select Bottle Size:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product?.variants?.map((variant) => {
                  const isSelected = selectedVariant?.size === variant.size;
                  return (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => {
                        setSelectedVariant(variant);
                        onVariantChange?.(variant);
                      }}
                      className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? "border-secondary bg-secondary/10 text-secondary shadow-sm ring-1 ring-secondary/20"
                          : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span>{variant.size}</span>
                      <span className="font-extrabold">৳{variant.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bullet Points / Features */}
            {product?.features && product.features.length > 0 && (
              <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <CheckCircle2 size={14} className="shrink-0 text-secondary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price & Order Section */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Total Price
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-xl font-black text-primary sm:text-2xl">
                  ৳{selectedVariant?.price?.toLocaleString()}
                </p>
                {selectedVariant?.oldPrice && (
                  <p className="text-xs font-semibold text-gray-400 line-through">
                    ৳{selectedVariant?.oldPrice?.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Order Now Button */}
            <button
              onClick={handleOrderClick}
              type="button"
              className="group/order inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg cursor-pointer"
            >
              <ShoppingBag
                size={15}
                className="transition-transform duration-300 group-hover/order:scale-110"
              />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </article>

      {/* Image Modal / Popup */}
      {isImageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div 
            className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-lg bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white transition-all hover:bg-black"
              type="button"
            >
              <X size={20} />
            </button>

            {/* Full Image Container */}
            <div className="relative h-[75vh] w-full">
              <Image
                src={productImage}
                alt={product?.name || "Product Full Image"}
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;