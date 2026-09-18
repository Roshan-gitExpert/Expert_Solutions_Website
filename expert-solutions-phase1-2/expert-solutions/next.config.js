/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Using unoptimized images keeps this project simple to deploy on
    // Netlify without extra image-optimisation configuration.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Belt-and-suspenders on top of robots.txt's disallow: this
        // sends a real HTTP header telling search engines never to
        // index the internal admin dashboard, even if a URL under
        // /admin is ever linked to from somewhere off-site.
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;
