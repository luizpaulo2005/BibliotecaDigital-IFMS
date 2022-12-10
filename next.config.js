/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.ifms.edu.br'],
  }
}

module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public',
  fallbacks: {
    document: '/_offline'
  }
})

module.exports = withPWA({
  // next.js config
})