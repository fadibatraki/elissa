"use client";

import { useState, useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/navigation";
import { DownloadIcon } from "lucide-react";
type CatalogLite = {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
};

function resolveCatalogPdfUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }

  return `/api/files/${url}`;
}


const CatalogCard = ({ catalogs }: { catalogs: CatalogLite[] }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const [pdfUrls, setPdfUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let isCancelled = false;

    async function preparePdfUrls() {
      const entries: [string, string][] = [];

      for (const catalog of catalogs) {
        const url = (catalog as any).url as string | null;
        if (!url) continue;

        const apiUrl = resolveCatalogPdfUrl(url);
        entries.push([catalog.id, apiUrl]);
      }

      if (!isCancelled) {
        setPdfUrls(Object.fromEntries(entries));
      }
    }

    if (catalogs.length) {
      preparePdfUrls();
    }

    return () => {
      isCancelled = true;
      // اختياري: ممكن نعمل cleanup للـ blob URLs هنا لو بدك
    };
  }, [catalogs]);

  useEffect(() => {
    if (!swiperRef.current) return;
    new Swiper(swiperRef.current, {
      slidesPerView: 1, // كاتالوغ واحد
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes slide-in-center {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-slide-in-center {
          animation: slide-in-center 0.6s ease-out;
        }

        .classic-grain::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          mix-blend-mode: soft-light;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>

      <section
        id="catalogs"
        className="relative w-full -mt-px py-20 md:py-[120px] px-4 sm:px-8 md:px-16 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 18% 22%, rgba(245, 130, 32, 0.08) 0%, transparent 24%),
                radial-gradient(circle at 84% 18%, rgba(59, 130, 246, 0.09) 0%, transparent 24%),
                radial-gradient(circle at 72% 74%, rgba(16, 185, 129, 0.06) 0%, transparent 18%),
                linear-gradient(135deg, #020202 0%, #090909 32%, #101010 62%, #151515 100%)
              `,
            }}
          />

          <svg
            viewBox="0 0 1200 600"
            className="absolute inset-0 h-full w-full opacity-100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="catalog-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="catalog-hero-panel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.62" />
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.28" />
              </linearGradient>

              <linearGradient id="catalog-hero-panel-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#111827" stopOpacity="0.08" />
              </linearGradient>

              <linearGradient id="catalog-hero-trace-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f58220" stopOpacity="0" />
                <stop offset="35%" stopColor="#f58220" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="catalog-hero-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="catalog-hero-ring-orange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f58220" stopOpacity="0.26" />
                <stop offset="55%" stopColor="#f58220" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#f58220" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" fill="none">
              {Array.from({ length: 11 }).map((_, index) => {
                const y = 70 + index * 48;
                return <path key={`catalog-h-${index}`} d={`M0 ${y} H1200`} />;
              })}
              {Array.from({ length: 13 }).map((_, index) => {
                const x = 72 + index * 88;
                return <path key={`catalog-v-${index}`} d={`M${x} 0 V600`} />;
              })}
            </g>

            <g opacity="0.72">
              <rect x="658" y="108" width="380" height="320" rx="34" fill="url(#catalog-hero-panel-gradient)" stroke="rgba(255,255,255,0.05)" />
              <rect x="720" y="150" width="260" height="112" rx="22" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.045)" />
              <rect x="836" y="292" width="154" height="86" rx="20" fill="url(#catalog-hero-panel-blue)" stroke="rgba(59,130,246,0.18)" />
              <rect x="702" y="316" width="88" height="88" rx="18" fill="rgba(0,0,0,0.22)" stroke="rgba(245,130,32,0.14)" />
              <path d="M 704 178 H 760" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
              <path d="M 706 196 H 856" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 856 336 H 958" stroke="rgba(59,130,246,0.18)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 724 340 H 766" stroke="rgba(245,130,32,0.22)" strokeWidth="4" strokeLinecap="round" />
            </g>

            <g opacity="0.22" fill="none">
              <path d="M 682 176 C 746 168, 808 172, 850 204" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 8" />
              <path d="M 812 328 C 844 318, 874 318, 906 334" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 8" />
            </g>

            <g filter="url(#catalog-hero-glow)" opacity="0.5">
              <path d="M 524 204 C 618 204, 676 190, 726 178 C 770 168, 820 168, 866 188" fill="none" stroke="url(#catalog-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 612 286 C 704 286, 776 286, 840 286 C 896 286, 962 280, 1032 244" fill="none" stroke="url(#catalog-hero-trace-blue)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 558 420 C 644 398, 706 350, 746 312 C 804 258, 900 246, 980 290" fill="none" stroke="url(#catalog-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 712 144 V 118 M 776 144 V 118 M 840 144 V 118 M 904 144 V 118 M 968 144 V 118" fill="none" stroke="url(#catalog-hero-trace-blue)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" />
            </g>

            <g opacity="0.34">
              {[
                { x: 742, y: 192, color: "rgba(245,130,32,0.28)", size: 42 },
                { x: 1012, y: 246, color: "rgba(245,130,32,0.24)", size: 34 },
                { x: 904, y: 392, color: "rgba(245,130,32,0.22)", size: 38 },
              ].map((node, index) => (
                <g key={`catalog-node-${index}`} transform={`translate(${node.x} ${node.y})`}>
                  <circle r={node.size} fill="url(#catalog-hero-ring-orange)" />
                  <circle r={node.size * 0.62} fill="none" stroke={node.color} strokeWidth="1.25" strokeDasharray="10 8" />
                </g>
              ))}
            </g>

            <g filter="url(#catalog-hero-glow)">
              {[
                { x: 700, y: 154, color: "rgba(245,130,32,0.9)", radius: 7 },
                { x: 850, y: 214, color: "rgba(245,130,32,0.82)", radius: 6 },
                { x: 972, y: 286, color: "rgba(245,130,32,0.72)", radius: 7 },
                { x: 818, y: 404, color: "rgba(245,130,32,0.75)", radius: 6 },
                { x: 1068, y: 424, color: "rgba(245,130,32,0.7)", radius: 6 },
              ].map((node, index) => (
                <g key={`catalog-tech-${index}`} transform={`translate(${node.x} ${node.y})`} opacity="0.7">
                  <circle r={node.radius} fill="none" stroke={node.color} strokeWidth="1" />
                  <circle r={Math.max(3, node.radius / 2.6)} fill={node.color} />
                </g>
              ))}
            </g>

            {[
              { cx: 246, cy: 152 },
              { cx: 428, cy: 212 },
              { cx: 576, cy: 396 },
              { cx: 1116, cy: 188 },
            ].map((location, index) => (
              <g key={`catalog-pulse-${index}`}>
                <circle cx={location.cx} cy={location.cy} r="8" fill="none" stroke="#f58220" strokeWidth="1" opacity="0.24" />
                <circle cx={location.cx} cy={location.cy} r="4" fill="#f58220" filter="url(#catalog-hero-glow)" opacity="0.72" />
              </g>
            ))}
          </svg>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 28%, rgba(0, 0, 0, 0.46) 68%, rgba(0, 0, 0, 0.92) 100%)",
            }}
          />

          <div
            className="absolute inset-y-0 left-0 w-full lg:w-1/2"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.94) 0%, rgba(17, 17, 17, 0.82) 52%, rgba(17, 17, 17, 0.16) 100%)",
            }}
          />
        </div>

        {/* العنوان */}
        <div className="relative z-10 w-full flex flex-wrap justify-center">
          <div className="text-center mb-10 animate-slide-in-center max-w-3xl">
            <h1 className="hero-title">
              <span className="block !bg-gradient-to-r from-[#f58220] via-[#ffb86e] to-[#f58220] bg-clip-text text-transparent">
                Top Catalogs
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-6 animate-fade-in-up tracking-wide mx-auto">
              We combine innovative technology with user-friendly design, giving businesses the tools they need to track attendance accurately, reduce manual errors, and improve operational productivity.     </p>
            <div className="relative h-1 w-32 mx-auto overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f58220] to-transparent animate-[slide-infinite_2.4s_linear_infinite]" />
            </div>
          </div>
        </div>

        {/* السلايدر */}
        <div className="relative z-10 -mx-1 px-1 sm:-m-5 sm:px-0">
          <div
            ref={swiperRef}
            className="swiper testimonial-carousel common-carousel p-5"
          >
            <div className="swiper-wrapper">
              {catalogs.map((catalog, idx) => (
                <div key={idx} className="swiper-slide">
                  {/* الكرت في المنتصف */}
                  <div className="relative w-full max-w-[980px] mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-[#111111] via-[#050505] to-black border border-[#f58220]/40 shadow-[0_35px_90px_rgba(0,0,0,0.9)] classic-grain px-4 py-6 sm:px-7 sm:py-7 animate-slide-in-center">
                    {/* Badge الإسم */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f58220] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black shadow-[0_0_25px_rgba(245,130,32,0.55)] animate-pulse-slow">
                        {catalog.name}
                      </span>
                    </div>

                    {/* الكاتالوغ */}
                    <div className="mt-4 sm:mt-2 w-full h-[58vh] min-h-[420px] overflow-hidden rounded-2xl bg-black/20 lg:h-[52vh]">
                      <iframe
                        src={pdfUrls[catalog.id] ?? (catalog as any).url}
                        className="w-full h-full"
                        title={`Catalog Preview ${idx}`}
                      />
                    </div>




                    {/* زر التحميل الأحمر */}
                    <div className="mt-6 flex justify-end">
                      <a
                        href={resolveCatalogPdfUrl(catalog.url)}
                        download
                        className="catalog-download-btn inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-[1px]"
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار التنقل الحمراء */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <div className="swiper-button-prev cursor-pointer w-11 h-11 rounded-full bg-[#f58220] flex items-center justify-center shadow-[0_0_25px_rgba(245,130,32,0.65)] hover:bg-[#d9741b] transition-all duration-300">
                <svg
                  className="fill-current text-black"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.25 10.2437H4.57187L10.4156 4.29687C10.725 3.9875 10.725 3.50625 10.4156 3.19687C10.1062 2.8875 9.625 2.8875 9.31562 3.19687L2.2 10.4156C1.89062 10.725 1.89062 11.2063 2.2 11.5156L9.31562 18.7344C9.45312 18.8719 9.65937 18.975 9.86562 18.975C10.0719 18.975 10.2437 18.9062 10.4156 18.7687C10.725 18.4594 10.725 17.9781 10.4156 17.6688L4.60625 11.7906H19.25C19.6625 11.7906 20.0063 11.4469 20.0063 11.0344C20.0063 10.5875 19.6625 10.2437 19.25 10.2437Z" />
                </svg>
              </div>
              <div className="swiper-button-next cursor-pointer w-11 h-11 rounded-full bg-[#f58220] flex items-center justify-center shadow-[0_0_25px_rgba(245,130,32,0.65)] hover:bg-[#d9741b] transition-all duration-300">
                <svg
                  className="fill-current text-black"
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75C2.3375 10.2094 1.99375 10.5532 1.99375 10.9657C1.99375 11.3782 2.3375 11.7563 2.75 11.7563H17.4281L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9281 19.0094 12.1344 19.0094C12.3406 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogCard;
