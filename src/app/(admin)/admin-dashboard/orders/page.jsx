
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Eye,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  X,
  Phone,
  MapPin,
  User,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const ORDER_API = `${API_URL}/api/orders`;

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-violet-50 text-violet-700 border-violet-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function formatPrice(value) {
  return `৳${Number(value || 0).toLocaleString("en-BD")}`;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getOrderId(order) {
  return (
    order?.orderId ||
    order?.trackingId ||
    order?._id ||
    "N/A"
  );
}

function getCustomer(order) {
  const customer = order?.customer || {};

  return {
    name:
      order?.customerName ||
      customer?.name ||
      order?.name ||
      "Unknown Customer",

    phone:
      order?.phone ||
      customer?.phone ||
      order?.customerPhone ||
      "—",

    address:
      order?.address ||
      customer?.address ||
      order?.shippingAddress ||
      "—",
  };
}

function getItems(order) {
  const items = order?.items || order?.products || [];

  return Array.isArray(items) ? items : [];
}

function getItemName(item) {
  return (
    item?.product?.title ||
    item?.product?.name ||
    item?.productName ||
    item?.title ||
    item?.name ||
    "Product"
  );
}

function getItemQuantity(item) {
  return Number(item?.quantity ?? item?.qty ?? 1);
}

function getOrderTotal(order) {
  return Number(
    order?.totalAmount ??
      order?.totalPrice ??
      order?.totalCost ??
      order?.grandTotal ??
      order?.amount ??
      0
  );
}

function getStatus(order) {
  const status = String(
    order?.status || order?.orderStatus || "pending"
  ).toLowerCase();

  return STATUS_LABELS[status] ? status : "pending";
}

function getErrorMessage(data, fallback) {
  return data?.message || data?.error || fallback;
}

function getOrdersFromResponse(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.orders)) return data.orders;

  if (Array.isArray(data?.data)) return data.data;

  if (Array.isArray(data?.data?.orders)) {
    return data.data.orders;
  }

  return [];
}

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {value}
        </p>
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={23} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex whitespace-nowrap items-center rounded-full border px-3 py-1 text-xs font-semibold ${
      STATUS_STYLES[status] || STATUS_STYLES.pending
    }`}
  >
    {STATUS_LABELS[status] || "Pending"}
  </span>
);

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState("");
  const [updateError, setUpdateError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(ORDER_API, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, `Orders load failed (${response.status})`)
        );
      }

      if (data?.success === false) {
        throw new Error(
          getErrorMessage(data, "Could not load orders.")
        );
      }

      setOrders(getOrdersFromResponse(data));
    } catch (err) {
      setError(
        err.message ||
          "অর্ডার লোড করা যায়নি। Backend ও API URL চেক করো।"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const customer = getCustomer(order);
      const orderId = String(getOrderId(order)).toLowerCase();

      const matchesSearch =
        !query ||
        orderId.includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        String(customer.phone).toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        getStatus(order) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter(
      (order) => getStatus(order) === "pending"
    ).length;

    const delivered = orders.filter(
      (order) => getStatus(order) === "delivered"
    ).length;

    const revenue = orders
      .filter((order) => getStatus(order) === "delivered")
      .reduce((sum, order) => sum + getOrderTotal(order), 0);

    return { total, pending, delivered, revenue };
  }, [orders]);

  const updateOrderStatus = async (order, nextStatus) => {
    const id = order?._id;

    if (!id) {
      setUpdateError(
        "এই অর্ডারে MongoDB _id পাওয়া যায়নি। Status update করা সম্ভব নয়।"
      );
      return;
    }

    const currentStatus = getStatus(order);

    if (currentStatus === nextStatus) return;

    const confirmed = window.confirm(
      `Order ${getOrderId(order)}-এর status "${STATUS_LABELS[nextStatus]}" করতে চাও?`
    );

    if (!confirmed) return;

    setUpdatingId(id);
    setUpdateError("");

    try {
      /*
       * IMPORTANT:
       * নিচের endpoint ও payload backend-এর route/controller-এর
       * সঙ্গে মিলতে হবে। তোমার backend-এ PATCH route না থাকলে
       * সেটি নিশ্চিত না হওয়া পর্যন্ত এই request সফল হবে না।
       */
      const response = await fetch(
        `${ORDER_API}/${encodeURIComponent(id)}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.success === false) {
        throw new Error(
          getErrorMessage(
            data,
            `Status update failed (${response.status})`
          )
        );
      }

      const updatedOrder =
        data?.order || data?.data?.order || data?.data;

      setOrders((previousOrders) =>
        previousOrders.map((item) => {
          if (item._id !== id) return item;

          if (updatedOrder && typeof updatedOrder === "object") {
            return { ...item, ...updatedOrder };
          }

          return {
            ...item,
            status: nextStatus,
          };
        })
      );

      setSelectedOrder((previous) => {
        if (previous?._id !== id) return previous;

        if (updatedOrder && typeof updatedOrder === "object") {
          return { ...previous, ...updatedOrder };
        }

        return { ...previous, status: nextStatus };
      });
    } catch (err) {
      setUpdateError(
        err.message ||
          "Status update হয়নি। Backend route চেক করো।"
      );
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-amber-600">
              MARIYAM ROOTS / ADMIN
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Order Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage customer orders and track order status.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Orders
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={stats.total}
            icon={ShoppingBag}
            color="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Pending Orders"
            value={stats.pending}
            icon={Clock}
            color="bg-amber-50 text-amber-600"
          />

          <StatCard
            title="Delivered Orders"
            value={stats.delivered}
            icon={CheckCircle2}
            color="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Delivered Revenue"
            value={formatPrice(stats.revenue)}
            icon={Package}
            color="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Search and filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by order ID, customer name or phone..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-amber-400"
            >
              <option value="all">All Statuses</option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>

        {/* Update error */}
        {updateError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div className="flex-1">{updateError}</div>

            <button
              type="button"
              onClick={() => setUpdateError("")}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-100 border-t-amber-500" />

            <p className="text-sm text-gray-500">
              Loading orders...
            </p>
          </div>
        )}

        {/* Fetch error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <AlertCircle
              size={36}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-3 font-semibold text-gray-900">
              Could not load orders
            </h2>

            <p className="mx-auto mt-2 max-w-xl break-words text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders table */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="font-bold text-gray-900">
                Recent Orders
              </h2>

              <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {filteredOrders.length} orders
              </span>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <ShoppingBag
                  size={42}
                  className="mx-auto text-gray-300"
                />

                <h3 className="mt-4 font-semibold text-gray-800">
                  No orders found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try another search or change the status filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Order</th>
                      <th className="px-5 py-4 font-semibold">Customer</th>
                      <th className="px-5 py-4 font-semibold">Date</th>
                      <th className="px-5 py-4 font-semibold">Items</th>
                      <th className="px-5 py-4 font-semibold">Total</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => {
                      const customer = getCustomer(order);
                      const items = getItems(order);
                      const status = getStatus(order);

                      return (
                        <tr
                          key={order._id || getOrderId(order)}
                          className="transition hover:bg-gray-50"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-900">
                              #{getOrderId(order)}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              ID: {String(order._id || "—").slice(-8)}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-800">
                              {customer.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {customer.phone}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {formatDate(
                              order.createdAt ||
                                order.orderDate ||
                                order.date
                            )}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {items.reduce(
                              (total, item) =>
                                total + getItemQuantity(item),
                              0
                            )}{" "}
                            item(s)
                          </td>

                          <td className="px-5 py-4 font-bold text-gray-900">
                            {formatPrice(getOrderTotal(order))}
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={status} />
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedOrder(order);
                                setUpdateError("");
                              }}
                              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                            >
                              <Eye size={16} />
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedOrder(null);
            }
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
                  Order Details
                </p>

                <h2 className="mt-1 break-all text-xl font-bold text-gray-900">
                  #{getOrderId(selectedOrder)}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(
                    selectedOrder.createdAt ||
                      selectedOrder.orderDate ||
                      selectedOrder.date
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close order details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <section>
                <h3 className="mb-3 font-semibold text-gray-900">
                  Customer Information
                </h3>

                <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <User
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-800">
                        {getCustomer(selectedOrder).name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {getCustomer(selectedOrder).phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="whitespace-pre-wrap break-words font-medium text-gray-800">
                        {getCustomer(selectedOrder).address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(
                          selectedOrder.createdAt ||
                            selectedOrder.orderDate ||
                            selectedOrder.date
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 font-semibold text-gray-900">
                  Products
                </h3>

                <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                  {getItems(selectedOrder).length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">
                      No product items were found in this order.
                    </p>
                  ) : (
                    getItems(selectedOrder).map((item, index) => (
                      <div
                        key={item._id || item.productId || index}
                        className="flex items-start justify-between gap-4 p-4"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800">
                            {getItemName(item)}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {getItemQuantity(item)}
                            {item?.size ? ` · Size: ${item.size}` : ""}
                            {item?.variant ? ` · ${item.variant}` : ""}
                          </p>
                        </div>

                        <p className="shrink-0 font-semibold text-gray-900">
                          {formatPrice(
                            Number(
                              item?.price ??
                                item?.unitPrice ??
                                item?.product?.price ??
                                0
                            ) * getItemQuantity(item)
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">
                    Order Status
                  </h3>

                  <StatusBadge status={getStatus(selectedOrder)} />
                </div>

                <label
                  htmlFor="order-status"
                  className="mt-3 block text-sm text-gray-600"
                >
                  Update status
                </label>

                <select
                  id="order-status"
                  value={getStatus(selectedOrder)}
                  disabled={updatingId === selectedOrder._id}
                  onChange={(event) =>
                    updateOrderStatus(
                      selectedOrder,
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400 disabled:opacity-60"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>

                {updatingId === selectedOrder._id && (
                  <p className="mt-2 text-sm text-gray-500">
                    Updating order status...
                  </p>
                )}

                <p className="mt-2 text-xs text-gray-400">
                  Status update requires a matching PATCH endpoint in
                  the backend.
                </p>
              </section>

              <section className="rounded-xl bg-gray-900 p-5 text-white">
                <p className="text-sm text-gray-300">Order Total</p>

                <p className="mt-1 text-3xl font-bold">
                  {formatPrice(getOrderTotal(selectedOrder))}
                </p>

                {selectedOrder?.note && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-400">
                      Customer Note
                    </p>

                    <p className="mt-1 whitespace-pre-wrap text-sm">
                      {selectedOrder.note}
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
