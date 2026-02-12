/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabling strict mode helps with cloud IDE performance
  webpack: (config) => {
    // This fixes the ethers.js compilation hang
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;