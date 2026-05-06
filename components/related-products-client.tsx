"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Item = {
  id: string;
  name: string;
  name_zh: string | null;
  featured?: boolean;
  images?: Array<{ url: string }>;
};

export default function RelatedProductsClient({
  items,
  locale,
  step = 8,
}: {
  items: Item[];
  locale: string;
  step?: number;
}) {
  const [limit, setLimit] = useState(step);

  const visible = useMemo(() => items.slice(0, limit), [items, limit]);
  const hasMore = limit < items.length;

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Related products</h2>
          <p className="mt-1 text-sm text-white/70">
            Showing {Math.min(limit, items.length)} of {items.length}
          </p>
        </div>

        {hasMore && (
          <Button
            onClick={() => setLimit((v) => v + step)}
            className="border border-[#f58220]/40 bg-[#f58220] text-white shadow-[0_12px_35px_rgba(245,130,32,0.28)] hover:bg-[#ff9a41]"
          >
            Load more
          </Button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => {
          const title =
            locale === "zh" && p.name_zh ? p.name_zh : p.name;

          const img = p.images?.[0]?.url;

          return (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[#f58220]/45 hover:bg-[#f58220]/[0.08]"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                {img ? (
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/40">
                    No image
                  </div>
                )}

                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#f58220] px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(245,130,32,0.35)]">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="line-clamp-1 text-sm font-semibold text-white">
                  {title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setLimit((v) => v + step)}
            className="border border-[#f58220]/40 bg-[#f58220] text-white shadow-[0_12px_35px_rgba(245,130,32,0.28)] hover:bg-[#ff9a41]"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
