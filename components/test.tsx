"use client";

import { ChevronRight, Flame } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    id: "01",
    title: "Biometric Attendance Solutions",
    desc: "Nyxos delivers professional attendance terminals with face recognition, fingerprint verification, RFID card support, and password access to help businesses record time accurately and manage daily attendance with confidence.",
  },
  {
    id: "02",
    title: "Access Control & Entry Security",
    desc: "Our systems are designed to secure entrances, regulate employee access, and improve workplace control across offices, buildings, commercial sites, and multi-point facilities.",
  },
  {
    id: "03",
    title: "Smart Intercom & Indoor Monitoring",
    desc: "Nyxos also provides modern indoor panels and intercom devices that support calling, monitoring, touchscreen control, and connected building communication for smarter front-desk and entry workflows.",
  },
  {
    id: "04",
    title: "Reliable Hardware for Daily Use",
    desc: "Built for real operating environments, our devices combine stable performance, practical installation, and modern design to support businesses that need dependable technology every day.",
  },
];

const stats = [
  { value: "Face + Fingerprint", label: "Biometric Verification" },
  { value: "RFID + PIN", label: "Flexible Attendance Methods" },
  { value: "PoE / WiFi / TCP", label: "Connected Deployment" },
  { value: "Intercom Panels", label: "Smart Entry Communication" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-14 sm:px-8 md:px-16 md:py-16"
    >
      {/* Background */}
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
            <filter id="about-hero-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="about-hero-panel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.28" />
            </linearGradient>

            <linearGradient id="about-hero-panel-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="about-hero-trace-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f58220" stopOpacity="0" />
              <stop offset="35%" stopColor="#f58220" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="about-hero-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="about-hero-ring-orange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f58220" stopOpacity="0.26" />
              <stop offset="55%" stopColor="#f58220" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f58220" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" fill="none">
            {Array.from({ length: 11 }).map((_, index) => {
              const y = 70 + index * 48;
              return <path key={`about-h-${index}`} d={`M0 ${y} H1200`} />;
            })}
            {Array.from({ length: 13 }).map((_, index) => {
              const x = 72 + index * 88;
              return <path key={`about-v-${index}`} d={`M${x} 0 V600`} />;
            })}
          </g>

          <g opacity="0.72">
            <rect x="658" y="108" width="380" height="320" rx="34" fill="url(#about-hero-panel-gradient)" stroke="rgba(255,255,255,0.05)" />
            <rect x="720" y="150" width="260" height="112" rx="22" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.045)" />
            <rect x="836" y="292" width="154" height="86" rx="20" fill="url(#about-hero-panel-blue)" stroke="rgba(59,130,246,0.18)" />
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

          <g filter="url(#about-hero-glow)" opacity="0.5">
            <path d="M 524 204 C 618 204, 676 190, 726 178 C 770 168, 820 168, 866 188" fill="none" stroke="url(#about-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 612 286 C 704 286, 776 286, 840 286 C 896 286, 962 280, 1032 244" fill="none" stroke="url(#about-hero-trace-blue)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 558 420 C 644 398, 706 350, 746 312 C 804 258, 900 246, 980 290" fill="none" stroke="url(#about-hero-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 712 144 V 118 M 776 144 V 118 M 840 144 V 118 M 904 144 V 118 M 968 144 V 118" fill="none" stroke="url(#about-hero-trace-blue)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" />
          </g>

          <g opacity="0.34">
            {[
              { x: 742, y: 192, color: "rgba(245,130,32,0.28)", size: 42 },
              { x: 1012, y: 246, color: "rgba(245,130,32,0.24)", size: 34 },
              { x: 904, y: 392, color: "rgba(245,130,32,0.22)", size: 38 },
            ].map((node, index) => (
              <g key={`about-node-${index}`} transform={`translate(${node.x} ${node.y})`}>
                <circle r={node.size} fill="url(#about-hero-ring-orange)" />
                <circle r={node.size * 0.62} fill="none" stroke={node.color} strokeWidth="1.25" strokeDasharray="10 8" />
              </g>
            ))}
          </g>

          <g filter="url(#about-hero-glow)">
            {[
              { x: 700, y: 154, color: "rgba(245,130,32,0.9)", radius: 7 },
              { x: 850, y: 214, color: "rgba(245,130,32,0.82)", radius: 6 },
              { x: 972, y: 286, color: "rgba(245,130,32,0.72)", radius: 7 },
              { x: 818, y: 404, color: "rgba(245,130,32,0.75)", radius: 6 },
              { x: 1068, y: 424, color: "rgba(245,130,32,0.7)", radius: 6 },
            ].map((node, index) => (
              <g key={`about-tech-${index}`} transform={`translate(${node.x} ${node.y})`} opacity="0.7">
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
            <g key={`about-pulse-${index}`}>
              <circle cx={location.cx} cy={location.cy} r="8" fill="none" stroke="#f58220" strokeWidth="1" opacity="0.24" />
              <circle cx={location.cx} cy={location.cy} r="4" fill="#f58220" filter="url(#about-hero-glow)" opacity="0.72" />
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center">
        {/* Intro */}
        <div className="mb-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mt-4 mb-4 inline-flex items-center gap-2 rounded-full border border-[#f58220]/30 bg-[#121212]/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f7a14e] shadow-[0_0_24px_rgba(245,130,32,0.08)]">
              <Flame className="h-3.5 w-3.5 text-[#f58220]" />
              Nyxos • Smart Workforce & Entry Systems
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-[2.85rem]">
              Professional technology for
              <span className="block !bg-gradient-to-r from-[#f58220] via-[#ffb86e] to-[#f58220] bg-clip-text text-transparent">
                attendance, access, and connected entry
              </span>
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white md:text-base">
              Nyxos helps businesses modernize workforce management through
              biometric attendance systems, secure access control devices, and
              smart indoor communication panels designed for practical daily
              operation.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f7a14e]">
              About Nyxos
            </p>
            <p className="mt-3 text-sm leading-7 text-white md:text-base">
              At Nyxos, we focus on providing reliable security and workforce
              technology for modern organizations. Our product range includes
              face recognition terminals, fingerprint attendance devices, RFID
              and password-based access systems, as well as smart indoor
              intercom and monitoring panels for connected spaces.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {pillars.map((item, index) => {
            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[30px] border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#f58220]/30 hover:shadow-[0_22px_60px_rgba(245,130,32,0.10)] md:p-6"
                style={{
                  animation: `feature-rise 0.65s ease-out ${0.12 + index * 0.09}s both`,
                }}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#f58220]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f58220]/30 to-transparent" />

                <div className="relative">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f58220]/30 bg-[#f58220]/12 text-sm font-bold text-[#f7a14e]">
                      {item.id}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#f58220]/30 via-[#f58220]/20 to-transparent" />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-sm text-[1.7rem] font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                    <div className="hidden rounded-full border border-[#f58220]/20 bg-[#f58220]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f58220] sm:block">
                      Active
                    </div>
                  </div>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white md:text-[15px]">
                    {item.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-4 rounded-[24px] border border-[#f58220]/15 bg-black/30 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f58220]/25 bg-[#f58220]/10">
                      <div className="h-4 w-4 rounded-full bg-[#f58220] shadow-[0_0_20px_rgba(245,130,32,0.55)] animate-[pulse-node_2.8s_ease-in-out_infinite]" />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f7a14e]">
                        System Layer {item.id}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white">
                        Deployment-ready solutions built for secure, visible,
                        and efficient daily operations.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-6 rounded-[32px] border border-white/8 bg-gradient-to-r from-white/[0.04] to-white/[0.02] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f7a14e]">
                Why businesses choose Nyxos
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white md:text-base">
                We combine biometric verification, access control, smart entry
                communication, and dependable hardware into one professional
                product ecosystem. Nyxos is built for companies that value
                security, clarity, and efficient operational control.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f58220] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#ff9a45]"
              >
                Explore Products
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#f58220]/35 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#f58220] hover:bg-[#f58220]/10"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#f58220]/15 bg-black/30 p-4 transition-transform duration-300 hover:-translate-y-1"
                style={{ animation: `feature-rise 0.55s ease-out ${0.48 + index * 0.06}s both` }}
              >
                <p className="text-lg font-bold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes feature-rise {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse-node {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(245, 130, 32, 0.45);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 30px rgba(245, 130, 32, 0.7);
          }
        }
      `}</style>
    </section>
  );
}