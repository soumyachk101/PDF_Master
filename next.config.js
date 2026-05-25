/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pdf-master-backend-sxvj.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
