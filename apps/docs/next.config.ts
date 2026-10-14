import type { NextConfig } from 'next';
const config: NextConfig = {
  transpilePackages: ['@chamfer/ui', '@chamfer/tokens'],
  devIndicators: false,
};
export default config;
