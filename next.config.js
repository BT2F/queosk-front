/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'placehold.co', '*'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
