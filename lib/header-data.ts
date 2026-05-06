import { cache } from "react";
import prisma from "@/lib/prisma";

export const getHeaderCategories = cache(async () => {
    return prisma.category.findMany({
        select: { id: true, name: true, name_zh: true, slug: true },
        orderBy: { name: "asc" },
    });
});

export const getHeaderData = cache(async () => {
    // ✅ خفّف البيانات لأقل شيء
    const products = await prisma.product.findMany({
        select: { id: true, name: true, name_zh: true },
        // إذا عندك آلاف منتجات، حط limit مؤقتًا أو اعمل بحث بدل كل الأسماء
        take: 50,
        orderBy: { createdAt: "desc" },
    });

    const categories = await getHeaderCategories();

    return { products, categories };
});