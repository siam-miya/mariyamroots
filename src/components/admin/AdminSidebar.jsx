"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  ChartNoAxesCombined,
  X,
  Leaf,
  ChevronRight,
  ChevronDown,
  PlusCircle,
  ListOrdered,
} from "lucide-react";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      {
        label: "Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Orders",
        href: "/admin-dashboard/orders",
        icon: ShoppingCart,
      },
      {
        label: "Products",
        href: "/admin-dashboard/products",
        icon: Package,
        children: [
          {
            label: "All Products",
            href: "/admin-dashboard/products",
            icon: ListOrdered,
          },
          {
            label: "Create Product",
            href: "/admin-dashboard/products/create",
            icon: PlusCircle,
          },
        ],
      },
      {
        label: "Customers",
        href: "/admin-dashboard/customers",
        icon: Users,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "Analytics",
        href: "/admin-dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Settings",
        href: "/admin-dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const pathname = usePathname();

  // Products ড্রপডাউন খোলার জন্য স্টেট (ডিফল্টভাবে যদি ইউজার প্রোডাক্ট পেজে থাকে তবে ওপেন থাকবে)
  const [openDropdowns, setOpenDropdowns] = useState({
    Products: pathname.startsWith("/admin-dashboard/products"),
  });

  useEffect(() => {
    if (pathname.startsWith("/admin-dashboard/products")) {
      setOpenDropdowns((prev) => ({ ...prev, Products: true }));
    }
  }, [pathname]);

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href) => {
    if (href === "/admin-dashboard") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-gray-950/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex w-[264px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/admin-dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm shadow-emerald-900/15">
              <Leaf size={24} strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-extrabold tracking-tight text-gray-900">
                Mariyam Roots
              </h2>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[2px] text-emerald-700">
                Administration
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[1.8px] text-gray-400">
                {group.title}
              </p>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const hasChildren = Boolean(item.children);
                  const isOpen = openDropdowns[item.label];

                  return (
                    <div key={item.href} className="space-y-1">
                      {hasChildren ? (
                        /* Products বাটনে ক্লিক করলে সাব-মেনু টগল হবে */
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.label)}
                          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-all duration-200 ${
                            active
                              ? "bg-emerald-50 text-emerald-800"
                              : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                          }`}
                        >
                          <Icon
                            size={19}
                            strokeWidth={active ? 2.3 : 1.8}
                            className={
                              active
                                ? "text-emerald-700"
                                : "text-gray-400 transition-colors group-hover:text-emerald-700"
                            }
                          />

                          <span className="flex-1 text-left">{item.label}</span>

                          {isOpen ? (
                            <ChevronDown
                              size={16}
                              className="text-gray-400 group-hover:text-emerald-700"
                            />
                          ) : (
                            <ChevronRight
                              size={16}
                              className="text-gray-400 group-hover:text-emerald-700"
                            />
                          )}
                        </button>
                      ) : (
                        /* সাধারণ লিঙ্কসমূহ */
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-all duration-200 ${
                            active
                              ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/10"
                              : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                          }`}
                        >
                          <Icon
                            size={19}
                            strokeWidth={active ? 2.3 : 1.8}
                            className={
                              active
                                ? "text-white"
                                : "text-gray-400 transition-colors group-hover:text-emerald-700"
                            }
                          />

                          <span className="flex-1">{item.label}</span>

                          {active && (
                            <ChevronRight
                              size={16}
                              className="text-emerald-100"
                            />
                          )}
                        </Link>
                      )}

                      {/* Sub-menu items for Products */}
                      {hasChildren && isOpen && (
                        <div className="ml-6 space-y-1 border-l-2 border-emerald-100 pl-3 pt-1">
                          {item.children.map((child) => {
                            const childActive = pathname === child.href;
                            const ChildIcon = child.icon;

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                                  childActive
                                    ? "bg-emerald-700 font-bold text-white shadow-sm"
                                    : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-800"
                                }`}
                              >
                                <ChildIcon size={15} />
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom card */}
        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-bold text-emerald-900">
                Admin Workspace
              </p>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-gray-500">
              Manage your store, products and customer orders from one place.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 px-2 text-[11px] text-gray-400">
            <Leaf size={13} />
            <span>Mariyam Roots Admin</span>
          </div>
        </div>
      </aside>
    </>
  );
}