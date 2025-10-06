/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Add these for better Vercel detection
  output: 'standalone',
  trailingSlash: true,
}

module.exports = nextConfig
