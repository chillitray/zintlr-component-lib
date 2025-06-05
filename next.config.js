/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@zintlr/components'],
  webpack: (config) => {
    // Add support for importing .jsx files without specifying the extension
    config.resolve.extensions.push('.jsx');
    return config;
  },
};

module.exports = nextConfig;
