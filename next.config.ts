import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.PLM_BUILD_TARGET === 'vercel' ? 'export' : undefined,
};

export default nextConfig;
