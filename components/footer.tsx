import { useTranslations } from "next-intl";
import "../app/tailwind.css";
export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer id="contact"
      className="relative w-full -mb-px  overflow-hidden">
      {/* Premium Map Section */}
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
          style={{ minWidth: "140%", transform: "scaleX(-1)", transformOrigin: "center" }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="footer-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="footer-hero-panel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.28" />
            </linearGradient>

            <linearGradient id="footer-hero-panel-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="footer-hero-trace-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f58220" stopOpacity="0" />
              <stop offset="35%" stopColor="#f58220" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="footer-hero-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="footer-hero-ring-orange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f58220" stopOpacity="0.26" />
              <stop offset="55%" stopColor="#f58220" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f58220" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" fill="none">
            {Array.from({ length: 11 }).map((_, index) => {
              const y = 70 + index * 48;
              return <path key={`footer-h-${index}`} d={`M0 ${y} H1200`} />;
            })}
            {Array.from({ length: 13 }).map((_, index) => {
              const x = 72 + index * 88;
              return <path key={`footer-v-${index}`} d={`M${x} 0 V600`} />;
            })}
          </g>

          <g opacity="0.72">
            <rect x="658" y="108" width="380" height="320" rx="34" fill="url(#footer-hero-panel-gradient)" stroke="rgba(255,255,255,0.05)" />
            <rect x="720" y="150" width="260" height="112" rx="22" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.045)" />
            <rect x="836" y="292" width="154" height="86" rx="20" fill="url(#footer-hero-panel-blue)" stroke="rgba(59,130,246,0.18)" />
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

          <g filter="url(#footer-hero-glow)" opacity="0.5">
            <path d="M 524 204 C 618 204, 676 190, 726 178 C 770 168, 820 168, 866 188" fill="none" stroke="url(#footer-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 612 286 C 704 286, 776 286, 840 286 C 896 286, 962 280, 1032 244" fill="none" stroke="url(#footer-hero-trace-blue)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 558 420 C 644 398, 706 350, 746 312 C 804 258, 900 246, 980 290" fill="none" stroke="url(#footer-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 712 144 V 118 M 776 144 V 118 M 840 144 V 118 M 904 144 V 118 M 968 144 V 118" fill="none" stroke="url(#footer-hero-trace-blue)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" />
          </g>

          <g opacity="0.34">
            {[
              { x: 742, y: 192, color: "rgba(245,130,32,0.28)", size: 42 },
              { x: 1012, y: 246, color: "rgba(245,130,32,0.24)", size: 34 },
              { x: 904, y: 392, color: "rgba(245,130,32,0.22)", size: 38 },
            ].map((node, index) => (
              <g key={`footer-node-${index}`} transform={`translate(${node.x} ${node.y})`}>
                <circle r={node.size} fill="url(#footer-hero-ring-orange)" />
                <circle r={node.size * 0.62} fill="none" stroke={node.color} strokeWidth="1.25" strokeDasharray="10 8" />
              </g>
            ))}
          </g>

          <g filter="url(#footer-hero-glow)">
            {[
              { x: 700, y: 154, color: "rgba(245,130,32,0.9)", radius: 7 },
              { x: 850, y: 214, color: "rgba(245,130,32,0.82)", radius: 6 },
              { x: 972, y: 286, color: "rgba(245,130,32,0.72)", radius: 7 },
              { x: 818, y: 404, color: "rgba(245,130,32,0.75)", radius: 6 },
              { x: 1068, y: 424, color: "rgba(245,130,32,0.7)", radius: 6 },
            ].map((node, index) => (
              <g key={`footer-tech-${index}`} transform={`translate(${node.x} ${node.y})`} opacity="0.7">
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
            <g key={`footer-pulse-${index}`}>
              <circle cx={location.cx} cy={location.cy} r="8" fill="none" stroke="#f58220" strokeWidth="1" opacity="0.22" />
              <circle cx={location.cx} cy={location.cy} r="4" fill="#f58220" filter="url(#footer-hero-glow)" opacity="0.7" />
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
      <div className="relative z-10 container mx-auto px-4 pt-10">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="w-full">
            <div className="h-full w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                About-Us
              </h4>
              <p className="mb-8 max-w-[390px] text-base text-white">
                At Nyxos, we focus on providing reliable security and workforce technology for modern organizations. Our product range includes face recognition terminals, fingerprint attendance devices, RFID and password-based access systems, as well as smart indoor intercom and monitoring panels for connected spaces.     </p>
              
            </div>
          </div>
          <div className="w-full">
            <div className="h-full w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                {t("info")}
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:008675525894470"
                  className="group flex items-center gap-[22px] mb-2"
                >
                  <span className="max-w-[280px] text-base text-white group-hover:text-white">
                   Landline phone: 0086-755-25894470
                  </span>
                </a>



                <a
                  href="mailto:info@nyxos.com"
                  className="group flex items-center gap-[22px] mb-2"
                >
                  <span className="max-w-[280px] text-base text-white group-hover:text-white">
                    Email: info@nyxos.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-2">
            <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="border-b border-white/10 px-4 py-3">
                <h4 className="text-lg font-semibold text-[#fff]">Address : 
                 RM309 , BLOCK 4 , NANWAN LIANTANG INDURTRIAL ,  KANGZHENG RD , LONGGANG DISTRICT , SHENZHEN , CHINA</h4>
              </div>

              <div className="h-[180px] sm:h-[220px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14733.391163238215!2d114.1249650704143!3d22.60348423432143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404755553cf7a91%3A0x451336895bb7b998!2sNanwan%20Residential%20District%2C%20Longgang%2C%20Shenzhen%2C%20Guangdong%20Province%2C%20China%2C%20518114!5e0!3m2!1sen!2sde!4v1776151192177!5m2!1sen!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale brightness-90 contrast-110"
                />
              </div>

              <div className="flex flex-wrap gap-3 border-t border-white/10 bg-black/45 p-4">
                <a
                  href="https://www.google.com/maps?q=Nanwan+Residential+District+Longgang+Shenzhen+Guangdong+Province+China"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#f58220] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ff9a45]"
                >
                  Get Directions
                </a>

              
              </div>
            </div>
          </div>



        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div className="-mx-3 flex items-center justify-center md:justify-start">
                  <a
                    href="/"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    {t("links.home")}
                  </a>
                  <a
                    href="/about"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    {t("links.about")}
                  </a>
                  <a
                    href="/products"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    {t("links.products")}
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-base text-gray-7">
                  Designed and Developed by -
                  <a
                    href="https://t.me/Fadibatraki"
                    rel="nofollow noopner"
                    target="_blank"
                    className="text-gray-1 hover:underline"
                  >
                    {" "}
                    F
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="absolute left-0 top-0 z-[-1]">
          {/* <img src="/images/footer/shape-1.svg" alt="" /> */}
        </span>

        <span className="absolute bottom-0 right-0 z-[-1]">
          {/* <img src="/images/footer/shape-3.svg" alt="" /> */}
        </span>

        <span className="absolute right-0 top-0 z-[-1]">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8667 33.1956C2.89765 33.1956 3.7334 34.0318 3.7334 35.0633C3.7334 36.0947 2.89765 36.9309 1.8667 36.9309C0.835744 36.9309 4.50645e-08 36.0947 0 35.0633C-4.50645e-08 34.0318 0.835744 33.1956 1.8667 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 33.1956C19.3249 33.1956 20.1606 34.0318 20.1606 35.0633C20.1606 36.0947 19.3249 36.9309 18.2939 36.9309C17.263 36.9309 16.4272 36.0947 16.4272 35.0633C16.4272 34.0318 17.263 33.1956 18.2939 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 33.195C35.7519 33.195 36.5876 34.0311 36.5876 35.0626C36.5876 36.0941 35.7519 36.9303 34.7209 36.9303C33.69 36.9303 32.8542 36.0941 32.8542 35.0626C32.8542 34.0311 33.69 33.195 34.7209 33.195Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 33.195C51.965 33.195 52.8008 34.0311 52.8008 35.0626C52.8008 36.0941 51.965 36.9303 50.9341 36.9303C49.9031 36.9303 49.0674 36.0941 49.0674 35.0626C49.0674 34.0311 49.9031 33.195 50.9341 33.195Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 16.7605C2.89765 16.7605 3.7334 17.5966 3.7334 18.6281C3.7334 19.6596 2.89765 20.4957 1.8667 20.4957C0.835744 20.4957 4.50645e-08 19.6596 0 18.6281C-4.50645e-08 17.5966 0.835744 16.7605 1.8667 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 16.7605C19.3249 16.7605 20.1606 17.5966 20.1606 18.6281C20.1606 19.6596 19.3249 20.4957 18.2939 20.4957C17.263 20.4957 16.4272 19.6596 16.4272 18.6281C16.4272 17.5966 17.263 16.7605 18.2939 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 16.7605C35.7519 16.7605 36.5876 17.5966 36.5876 18.6281C36.5876 19.6596 35.7519 20.4957 34.7209 20.4957C33.69 20.4957 32.8542 19.6596 32.8542 18.6281C32.8542 17.5966 33.69 16.7605 34.7209 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 16.7605C51.965 16.7605 52.8008 17.5966 52.8008 18.6281C52.8008 19.6596 51.965 20.4957 50.9341 20.4957C49.9031 20.4957 49.0674 19.6596 49.0674 18.6281C49.0674 17.5966 49.9031 16.7605 50.9341 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 0.324951C2.89765 0.324951 3.7334 1.16115 3.7334 2.19261C3.7334 3.22408 2.89765 4.06024 1.8667 4.06024C0.835744 4.06024 4.50645e-08 3.22408 0 2.19261C-4.50645e-08 1.16115 0.835744 0.324951 1.8667 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 0.324951C19.3249 0.324951 20.1606 1.16115 20.1606 2.19261C20.1606 3.22408 19.3249 4.06024 18.2939 4.06024C17.263 4.06024 16.4272 3.22408 16.4272 2.19261C16.4272 1.16115 17.263 0.324951 18.2939 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 0.325302C35.7519 0.325302 36.5876 1.16147 36.5876 2.19293C36.5876 3.2244 35.7519 4.06056 34.7209 4.06056C33.69 4.06056 32.8542 3.2244 32.8542 2.19293C32.8542 1.16147 33.69 0.325302 34.7209 0.325302Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 0.325302C51.965 0.325302 52.8008 1.16147 52.8008 2.19293C52.8008 3.2244 51.965 4.06056 50.9341 4.06056C49.9031 4.06056 49.0674 3.2244 49.0674 2.19293C49.0674 1.16147 49.9031 0.325302 50.9341 0.325302Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 33.1956C67.9346 33.1956 68.7704 34.0318 68.7704 35.0633C68.7704 36.0947 67.9346 36.9309 66.9037 36.9309C65.8727 36.9309 65.037 36.0947 65.037 35.0633C65.037 34.0318 65.8727 33.1956 66.9037 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 33.1956C84.3616 33.1956 85.1974 34.0318 85.1974 35.0633C85.1974 36.0947 84.3616 36.9309 83.3307 36.9309C82.2997 36.9309 81.464 36.0947 81.464 35.0633C81.464 34.0318 82.2997 33.1956 83.3307 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 33.1956C100.789 33.1956 101.624 34.0318 101.624 35.0633C101.624 36.0947 100.789 36.9309 99.7576 36.9309C98.7266 36.9309 97.8909 36.0947 97.8909 35.0633C97.8909 34.0318 98.7266 33.1956 99.7576 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 16.7605C67.9346 16.7605 68.7704 17.5966 68.7704 18.6281C68.7704 19.6596 67.9346 20.4957 66.9037 20.4957C65.8727 20.4957 65.037 19.6596 65.037 18.6281C65.037 17.5966 65.8727 16.7605 66.9037 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 16.7605C84.3616 16.7605 85.1974 17.5966 85.1974 18.6281C85.1974 19.6596 84.3616 20.4957 83.3307 20.4957C82.2997 20.4957 81.464 19.6596 81.464 18.6281C81.464 17.5966 82.2997 16.7605 83.3307 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 16.7605C100.789 16.7605 101.624 17.5966 101.624 18.6281C101.624 19.6596 100.789 20.4957 99.7576 20.4957C98.7266 20.4957 97.8909 19.6596 97.8909 18.6281C97.8909 17.5966 98.7266 16.7605 99.7576 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 0.324966C67.9346 0.324966 68.7704 1.16115 68.7704 2.19261C68.7704 3.22408 67.9346 4.06024 66.9037 4.06024C65.8727 4.06024 65.037 3.22408 65.037 2.19261C65.037 1.16115 65.8727 0.324966 66.9037 0.324966Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 0.324951C84.3616 0.324951 85.1974 1.16115 85.1974 2.19261C85.1974 3.22408 84.3616 4.06024 83.3307 4.06024C82.2997 4.06024 81.464 3.22408 81.464 2.19261C81.464 1.16115 82.2997 0.324951 83.3307 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 0.324951C100.789 0.324951 101.624 1.16115 101.624 2.19261C101.624 3.22408 100.789 4.06024 99.7576 4.06024C98.7266 4.06024 97.8909 3.22408 97.8909 2.19261C97.8909 1.16115 98.7266 0.324951 99.7576 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 82.2029C2.89765 82.2029 3.7334 83.039 3.7334 84.0705C3.7334 85.102 2.89765 85.9382 1.8667 85.9382C0.835744 85.9382 4.50645e-08 85.102 0 84.0705C-4.50645e-08 83.039 0.835744 82.2029 1.8667 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 82.2029C19.3249 82.2029 20.1606 83.039 20.1606 84.0705C20.1606 85.102 19.3249 85.9382 18.2939 85.9382C17.263 85.9382 16.4272 85.102 16.4272 84.0705C16.4272 83.039 17.263 82.2029 18.2939 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 82.2026C35.7519 82.2026 36.5876 83.0387 36.5876 84.0702C36.5876 85.1017 35.7519 85.9378 34.7209 85.9378C33.69 85.9378 32.8542 85.1017 32.8542 84.0702C32.8542 83.0387 33.69 82.2026 34.7209 82.2026Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 82.2026C51.965 82.2026 52.8008 83.0387 52.8008 84.0702C52.8008 85.1017 51.965 85.9378 50.9341 85.9378C49.9031 85.9378 49.0674 85.1017 49.0674 84.0702C49.0674 83.0387 49.9031 82.2026 50.9341 82.2026Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 65.7677C2.89765 65.7677 3.7334 66.6039 3.7334 67.6353C3.7334 68.6668 2.89765 69.503 1.8667 69.503C0.835744 69.503 4.50645e-08 68.6668 0 67.6353C-4.50645e-08 66.6039 0.835744 65.7677 1.8667 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 65.7677C19.3249 65.7677 20.1606 66.6039 20.1606 67.6353C20.1606 68.6668 19.3249 69.503 18.2939 69.503C17.263 69.503 16.4272 68.6668 16.4272 67.6353C16.4272 66.6039 17.263 65.7677 18.2939 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 65.7674C35.7519 65.7674 36.5876 66.6036 36.5876 67.635C36.5876 68.6665 35.7519 69.5027 34.7209 69.5027C33.69 69.5027 32.8542 68.6665 32.8542 67.635C32.8542 66.6036 33.69 65.7674 34.7209 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 65.7674C51.965 65.7674 52.8008 66.6036 52.8008 67.635C52.8008 68.6665 51.965 69.5027 50.9341 69.5027C49.9031 69.5027 49.0674 68.6665 49.0674 67.635C49.0674 66.6036 49.9031 65.7674 50.9341 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 98.2644C2.89765 98.2644 3.7334 99.1005 3.7334 100.132C3.7334 101.163 2.89765 102 1.8667 102C0.835744 102 4.50645e-08 101.163 0 100.132C-4.50645e-08 99.1005 0.835744 98.2644 1.8667 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 49.3322C2.89765 49.3322 3.7334 50.1684 3.7334 51.1998C3.7334 52.2313 2.89765 53.0675 1.8667 53.0675C0.835744 53.0675 4.50645e-08 52.2313 0 51.1998C-4.50645e-08 50.1684 0.835744 49.3322 1.8667 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 98.2644C19.3249 98.2644 20.1606 99.1005 20.1606 100.132C20.1606 101.163 19.3249 102 18.2939 102C17.263 102 16.4272 101.163 16.4272 100.132C16.4272 99.1005 17.263 98.2644 18.2939 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 49.3322C19.3249 49.3322 20.1606 50.1684 20.1606 51.1998C20.1606 52.2313 19.3249 53.0675 18.2939 53.0675C17.263 53.0675 16.4272 52.2313 16.4272 51.1998C16.4272 50.1684 17.263 49.3322 18.2939 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 98.2647C35.7519 98.2647 36.5876 99.1008 36.5876 100.132C36.5876 101.164 35.7519 102 34.7209 102C33.69 102 32.8542 101.164 32.8542 100.132C32.8542 99.1008 33.69 98.2647 34.7209 98.2647Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 98.2647C51.965 98.2647 52.8008 99.1008 52.8008 100.132C52.8008 101.164 51.965 102 50.9341 102C49.9031 102 49.0674 101.164 49.0674 100.132C49.0674 99.1008 49.9031 98.2647 50.9341 98.2647Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 49.3326C35.7519 49.3326 36.5876 50.1687 36.5876 51.2002C36.5876 52.2317 35.7519 53.0678 34.7209 53.0678C33.69 53.0678 32.8542 52.2317 32.8542 51.2002C32.8542 50.1687 33.69 49.3326 34.7209 49.3326Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 49.3326C51.965 49.3326 52.8008 50.1687 52.8008 51.2002C52.8008 52.2317 51.965 53.0678 50.9341 53.0678C49.9031 53.0678 49.0674 52.2317 49.0674 51.2002C49.0674 50.1687 49.9031 49.3326 50.9341 49.3326Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 82.2029C67.9346 82.2029 68.7704 83.0391 68.7704 84.0705C68.7704 85.102 67.9346 85.9382 66.9037 85.9382C65.8727 85.9382 65.037 85.102 65.037 84.0705C65.037 83.0391 65.8727 82.2029 66.9037 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 82.2029C84.3616 82.2029 85.1974 83.0391 85.1974 84.0705C85.1974 85.102 84.3616 85.9382 83.3307 85.9382C82.2997 85.9382 81.464 85.102 81.464 84.0705C81.464 83.0391 82.2997 82.2029 83.3307 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 82.2029C100.789 82.2029 101.624 83.039 101.624 84.0705C101.624 85.102 100.789 85.9382 99.7576 85.9382C98.7266 85.9382 97.8909 85.102 97.8909 84.0705C97.8909 83.039 98.7266 82.2029 99.7576 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 65.7674C67.9346 65.7674 68.7704 66.6036 68.7704 67.635C68.7704 68.6665 67.9346 69.5027 66.9037 69.5027C65.8727 69.5027 65.037 68.6665 65.037 67.635C65.037 66.6036 65.8727 65.7674 66.9037 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 65.7677C84.3616 65.7677 85.1974 66.6039 85.1974 67.6353C85.1974 68.6668 84.3616 69.503 83.3307 69.503C82.2997 69.503 81.464 68.6668 81.464 67.6353C81.464 66.6039 82.2997 65.7677 83.3307 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 65.7677C100.789 65.7677 101.624 66.6039 101.624 67.6353C101.624 68.6668 100.789 69.503 99.7576 69.503C98.7266 69.503 97.8909 68.6668 97.8909 67.6353C97.8909 66.6039 98.7266 65.7677 99.7576 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 98.2644C67.9346 98.2644 68.7704 99.1005 68.7704 100.132C68.7704 101.163 67.9346 102 66.9037 102C65.8727 102 65.037 101.163 65.037 100.132C65.037 99.1005 65.8727 98.2644 66.9037 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 49.3322C67.9346 49.3322 68.7704 50.1684 68.7704 51.1998C68.7704 52.2313 67.9346 53.0675 66.9037 53.0675C65.8727 53.0675 65.037 52.2313 65.037 51.1998C65.037 50.1684 65.8727 49.3322 66.9037 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 98.2644C84.3616 98.2644 85.1974 99.1005 85.1974 100.132C85.1974 101.163 84.3616 102 83.3307 102C82.2997 102 81.464 101.163 81.464 100.132C81.464 99.1005 82.2997 98.2644 83.3307 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 49.3322C84.3616 49.3322 85.1974 50.1684 85.1974 51.1998C85.1974 52.2313 84.3616 53.0675 83.3307 53.0675C82.2997 53.0675 81.464 52.2313 81.464 51.1998C81.464 50.1684 82.2997 49.3322 83.3307 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 98.2644C100.789 98.2644 101.624 99.1005 101.624 100.132C101.624 101.163 100.789 102 99.7576 102C98.7266 102 97.8909 101.163 97.8909 100.132C97.8909 99.1005 98.7266 98.2644 99.7576 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 49.3322C100.789 49.3322 101.624 50.1684 101.624 51.1998C101.624 52.2313 100.789 53.0675 99.7576 53.0675C98.7266 53.0675 97.8909 52.2313 97.8909 51.1998C97.8909 50.1684 98.7266 49.3322 99.7576 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
          </svg>
        </span>
      </div>
    </footer>
  );
}
