// components/ProductCard.tsx
"use client"

import Image from "next/image"
import type { ProductListItemDTO } from "@/lib/dtos/product"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import "./product-card.css";
interface ProductCardProps {
  product: ProductListItemDTO
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale()
  const t = useTranslations("Product")

  const imageUrl = product.images?.[0]?.url || "/placeholder-image.jpg"

  return (


    <div className="relative group w-full min-w-0 transition-all duration-500 hover:scale-[1.05] animate-float-gentle">
      <div className="absolute -inset-2 rounded-[26px] bg-[radial-gradient(circle_at_18%_20%,rgba(245,130,32,0.18),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.12),transparent_34%)] opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />

      <Card className="classic-grain animate-fade-in-up relative w-full min-w-0 overflow-hidden rounded-2xl border border-white/8 bg-[rgba(17,17,17,0.88)] transition-all duration-500 group-hover:border-[#f58220]/38 group-hover:shadow-[0_28px_68px_rgba(0,0,0,0.46)]">
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,130,32,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          <div className="absolute inset-x-0 bottom-[72px] h-px bg-[linear-gradient(90deg,transparent,rgba(245,130,32,0.22),transparent)]" />
          <div className="absolute left-[14%] top-[22%] h-16 w-24 rounded-[22px] border border-[#f58220]/10 bg-[#f58220]/[0.03]" />
          <div className="absolute right-[10%] top-[58%] h-16 w-28 rounded-[22px] border border-[#3b82f6]/10 bg-[#3b82f6]/[0.03]" />
          <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full border border-[#f58220]/35 bg-[#f58220]/16 shadow-[0_0_16px_rgba(245,130,32,0.28)]" />
        </div>

        <div className="relative aspect-square overflow-hidden rounded-t-2xl border-b border-white/8 bg-[linear-gradient(145deg,#171717_0%,#0e0e0e_38%,#070707_100%)] transition-all duration-500 group-hover:border-[#f58220]/25">
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.28)_52%,transparent_75%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,130,32,0.45),transparent)]" />

          <Link href={`/products/${product.id}`}>
            <div className="relative z-10 h-full w-full transition-all duration-500 group-hover:scale-[1.04] group-hover:rotate-1">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={
                  locale === "zh" && product.name_zh
                    ? (product as any).name_zh
                    : product.name
                }
                fill
                className="object-contain transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-[0_0_28px_rgba(245,130,32,0.32)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>

          {product.featured && (
            <Badge className="absolute left-3 top-3 z-10 rounded-full border-0 bg-[#f58220] px-3 py-1 text-xs font-semibold text-[#0d0d0d] shadow-[0_8px_22px_rgba(245,130,32,0.4)] animate-pulse-slow">
              {t("featured")}
            </Badge>

          )}
        </div>
        <CardContent className="p-3 space-y-0">
          <div className="flex min-w-0 items-center gap-2 justify-between">
            <Link
              href={`/category/${product.category.id}`}
              className="min-w-0 flex-1 truncate text-right text-base font-bold leading-tight text-white transition-colors duration-300 hover:text-[#f58220]"
            >
              {locale === "zh" && product.name_zh ? product.name_zh : product.name}
            </Link>

            <span className="sr-only text-[#3b82f6]/50">•</span>

            <Link href={`/products/${product.id}`} className="min-w-0 flex-1">
              <h3 className="truncate text-right text-base font-bold leading-tight text-white/70 transition-colors duration-300 hover:text-[#3b82f6]">

                {locale === "zh" && product.category.name_zh ? product.category.name_zh : product.category.name}
              </h3>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}
