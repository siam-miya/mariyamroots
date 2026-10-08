"use client"
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper CSS (যদি ইমপোর্ট করা না থাকে)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ডেমো রিভিউ ইমেজ (অ্যাডমিন প্যানেল থেকে ডাটা আসলে এখানে ডাইনামিক অ্যারে পাস করবেন)
const defaultReviews = [
  { id: 1, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80", alt: "Customer Review 1" },
  { id: 2, image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80", alt: "Customer Review 2" },
  { id: 3, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80", alt: "Customer Review 3" },
  { id: 4, image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80", alt: "Customer Review 4" },
];

const Testimonials = ({ reviews = defaultReviews }) => {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-gray-50/50 py-12 sm:py-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12">
          <span className="inline-flex rounded-md border border-secondary/20 bg-secondary/5 px-3 py-1 text-[10px] font-extrabold tracking-[0.15em] text-secondary uppercase">
            HAPPY CUSTOMERS
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            What Our Customers <span className="text-secondary">Say</span>
          </h2>
          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Real feedback and review screenshots from our valued customers.
          </p>
        </div>

        {/* Review Image Slider */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-10"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={review.image}
                      alt={review.alt || "Customer Review"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;