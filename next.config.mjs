// @ts-check
import createMDX from '@next/mdx';
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coresg-normal.trae.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flyai66.top',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX(nextConfig);
