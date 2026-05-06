import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [{ hostname: "cdn.dummyjson.com" }],
  },

  output: "standalone",

  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },

  async redirects() {
    return [
      // ✅ لأن login/admin خارج [locale]
      { source: "/en/login", destination: "/login", permanent: false },
      { source: "/zh/login", destination: "/login", permanent: false },
      { source: "/en/admin", destination: "/admin", permanent: false },
      { source: "/zh/admin", destination: "/admin", permanent: false },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
