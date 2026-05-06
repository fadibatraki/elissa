// lib/products.ts
"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import type { ProductListItemDTO } from "@/lib/dtos/product";

type SpecRow = { col1: string; col2: string };

// Helper function to check authentication for write operations
async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized - Authentication required");
  }

  return session;
}

function normalizeSpecs(input: unknown): SpecRow[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((r: any) => ({
      col1: typeof r?.col1 === "string" ? r.col1.trim() : "",
      col2: typeof r?.col2 === "string" ? r.col2.trim() : "",
    }))
    .filter((r) => r.col1 !== "" || r.col2 !== "");
}

/**
 * ✅ Products list (fast) with pagination + lightweight DTO
 */
export async function getProductsFiltered({
  page = 1,
  pageSize = 20,
  categoryIds = [],
  search = "",
}: {
  page?: number;
  pageSize?: number;
  categoryIds?: string[];
  search?: string;
}): Promise<{ data: ProductListItemDTO[]; count: number }> {
  const andConditions: any[] = [];

  if (search) {
    andConditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (categoryIds.length > 0) {
    andConditions.push({ categoryId: { in: categoryIds } });
  }

  const where = andConditions.length > 0 ? { AND: andConditions } : {};
  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.min(60, Math.max(1, Number(pageSize) || 20));
  const skip = (safePage - 1) * safePageSize;

  const [data, count] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: safePageSize,
      select: {
        id: true,
        name: true,
        name_zh: true,
        description: true,
        featured: true,
        slider: true,
        createdAt: true,
        updatedAt: true,
        categoryId: true,
        category: {
          select: { id: true, name: true, name_zh: true, slug: true },
        },
        images: {
          take: 1,
          select: { url: true, alt: true }, // ✅ never return Bytes
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { data, count };
}

/**
 * ✅ Products list (fast) without filters (lightweight DTO)
 */
export async function getProducts(): Promise<ProductListItemDTO[]> {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      name_zh: true,
      description: true,
      featured: true,
      slider: true,
      createdAt: true,
      updatedAt: true,
      categoryId: true,
      category: {
        select: { id: true, name: true, name_zh: true, slug: true },
      },
      images: {
        take: 1,
        select: { url: true, alt: true },
      },
    },
  });
}

/**
 * ✅ Single product (details)
 * (We keep it as select to avoid ProductImage.data Bytes)
 */
export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      name_zh: true,
      description: true,
      specs_zh: true,
      featured: true,
      slider: true,
      createdAt: true,
      updatedAt: true,
      categoryId: true,
      category: {
        select: { id: true, name: true, name_zh: true, slug: true },
      },
      images: {
        select: { id: true, url: true, alt: true, mimeType: true, productId: true }, // ✅ still no data
      },
    },
  });
}

interface ProductData {
  name: string;
  name_zh?: string | null;
  description: string | null;
  specs_zh?: unknown;
  featured: boolean;
  slider: boolean;
  categoryId: string;
  images: string[];
}

/**
 * ✅ Create Product (admin)
 */
export async function createProduct(data: ProductData) {
  await requireAuth();

  const specs = normalizeSpecs(data.specs_zh);

  const product = await prisma.product.create({
    data: {
      name: data.name,
      name_zh: data.name_zh ?? null,
      description: data.description ?? null,
      specs_zh: specs, // ✅ always array
      featured: data.featured,
      slider: data.slider,
      categoryId: data.categoryId,
      images: {
        createMany: {
          data: data.images.map((url) => ({ url })),
        },
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}

/**
 * ✅ Update Product (admin)
 */
export async function updateProduct(id: string, data: ProductData) {
  await requireAuth();

  const specs = normalizeSpecs(data.specs_zh);

  await prisma.productImage.deleteMany({
    where: { productId: id },
  });

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      name_zh: data.name_zh ?? null,
      description: data.description ?? null,
      specs_zh: specs,
      featured: data.featured,
      slider: data.slider,
      categoryId: data.categoryId,
      images: {
        createMany: {
          data: data.images.map((url) => ({ url })),
        },
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/products/${id}`);
  return product;
}

/**
 * ✅ Delete Product (admin)
 */
export async function deleteProduct(id: string) {
  await requireAuth();

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return true;
}

/**
 * ✅ Toggle Featured (admin)
 */
export async function toggleProductFeatured(id: string, featured: boolean) {
  await requireAuth();

  const product = await prisma.product.update({
    where: { id },
    data: { featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return product;
}