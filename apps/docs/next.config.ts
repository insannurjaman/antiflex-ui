import type { NextConfig } from 'next';
const config: NextConfig = {
  transpilePackages: ['@antiflex/ui', '@antiflex/tokens'],
  devIndicators: false,
};
export default config;
