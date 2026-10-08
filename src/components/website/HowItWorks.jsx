import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const HowItWorks = ({ title = "How It Works", description }) => {
  const defaultText = description || 
    "Our herbal hair oil is designed for effortless daily application. Simply take a few drops onto your palm, gently massage it directly into your scalp in circular motions for 5 to 10 minutes to stimulate blood circulation. Leave it overnight or for at least 2 hours before washing it off with a mild herbal shampoo. For the best and fastest results, use it consistently 3 times a week.";

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gray-50/50 py-6 sm:py-7">
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-8">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3 py-1 text-[10px] font-extrabold tracking-[0.15em] text-secondary uppercase">
            SIMPLE APPLICATION PROCESS
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            How It <span className="text-secondary">Works</span>
          </h2>
        </div>

        {/* Single Card Container (Only Text) */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-2 mb-4 text-secondary">
            <Sparkles size={20} />
            <h3 className="text-base sm:text-lg font-black tracking-tight text-primary">
              Easy Steps to Use & Results
            </h3>
          </div>

          {/* Admin Text Area */}
          <div className="prose prose-sm max-w-none">
            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 whitespace-pre-line">
              {defaultText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;