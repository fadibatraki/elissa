import { getProductsFiltered } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { Suspense } from "react";
import { getCategories } from "@/lib/categories";
import { ItemPagination } from "@/components/item-pagination";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Products | Nyxos",
  description: "Browse our collection of products",
};

// ✅ كاش للفئات
const getCategoriesCached = unstable_cache(
  async () => getCategories(),
  ["products-categories"],
  { revalidate: 600 }
);

// ✅ كاش لأسماء المنتجات للفلتر (وخفّف العدد!)
const getProductNamesCached = unstable_cache(
  async () => {
    const rows = await prisma.product.findMany({
      select: { name: true },
      orderBy: { createdAt: "desc" },
      take: 100, // عدّلها 200-500 حسب حجم الداتا
    });
    return rows.map((p) => p.name);
  },
  ["products-names"],
  { revalidate: 3600 }
);

// ✅ كاش لنتيجة المنتجات حسب الفلاتر + الصفحة
async function getProductsFilteredCached(args: {
  page: number;
  pageSize: number;
  categoryIds: string[];
  search: string;
}) {
  const key = ["products-filtered", JSON.stringify(args)];

  const cachedFn = unstable_cache(
    async () => getProductsFiltered(args),
    key,
    { revalidate: 60 }
  );

  return cachedFn();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: any;
    pageSize?: any;
    category?: string;
    search?: string;
  }>;
}) {
  const sp = await searchParams;

  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const pageSize = Math.min(60, Math.max(6, Number(sp.pageSize ?? 20) || 20));

  const category = typeof sp.category === "string" ? sp.category : "";
  const search = typeof sp.search === "string" ? sp.search.trim() : "";

  const categoryIds = category ? category.split(",").filter(Boolean) : [];

  const [t, categories, productsNames, { data, count }] = await Promise.all([
    getTranslations("ProductsPage"),
    getCategoriesCached(),
    getProductNamesCached(),
    getProductsFilteredCached({ page, pageSize, categoryIds, search }),
  ]);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">{t("allProducts")}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 ">
          <ProductFilter
            categories={categories}
            allProductNames={productsNames}
            initialCategoryIds={categoryIds}
          />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<div>{t("loadingProducts")}</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <ItemPagination baseUrl="/products" page={page} pagesCount={totalPages} />
        </div>
      )}
    </div>
  );
}