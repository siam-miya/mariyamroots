import React from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const ProductDetails = () => {
  return (
    <section id="product-details" className="relative overflow-hidden bg-white py-6 sm:py-8">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Single Detail Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
          <div>
            <div className="border-b border-gray-100 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-md inline-block mb-2">
                100% Herbal Formula
              </span>
              <h3 className="text-lg font-extrabold text-primary sm:text-xl lg:text-2xl leading-snug">
                Why Our Herbal Hair Oil Stands Out?
              </h3>
              
              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Our formula is carefully crafted using ancient herbal recipes combined with modern quality standards. It penetrates deep into the hair follicles, repairs damaged roots from the very first application, and ensures complete protection against severe hair fall, dandruff, and thinning.
              </p>
            </div>

            {/* Key Points list */}
            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-secondary" />
                  <h4 className="text-xs font-bold text-primary">Deep Scalp Penetration</h4>
                </div>
                <p className="text-[11px] text-gray-500 pl-6">Nourishes roots actively to stimulate faster hair regrowth.</p>
              </div>

              <div className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-secondary" />
                  <h4 className="text-xs font-bold text-primary">Chemical-Free & Safe</h4>
                </div>
                <p className="text-[11px] text-gray-500 pl-6">Zero artificial fragrances, parabens, or side effects.</p>
              </div>

              <div className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-secondary" />
                  <h4 className="text-xs font-bold text-primary">Guaranteed Results</h4>
                </div>
                <p className="text-[11px] text-gray-500 pl-6">Noticeable reduction in hair fall within just 2 weeks.</p>
              </div>
            </div>
          </div>

          {/* Bottom Guarantee Note */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1.5 text-primary">
              <ShieldCheck size={16} className="text-secondary" />
              Dermatologically Tested Formula
            </span>
            <span className="flex items-center gap-1.5 text-primary">
              <Sparkles size={16} className="text-secondary" />
              100% Organic & Pure
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDetails;