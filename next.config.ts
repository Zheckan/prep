import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'persistent.oaistatic.com',
      },
    ],
  },
};

export default nextConfig;
