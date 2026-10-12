"use client";

import React from "react";
import {
  CheckCircle2,
  FileText,
  Package,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function ProductDetails({
  product,
  sectionId = "product-details",
  selectedVariant,
  onVariantChange,
  onOrder,
}) {
  if (!product) return null;

  const description = product.description;

  const features = Array.isArray(product.features)
    ? product.features
    : [];

  const variants = (
    Array.isArray(product.variants)
      ? product.variants
      : []
  ).filter(
    (variant) => variant && variant.isActive !== false
  );

  const activeVariant =
    selectedVariant &&
    variants.some(
      (variant) =>
        String(variant._id || variant.id) ===
        String(selectedVariant._id || selectedVariant.id)
    )
      ? selectedVariant
      : variants.find(
          (variant) =>
            variant.stock == null ||
            Number(variant.stock) > 0
        ) || variants[0];

  const hasStock =
    activeVariant?.stock == null ||
    Number(activeVariant.stock) > 0;

  const handleOrder = () => {
    if (!activeVariant || !hasStock) return;

    onVariantChange?.(activeVariant);
    onOrder?.();
  };

  return (
    <section
      id={sectionId}
      className="w-full min-w-0 scroll-mt-24 overflow-x-clip bg-white border border-gray-200"
    >
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 sm:py-8">
        {/* Heading */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 border border-[#074506] bg-green-50/50 px-2.5 py-1 text-[11px] font-bold text-[#074506] sm:text-xs">
            <Sparkles size={12} />
            পণ্য সম্পর্কে বিস্তারিত
          </span>

          <h2 className="mt-2 w-full text-center break-words text-lg font-bold leading-snug text-gray-900 sm:text-2xl">
            {product.name || "আমাদের পণ্য"}
          </h2>

          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-[#9b6607]" />
        </div>

        <div className="w-full space-y-5">
          {/* Description */}
          {description && (
            <div className="w-full min-w-0 border-b border-gray-200 pb-5">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-900 sm:text-sm">
                <FileText
                  size={15}
                  className="shrink-0 text-[#074506]"
                />
                পণ্যের বিবরণ
              </h3>

              <div className="w-full whitespace-pre-line break-words text-xs leading-relaxed text-gray-600 sm:text-sm">
                {description}
              </div>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="w-full min-w-0 border-b border-gray-200 pb-5">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-900 sm:text-sm">
                <Sparkles
                  size={15}
                  className="shrink-0 text-[#074506]"
                />
                পণ্যের বৈশিষ্ট্য
              </h3>

              <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const text =
                    typeof feature === "string"
                      ? feature
                      : feature?.title ||
                        feature?.name ||
                        feature?.text;

                  if (!text) return null;

                  return (
                    <li
                      key={`${text}-${index}`}
                      className="flex w-full min-w-0 items-start gap-2 border border-gray-200 bg-gray-50 p-2.5 text-xs font-medium leading-relaxed text-gray-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-[#074506]"
                      />
                      <span className="w-full min-w-0 break-words">
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Selectable Packages */}
          {variants.length > 0 && (
            <div className="w-full min-w-0 pt-1">
              <h3 className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-900 sm:text-sm">
                <Package
                  size={15}
                  className="shrink-0 text-[#074506]"
                />
                উপলব্ধ প্যাকেজসমূহ
              </h3>

              <p className="mb-3 text-[11px] text-gray-500 sm:text-xs">
                আপনার পছন্দের প্যাকেজটি নির্বাচন করুন।
              </p>

              <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
                {variants.map((variant, index) => {
                  const isSelected =
                    String(variant._id || variant.id) ===
                    String(
                      activeVariant?._id ||
                        activeVariant?.id
                    );

                  const size =
                    variant.size ||
                    variant.volume ||
                    "";

                  const packageName =
                    variant.name ||
                    variant.label ||
                    `প্যাকেজ ${index + 1}`;

                  const price = Number(
                    variant.price || 0
                  );

                  const oldPrice = Number(
                    variant.oldPrice || 0
                  );

                  const soldOut =
                    variant.stock != null &&
                    Number(variant.stock) <= 0;

                  const discount =
                    oldPrice > price && oldPrice > 0
                      ? Math.round(
                          ((oldPrice - price) / oldPrice) *
                            100
                        )
                      : 0;

                  return (
                    <button
                      key={
                        variant._id ||
                        variant.id ||
                        index
                      }
                      type="button"
                      disabled={soldOut}
                      onClick={() =>
                        onVariantChange?.(variant)
                      }
                      aria-pressed={isSelected}
                      className={`relative w-full min-w-0 border p-3 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-[#074506] bg-green-50/40 ring-1 ring-[#074506]"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      } ${
                        soldOut
                          ? "cursor-not-allowed bg-gray-50 opacity-60"
                          : "cursor-pointer"
                      }`}
                    >
                      {/* Selected Indicator Check */}
                      <span
                        className={`absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center border ${
                          isSelected
                            ? "border-[#074506] bg-[#074506] text-white"
                            : "border-gray-300 bg-white text-transparent"
                        }`}
                      >
                        <CheckCircle2 size={12} />
                      </span>

                      <p className="pr-6 text-[11px] font-medium text-gray-500">
                        {packageName}
                      </p>

                      <p className="mt-0.5 w-full min-w-0 break-words text-base font-extrabold text-gray-900 sm:text-lg">
                        {size || "সাইজ উল্লেখ নেই"}
                      </p>

                      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                        <span className="text-sm font-extrabold text-[#074506] sm:text-base">
                          ৳{price.toLocaleString("en-BD")}
                        </span>

                        {oldPrice > price && (
                          <span className="text-[11px] text-gray-400 line-through">
                            ৳{oldPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      </div>

                      {discount > 0 && (
                        <span className="mt-1.5 inline-block border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-[#9b6607]">
                          {discount}% ছাড়
                        </span>
                      )}

                      <div className="mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px]">
                        <span className="text-gray-400">স্ট্যাটাস</span>
                        {soldOut ? (
                          <span className="font-semibold text-red-600">
                            স্টক শেষ
                          </span>
                        ) : (
                          <span className="font-semibold text-[#074506]">
                            উপলব্ধ
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Package Summary Box */}
              {activeVariant && (
                <div className="mt-3 w-full border border-gray-200 bg-gray-50 p-3">
                  <div className="flex w-full items-center justify-between gap-3">
                    <div className="w-full min-w-0">
                      <p className="text-[11px] text-gray-500">
                        নির্বাচিত প্যাকেজ:
                      </p>
                      <p className="w-full truncate text-xs font-bold text-gray-900">
                        {activeVariant.size ||
                          activeVariant.volume ||
                          activeVariant.name ||
                          "প্যাকেজ"}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-black text-[#074506] sm:text-base">
                      ৳
                      {Number(
                        activeVariant.price || 0
                      ).toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Button */}
              <button
                type="button"
                onClick={handleOrder}
                disabled={!activeVariant || !hasStock}
                className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 bg-[#074506] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#053604] active:bg-black disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
              >
                <ShoppingBag size={16} />
                {!activeVariant || !hasStock
                  ? "স্টক শেষ"
                  : "অর্ডার করুন"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}