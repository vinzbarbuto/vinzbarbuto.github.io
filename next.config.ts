import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Optional, but helps ensure the build behaves correctly for GH Pages
  images: {
    unoptimized: true, // MUST be true for GitHub Pages since it doesn't support Next.js image optimization
  },
  basePath: "/vincenzo-barbuto.github.io", // Required for GitHub Pages project site
};

export default nextConfig;
