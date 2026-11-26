import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/ycard", destination: "/metacircle-businesscard.html" }];
  },
};

export default nextConfig;
