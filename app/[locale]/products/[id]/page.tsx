import { AddToCartButton } from "@/components/add-to-cart-button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Truck, Shield } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/product-image-gallery";
import prisma from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import RelatedProductsClient from "@/components/related-products-client";

export const revalidate = 300;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      name_zh: true,
      description: true,
      specs_zh: true,
      featured: true,
      slider: true,
      categoryId: true,
      category: { select: { id: true, name: true, name_zh: true, slug: true } },
      images: { select: { id: true, url: true, alt: true } }, // ✅ لا تجيب data
    },
  });

  const t = await getTranslations("ProductDetails");
  const locale = await getLocale();

  if (!product) {
    notFound();
  }
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 6, // ✅ مهم جدًا
    select: {
      id: true,
      name: true,
      name_zh: true,
      featured: true,
      slider: true,
      category: { select: { id: true, name: true, name_zh: true, slug: true } },
      images: { take: 1, select: { url: true, alt: true } },
    },
  });
  // Calculate a fake rating for display purposes
  const rating = (Math.floor(Math.random() * 10) + 40) / 10; // Random rating between 4.0 and 5.0
  const rawSpecs = product.specs_zh as unknown;

  const specsRows =
    Array.isArray(rawSpecs)
      ? rawSpecs
        .map((r: any) => ({
          col1: typeof r?.col1 === "string" ? r.col1.trim() : "",
          col2: typeof r?.col2 === "string" ? r.col2.trim() : "",
        }))
        .filter((r) => r.col1 || r.col2)
      : [];
  return (
    <main className="container mx-auto px-4 py-10 text-white">
      <div className="mb-6 text-white">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToProducts")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
        {/* Product images */}
        <div className="rounded-lg">
          <ProductImageGallery
            images={product.images.map((im) => im.url) || []}
            alt={
              locale === "zh" && product.name_zh
                ? product.name_zh
                : product.name
            }
          />
        </div>

        {/* Product info */}
        <div className="space-y-8 text-white">
          <div>
            <div className="flex items-center gap-2 mb-2 text-white">
              <Link href={`/categories/${product.category.id}`}>
                <Badge
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10 text-white"
                >
                  {locale === "zh" && product.category.name_zh
                    ? product.category.name_zh
                    : product.category.name}
                </Badge>
              </Link>
              {product.featured && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                  {t("featured")}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
              {locale === "zh" && product.name_zh
                ? product.name_zh
                : product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6 text-white">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {rating.toFixed(1)}
                </span>
              </div>
              <Separator orientation="vertical" className="h-5 text-white" />

            </div>
          </div>

          <div>


            <Separator className="my-6" />

            <div className="mb-8 prose prose-slate max-w-none text-white">
              <h3 className="text-lg font-medium mb-3">
                {t("aboutThisProduct")}
              </h3>
              <p className="text-muted-foreground">
                {product.description ?? ""}
              </p>
              {/* ✅ Specs Table (always under About this product) */}
              <div className="mt-4 not-prose">
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="p-3 text-left font-medium w-1/2"></th>
                        <th className="p-3 text-left font-medium w-1/2"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {specsRows.length === 0 ? (
                        <tr>
                          <td className="p-3 text-muted-foreground" colSpan={2}>
                            No specs yet.
                          </td>
                        </tr>
                      ) : (
                        specsRows.map((row, idx) => (
                          <tr key={idx} className="border-t border-white/10">
                            <td className="p-3 align-top">{row.col1}</td>
                            <td className="p-3 align-top">{row.col2}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>




        </div>
      </div>

      {relatedProducts.length > 0 && (
        <RelatedProductsClient items={relatedProducts} locale={locale} step={4} />
      )}

      {/* Additional sections like related products could go here */}
    </main>
  );
}
