"use client";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import banner_1 from "../../assets/images/banner_1.png";
import banner_2 from "../../assets/images/banner_2.png";
import banner_3 from "../../assets/images/banner_3.png";

const slides = [
  {
    id: 1,
    eyebrow: "PREMIUM COLLECTION",
    title: "Elevate Your Everyday Style",
    description:
      "Discover our premium collection, crafted with quality, elegance, and attention to every detail.",
    buttonText: "Shop Now",
    buttonLink: "#products",
    image: banner_1.src,
  },
  {
    id: 2,
    eyebrow: "NEW ARRIVAL",
    title: "Quality You Can Feel",
    description:
      "Premium products designed to bring comfort, confidence, and a better experience to your everyday life.",
    buttonText: "Explore Products",
    buttonLink: "#products",
    image: banner_2.src,
  },
  {
    id: 3,
    eyebrow: "LIMITED OFFER",
    title: "Premium. Simple. Yours.",
    description:
      "Experience exceptional quality at a price you'll love. Order yours today.",
    buttonText: "Order Now",
    buttonLink: "#order",
    image: banner_3.src,
  },
];

export default function Banner() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        speed={900}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide relative overflow-hidden">
              {/* Background Image */}
              <div
                className="hero-background absolute inset-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:min-h-[720px] lg:px-10">
                <div className="max-w-xl">
                  {/* Eyebrow */}
                  <span className="mb-5 inline-flex rounded-full border border-secondary/30 bg-white/90 px-4 py-2 text-xs font-bold tracking-[0.2em] text-secondary backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>

                  {/* Title */}
                  <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-6 max-w-lg text-base leading-7 text-white/90 drop-shadow sm:text-lg">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-xl"
                    >
                      {slide.buttonText}
                    </a>

                    <a
                      href="#how-it-works"
                      className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-primary"
                    >
                      How It Works
                    </a>
                  </div>

                  {/* Trust */}
                  <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
                    <div>
                      <span className="block font-extrabold text-white">
                        100%
                      </span>
                      Quality
                    </div>

                    <div className="h-8 w-px bg-white/30" />

                    <div>
                      <span className="block font-extrabold text-white">
                        Fast
                      </span>
                      Delivery
                    </div>

                    <div className="h-8 w-px bg-white/30" />

                    <div>
                      <span className="block font-extrabold text-white">
                        Secure
                      </span>
                      Ordering
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Responsive Background */}
      <style jsx global>{`
        .hero-slide {
          min-height: 650px;
        }

        /* Desktop */
        .hero-background {
          background-size: cover;
          background-position: center;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-background {
            background-size: cover;
            background-position: center;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .hero-slide {
            min-height: 760px;
          }

          .hero-background {
            background-size: auto 100%;
            background-position: center top;
          }

          .hero-slide > div:nth-child(2) {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.18) 0%,
              rgba(0, 0, 0, 0.28) 45%,
              rgba(0, 0, 0, 0.55) 100%
            );
          }
        }

        /* Very small phones */
        @media (max-width: 390px) {
          .hero-slide {
            min-height: 720px;
          }

          .hero-background {
            background-size: auto 100%;
            background-position: center top;
          }
        }

        .hero-swiper .swiper-pagination {
          bottom: 28px;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #074506;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}