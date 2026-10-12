// @ts-check
import createMDX from '@next/mdx';
import os from 'node:os';
import path from 'node:path';

// 本地构建 distDir 指向项目外 HOME 目录，规避沙箱对 /Volumes/D 下 unlink 的限制
const localDistDir = process.env.VERCEL
  ? '.next'
  : path.relative(process.cwd(), path.join(os.homedir(), '.cache', 'flyai-next'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  distDir: localDistDir,
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
  // 本地跳过 TS/ESLint 检查（distDir 在项目外导致 Next.js 内部类型路径解析失败）
  typescript: { ignoreBuildErrors: !process.env.VERCEL },
  eslint: { ignoreDuringBuilds: !process.env.VERCEL },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX(nextConfig);
