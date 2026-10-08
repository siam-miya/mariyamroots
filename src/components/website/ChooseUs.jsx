import React from "react";
import { ShieldCheck, Sparkles, Droplet, Leaf } from "lucide-react";

const detailsList = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "100% Natural Ingredients",
    description: "Crafted with pure herbal extracts, natural oils, and essential nutrients with zero harmful chemicals or side effects.",
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    title: "Deep Root Nourishment",
    description: "Penetrates deep into the scalp to strengthen hair follicles from the roots, effectively preventing hair fall.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Fast Hair Growth & Shine",
    description: "Accelerates new hair growth, eliminates stubborn dandruff, and gives your hair a silky, glossy finish.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Dermatologically Tested",
    description: "Safe and suitable for all hair types—whether straight, curly, chemically treated, or dry and damaged hair.",
  },
];

const ChooseUs = () => {
  return (
    <section id="benefits" className="relative overflow-hidden bg-gray-50/50 py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.15em] text-secondary">
            Complete Care For Your Healthy Hair
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
            WHY CHOOSE 
            <span className="text-secondary"> OUR OIL</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
            Discover the secret behind thick, strong, and radiant hair with our scientifically-backed herbal formula.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {detailsList.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-md"
            >
              <div>
                {/* Icon Box */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <div className="text-secondary transition-colors duration-300 group-hover:text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-primary sm:text-lg">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative subtle accent */}
              <div className="mt-6 h-1 w-full bg-gray-100 overflow-hidden rounded-full">
                <div className="h-full w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;