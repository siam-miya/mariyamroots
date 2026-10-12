"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

const getImageUrl = (image) => {
  if (typeof image === "string") return image;
  return image?.url || image?.secure_url || "";
};

export default function ProductCard({
  product,
  selectedVariant,
  onVariantChange,
  onOrder,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const gallery = [
    product?.thumbnail,
    ...(Array.isArray(product?.images) ? product.images : []),
    ...(Array.isArray(product?.imageAssets) ? product.imageAssets : []),
  ]
    .map(getImageUrl)
    .filter(Boolean)
    .filter((url, index, arr) => arr.indexOf(url) === index);

  const images = gallery.length ? gallery : ["/images/product.jpg"];
  const currentImage = images[activeImage] || images[0];

  const variants = (Array.isArray(product?.variants)
    ? product.variants
    : []
  ).filter((variant) => variant && variant.isActive !== false);

  const activeVariant =
    selectedVariant ||
    variants.find(
      (variant) => variant.stock == null || Number(variant.stock) > 0
    ) ||
    variants[0];

  const price = Number(activeVariant?.price || 0);
  const oldPrice = Number(activeVariant?.oldPrice || 0);

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const selectedSize =
    activeVariant?.size ||
    activeVariant?.volume ||
    activeVariant?.label ||
    activeVariant?.name ||
    "প্যাকেজ নির্বাচন করুন";

  const hasStock =
    activeVariant?.stock == null || Number(activeVariant.stock) > 0;

  const changeImage = (direction) => {
    setActiveImage((current) => {
      if (direction === "next") {
        return (current + 1) % images.length;
      }
      return (current - 1 + images.length) % images.length;
    });
  };

  const handleImageError = (url) => {
    setImageErrors((prev) => ({
      ...prev,
      [url]: true,
    }));
  };

  const displayImage = (url) =>
    imageErrors[url] ? "/images/product.jpg" : url;

  return (
    <>
      <article className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-stretch gap-6 border border-gray-200 bg-white p-4 sm:p-6 lg:grid-cols-12 lg:gap-10">
        {/* Product Images Section */}
        <div className="flex flex-col min-w-0 lg:col-span-5 h-full">
          <div className="relative flex-1 min-h-[350px] sm:min-h-[420px] w-full overflow-hidden border border-gray-200 bg-white">
            {discount > 0 && (
              <span className="absolute left-0 top-0 z-10 bg-[#9b6607] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {discount}% ছাড়
              </span>
            )}

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 z-[1] cursor-zoom-in"
              aria-label="ছবি বড় করে দেখুন"
            />

            <Image
              src={displayImage(currentImage)}
              alt={product?.name || "Product image"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="pointer-events-none object-contain p-2"
              onError={() => handleImageError(currentImage)}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => changeImage("prev")}
                  aria-label="আগের ছবি"
                  className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-300 bg-white/90 text-gray-800 transition hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => changeImage("next")}
                  aria-label="পরের ছবি"
                  className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-300 bg-white/90 text-gray-800 transition hover:bg-black hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-14 w-14 shrink-0 border bg-white transition-all sm:h-16 sm:w-16 ${
                    activeImage === index
                      ? "border-[#074506] ring-1 ring-[#074506]"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`ছবি ${index + 1}`}
                >
                  <Image
                    src={displayImage(image)}
                    alt={`${product?.name || "Product"} ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                    onError={() => handleImageError(image)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Section */}
        <div className="flex min-w-0 flex-col lg:col-span-7">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="border border-[#074506] bg-green-50/50 px-2.5 py-0.5 text-[11px] font-bold text-[#074506]">
              প্রাকৃতিক উপাদান
            </span>

            <span className="flex items-center gap-1 border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
              <Star size={11} fill="currentColor" />
              প্রিমিয়াম কোয়ালিটি
            </span>
          </div>

          <h3 className="break-words text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            {product?.name || "ন্যাচারাল হারবাল ম্যাজিক হেয়ার অয়েল"}
          </h3>

          {product?.shortDescription && (
            <p className="mt-2 break-words text-xs leading-relaxed text-gray-600 sm:text-sm">
              {product.shortDescription}
            </p>
          )}

          {/* Selected Package Price Box */}
          <div className="mt-3 border border-gray-200 bg-gray-50/50 p-2.5 sm:p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500">নির্বাচিত প্যাকেজ</p>
                <p className="mt-0.5 break-words text-sm font-bold text-gray-900 sm:text-base">
                  {selectedSize}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-lg font-extrabold text-[#074506] sm:text-xl">
                  ৳{price.toLocaleString("en-BD")}
                </p>

                {oldPrice > price && (
                  <p className="text-xs text-gray-400 line-through">
                    ৳{oldPrice.toLocaleString("en-BD")}
                  </p>
                )}
              </div>
            </div>

            {discount > 0 && (
              <p className="mt-2 border-t border-gray-200/60 pt-2 text-[11px] font-medium text-[#9b6607]">
                আপনি {discount}% ছাড় পাচ্ছেন
              </p>
            )}
          </div>

          {/* Package Selection */}
          {variants.length > 0 && (
            <div className="mt-3.5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-700">
                প্যাকেজ নির্বাচন করুন:
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {variants.map((variant, index) => {
                  const isSelected =
                    String(variant._id || variant.id) ===
                    String(activeVariant?._id || activeVariant?.id);

                  const size =
                    variant.size ||
                    variant.volume ||
                    variant.label ||
                    "";

                  const packageName =
                    variant.name && variant.name !== size
                      ? variant.name
                      : "";

                  const soldOut =
                    variant.stock != null && Number(variant.stock) <= 0;

                  const variantPrice = Number(variant.price || 0);
                  const variantOldPrice = Number(variant.oldPrice || 0);

                  return (
                    <button
                      key={variant._id || variant.id || index}
                      type="button"
                      disabled={soldOut}
                      onClick={() => onVariantChange?.(variant)}
                      className={`flex min-w-0 flex-col justify-between border p-2.5 text-left transition-all sm:p-3 ${
                        isSelected
                          ? "border-[#074506] bg-green-50/40 ring-1 ring-[#074506]"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      } ${
                        soldOut ? "cursor-not-allowed bg-gray-100 opacity-50" : ""
                      }`}
                    >
                      <span className="block break-words text-xs font-bold text-gray-900 sm:text-sm">
                        {size || packageName || `প্যাকেজ ${index + 1}`}
                      </span>

                      {packageName && (
                        <span className="mt-0.5 block break-words text-[10px] text-gray-500 sm:text-[11px]">
                          {packageName}
                        </span>
                      )}

                      <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5">
                        <span className="text-xs font-extrabold text-[#074506] sm:text-sm">
                          ৳{variantPrice.toLocaleString("en-BD")}
                        </span>

                        {variantOldPrice > variantPrice && (
                          <span className="text-[10px] text-gray-400 line-through sm:text-[11px]">
                            ৳{variantOldPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      </div>

                      {soldOut && (
                        <span className="mt-1 text-[10px] font-bold text-red-600 sm:text-[11px]">
                          স্টক শেষ
                        </span>
                      )}

                      {isSelected && !soldOut && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#074506] sm:text-[11px]">
                          <CheckCircle2 size={12} />
                          নির্বাচিত
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feature Highlights Grid */}
          <div className="mt-3.5 grid grid-cols-1 gap-2 border border-gray-200 bg-gray-50 p-2.5 sm:grid-cols-2 sm:p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
              <CheckCircle2 size={14} className="shrink-0 text-[#074506]" />
              <span>চুলের গোড়ার যত্নে সহায়ক</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
              <CheckCircle2 size={14} className="shrink-0 text-[#074506]" />
              <span>সহজ ও সুবিধাজনক ব্যবহার</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
              <ShieldCheck size={14} className="shrink-0 text-[#074506]" />
              <span>১০০% অরিজিনাল প্রোডাক্ট</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
              <Truck size={14} className="shrink-0 text-[#074506]" />
              <span>ক্যাশ অন ডেলিভারি সুবিধা</span>
            </div>
          </div>

          {/* Order Action Button */}
          <button
            type="button"
            onClick={onOrder}
            disabled={!activeVariant || !hasStock}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 bg-[#074506] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#053604] active:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={17} />
            {hasStock ? "অর্ডার করুন" : "স্টক শেষ"}
          </button>

          <p className="mt-2 text-center text-[11px] text-gray-500">
            অর্ডার করতে উপরের বাটনে ক্লিক করুন
          </p>
        </div>
      </article>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product image preview"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 border border-gray-700 bg-black p-2 text-white hover:bg-white hover:text-black"
            aria-label="বন্ধ করুন"
          >
            <X size={20} />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={displayImage(currentImage)}
              alt={product?.name || "Product preview"}
              fill
              sizes="100vw"
              className="object-contain"
              onError={() => handleImageError(currentImage)}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => changeImage("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 border border-white/20 bg-black/60 p-2.5 text-white hover:bg-white hover:text-black"
                  aria-label="আগের ছবি"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  type="button"
                  onClick={() => changeImage("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 border border-white/20 bg-black/60 p-2.5 text-white hover:bg-white hover:text-black"
                  aria-label="পরের ছবি"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}