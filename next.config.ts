import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    // Build sırasında lint hatalarını yok say
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build sırasında TypeScript hatalarını yok say
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");
export default withNextIntl(nextConfig);