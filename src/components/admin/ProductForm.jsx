
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  Trash2,
  Star,
  CheckCircle2,
  Package,
  Search,
  Eye,
  UploadCloud,
  X,
  Plus,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const defaultVariants = [
  {
    name: "Single Pack",
    size: "50ml",
    price: "350",
    oldPrice: "450",
    stock: "20",
    isActive: true,
  },
  {
    name: "Single Pack",
    size: "100ml",
    price: "650",
    oldPrice: "850",
    stock: "20",
    isActive: true,
  },
];

const defaultProduct = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "",
  featuresText: "",
  metaTitle: "",
  metaDescription: "",
  isActive: true,
  isFeatured: false,
};

function normalizeVariant(variant = {}) {
  return {
    name: variant.name || "Single Pack",
    size: variant.size || "",
    price: variant.price == null ? "" : String(variant.price),
    oldPrice:
      variant.oldPrice == null ? "" : String(variant.oldPrice),
    stock: variant.stock == null ? "0" : String(variant.stock),
    isActive: variant.isActive !== false,
  };
}

function toFormValues(product = {}) {
  return {
    ...defaultProduct,
    name: product.name || "",
    slug: product.slug || "",
    shortDescription: product.shortDescription || "",
    description: product.description || "",
    category: product.category || "",
    featuresText: (product.features || []).join("\n"),
    variants:
      product.variants?.length > 0
        ? product.variants.map(normalizeVariant)
        : defaultVariants.map(normalizeVariant),
    metaTitle: product.metaTitle || "",
    metaDescription: product.metaDescription || "",
    isActive: product.isActive !== false,
    isFeatured: product.isFeatured === true,
  };
}

