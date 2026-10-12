"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export default function ProductCreatePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      {/* Top Header Section */}
      <div className="mb-6 flex flex-col gap-2">
        <div>
          <Link
            href="/admin-dashboard/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 hover:underline transition-all"
          >
            <ArrowLeft size={14} />
            Back to Products
          </Link>
        </div>

        <div className="mt-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Notun product, Cloudinary image, pricing, variants o SEO ekei jaygay add korun.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="w-full">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}