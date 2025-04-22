import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'santosmesacontainer.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'santosmesacontainer2.blob.core.windows.net',
        pathname: '/santosmesacontainer2/**',
      },
    ],
  },
};

export default nextConfig;
