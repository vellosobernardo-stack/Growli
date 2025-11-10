module.exports = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000' }
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignora erros TS no build
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora erros ESLint
  },
}

module.exports = nextConfig