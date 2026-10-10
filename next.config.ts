import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable Next.js dev tools indicator in the browser window */
  basePath: "/Resume_Builder",
  output: "export",
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
