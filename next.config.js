/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
