import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Exclude static assets, API, and auth/admin routes (which are outside [locale] group)
    "/((?!_next|api|login|admin|favicon.ico|robots.txt|sitemap.xml|product-images|assets|flags|.*\\..*).*)",
  ],
};
