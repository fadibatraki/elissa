"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/stores/cart-store";
import { Input } from "./ui/input";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function ProductsMenu({
  label,
  categories,
  locale,
}: {
  label: string;
  categories: { id: string; name: string; name_zh: string | null }[];
  locale: string;
}) {
  return (
    <div className="relative group">
      <Link
        href="/products"
        className="flex items-center gap-1 text-[16px] font-semibold capitalize tracking-[0.01em] !text-white/90 transition-all duration-200 hover:!text-[#f58220]"   >
        {label}
        <ChevronDown className="h-4 w-4 !text-white/70 opacity-100 transition-all duration-200 group-hover:rotate-180 group-hover:!text-[#f58220]" />    </Link>

      <div
        className="
          absolute left-0 top-full z-[60] w-72 pt-4
          invisible opacity-0 translate-y-2 pointer-events-none
          transition-all duration-200 ease-out
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        "
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="max-h-72 overflow-y-auto overscroll-contain py-2">
            <Link
              href="/products"
              className="block px-4 py-3 text-sm font-medium !text-white transition-colors hover:!bg-white/5 hover:!text-[#f58220]"      >
              All products
            </Link>

            <div className="mx-3 my-2 h-px bg-white/10" />

            {categories.map((c) => {
              const text = locale === "zh" && c.name_zh ? c.name_zh : c.name;
              return (
                <Link
                  key={c.id}
                  href={`/category/${c.id}`}
                  className="block px-4 py-3 text-sm !text-white/80 transition-colors hover:!bg-white/5 hover:!text-white"
                >
                  {text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type SearchItem = { id: string; name: string; name_zh: string | null };

export default function Header({
  categories,
}: {
  categories: { id: string; name: string; name_zh: string | null }[];
}) {
  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname();
  useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    const q = search.trim();
    if (!q) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search-products?q=${encodeURIComponent(q)}&limit=10`, {
          signal: controller.signal,
        });
        const data = (await res.json()) as SearchItem[];
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      }
    }, 250);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [search]);

  const navItems: Array<{ name: string; href: string; isProducts?: boolean }> = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products", isProducts: true },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 relative w-full !border-b !border-[#f58220]/15 !bg-black/80 backdrop-blur-2xl supports-[backdrop-filter]:!bg-black/70">    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f58220]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(245,130,32,0.08),rgba(0,0,0,0))]" />

      <div className="container mx-auto px-4">
        <div className="flex h-[74px] items-center justify-between gap-3 overflow-hidden">
          {/* Logo */}
          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              className="mr-3 flex h-full min-w-0 items-center md:mr-10"
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            >
              <Image
                src="/assets/img/logo/nyxoslogo.png"
                alt="Logo"
                width={118}
                height={56}
                priority
                className="relative top-[4px] block h-[72px] w-auto max-w-full drop-shadow-[0_0_14px_rgba(245,130,32,0.14)] transition-transform duration-300 hover:scale-[1.02] md:top-[8px] md:h-[118px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="relative z-10 hidden h-full items-center gap-8 md:flex">
              {navItems.map((item) =>
                item.isProducts ? (
                  <ProductsMenu
                    key={item.href + item.name}
                    label={item.name}
                    categories={categories}
                    locale={locale}
                  />
                ) : (
                  <Link
                    key={item.href + item.name}
                    href={item.href}
                    className={cn(
                      "relative text-[16px] font-semibold capitalize tracking-[0.01em] !text-white transition-all duration-200 hover:!text-[#f58220]",
                      pathname === item.href && "!text-[#f58220]"
                    )}
                    onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Search */}
          <div className="relative hidden w-[280px] lg:block">

            <Input
              placeholder={t("searchProducts")}
              className="!h-11 !rounded-full !border !border-[#f58220]/25 !bg-white/5 !pl-10 !pr-4 !text-sm !text-white placeholder:!text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 focus-visible:!border-[#f58220]/45 focus-visible:!bg-white/10 focus-visible:!ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && results.length > 0 && (
              <div className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl !border !border-white/10 !bg-black/95 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <Command className="!bg-transparent">
                  <CommandList>
                    <CommandGroup>
                      {results.map((item) => (
                        <Link key={item.id} href={`/products/${item.id}`}>
                          <CommandItem
                            onSelect={() => setSearch("")}
                            className="cursor-pointer !border-b !border-white/5 px-4 py-3 text-sm !text-white/90 aria-selected:!bg-white/5 aria-selected:!text-[#f58220]"
                          >
                            {locale === "zh" && item.name_zh ? item.name_zh : item.name}
                          </CommandItem>
                        </Link>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex shrink-0 items-center space-x-3">
            {/* <LanguageSwitcher /> */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/90 hover:!bg-white/10 hover:!text-[#f58220] md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="relative z-50 border-t border-[#f58220]/12 bg-[#050505]/98 shadow-[0_24px_70px_rgba(0,0,0,0.58)] backdrop-blur-xl md:hidden">
          <div className="container mx-auto space-y-3 px-4 py-4">
            {/* Mobile search */}
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/55" />
              <Input
                placeholder={t("searchProducts")}
                className="!h-11 !rounded-full !border !border-[#f58220]/20 !bg-white/5 pl-11 pr-4 text-sm !text-white placeholder:!text-white/45 focus-visible:!border-[#f58220]/40 focus-visible:!ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href + item.name}
                href={item.href}
                className={cn(
                  "block rounded-xl border border-transparent bg-white/[0.02] px-3 py-3 text-[15px] font-semibold capitalize text-white transition-all duration-200 hover:border-[#f58220]/18 hover:bg-white/[0.05] hover:text-[#f58220]",
                  pathname === item.href && "border-[#f58220]/18 bg-white/[0.05] text-[#f58220]",
                )}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              >
                {item.name}
              </Link>
            ))}

            {search && results.length > 0 && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-[#f58220]/15 bg-[#0a0a0a] shadow-[0_18px_40px_rgba(0,0,0,0.42)]">
                <Command className="!bg-transparent">
                  <CommandList>
                    <CommandGroup>
                      {results.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          onClick={() => {
                            setSearch("");
                            setIsMenuOpen(false);
                          }}
                        >
                          <CommandItem className="cursor-pointer !border-b !border-white/5 px-4 py-3 text-sm !text-white/90 aria-selected:!bg-white/5 aria-selected:!text-[#f58220]">
                            {locale === "zh" && item.name_zh ? item.name_zh : item.name}
                          </CommandItem>
                        </Link>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}