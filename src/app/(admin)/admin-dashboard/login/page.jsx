
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LoaderCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            data.error ||
            "Login failed. Please check your credentials."
        );
      }

      // Backend must set the authentication cookie.
      router.replace("/admin-dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err.message ||
          "Unable to login. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f5] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 lg:grid-cols-2">
        {/* Branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-emerald-800 p-10 text-white lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-800">
              <Leaf size={27} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold">
                Mariyam Roots
              </h1>
              <p className="mt-1 text-xs tracking-widest text-emerald-100">
                NATURAL CARE
              </p>
            </div>
          </div>

          <div className="relative py-12">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-emerald-200">
              Admin Workspace
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight">
              Manage your store.
              <br />
              Grow with confidence.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100">
              Manage orders, products and your store operations
              from one secure dashboard.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Store administration portal
            </div>
          </div>

          <p className="relative text-xs text-emerald-200">
            © {new Date().getFullYear()} Mariyam Roots
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-white">
                <Leaf size={24} />
              </div>

              <div>
                <h1 className="font-extrabold text-gray-900">
                  Mariyam Roots
                </h1>
                <p className="text-xs text-gray-500">
                  Admin Portal
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-emerald-700">
                WELCOME BACK
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Admin Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in with your administrator credentials to
                manage your store.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
                <p className="break-words">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter admin email"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-gray-100 pt-5">
              <p className="text-center text-xs leading-5 text-gray-400">
                Authorized administrators only.
                <br />
                Keep your login credentials secure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
