/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static assets are served from the correct path regardless of locale
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
