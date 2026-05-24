import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

const projectDir = fileURLToPath(new URL('.', import.meta.url));

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/core/i18n/request.ts',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: projectDir,
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // OpenNext Cloudflare will copy full packages listed here into the workerd bundle
  // when they expose a "workerd" export condition. `@libsql/client` does, and without
  // this the OpenNext bundler can fail to resolve it.
  serverExternalPackages: ['@libsql/client', '@libsql/isomorphic-ws'],
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [60, 70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale(en|zh)/quick-start',
        destination: '/:locale/tutorial',
        permanent: true,
      },
      {
        source: '/quick-start',
        destination: '/en/tutorial',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/docs',
        destination: '/:locale/tutorial',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/docs/:path*',
        destination: '/:locale/tutorial/:path*',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/en/tutorial',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/en/tutorial/:path*',
        permanent: true,
      },
      {
        source: '/tutorial',
        destination: '/en/tutorial',
        permanent: true,
      },
      {
        source: '/tutorial/:path*',
        destination: '/en/tutorial/:path*',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/en/resources',
        permanent: true,
      },
      {
        source: '/faqs',
        destination: '/en/faqs',
        permanent: true,
      },
      {
        source: '/faqs/:path*',
        destination: '/en/faqs/:path*',
        permanent: true,
      },
      {
        source: '/mechanics',
        destination: '/en/mechanics',
        permanent: true,
      },
      {
        source: '/mechanics/:path*',
        destination: '/en/mechanics/:path*',
        permanent: true,
      },
      {
        source: '/mcp',
        destination: '/en/mcp',
        permanent: true,
      },
      {
        source: '/mcp/:path*',
        destination: '/en/mcp/:path*',
        permanent: true,
      },
      {
        source: '/troubleshooting',
        destination: '/en/troubleshooting',
        permanent: true,
      },
      {
        source: '/troubleshooting/:path*',
        destination: '/en/troubleshooting/:path*',
        permanent: true,
      },
      {
        source: '/upgrade',
        destination: '/en/upgrade',
        permanent: true,
      },
      {
        source: '/api-reference',
        destination: '/en/api-reference',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/en/pricing',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/showcases',
        destination: '/:locale/resources',
        permanent: true,
      },
      {
        source: '/showcases',
        destination: '/en/resources',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/blog',
        destination: '/:locale/resources',
        permanent: true,
      },
      {
        source: '/:locale(en|zh)/blog/:path*',
        destination: '/:locale/resources',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/resources',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/en/resources',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/imgs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Allow OAuth popups to retain window.opener after cross-origin navigation
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
  turbopack: {
    root: projectDir,
    resolveAlias: {
      // fs: {
      //   browser: './empty.ts', // We recommend to fix code imports before using this method
      // },
    },
  },
  experimental: {
    reactCompiler: true,
    mdxRs: true,
  },
};

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));

if (process.env.NODE_ENV !== 'production') {
  initOpenNextCloudflareForDev();
}
