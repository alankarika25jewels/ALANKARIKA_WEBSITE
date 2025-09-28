/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'cloudinary.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dzs85rccr/**',
      },
    ],
  },
  serverExternalPackages: ['mongoose'],
  output: 'standalone',
  experimental: {
    serverMinification: true,
  },
}

export default nextConfig
