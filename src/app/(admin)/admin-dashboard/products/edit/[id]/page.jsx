"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminProductEditPage({ params }) {
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
          throw new Error(data.message || "Product পাওয়া যায়নি");
        }

        const result = data.product || data.data?.product || data.data || data;

        if (!result?._id) {
          throw new Error("API থেকে সঠিক product data পাওয়া যায়নি");
        }

        if (!cancelled) setProduct(result);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Product load করতে সমস্যা হয়েছে");
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

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin-dashboard/products"
          className="text-sm font-medium text-green-800 hover:underline"
        >
          ← Back to Products
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          Edit Product
        </h1>

        <p className="mb-7 mt-2 text-sm text-gray-500">
          Product-এর information, price, stock ও SEO update করুন।
        </p>

        {loading ? (
          <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
            Product load হচ্ছে...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <ProductForm
            mode="edit"
            productId={id}
            initialProduct={product}
          />
        )}
      </div>
    </main>
  );
}