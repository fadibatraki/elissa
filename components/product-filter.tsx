"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

type ProductFilterProps = {
  categories: Category[];
  allProductNames: string[];
  initialCategoryIds: string[];
};

export function ProductFilter({
  categories,
  allProductNames,
  initialCategoryIds,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("ProductFilter");

  const [filterCategories, setFilterCategories] =
    useState<string[]>(initialCategoryIds);

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") ?? "",
  );
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const filteredProducts = allProductNames.filter((p) =>
    p.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearchQuery.toLowerCase()),
  );

  const handleCategorySelect = (categoryId: string) => {
    setFilterCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      } else {
        params.delete("search");
      }

      if (filterCategories.length > 0) {
        params.set("category", filterCategories.join(","));
      } else {
        params.delete("category");
      }

      params.set("page", "1");

      const nextQueryString = params.toString();
      const currentQueryString = searchParams.toString();

      if (nextQueryString !== currentQueryString) {
        router.replace(
          nextQueryString ? `/products?${nextQueryString}` : "/products",
        );
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [filterCategories, router, searchParams, searchQuery]);

  return (
    <Card className="rounded-2xl border border-[#f58220]/15 bg-[#050509]/95 text-white shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
      <CardHeader className="border-b border-[#f58220]/10 pb-4">
        <CardTitle className="text-base font-semibold tracking-wide text-white">
          {t("filters")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Search */}
        <div>
          <div className="relative mb-3">
            <Input
              placeholder={t("searchProducts")}
              className="border border-[#f58220]/15 bg-[#101015] pl-8 text-white placeholder:text-white/35 focus-visible:ring-[#f58220] focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-xl border border-[#f58220]/15 bg-[#050509] shadow-xl">
                <Command className="bg-transparent text-white">
                  <CommandList>
                    <CommandEmpty className="px-3 py-2 text-sm text-white/60">
                      {t("noProductsFound")}
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredProducts.map((product) => (
                        <CommandItem
                          key={product}
                          value={product}
                          className="cursor-pointer text-sm !text-white data-[selected=true]:bg-[#18181f] data-[selected=true]:!text-[#f7a14e] aria-selected:bg-[#18181f] aria-selected:!text-[#f7a14e]"
                          onSelect={(value) => {
                            setSearchQuery(value);
                          }}
                        >
                          {product}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          {/* Categories */}
          <h3 className="mb-3 text-sm font-medium text-[#f7a14e]">
            {t("categories")}
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <div
                role="button"
                tabIndex={0}
                className="flex h-auto min-h-10 w-full items-center justify-start rounded-xl border border-[#f58220]/15 bg-[#101015] px-3 py-2 text-sm text-white hover:bg-[#18181f] hover:border-[#f58220]/35"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    (e.currentTarget as HTMLDivElement).click();
                  }
                }}
              >
                {filterCategories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filterCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId,
                      );
                      return (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="flex items-center gap-1 rounded-full border border-[#f58220]/40 bg-[#f58220]/12 px-2.5 py-1 text-[11px] font-medium text-[#f7a14e]"
                        >
                          {category?.name.replaceAll("-", " ")}
                          <button
                            type="button"
                            aria-label={`Remove ${category?.name ?? "category"}`}
                            className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-[#f7a14e] transition hover:bg-[#f58220]/18"
                            onPointerDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCategorySelect(categoryId);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-white/50">
                    {t("selectCategories")}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="z-30 w-[260px] rounded-xl border border-[#f58220]/15 bg-[#050509] p-0 text-white
             [--accent:#000000] [--accent-foreground:#ffffff]"
              align="start"
            >
              <Command className="bg-transparent">
                <CommandInput
                  placeholder={t("searchCategories")}
                  value={categorySearchQuery}
                  onValueChange={setCategorySearchQuery}
                  className="border-b border-[#f58220]/10 bg-[#101015] text-sm placeholder:text-white"
                />
                <CommandList className="max-h-64">
                  <CommandEmpty className="px-3 py-2 text-sm text-white/60">
                    {t("noCategoriesFound")}
                  </CommandEmpty>
                  <CommandGroup>
                    {filteredCategories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        className="cursor-pointer text-sm !text-white data-[selected=true]:bg-[#18181f] data-[selected=true]:!text-[#f7a14e] aria-selected:bg-[#18181f] aria-selected:!text-[#f7a14e]"
                        onSelect={() => handleCategorySelect(category.id)}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${filterCategories.includes(category.id)
                            ? "opacity-100 text-[#f58220]"
                            : "opacity-0"
                            }`}
                        />
                        {category.name.replaceAll("-", " ")}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>

          </Popover>
        </div>

      </CardContent>
    </Card>
  );
}
