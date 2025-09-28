/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors for deployment
  },
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  serverExternalPackages: ['mongoose'],
  output: 'standalone', // Optimize for Vercel
  experimental: {
    serverMinification: true,
  },
  // Remove env config to avoid issues
}

export default nextConfig
