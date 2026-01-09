import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'offto.in',
      },
    ]
  }
};

export default nextConfig;
