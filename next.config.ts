import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静态导出，适配 Cloudflare Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
