import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const limit = Math.min(Number(searchParams.get("limit") || 10), 20);

  if (!q) return NextResponse.json([]);

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { name_zh: { contains: q, mode: "insensitive" } },
      ],
    },
    take: limit,
    select: { id: true, name: true, name_zh: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
