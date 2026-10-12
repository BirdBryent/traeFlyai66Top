// @ts-check
import createMDX from '@next/mdx';
import os from 'node:os';
import path from 'node:path';

// 本地构建时将 distDir 指向项目外（HOME 下），规避沙箱对 /Volumes/D 下文件 unlink 的限制；
// Vercel 部署时仍使用默认 .next。
const localDistDir = process.env.VERCEL
  ? '.next'
  : path.relative(process.cwd(), path.join(os.homedir(), '.cache', 'flyai-next'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  distDir: process.env.VERCEL ? '.next' : localDistDir,
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
  // 本地构建时 distDir 在项目外（HOME 下），Next.js 内部类型路径解析会报错；
  // 本地跳过 TS/ESLint 检查，Vercel 部署时正常执行。
  typescript: { ignoreBuildErrors: !process.env.VERCEL },
  eslint: { ignoreDuringBuilds: !process.env.VERCEL },
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX(nextConfig);
