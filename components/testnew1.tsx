"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <div className="hero-carousel-wrapper relative pt-8">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="hero-carousel [&_.swiper-pagination]:bottom-4 [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-[#ec1d23] [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[420px] py-10 sm:py-14 lg:py-20 pl-4 sm:pl-8 lg:pl-12">
              <div className="inline-flex items-center gap-3 mb-6 rounded-full border border-[#ec1d23]/40 bg-[#ec1d23]/10 px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fca5a5]">
                  Limited Offer
                </span>
                <span className="text-sm font-semibold text-white">
                  -30%
                </span>
              </div>

              <h1 className="font-semibold text-white text-2xl sm:text-3xl lg:text-[32px] leading-snug mb-4">
                <a href="#" className="hover:text-[#ec1d23] transition-colors">
                  Fast Charging Micro USB Cable
                </a>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                High-quality Micro-USB Charging Cable designed for stable power delivery. Strong, flexible, and ideal for older Android devices, power banks, and accessories.
              </p>

              <div className="mt-7 flex items-center gap-4">
                <a
                  href="#"
                  className="inline-flex font-medium text-sm sm:text-base text-white rounded-full bg-[#ec1d23] py-3 px-8 lg:px-10 shadow-[0_12px_30px_rgba(236,29,35,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(236,29,35,0.7)]"
                >
                  Shop Now
                </a>

                <span className="text-xs sm:text-sm text-slate-400">
                  Starting from{" "}
                  <span className="font-semibold text-white">$2</span>
                </span>
              </div>
            </div>

            <div className="relative flex-1 flex justify-center items-center pr-4 sm:pr-8 lg:pr-10 pb-4 sm:pb-0">
              <div className="absolute  h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-[#ec1d23]/25 blur-3xl" />
              <Image
                src="/assets/img/hero/2.png"
                alt="Headphone"
                width={120}
                height={100}
                className="relative z-[1] drop-shadow-[0_22px_60px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[420px] py-10 sm:py-14 lg:py-20 pl-4 sm:pl-8 lg:pl-12">
              <div className="inline-flex items-center gap-3 mb-6 rounded-full border border-[#ec1d23]/40 bg-[#ec1d23]/10 px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#fca5a5]">
                  Limited Offer
                </span>
                <span className="text-sm font-semibold text-white">
                  -30%
                </span>
              </div>

              <h1 className="font-semibold text-white text-2xl sm:text-3xl lg:text-[32px] leading-snug mb-4">
                <a href="#" className="hover:text-[#ec1d23] transition-colors">
                  Fast Charging Type-c USB Cable
                </a>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                Premium USB-C Fast Charging Cable featuring reinforced braided design for extra durability. Delivers stable, high-speed power for Android devices, tablets, and modern gadgets.
              </p>

              <div className="mt-7 flex items-center gap-4">
                <a
                  href="#"
                  className="inline-flex font-medium text-sm sm:text-base text-white rounded-full bg-[#ec1d23] py-3 px-8 lg:px-10 shadow-[0_12px_30px_rgba(236,29,35,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(236,29,35,0.7)]"
                >
                  Shop Now
                </a>

                <span className="text-xs sm:text-sm text-slate-400">
                  Starting from{" "}
                  <span className="font-semibold text-white">$2</span>
                </span>
              </div>
            </div>

            <div className="relative flex-1 flex justify-center items-center pr-4 sm:pr-8 lg:pr-10 pb-4 sm:pb-0">
              <div className="absolute  h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-[#ec1d23]/25 blur-3xl" />
              <Image
                src="/assets/img/hero/1.png"
                alt="Headphone"
                width={120}
                height={100}
                className="relative z-[1] drop-shadow-[0_22px_60px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroCarousal;
