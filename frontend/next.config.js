/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    deviceSizes: [576, 768, 992, 1200, 1400],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = nextConfig;

module.exports = withBundleAnalyzer(nextConfig);
