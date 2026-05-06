import React from "react";
import HeroCarousel from "./testnew1";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-14 lg:pt-24 lg:pb-16">
      <div className="relative z-[1] max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          {/* LEFT – SLIDER */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-[1] overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
              <HeroCarousel />
            </div>
          </div>

          {/* RIGHT – OFFER CARDS */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">

              {/* CARD 1 */}
              <div className="relative w-full rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 sm:p-7.5 shadow-lg">
                <div className="flex items-center gap-6">

                  <div>
                    <span className="inline-flex items-center rounded-full border border-[#ec1d23]/40 bg-[#ec1d23]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ec1d23] mb-4">
                      Hot Deal
                    </span>

                    <h2 className="max-w-[200px] font-semibold text-white text-lg sm:text-xl mb-6 leading-snug">
                      <a href="#" className="hover:text-[#ec1d23] transition-colors">
                       Premium Lightning Cable
                      </a>
                    </h2>

                    <div>
                      <p className="font-medium text-xs sm:text-sm text-white/60 mb-1.5">
                        Limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-semibold text-2xl text-[#ec1d23]">
                          $5
                        </span>
                        <span className="font-medium text-lg text-white/40 line-through">
                          $7
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Image
                      src="/assets/img/hero/3.png"
                      alt="iPhone"
                      width={60}
                      height={110}
                      className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="relative w-full rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 sm:p-7.5 shadow-lg">
                <div className="flex items-center gap-6">

                  <div>
                    <span className="inline-flex items-center rounded-full border border-[#ec1d23]/40 bg-[#ec1d23]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ec1d23] mb-4">
                      Best Seller
                    </span>

                    <h2 className="max-w-[200px] font-semibold text-white text-lg sm:text-xl mb-6 leading-snug">
                      <a href="#" className="hover:text-[#ec1d23] transition-colors">
                       Grey Premium Lightning Cable
                      </a>
                    </h2>

                    <div>
                      <p className="font-medium text-xs sm:text-sm text-white/60 mb-1.5">
                        Limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-semibold text-2xl text-[#ec1d23]">
                          $6
                        </span>
                        <span className="font-medium text-lg text-white/40 line-through">
                          $8
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Image
                      src="/assets/img/hero/4.png"
                      alt="iPhone"
                      width={60}
                      height={110}
                      className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
