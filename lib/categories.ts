// lib/categories.ts
"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategory(id: string) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

interface CategoryData {
  name: string;
  name_zh?: string;
  slug: string;
  description?: string;
}

export async function createCategory(data: CategoryData) {
  await requireAuth(); // Security: Require authentication
  
  const category = await prisma.category.create({
    data: {
      name: data.name,
      name_zh: data.name_zh,
      slug: data.slug,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products"); // Also revalidate products in case they display categories
  return category;
}

export async function updateCategory(id: string, data: CategoryData) {
  await requireAuth(); // Security: Require authentication
  
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      name_zh: data.name_zh,
      slug: data.slug,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products"); // Also revalidate products in case they display categories
  revalidatePath(`/admin/categories/${id}`);
  return category;
}

export async function deleteCategory(id: string) {
  await requireAuth(); // Security: Require authentication
  
  // Check if any products are using this category
  const productsCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productsCount > 0) {
    throw new Error(
      `Cannot delete category with ${productsCount} associated products`,
    );
  }

  // Delete the category if no products are using it
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products"); // Also revalidate products in case they display categories
  return true;
}
