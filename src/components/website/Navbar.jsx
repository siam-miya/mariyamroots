"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mainlogo from "../../assets/images/mainLogo.png"

const navLinks = [
  { name: "Products", href: "#products" },
  { name: "Benefits", href: "#benefits" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-extrabold tracking-tight text-primary"
        >
         <Image src={mainlogo} height={100} width={160} alt="logo"/>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Call Button */}
        <div className="hidden lg:block">
          <a
            href="tel:+8801700000000"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-gray-100 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}

            <a
              href="tel:+8801700000000"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              <Phone size={17} />
              Call Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
