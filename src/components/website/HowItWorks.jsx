import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const HowItWorks = ({ title = "যেভাবে ব্যবহার করবেন", description }) => {
  const defaultText =
    description ||
    "আমাদের হারবাল হেয়ার অয়েল সহজেই প্রতিদিনের চুলের যত্নে ব্যবহার করতে পারবেন। প্রথমে হাতের তালুতে কয়েক ফোঁটা তেল নিন। এরপর আঙুলের সাহায্যে মাথার ত্বকে ৫ থেকে ১০ মিনিট আলতোভাবে বৃত্তাকার গতিতে মালিশ করুন। তেলের নির্দেশনা অনুযায়ী কিছুক্ষণ রেখে মৃদু শ্যাম্পু দিয়ে ধুয়ে ফেলুন। সপ্তাহে কতবার ব্যবহার করবেন, তা পণ্যের নির্দেশনা অনুযায়ী নির্ধারণ করুন। নিয়মিত ব্যবহারের পাশাপাশি চুলের যত্নে ধারাবাহিকতা বজায় রাখুন।";

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gray-50/50 py-6 sm:py-7"
    >
      {/* ব্যাকগ্রাউন্ড ডিজাইন */}
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* সেকশনের শিরোনাম */}
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3 py-1 text-[10px] font-extrabold tracking-wide text-secondary">
            সহজ ব্যবহারের পদ্ধতি
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            যেভাবে <span className="text-secondary">ব্যবহার করবেন</span>
          </h2>
        </div>

        {/* ব্যবহারের নির্দেশনা */}
        <div className="overflow-hidden border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-10">
          <div className="mb-4 flex items-center gap-2 text-secondary">
            <Sparkles size={20} />

            <h3 className="text-base font-black tracking-tight text-primary sm:text-lg">
              ব্যবহারের সহজ নিয়ম
            </h3>
          </div>

          {/* বিবরণ */}
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-xs leading-relaxed text-gray-600 sm:text-sm">
              {defaultText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
