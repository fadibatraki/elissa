import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";

// Cache للـ Home (featured products)
export const revalidate = 60; // 60s

const getFeaturedProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { featured: true },
      take: 12,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        name_zh: true,
        description: true,

        featured: true,
        slider: true,

        categoryId: true,     // ✅ أضفها
        createdAt: true,
        updatedAt: true,      // ✅ أضفها

        category: {
          select: {
            id: true,
            name: true,
            name_zh: true,
            slug: true,
          },
        },

        images: {
          take: 1,
          select: { id: true, url: true, alt: true }, // ✅ بدون data
        },
      },
    });
  },
  ["home-featured-products"],
  { revalidate: 60 }
);


export default async function Home() {
  const [products, t] = await Promise.all([
    getFeaturedProducts(),
    getTranslations("HomePage"),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section
        className="relative overflow-hidden rounded-[32px] border border-white/8 px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.38)] md:px-8 md:py-10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 24%, rgba(245, 130, 32, 0.1) 0%, transparent 24%),
                radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 22%),
                radial-gradient(circle at 80% 20%, rgba(245, 130, 32, 0.04) 0%, transparent 22%),
                linear-gradient(135deg, #030303 0%, #090909 34%, #111111 68%, #151515 100%)
              `,
            }}
          />

          <svg
            viewBox="0 0 1200 560"
            className="absolute inset-0 h-full w-full opacity-100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="home-featured-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="home-featured-panel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#171717" stopOpacity="0.68" />
                <stop offset="100%" stopColor="#090909" stopOpacity="0.2" />
              </linearGradient>

              <linearGradient id="home-featured-panel-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#111827" stopOpacity="0.08" />
              </linearGradient>

              <linearGradient id="home-featured-trace-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f58220" stopOpacity="0" />
                <stop offset="40%" stopColor="#f58220" stopOpacity="0.56" />
                <stop offset="100%" stopColor="#ff9a3d" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="home-featured-trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="home-featured-ring-orange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f58220" stopOpacity="0.22" />
                <stop offset="58%" stopColor="#f58220" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#f58220" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" fill="none">
              {Array.from({ length: 10 }).map((_, index) => {
                const y = 56 + index * 48;
                return <path key={`home-featured-h-${index}`} d={`M0 ${y} H1200`} />;
              })}
              {Array.from({ length: 14 }).map((_, index) => {
                const x = 48 + index * 84;
                return <path key={`home-featured-v-${index}`} d={`M${x} 0 V560`} />;
              })}
            </g>

            <g opacity="0.72">
              <rect x="130" y="88" width="390" height="272" rx="34" fill="url(#home-featured-panel-gradient)" stroke="rgba(255,255,255,0.05)" />
              <rect x="182" y="132" width="272" height="96" rx="22" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.045)" />
              <rect x="312" y="254" width="152" height="84" rx="20" fill="url(#home-featured-panel-blue)" stroke="rgba(59,130,246,0.18)" />
              <rect x="156" y="266" width="92" height="92" rx="18" fill="rgba(0,0,0,0.22)" stroke="rgba(245,130,32,0.14)" />
              <path d="M 170 162 H 234" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
              <path d="M 170 184 H 336" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 330 296 H 430" stroke="rgba(59,130,246,0.18)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 178 292 H 220" stroke="rgba(245,130,32,0.22)" strokeWidth="4" strokeLinecap="round" />
            </g>

            <g opacity="0.2" fill="none">
              <path d="M 152 158 C 230 146, 296 152, 354 188" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 8" />
              <path d="M 290 292 C 328 280, 364 282, 404 304" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 8" />
            </g>

            <g filter="url(#home-featured-glow)" opacity="0.5">
              <path d="M 112 200 C 192 200, 248 188, 294 176 C 340 164, 392 166, 446 194" fill="none" stroke="url(#home-featured-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 94 306 C 180 300, 264 292, 342 286 C 410 280, 492 276, 592 246" fill="none" stroke="url(#home-featured-trace-blue)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 132 404 C 236 378, 314 338, 364 300 C 430 250, 512 236, 626 270" fill="none" stroke="url(#home-featured-trace-orange)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 192 122 V 96 M 256 122 V 96 M 320 122 V 96 M 384 122 V 96 M 448 122 V 96" fill="none" stroke="url(#home-featured-trace-blue)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 12" />
            </g>

            <g opacity="0.32">
              {[
                { x: 230, y: 178, color: "rgba(245,130,32,0.26)", size: 42 },
                { x: 480, y: 248, color: "rgba(245,130,32,0.24)", size: 34 },
                { x: 356, y: 398, color: "rgba(245,130,32,0.2)", size: 38 },
              ].map((node, index) => (
                <g key={`home-featured-node-${index}`} transform={`translate(${node.x} ${node.y})`}>
                  <circle r={node.size} fill="url(#home-featured-ring-orange)" />
                  <circle r={node.size * 0.62} fill="none" stroke={node.color} strokeWidth="1.25" strokeDasharray="10 8" />
                </g>
              ))}
            </g>

            <g filter="url(#home-featured-glow)">
              {[
                { x: 170, y: 146, color: "rgba(245,130,32,0.9)", radius: 7 },
                { x: 336, y: 196, color: "rgba(245,130,32,0.8)", radius: 6 },
                { x: 520, y: 264, color: "rgba(245,130,32,0.74)", radius: 7 },
                { x: 286, y: 386, color: "rgba(245,130,32,0.72)", radius: 6 },
              ].map((node, index) => (
                <g key={`home-featured-tech-${index}`} transform={`translate(${node.x} ${node.y})`} opacity="0.7">
                  <circle r={node.radius} fill="none" stroke={node.color} strokeWidth="1" />
                  <circle r={Math.max(3, node.radius / 2.6)} fill={node.color} />
                </g>
              ))}
            </g>

            {[
              { cx: 138, cy: 224 },
              { cx: 260, cy: 110 },
              { cx: 430, cy: 168 },
              { cx: 602, cy: 328 },
            ].map((location, index) => (
              <g key={`home-featured-pulse-${index}`}>
                <circle cx={location.cx} cy={location.cy} r="8" fill="none" stroke="#f58220" strokeWidth="1" opacity="0.22" />
                <circle cx={location.cx} cy={location.cy} r="4" fill="#f58220" filter="url(#home-featured-glow)" opacity="0.7" />
              </g>
            ))}
          </svg>

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 24%, rgba(0, 0, 0, 0.44) 66%, rgba(0, 0, 0, 0.9) 100%)",
            }}
          />

          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[58%]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(17, 17, 17, 0.08) 24%, rgba(17, 17, 17, 0) 100%)",
            }}
          />

          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[52%]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.94) 0%, rgba(17, 17, 17, 0.74) 48%, rgba(17, 17, 17, 0.12) 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,130,32,0.5),transparent)]" />

        <div className="relative mb-8">
          <div className="mb-4 flex items-center justify-between gap-2 sm:gap-3">
            <div className="inline-flex items-center whitespace-nowrap rounded-full border border-[#f58220]/25 bg-[#f58220]/10 px-2.5 py-1 text-[11px] font-medium text-[#f58220] sm:px-4 sm:py-1.5 sm:text-sm">
              Enterprise Collection
            </div>

            <Button
              asChild
              variant="outline"
              className="h-10 shrink-0 rounded-full border-[#f58220]/60 bg-[#f58220] px-4 text-sm font-semibold text-[#0d2233] shadow-[0_0_24px_rgba(245,130,32,0.18)] transition-colors hover:bg-[#f7a53d] hover:text-[#0d2233] sm:h-11 sm:px-5 sm:text-base"
            >
              <Link className="text-sm font-semibold sm:text-base" href="/products">
                {t("viewAll")}
              </Link>
            </Button>
          </div>

          <h2 className="whitespace-nowrap text-[1.95rem] font-bold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">{t("featuredProducts")}</h2>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}