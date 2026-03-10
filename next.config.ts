import type { NextConfig } from "next";

// In production (GitHub Pages), the site is served from a repository subpath.
// Both basePath and assetPrefix must be set so that pages AND _next chunks resolve.
const isProd = process.env.NODE_ENV === "production";
const repoPath = "/vincenzo-barbuto.github.io";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoPath : "",
  assetPrefix: isProd ? repoPath : "", // fixes _next/static JS & CSS chunk 404s
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
