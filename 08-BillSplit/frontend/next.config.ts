import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Skip linting during production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
