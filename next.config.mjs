/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "github-readme-stats.vercel.app" },
      { hostname: "ghchart.rshah.org" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

export default nextConfig;
