import React from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const ProductDetails = () => {
  return (
    <section
      id="product-details"
      className="relative overflow-hidden bg-white py-6 sm:py-8"
    >
      {/* ব্যাকগ্রাউন্ড ডিজাইন */}
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* পণ্যের বিস্তারিত */}
        <div className="overflow-hidden border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
          <div>
            <div className="border-b border-gray-100 pb-5">
              <span className="mb-2 inline-block rounded-md bg-secondary/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-secondary">
                ১০০% ভেষজ উপাদানে তৈরি
              </span>

              <h3 className="text-lg font-extrabold leading-snug text-primary sm:text-xl lg:text-2xl">
                আমাদের হারবাল হেয়ার অয়েল কেন বিশেষ?
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                প্রাচীন ভেষজ উপাদানের ধারণা এবং আধুনিক মান বজায় রাখার
                প্রচেষ্টায় তৈরি আমাদের এই হেয়ার অয়েল চুল ও মাথার
                ত্বকের যত্নে সহায়তা করে। নিয়মিত ব্যবহারে চুলের
                পরিচর্যা, খুশকি এবং চুল পাতলা হওয়ার সমস্যা মোকাবিলায়
                সহায়ক হতে পারে।
              </p>
            </div>

            {/* প্রধান বৈশিষ্ট্যসমূহ */}
            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-secondary"
                  />
                  <h4 className="text-xs font-bold text-primary">
                    চুলের গোড়ার যত্ন
                  </h4>
                </div>

                <p className="pl-6 text-[11px] text-gray-500">
                  চুলের গোড়া ও মাথার ত্বকের পরিচর্যায় সহায়তা করে।
                </p>
              </div>

              <div className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-secondary"
                  />
                  <h4 className="text-xs font-bold text-primary">
                    উপাদান সম্পর্কে সচেতনতা
                  </h4>
                </div>

                <p className="pl-6 text-[11px] text-gray-500">
                  ব্যবহারের আগে পণ্যের উপাদান তালিকা দেখে নিন।
                </p>
              </div>

              <div className="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-3.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-secondary"
                  />
                  <h4 className="text-xs font-bold text-primary">
                    নিয়মিত চুলের পরিচর্যা
                  </h4>
                </div>

                <p className="pl-6 text-[11px] text-gray-500">
                  নিয়মিত চুলের যত্নের রুটিনে ব্যবহার করতে পারেন।
                </p>
              </div>
            </div>
          </div>

          {/* নিচের তথ্য */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1.5 text-primary">
              <ShieldCheck size={16} className="text-secondary" />
              গুণমান যাচাইয়ের তথ্য দেখুন
            </span>

            <span className="flex items-center gap-1.5 text-primary">
              <Sparkles size={16} className="text-secondary" />
              উপাদানের বিশুদ্ধতা যাচাই করুন
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
