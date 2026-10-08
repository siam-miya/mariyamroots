"use client"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "এই হেয়ার অয়েল ব্যবহারে কি চুল পড়া স্থায়ীভাবে বন্ধ হয়?",
    answer: "হ্যাঁ, আমাদের এই ভেষজ তেলটি চুলের গোড়ায় গভীরভাবে পুষ্টি জুগিয়ে চুল পড়া দ্রুত কমিয়ে আনে এবং নতুন চুল গজাতে সাহায্য করে।"
  },
  {
    question: "এই তেল কি সব ধরনের চুলে ব্যবহার করা যাবে?",
    answer: "অবশ্যই! এটি ১০০% প্রাকৃতিক উপাদান দিয়ে তৈরি হওয়ায় যেকোনো ধরনের চুল (যেমন- শুষ্ক, রুক্ষ, বা কেমিক্যালি ট্রিটেড চুল) এবং সব বয়সি মানুষের জন্য সম্পূর্ণ নিরাপদ।"
  },
  {
    question: "সপ্তাহে কত দিন এই তেল ব্যবহার করতে হবে?",
    answer: "সবচেয়ে ভালো ফলাফলের জন্য সপ্তাহে অন্তত ৩ দিন চুলে ও স্ক্যাল্পে ভালোভাবে ম্যাসাজ করে ব্যবহার করতে পারেন। চাইলে সারারাত রেখে পরের দিন শ্যাম্পু করে ফেলতে পারেন।"
  },
  {
    question: "এতে কি কোনো ক্ষতিকর কেমিক্যাল বা সাইড ইফেক্ট আছে?",
    answer: "না, এতে কোনো ধরণের কৃত্রিম সুগন্ধি, প্যারাবেন বা ক্ষতিকর কেমিক্যাল নেই। এটি সম্পূর্ণ পার্শ্বপ্রতিক্রিয়াহীন ও ভেষজ উপাদানে তৈরি।"
  },
  {
    question: "অর্ডার করার কতদিনের মধ্যে ডেলিভারি পাবো?",
    answer: "ঢাকার ভেতরে সাধারণত ২ থেকে ৩ দিন এবং ঢাকার বাইরে ৩ থেকে ৫ দিনের মধ্যে ক্যাশ অন ডেলিভারিতে আপনার হাতে পণ্য পৌঁছে যাবে।"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); 

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-12 sm:py-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3 py-1 text-[10px] font-extrabold tracking-[0.15em] text-secondary uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            আপনার মনে থাকা বিভিন্ন প্রশ্নের উত্তর জেনে নিন।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-4 text-left font-bold text-primary transition-colors hover:text-secondary sm:p-5 text-xs sm:text-sm"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-secondary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3 sm:px-5 sm:py-4">
                    <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;