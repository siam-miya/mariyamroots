"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import productPhoto from "../../assets/images/product.jpg";

const mainProduct = {
  id: 1,
  name: "ন্যাচারাল হারবাল ম্যাজিক হেয়ার অয়েল",
  image: productPhoto,
  rating: 4.9,
  description:
    "১০০% প্রাকৃতিক ভেষজ উপাদানে তৈরি, যা চুলের গোড়ায় পুষ্টি জোগায় এবং চুলের যত্ন নিতে সাহায্য করে।",
  variants: [
    {
      size: "৫০ মিলি",
      price: 350,
      oldPrice: 450,
      discount: "২২% ছাড়",
    },
    {
      size: "১০০ মিলি",
      price: 650,
      oldPrice: 850,
      discount: "২৪% ছাড়",
    },
  ],
  features: [
    "চুলের গোড়ার যত্ন নিতে সাহায্য করে",
    "খুশকি ও চুল পাতলা হওয়ার সমস্যা কমাতে সহায়ক",
    "প্রাকৃতিক ভেষজ উপাদানে তৈরি",
  ],
};

const ProductsSection = () => {
  const [selectedSize, setSelectedSize] = useState(
    mainProduct.variants[0].size
  );

  const handleBottomOrderClick = (e) => {
    e.preventDefault();

    window.dispatchEvent(
      new CustomEvent("selectProductVariant", {
        detail: selectedSize,
      })
    );

    const orderSection = document.getElementById("order");

    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* ব্যাকগ্রাউন্ড ডিজাইন */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide text-secondary">
            আমাদের বিশেষ পণ্য
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            চুলের যত্নে পান
            <span className="text-secondary"> সেরা সমাধান</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
            আপনার পছন্দের বোতলের সাইজ বেছে নিন এবং অর্ডার করুন।
          </p>
        </div>

        {/* প্রোডাক্ট কার্ড */}
        <div className="mt-10">
          <ProductCard
            product={mainProduct}
            onVariantChange={(variant) =>
              setSelectedSize(variant.size)
            }
          />
        </div>

        {/* অর্ডার বাটন */}
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-500 sm:text-sm">
            আমাদের হেয়ার অয়েল সম্পর্কে কিছু জানতে চান?
          </p>

          <button
            onClick={handleBottomOrderClick}
            type="button"
            className="mt-3 w-full cursor-pointer inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-xs font-bold text-white shadow-md shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg sm:text-sm"
          >
            অর্ডার করুন
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
