import type { NextConfig } from 'next';
import binding from './content/editor-binding.json';
const nextConfig: NextConfig = {
  output: process.env.PLM_BUILD_TARGET === 'vercel' ? 'export' : undefined,
  async headers() {
    return [
      {
        source: '/plm-preview',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              'frame-ancestors ' +
              (binding.parentOrigins.length
                ? binding.parentOrigins.join(' ')
                : "'none'"),
          },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          // The Vercel edge supplies this header after static prerendering.
          ...(process.env.PLM_BUILD_TARGET === 'vercel'
            ? []
            : [{ key: 'Cache-Control', value: 'private, no-store' }]),
        ],
      },
    ];
  },
};
export default nextConfig;
