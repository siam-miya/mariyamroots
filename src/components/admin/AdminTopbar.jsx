
"use client";

import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Leaf,
} from "lucide-react";

const pageTitles = {
  "/admin-dashboard": "Dashboard",
  "/admin-dashboard/orders": "Order Management",
  "/admin-dashboard/products": "Product Management",
  "/admin-dashboard/categories": "Category Management",
  "/admin-dashboard/customers": "Customer Management",
  "/admin-dashboard/analytics": "Analytics",
  "/admin-dashboard/settings": "Settings",
};

export default function AdminTopbar({ onMenuClick }) {
  const pathname = usePathname();

  const currentTitle =
    pageTitles[pathname] ||
    (pathname.startsWith("/admin-dashboard/orders/")
      ? "Order Details"
      : "Admin Dashboard");

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[76px] border-b border-gray-200 bg-white/95 backdrop-blur-md lg:left-[264px]">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Leaf
                size={15}
                className="shrink-0 text-emerald-700 sm:hidden"
              />

              <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                {currentTitle}
              </h1>
            </div>

            <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
              Welcome to your store workspace
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="relative hidden xl:block">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search anything..."
              className="h-10 w-56 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs outline-none transition placeholder:text-gray-400 focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-50"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.currentTarget.value = "";
                }
              }}
            />
          </div>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          <div className="flex items-center gap-2 rounded-xl py-1 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-gray-800">
                Store Admin
              </p>
              <p className="mt-1 text-[10px] text-gray-400">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white ring-4 ring-emerald-50">
              A
            </div>

            <ChevronDown
              size={15}
              className="hidden text-gray-400 sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
