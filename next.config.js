/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa');
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [`${hostname}`],
    unoptimized: true, // Add the unoptimized setting here instead
  },
}

const pwa = process.env.NEXT_PWA_STATUS;

// Apply PWA if enabled
const finalConfig = pwa === '1' 
  ? withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      runtimeCaching,
      disable: process.env.NODE_ENV === "development",
    })(nextConfig)
  : nextConfig;

module.exports = finalConfig;
