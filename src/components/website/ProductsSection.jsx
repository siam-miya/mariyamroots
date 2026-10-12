"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import ProductCard from "../website/ProductCard";
import ProductDetails from "../website/productDetails";

import {
  LoaderCircle,
  PackageSearch,
  RefreshCw,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const getProductId = (product) =>
  String(product?._id || product?.id || "");

const getVariantId = (variant) =>
  String(variant?._id || variant?.id || "");

const normalizeProducts = (responseData) => {
  const data = responseData?.data ?? responseData;

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data?.items)
        ? data.items
        : [];

  return products
    .filter(
      (product) => product && product.isActive !== false
    )
    .map((product) => ({
      ...product,
      variants: (
        Array.isArray(product.variants)
          ? product.variants
          : []
      ).filter(
        (variant) =>
          variant && variant.isActive !== false
      ),
    }))
    .filter((product) => product.variants.length > 0);
};

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
          signal,
        }
      );

      if (!response.ok) {
        throw new Error(
          `পণ্য লোড করা যায়নি (${response.status})`
        );
      }

      const data = await response.json();

      if (data?.success === false) {
        throw new Error(
          data.message || "পণ্য লোড করা যায়নি"
        );
      }

      const productList = normalizeProducts(data);

      setProducts(productList);

      setSelectedVariants((previous) => {
        const next = {};

        for (const product of productList) {
          const productId = getProductId(product);
          const variants = product.variants;

          const previousVariant = previous[productId];

          const stillExists = variants.find(
            (variant) =>
              getVariantId(variant) ===
              getVariantId(previousVariant)
          );

          next[productId] =
            stillExists ||
            variants.find(
              (variant) =>
                variant.stock == null ||
                Number(variant.stock) > 0
            ) ||
            variants[0];
        }

        return next;
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          err.message ||
          "পণ্য লোড করতে সমস্যা হয়েছে। API সার্ভার চালু আছে কি না দেখুন।"
        );
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [fetchProducts]);

  const handleVariantChange = (product, variant) => {
    const productId = getProductId(product);

    setSelectedVariants((previous) => ({
      ...previous,
      [productId]: variant,
    }));
  };

  const handleOrder = (product, variant) => {
    if (!product || !variant) {
      alert("আগে একটি প্যাকেজ নির্বাচন করুন।");
      return;
    }

    const variantOutOfStock =
      variant.stock != null &&
      Number(variant.stock) <= 0;

    if (variantOutOfStock) {
      alert("দুঃখিত, এই প্যাকেজটি বর্তমানে স্টকে নেই।");
      return;
    }

    window.dispatchEvent(
      new CustomEvent("selectProductVariant", {
        detail: {
          productId: getProductId(product),
          variantId: getVariantId(variant),
          productName: product.name,
          variantName:
            variant.name ||
            variant.label ||
            variant.size ||
            variant.volume ||
            "",
          price: Number(variant.price || 0),
          product,
          variant,
        },
      })
    );

    const checkout = document.getElementById("order");

    if (checkout) {
      checkout.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  };

  return (
    <section
      id="products"
      className="relative w-full min-w-0 overflow-x-clip bg-gradient-to-b from-white via-gray-50/50 to-white px-4 py-14 sm:px-6 sm:py-20"
    >
      {/* Background soft lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl"
      />

      {/* Main container: 7xl */}
      <div className="relative mx-auto w-full max-w-7xl min-w-0">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-extrabold text-[#074506] border border-emerald-100 shadow-sm">
            আমাদের পণ্য
          </span>

          <h2 className="mt-3.5 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            আপনার পছন্দের প্যাকেজ বেছে নিন
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 leading-relaxed">
            পণ্যের বিবরণ দেখুন, প্যাকেজ নির্বাচন করুন এবং সহজে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।
          </p>

          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-[#9b6607]" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-[#074506]">
            <LoaderCircle
              size={40}
              className="animate-spin text-[#074506]"
            />
            <p className="text-base font-semibold text-gray-600">
              পণ্য লোড হচ্ছে...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
            <p className="break-words text-base font-medium text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchProducts()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#074506] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#053604]"
            >
              <RefreshCw size={18} />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <PackageSearch
                size={48}
                className="text-gray-400"
              />
              <p className="text-base font-medium text-gray-600">
                বর্তমানে কোনো সক্রিয় পণ্য পাওয়া যায়নি।
              </p>
            </div>
          )}

        {/* Products List */}
        {!loading &&
          !error &&
          products.length > 0 && (
            <div className="space-y-16">
              {products.map((product, index) => {
                const productId = getProductId(product);

                const selectedVariant =
                  selectedVariants[productId];

                return (
                  <div
                    key={productId || index}
                    className="w-full min-w-0 scroll-mt-28 space-y-6"
                  >
                    <ProductCard
                      product={product}
                      selectedVariant={selectedVariant}
                      onVariantChange={(variant) =>
                        handleVariantChange(
                          product,
                          variant
                        )
                      }
                      onOrder={() =>
                        handleOrder(
                          product,
                          selectedVariant
                        )
                      }
                    />
                    <ProductDetails
                      product={product}
                      sectionId={
                        index === 0
                          ? "product-details"
                          : `product-details-${productId || index}`
                      }
                      selectedVariant={selectedVariant}
                      onVariantChange={(variant) =>
                        handleVariantChange(product, variant)
                      }
                      onOrder={() =>
                        handleOrder(
                          product,
                          selectedVariants[productId]
                        )
                      }
                    />
                  </div>
                );

              })}
            </div>
          )}
      </div>
    </section>
  );
}