"use client"
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import productPhoto from "../../assets/images/product.jpg";

const mainProduct = {
  id: 1,
  name: "Natural Herbal Magic Hair Oil",
  image: productPhoto,
  rating: 4.9,
  description: "100% natural herbal ingredients that deeply nourish hair roots, stop severe hair fall, and promote fast new hair growth.",
  variants: [
    {
      size: "50ml",
      price: 350,
      oldPrice: 450,
      discount: "22% OFF",
    },
    {
      size: "100ml",
      price: 650,
      oldPrice: 850,
      discount: "24% OFF",
    },
  ],
  features: [
    "Controls severe hair fall within 2 weeks",
    "Removes dandruff and stops hair thinning",
    "100% safe with zero side effects"
  ],
};

const ProductsSection = () => {
  // প্রোডাক্ট কার্ডের সিলেক্টেড ভেরিয়েন্ট ট্র্যাক করার স্টেট
  const [selectedSize, setSelectedSize] = useState(mainProduct.variants[0].size);

  // বটম CTA অর্ডারে ক্লিক হ্যান্ডলার
  const handleBottomOrderClick = (e) => {
    e.preventDefault();

    // চেকআউট সেকশনে সিলেক্টেড সাইজ পাঠানোর জন্য ইভেন্ট ডিসপ্যাচ
    window.dispatchEvent(
      new CustomEvent("selectProductVariant", { detail: selectedSize })
    );

    // অর্ডার সেকশনে স্মুথ স্ক্রল
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.15em] text-secondary">
            OUR SIGNATURE PRODUCT
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            Get Your Ultimate Hair Care
            <span className="text-secondary"> Solution</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
            Select your preferred bottle size below and place your order to experience guaranteed results.
          </p>
        </div>

        {/* Product Card Container */}
        <div className="mt-10">
          <ProductCard 
            product={mainProduct} 
            onVariantChange={(variant) => setSelectedSize(variant.size)} 
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-500 sm:text-sm">Have questions about our oil?</p>
          <button
            onClick={handleBottomOrderClick}
            type="button"
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg cursor-pointer"
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;