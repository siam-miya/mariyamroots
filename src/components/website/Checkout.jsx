"use client";

import React, { useEffect, useState } from "react";
import {
  Lock,
  User,
  Phone,
  MapPin,
  Check,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import OrderSummery from "./OrderSummery";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const Checkout = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [productVariants, setProductVariants] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("inside");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    district: "",
    note: "",
  });

  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Backend থেকে product ও variants load করে default variant নির্বাচন
  useEffect(() => {
    let cancelled = false;

    const loadDefaultProduct = async () => {
      try {
        setIsProductLoading(true);

        const response = await fetch(`${API_URL}/api/products`);
        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(
            result.message || "পণ্যের তথ্য লোড করা যায়নি।"
          );
        }

        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.products)
              ? result.products
              : Array.isArray(result.data?.products)
                ? result.data.products
                : [];

        const activeProducts = productList.filter(
          (product) =>
            product.isActive !== false &&
            Array.isArray(product.variants) &&
            product.variants.some(
              (variant) =>
                variant.isActive !== false &&
                Number(variant.price) > 0
            )
        );

        if (cancelled) return;

        if (activeProducts.length === 0) {
          setErrorMessage("এখন কোনো পণ্য পাওয়া যাচ্ছে না।");
          return;
        }

        // Mariyam Roots single-product landing page:
        // প্রথম active product নেওয়া হচ্ছে।
        const product = activeProducts[0];

        const variants = product.variants
          .filter(
            (variant) =>
              variant.isActive !== false &&
              Number.isFinite(Number(variant.price)) &&
              Number(variant.price) > 0 &&
              variant._id
          )
          .sort(
            (a, b) => Number(a.price) - Number(b.price)
          );

        if (variants.length === 0) {
          setErrorMessage("এই পণ্যের কোনো সক্রিয় সাইজ পাওয়া যায়নি।");
          return;
        }

        setSelectedProduct({
          _id: product._id,
          name: product.name,
          thumbnail: product.thumbnail || "",
          image: product.images?.[0] || "",
        });

        setProductVariants(variants);

        // সবচেয়ে কম দামের active variant default selected
        setSelectedVariant(variants[0]);
        setQuantity(1);
      } catch (error) {
        console.error("Product loading error:", error);

        if (!cancelled) {
          setErrorMessage(
            "পণ্যের তথ্য লোড করা যায়নি। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।"
          );
        }
      } finally {
        if (!cancelled) {
          setIsProductLoading(false);
        }
      }
    };

    loadDefaultProduct();

    return () => {
      cancelled = true;
    };
  }, []);

  // Product section থেকে variant নির্বাচন করলে Checkout update হবে
  useEffect(() => {
    const handleVariantSelect = (event) => {
      const detail = event.detail;

      if (!detail?.productId || !detail?.variantId) return;

      // Backend থেকে load করা product/variant-এর ID যাচাই
      const productMatches =
        selectedProduct?._id === detail.productId;

      const productVariant = productMatches
        ? productVariants.find(
            (variant) => variant._id === detail.variantId
          )
        : null;

      if (productVariant) {
        setSelectedVariant(productVariant);
      } else {
        // অন্য product বা invalid ID দিয়ে checkout পরিবর্তন করা হবে না।
        // Event-এর product/variant backend data-তে না থাকলে ignore।
        return;
      }

      setQuantity(1);
      setErrorMessage("");
    };

    window.addEventListener(
      "selectProductVariant",
      handleVariantSelect
    );

    return () => {
      window.removeEventListener(
        "selectProductVariant",
        handleVariantSelect
      );
    };
  }, [selectedProduct, productVariants]);

  const deliveryCharge = deliveryArea === "inside" ? 70 : 120;

  const unitPrice = Number(selectedVariant?.price || 0);
  const subtotal = unitPrice * quantity;
  const grandTotal = subtotal + deliveryCharge;

  const increaseQty = () => {
    setQuantity((previous) => Math.min(previous + 1, 20));
  };

  const decreaseQty = () => {
    setQuantity((previous) => Math.max(previous - 1, 1));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Checkout থেকে variant change
  const handleVariantChange = (variant) => {
    if (!variant?._id) return;

    setSelectedVariant(variant);
    setQuantity(1);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (isLoading) return;

    if (!selectedProduct?._id || !selectedVariant?._id) {
      setErrorMessage("পণ্যের সাইজ নির্বাচন করুন।");
      return;
    }

    // Selected variant backend থেকে load করা কি না যাচাই
    const validVariant = productVariants.find(
      (variant) => variant._id === selectedVariant._id
    );

    if (!validVariant) {
      setErrorMessage(
        "নির্বাচিত সাইজটি সঠিক নয়। আবার সাইজ নির্বাচন করুন।"
      );
      return;
    }

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      setErrorMessage("পণ্যের দাম অথবা পরিমাণ সঠিক নয়।");
      return;
    }

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();
    const cleanDistrict = formData.district.trim();

    if (
      !cleanName ||
      !cleanPhone ||
      !cleanAddress ||
      !cleanDistrict
    ) {
      setErrorMessage("সবগুলো প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setErrorMessage(
        "সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Price backend-এ product/variant ID দিয়ে যাচাই করতে হবে।
      const orderPayload = {
        name: cleanName,
        phone: cleanPhone,
        address: cleanAddress,
        district: cleanDistrict,
        note: formData.note.trim(),

        productId: selectedProduct._id,
        variantId: validVariant._id,
        quantity,

        deliveryArea,
        paymentMethod: "cod",
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message ||
            result.error ||
            `অর্ডার করা যায়নি। Server status: ${response.status}`
        );
      }

      const savedOrder =
        result.order ||
        result.data?.order ||
        result.data ||
        result;

      setOrderInfo({
        ...orderPayload,
        productName: selectedProduct.name,
        size:
          selectedVariant.size ||
          selectedVariant.name ||
          "",
        subtotal,
        deliveryCharge,
        totalAmount: grandTotal,
        orderId: savedOrder.orderId || savedOrder._id || "",
        _id: savedOrder._id || "",
        status: savedOrder.status || "pending",
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Order submission error:", error);

      setErrorMessage(
        error.message ||
          "অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="order"
      className="border-t border-gray-100 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">
            Secure Checkout
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-4xl">
            অর্ডারটি সম্পন্ন করতে আপনার তথ্য দিন
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            পণ্য হাতে পেয়ে ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধ করুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-5 border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="border-b border-gray-100 pb-3 text-sm font-bold uppercase tracking-wider text-primary">
                ১. ডেলিভারি তথ্য
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="mb-1.5 block text-xs font-bold text-gray-600"
                  >
                    আপনার নাম *
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-3.5 text-gray-400"
                    />

                    <input
                      id="checkout-name"
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-10 pr-4 text-xs text-primary focus:border-secondary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="mb-1.5 block text-xs font-bold text-gray-600"
                  >
                    মোবাইল নম্বর *
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-3.5 text-gray-400"
                    />

                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="01[3-9][0-9]{8}"
                      maxLength={11}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="017XXXXXXXX"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-10 pr-4 text-xs text-primary focus:border-secondary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-1.5 block text-xs font-bold text-gray-600"
                  >
                    সম্পূর্ণ ঠিকানা *
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-3.5 text-gray-400"
                    />

                    <textarea
                      id="checkout-address"
                      name="address"
                      required
                      maxLength={1000}
                      rows={3}
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="বাসা/রোড নং, এলাকা ও থানা"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-10 pr-4 text-xs text-primary focus:border-secondary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-district"
                    className="mb-1.5 block text-xs font-bold text-gray-600"
                  >
                    জেলা *
                  </label>

                  <input
                    id="checkout-district"
                    type="text"
                    name="district"
                    required
                    maxLength={100}
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="আপনার জেলার নাম"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs text-primary focus:border-secondary focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-note"
                    className="mb-1.5 block text-xs font-bold text-gray-600"
                  >
                    অতিরিক্ত নির্দেশনা (ঐচ্ছিক)
                  </label>

                  <textarea
                    id="checkout-note"
                    name="note"
                    rows={2}
                    maxLength={1000}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="ডেলিভারি সম্পর্কে কিছু জানাতে চাইলে লিখুন"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs text-primary focus:border-secondary focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="border-b border-gray-100 pb-3 text-sm font-bold uppercase tracking-wider text-primary">
                ২. ডেলিভারি এলাকা
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDeliveryArea("inside")}
                  aria-pressed={deliveryArea === "inside"}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left ${
                    deliveryArea === "inside"
                      ? "border-secondary bg-secondary/5"
                      : "border-gray-200 bg-gray-50/40"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-primary">
                      ঢাকার ভেতরে
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      ৳৭০
                    </p>
                  </div>

                  {deliveryArea === "inside" && (
                    <Check size={16} className="text-secondary" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryArea("outside")}
                  aria-pressed={deliveryArea === "outside"}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left ${
                    deliveryArea === "outside"
                      ? "border-secondary bg-secondary/5"
                      : "border-gray-200 bg-gray-50/40"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-primary">
                      ঢাকার বাইরে
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      ৳১২০
                    </p>
                  </div>

                  {deliveryArea === "outside" && (
                    <Check size={16} className="text-secondary" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="sticky top-24 space-y-5 border border-gray-200 bg-gray-50/70 p-6 shadow-sm sm:p-7">
              <h3 className="border-b border-gray-200/60 pb-3 text-sm font-bold uppercase tracking-wider text-primary">
                ৩. অর্ডার ওভারভিউ
              </h3>

              {isProductLoading ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-6 text-xs text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  পণ্যের তথ্য লোড হচ্ছে...
                </div>
              ) : !selectedProduct || !selectedVariant ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-5 text-center text-xs leading-6 text-gray-500">
                  পণ্যের তথ্য পাওয়া যায়নি। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-gray-200/80 bg-white p-4">
                    <h4 className="text-sm font-bold text-primary">
                      {selectedProduct.name}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      আপনার পছন্দের সাইজ নির্বাচন করুন
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {productVariants.map((variant) => {
                        const isSelected =
                          selectedVariant._id === variant._id;

                        return (
                          <button
                            key={variant._id}
                            type="button"
                            onClick={() =>
                              handleVariantChange(variant)
                            }
                            aria-pressed={isSelected}
                            className={`rounded-xl border p-3 text-left transition ${
                              isSelected
                                ? "border-secondary bg-secondary/5 ring-1 ring-secondary"
                                : "border-gray-200 bg-white hover:border-secondary/50"
                            }`}
                          >
                            <span className="block text-xs font-bold text-primary">
                              {variant.size || variant.name}
                            </span>

                            <span className="mt-1 block text-sm font-extrabold text-secondary">
                              ৳
                              {Number(variant.price).toLocaleString(
                                "en-BD"
                              )}
                            </span>

                            {Number(variant.oldPrice) >
                              Number(variant.price) && (
                              <span className="mt-1 block text-[11px] text-gray-400 line-through">
                                ৳
                                {Number(
                                  variant.oldPrice
                                ).toLocaleString("en-BD")}
                              </span>
                            )}

                            <span
                              className={`mt-2 block text-[10px] font-bold ${
                                isSelected
                                  ? "text-secondary"
                                  : "text-gray-400"
                              }`}
                            >
                              {isSelected
                                ? "✓ নির্বাচিত"
                                : "সাইজ নির্বাচন করুন"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-t border-gray-200/60 py-3.5">
                    <span className="text-xs font-bold text-gray-600">
                      পরিমাণ
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={decreaseQty}
                        disabled={quantity <= 1}
                        aria-label="পরিমাণ কমান"
                        className="h-8 w-8 rounded-lg border border-gray-200 bg-white disabled:opacity-40"
                      >
                        -
                      </button>

                      <span className="w-5 text-center text-xs font-bold text-primary">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQty}
                        disabled={quantity >= 20}
                        aria-label="পরিমাণ বাড়ান"
                        className="h-8 w-8 rounded-lg border border-gray-200 bg-white disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>পণ্যের মূল্য</span>
                      <span className="font-bold text-primary">
                        ৳{subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="font-bold text-primary">
                        ৳
                        {deliveryCharge.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200/80 pt-3 text-sm font-extrabold text-primary">
                      <span>সর্বমোট</span>
                      <span className="text-lg text-secondary">
                        ৳{grandTotal.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 rounded-xl border border-gray-200/60 bg-white p-3 text-[11px] text-gray-500">
                <ShieldCheck
                  size={16}
                  className="shrink-0 text-emerald-600"
                />

                <span>
                  ক্যাশ অন ডেলিভারি: পণ্য হাতে পেয়ে টাকা দিন।
                </span>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading ||
                  isProductLoading ||
                  !selectedProduct ||
                  !selectedVariant
                }
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    অর্ডার পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    অর্ডার কনফার্ম করুন

                    {selectedVariant && (
                      <> (৳{grandTotal.toLocaleString("en-BD")})</>
                    )}

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
