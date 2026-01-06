import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack uses the `web/` folder as the workspace root (avoids multi-lockfile warning)
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
    // Disable optimization when NEXT_PUBLIC_OPTIMIZED_IMAGES=false to avoid repeated upstream image fetches in dev.
    unoptimized: process.env.NEXT_PUBLIC_OPTIMIZED_IMAGES === "false",
  },
};

export default nextConfig;
