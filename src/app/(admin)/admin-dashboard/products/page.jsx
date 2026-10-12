"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  Package,
  Sparkles,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/products`, {
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Products load করা যায়নি");
      }

      const list = Array.isArray(data)
        ? data
        : data.products || data.data?.products || data.data || [];

      setProducts(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `"${product.name}" product delete করতে চান?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/products/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Product delete করা যায়নি");
      }

      setProducts((current) =>
        current.filter((item) => item._id !== product._id)
      );
    } catch (err) {
      window.alert(err.message || "Delete করতে সমস্যা হয়েছে");
    }
  }

  const filteredProducts = products.filter((product) =>
    `${product.name || ""} ${product.category || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      {/* Top Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Products Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Mariyam Roots-এর সমস্ত পণ্য তালিকা ও তথ্য পরিচালনা করুন।
          </p>
        </div>

        <Link
          href="/admin-dashboard/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#074506] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#053604] active:bg-black"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="mb-6 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Product name বা category দিয়ে সার্চ করুন..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-[#074506] focus:bg-white focus:ring-1 focus:ring-[#074506]"
            />
          </div>

          <button
            onClick={fetchProducts}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Main Table Card */}
      {loading ? (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <RefreshCw size={28} className="animate-spin text-[#074506]" />
          <p className="text-sm font-medium text-gray-500">
            Products লোড হচ্ছে...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <Package size={40} className="text-gray-300" />
          <h2 className="text-base font-semibold text-gray-800">
            কোনো product পাওয়া যায়নি
          </h2>
          <p className="text-xs text-gray-500">
            নতুন product তৈরি করুন অথবা সার্চ কি-ওয়ার্ড পরিবর্তন করুন।
          </p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50/80 text-xs font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">Product Info</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Variants</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const image =
                    product.thumbnail ||
                    product.imageAssets?.[0]?.url ||
                    product.images?.[0];

                  return (
                    <tr
                      key={product._id}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          {image ? (
                            <img
                              src={image}
                              alt={product.name || "Product"}
                              className="h-12 w-12 shrink-0 rounded-xl border border-gray-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[10px] text-gray-400">
                              No image
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-bold text-gray-900">
                              {product.name}
                            </p>
                            <p className="truncate text-xs font-medium text-gray-400">
                              /{product.slug || "no-slug"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-600">
                        {product.category ? (
                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {product.category}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {product.variants?.length || 0} টি
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            product.isActive !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.isActive !== false
                                ? "bg-emerald-600"
                                : "bg-gray-400"
                            }`}
                          />
                          {product.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {product.isFeatured ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                            <Sparkles size={11} /> Featured
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Standard</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin-dashboard/products/${product._id}`}
                            title="View"
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Eye size={15} />
                          </Link>

                          <Link
                           href={`/admin-dashboard/products/edit/${product._id}`}
                            title="Edit"
                            className="rounded-lg border border-blue-200 p-2 text-blue-700 transition hover:bg-blue-50"
                          >
                            <Pencil size={15} />
                          </Link>

                          <button
                            onClick={() => handleDelete(product)}
                            title="Delete"
                            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-3.5 text-xs font-medium text-gray-500">
            মোট <span className="font-bold text-gray-800">{filteredProducts.length}</span> টি পণ্য পাওয়া গেছে
          </div>
        </div>
      )}
    </div>
  );
}