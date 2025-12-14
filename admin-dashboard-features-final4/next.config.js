/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'your-vercel-app.vercel.app'], // Replace with your Vercel app URL
  },
  // Disable React StrictMode if you encounter hydration issues
  reactStrictMode: false,
  // Enable production browser source maps
  productionBrowserSourceMaps: true,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Add public runtime config if needed
  publicRuntimeConfig: {
    // Add your public runtime config here
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add any webpack config customizations here
    return config;
  },
  // Enable static exports
  output: 'standalone',
  // Add environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-vercel-app.vercel.app',
  },
  // Add headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
