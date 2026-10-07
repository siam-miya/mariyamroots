"use client";

import React from "react";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "../../assets/images/mainLogo.png"

const Footer = () => {
  return (
    <footer className="bg-[#052f04] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight"
            >
             <Image src={mainLogo} height={100} width={160} alt="logo"/>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Premium products crafted with quality, care, and attention to
              every detail. Experience the difference today.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-extrabold text-white/70 transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-extrabold text-white/70 transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-extrabold text-white/70 transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
              >
                YT
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#products"
                  className="text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="#benefits"
                  className="text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  Benefits
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#testimonials"
                  className="text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="text-sm text-white/60 transition-colors hover:text-secondary"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em]">
              Support
            </h3>

            <ul className="mt-6 space-y-5">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-secondary"
                />

                <div>
                  <p className="text-xs text-white/40">Call Us</p>

                  <a
                    href="tel:+8801700000000"
                    className="mt-1 block text-sm text-white/70 transition-colors hover:text-secondary"
                  >
                    +880 1700-000000
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-secondary"
                />

                <div>
                  <p className="text-xs text-white/40">Email</p>

                  <a
                    href="mailto:hello@example.com"
                    className="mt-1 block text-sm text-white/70 transition-colors hover:text-secondary"
                  >
                    hello@example.com
                  </a>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-secondary"
                />

                <div>
                  <p className="text-xs text-white/40">Location</p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em]">
              Ready to Order?
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Get your favorite product delivered directly to your doorstep.
            </p>

            <a
              href="#order"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary"
            >
              Order Now

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-secondary"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-secondary"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;