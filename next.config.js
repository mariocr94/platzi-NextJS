/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: [
         'tailwindui.com',
         'images.unsplash.com',
         'api.lorem.space',
         'placeimg.com',
         'i0.wp.com',
      ],
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
};

module.exports = nextConfig;
