import { NextResponse } from "next/server";
import { products, categories } from "@/lib/seed-products";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  // Security: Require authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - Authentication required" },
      { status: 401 }
    );
  }

  // Security: Only allow in development mode or with explicit flag
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
    return NextResponse.json(
      { error: "Seeding is disabled in production" },
      { status: 403 }
    );
  }

  try {
    for await (const product of products) {
      await prisma.product.create({
        data: {
          name: product.name,
          name_zh: product.name_zh,
          description: product.description,
          specs_zh: [],
          images: {
            createMany: {
              data: product.images.map((im) => ({ url: im })),
            },
          },
          category: {
            connectOrCreate: {
              where: { name: product.category },
              create: {
                name: product.category,
                name_zh: categories.find((c) => c.name === product.category)
                  ?.name_zh,
                slug: product.category.toLowerCase().replaceAll(" ", "-"),
              },
            },
          },
        },
      });
    }
    return NextResponse.json({ message: "Products seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed products" },
      { status: 500 }
    );
  }
}
