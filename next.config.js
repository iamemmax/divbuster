/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['be-test.divebusters.app', 'flagcdn.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig