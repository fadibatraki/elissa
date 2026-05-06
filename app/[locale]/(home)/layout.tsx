import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import EmailFooter from "@/components/emailfooter";
import Testnew from "@/components/testnew3";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/scroll-to-top";

import CatalogCard from "@/components/catalog-card";

import TEST from "@/components/test";
import Hero from "@/components/hero";
import prisma from "@/lib/prisma";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getHeaderCategories } from "@/lib/header-data";

import { Inter } from "next/font/google";
import { unstable_cache } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nyxos",
};

// Cache عام للـ layout
export const revalidate = 300;



const getCatalogs = unstable_cache(
  async () =>
    prisma.catalog.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        url: true,
        createdAt: true,
      },
    }),
  ["layout-catalogs"],
  { revalidate: 300, tags: ["home-catalogs"] }
);


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ✅ أهم سطر لتجنب الـ no-store من next-intl قدر الإمكان
  setRequestLocale(locale);

  const [categories, catalogs] = await Promise.all([
    getHeaderCategories(),
    getCatalogs(),
  ]);



  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <div className="min-h-screen flex flex-col">
            <Header categories={categories} />
            <ScrollToTop />

            <WhatsAppFloat />

            <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              <div
                className="absolute inset-0 opacity-60 animate-liquid-shift pointer-events-none"
                style={{
                  background: `linear-gradient(-45deg,
                  #0a0a0a 0%,
                  rgba(234,30,35,0.12) 25%,
                  #050505 50%,
                  rgba(117,13,17,0.12) 75%,
                  #0a0a0a 100%)`,
                  backgroundSize: "350% 350%",
                }}
              />

              <div className="absolute -top-1/3 -left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-red-600/30 via-red-500/20 to-transparent rounded-full blur-3xl animate-float pointer-events-none" />
              <div className="absolute top-[40%] -right-1/4 w-[450px] h-[450px] bg-gradient-to-bl from-red-800/20 via-red-700/10 to-transparent rounded-full blur-3xl animate-float-slow pointer-events-none" />

              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.04) 26%, transparent 27%),
                  linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.04) 26%, transparent 27%)`,
                  backgroundSize: "60px 60px",
                }}
              />

              <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-red-400 rounded-full blur-sm animate-pulse" />
              <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-red-300 rounded-full blur-sm animate-pulse-slow" />

              <div className="relative z-20 flex flex-col">
                <Hero />

                <main className="flex-1 py-28 px-4 sm:px-8 md:px-16">
                  {children}
                </main>

                <CatalogCard catalogs={catalogs} />
                <TEST />


                <Footer />
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}