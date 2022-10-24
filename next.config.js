/** @type {import('next').NextConfig} */

require("dotenv").config();

const basePath = process.env.BASEPATH ?? "";
console.log('BASEPATH', basePath);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  // for static page, if you run ssr remove below config
  images: {
    unoptimized: true
  }
  // ---------------------------------------------------
}

module.exports = nextConfig
