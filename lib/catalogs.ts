// lib/catalogs.ts
"use server";

import prisma from "./prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

function revalidateCatalogViews() {
  revalidateTag("home-catalogs", "max");
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`, "layout");
  }
}

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

export async function getCatalogs() {
  return await prisma.catalog.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCatalog(id: string) {
  return await prisma.catalog.findUnique({
    where: { id },
  });
}

interface CatalogData {
  name: string;
  url: string;
}

export async function createCatalog(data: CatalogData) {
  await requireAuth(); // Security: Require authentication

  const catalog = await prisma.catalog.create({
    data: {
      name: data.name,
      url: data.url,
    },
  });

  revalidatePath("/admin/catalogs");
  revalidateCatalogViews();
  return catalog;
}

export async function updateCatalog(id: string, data: CatalogData) {
  await requireAuth(); // Security: Require authentication

  const catalog = await prisma.catalog.update({
    where: { id },
    data: {
      name: data.name,
      url: data.url,
    },
  });

  revalidatePath("/admin/catalogs");
  revalidatePath(`/admin/catalogs/${id}`);
  revalidateCatalogViews();
  return catalog;
}

export async function deleteCatalog(id: string) {
  await requireAuth(); // Security: Require authentication

  await prisma.catalog.delete({
    where: { id },
  });

  revalidatePath("/admin/catalogs");
  revalidateCatalogViews();
  return true;
}
