/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Using unoptimized images keeps this project simple to deploy on
    // Netlify without extra image-optimisation configuration.
    unoptimized: true,
  },
};

module.exports = nextConfig;