function getInitialImages(product = {}) {
  const candidates = [
    ...(product.imageAssets || []),
    product.thumbnail,
    ...(product.images || []),
  ];

  const seen = new Set();

  return candidates
    .map((item) =>
      typeof item === "string"
        ? { url: item, publicId: "" }
        : {
          url: item?.url || "",
          publicId: item?.publicId || "",
        }
    )
    .filter((item) => {
      if (!item.url || seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .slice(0, MAX_IMAGES);
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10";

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-7">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-7">{children}</div>
    </section>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {hint && (
        <p className="mt-2 text-xs leading-5 text-gray-500">{hint}</p>
      )}
    </div>
  );
}

function Toggle({ checked, onChange, title, description }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-green-200 hover:bg-green-50/30">
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-green-800"
      />
    </label>
  );
}

export default function ProductForm({
  initialProduct,
  productId,
  mode = "create",
}) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() =>
    toFormValues(initialProduct || {})
  );

  const [images, setImages] = useState(() =>
    getInitialImages(initialProduct || {})
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleNameChange(value) {
    setForm((current) => ({
      ...current,
      name: value,
      slug:
        mode === "create"
          ? value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
          : current.slug,
    }));
  }

  function updateVariant(index, field, value) {
    setForm((current) => ({
      ...current,
      variants: current.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  }

  function addVariant() {
    setForm((current) => ({
      ...current,
      variants: [
        ...current.variants,
        {
          name: "Single Pack",
          size: "",
          price: "",
          oldPrice: "",
          stock: "20",
          isActive: true,
        },
      ],
    }));
  }

  function removeVariant(index) {
    setForm((current) => ({
      ...current,
      variants: current.variants.filter((_, i) => i !== index),
    }));
  }

  async function handleImageUpload(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    setError("");
    setNotice("");

    if (images.length + files.length > MAX_IMAGES) {
      setError(`সর্বোচ্চ ${MAX_IMAGES}টি ছবি রাখা যাবে।`);
      return;
    }

    const invalidFile = files.find(
      (file) =>
        !ALLOWED_TYPES.includes(file.type) ||
        file.size > MAX_FILE_SIZE
    );

    if (invalidFile) {
      setError(
        "শুধু JPEG, PNG, WebP বা AVIF ছবি দিন। প্রতিটি ছবির সাইজ সর্বোচ্চ 5MB হতে পারবে।"
      );
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setUploading(true);

      const response = await fetch(`${API_URL}/api/uploads/products`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "ছবি upload করা যায়নি। Admin login করা আছে কি না দেখুন।"
        );
      }

      const uploadedImages = (data.images || [])
        .filter((item) => item.url)
        .map((item) => ({
          url: item.url,
          publicId: item.publicId || "",
        }));

      setImages((current) =>
        [...current, ...uploadedImages].slice(0, MAX_IMAGES)
      );

      setNotice(
        `${uploadedImages.length}টি ছবি Cloudinary-তে upload হয়েছে।`
      );
    } catch (err) {
      setError(err.message || "ছবি upload করতে সমস্যা হয়েছে।");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(indexToRemove) {
    setImages((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
    setNotice("");
  }

  function makeMainImage(index) {
    setImages((current) => {
      const selected = current[index];

      return [
        selected,
        ...current.filter((_, currentIndex) => currentIndex !== index),
      ];
    });

    setNotice("Main image পরিবর্তন হয়েছে।");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (uploading) {
      setError("ছবি upload শেষ হওয়া পর্যন্ত অপেক্ষা করুন।");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (!form.name.trim()) {
        throw new Error("Product name দিতে হবে।");
      }

      if (!form.slug.trim()) {
        throw new Error("Product slug দিতে হবে।");
      }

      if (!form.variants.length) {
        throw new Error("কমপক্ষে একটি variant যোগ করুন।");
      }

      const variants = form.variants.map((variant, index) => {
        const name = variant.name?.trim();
        const size = variant.size?.trim();

        if (!name) {
          throw new Error(
            `Variant ${index + 1}: প্যাকেজের নাম নির্বাচন করুন।`
          );
        }

        if (!size) {
          throw new Error(
            `Variant ${index + 1}: সাইজ বা প্যাকেজের পরিমাণ লিখুন।`
          );
        }

        if (
          variant.price === "" ||
          !Number.isFinite(Number(variant.price)) ||
          Number(variant.price) < 0
        ) {
          throw new Error(
            `Variant ${index + 1}: সঠিক বিক্রয়মূল্য লিখুন।`
          );
        }

        const price = Number(variant.price);
        const stock =
          variant.stock === "" ? 0 : Number(variant.stock);

        if (!Number.isFinite(stock) || stock < 0) {
          throw new Error(
            `Variant ${index + 1}: Stock শূন্য বা তার বেশি হতে হবে।`
          );
        }

        let oldPrice;

        if (variant.oldPrice !== "") {
          oldPrice = Number(variant.oldPrice);

          if (!Number.isFinite(oldPrice) || oldPrice < 0) {
            throw new Error(
              `Variant ${index + 1}: সঠিক Old Price লিখুন।`
            );
          }
        }

        return {
          name,
          size,
          price,
          ...(oldPrice === undefined ? {} : { oldPrice }),
          stock,
          isActive: variant.isActive !== false,
        };
      });

      const features = form.featuresText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        thumbnail: images[0]?.url || "",
        images: images.slice(1).map((image) => image.url),
        features,
        variants,
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        isActive: form.isActive,
        isFeatured: form.isFeatured,
      };

      const url =
        mode === "edit"
          ? `${API_URL}/api/products/${productId}`
          : `${API_URL}/api/products`;

      const response = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Product save করা যায়নি।");
      }

      window.location.href = "/admin-dashboard/products";
    } catch (err) {
      setError(err.message || "Product save করতে সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-green-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
            MARIYAM ROOTS · ADMIN
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {mode === "edit" ? "Edit Product" : "Create Product"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-green-100/75">
            Product details, images, pricing এবং SEO এক জায়গা থেকে manage করুন।
          </p>
        </div>

        <Link
          href="/admin-dashboard/products"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          All Products
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <X size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {notice && !error && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <p>{notice}</p>
        </div>
      )}

      <Section
        icon={Package}
        title="Basic Information"
        description="Product-এর পরিচিতি, category ও description সেট করুন।"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Product Name" required>
            <input
              required
              value={form.name}
              onChange={(event) => handleNameChange(event.target.value)}
              className={inputClass}
              placeholder="Herbal Magic Hair Oil"
            />
          </Field>

          <Field
            label="Product Slug"
            required
            hint="URL-এ ব্যবহৃত হবে; ইংরেজি অক্ষর ও hyphen ব্যবহার করুন।"
          >
            <input
              required
              value={form.slug}
              onChange={(event) => updateField("slug", event.target.value)}
              className={inputClass}
              placeholder="herbal-magic-hair-oil"
            />
          </Field>

          <Field label="Category">
            <input
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              className={inputClass}
              placeholder="Hair Care"
            />
          </Field>

          <Field label="Short Description">
            <input
              value={form.shortDescription}
              onChange={(event) =>
                updateField("shortDescription", event.target.value)
              }
              className={inputClass}
              placeholder="Product সম্পর্কে সংক্ষিপ্ত পরিচিতি"
            />
          </Field>
        </div>

        <Field label="Full Description">
          <textarea
            rows={5}
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            className={inputClass}
            placeholder="Product-এর বিস্তারিত বিবরণ লিখুন..."
          />
        </Field>

        <Field
          label="Product Features"
          hint="প্রতি লাইনে একটি feature লিখুন।"
        >
          <textarea
            rows={4}
            value={form.featuresText}
            onChange={(event) =>
              updateField("featuresText", event.target.value)
            }
            className={inputClass}
            placeholder={"হারবাল উপাদান\nচুলের যত্নে ব্যবহারযোগ্য"}
          />
        </Field>
      </Section>

      <Section
        icon={ImagePlus}
        title="Product Images"
        description="Cloudinary-তে ছবি upload করুন এবং main product image বেছে নিন।"
      >
        <div
          onClick={() => {
            if (!uploading && images.length < MAX_IMAGES) {
              fileInputRef.current?.click();
            }
          }}
          className={`group rounded-2xl border-2 border-dashed border-green-200 bg-green-50/50 px-5 py-9 text-center transition ${uploading || images.length >= MAX_IMAGES
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-green-500 hover:bg-green-50"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading || images.length >= MAX_IMAGES}
          />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm transition group-hover:scale-105">
            {uploading ? (
              <LoaderCircle size={26} className="animate-spin" />
            ) : (
              <UploadCloud size={27} />
            )}
          </div>

          <p className="mt-4 font-bold text-gray-900">
            {uploading
              ? "ছবি Cloudinary-তে upload হচ্ছে..."
              : "ছবি upload করতে ক্লিক করুন"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            JPEG, PNG, WebP অথবা AVIF
          </p>

          <p className="mt-1 text-xs text-gray-400">
            প্রতিটি ছবি সর্বোচ্চ 5MB · সর্বোচ্চ {MAX_IMAGES}টি ছবি
          </p>

          {uploading && (
            <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-xs font-medium text-green-800">
              <LoaderCircle size={14} className="animate-spin" />
              Please wait...
            </div>
          )}
        </div>

        {images.length > 0 ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Uploaded Images
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  প্রথম ছবিটি main image হিসেবে ব্যবহার হবে।
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
                {images.length}/{MAX_IMAGES}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <img
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-green-800 px-2 py-1 text-[10px] font-bold text-white shadow">
                        <Star size={11} fill="currentColor" />
                        MAIN
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={uploading || saving}
                      aria-label="ছবি মুছুন"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-red-600 shadow transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="p-2">
                    {index === 0 ? (
                      <p className="flex items-center justify-center gap-1 py-2 text-xs font-semibold text-green-800">
                        <CheckCircle2 size={14} />
                        Main Image
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => makeMainImage(index)}
                        disabled={uploading || saving}
                        className="w-full rounded-lg border border-gray-200 px-2 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 disabled:opacity-50"
                      >
                        Make Main Image
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-5 text-center">
            <ImagePlus className="mx-auto text-gray-400" size={28} />
            <p className="mt-2 text-sm font-semibold text-gray-700">
              এখনো কোনো ছবি upload করা হয়নি
            </p>
            <p className="mt-1 text-xs text-gray-500">
              উপরের upload area থেকে product image যোগ করুন।
            </p>
          </div>
        )}
      </Section>

      <Section
        icon={Package}
        title="Variants & Pricing"
        description="Single Pack, Combo Pack বা অন্য প্যাকেজ তৈরি করুন। প্রতিটির দাম ও স্টক আলাদা হবে।"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-gray-900">
              প্যাকেজের তালিকা ({form.variants.length})
            </h3>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              প্যাকেজের নাম ও সাইজ লিখুন। Combo Pack-এর সাইজে যেমন 2 × 50ml দিতে পারবেন।
            </p>
          </div>

          <button
            type="button"
            onClick={addVariant}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-900 disabled:opacity-50"
          >
            <Plus size={17} />
            Add Variant
          </button>
        </div>

        {form.variants.map((variant, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-900">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Variant {index + 1}
                  </h4>
                  <p className="text-xs text-gray-500">
                    প্যাকেজ ও মূল্য নির্ধারণ করুন
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeVariant(index)}
                disabled={saving || form.variants.length === 1}
                title={
                  form.variants.length === 1
                    ? "কমপক্ষে একটি variant রাখতে হবে"
                    : "এই variant মুছুন"
                }
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="প্যাকেজের ধরন" required>
                <select
                  required
                  value={variant.name}
                  onChange={(event) =>
                    updateVariant(index, "name", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="Single Pack">Single Pack</option>
                  <option value="Combo Pack">Combo Pack</option>
                  <option value="Family Pack">Family Pack</option>
                  <option value="Special Pack">Special Pack</option>
                </select>
              </Field>

              <Field
                label="সাইজ / প্যাকেজের পরিমাণ"
                required
                hint="যেমন: 50ml, 100ml, 2 × 50ml"
              >
                <input
                  required
                  value={variant.size}
                  onChange={(event) =>
                    updateVariant(index, "size", event.target.value)
                  }
                  className={inputClass}
                  placeholder="2 × 50ml"
                />
              </Field>

              <Field label="বিক্রয়মূল্য (৳)" required>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={variant.price}
                  onChange={(event) =>
                    updateVariant(index, "price", event.target.value)
                  }
                  className={inputClass}
                  placeholder="600"
                />
              </Field>

              <Field
                label="পুরোনো মূল্য (৳)"
                hint="Discount না থাকলে ফাঁকা রাখুন।"
              >
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={variant.oldPrice}
                  onChange={(event) =>
                    updateVariant(index, "oldPrice", event.target.value)
                  }
                  className={inputClass}
                  placeholder="750"
                />
              </Field>

              <Field label="Stock / মজুত" required>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={variant.stock}
                  onChange={(event) =>
                    updateVariant(index, "stock", event.target.value)
                  }
                  className={inputClass}
                  placeholder="20"
                />
              </Field>

              <div className="flex items-end">
                <label className="flex min-h-[46px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                  <span className="text-sm font-semibold text-gray-700">
                    Active Variant
                  </span>
                  <input
                    type="checkbox"
                    checked={variant.isActive}
                    onChange={(event) =>
                      updateVariant(
                        index,
                        "isActive",
                        event.target.checked
                      )
                    }
                    className="h-4 w-4 accent-green-800"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-green-100 bg-white px-4 py-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Preview:</span>{" "}
                {variant.name || "Package"} · {variant.size || "Size"} ·{" "}
                ৳{variant.price || "0"}
                {variant.oldPrice && (
                  <span className="ml-2 text-xs text-gray-400 line-through">
                    ৳{variant.oldPrice}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Stock management
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-800">
            Stock 0 হলে প্যাকেজের মজুত থাকবে না। Combo Pack-এর সাইজে মোট
            প্যাকের পরিমাণ স্পষ্ট করে লিখুন। প্রতিটি variant-এর নাম, সাইজ
            এবং মূল্য দেওয়া বাধ্যতামূলক।
          </p>
        </div>
      </Section>

      <Section
        icon={Search}
        title="SEO Settings"
        description="Search engine-এ product-এর title ও description নির্ধারণ করুন।"
      >
        <Field label="Meta Title">
          <input
            value={form.metaTitle}
            onChange={(event) => updateField("metaTitle", event.target.value)}
            maxLength={70}
            className={inputClass}
            placeholder="Herbal Magic Hair Oil | Mariyam Roots"
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {form.metaTitle.length}/70
          </p>
        </Field>

        <Field label="Meta Description">
          <textarea
            rows={4}
            value={form.metaDescription}
            onChange={(event) =>
              updateField("metaDescription", event.target.value)
            }
            maxLength={200}
            className={inputClass}
            placeholder="Search engine-এ দেখানোর জন্য product-এর সংক্ষিপ্ত বিবরণ..."
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {form.metaDescription.length}/200
          </p>
        </Field>
      </Section>

      <Section
        icon={Eye}
        title="Visibility & Publishing"
        description="Product customer-দের কাছে visible হবে কি না নির্ধারণ করুন।"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Toggle
            checked={form.isActive}
            onChange={(value) => updateField("isActive", value)}
            title="Active Product"
            description="চালু থাকলে product active থাকবে।"
          />

          <Toggle
            checked={form.isFeatured}
            onChange={(value) => updateField("isFeatured", value)}
            title="Featured Product"
            description="Featured section-এ দেখানোর জন্য ব্যবহার করুন।"
          />
        </div>
      </Section>

      <div className="sticky bottom-3 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="hidden text-xs text-gray-500 sm:block">
          {images.length}টি ছবি · {form.variants.length}টি variant
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Link
            href="/admin-dashboard/products"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Saving Product...
              </>
            ) : uploading ? (
              "Image upload হচ্ছে..."
            ) : (
              <>
                <CheckCircle2 size={17} />
                {mode === "edit" ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
