/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    APPNAME: 'StarterPlateC3budiman',
    APPKEY: 'sukasukawajaappkeynyaaapaanygpentingsusahdihack',
    ANALYZE: 'true',
  },
  images: {
    domains: ['c4budiman.com'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  ...nextConfig,
});
