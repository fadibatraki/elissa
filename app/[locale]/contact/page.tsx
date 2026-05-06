import type React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutUs1 from "@/components/test";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import CatalogCard from "@/components/catalog-card";

import CTA from "@/components/cta";
import TEST from "@/components/test";
import prisma from "@/lib/prisma";
import { getHeaderCategories } from "@/lib/header-data";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nyxos",
  description: "Pioneering Air Conditioning & Refrigeration Solutions",
};



export default async function RootLayout({

  params,
}: {

  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getHeaderCategories();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
            <Header categories={categories} />


            <WhatsAppFloat />
            <div className="relative mt-15 flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
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





                <Footer />
              </div>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
