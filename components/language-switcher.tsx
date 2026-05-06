"use client";

import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = {
    en: {
      name: "English",
      flag: "/flags/uk.svg",
    },
    zh: {
      name: "中文",
      flag: "/flags/cn.svg",
    },
  };

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    document.documentElement.lang = newLocale;
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
     <SelectTrigger className="w-32 text-white hover:text-white focus:text-white [&_svg]:text-white [&_svg]:stroke-white border-white" >


        <SelectValue className="text-white">
          <div className="flex items-center gap-2">
            <Image
              src={languages[locale as keyof typeof languages].flag}
              alt={languages[locale as keyof typeof languages].name}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-white">{languages[locale as keyof typeof languages].name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="z-9999">
        {Object.entries(languages).map(([key, { name, flag }]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <Image
                src={flag}
                alt={name}
                width={20}
                height={20}
                className="object-contain"
              />
              <span>{name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
