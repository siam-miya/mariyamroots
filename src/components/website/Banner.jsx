"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import banner_1 from "../../assets/images/banner_1.png";
import banner_2 from "../../assets/images/banner_2.png";
import banner_3 from "../../assets/images/banner_3.png";

const slides = [
  {
    id: 1,
    image: banner_1,
    title: "Elevate Your Everyday Style",
    description:
      "Discover our premium collection, crafted with quality and attention to detail.",
  },
  {
    id: 2,
    image: banner_2,
    title: "Quality You Can Feel",
    description:
      "Premium products designed for comfort, confidence, and everyday life.",
  },
  {
    id: 3,
    image: banner_3,
    title: "Premium. Simple. Yours.",
    description:
      "Experience exceptional quality at a price you will love.",
  },
];

export default function Banner() {
  return (
    <section id="hero" className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="
                relative
                flex
                min-h-[600px]
                items-center
                bg-cover
                bg-center
                bg-no-repeat
                sm:min-h-[620px]
                md:min-h-[650px]
                lg:min-h-[700px]
              "
              style={{
                backgroundImage: `url(${slide.image.src})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-xl">
                  <p className="text-xs font-bold tracking-[0.2em] text-secondary">
                    PREMIUM COLLECTION
                  </p>

                  <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-sm leading-6 text-white/90 sm:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-7">
                    <a
                      href="#products"
                      className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-secondary"
                    >
                     অর্ডার করুন
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}