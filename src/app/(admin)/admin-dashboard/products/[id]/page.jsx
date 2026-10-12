"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminProductDetailsPage({ params }) {
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/products/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product load করা যায়নি");
        }

        const result = data.product || data.data?.product || data.data || data;

        if (!result?._id) {
          throw new Error("সঠিক product data পাওয়া যায়নি");
        }

        if (!cancelled) setProduct(result);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "কিছু একটা সমস্যা হয়েছে");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl rounded-xl border bg-white p-10 text-center text-gray-500">
          Product details load হচ্ছে...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/admin-dashboard/products"
            className="text-sm font-medium text-green-800 hover:underline"
          >
            ← Back to Products
          </Link>

          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error || "Product পাওয়া যায়নি"}
          </div>
        </div>
      </main>
    );
  }

  const images = [
    product.thumbnail,
    ...(product.imageAssets || []).map((item) => item?.url),
    ...(product.images || []),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin-dashboard/products"
              className="text-sm font-medium text-green-800 hover:underline"
            >
              ← Back to Products
            </Link>

            <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
              Product Details
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Product-এর সম্পূর্ণ information দেখুন।
            </p>
          </div>

          <Link
            href={`/admin-dashboard/products/${product._id}/edit`}
            className="inline-flex items-center justify-center rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white hover:bg-green-900"
          >
            Edit Product
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <section className="h-fit rounded-xl border border-gray-200 bg-white p-5">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={product.name}
                className="aspect-square w-full rounded-lg border object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                No product image
              </div>
            )}

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="aspect-square w-full rounded-md border object-cover"
                  />
                ))}
              </div>
            )}

            <h2 className="mt-5 text-xl font-bold">{product.name}</h2>

            <p className="mt-2 break-all text-sm text-gray-500">
              Slug: {product.slug || "—"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.isActive ? "Active" : "Inactive"}
              </span>

              {product.isFeatured && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  Featured
                </span>
              )}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg font-bold">Basic Information</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <Info label="Product Name" value={product.name} />
                <Info label="Category" value={product.category} />
                <Info
                  label="Short Description"
                  value={product.shortDescription}
                />
                <Info label="Product ID" value={product._id} />
              </div>

              <div className="mt-5 border-t pt-5">
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Full Description
                </p>
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                  {product.description || "Description দেওয়া হয়নি।"}
                </p>
              </div>

              {product.features?.length > 0 && (
                <div className="mt-5 border-t pt-5">
                  <h3 className="mb-3 font-semibold">Features</h3>
                  <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={`${feature}-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg font-bold">
                Variants & Pricing
              </h2>

              {!product.variants?.length ? (
                <p className="text-sm text-gray-500">
                  কোনো variant যোগ করা হয়নি।
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-sm">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                      <tr>
                        <th className="px-4 py-3">Variant</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Old Price</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {product.variants.map((variant, index) => (
                        <tr key={variant._id || `${variant.size}-${index}`}>
                          <td className="px-4 py-4 font-medium">
                            {variant.size || variant.name || "—"}
                          </td>
                          <td className="px-4 py-4">
                            ৳{Number(variant.price || 0).toLocaleString("en-BD")}
                          </td>
                          <td className="px-4 py-4">
                            {variant.oldPrice != null
                              ? `৳${Number(variant.oldPrice).toLocaleString("en-BD")}`
                              : "—"}
                          </td>
                          <td className="px-4 py-4">
                            {variant.stock ?? 0}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                variant.isActive !== false
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {variant.isActive !== false
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg font-bold">SEO Information</h2>

              <div className="space-y-5">
                <Info label="Meta Title" value={product.metaTitle} />
                <Info
                  label="Meta Description"
                  value={product.metaDescription}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="break-words text-sm leading-6 text-gray-800">
        {value || "—"}
      </p>
    </div>
  );
}