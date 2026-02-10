/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to enable API routes
  // API routes require server-side rendering
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
