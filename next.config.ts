import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "congenial-engine-96697wg5vpr7276x4-3000.app.github.dev",
        "*.app.github.dev",
      ],
    },
  },
  allowedDevOrigins: ["congenial-engine-96697wg5vpr7276x4-3000.app.github.dev", "*.app.github.dev"],
};

export default withBundleAnalyzer(nextConfig);
