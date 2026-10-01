import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All photography is served from /public/images as local optimized files.
  // No remote image hosts are permitted, keeping the demo self-contained.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384, 512],
  },
};

export default nextConfig;